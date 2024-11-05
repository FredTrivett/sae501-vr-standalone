const express = require('express');
const cors = require('cors');
const app = express();

// Configurer CORS
app.use(cors({
    origin: 'http://127.0.0.1:3000', // Remplacez par l'URL de votre client
    methods: 'GET,POST,PUT,DELETE', // Méthodes autorisées
    credentials: true // Si nécessaire
}));
app.get('/', (req, res) => {
    res.send('Hello');
});
app.get('/test', (req, res) => {
    res.send('Test');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

