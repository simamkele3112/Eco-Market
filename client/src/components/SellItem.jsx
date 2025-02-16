import React, { useState, useEffect } from 'react';
import ReUseLocation from './ReUseLocation';

const SellItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState('');
  const [offerDelivery, setOfferDelivery] = useState(false);
  const [itemImages, setItemImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setItemImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !description || !price || !category || !condition || !location) {
      alert('⚠️ Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('condition', condition);
    formData.append('location', location);
    formData.append('offerDelivery', offerDelivery.toString());
    itemImages.forEach((image) => formData.append('itemImages', image));

    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert('✅ Your item has been successfully listed for sale!');
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setCondition('');
        setLocation('');
        setOfferDelivery(false);
        setItemImages([]);
      } else {
        alert(result.error || '⚠️ Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error submitting the form. Please try again later.');
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
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Item Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter the name of the item"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Item Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="4"
              placeholder="Provide a detailed description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price (Rands)</label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="Enter the price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              className="form-select"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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

          <div className="mb-3">
            <label htmlFor="condition" className="form-label">Item Condition</label>
            <select
              className="form-select"
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
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

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="offerDelivery"
              checked={offerDelivery}
              onChange={(e) => setOfferDelivery(e.target.checked)}
            />
            <label htmlFor="offerDelivery" className="form-check-label">Offer Delivery?</label>
          </div>

          <div className="mb-3">
            <label htmlFor="itemImages" className="form-label">Upload Item Images</label>
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
                    {itemImages.map((image, index) => (
                      <li key={index}>{image.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <ReUseLocation setLocation={setLocation} />

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
