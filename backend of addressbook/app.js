const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');


const sequelize = require('./util/database');
const Contact=require('./models/contact');


const contactRoutes = require('./routes/contact');


const app = express();

app.use(cors());


//app.use(bodyParser.urlencoded());  ////this is for handling forms
app.use(bodyParser.json());  //this is for handling jsons

// app.use(express.static(path.join(__dirname, 'public')));

app.use('/contact', contactRoutes);



sequelize
     //.sync({force:true})
     .sync()
    //  .then((re)=>{
    //      for(let i=1;i<=25;i++){
    //          const contact={
    //              fullname:`contact${i}`,
    //              phone:`123phone${i}`,
    //              address:`address${i}`,
    //              city:`city${i}`,
    //              email:`email${i}@gmail.com`
    //          };
    //          Contact.create(contact);
    //      }
         
        
    //  })
     .then(result => {
         // console.log(result);
         app.listen(1000);
     })
     .catch(err=>console.log(err));
