const express = require('express');
const path = require('path');
const connectDB = require('./API/config/db');
const userrouter = require('./API/features/user/routes/user_router');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

connectDB();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML page with Speed Insights at the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/note', userrouter);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));