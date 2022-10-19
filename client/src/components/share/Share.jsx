import { Cancel, EmojiEmotions, Label, PermMedia, Room } from "@material-ui/icons"
import { useContext, useState,useRef } from "react"
import "./share.css"
import {AuthContext} from "../../context/AuthContext"
import axios  from "axios";
import Rightbar from "../rightbar/Rightbar";

export default function Share() {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc= useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
          userId: user._id,
          desc: desc.current.value,
        };
        if(file){   //if we have a new file...
            const data=new FormData();   //we create new form data
            const fileName=Date.now() + file.name;   //to avoid the same naming of file from different users we use date
            data.append("name", fileName);
            data.append("file",file);    //we will indicate our file and name
            newPost.img = fileName;
            console.log(newPost);
            try {          //after that we will upload this and at the same time we will add this image in the newPost
                await axios.post("/upload", data);
            } catch (err) {console.log(err)}
        }
        try{    //and then we are gonna post to our API as a new post
            await axios.post("/post",newPost);
            window.location.reload();
        }catch(err){console.log(err)}
    }
  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="shareProfileImg" />
                <input placeholder={"What's on your mind " + user.username +" ?"} className="shareInput" ref={desc}/>
            </div>
            <hr className="shareHr" />
            {/* if we select or choose any file for uploading  */}
            {file && (
                <div className="shareImgContainer">
                    {/* here src allows us to create some psuedo url to see our file before uploading */}
                    <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                    <Cancel className="shareCancelImg" onClick={()=>setFile(null)} />
                </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    {/* we remove div from shareOption and use label html for...so we can use that option from here only like for example when we click on photos and vidos we can select files */}
                    <label htmlFor="file" className="shareOption">
                        <PermMedia htmlColor="tomato" className="shareIcon" />
                        <span className="shareOptionText">Photo or Video</span>
                        {/* we used [0] with target files so that it choose only one file at a time and not select multiple files */}
                        <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])} />   
                    </label>
                    {/* </div> */}
                    <div className="shareOption">
                        <Label htmlColor="blue" className="shareIcon" />
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor="green" className="shareIcon" />
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                <button className="shareButton" type="submit">Share</button>
            </form>
            </div>
        </div>
  )
}