BlogVerse/
├── client/          # Frontend Application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── features/    # Redux Toolkit slices
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── utils/       # Utility functions
│   └── public/
│
├── server/          # Backend Application
│   ├── config/      # Database configuration
│   ├── controllers/ # Request handlers
│   ├── middleware/  # Custom middleware (auth, error handling)
│   ├── models/      # Mongoose schemas
│   ├── routes/      # API routes
│   └── server.js    # Entry point
│
├── .env             # Environment variables (not in git)

## ⚙️ Installation

### Prerequisites
- Node.js (v14 or higher)
git clone <repository-url>
cd InkByte

### 2. Backend Setup
npm install

# Create .env file based on .env.example
cp .env.example .env

# Edit .env with your MongoDB URI and other configurations
# Example .env:
# PORT=5000

The server will start on `http://localhost:5000`.

### 3. Frontend Setup
cd ../client
npm install

# Edit .env if needed (e.g., API_BASE_URL)
# Example .env:
# VITE_API_BASE_URL=http://localhost:5000

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:5173`.

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create new blog (Editor+)
- `PUT /api/blogs/:id` - Update blog (Editor+)
- `DELETE /api/blogs/:id` - Delete blog (Editor+)

### Admin
- `GET /api/admin/users` - Get all users (Admin)
- `GET /api/admin/stats` - Get system stats (Admin)

## 🎨 Customization

### Changing the Theme
To change the color scheme, update the CSS variables in `client/src/index.css`:

```css
:root {
  --color-primary: #ff003c; /* Red */
  --color-secondary: #00f2fe; /* Cyan */
  --color-bg: #0a0a0a; /* Dark background */
  --color-text: #ffffff; /* White text */
}
