const User = require('../models/user')
const router=require('express').Router();
const bcrypt = require("bcrypt");


//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err); 
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});
//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user
router.get("/" , async(req,res) =>{
  const userId = req.query.userId;
  const username = req.query.username;
  try{
    const user = userId ? await User.findById(userId) : await User.findOne({username: username});
    const { password,updatedAt,...other}=user._doc    //this will prevent display of unnecessory properties like pass..and we will pass other below
    res.status(200).json(other)
  }catch(err){
    res.status(500).json(err);
  }
});

//get friends
router.get("/friends/:id", async(req,res)=>{
  try{
    const user=await User.findById(req.params.id);
    const friends= await Promise.all(    //here we are using array map
      user.followings.map((friendId)=>{     // its not user it just includes our userId and we are mapping with our followers Id that are stored in the database
        return User.findById(friendId);   //we move all these users inside these frinds array
      })
    ); //friends was storing all the properties of the user but we don't want that so again we are using another map
    let friendList=[];
    friends.map((friend)=>{
      const {_id, username, profilePicture } = friend;
      friendList.push({_id, username, profilePicture });
    });
    res.status(200).json(friendList);
  }catch(err){
    res.status(500).json(err);
  }
})
 
//follow a user
router.put("/:id/follow" , async(req,res) =>{
  if(req.body.userId!= req.params.id){
    try{
      const user= await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if(!user.followers.includes(req.body.userId)){
        await user.updateOne({$push: { followers: req.body.userId}});     //this is used to update the data of the user by pushing user id of new follower
        await currentUser.updateOne({$push: { followings: req.params.id}});      //this is used to update the data of the user by pushing user id of new follow
        res.status(200).json("user has been followed");

      }else{
        res.status(403).json("You already follow this user")
      }
    }catch(err){
      res.status(500).json(err);
    }
  }else{
    res.status(200).json("You already follow this user");
  }
});

//unfollow a user
router.put("/:id/unfollow" , async(req,res) =>{
  if(req.body.userId!= req.params.id){
    try{
      const user= await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if(user.followers.includes(req.body.userId)){   //checking if user follows him or not
        await user.updateOne({$pull: { followers: req.body.userId}});     //this is used to update the data of the user by pushing user id of new follower
        await currentUser.updateOne({$pull: { followings: req.params.id}});      //this is used to update the data of the user by pushing user id of new follow
        res.status(200).json("user has been unfollowed");

      }else{
        res.status(403).json("You don't follow this user")
      }
    }catch(err){
      res.status(500).json(err);
    }
  }else{
    res.status(200).json("You can't unfollow this user");
  }
})



 module.exports = router 