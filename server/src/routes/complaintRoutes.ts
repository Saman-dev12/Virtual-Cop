import { Readable } from 'stream';
import { Router, Request, Response } from "express";
import  upload  from "../middleware/multer";
import FormData from 'form-data';
import axios from "axios";
import { authMiddleware } from "../middleware/authmiddleware";
import { db } from "../db/drizzle";
import { complaintsTable, usersTable } from "../db/schema";
import { eq } from "drizzle-orm";


const router = Router();

interface UploadedFile extends Express.Multer.File {}

interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

async function pinToIPFS(file: UploadedFile): Promise<{ ipfsHash: string; gatewayUrl: string }> {
  const formData = new FormData();
  formData.append('file', file.buffer, { filename: file.originalname });
 
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

  const headers = {
    ...formData.getHeaders(),
    pinata_api_key: process.env.PINATA_API_KEY || '',
    pinata_secret_api_key: process.env.PINATA_API_SECRET || '',
  };

  const response = await axios.post<PinataResponse>(url, formData, {
    headers,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });


    console.log(response.data);


  const ipfsHash = response.data.IpfsHash;
  const gatewayUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  return { ipfsHash, gatewayUrl };
}

// Get all complaints
router.get('/', authMiddleware, async (req, res) => {
  try {
    const ethAddress = req.user?.address;
    if (!ethAddress) {
      res.status(400).json({ error: 'User address is missing' });
    }

    // Find user by Ethereum address
    if (!ethAddress) {
      throw new Error('Ethereum address is undefined');
    }
  
    const [user] = await db.select().from(usersTable).where(eq(usersTable.address, ethAddress));
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    }

    // Use UUID userId to fetch complaints
    const complaints = await db
      .select()
      .from(complaintsTable)
      .where(eq(complaintsTable.userId, user.id));

    res.json(complaints);
  } catch (err) {
    console.error('Error fetching complaints:', err);
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

// Get single complaint by ID
router.get('/complaints/:id', authMiddleware, async (req, res) => {
  try {
    const ethAddress = req.user?.address;
    const complaintId = req.params.id;
    if (!ethAddress) {
       res.status(400).json({ error: 'User address is missing' });
    }

    if (!ethAddress) {
      throw new Error('Ethereum address is undefined');
    }

    // Find user by Ethereum address
    const [user] = await db.select().from(usersTable).where(eq(usersTable.address, ethAddress));
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    }

    // Ensure the complaint belongs to the authenticated user
    const [complaint] = await db
      .select()
      .from(complaintsTable)
      .where(eq(complaintsTable.id, complaintId))
      .execute();

    if (!complaint) {
       res.status(404).json({ error: 'Complaint not found or unauthorized' });
    }

    res.json(complaint);
  } catch (err) {
    console.error('Error fetching complaint:', err);
    res.status(500).json({ error: 'Failed to fetch complaint' });
  }
});

router.post('/upload',authMiddleware, upload.array('images', 10), async (req: Request, res: Response) => {
  try {
    const files = req.files as UploadedFile[];

    if (!files || files.length === 0) {
       res.status(400).json({ error: 'No files uploaded' });
       return
    }
    console.log(req.files)

    const results = await Promise.all(
      files.map(async (file) => {
        const pinned = await pinToIPFS(file);
        return {
          fileName: file.originalname,
          ipfsHash: pinned.ipfsHash,
          gatewayUrl: pinned.gatewayUrl,
        };
      })
    );
    console.log(results)

     res.json({ pinnedFiles: results });
  } catch (err) {
    console.error('Upload error:', err);
     res.status(500).json({ error: 'Failed to upload images to IPFS' });
  }
});




router.post('/submitComplaint', authMiddleware, async (req, res) => {
  try {
    const { type, description, images, location, email, phone } = req.body;
    const walletAddress = req.user?.address;

    if (!walletAddress) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.address, walletAddress))
      .limit(1);

    if (!user || user.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Step 1: Save to DB
    const complaint = await db.insert(complaintsTable).values({
      userId: user[0].id,
      type,
      description,
      image:images,
      location,
      email,
      phone,
      status: "pending",
    }).returning();
    const complaintData = complaint[0];

    
    const fileContent = `
===============================
        COMPLAINT REPORT
===============================

Complaint ID     : ${complaintData.id}
User ID          : ${complaintData.userId}
Type             : ${type}
Status           : Pending

-------------------------------
Description
-------------------------------
${description}

-------------------------------
Image IPFS Hashes
-------------------------------
${Array.isArray(images) ? images.map((hash: string, i: number) => `${i + 1}. ${hash}`).join('\n') : images}

-------------------------------
Contact Information
-------------------------------
Location         : ${location}
Email            : ${email}
Phone            : ${phone}

-------------------------------
Timestamps
-------------------------------
Created At       : ${complaintData.createdAt}

===============================
        END OF REPORT
===============================
`;


    const fileBuffer = Buffer.from(fileContent, 'utf-8');
    const stream = Readable.from(fileBuffer);

    const fileForIPFS: UploadedFile = {
      fieldname: 'file',
      originalname: `complaint-${complaintData.id}.txt`,
      encoding: '7bit',
      mimetype: 'text/plain',
      buffer: fileBuffer,
      size: fileBuffer.length,
      destination: '',
      filename: '',
      path: '',
      stream: stream
    };

    const pinned = await pinToIPFS(fileForIPFS);
    console.log("Complaint Document IPFS:", pinned);

     await db.update(complaintsTable).set({ complaintIPFSHash: pinned.ipfsHash }).where(eq(complaintsTable.id, complaintData.id));

    res.status(201).json({
      message: "Complaint submitted and file pinned to IPFS",
      complaint: complaintData,
      documentIPFS: pinned,
    });

  } catch (err) {
    console.error("Error submitting complaint:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;