import React, { useState,useRef } from "react";
import LiftSidebar from "./liftSidebar"
import RightSideBar from "./rightSidebar"
import { useDispatch, useSelector } from "react-redux";
import { StopLoading, addFollows, loading, removeFollows } from "../action/user";
import { Link } from "react-router-dom";


export default function UserProfile(props){
    const {Authuser}=useSelector(state=>state.userProfile)
    const {user}=useSelector(state=>state.userProfile)
    const dispatch=useDispatch()
    const token=localStorage.getItem('token')
    console.log(Authuser)

    const addFollow=async ()=>{
     const url="http://localhost:8000/follow/add"
     //const dispatch=useDispatch()
    /* await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
            "Authorization":`Bearer ${token}`
        },
        body:{
            "followerId":1
        }
     }).then(response => {
        if(response.status===401){
            window.location.assign('http://localhost:3000/signin')   
        }else{
            console.log(response)
            console.log(props.userProfile.id)
        }
    })*/
    const AddFollowing=async ()=>{
        const url='http://localhost:8000/user/me'
        await fetch(url,{
            headers:{
                authorization:`Bearer ${token}`
            }
        }).then(res=>res.json()).then(s=>{
        localStorage.setItem('user',JSON.stringify(s))
    })
    }

    const AddFollower=async ()=>{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Authorization", `Bearer ${token}`)
        
        const urlencoded = new URLSearchParams();
        urlencoded.append("userId", props.userProfile.id);
        
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
        }    
     fetch("http://localhost:8000/user/get", requestOptions)
  .then(response => {
    if(response.status===401){
        window.location.assign('http://localhost:3000/signin')   
    }else{
        return response.json()
    }
    }).then(result=>{
        localStorage.setItem('user_profile',JSON.stringify(result))

    })
}

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${token}`)
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("followerId", props.userProfile.id);
    
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
    } 
    
    fetch(url,requestOptions).then(response => {
        if(response.status===401){
            window.location.assign('http://localhost:3000/signin')   
        }else{
            return response.json()

        }}).then(res=>{
            return(
                AddFollowing(),
                AddFollower(),
                dispatch(addFollows(user,res,Authuser,{id:res.id,uid:res.followerId,followingId:res.uid}))
            )
        })

    }
    const RemoveFollow=async()=>{

        /****** */
        const AddFollowing=async ()=>{
            const url='http://localhost:8000/user/me'
            await fetch(url,{
                headers:{
                    authorization:`Bearer ${token}`
                }
            }).then(res=>res.json()).then(s=>{
            localStorage.setItem('user',JSON.stringify(s))
        })
        }
    
        const AddFollower=async ()=>{
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            myHeaders.append("Authorization", `Bearer ${token}`)
            
            const urlencoded = new URLSearchParams();
            urlencoded.append("userId", props.userProfile.id);
            
            const requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: urlencoded,
            }    
         fetch("http://localhost:8000/user/get", requestOptions)
      .then(response => {
        if(response.status===401){
            window.location.assign('http://localhost:3000/signin')   
        }else{
            return response.json()
        }
        }).then(result=>{
            localStorage.setItem('user_profile',JSON.stringify(result))
    
        })
    }
    /******** */

       const url='http://localhost:8000/follow/remove'
       const myHeaders = new Headers();
       myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
       myHeaders.append("Authorization", `Bearer ${token}`)
       
       const urlencoded = new URLSearchParams();
       if(user!==undefined&&Authuser!==undefined){
        console.log(Authuser.followings.filter(s=>s.followerId==user.id)[0].id)
        console.log(user)
       urlencoded.append("id",`${Authuser.followings.filter(s=>s.followerId==user.id)[0].id}`);
       
       const requestOptions = {
         method: 'DELETE',
         headers: myHeaders,
         body: urlencoded,
       } 
       fetch(url,requestOptions).then(response=>{
        if(response.status===401){
            window.location.assign('http://localhost:3000/signin')   
        }else{
            return console.log(response)

        }}).then(()=>{
           return(
            dispatch(removeFollows(user,Authuser,user.followers.filter(x=>x.followingId==Authuser.id),Authuser.followings.filter(s=>s.followerId==user.id))),
            AddFollowing(),
            AddFollower(),
            dispatch(loading())
            )
        }).then(()=>dispatch(StopLoading()))
    }
    }
    if(user!==undefined){
    console.log(user.followers.filter(x=>x.followingId==Authuser.id))
    console.log(Authuser.followings.map(s=>s.id))
    console.log(Authuser.followings.filter(s=>s.followerId==user.id))
    }
return(
    <>
    <div className="main">
    <div className="sidebar right">
     <LiftSidebar user={props.user}/>
      </div>
    <div className="center_page" style={{border:"none"}}>

      <div className="profile_info">
      <img src="http://localhost:3000/back.png" onClick={()=>window.history.back()}/>
        <p className="text_profile_info">{props.userProfile.firstname} {props.userProfile.lastname}</p>
        <p className="tweets_profile_info">{props.userProfile.tweets.length} posts</p>
        </div>  
    <div className="profile_container">
    <div className="profile_container_img_big"></div>
    <div className="profile_container_img_small"><p>{props.userProfile.firstname[0]}</p></div>
    <p className="text_profile_info_main">{props.userProfile.firstname} {props.userProfile.lastname}</p>
    <p className="text_profile_info_main_nickname">@{props.userProfile.nickname}</p>
    <div className="porfile_container_follow">
        {user!==undefined&&(
        <>
        {console.log(Object.values(Authuser.followings).map(a=>a.followerId).filter(s=>s===props.userProfile.id)[0])}
       <Link style={{textDecoration:"none"}} to={`followings`}> <p className="following"><b style={{color:'black'}}>{user.followings.length}</b> Followings</p></Link>
       <Link style={{textDecoration:"none"}} to={`followers`}><p className="followers"><b style={{color:'black'}}>{user.followers.length}</b> Followers</p> </Link> 
        </>
        )}
       

    </div>
    <div className="profile_container_follow">

      {user!==undefined&&(
      Authuser!==undefined&&Authuser.followings!==undefined&&(  
    
     Object.values(Authuser.followings).map(a=>a.followerId).filter(s=>s===user.id)[0]===user.id?(  
            <button className="profile_container_following_btn" 
            onClick={()=>RemoveFollow()}>
                Following</button>
        ):Object.values(Authuser.followings).map(a=>a.followerId).filter(s=>s===user.id)[0]===undefined&&(
            <button className="profile_container_following_btn" onClick={()=>addFollow()}>Follow</button>
    
            )
            
      ))}
        

    </div>
    </div>
    </div>

    <div className="sidebar_right">
        <RightSideBar />
      </div>
      </div>
    </>
)
}