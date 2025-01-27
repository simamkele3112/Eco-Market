# Eco Marketplace

Eco Marketplace is an online platform that allows users to create accounts, sell their products, and buy products from others. The project is built using Node.js for the backend, React for the frontend, and MongoDB as the database. The application uses RESTful APIs for communication between the client and server.

# Features

User Authentication: Users can create an account, log in, and manage their profiles.

Product Management: Users can add, edit, and delete their products.

Marketplace: Browse and search for products listed by other users.

Secure Transactions: Provides a safe platform for buying and selling products.

Responsive Design: Mobile and desktop-friendly UI.

# Tech Stack

# Frontend

React: For building the user interface.

Bootstrap: For responsive and elegant design.

# Backend

Node.js: For server-side scripting.

Express.js: As the web framework for building RESTful APIs.

# Database

MongoDB: For storing user and product data.

#Getting Started

Prerequisites

Node.js (v16 or later)

MongoDB (local or cloud instance)

# Git

Installation

Clone the repository:

git clone https://github.com/yourusername/eco-marketplace.git

Navigate to the project directory:

cd eco-marketplace

Install backend dependencies:

cd backend
npm install

Install frontend dependencies:

cd ../frontend
npm install

Create environment files:

For the backend, create a .env file in the backend directory with the following variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Start MongoDB (if running locally):

mongod

Start the backend server:

cd backend
npm start

Start the frontend server:

cd ../frontend
npm start

Usage

Open your browser and navigate to http://localhost:3000.

Sign up to create an account.

Add your products or browse products from other users.

Enjoy a seamless buying and selling experience.

Folder Structure

/
|-- backend/         # Node.js backend code
|-- frontend/        # React frontend code
|-- README.md        # Project documentation

# API Endpoints

# Authentication

POST /api/users/register - Register a new user

POST /api/users/login - Log in a user

# Products

GET /api/products - Fetch all products

POST /api/products - Add a new product

PUT /api/products/:id - Update a product

DELETE /api/products/:id - Delete a product

Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

# License

This project is licensed under the MIT License. See the LICENSE file for details.

