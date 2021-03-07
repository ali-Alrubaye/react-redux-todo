const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});

app.use('/todo', require('./routes/todoRoutes'));
app.use('/todo/toFinished', require('./routes/todoRoutes'));
