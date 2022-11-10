const mongoose = require("mongoose");
// var dbURI = 'mongodb://localhost:27017/regform';
var dbURI = 'mongodb+srv://rajsahilcoder:Raj%402002@cluster0.6dlwr.mongodb.net/wiecode?retryWrites=true&w=majority';
// var dbURI = 'mongodb+srv://rajsahilcoder:Raj%402002@cluster0.6dlwr.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-kfiw2u-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true';

// mongoose.connect(dbURI,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//     useCreateIndex:true
// }).then(()=>{
//     console.log(`connection successful`);
// }).catch((e)=>{
//     console.log(`no connection`);
// })


mongoose.connect(dbURI);
mongoose.connection.on("connected",()=>{
    console.log("Connected to database");
});
mongoose.connection.on("error",(err)=>{
    console.log("Database error: "+err);
});