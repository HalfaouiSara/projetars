const express = require('express');
const app = express();

// ⚡ Ces lignes sont indispensables pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// tes routes
app.use('/api/auth', require('../social-backendcd/routes/auth'));
app.use('/api/posts', require('../social-backendcd/routes/post'));
app.use('/api/users', require('../social-backendcd/routes/user'));
