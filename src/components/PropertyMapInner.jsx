
"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import { useEffect } from "react";


// Fix Leaflet's default marker icons in Next.js.
const defaultIcon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Approximate city-center coordinates, not property coordinates.
const cityCoordinates = {
  islamabad: [33.6844, 73.0479],
  lahore: [31.5204, 74.3587],
  karachi: [24.8607, 67.0011],
  peshawar: [34.0151, 71.5249],
  rawalpindi: [33.5651, 73.0169],
  faisalabad: [31.4504, 73.135],
  multan: [30.1575, 71.5249],
};

function getCoordinates(property) {
  const latitude = Number(property.latitude);
  const longitude = Number(property.longitude);

  // Use exact coordinates only when both values are valid.
  if (
    property.latitude != null &&
    property.longitude != null &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  ) {
    return [latitude, longitude];
  }

  const city = String(property.city || "").trim().toLowerCase();
  return cityCoordinates[city] || null;
}

function FitMarkers({ markers }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length === 1) {
      map.setView(markers[0].position, 14);
    } else if (markers.length > 1) {
      const bounds = L.latLngBounds(
        markers.map((marker) => marker.position)
      );
      map.fitBounds(bounds, { padding: [30, 30], maxZoom: 13 });
    }
  }, [map, markers]);

  return null;
}

export default function PropertyMap({
  properties = [],
}) {
  const markers = properties
    .map((property) => ({
      property,
      position: getCoordinates(property),
    }))
    .filter((item) => item.position !== null);

  const initialCenter = markers[0]?.position || [30.3753, 69.3451];

  return (
    <div className="h-full w-full overflow-hidden rounded-xl">
      <MapContainer
        center={initialCenter}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

        <FitMarkers markers={markers} />

        {markers.map(({ property, position }) => (
          <Marker
            key={property.id}
            position={position}
            icon={defaultIcon}
          >
            <Popup>
              <div style={{ minWidth: "150px" }}>
                <strong>{property.title || "Property"}</strong>
                <p>
                  {property.city || property.location || "Pakistan"}
                </p>
                {property.price != null && (
                  <p>
                    Price: {Number(property.price).toLocaleString()}
                  </p>
                )}
                <Link href={`/properties/${property.id}`}>
                  View Property
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {markers.length === 0 && (
        <p className="mt-2 text-sm text-gray-500">
          No supported property locations found. Add property coordinates
          or a supported city name to display markers.
        </p>
      )}
    </div>
  );
}
