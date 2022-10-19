import "./rightbar.css"
import { Users} from "../../dummyData"
import Online from "../online/Online";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";




export default function Rightbar({user}) {    //we are gonna take this user
  // console.log(user._id)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [friends, setFriends] = useState([]);   //for the initial state it's gonna be empty array
  const {user: currentUser , dispatch} = useContext(AuthContext);
  const [followed, setFollowed] = useState(!currentUser.followers.includes(user?.id));

  // useEffect(()=>{
  //   setFollowed(currentUser.followings.includes(user?.id));
  // },[currentUser , user.id]);
  useEffect(()=>{
    const getFriends = async ()=>{ 
      try{
      const friendList= await axios.get("/users/friends/" + user._id );   //and use this id and fetch all friends    
        setFriends(friendList.data);    // after fetching we are just setting these friends  // friendList will have whole response but we only need data so we use friendList.data
      }catch(err){
        console.log(err);
      } 
    };
    getFriends();     //calling this function....we can't use async inside useEffect so we define a async functin and call that function
  },[user])     //our dependency will be userid
  

  const handleClick= async ()=>{
    try{
      if(followed){
        await axios.put("/users/" + user._id + "/unfollow" , { userId: currentUser._id});
        dispatch({type:"UNFOLLOW", payload:user._id})
      }else{
        await axios.put("/users/" + user._id + "/follow" , { userId: currentUser._id});
        dispatch({type:"FOLLOW", payload:user._id})

      }
    }catch(err){
      console.log(err);
    }
    setFollowed(!followed)
  };

  const HomeRightbar = ()=>{
    return (
      <>
       <div className="birthdayContainer">
          <img src="assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Ksp</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img src="assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
         {Users.map(u=>(
           <Online key={u.id} user={u}/>
         ))}
        </ul>
      </>
    )
  };

  const ProfileRightbar = ()=>{
    return (
      <>
      {user.username!==currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick} >
          {followed? "Unfollow":"Follow"}
          {followed? <Remove/>: <Add/>}
        </button>
      )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship===1 ? "Single" : user.relationship===2 ? "Married" : "Hopeless"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend)=>{
            return <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }} >
            <div className="rightbarFollowing">
            <img 
              src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"}
              alt=""
              className="rightbarFollowingImg"
              />
            <span className="rightbarFollowingName">{friend.username}</span>
          </div>
              </Link>
            })}
        </div>
      </>
    )
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
      {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}
