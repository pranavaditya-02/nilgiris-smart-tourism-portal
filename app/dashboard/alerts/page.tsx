'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { SidebarNav, NavItem } from '@/components/sidebar-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const alerts = [
  {
    id: 1,
    type: 'alert',
    title: 'High Occupancy Warning',
    message: 'Parking Area A has reached 85% capacity. Monitor closely.',
    time: '5 minutes ago',
    severity: 'high',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Heavy Rainfall Forecast',
    message: 'Heavy rainfall expected in 2 days (Feb 6). Recommend closing Doddabetta Peak and outdoor attractions.',
    time: '20 minutes ago',
    severity: 'warning',
    closureRecommendation: {
      spots: ['Doddabetta Peak', 'Rock Climbing Area'],
      reason: 'Heavy rainfall expected',
      date: 'Feb 6, 2026',
    },
  },
  {
    id: 3,
    type: 'warning',
    title: '48-Hour Weather Alert',
    message: 'Moderate to heavy rain expected in next 2 days. High wind speeds up to 25 km/h.',
    time: '1 hour ago',
    severity: 'warning',
  },
];

const weatherForecast = [
  { day: 'Today', temp: '22°C', condition: 'Clear', icon: '☀️', wind: '8 km/h' },
  { day: 'Tomorrow', temp: '20°C', condition: 'Partly Cloudy', icon: '⛅', wind: '12 km/h' },
  { day: 'Feb 6', temp: '18°C', condition: 'Heavy Rain', icon: '⛈️', wind: '25 km/h' },
  { day: 'Feb 7', temp: '19°C', condition: 'Rainy', icon: '🌧️', wind: '18 km/h' },
];

export default function AlertsPage() {
  const router = useRouter();
  const { user, isHydrated } = useAuth();
  const [closurePending, setClosurePending] = useState<{[key: number]: boolean}>({});
  const [closurePublished, setClosurePublished] = useState<{[key: number]: boolean}>({});

  const handleCancelClosure = (id: number) => {
    setClosurePending({ ...closurePending, [id]: false });
  };

  const handlePublishClosure = (id: number) => {
    setClosurePublished({ ...closurePublished, [id]: true });
    setClosurePending({ ...closurePending, [id]: false });
  };

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
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 100-4m0 4a2 2 0 110 4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
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
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Weather & Alerts</h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">Real-time weather data and operational alerts</p>

          {/* Current Weather */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Temperature</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">22°C</p>
                <p className="text-xs text-muted-foreground">Clear skies</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Humidity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">65%</p>
                <p className="text-xs text-muted-foreground">Moderate</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Wind Speed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">8 km/h</p>
                <p className="text-xs text-muted-foreground">Light breeze</p>
              </CardContent>
            </Card>
          </div>

          {/* Weather Forecast */}
          <Card className="bg-card border-border mb-6">
            <CardHeader>
              <CardTitle>4-Day Weather Forecast</CardTitle>
              <CardDescription>Predicted conditions for operational planning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {weatherForecast.map((forecast, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-muted border border-border text-center">
                    <p className="text-2xl mb-2">{forecast.icon}</p>
                    <p className="font-semibold text-foreground text-sm">{forecast.day}</p>
                    <p className="text-xs text-muted-foreground mb-2">{forecast.condition}</p>
                    <p className="text-lg font-bold text-primary">{forecast.temp}</p>
                    <p className="text-xs text-muted-foreground mt-1">Wind: {forecast.wind}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Alerts with Closure Management */}
          <Card className="bg-card border-border mb-6">
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
              <CardDescription>Current system and weather alerts with closure recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border ${alert.severity === 'high' ? 'bg-destructive/5 border-destructive/20' : 'bg-muted border-border'}`}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0">
                        <Badge
                          className={
                            alert.type === 'alert'
                              ? 'bg-destructive text-white'
                              : alert.type === 'warning'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-blue-100 text-blue-800'
                          }
                        >
                          {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">{alert.title}</p>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                    </div>

                    {/* Closure Recommendation */}
                    {alert.closureRecommendation && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg mb-3 border border-orange-200 dark:border-orange-800">
                          <p className="font-semibold text-orange-900 dark:text-orange-100 text-sm mb-2">
                            Closure Recommendation
                          </p>
                          <p className="text-sm text-orange-800 dark:text-orange-200 mb-2">
                            <strong>Reason:</strong> {alert.closureRecommendation.reason}
                          </p>
                          <p className="text-sm text-orange-800 dark:text-orange-200 mb-2">
                            <strong>Date:</strong> {alert.closureRecommendation.date}
                          </p>
                          <div className="mb-3">
                            <p className="text-sm font-medium text-orange-900 dark:text-orange-100 mb-1">Affected Locations:</p>
                            <div className="flex flex-wrap gap-2">
                              {alert.closureRecommendation.spots.map((spot) => (
                                <Badge key={spot} className="bg-orange-200 text-orange-900">{spot}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        {!closurePublished[alert.id] && (
                          <div className="flex flex-col sm:flex-row gap-2">
                            <button
                              onClick={() => setClosurePending({ ...closurePending, [alert.id]: true })}
                              className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium text-sm hover:bg-destructive/90 transition-colors"
                            >
                              Publish Closure
                            </button>
                            <button
                              onClick={() => handleCancelClosure(alert.id)}
                              className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg font-medium text-sm hover:bg-muted/80 transition-colors"
                            >
                              Dismiss
                            </button>
                          </div>
                        )}

                        {closurePending[alert.id] && (
                          <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-3">
                            <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100 mb-3">
                              Confirm closure publication? This will notify tourists and disable entry to the affected spots.
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handlePublishClosure(alert.id)}
                                className="flex-1 px-3 py-2 bg-destructive text-destructive-foreground rounded font-medium text-sm hover:bg-destructive/90"
                              >
                                Confirm & Publish
                              </button>
                              <button
                                onClick={() => handleCancelClosure(alert.id)}
                                className="flex-1 px-3 py-2 bg-muted text-foreground rounded font-medium text-sm hover:bg-muted/80"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}

                        {closurePublished[alert.id] && (
                          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg border border-green-200 dark:border-green-800 mt-3">
                            <p className="text-sm text-green-900 dark:text-green-100">
                              ✓ Closure published successfully. Tourists have been notified.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
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
