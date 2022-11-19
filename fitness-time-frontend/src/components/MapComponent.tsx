import React from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { Card, Loader } from "@mantine/core";
import { googleMapsLibraries } from "./LocationPicker";
import { LocationDto } from "../models/locationDto";

const MapComponent: React.FunctionComponent<{
  locationDto: LocationDto;
}> = ({ locationDto }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries: googleMapsLibraries,
  });

  const location = {
    lat: locationDto.latitude,
    lng: locationDto.longitude,
  };

  return (
    <>
      {loadError ? (
        <Card>An error occurred while loading map!</Card>
      ) : isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: "400px",
            height: "400px",
          }}
          center={location}
          zoom={17}
        >
          <MarkerF title={locationDto.address} position={location} />
        </GoogleMap>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default React.memo(MapComponent);
