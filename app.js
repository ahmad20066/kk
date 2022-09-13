const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const urlencoded = require('body-parser/lib/types/urlencoded');
const shopRouter = require('./routes/shop');
const orderRouter = require('./routes/order_router')
const authRouter = require('./routes/auth');
const categoryRouter = require('./routes/categroy')
const homeRouter = require('./routes/home')
const sectionRouter = require('./routes/section');
const adminRouter = require('./routes/admin');
app.use(bodyParser.json({limit : '50mb'}));

app.use('/images',express.static('images'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use('/shop',shopRouter);
app.use('/Orders',orderRouter);
app.use('/auth',authRouter);
app.use('/categories',categoryRouter);
app.use('/home',homeRouter);
app.use('/sections',sectionRouter);
app.use('/admin',adminRouter);

app.use((error,req,res,next) => {
    console.log(error);
    const message = error.message
    const status = error.statusCode || 500;
    res.status(status).json({
        Message : message
    });
})
mongoose.connect("mongodb+srv://ahmad:e3wqZV7ItJgFNJKD@ecommerce.mp1nxul.mongodb.net/?retryWrites=true&w=majority").then(() =>{
    console.log("Connected");
    app.listen(3000);
})
