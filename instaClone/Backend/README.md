# InstaClone (Social Media App)

Live demo: **https://socialme-instaclone.onrender.com/**

A full-stack Instagram-style clone built with:
- **React (Vite + SCSS)** for the frontend
- **Node.js + Express + MongoDB (Mongoose)** for the backend
- **JWT auth using httpOnly cookies**
- **Image uploads via ImageKit**

---

## Features

### Authentication
- Register user
- Login user
- Persist session via **JWT cookie**
- Logout

### Posts
- Create post with **image + caption**
- View posts in your feed (sorted by newest)
- Like / unlike posts

### Users & Following
- Follow / unfollow users
- Follow requests (pending/accepted/rejected)
- View followers and followings

---

## Tech Stack

**Frontend**
- React
- Vite
- React Router
- SCSS
- Axios

**Backend**
- Express
- Mongoose
- JWT (cookie-based)
- multer (in-memory file uploads)
- ImageKit

---

## Project Structure

- `instaClone/Frontend` — React app
- `instaClone/Backend` — Express API + MongoDB

---

## API Overview

All routes are prefixed in the backend:
- `GET/POST /api/auth/*`
- `GET/POST /api/posts/*`
- `GET/POST /api/user/*`

**Auth** (`/api/auth`)
- `POST /register`
- `POST /login`
- `GET /get-me` (protected)
- `POST /logout`

**Posts** (`/api/posts`)
- `POST /` (create post with image)
- `GET /` (fetch user posts)
- `GET /details/:postId` (protected + like info)
- `POST /like/:postId`
- `POST /unlike/:postId`
- `GET /feed` (protected)

**Users / Following** (`/api/user`)
- `POST /follow/:username`
- `POST /unfollow/:username`
- `GET /followrequests` (protected)
- `GET /pendingrequests` (protected)
- `GET /followings` (protected)
- `GET /followers` (protected)
- `POST /accept/:username`
- `POST /reject/:username`

---

## Environment Variables

Create a `.env` file inside **`instaClone/Backend`**:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

> Notes:
> - The app expects `cookie-parser` + `withCredentials: true` from the frontend.
> - `secure: true` cookies are used, which may require HTTPS in production.

---

## How to Run Locally

### 1) Backend

```bash
cd instaClone/Backend
npm install
npm run dev
```

### 2) Frontend

```bash
cd ../Frontend
npm install
npm run dev
```

Open the frontend at:
- `http://localhost:5173`

---

## Deployment

This project is deployed on **Render** (frontend is served by the backend build output).

Backend (`instaClone/Backend`) is responsible for:
- Connecting to MongoDB
- Serving the built React app
- Handling all API requests

---

## Screenshots / Demo

Visit the live link above for the latest version.

---

## License

MIT

