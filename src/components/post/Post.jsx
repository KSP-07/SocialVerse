import "./post.css"
import { MoreVert } from "@material-ui/icons"
import { useEffect, useState } from "react"
import axios from "axios"
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"


export default function Post({ post }) {
    // const user= Users.filter(u=> u.id===1);
    // console.log(user[0].username)\
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    // creating our user for our useEffect , we are using useEffect and creating our user so as we are now not fetching our dummy data
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const {user : currentUser}=useContext(AuthContext);


    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
      }, [currentUser._id, post.likes]);    //to check if user already liked the post or not

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);    //we are using post.userId coz it includes our userid
            // return res.data;
            // console.log(res);
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId]);  //using post.userId in the array as whenever we change user id it should be re rendered


    const likeHandler = () => {
        try{
            axios.put("/post/"+post._id+"/like" , {userId: currentUser._id})
        }catch(err){}
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked)
    } 
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`} >
                            <img className="postProfileImg" src={user.profilePicture ? PF + user.profilePicture :  PF + "person/noAvatar.png"} alt="" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc} </span>
                    <img className="postImg" src={PF + post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={`${PF}like.png`} onClick={likeHandler} alt="" className="likeIcon" />
                        <img src={`${PF}heart.png`} onClick={likeHandler} alt="" className="likeIcon" />
                        <span className="postLikeCounter">{like} people like it </span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>

        </div>
    )
}
