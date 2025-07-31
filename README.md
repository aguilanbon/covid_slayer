
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