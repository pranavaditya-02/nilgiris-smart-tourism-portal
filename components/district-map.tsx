'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import L from 'leaflet';

interface Spot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  occupancy: number;
  capacity: number;
  status: 'open' | 'closed' | 'alert';
  type: 'attraction' | 'parking';
}

const mockSpots: Spot[] = [
  {
    id: '1',
    name: 'Ooty Botanical Garden',
    lat: 11.4066,
    lng: 76.7050,
    occupancy: 450,
    capacity: 600,
    status: 'open',
    type: 'attraction',
  },
  {
    id: '2',
    name: 'Main Parking Area A',
    lat: 11.4100,
    lng: 76.7120,
    occupancy: 385,
    capacity: 500,
    status: 'alert',
    type: 'parking',
  },
  {
    id: '3',
    name: 'Doddabetta Peak',
    lat: 11.4144,
    lng: 76.7194,
    occupancy: 280,
    capacity: 400,
    status: 'open',
    type: 'attraction',
  },
  {
    id: '4',
    name: 'Parking Area B',
    lat: 11.3900,
    lng: 76.7300,
    occupancy: 150,
    capacity: 300,
    status: 'open',
    type: 'parking',
  },
  {
    id: '5',
    name: 'Coonoor Railway Station',
    lat: 11.3627,
    lng: 76.8019,
    occupancy: 145,
    capacity: 250,
    status: 'open',
    type: 'attraction',
  },
];

function coordinatesToPosition(lat: number, lng: number): { top: string; left: string } {
  // Placeholder implementation for coordinatesToPosition
  // This should be replaced with actual logic to convert coordinates to position
  return { top: `${lat}px`, left: `${lng}px` };
}

interface DistrictMapProps {
  onSpotSelect?: (spot: Spot) => void;
}

