# Next.js Shopping App

The Next.js shopping app is a simple e-commerce application that uses Next.js, React, Tailwind CSS, MongoDB, TypeScript. It allows users to browse products, add them to the cart, and checkout.

<!-- ![App screenshot](./public/screenshot.png) -->

## Features

- Responsive and user-friendly interface
- Product listing and filtering by category
- Shopping cart and checkout functionality -->
- Data fetching and storage with MongoDB
- Styling with Tailwind CSS
- Deployment with Vercel

## Installation

To run the app locally, you need to have Node.js, npm, and MongoDB installed on your machine.

1. Clone the repository:

```bash
git clone https://github.com/meet931/QuickBuy-Frontend.git
```

2. Install the dependencies:

```bash
cd nextjs-shopping-app
npm install
```

3. Create a `.env.local` file in the root directory and add the following environment variables:

```bash
MONGODB_URI= # your MongoDB connection string
NEXT_PUBLIC_FIREBASE_API_KEY= # your firebase api key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN= # your firebase auth domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID= # your firebase project id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET= # your firebase storage bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID= # your firebase messaging sender id
NEXT_PUBLIC_FIREBASE_APP_ID= # your firebase app id

PAYMENT_URL= # http://localhost:3000
STRIPE_SECRET_KEY= # your Stripe secret key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= # your Stripe public key
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.
