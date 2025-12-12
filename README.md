# 🎬 WatchTrackr

A full-stack web application to track your watch progress across movies, TV shows, anime, and web series.

![WatchTrackr](https://img.shields.io/badge/React-18.2-blue) ![Node.js](https://img.shields.io/badge/Node.js-22.20-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

## 🌟 Features

- 📺 Browse movies, TV shows, anime, and web series
- 🔐 Google OAuth authentication
- ✅ Mark episodes as watched
- 📊 Track watch progress across all content
- 🎨 Modern, dark-themed UI with Tailwind CSS
- 🎭 Real data from TMDB API

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Axios

### Backend
- Node.js & Express
- MongoDB (Atlas)
- Passport.js (Google OAuth)
- JWT Authentication

### APIs
- TMDB (The Movie Database)
- Google OAuth 2.0

## 📁 Project Structure
```
WatchTrackr/
├── watchtrackr-frontend/     # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── context/          # React context
│   │   └── services/         # API services
│   └── package.json
├── watchtrackr-backend/      # Express backend
│   ├── config/               # Configuration files
│   ├── models/               # MongoDB models
│   ├── routes/               # API routes
│   ├── middleware/           # Custom middleware
│   └── server.js
└── package.json              # Root package
```
## Please Note that the Live Link is not working due to MongoDB free tier restrictions. You can refer to the screenshots attached with the project .

## 🚀 Getting Started


### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Google Cloud Console account
- TMDB API account

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/watchtrackr.git
   cd watchtrackr
```

2. **Install dependencies**
```bash
   npm run install:all
```

3. **Setup Environment Variables**

   **Backend** - Create `watchtrackr-backend/.env`:
```bash
   cp watchtrackr-backend/.env.example watchtrackr-backend/.env
```
   
   Fill in your actual values:
   - MongoDB connection string
   - Google OAuth credentials
   - JWT secrets (generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`)
   - TMDB API key

   **Frontend** - Create `watchtrackr-frontend/.env`:
```bash
   cp watchtrackr-frontend/.env.example watchtrackr-frontend/.env
```

4. **Setup Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:5001/api/auth/google/callback`
   - Copy Client ID and Secret to `.env`

5. **Get TMDB API Key**
   - Sign up at [TMDB](https://www.themoviedb.org/signup)
   - Go to Settings → API → Request API Key
   - Copy API key to backend `.env`

6. **Seed Database with Sample Data**
```bash
   cd watchtrackr-backend
   node seedDataFromTMDB.js
   cd ..
```

### Running the Application

**Development Mode (Both servers):**
```bash
npm run dev
```

**Or run separately:**

Frontend:
```bash
npm run frontend
```

Backend:
```bash
npm run backend
```

The app will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001



## 🎯 API Endpoints

### Authentication
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback
- `GET /api/auth/me` - Get current user
- `GET /api/auth/logout` - Logout

### Content
- `GET /api/content` - Get all content (with optional type filter)
- `GET /api/content/:id` - Get content by ID
- `GET /api/content/:id/seasons` - Get seasons for content

### Seasons & Episodes
- `GET /api/seasons/:id/episodes` - Get episodes for season

### Progress
- `GET /api/progress` - Get user's watch progress
- `GET /api/progress/:contentId` - Get progress for specific content
- `POST /api/progress/toggle` - Toggle episode watched status

## 🔐 Environment Variables

See `.env.example` files in frontend and backend folders for required variables.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Bharath Reddy**
- GitHub: [@bharath-avl](https://github.com/bharath-avl)

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for the movie/TV data API
- [Google](https://developers.google.com/) for OAuth authentication
- [React](https://react.dev/) and [Express](https://expressjs.com/) communities

---

Made with ❤️ by Bharath Reddy
