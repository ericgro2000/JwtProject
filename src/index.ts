import express from 'express';

const app = express();

app.get('/', (req, res) => {
  console.log('Received request on root route');
  res.send('Hello, World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Listening for requests...');
});

console.log('Server setup complete');