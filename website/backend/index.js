const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const weaponRoutes = require('./routes/weapons');

const app = express();
const PORT = process.env.PORT || 5001;

// Step 1: CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only frontend origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific HTTP methods
  credentials: true, // Allow cookies if needed
  optionsSuccessStatus: 204 // For legacy browser support
};

app.use(cors(corsOptions));

// Step 2: Apply Helmet for Security
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "http://localhost:3000"], // Allow frontend to connect
        fontSrc: ["'self'", "https:", "data:"],
      },
    },
  })
);

// Step 3: Body Parser Middleware
app.use(express.json());

// Step 4: Serve Static Files from the 'public' Directory
app.use(express.static(path.join(__dirname, 'public')));

// Step 5: Route Handling
app.use('/api/auth', authRoutes);
app.use('/api/weapons', weaponRoutes);

// Step 6: Fallback for Frontend Routing (for Production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
