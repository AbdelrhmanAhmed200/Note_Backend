const express = require('express');
const connectDB = require('./API/config/db');
const userrouter = require('./API/features/user/routes/user_router')
const app = express();
app.use(express.json())
connectDB();
app.get('/', (req, res) => res.send('Welcome Here!'));

app.use('/note',userrouter)
app.listen(process.env.port, () => console.log('server running'));