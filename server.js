const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoURI = 'mongodb://localhost:27017/'; 
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error('MongoDB connection error:', err));

  mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error('MongoDB connection error:', err));


const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

app.use(express.static(path.join(__dirname, 'frontend')));


app.get('/api/tasks/:list', async (req, res) => {
  const { list } = req.params;
  const tasks = await Task.find({ list });
  res.status(200).json(tasks);
});
app.post('/api/tasks', async (req, res) => {
  const { name, list } = req.body;
  const newTask = new Task({ name, list });
  await newTask.save();
  res.status(201).json(newTask);
});
app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id, { completed: true }, { new: true });
  res.status(200).json(task);
});
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.status(200).json({ message: 'Task deleted successfully' });
});


app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Save the new user to the database
    const newUser = new User({ email, password });
    await newUser.save();
    console.log('User signed up:', { email });

    res.status(201).json({ message: 'Signup successful!' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Error signing up user.', error: error.message });
  }
});

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
  list: { type: String, default: 'my-day' },
});

const Task = mongoose.model('Task', taskSchema);
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

const PORT = 1000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
