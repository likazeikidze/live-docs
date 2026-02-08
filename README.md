# Live Collaborative Editor (Liveblocks + Next.js)

A real-time collaborative document editor built with **Next.js**, **Liveblocks**, and **Clerk** authentication.

The app allows multiple users to edit the same document simultaneously with live cursors and shared state.

This project focuses on real-time collaboration, authentication, and modern frontend architecture, similar to tools like Google Docs.

## 🚀 Features

- Real-time collaborative editing
- Live cursors & presence indicators
- Authenticated users **(Clerk)**
- Shared document state using **Liveblocks** rooms
- Modern UI with **Tailwind CSS**
- Permissions and role-based access may be added in future iterations.

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Liveblocks** – real-time collaboration
- **Clerk** – authentication
- **Tailwind CSS**
- Environment Variables (for local setup)

## Environment Variables

To run the project locally, create a `.env.local` file with the following:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_key
LIVEBLOCKS_SECRET_KEY=your_key
```

> **Note:** Environment variables are required for Clerk and Liveblocks. Make sure your `.env.local` file is set up correctly before running the app.

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Run the development server

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## 📸 Screenshots

### Homepage (Light & Dark Mode)

![Homepage Light Mode](/public/assets/images/screenshots/homepage-light.png)
![Homepage Dark Mode](/public/assets/images/screenshots/homepage-dark.png)

### Editor Page

![Editor Page](/public/assets/images/screenshots/editor.png)

### Live Collaboration

![Live Collaboration](/public/assets/images/screenshots/live-collaboration.png)

### Delete Modal

![Delete Modal](/public/assets/images/screenshots/delete-modal.png)
