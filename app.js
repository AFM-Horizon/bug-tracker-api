// express Module: contains functions for building web apps & API's i.e. set(), get()
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const flash = require('connect-flash');
// const authHelper = require('./authentication/authHelper');
const express = require('express');
const chroma = require('chroma-log');
const bodyParser = require('body-parser');
const passport = require('passport');
const bugRouter = require('./routes/bug-routes');
const commentRouter = require('./routes/comments-routes');
const authRouter = require('./routes/auth-routes');

const app = express();

// No Rendering Required
// app.set('views', './src/views');
// app.set('view engine', 'ejs');

// No cOokies or Session Data
// app.use(cookieParser());

// app.use(session({
//   secret: 'createSecretKey',
//   resave: false,
//   saveUninitialized: true
// }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// No Flash Anymore
// app.use(flash());

app.use(chroma);

// Not Serving Any Static Files
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/components', express.static(`${__dirname}/components`));
// app.use('/bootstrap', express.static(`${__dirname}/node_modules/bootstrap/dist`));
// app.use('/jquery', express.static(`${__dirname}/node_modules/jquery/dist`));
// app.use('/dragula', express.static(`${__dirname}/node_modules/dragula/dist`));

// No Longer Require Default Route
// app.get('/', authHelper.loginRedirect, (req, res) => {
//   res.redirect('/bugs');
// });

app.use('/auth', authRouter);
app.use('/bugs', bugRouter);
app.use('/comments', commentRouter);

// Wont Be Needing This Either
// app.get('/error', (req, res) => {
//   res.render('error');
// });

module.exports = app;
