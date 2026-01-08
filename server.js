const express = require('express');
const connectDB = require('./API/config/db');
const userrouter = require('./API/features/user/routes/user_router');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

connectDB();
app.get('/', (req, res) => res.send('Welcome Here!'));

app.use('/note', userrouter);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));