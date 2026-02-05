'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { SidebarNav, NavItem } from '@/components/sidebar-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const incidentData = [
  { id: 1, type: 'Medical Emergency', location: 'Doddabetta Peak', severity: 'critical', time: '14:23', status: 'Active', responders: 2 },
  { id: 2, type: 'Traffic Accident', location: 'Ooty Town Center', severity: 'high', time: '14:15', status: 'In Progress', responders: 4 },
  { id: 3, type: 'Lost Person Report', location: 'Botanical Garden', severity: 'high', time: '14:05', status: 'Active', responders: 3 },
  { id: 4, type: 'Vehicle Breakdown', location: 'Main Road', severity: 'medium', time: '13:52', status: 'Resolved', responders: 2 },
  { id: 5, type: 'Crowd Surge', location: 'Ooty Lake', severity: 'high', time: '13:40', status: 'Managed', responders: 5 },
];

const emergencyResources = [
  { type: 'Ambulances', total: 5, available: 2, location: 'Ooty Medical Center' },
  { type: 'Fire Trucks', total: 3, available: 2, location: 'Fire Station' },
  { type: 'Police Vehicles', total: 12, available: 4, location: 'Police HQ' },
  { type: 'Traffic Police', total: 25, available: 8, location: 'Various Locations' },
];

