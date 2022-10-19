import "./sidebar.css"
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  HelpOutline,
  Event,
  School,
  ListAlt,
} from "@material-ui/icons";
import { Users} from "../../dummyData"
import CloseFriend from "../closeFriend/CloseFriend";
import { Link } from "react-router-dom";
import { RiCurrencyFill, RiShoppingBagFill } from "react-icons/ri";

export default function sidebar() {
  const anchor = () => {
    //make the componet open an given url in a new tab
    window.open(
      "http://127.0.0.1:5500/client/src/pages/Ecomerce/index.html",
      "_blank"
    );

  };
    
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
          <Link to="/messenger" style={{color:"black",textDecoration: "none"}}>
            <span className="sidebarListItemText">Chats</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
          <ListAlt className="sidebarIcon" />
            <Link to="/todo" style={{color: "black",textDecoration: "none" }}>
              <span className="sidebarListItemText">ToDo</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
           <RiShoppingBagFill className="sidebarIcon" />
           {/* when clicked on shopping it should open the ecommerce website index.html from folder */}
            {/* <Link to="/ecommerce" style={{color: "black",textDecoration: "none" }}> */}
            <div className="sidebarListItemText" style={{cursor:"pointer"}} onClick={anchor}>Shopping</div>
            {/* </Link> */}
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <RiCurrencyFill className="sidebarIcon" />
            <span className="sidebarListItemText">Token</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u)=>(
            <CloseFriend key={u.id} user={u}/>
          ))}
        </ul>
      </div>
    </div>
  )
}
