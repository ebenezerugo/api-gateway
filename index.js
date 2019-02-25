const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const database = require('./config/database');
const config = require('./config/app');
const router = require('./routers/router');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res, next) => {
    res.json({
        message: "welcome to API Gateway"
    });
});

app.use('/gateway',router);

app.listen(config.port, err => {
    console.log('Running on localhost at port ' + config.port);
});