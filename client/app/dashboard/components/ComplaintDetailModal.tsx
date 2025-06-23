'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface Complaint {
  id: string;
  type: string;
  description: string;
  images: string[];
  location: string;
  email: string;
  phone: string;
  status: string;
  complaintIPFSHash: string;
  createdAt: string;
}

interface DetailProps {
  complaintId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ComplaintDetailModal({ complaintId, open, onOpenChange }: DetailProps) {
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch complaint detail when opened
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/complaint/complaints/${complaintId}`, { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch complaint detail');
        return res.json();
      })
      .then(data => {
        setComplaint(data);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [complaintId, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Complaint Details</DialogTitle>
        </DialogHeader>

        {loading ? (
          // Loading skeletons for detail fields
          <Card>
            <CardContent>
              <Skeleton className="h-6 mb-2 w-1/3" />
              <Skeleton className="h-4 mb-2 w-2/3" />
              <Skeleton className="h-4 mb-2 w-3/4" />
            </CardContent>
          </Card>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : complaint ? (
          <Card>
            <CardHeader>
              <CardTitle>{complaint.type}</CardTitle>
              <Badge variant={complaint.status === 'Resolved' ? 'outline' : 'secondary'}>
                {complaint.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Description:</strong> {complaint.description}</p>
              <p><strong>Location:</strong> {complaint.location}</p>
              <p><strong>Email:</strong> {complaint.email}</p>
              <p><strong>Phone:</strong> {complaint.phone}</p>
              <p className='break-all'><strong>IPFS Hash:</strong> <a href={`https://ipfs.io/ipfs/${complaint.complaintIPFSHash}`} target="_blank" rel="noopener noreferrer">{complaint.complaintIPFSHash}</a>{complaint.complaintIPFSHash}</p>
              <p><strong>Created:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
              {complaint.images && complaint.images.length > 0 && (
                <div>
                  <strong>Images:</strong>
                  <div className="flex space-x-2 mt-1">
                    {complaint.images.map((src, idx) => (
                      <img key={idx} src={src} alt={`Image ${idx+1}`} className="h-24 w-24 object-cover rounded" />
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </CardFooter>
          </Card>
        ) : null}

      </DialogContent>
    </Dialog>
  );
}
