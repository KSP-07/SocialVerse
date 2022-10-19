import "./feed.css"
import Share from "../share/Share"
import Post from "../post/Post"
import { useContext, useEffect, useState } from "react";
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"

// we are using this username prop to tell that now we are not in the homepage instead we are on profile page now
export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext);  //for fetching our current user so that we can use it's id

  // when i render this page,this component..i wanna fetch this posts..to do that we are using useEffect hook
  // it runs when we render our feed and we use empty array at the end so id does not run with every word we type coz feed will be rendered and so useEffect will run
  useEffect(() => {
    const fetchPosts = async () => {
      //here we are chekcing our prop and acting accordingly
      const res = username ? await axios.get("/post/profile/" + username) : await axios.get("post/timeline/" + user._id);
      // return res.data;
      // console.log(res);
      setPosts(res.data.sort((p1, p2) => {    //sorting the posts according to the newest posts first.
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
      );
    }
    fetchPosts();
  }, [username, user._id]); 

  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* if there is no username or username equal to current use username then show share  */}
      {(!username || username === user.username) && <Share />}    
      {posts.map((p) => (
          <Post key={p._id} post={p} />    //_id is our user data is db
        ))}
      </div>
    </div>
  )
}
