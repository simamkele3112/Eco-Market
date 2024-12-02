import React, { useState } from "react";

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
        setSuggestions(data.features.map((feature) => feature.properties.formatted));
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
    <div style={styles.container}>
      <h1>Location Autocomplete</h1>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Type a location..."
        style={styles.input}
      />
      <ul style={styles.suggestions}>
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            style={styles.suggestionItem}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "400px",
    margin: "0 auto",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  suggestions: {
    listStyleType: "none",
    padding: 0,
    margin: "10px 0 0 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    maxHeight: "150px",
    overflowY: "auto",
    background: "white",
    position: "relative",
  },
  suggestionItem: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  },
  suggestionItemHover: {
    background: "#f0f0f0",
  },
};

export default Location;
