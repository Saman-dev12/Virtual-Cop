import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { address: string };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const walletAddress = req.cookies['wallet-address'];
    console.log(walletAddress)
  
    if (!walletAddress) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    req.user = { address: walletAddress };
    console.log(walletAddress)
    console.log(req.user)
    
    next();
  };
  