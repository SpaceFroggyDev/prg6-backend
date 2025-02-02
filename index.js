import express from 'express';
import mongoose from 'mongoose';
import stones from "./routes/stones.js";

const app = express();

app.use((req, res, next) => {
    if (req.method !== 'OPTIONS' && req.headers.accept !== 'application/json') {
        return res.status(406).json({error:"Only requests with 'Accept: application/json' are supported"})
    }
    next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://127.0.0.1:27017/prg6-stones');

app.use('/stones', stones);

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server is listening on port ${process.env.EXPRESS_PORT}`);
});