const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const HttpError = require('./models/http-error');
const stateRoutes = require('./routes/state-route');
const app = express();
var cors = require('cors')
app.use(bodyParser.json());

app.use(cors());
app.use('/api/states',stateRoutes);

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})

app.use((req, res, next)=>{
    const error = new HttpError ("could not find this route", 404);
    throw error;
})

app.use((error,req, res, next) => {
    if(res.headerSent){
        return next(error)
    }
    res.status(error.code || 500 )
    res.json({message: error.message || "Unknown error occured"})
});

 mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@atlascluster.kgkrn95.mongodb.net/India?retryWrites=true&w=majority`)
 .then(()=>{app.listen(process.env.PORT || 5000)})
 .catch(err=>{console.log(err)}) 
