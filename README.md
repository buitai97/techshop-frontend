# TechShop Frontend

[![CI](https://github.com/buitai97/techshop-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/buitai97/techshop-frontend/actions/workflows/ci.yml)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-Unlicensed-lightgrey)

Professional React + TypeScript frontend for an e-commerce laptop store, with separate customer and admin experiences.

## Live Demo

[https://techshop-alpha.vercel.app/](https://techshop-alpha.vercel.app/)

## Tech Stack

- React 19 + TypeScript
- Vite 7
- React Router 7
- Ant Design 5
- Tailwind CSS 4 + SCSS
- Axios
- ESLint (TypeScript + React rules)

## Key Features

- Customer storefront with product listing and detail pages
- Product search, filter, sorting, and pagination
- Cart management (add, update quantity, empty cart)
- Checkout flow and order submission
- User authentication (register/login/logout)
- Order history for authenticated users
- Admin user management
- Admin product management (create/delete)
- Protected admin routes

## Screenshots

### Hero Preview 1

![TechShop Hero Preview 1](public/client/images/hero-img-1.jpg)

### Hero Preview 2

![TechShop Hero Preview 2](public/client/images/hero-img-2.jpg)

## Project Structure

```text
src/
  components/
    admin/
    auth/
    client/
  context/
  modal/
  pages/
    admin/
    auth/
    client/
  services/
  styles/
```

## Routing Overview

- `/` - Client home
- `/products` - Product listing
- `/products/:id` - Product detail
- `/cart` - Shopping cart
- `/checkout` - Checkout
- `/thanks` - Order confirmation
- `/orders` - User orders
- `/login` - Sign in
- `/register` - Sign up
- `/admin` - Admin dashboard (protected)
- `/admin/users` - Admin users (protected)
- `/admin/products` - Admin products (protected)

## Getting Started

### Prerequisites

- Node.js 22+ (CI uses Node 22)
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=your_api_base_url_here
```

### Run in Development

```bash
npm run dev
```

The app will start on Vite's local dev server (typically `http://localhost:5173`).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Type-check and create production build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## API Integration

- Axios instance is configured in `src/services/axios.ts`.
- Base URL is read from `VITE_API_BASE_URL`.
- JWT access token is read from `localStorage` and attached as `Authorization: Bearer <token>`.
- API functions are organized in `src/services/api.ts`.

## CI

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on pull requests and pushes to `main`:

- Install dependencies (`npm ci`)
- Lint (`npm run lint`)
- Build (`npm run build`)

## Deployment

This project is suitable for deployment on Vercel, Netlify, or any static hosting platform that supports Vite builds.

Build command:

```bash
npm run build
```

Output directory:

```text
dist/
```