export default function EmergencyPage() {
  const router = useRouter();
  const { user, isHydrated } = useAuth();
  const [activeIncident, setActiveIncident] = useState<number | null>(1);
  const [dispatchLog, setDispatchLog] = useState<string[]>([]);

  useEffect(() => {
    if (isHydrated && !user) {
      router.push('/login');
    }
  }, [user, isHydrated, router]);

  const handleEmergencyAlert = (type: string) => {
    const newLog = `[${new Date().toLocaleTimeString()}] Emergency Alert: ${type} - Dispatching resources...`;
    setDispatchLog([newLog, ...dispatchLog.slice(0, 9)]);
  };

  if (!isHydrated || !user) return null;

  const navItems: NavItem[] = [
    { title: 'Dashboard', href: '/dashboard', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m2 3l2-3m2 3l2-3m2 3l2-3m2 3l2-3M3 20l2-3m2 3l2-3m2 3l2-3m2 3l2-3m2 3l2-3" /></svg>, roles: ['district-admin'] },
    { title: 'Live Map', href: '/dashboard/map', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6.553 3.276A1 1 0 0121 20.382V9.618a1 1 0 00-1.447-.894L15 11m0 0V5m0 6.618v5.764m0 0l6-3m-6 3L9 5" /></svg>, roles: ['district-admin'] },
    { title: 'Occupancy Monitor', href: '/dashboard/occupancy', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, roles: ['district-admin'] },
    { title: 'Traffic Heatmap', href: '/dashboard/traffic', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, roles: ['district-admin'] },
    { title: 'Weather & Alerts', href: '/dashboard/alerts', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, roles: ['district-admin'] },
    { title: 'Revenue Tracking', href: '/dashboard/revenue', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, roles: ['district-admin'] },
    { title: 'Parking Settings', href: '/dashboard/parking', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>, roles: ['district-admin'] },
    { title: 'Tariff Management', href: '/dashboard/tariff', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3v.01M9 17h6m-3-5v-3m0 0V7m0 0H7m2 0h4" /></svg>, roles: ['district-admin'] },
    { title: 'Notifications', href: '/dashboard/notifications', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>, roles: ['district-admin'] },
    { title: 'Audit Logs', href: '/dashboard/audit', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, roles: ['district-admin'] },
    { title: 'Emergency Response', href: '/dashboard/emergency', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>, roles: ['district-admin'] },
  ];

  return (
    <div className="flex min-h-screen bg-background lg:pl-64">
      <SidebarNav items={navItems} />
      <main className="flex-1 overflow-auto w-full">
        <div className="p-4 sm:p-6 lg:p-8 mt-16 lg:mt-0">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Emergency Response System</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Real-time incident tracking and emergency dispatch coordination</p>
          </div>

          {/* Emergency Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <button onClick={() => handleEmergencyAlert('Medical Emergency')} className="p-4 bg-destructive text-destructive-foreground rounded-lg font-semibold hover:bg-destructive/90 transition-colors text-sm sm:text-base">
              🚑 Medical Emergency
            </button>
            <button onClick={() => handleEmergencyAlert('Traffic Accident')} className="p-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm sm:text-base">
              🚗 Traffic Accident
            </button>
            <button onClick={() => handleEmergencyAlert('Fire Incident')} className="p-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors text-sm sm:text-base">
              🔥 Fire Incident
            </button>
            <button onClick={() => handleEmergencyAlert('Crowd Control')} className="p-4 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition-colors text-sm sm:text-base">
              👥 Crowd Control
            </button>
          </div>

          {/* Resource Status & Active Incidents */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Emergency Resources */}
            <Card className="lg:col-span-1 bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Emergency Resources</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Available units</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {emergencyResources.map((resource) => {
                  const available = resource.available;
                  const color = available === 0 ? 'bg-destructive' : available < 2 ? 'bg-orange-500' : 'bg-green-500';
                  return (
                    <div key={resource.type} className="space-y-2">
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="font-medium text-foreground">{resource.type}</span>
                        <Badge className={`${color} text-white text-xs`}>{available}/{resource.total}</Badge>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${color}`} style={{ width: `${(available / resource.total) * 100}%` }} />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Active Incidents */}
            <Card className="lg:col-span-2 bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Active Incidents</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Click to view details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {incidentData.map((incident) => {
                    const severityColor = 
                      incident.severity === 'critical' ? 'bg-destructive/10 border-destructive/20' :
                      incident.severity === 'high' ? 'bg-red-100 border-red-200' :
                      'bg-yellow-100 border-yellow-200';
                    
                    const badgeColor =
                      incident.severity === 'critical' ? 'bg-destructive text-destructive-foreground' :
                      incident.severity === 'high' ? 'bg-red-600 text-white' :
                      'bg-yellow-600 text-white';

                    return (
                      <div
                        key={incident.id}
                        onClick={() => setActiveIncident(incident.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${severityColor} ${activeIncident === incident.id ? 'ring-2 ring-primary' : ''}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-sm text-foreground truncate">{incident.type}</p>
                            <p className="text-xs text-muted-foreground truncate">{incident.location}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <Badge className={`${badgeColor} text-xs`}>{incident.severity}</Badge>
                            <p className="text-xs text-muted-foreground mt-1">{incident.time}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-xs">
                          <span className="text-muted-foreground">Status: {incident.status}</span>
                          <span className="text-muted-foreground">{incident.responders} responders</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dispatch Log */}
          <Card className="bg-card border-border mb-6">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Live Dispatch Log</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Real-time emergency response actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 sm:p-4 rounded-lg font-mono text-xs sm:text-sm space-y-2 max-h-64 overflow-y-auto">
                {dispatchLog.length > 0 ? (
                  dispatchLog.map((log, idx) => (
                    <div key={idx} className="text-muted-foreground whitespace-pre-wrap break-words">
                      {log}
                    </div>
                  ))
                ) : (
                  <div className="text-muted-foreground text-center py-8">
                    <p className="mb-2">No active incidents</p>
                    <p className="text-xs">Click emergency buttons above to log incidents</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Protocols */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Quick Response Protocols</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Pre-configured emergency action plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <span className="w-6 h-6 bg-destructive rounded-full flex items-center justify-center text-white text-xs">1</span>
                    Medical Protocol
                  </h4>
                  <p className="text-xs text-muted-foreground">Alert nearest ambulance, notify hospital, clear emergency route</p>
                  <button className="w-full mt-2 px-3 py-1.5 text-xs bg-destructive text-destructive-foreground rounded hover:bg-destructive/90">Activate Protocol</button>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <span className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs">2</span>
                    Accident Protocol
                  </h4>
                  <p className="text-xs text-muted-foreground">Deploy police, redirect traffic, call ambulance if needed</p>
                  <button className="w-full mt-2 px-3 py-1.5 text-xs bg-red-600 text-white rounded hover:bg-red-700">Activate Protocol</button>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs">3</span>
                    Fire Protocol
                  </h4>
                  <p className="text-xs text-muted-foreground">Alert fire brigade, evacuate area, post warning signs</p>
                  <button className="w-full mt-2 px-3 py-1.5 text-xs bg-orange-600 text-white rounded hover:bg-orange-700">Activate Protocol</button>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <span className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center text-white text-xs">4</span>
                    Crowd Control Protocol
                  </h4>
                  <p className="text-xs text-muted-foreground">Deploy traffic police, establish entry/exit points, monitor flow</p>
                  <button className="w-full mt-2 px-3 py-1.5 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700">Activate Protocol</button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
