// npm

//utilize api to censor things
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
//import verifyToken from './middleware/verify-token'

// Import routers

const authRouter = require('./controllers/auth');
//const testJwtRouter = require('./controllers/test-jwt');
const usersRouter = require('./controllers/users');
const forumsRouter = require('./controllers/forums')
const postsRouter = require('./controllers/posts')
const commentsRouter = require('./controllers/comments')


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes - connects route to controller
app.use('/auth', authRouter);
//app.use('/test-jwt', testJwtRouter);


// if you want to verify whole controllers
// import verifytoken above
// then just set it up as a middleware function like below

app.use('/users', usersRouter);

app.use('/forums', forumsRouter)
// app.use(verifyToken)
app.use('/posts', postsRouter)
// app.use('/posts/:postId/comments', commentsRouter)

// Start the server and listen on port 3000
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});
