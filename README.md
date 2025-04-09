# Next.js Shopping App

The Next.js shopping app is a simple e-commerce application that uses Next.js, React, Tailwind CSS, MongoDB, TypeScript. It allows users to browse products, add them to the cart, and checkout.

<!-- ![App screenshot](./public/screenshot.png) -->

## Features

- Responsive and user-friendly interface
- Product listing and filtering by category
- Shopping cart and checkout functionality
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
NEXT_PUBLIC_BASE_URL= # your backend url
CONNECTION= # your MongoDB connection string
SECRET= # your secret key
PORT= # backend port
HOST=localhost
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.
