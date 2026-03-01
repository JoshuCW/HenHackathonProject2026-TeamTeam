const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const mongoUri = 'mongodb+srv://joshwash_db_user:QGzEcckGXKeY1S4p@swishbackend.qly6ifm.mongodb.net/';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const postSchema = new mongoose.Schema({
  title: String,
  location: String,
  time: String,
  price: String,
  level: String,
  sport: String,
  indoor: Boolean,
  free: Boolean,
  x: Number,
  y: Number,
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

// CRUD endpoints
app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.json(post);
});

app.put('/posts/:id', async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(post);
});

app.delete('/posts/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Add more schemas/routes as needed

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
