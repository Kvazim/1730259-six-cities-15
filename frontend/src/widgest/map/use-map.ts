import leaflet, { Map } from 'leaflet';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { LeafletParameters } from '../../shared/lib/const/const';
import { Location } from '../../shared/types/offers';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: Location, mapZoomOnScroll: boolean) {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const { latitude, longitude, zoom } = city;
      const { TILE_LAYER, ATTRIBUTION } = LeafletParameters;

      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude
        },
        zoom: zoom,
        scrollWheelZoom: mapZoomOnScroll,
      });

      leaflet.tileLayer(TILE_LAYER, { attribution: ATTRIBUTION }).addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [city, mapRef, mapZoomOnScroll]);

  return map;
}

export default useMap;
