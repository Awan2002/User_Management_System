var Userdb = require("../model/model");

//create and Save new user
exports.create = (req,res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message : "Content can not be Empty!"});
        return;
    }

    //new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status : req.body.status
    })

    //save user in database
    user
      .save(user)
      .then(data => {
        res.redirect('/add-user');
      })
      .catch(err => {
        res.status(500).send({
            message :err.message || "Some error occured while creating a create operation"
        })
      });
}

//retrieve and return all users/ retrive and return single user
exports.find = (req,res) => {
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
          .then(data => {
            if(!data){
                res.status(404).send({message : "Not found user with id=" + id})
            }
            else{
                res.send(data)
            }
          })
          .catch(err => {
            res.status(500).send({message : "Error retrieving user with id=" + id})
          })
    }else{
        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({message : err.message || "Error occured while retriving user information"})
        });
    }
    
}

//update an new identified user by user id
exports.update = (req,res) => {
    console.log("update");
    if(!req.body){
        return res
          .status(400)
          .send({message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {userFindAndModify : false})
      .then(data => {
        if(!data){
            res.status(404).send({message : `Cannot update user with ${id}. Maybe user not found!`})
        }
        else{
            res.send(data)
        }
      })
      .catch(err => {
        res.status(500).send({message : "Error Update user information"})
      })
}

//Delete with specify user id
exports.delete = (req, res) => {
    const id = req.params.id;
    
    Userdb.findByIdAndDelete(id)
      .then(data => {
        if(!data){
            res.status(404).send({message : `Cannot delete with ${id}. Maybe id is wrong`})
        }
        else{
            res.send({message : "User was deleted Succesfully!"})
        }
      })
      .catch(err => {
        res.status(500).send({messsage : "COuld not delete User with id=" + id})
      });
}