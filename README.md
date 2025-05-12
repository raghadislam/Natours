# 🌿 Natours - Nature Tours Booking System

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-blue)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-blueviolet)](https://stripe.com/)
[![Deployed on Railway](https://img.shields.io/badge/Deployed-Railway-6441a5)](https://railway.app)
[![Axois](https://img.shields.io/badge/%F0%9F%94%97-Axios-2e377f)](https://www.axios.com/)
[![npm](https://img.shields.io/badge/npm-red?logo=npm&label=%20%20%20%20%20%20%20%20&labelColor=gray)](https://www.npmjs.com/)
[![JWT](https://img.shields.io/badge/JWT-token-000000)](https://jwt.io/)
[![PUG](https://img.shields.io/badge/%F0%9F%90%B6-%20PUG-73930a)](https://pugjs.org/api/getting-started.html)
[![nodemon](https://img.shields.io/badge/nodemon-7aea0c?logo=nodemon&label=%20%20%20%20%20%20%20%20&labelColor=gray)](https://www.npmjs.com/package/nodemon/)

Natours is a full-stack web application featuring a RESTful API and a server-side rendered website designed for booking tours.

✅ **RESTful API Backend** (Node.js/Express)  
✅ **Client-Side Rendered Website** (Vanilla JS + Pug templates + CSS)  
✅ **Dtabase** (MongoDB with Mongoose for ORM)

## 🌍 Live Demo

<a href="https://natours-raghad.up.railway.app/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/Deployed_on-Railway-6441a5?logo=railway" alt="Railway"></a>

## 🏗️ System Overview

### 1. RESTful API (Backend)

A fully compliant REST API built with Express.js featuring:

- Resource-based endpoints (`/tours`, `/users`, `/reviews`, `/bookings`)
- Standard HTTP methods (GET, POST, PATCH, DELETE)
- Stateless authentication with JWT
- JSON responses
- Proper status codes (200, 201, 400, 404, etc.)

### 2. Client-Side Rendered Frontend

- Pug templetes
- DOM manipulation via JavaScript
- Webpack for bundling
- Axios for API communication
- Modern ES6+ features

## ✨ Features

### 🔐 Security

- JWT authentication with HTTP-only cookies
- Rate limiting (100 req/hour)
- Helmet security headers
- Data sanitization against NoSQL injection
- Password encryption with bcrypt

### 📧 Email System

- Nodemailer with gmail integration
- Real email delivery in production for:
  - Welcoming clients on signing up
  - Password resets
  - Booking confirmations

### 💳 Payment System

- Secure credit card payments with Stripe
- Complete checkout flow
- Webhook integration for payment confirmation
- Booking creation on successful payment

### 🗺️ Geospatial Features

- Tours within radius search
- Distance calculation to all tours from point
- leaflet integration with interactive maps

### 🖼️ Image Handling

- User photo uploads (Multer + Sharp)
- Multiple tour image uploads
- Automatic image processing:
  - Resizing to 500x500
  - Format conversion to JPEG
  - Quality optimization

## API Documentation

<a href="https://documenter.getpostman.com/view/43487895/2sB2jAb7qR" target="_blank" rel="noreferrer"><img src="https://run.pstmn.io/button.svg" alt="Run in Postman"></a>

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB Atlas or local MongoDB
- Stripe account
- Gmail account (for emails)

### Installation

```bash
git clone https://github.com/raghadislam/Natours.git
cd Natours
npm install
```

**Setting up env variables:**

```
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
DATABASE=<your_mongo_db_URL>
DATABASE_PASSWORD=<your_mongo_db_password>

# Authentication
JWT_SECRET=<your_jwt_secret_key>
JWT_EXPIRES_IN=<JWT_expiration_date>
JWT_COOKIE_EXPIRES_IN=<JWT_cookie_expiration_date>

# Email Services
## Mailtrap (Development)
EMAIL_HOST=<sandbox.smtp.mailtrap.io>
EMAIL_PORT=587
EMAIL_USERNAME=<your_mailtrap_username>
EMAIL_PASSWORD=<your_mailtrap_password>

## Gmail (Production)
GMAIL_LOGIN=<your_gmail>
GMAIL_PASSWORD=<your_gmail_app_key>

# Payments
STRIPE_SECRET_KEY=<your_stripe_secret_key>

# General Settings
EMAIL_FROM=<your_sender_email>
```
