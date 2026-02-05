'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { SidebarNav, NavItem } from '@/components/sidebar-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const auditLogs = [
  {
    id: 1,
    action: 'Parking Capacity Updated',
    user: 'Raj Kumar (Admin)',
    target: 'Parking Area A',
    details: 'Capacity changed from 500 to 550 spots',
    timestamp: '2024-06-15 14:30:22',
    status: 'success',
  },
  {
    id: 2,
    action: 'Tariff Modified',
    user: 'Priya Singh (Admin)',
    target: 'Entry Tariffs',
    details: 'Adult fee updated from ₹200 to ₹250',
    timestamp: '2024-06-15 12:15:45',
    status: 'success',
  },
  {
    id: 3,
    action: 'Spot Status Changed',
    user: 'Vikram Reddy (Admin)',
    target: 'Doddabetta Peak',
    details: 'Status changed from Open to Closed',
    timestamp: '2024-06-15 11:42:10',
    status: 'success',
  },
  {
    id: 4,
    action: 'Notification Sent',
    user: 'System',
    target: 'Mobile App',
    details: 'Occupancy alert broadcast to 3,240 users',
    timestamp: '2024-06-15 10:28:33',
    status: 'success',
  },
  {
    id: 5,
    action: 'Report Generated',
    user: 'Analytics System',
    target: 'Monthly Report',
    details: 'June 2024 operations report exported',
    timestamp: '2024-06-14 23:30:00',
    status: 'success',
  },
  {
    id: 6,
    action: 'User Login',
    user: 'John Doe (Collector)',
    target: 'Portal Access',
    details: 'Logged in to Analytics Portal',
    timestamp: '2024-06-14 08:45:22',
    status: 'success',
  },
  {
    id: 7,
    action: 'Data Backup',
    user: 'System',
    target: 'Database',
    details: 'Daily automated backup completed',
    timestamp: '2024-06-13 02:00:00',
    status: 'success',
  },
];

export default function AuditPage() {
  const router = useRouter();
  const { user, isHydrated } = useAuth();

  useEffect(() => {
    if (isHydrated && !user) {
      router.push('/login');
    }
  }, [user, isHydrated, router]);

  if (!isHydrated || !user) return null;

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
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
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
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    },
    {
      title: 'Parking Settings',
      href: '/dashboard/parking',
      roles: ['district-admin'],
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Audit Logs</h1>
          <p className="text-muted-foreground mb-8">
            Complete activity log for compliance and audit trail
          </p>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>System Activity</CardTitle>
              <CardDescription>All actions performed in the operations portal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Action</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">User</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Target</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Details</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Timestamp</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 text-foreground font-medium">{log.action}</td>
                        <td className="py-3 px-4 text-muted-foreground">{log.user}</td>
                        <td className="py-3 px-4 text-muted-foreground">{log.target}</td>
                        <td className="py-3 px-4 text-muted-foreground text-xs">{log.details}</td>
                        <td className="py-3 px-4 text-muted-foreground text-xs">{log.timestamp}</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-100 text-green-800">
                            {log.status === 'success' ? 'Success' : 'Failed'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Summary */}
          <Card className="bg-card border-border mt-6">
            <CardHeader>
              <CardTitle>Compliance Summary</CardTitle>
              <CardDescription>Audit compliance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Total Actions Logged</p>
                  <p className="text-lg font-bold text-foreground mt-1">1,247</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Successful Actions</p>
                  <p className="text-lg font-bold text-foreground mt-1">1,245</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Failed Actions</p>
                  <p className="text-lg font-bold text-destructive mt-1">2</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                  <p className="text-lg font-bold text-secondary mt-1">99.84%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
