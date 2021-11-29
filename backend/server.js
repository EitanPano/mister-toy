const express = require('express');
const cors = require('cors');
const path = require('path');
const expressSession = require('express-session');

const app = express();
const http = require('http').createServer(app);

// session setup
const session = expressSession({
    secret: 'coding is amazing',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
});
// Express App Config
app.use(express.json());
app.use(session);
app.use(express.static('public'));

if (process.env.NODE_ENV === 'production') {
    // Express serve static files on production environment
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    // Configuring CORS
    const corsOptions = {
        // Make sure origin contains the url your frontend is running on
        origin: [
            'http://127.0.0.1:8080',
            'http://localhost:8080',
            'http://127.0.0.1:3000',
            'http://localhost:3000',
        ],
        credentials: true,
    };
    app.use(cors(corsOptions));
}

// Express Routing:
// app.get('/', (req, res) => {
//     res.send('Success');
// });

// SOCKETS
const { connectSockets } = require('./services/socket.service');
connectSockets(http, session);

// ALS
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware');
app.all('*', setupAsyncLocalStorage);

// Auth API
const authRoutes = require('./api/auth/auth.routes');
app.use('/api/auth', authRoutes);

// User API
const userRoutes = require('./api/user/user.routes');
app.use('/api/user', userRoutes);

// Toy API
const toyRoutes = require('./api/toy/toy.route');
app.use('/api/toy', toyRoutes);

// Review API
const reviewRoutes = require('./api/review/review.routes');
app.use('/api/review', reviewRoutes);

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const logger = require('./services/logger.service');
const port = process.env.PORT || 3000;
http.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}`);
});
