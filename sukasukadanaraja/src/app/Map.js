"use client";

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default icon issue
const fixLeafletIcon = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

export default function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !mapRef.current) {
      fixLeafletIcon();

      const map = L.map('map').setView([-7.447615887782863, 109.53521562369454], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Define the polygon coordinates surrounding Desa Danaraja
      const polygonCoords = [
        [-7.450, 109.530],
        [-7.450, 109.540],
        [-7.445, 109.540],
        [-7.445, 109.530],
        [-7.450, 109.530],
      ];

      // Add polygon boundary
      const polygon = L.polygon(polygonCoords, {
        color: "blue",
        weight: 2,
        fillColor: "lightblue",
        fillOpacity: 0.4,
      }).addTo(map);

      // Custom Bootstrap Blue Marker
      const blueIcon = L.divIcon({
        className: "custom-icon",
        html: '<i class="fas fa-map-marker-alt text-primary" style="font-size: 2rem; color: blue;"></i>',
        iconSize: [24, 24],
        iconAnchor: [12, 24],
      });

      // Add marker for Desa Danaraja
      L.marker([-7.447615887782863, 109.53521562369454], { icon: blueIcon })
        .addTo(map)
        .bindTooltip('Balai Desa Danareja', { 
          permanent: true, 
          className: 'custom-tooltip', 
          offset: [0, -10] 
        });

      mapRef.current = map;

      // Force a map resize after component mounts
      setTimeout(() => {
        map.invalidateSize();
      }, 250);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="map" className="w-full h-96 rounded-md shadow-md" style={{ position: 'relative', zIndex: 1 }} />;
}