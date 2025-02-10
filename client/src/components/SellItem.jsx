import React, { useState, useEffect } from 'react';
import ReUseLocation from './ReUseLocation';

const SellItem = () => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemCondition, setItemCondition] = useState('');
  const [itemImages, setItemImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleImageUpload = (event) => {
    setItemImages([...itemImages, ...event.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('itemDescription', itemDescription);
    formData.append('itemPrice', itemPrice);
    formData.append('itemCategory', itemCategory);
    formData.append('itemCondition', itemCondition);
    itemImages.forEach((image) => formData.append('itemImages', image));

    try {
      const response = await fetch('http://localhost:3000/products/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert('Your item has been successfully listed for sale!');
        setItemName('');
        setItemDescription('');
        setItemPrice('');
        setItemCategory('');
        setItemCondition('');
        setItemImages([]);
      } else {
        alert(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Error submitting the form. Please try again later.');
    }

    setIsSubmitting(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="container mt-5 text-center">
        <h3 className="text-danger">Only logged-in users can sell items.</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">List Your Eco-Friendly Item for Sale</h2>
      <div className="card shadow-lg p-4">
        <form onSubmit={handleSubmit}>
          {/* Item Name */}
          <div className="mb-3">
            <label htmlFor="itemName" className="form-label">
              Item Name
            </label>
            <input
              type="text"
              className="form-control"
              id="itemName"
              placeholder="Enter the name of the item"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>

          {/* Item Description */}
          <div className="mb-3">
            <label htmlFor="itemDescription" className="form-label">
              Item Description
            </label>
            <textarea
              className="form-control"
              id="itemDescription"
              rows="4"
              placeholder="Provide a detailed description of the item"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              required
            />
          </div>

          {/* Item Price */}
          <div className="mb-3">
            <label htmlFor="itemPrice" className="form-label">
              Price (Rands)
            </label>
            <input
              type="number"
              className="form-control"
              id="itemPrice"
              placeholder="Enter the price of the item"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              required
            />
          </div>

          {/* Item Category */}
          <div className="mb-3">
            <label htmlFor="itemCategory" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="itemCategory"
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="clothing">Clothing</option>
              <option value="vehicles">Vehicles</option>
              <option value="homes">Homes</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Item Condition */}
          <div className="mb-3">
            <label htmlFor="itemCondition" className="form-label">
              Item Condition
            </label>
            <select
              className="form-select"
              id="itemCondition"
              value={itemCondition}
              onChange={(e) => setItemCondition(e.target.value)}
              required
            >
              <option value="">Select condition</option>
              <option value="brandNew">Brand New</option>
              <option value="likeNew">Like New</option>
              <option value="gentlyUsed">Gently Used</option>
              <option value="wellWorn">Well Worn</option>
              <option value="forParts">For Parts</option>
            </select>
          </div>

          {/* Item Images */}
          <div className="mb-3">
            <label htmlFor="itemImages" className="form-label">
              Upload Item Images
            </label>
            <input
              type="file"
              className="form-control"
              id="itemImages"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
            <div className="mt-2">
              {itemImages.length > 0 && (
                <div>
                  <h6>Uploaded Images:</h6>
                  <ul className="list-unstyled">
                    {Array.from(itemImages).map((image, index) => (
                      <li key={index}>{image.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <ReUseLocation />

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'List Item for Sale'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellItem;
