import React from "react";
import LiftSidebar from "./liftSidebar"
import RightSideBar from "./rightSidebar"
import { useDispatch, useSelector } from "react-redux";
import { StopLoading, addFollows, loading, removeFollows } from "../action/user";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function MyProfile(props){
    const {Authuser}=useSelector(state=>state.userProfile) 
    if(Authuser!==undefined){
     console.log(Authuser)   
    }
return(
    <>
    <div className="main">
    <div className="sidebar right">
      {Authuser!==undefined&&(  
     <LiftSidebar user={Authuser}/>
      )}
      </div>
      {Authuser!==undefined&&(  
       <>
    <div className="center_page" style={{border:"none"}}>
    
      <div className="profile_info">
      
      <img src="http://localhost:3000/back.png" onClick={()=>window.history.back()}/>
        <p className="text_profile_info">{Authuser.firstname} {props.userProfile.lastname}</p>
        <p className="tweets_profile_info">{Authuser.tweets.length} posts</p>
        </div>  
    <div className="profile_container">
    <div className="profile_container_img_big"></div>
    <div className="profile_container_img_small"><p>{Authuser.firstname[0]}</p></div>
    <p className="text_profile_info_main">{Authuser.firstname} {Authuser.lastname}</p>
    <p className="text_profile_info_main_nickname">@{Authuser.nickname}</p>
    <div className="porfile_container_follow">
  
        {Authuser!==undefined&&(
        <>
       <Link style={{textDecoration:"none"}} to={`followings`}> <p className="following"><b style={{color:'black'}}>{Authuser.followings.length}</b> Followings</p></Link>
       <Link style={{textDecoration:"none"}} to={`followers`}><p className="followers"><b style={{color:'black'}}>{Authuser.followers.length}</b> Followers</p> </Link> 
        </>
        )}
       

    </div>
    
    <div className="profile_container_follow">
            <button className="profile_container_following_btn">Edit Profile</button>           
    </div>
    </div>
    </div>
    </>
    )}
    <div className="sidebar_right">
        <RightSideBar />
      </div>
      </div>
    </>
)
}