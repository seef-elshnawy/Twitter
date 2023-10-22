import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LiftSidebar from "./liftSidebar";
import RightSideBar from "./rightSidebar";
import { Nav, NavItem, NavLink } from "reactstrap";
import { getFollowings, userProfiles } from "../action/user";
import ReactLoading from 'react-loading';
import { Link } from "react-router-dom";

export default function Followings(props){
    const {Authuser}=useSelector(state=>state.userProfile) 
    const [active,setActive]=useState('followings')
    const token=localStorage.getItem('token')
     const dispatch=useDispatch()
    if(Authuser!==undefined){
        console.log(Authuser)   
       }
        const url='http://localhost:8000/user/users'
        fetch(url,{
          method:"POST",
          headers:{
            "Content-type":'application/json',
            "Authorization":`Bearer ${token}`
          },
          body:JSON.stringify({
           "users":props.user.followings.map(s=>s.followerId)
          })  
        }).then(res=>{
            if(res.status===401){
                window.location.assign('http://localhost:3000/signin')   
            }
            else{
            return(
              res.json()            
            )}
        }).then( s=>{
          localStorage.setItem('followings',JSON.stringify(s))
          dispatch(getFollowings(s))
        })
    const followings=useSelector(state=>state.userProfile.userFollowings)
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
    
      <div className="profile_info follow">
      
      <img src="http://localhost:3000/back.png" onClick={()=>window.history.back()}/>
        <p className="text_profile_info">{props.user.firstname} {props.user.lastname}</p>
        <p className="tweets_profile_info">{props.user.tweets.length} posts</p>
        <div className="follow_navbar">
         <Nav justified className=".Nav">
            <NavItem>
            <NavLink active href="././followers" className="follow_navbar_link" onClick={()=>setActive('followers')}>
                Followers
            </NavLink>
            {active==='followers'&&(
                <span className="active_underline">
            </span>
            )}
            
            </NavItem>
            <NavItem>
            <NavLink href="" className="follow_navbar_link" onClick={()=>setActive('followings')}>
                Followings
            </NavLink>
            {active==='followings'&&(
                <span className="active_underline">
                </span>
                )}
            </NavItem>
            </Nav>
         </div>
        </div>  
        <div className="follow_main_page">
        {followings===undefined&&(
         <>
         <ReactLoading type="spin" color="blue" height={35} width={35} className="loading follow_loading"/>    
        </>
      )}
        {followings!==undefined&&(
        followings.map(s=>(
<Link to={`http://localhost:3000/profile/view/${s.nickname}/${s.id}`} className="link" onClick={()=>{
            return(
            dispatch(userProfiles(s)),
            localStorage.setItem('user_profile',JSON.stringify(s))
       )}}>     
  <div className="element">
  <div className="profile_pic_element img_follow">{s.firstname[0]}</div>
   <div className="profile_name_element"> {s.firstname} {s.lastname}
       </div>
   <div className="profile_nickname_element">@{s.nickname}</div>
   </div>
   </Link>
        )))}
   
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