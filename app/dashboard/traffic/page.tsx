'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { SidebarNav, NavItem } from '@/components/sidebar-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TrafficPage() {
  const router = useRouter();
  const { user, isHydrated } = useAuth();

  useEffect(() => {
    if (isHydrated && (!user || user.role !== 'district-admin')) {
      router.push('/dashboard');
    }
  }, [user, isHydrated, router]);

  if (!isHydrated || !user || user.role !== 'district-admin') return null;

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
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Traffic Heatmap</h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">Real-time traffic congestion analysis and visualization</p>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Traffic Congestion Heatmap</CardTitle>
              <CardDescription>Visualizing real-time traffic patterns across the district</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Realistic Nilgiris Traffic Heatmap */}
              <div className="w-full h-96 rounded-lg border-2 border-primary/20 overflow-hidden">
                <svg viewBox="0 0 1000 600" className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100">
                  {/* Nilgiris Main Roads (simplified representation) */}
                  {/* Road segments with realistic paths */}
                  <line x1="50" y1="300" x2="950" y2="300" stroke="#d3d3d3" strokeWidth="8" />
                  <line x1="500" y1="50" x2="500" y2="550" stroke="#d3d3d3" strokeWidth="8" />
                  <line x1="100" y1="100" x2="900" y2="500" stroke="#d3d3d3" strokeWidth="6" opacity="0.6" />
                  <line x1="900" y1="100" x2="100" y2="500" stroke="#d3d3d3" strokeWidth="6" opacity="0.6" />

                  {/* Critical Congestion - Ooty Town Center */}
                  <circle cx="250" cy="300" r="120" fill="url(#heatCritical)" opacity="0.7" />
                  <circle cx="250" cy="300" r="80" fill="#dc2626" opacity="0.5" />
                  
                  {/* High Congestion - Main Road Junction */}
                  <circle cx="500" cy="300" r="100" fill="url(#heatHigh)" opacity="0.6" />
                  <circle cx="500" cy="300" r="70" fill="#ef4444" opacity="0.45" />

                  {/* Moderate Congestion - Doddabetta Route */}
                  <circle cx="750" cy="250" r="90" fill="url(#heatModerate)" opacity="0.5" />
                  <circle cx="750" cy="250" r="60" fill="#f97316" opacity="0.4" />

                  {/* Light Congestion - Alternative Routes */}
                  <circle cx="500" cy="500" r="80" fill="url(#heatLight)" opacity="0.4" />
                  <circle cx="500" cy="500" r="50" fill="#eab308" opacity="0.3" />

                  {/* Very Light - Coonoor Road */}
                  <circle cx="150" cy="450" r="70" fill="url(#heatVeryLight)" opacity="0.3" />
                  <circle cx="150" cy="450" r="40" fill="#22c55e" opacity="0.25" />

                  {/* Gradient Definitions for Traffic Heat */}
                  <defs>
                    <radialGradient id="heatCritical" cx="35%" cy="35%">
                      <stop offset="0%" style={{stopColor: '#991b1b', stopOpacity: 0.9}} />
                      <stop offset="50%" style={{stopColor: '#dc2626', stopOpacity: 0.6}} />
                      <stop offset="100%" style={{stopColor: '#ff0000', stopOpacity: 0}} />
                    </radialGradient>
                    <radialGradient id="heatHigh" cx="35%" cy="35%">
                      <stop offset="0%" style={{stopColor: '#dc2626', stopOpacity: 0.9}} />
                      <stop offset="50%" style={{stopColor: '#ef4444', stopOpacity: 0.6}} />
                      <stop offset="100%" style={{stopColor: '#fca5a5', stopOpacity: 0}} />
                    </radialGradient>
                    <radialGradient id="heatModerate" cx="35%" cy="35%">
                      <stop offset="0%" style={{stopColor: '#ea580c', stopOpacity: 0.8}} />
                      <stop offset="50%" style={{stopColor: '#f97316', stopOpacity: 0.5}} />
                      <stop offset="100%" style={{stopColor: '#fed7aa', stopOpacity: 0}} />
                    </radialGradient>
                    <radialGradient id="heatLight" cx="35%" cy="35%">
                      <stop offset="0%" style={{stopColor: '#eab308', stopOpacity: 0.7}} />
                      <stop offset="50%" style={{stopColor: '#facc15', stopOpacity: 0.4}} />
                      <stop offset="100%" style={{stopColor: '#fef3c7', stopOpacity: 0}} />
                    </radialGradient>
                    <radialGradient id="heatVeryLight" cx="35%" cy="35%">
                      <stop offset="0%" style={{stopColor: '#22c55e', stopOpacity: 0.6}} />
                      <stop offset="50%" style={{stopColor: '#4ade80', stopOpacity: 0.3}} />
                      <stop offset="100%" style={{stopColor: '#dcfce7', stopOpacity: 0}} />
                    </radialGradient>
                  </defs>

                  {/* Location Labels */}
                  <text x="250" y="320" fontSize="13" fontWeight="bold" fill="#333" textAnchor="middle">Ooty Center</text>
                  <text x="250" y="340" fontSize="11" fill="#666" textAnchor="middle">85% Congestion</text>

                  <text x="500" y="320" fontSize="13" fontWeight="bold" fill="#333" textAnchor="middle">Main Junction</text>
                  <text x="500" y="340" fontSize="11" fill="#666" textAnchor="middle">72% Congestion</text>

                  <text x="750" y="240" fontSize="13" fontWeight="bold" fill="#333" textAnchor="middle">Doddabetta Rd</text>
                  <text x="750" y="260" fontSize="11" fill="#666" textAnchor="middle">58% Congestion</text>

                  <text x="500" y="530" fontSize="13" fontWeight="bold" fill="#333" textAnchor="middle">Alternative Route</text>
                  <text x="500" y="550" fontSize="11" fill="#666" textAnchor="middle">28% Congestion</text>

                  <text x="150" y="475" fontSize="12" fontWeight="bold" fill="#333" textAnchor="middle">Coonoor Rd</text>
                  <text x="150" y="495" fontSize="10" fill="#666" textAnchor="middle">15% Congestion</text>
                </svg>
              </div>

              {/* Traffic Status Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <p className="text-xs text-muted-foreground mb-1">Critical (85%)</p>
                  <p className="text-2xl font-bold text-destructive">1</p>
                  <p className="text-xs text-muted-foreground mt-1">area</p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg border border-red-200">
                  <p className="text-xs text-muted-foreground mb-1">High (72%)</p>
                  <p className="text-2xl font-bold text-red-700">1</p>
                  <p className="text-xs text-muted-foreground mt-1">area</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg border border-orange-200">
                  <p className="text-xs text-muted-foreground mb-1">Moderate (58%)</p>
                  <p className="text-2xl font-bold text-orange-700">1</p>
                  <p className="text-xs text-muted-foreground mt-1">area</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg border border-yellow-200">
                  <p className="text-xs text-muted-foreground mb-1">Light (28%)</p>
                  <p className="text-2xl font-bold text-yellow-700">1</p>
                  <p className="text-xs text-muted-foreground mt-1">area</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg border border-green-200">
                  <p className="text-xs text-muted-foreground mb-1">Clear (15%)</p>
                  <p className="text-2xl font-bold text-green-700">1</p>
                  <p className="text-xs text-muted-foreground mt-1">area</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
