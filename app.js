// app.js
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const { verifyToken } = require('./middleware/authMiddleware');
const { checkRole } = require('./middleware/rbacMiddleware');
const { generateToken } = require('./utils/jwtHelper');

// Example users
const users = [
    { id: 1, username: 'admin', password: 'password', role: 'admin' },
    { id: 2, username: 'user', password: 'password', role: 'user' },
];

app.post('/login', (req, res) => {
    const user = users.find(
        (u) => u.username === req.body.username && u.password === req.body.password
    );
    if (!user) {
        return res.status(401).send('Invalid username or password.');
    }
    const token = generateToken(user);
    res.send({ token });
});

app.get('/resource', verifyToken, checkRole('read'), (req, res) => {
    res.send('Resource available for read access.');
});

app.post('/resource', verifyToken, checkRole('create'), (req, res) => {
    res.send('Resource created with create access.');
});

app.put('/resource', verifyToken, checkRole('update'), (req, res) => {
    res.send('Resource updated with update access.');
});

app.delete('/resource', verifyToken, checkRole('delete'), (req, res) => {
    res.send('Resource deleted with delete access.');
});

app.listen(PORT, () => {
    console.log("Server Running on port : "+PORT);
});
