const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(compression());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
}));
app.use(cookieParser());
app.use(express.json());
app.use(cors({ 
  origin: process.env.CLIENT_URL || 'http://localhost:5173', 
  credentials: true 
}));
app.use(helmet());
app.use(morgan('dev'));

// Route imports
const authRoutes = require('./routes/auth');
const membershipRoutes = require('./routes/memberships');
const trainerRoutes = require('./routes/trainers');
const programRoutes = require('./routes/programs');
const bookingRoutes = require('./routes/bookings');
const progressRoutes = require('./routes/progress');
const paymentRoutes = require('./routes/payment');
const adminRoutes = require('./routes/admin');

// Routes mounting
app.use('/api/auth', authRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Root endpoint
app.get('/', (req, res) => res.send('GymFitness API running'));

// Start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
