import "./message.css";
import { format } from "timeago.js";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";


export default function Message({message,own ,currentId}) {
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const {user : currentUser}=useContext(AuthContext);
  return ( 
    <div className = { own ? "message own" : "message" }>
        <div className="messageTop">

            <p className="messageText">{message.text}</p>
            <img className="messageImg" src={own? (currentUser.profilePicture ? PF + currentUser.profilePicture :  PF + "person/noAvatar.png") : PF + "person/noAvatar.png"} alt="" />
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}
