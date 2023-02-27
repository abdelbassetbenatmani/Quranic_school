const mongoose = require('mongoose')

mongoose.set('strictQuery', false);
const dbConnection = ()=>{
    mongoose.connect(process.env.DB_URI).then(()=>{
        console.log('Database connection successful');
    }).catch(err=>{console.log(`database error : ${err}`);})
}
module.exports  = dbConnection