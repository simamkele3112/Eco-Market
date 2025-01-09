import React, { useState } from "react";
import { gsap } from "gsap";

const Home = () => {
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");

  const handleAddToWishlist = (item, index) => {
    // Check if the item is already in the wishlist
    if (wishlist.includes(item.title)) {
      setMessage(`Item "${item.title}" is already in your wishlist!`);
      setTimeout(() => setMessage(""), 3000); // Hide message after 3 seconds
      return;
    }

    // Add the item to the wishlist
    setWishlist((prev) => [...prev, item.title]);

    // Create and animate the heart icon
    const button = document.getElementById(`wishlist-${index}`);
    const rect = button.getBoundingClientRect();
    const icon = document.createElement("div");
    icon.className = "floating-icon";
    icon.innerText = "❤️";

    // Position the heart icon relative to the button
    icon.style.position = "absolute";
    icon.style.left = `${rect.left + rect.width / 2 - 20}px`; // Center it horizontally
    icon.style.top = `${rect.top + rect.height / 2 - 20}px`; // Center it vertically
    icon.style.fontSize = "1.5rem";
    icon.style.color = "red";
    icon.style.opacity = "1";
    document.body.appendChild(icon);

    // GSAP animation for the heart icon
    gsap.to(icon, {
      y: -100, // Make it float upwards
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => icon.remove(), // Clean up after the animation
    });

    // Display the message after item is added to wishlist
    setMessage(`Added "${item.title}" to your wishlist!`);
    setTimeout(() => setMessage(""), 3000); // Hide message after 3 seconds
  };

  return (
    <>
      <main className="mt-5 text-center">
        <div className="container mb-3">
          <h1 className="mb-4">Shop Our Products</h1>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {[
              { title: "M5 Smart Monitor", price: "R7,000", description: "Upgrade your workspace with the sleek and powerful M5 smart monitor.", imgSrc: "https://via.placeholder.com/200" },
              { title: "16 Way DB-Box", price: "R700", description: "A reliable DB-box to manage your electrical needs effortlessly.", imgSrc: "https://via.placeholder.com/200" },
              { title: "Gold R", price: "R20", description: "Gold R premium product for an exceptional value.", imgSrc: "https://via.placeholder.com/200" },
              { title: "Polo Vivo", price: "R20,000", description: "Experience luxury on a budget with the Polo Vivo.", imgSrc: "https://via.placeholder.com/200" },
              { title: "C1 Bringer Microphone", price: "R9,000", description: "Capture studio-quality sound with the C1 Bringer microphone.", imgSrc: "https://via.placeholder.com/200" },
            ].map((item, index) => (
              <div className="col" key={index}>
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={item.imgSrc}
                    alt={`${item.title} image`}
                    className="card-img-top"
                    style={{ height: "15rem", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-subtitle text-muted mb-2">{item.price}</p>
                    <p className="card-text">{item.description}</p>
                    <div className="mt-auto">
                      <a href="#" className="btn btn-primary me-2">
                        Buy Now
                      </a>
                      <button
                        id={`wishlist-${index}`}
                        onClick={() => handleAddToWishlist(item, index)}
                        className="btn btn-outline-secondary"
                      >
                        Wishlist +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Display the message */}
          {message && (
            <div
              className="alert alert-info position-fixed top-0 start-50 translate-middle-x z-index-5 w-75 text-center animate__animated animate__fadeIn"
              style={{
                transition: "opacity 0.3s ease",
                backgroundColor: "#d1ecf1",
                borderColor: "#bee5eb",
                color: "#0c5460",
                fontSize: "1.2rem",
                opacity: 1,
              }}
            >
              {message}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
