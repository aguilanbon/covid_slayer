
## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or MongoDB Atlas account)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/aguilanbon/covid_slayer.git
cd covid_slayer
```

### 2. Install All Dependencies
```bash
npm run install-all
```
This command will install dependencies for the root, server, and client directories.

### 3. Environment Configuration

#### Server Environment Variables
Create a `.env` file in the `server` directory:
```bash
cd server
touch .env
```

Add the following variables to `server/.env`:
```env
PORT=5000
GEN_SALT=your_gen_salt
MONGODB_URI=mongodb://localhost:27017/covid_slayer
JWT_SECRET=your_super_secret_jwt_key_here
```

#### MongoDB Setup
- **Local MongoDB**: Ensure MongoDB is running on `mongodb://localhost:27017`
- **MongoDB Atlas**: Replace `MONGODB_URI` with your Atlas connection string

### 4. Start the Application

#### Development Mode (Recommended)
Run both client and server concurrently:
```bash
npm run dev
```

#### Individual Services
Start the server only:
```bash
npm run server
```

Start the client only:
```bash
npm run client
```

#### Production Mode
Build and start the application:
```bash
npm run build
npm start
```

## 🌐 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🚀 Deployment

### Live Demo
- **Frontend**: [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/aguilanbon/covid_slayer)
- **Backend**: [Deploy to Railway](https://railway.app/new/template?template=https://github.com/aguilanbon/covid_slayer)

### Manual Deployment Steps

#### 1. Backend Deployment (Railway/Render/Heroku)

**Option A: Railway (Recommended)**
1. Go to [Railway](https://railway.app)
2. Connect your GitHub account
3. Select this repository
4. Choose the `server` folder as the root
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string (32+ characters)
   - `GEN_SALT`: A secure salt for password hashing
   - `CORS_ORIGINS`: Your frontend URL (e.g., `https://your-app.vercel.app`)

**Option B: Render**
1. Go to [Render](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Set Root Directory to `server`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add the same environment variables as above

#### 2. Frontend Deployment (Vercel/Netlify)

**Option A: Vercel (Recommended)**
1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Set Framework Preset to "Vite"
4. Set Root Directory to `client`
5. Add environment variable:
   - `VITE_API_URL`: Your backend URL (e.g., `https://your-backend.railway.app/api`)
6. Deploy!

**Option B: Netlify**
1. Go to [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Set Build Command: `cd client && npm run build`
4. Set Publish Directory: `client/dist`
5. Add environment variable:
   - `VITE_API_URL`: Your backend URL
6. Deploy!

#### 3. Database Setup (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user
4. Whitelist your deployment IP addresses (or use 0.0.0.0/0 for all IPs)
5. Get your connection string and add it to your backend environment variables

### Environment Variables Setup

#### Server (.env)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/covid_slayer
JWT_SECRET=your_super_secure_jwt_secret_minimum_32_characters
GEN_SALT=your_secure_salt_for_password_hashing
CORS_ORIGINS=https://your-frontend-domain.vercel.app
```

#### Client (.env)
```env
VITE_API_URL=https://your-backend-url.railway.app/api
```

## 🎯 How to Play

1. **Register/Login**: Create an account or log in with existing credentials
2. **Start New Game**: Click "Start New Game" to begin battling COVID-19
3. **Choose Actions**:
   - **⚔️ Attack**: Deal moderate damage to COVID
   - **💥 Power Attack**: Deal high damage but with longer cooldown
   - **🧪 Heal**: Restore your health points
   - **🏳️ Surrender**: Give up the current game
4. **Win Conditions**:
   - Reduce COVID's health to 0
   - Have more health than COVID when timer expires
5. **Track Progress**: View your game history and statistics