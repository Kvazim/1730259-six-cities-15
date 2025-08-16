import {Icon, Marker, layerGroup} from 'leaflet';
import { memo, useEffect, useRef } from 'react';
import { OfferMapItem, OfferMapItems } from '../../types/offers';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import { DEFAULT_ZERO, SCROLL_CLASS_NAME, URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCurrentOfferId } from '../../store/offer-process/offer-process.selectors';

type MapProps = {
  className: string;
  offers: OfferMapItems;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

function Map({className, offers}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const activeOfferId = useAppSelector(getCurrentOfferId);
  const cityLocation = offers[DEFAULT_ZERO].city.location;
  const mapZoomOnScroll = className === SCROLL_CLASS_NAME;
  const map = useMap(mapRef, cityLocation, mapZoomOnScroll);

  useEffect(() => {
    if (map) {
      map.flyTo([cityLocation.latitude, cityLocation.longitude], cityLocation.zoom);
      const markerGroup = layerGroup().addTo(map);

      const addMarker = (offer: OfferMapItem) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            offer.id === activeOfferId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerGroup);
      };

      offers.forEach((offer) => addMarker(offer));

      return () => {
        map.removeLayer(markerGroup);
      };
    }
  }, [activeOfferId, cityLocation, map, offers]);

  return (
    <section ref={mapRef} className={`${className}__map map`}></section>
  );
}

const MemoizedMap = memo(Map);

export default MemoizedMap;
