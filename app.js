const exspress = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const indexRouter = require('./router/indexRouter');
const usersRouter = require('./router/usersRouter');
const socksRouter = require('./router/socksRouter');
const cartRouter = require('./router/cartRouter');

// const chatRouter = require('./router/chatRouter');


const app = exspress();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(exspress.json());
app.use(exspress.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(exspress.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'snovaisnova',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    userName: 'login',
    store: new FileStore(),
  }),
);

// миддлвара для защиты ручек. Значение берется из сессии
app.use((req, res, next) => {
  res.locals.userId = req.session?.userId;
  res.locals.userName = req.session?.userName;
  //console.log(res.locals.userName);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/socks', socksRouter);
app.use('/product', cartRouter);
// app.use('/chat', chatRouter);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Сервер Работает на порту ${PORT}`);
});
