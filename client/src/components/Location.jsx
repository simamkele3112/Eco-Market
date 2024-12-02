import React, { useState } from "react";
import { gsap } from "gsap";

const Location = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    if (inputValue.length > 2) {
      const apiKey = "f5e9e591c4004f16be81bfa598de8b3a";
      const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        inputValue
      )}&apiKey=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const newSuggestions = data.features.map(
          (feature) => feature.properties.formatted
        );
        setSuggestions(newSuggestions);

        // GSAP Animation for suggestions
        gsap.fromTo(
          ".suggestion-item",
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.1 }
        );
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      }
    } else {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="container py-4">
      <div className="row row-cols-md-1">

        <h1 className="text-center mb-4  col-10  ">Location </h1>
      <div className="mb-3 cols-3  m-auto w-50">
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={handleInputChange}
          placeholder="Type a location..."
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="list-group">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="list-group-item suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ cursor: "pointer" }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      </div>
      
    </div>
  );
};

export default Location;
