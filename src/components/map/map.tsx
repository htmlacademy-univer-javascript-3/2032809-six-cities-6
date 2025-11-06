import { useEffect, useRef } from 'react';
import L, { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { City, Offer } from '../../types/offer';

type MapProps = {
  className?: string;
  city: City;
  offers: Offer[];
};

function Map({ className, city, offers }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) {
      return;
    }

    const map = L.map(mapRef.current).setView(
      [city.location.latitude, city.location.longitude],
      city.location.zoom
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;
  }, [city]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) {
      return;
    }

    // Обновляем центр/зум при смене города
    map.setView([city.location.latitude, city.location.longitude], city.location.zoom);

    // Перестраиваем маркеры
    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers();
    } else {
      markersLayerRef.current = L.layerGroup().addTo(map);
    }

    offers.forEach((offer) => {
      const { latitude, longitude } = offer.location;
      L.marker([latitude, longitude]).addTo(markersLayerRef.current as L.LayerGroup);
    });
  }, [city, offers]);

  return <section className={className ?? 'map'} ref={mapRef} />;
}

export default Map;


