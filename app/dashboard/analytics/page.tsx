'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { SidebarNav, NavItem } from '@/components/sidebar-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const trendData = [
  { month: 'Jan', visitors: 12000, revenue: 180000 },
  { month: 'Feb', visitors: 15000, revenue: 225000 },
  { month: 'Mar', visitors: 18000, revenue: 270000 },
  { month: 'Apr', visitors: 22000, revenue: 330000 },
  { month: 'May', visitors: 28000, revenue: 420000 },
  { month: 'Jun', visitors: 32000, revenue: 480000 },
];

const seasonalData = [
  { season: 'Summer', visitors: 85000, percentage: 28 },
  { season: 'Monsoon', visitors: 45000, percentage: 15 },
  { season: 'Autumn', visitors: 95000, percentage: 32 },
  { season: 'Winter', visitors: 75000, percentage: 25 },
];

const capacityData = [
  { spot: 'Botanical Garden', carrying: 600, current: 450, safe: 480 },
  { spot: 'Doddabetta Peak', carrying: 400, current: 280, safe: 320 },
  { spot: 'Coonoor Town', carrying: 250, current: 125, safe: 200 },
  { spot: 'Parking A', carrying: 500, current: 385, safe: 400 },
  { spot: 'Parking B', carrying: 300, current: 150, safe: 240 },
];

const environmentalData = [
  { month: 'Jan', carbon: 850, waste: 420, water: 1200 },
  { month: 'Feb', carbon: 920, waste: 480, water: 1350 },
  { month: 'Mar', carbon: 1050, waste: 550, water: 1500 },
  { month: 'Apr', carbon: 1200, waste: 650, water: 1750 },
  { month: 'May', carbon: 1450, waste: 780, water: 2100 },
  { month: 'Jun', carbon: 1650, waste: 920, water: 2400 },
];

export default function AnalyticsPage() {
  const router = useRouter();
  const { user, isHydrated } = useAuth();

  useEffect(() => {
    if (isHydrated && (!user || user.role !== 'tourism-dept')) {
      router.push('/dashboard');
    }
  }, [user, isHydrated, router]);

  if (!isHydrated || !user || user.role !== 'tourism-dept') return null;

  const navItems: NavItem[] = [
    {
      title: 'Live Map',
      href: '/dashboard/map',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6.553 3.276A1 1 0 0121 20.382V9.618a1 1 0 00-1.447-.894L15 11m0 0V5m0 6.618v5.764m0 0l6-3m-6 3L9 5"
          />
        </svg>
      ),
      roles: ['district-admin'],
    },
    {
      title: 'Occupancy Monitor',
      href: '/dashboard/occupancy',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      roles: ['district-admin'],
    },
    {
      title: 'Traffic Heatmap',
      href: '/dashboard/traffic',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      roles: ['district-admin'],
    },
    {
      title: 'Weather & Alerts',
      href: '/dashboard/alerts',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      roles: ['district-admin'],
    },
    {
      title: 'Revenue Tracking',
      href: '/dashboard/revenue',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      roles: ['district-admin'],
    },
    {
      title: 'Analytics',
      href: '/dashboard/analytics',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      roles: ['tourism-dept'],
    },
    {
      title: 'Parking Settings',
      href: '/dashboard/parking',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      ),
      roles: ['district-admin'],
    },
    {
      title: 'Tariff Management',
      href: '/dashboard/tariff',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      roles: ['district-admin'],
    },
    {
      title: 'Notifications',
      href: '/dashboard/notifications',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      ),
      roles: ['district-admin'],
    },
    {
      title: 'Audit Logs',
      href: '/dashboard/audit',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      roles: ['district-admin', 'tourism-dept'],
    },
  ];

  return (
    <div className="flex min-h-screen bg-background lg:pl-64">
      <SidebarNav items={navItems} />
      <main className="flex-1 overflow-auto w-full">
        <div className="p-4 sm:p-6 lg:p-8 mt-16 lg:mt-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Planning Portal</h1>
            <p className="text-muted-foreground">
              Policy planning, trend analysis, and sustainability reporting
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Annual Visitors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">3.02L</p>
                <p className="text-xs text-green-600 mt-2">+18% YoY growth</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Annual Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">₹4.81Cr</p>
                <p className="text-xs text-green-600 mt-2">+22% YoY increase</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg Occupancy Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">62%</p>
                <p className="text-xs text-muted-foreground mt-2">Safe and sustainable</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Peak Season
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">Apr-Jun</p>
                <p className="text-xs text-muted-foreground mt-2">Summer peak</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Visitor & Revenue Trend */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>6-Month Visitor & Revenue Trend</CardTitle>
                <CardDescription>Monthly visitor inflow and revenue growth</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      stroke="#1e3a8a"
                      fillOpacity={1}
                      fill="url(#colorVisitors)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Seasonal Distribution */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Seasonal Visitor Distribution</CardTitle>
                <CardDescription>Annual traffic breakdown by season</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={seasonalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="season" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="visitors" fill="#0f766e" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Carrying Capacity vs Current */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Carrying Capacity Analysis</CardTitle>
                <CardDescription>Sustainability assessment per location</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={capacityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="spot" stroke="#64748b" angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="carrying" fill="#1e3a8a" />
                    <Bar dataKey="current" fill="#dbbc58" />
                    <Bar dataKey="safe" fill="#16a34a" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Environmental Impact */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Environmental Impact Metrics</CardTitle>
                <CardDescription>Carbon footprint and resource usage</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={environmentalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="carbon" stroke="#dc2626" strokeWidth={2} />
                    <Line type="monotone" dataKey="waste" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="water" stroke="#0f766e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Compliance & Reports */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Compliance & Reports</CardTitle>
              <CardDescription>Policy adherence and audit documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div>
                    <p className="font-medium text-foreground">Monthly Operations Report</p>
                    <p className="text-xs text-muted-foreground">June 2024</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium rounded bg-primary text-primary-foreground hover:bg-primary/90">
                    Download PDF
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div>
                    <p className="font-medium text-foreground">Sustainability Report</p>
                    <p className="text-xs text-muted-foreground">Q2 2024</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium rounded bg-primary text-primary-foreground hover:bg-primary/90">
                    Download PDF
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div>
                    <p className="font-medium text-foreground">Capacity & Traffic Analysis</p>
                    <p className="text-xs text-muted-foreground">H1 2024</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium rounded bg-primary text-primary-foreground hover:bg-primary/90">
                    Download CSV
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
