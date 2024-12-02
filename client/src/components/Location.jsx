import React, { useState } from "react";

const Location = () => {
  const [selectedLocation, setSelectedLocation] = useState(null); // For the selected location
  const [autocomplete, setAutocomplete] = useState(null); // To manage the autocomplete instance
  const [mapCenter, setMapCenter] = useState({
    lat: -30.5595, // South Africa latitude
    lng: 22.9375,  // South Africa longitude
  });

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        name: place.formatted_address,
      };
      setSelectedLocation(location);
      setMapCenter({ lat: location.lat, lng: location.lng });
    } else {
      alert("Please select a valid location from the suggestions.");
    }
  };

  return (
    <div className="location-component">
      <h3>Search and Select Your Location</h3>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" libraries={["places"]}>
        {/* Autocomplete Search */}
        <Autocomplete
          onLoad={(instance) => setAutocomplete(instance)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            placeholder="Search for a location in South Africa..."
            className="form-control"
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </Autocomplete>

        {/* Google Map */}
        <GoogleMap
          mapContainerStyle={{ height: "400px", width: "100%" }}
          center={mapCenter}
          zoom={10}
        >
          {selectedLocation && (
            <Marker
              position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
              title={selectedLocation.name}
            />
          )}
        </GoogleMap>
      </LoadScript>

      {/* Selected Location */}
      {selectedLocation && (
        <div className="alert alert-success mt-3">
          <strong>Selected Location:</strong> {selectedLocation.name}
        </div>
      )}
    </div>
  );
};

export default Location;
