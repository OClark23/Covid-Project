import express from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';

import { on } from './db';
import itemRouter from './routes/item-router';
import patientRouter from './routes/patient-router';

const app = express();
const apiPort = 3000;

app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(json());

on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', itemRouter);
app.use('/api', patientRouter);

app.listen(apiPort, () => {
    console.log(`[Hack.Diversity React Template] - Server running on port ${apiPort}`);
});

app.listen(process.env.PORT || 3001, () => {
    console.log(`app is running on port ${process.env.PORT}`);
  });