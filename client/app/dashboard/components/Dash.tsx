'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import ComplaintDetailModal from './ComplaintDetailModal'; // modal component

interface Complaint {
  id: string;
  type: string;
  description: string;
  images: string[];
  location: string;
  email: string;
  phone: string;
  status: string;
  ipfsHash: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Fetch complaints on mount
  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/complaint`, { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch complaints');
        return res.json();
      })
      .then(data => {
        setComplaints(data);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  // Compute summary counts
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === 'Pending').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;

  // Handler to open detail modal
  const openDetail = (id: string) => {
    setSelectedId(id);
    setIsDetailOpen(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {/* Button linking to create complaint page */}
        <Button variant="outline" asChild>
          <Link href="/dashboard/complaint">New Complaint</Link>
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16 rounded" />
            ) : (
              <p className="text-3xl font-bold">{total}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16 rounded" />
            ) : (
              <p className="text-3xl font-bold">{pending}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16 rounded" />
            ) : (
              <p className="text-3xl font-bold">{resolved}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Error or Loading state */}
      {error && (
        <p className="text-red-600 mb-4">Error: {error}</p>
      )}

      {/* Complaint list */}
      <div className="space-y-4">
        {loading && (
          // Show skeletons for list items while loading
          <>
            <Skeleton className="h-20 w-full rounded" />
            <Skeleton className="h-20 w-full rounded" />
            <Skeleton className="h-20 w-full rounded" />
          </>
        )}
        {!loading && complaints.map(c => (
          <Card
            key={c.id}
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => openDetail(c.id)}
          >
            <CardHeader>
              <CardTitle>{c.type}</CardTitle>
              <CardDescription>{new Date(c.createdAt).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="truncate">{c.description}</p>
            </CardContent>
          </Card>
        ))}
        {!loading && complaints.length === 0 && (
          <p>No complaints found.</p>
        )}
      </div>

      {/* Complaint Detail Modal */}
      {selectedId && (
        <ComplaintDetailModal
          complaintId={selectedId}
          open={isDetailOpen}
          onOpenChange={setIsDetailOpen}
        />
      )}
    </div>
  );
}
