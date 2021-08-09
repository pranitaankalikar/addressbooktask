const Contact = require('../models/contact');
var Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Op = Sequelize.Op;




exports.postaddcontact = (req, res, next) => {
    console.log(req.body);     ////////http://localhost:2000/contact/addcontact
    const {fullname,phone,address,city,email}=req.body;
    console.log(fullname,phone,address,city,email);
    Contact.create({fullname,phone,address,city,email}).then((contact)=>{
         res.status(201).json({contact,message:'contact added successfully'});
    }).catch(err=>res.status(403).json({success:false,error:err}))
    
};

exports.getcontact = (req, res)=> {
     const pageAsNumber=Number.parseInt(req.query.page);
     const sizeAsNumber=Number.parseInt(req.query.size);
     //console.log(typeof(page),typeof(size));
     let page=0;
     if(!Number.isNaN(pageAsNumber) && pageAsNumber>0){
         page=pageAsNumber;
     };
     let size=5;
     if(!Number.isNaN(sizeAsNumber) && sizeAsNumber>0 && sizeAsNumber<10 ){
        size=sizeAsNumber;
    };

  Contact.findAndCountAll({
      limit:size,
      offset:page*size
  }).then(elements => {
      return res.status(200).json({contacts:elements.rows, totalpages:Math.ceil(elements.count/size ), totalcount:elements.count});
  })
  .catch(err => {
      return res.status(402).json({ error: err, success: false})
  })
};


exports.deletecontact = (req, res) => {
  const contactid = req.params.contactid;
  console.log(contactid);
  Contact.destroy({where: { id: contactid }}).then(() => {
      return res.status(204).json({ success: true, message: "Deleted Successfuly"})
  }).catch(err => {
      console.log(err);
      return res.status(403).json({ success: true, message: "Failed"})
  })
}

exports.postsearch = (req, res) => {
    const lookupValue = req.params.letters;
    Contact.findAll({
            limit: 5, 
            where: {
                [Op.or]: [ {fullname: {[Op.like]: `%${lookupValue}%`}},
                           {phone: {[Op.like]: `%${lookupValue}%`}},
                           {address: {[Op.like]: `%${lookupValue}%`}},
                           {city: {[Op.like]: `%${lookupValue}%`}},
                           {email: {[Op.like]: `%${lookupValue}%`}}
                ]
            }
        })
        .then(data => {
        
            return res.status(200).json({contacts:data});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });


    
  }

