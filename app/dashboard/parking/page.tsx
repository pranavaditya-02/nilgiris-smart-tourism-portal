'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { SidebarNav, NavItem } from '@/components/sidebar-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ParkingArea {
  id: string;
  name: string;
  totalCapacity: number;
  currentOccupancy: number;
  status: 'open' | 'closed';
}

const initialParking: ParkingArea[] = [
  { id: '1', name: 'Parking Area A', totalCapacity: 500, currentOccupancy: 385, status: 'open' },
  { id: '2', name: 'Parking Area B', totalCapacity: 300, currentOccupancy: 150, status: 'open' },
  { id: '3', name: 'Parking Area C', totalCapacity: 250, currentOccupancy: 180, status: 'open' },
];

export default function ParkingPage() {
  const router = useRouter();
  const { user, isHydrated } = useAuth();
  const [parkingAreas, setParkingAreas] = useState(initialParking);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCapacity, setEditCapacity] = useState('');

  useEffect(() => {
    if (isHydrated && (!user || user.role !== 'district-admin')) {
      router.push('/dashboard');
    }
  }, [user, isHydrated, router]);

  if (!isHydrated || !user || user.role !== 'district-admin') return null;

  const handleEdit = (id: string, capacity: number) => {
    setEditingId(id);
    setEditCapacity(capacity.toString());
  };

  const handleSave = (id: string) => {
    setParkingAreas(
      parkingAreas.map((p) =>
        p.id === id ? { ...p, totalCapacity: parseInt(editCapacity) } : p
      )
    );
    setEditingId(null);
    setEditCapacity('');
  };

  const navItems: NavItem[] = [
    {
      title: 'Live Map',
      href: '/dashboard/map',
      roles: ['district-admin'],
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6.553 3.276A1 1 0 0121 20.382V9.618a1 1 0 00-1.447-.894L15 11m0 0V5m0 6.618v5.764m0 0l6-3m-6 3L9 5" /></svg>,
    },
    {
      title: 'Occupancy Monitor',
      href: '/dashboard/occupancy',
      roles: ['district-admin'],
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    },
    {
      title: 'Traffic Heatmap',
      href: '/dashboard/traffic',
      roles: ['district-admin'],
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    },
    {
      title: 'Weather & Alerts',
      href: '/dashboard/alerts',
      roles: ['district-admin'],
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
    {
      title: 'Revenue Tracking',
      href: '/dashboard/revenue',
      roles: ['district-admin'],
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
    {
      title: 'Analytics',
      href: '/dashboard/analytics',
      roles: ['tourism-dept'],
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 100-4m0 4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110 4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
    },
    {
      title: 'Parking Settings',
      href: '/dashboard/parking',
      roles: ['district-admin'],
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110 4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
    },
    {
      title: 'Tariff Management',
      href: '/dashboard/tariff',
      roles: ['district-admin'],
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
    {
      title: 'Notifications',
      href: '/dashboard/notifications',
      roles: ['district-admin'],
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
    },
    {
      title: 'Audit Logs',
      href: '/dashboard/audit',
      roles: ['district-admin', 'tourism-dept'],
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    },
  ];

  return (
    <div className="flex min-h-screen bg-background lg:pl-64">
      <SidebarNav items={navItems} />
      <main className="flex-1 overflow-auto w-full">
        <div className="p-4 sm:p-6 lg:p-8 mt-16 lg:mt-0">
          <h1 className="text-3xl font-bold text-foreground mb-2">Parking Capacity Management</h1>
          <p className="text-muted-foreground mb-8">Edit parking area capacities and monitor occupancy</p>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Parking Areas</CardTitle>
              <CardDescription>Configure parking capacity for each area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {parkingAreas.map((area) => (
                  <div key={area.id} className="p-4 rounded-lg bg-muted">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-foreground">{area.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {area.currentOccupancy} / {area.totalCapacity} spots
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {editingId === area.id ? (
                          <>
                            <Input
                              type="number"
                              value={editCapacity}
                              onChange={(e) => setEditCapacity(e.target.value)}
                              className="w-24"
                            />
                            <Button
                              onClick={() => handleSave(area.id)}
                              className="bg-primary text-primary-foreground"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={() => setEditingId(null)}
                              variant="outline"
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button
                            onClick={() => handleEdit(area.id, area.totalCapacity)}
                            variant="outline"
                          >
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary"
                        style={{
                          width: `${(area.currentOccupancy / area.totalCapacity) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
