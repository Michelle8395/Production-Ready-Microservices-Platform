//imports the express library
const express = require('express');
const cors = require('cors');

//create an instance of an express application
const app = express();

// Use CORS middleware
app.use(cors());

//define the port where our express server will listen
const PORT = 5000;
 

// --- Endpoint 1: Root ---
// When someone visits http://localhost:5000/
app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to the Microservices Platform API',
        status: 'running'
    });
});

// --- Endpoint 2: Health Check ---
// When someone visits http://localhost:5000/health
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        service: 'backend-api',
        timestamp: new Date().toISOString()
    });
});

// --- Endpoint 3: Users ---
// When someone visits http://localhost:5000/users
app.get('/users', (req, res) => {
    res.json([
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com' }
    ]);
});

// --- Start the server ---
app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
    console.log(` Try these endpoints:`);
    console.log(`   - http://localhost:${PORT}/`);
    console.log(`   - http://localhost:${PORT}/health`);
    console.log(`   - http://localhost:${PORT}/users`);
});