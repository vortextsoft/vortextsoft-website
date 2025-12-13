const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to Database
const connectDB = require('./config/db');
connectDB();

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/auth');
const servicesRoutes = require('./routes/services');
const caseStudiesRoutes = require('./routes/caseStudies');
const blogRoutes = require('./routes/blog');
const teamRoutes = require('./routes/team');
const careersRoutes = require('./routes/careers');
const applicationsRoutes = require('./routes/applications');
const messagesRoutes = require('./routes/messages');
const uploadRoutes = require('./routes/upload');
const emailRoutes = require('./routes/email');
const partnersRoutes = require('./routes/partners');
const meetingsRoutes = require('./routes/meetings');

app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/casestudies', caseStudiesRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/contact', messagesRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/partners', partnersRoutes);
app.use('/api/meetings', meetingsRoutes);

app.get('/', (req, res) => {
    res.send('Vortextsoft API is running');
});

// For local development
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export the app for Vercel
module.exports = app;