export function DistrictMap({ onSpotSelect }: DistrictMapProps) {
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [layerToggle, setLayerToggle] = useState({
    parking: true,
    attractions: true,
    congestion: true,
  });
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  // Nilgiris region center and bounds
  const mapCenter: [number, number] = [11.4066, 76.7050];
  const mapBounds = L.latLngBounds(
    L.latLng(11.35, 76.65),
    L.latLng(11.45, 76.85)
  );

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('leaflet-map', {
        maxBounds: mapBounds,
        maxBoundsViscosity: 1.0,
      }).setView(mapCenter, 12);

      // Add tile layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
        minZoom: 10,
      }).addTo(map);

      // Fit map to bounds with padding
      map.fitBounds(mapBounds, { padding: [50, 50] });

      mapRef.current = map;
    }

    return () => {
      // Keep map instance alive
    };
  }, []);

  // Update markers when spots or layer toggle changes
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      map.removeLayer(marker);
    });
    markersRef.current.clear();

    // Add new markers based on layer toggle
    mockSpots.forEach((spot) => {
      const shouldShow =
        (spot.type === 'parking' && layerToggle.parking) ||
        (spot.type === 'attraction' && layerToggle.attractions);

      if (!shouldShow) return;

      const occupancyPercent = (spot.occupancy / spot.capacity) * 100;
      const markerColor =
        occupancyPercent > 80 ? '#dc2626' : occupancyPercent > 60 ? '#f59e0b' : '#10b981';
      const badgeBgColor =
        occupancyPercent > 80 ? '#fca5a5' : occupancyPercent > 60 ? '#fcd34d' : '#a7f3d0';
      const badgeTextColor =
        occupancyPercent > 80 ? '#991b1b' : occupancyPercent > 60 ? '#92400e' : '#047857';

      const markerIcon = L.divIcon({
        html: `
          <div style="position: relative; width: 50px; text-align: center;">
            <!-- Main marker circle -->
            <div style="
              width: 32px;
              height: 32px;
              margin: 0 auto;
              background-color: ${markerColor};
              border: 3px solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              font-size: 14px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
              position: relative;
              z-index: 10;
            ">
              ${spot.type === 'parking' ? 'P' : 'A'}
            </div>
            <!-- Occupancy badge -->
            <div style="
              position: absolute;
              top: -8px;
              right: -8px;
              background-color: ${badgeBgColor};
              color: ${badgeTextColor};
              padding: 2px 6px;
              border-radius: 12px;
              font-size: 11px;
              font-weight: bold;
              border: 1px solid white;
              box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
              white-space: nowrap;
            ">
              ${occupancyPercent.toFixed(0)}%
            </div>
            <!-- Location label below -->
            <div style="
              background-color: white;
              border: 1px solid #e5e7eb;
              border-radius: 4px;
              padding: 3px 6px;
              margin-top: 4px;
              font-size: 11px;
              font-weight: 500;
              color: #374151;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              width: 100%;
              box-sizing: border-box;
            ">
              ${spot.name.split(' ').slice(0, 2).join(' ')}
            </div>
          </div>
        `,
        className: 'custom-marker',
        iconSize: [50, 80],
        iconAnchor: [25, 40],
        popupAnchor: [0, -40],
      });

      const marker = L.marker([spot.lat, spot.lng], { icon: markerIcon })
        .bindPopup(`
          <div class="text-sm font-medium">${spot.name}</div>
          <div class="text-xs text-gray-600">Occupancy: ${spot.occupancy}/${spot.capacity}</div>
          <div class="text-xs text-gray-600">${occupancyPercent.toFixed(0)}% full</div>
          <div class="text-xs text-gray-600">${spot.lat.toFixed(4)}°N, ${spot.lng.toFixed(4)}°E</div>
        `)
        .addTo(map);

      marker.on('click', () => {
        setSelectedSpot(spot);
        onSpotSelect?.(spot);
      });

      markersRef.current.set(spot.id, marker);
    });
  }, [layerToggle, onSpotSelect]);

  const handleSpotClick = (spot: Spot) => {
    setSelectedSpot(spot);
    onSpotSelect?.(spot);

    // Pan to spot and open popup
    if (mapRef.current) {
      mapRef.current.setView([spot.lat, spot.lng], 15);
      const marker = markersRef.current.get(spot.id);
      if (marker) {
        marker.openPopup();
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      case 'alert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Live District Map</CardTitle>
          <CardDescription>Real-time monitoring of tourist spots and parking areas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Layer Controls */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 bg-muted rounded-lg flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={layerToggle.parking}
                onChange={(e) => setLayerToggle({ ...layerToggle, parking: e.target.checked })}
                className="w-4 h-4 rounded border-border"
              />
              <span className="font-medium text-foreground">Parking</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={layerToggle.attractions}
                onChange={(e) => setLayerToggle({ ...layerToggle, attractions: e.target.checked })}
                className="w-4 h-4 rounded border-border"
              />
              <span className="font-medium text-foreground">Attractions</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={layerToggle.congestion}
                onChange={(e) => setLayerToggle({ ...layerToggle, congestion: e.target.checked })}
                className="w-4 h-4 rounded border-border"
              />
              <span className="font-medium text-foreground">Heat Map</span>
            </label>
          </div>

          {/* Leaflet Map Container */}
          <div id="leaflet-map" className="w-full h-96 rounded-lg border-2 border-primary/20 overflow-hidden z-0" />

          {/* Overlay Controls */}
          <div className="absolute top-3 right-3 bg-white rounded-lg shadow p-2 sm:p-3 text-xs border border-border z-10">
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={layerToggle.parking}
                  onChange={(e) => setLayerToggle({ ...layerToggle, parking: e.target.checked })}
                  className="w-3 h-3 rounded"
                />
                <span className="text-foreground font-medium">Parking</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={layerToggle.attractions}
                  onChange={(e) => setLayerToggle({ ...layerToggle, attractions: e.target.checked })}
                  className="w-3 h-3 rounded"
                />
                <span className="text-foreground font-medium">Attractions</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={layerToggle.congestion}
                  onChange={(e) => setLayerToggle({ ...layerToggle, congestion: e.target.checked })}
                  className="w-3 h-3 rounded"
                />
                <span className="text-foreground font-medium">Heat Map</span>
              </label>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-3 left-3 bg-white rounded-lg shadow p-2 sm:p-3 text-xs border border-border z-10">
            <p className="font-semibold mb-2 text-foreground text-xs sm:text-base">Legend</p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-foreground">Open</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-foreground">Alert</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400" />
                <span className="text-foreground">Closed</span>
              </div>
            </div>
          </div>

          {/* Spot Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-foreground mb-3 text-sm sm:text-base">All Spots</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {mockSpots.map((spot) => (
                  <div
                    key={spot.id}
                    onClick={() => handleSpotClick(spot)}
                    className={`p-3 rounded-lg cursor-pointer transition-all text-sm ${
                      selectedSpot?.id === spot.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">{spot.name}</p>
                        <p className="text-xs opacity-75 capitalize">{spot.type}</p>
                      </div>
                      <Badge className={getStatusColor(spot.status)} style={{ whiteSpace: 'nowrap' }}>
                        {spot.status === 'alert' ? 'ALERT' : spot.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedSpot && (
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{selectedSpot.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  {selectedSpot.lat.toFixed(4)}°N, {selectedSpot.lng.toFixed(4)}°E
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Occupancy</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden min-w-[100px]">
                        <div
                          className={`h-full ${
                            selectedSpot.occupancy > selectedSpot.capacity * 0.8
                              ? 'bg-destructive'
                              : 'bg-secondary'
                          }`}
                          style={{
                            width: `${(selectedSpot.occupancy / selectedSpot.capacity) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                        {selectedSpot.occupancy}/{selectedSpot.capacity}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {((selectedSpot.occupancy / selectedSpot.capacity) * 100).toFixed(0)}% capacity
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <Badge className={`mt-1 ${getStatusColor(selectedSpot.status)}`}>
                      {selectedSpot.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <button className="w-full px-3 py-2 rounded bg-primary text-primary-foreground text-xs sm:text-sm font-medium hover:bg-primary/90">
                      Edit Capacity
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
