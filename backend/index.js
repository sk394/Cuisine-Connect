import express from 'express';
import cors from 'cors';
import "dotenv/config";
import routes from './routes/index.js';

const app = express()
const port = 4000

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', async (req, res) => {
    try {
        res.status(200).json({ message: 'Api is working' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})