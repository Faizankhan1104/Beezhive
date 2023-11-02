const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const session = require('express-session');


const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend's URL
  credentials: true, // Allow credentials (cookies)
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use(
  session({
    secret: 'yoursecrethere',
    resave: true,
    saveUninitialized: false,
  })
);

mongoose
  .connect('mongodb://127.0.0.1:27017/Newuser', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connected Successfully');
  })
  .catch((err) => {
    console.error('Error connecting to the DB:', err);
  });

// Registration route
// app.post('/register', async (req, res) => {
//   try {


//     const { name, email, password } = req.body;
//     if (!(email && name && password)) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const existingUser = await JobSeeker.findOne({ email });
//     if (existingUser) {
//       return res.status(401).json({ error: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await JobSeeker.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       'shhhhhhhh',
//       { expiresIn: '2h' }
//     );

//     // Clear the password field from the response
//     user.password = undefined;

//     res.status(201).cookie('token', token).json({ user, token });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ error: 'Error registering user' });
//   }
// });


// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const user = await JobSeeker.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, 'shhhhhhhh');

      // Clear the password field from the response
      user.password = undefined;

      const option = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Set cookie expiration time
        httpOnly: true, // Cookie accessible only via HTTP (not JavaScript)
      };

      res
        .status(200)
        .cookie('token', token, option)
        .json({ success: true, token, user });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
