const Sequelize = require('sequelize');
const sequelize = require('../util/database');

//id, name , password, phone number, role

const Contact = sequelize.define('contact', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fullname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.INTEGER
    },
    
    address:{
        type: Sequelize.STRING
       
    },
    city: {
        type: Sequelize.STRING
       
    },
    email: {
        type: Sequelize.STRING
       
    }
    
});

module.exports = Contact;
