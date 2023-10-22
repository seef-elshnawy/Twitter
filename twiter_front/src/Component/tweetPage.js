import React, { useState } from "react";
import LiftSidebar from "./liftSidebar";
import RightSideBar from "./rightSidebar";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from 'react-loading';
import { addComments, getCommentsUsers, getThisComment, tweetProfiles } from "../action/user";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function TweetPage(){
    const {tweetProfile}=useSelector(state=>state.userProfile)
    const {Authuser}=useSelector(state=>state.userProfile)
    const {comments}=useSelector(state=>state.userProfile)
    const comment_datails_profile=localStorage.getItem('comment_profile')
    const comment_datails_profile_user=localStorage.getItem('comment_profile_user')
    const {Responses}=useSelector(state=>state.userProfile) 
    const[reply,SetReply]=useState('')
    const token=localStorage.getItem('token')
    const dispatch=useDispatch()
    console.log(tweetProfile)
    const AddComment=()=>{
      const url='http://localhost:8000/comments/add'
      fetch(url,{
        method:'POST',
        headers:{
          'Content-type':"application/json",
          'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({
          "comment_text":reply,
          "tweetId":tweetProfile.id
        })
      }).then(res=>{
        if(res.status===401){
          window.location.assign('http://localhost:3000/signin')   
         }else{
          return(
          res.json()
        )}
      }).then(a=>dispatch(addComments(a))).then(()=>{
        const url2='http://localhost:8000/comments/users'
        fetch(url2,{
         method:"POST",
         headers:{
           "Content-type":'application/json',
           "Authorization":`Bearer ${token}`
         },
         body:JSON.stringify({
          "users":tweetProfile.comments.map(s=>s.userCreateId)
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
        return(
        thisResponse(tweetProfile.id),
         SetReply('')
        )
       })})

      }
      const thisResponse=(id)=>{
        const url='http://localhost:8000/comments/get'
        fetch(url,{
          method:'POST',
          headers:{
            'Content-type':'application/json',
            'Authorization':`Bearer ${token}`
          },
          body:JSON.stringify({
            'id':id
          })
        }).then(res=>{
          if(res.status===401){
            window.location.assign('http://localhost:3000/signin')   
        }
        else{
        return(
          res.json()            
        )}
        }).then(s=>{
          return(
            s,
            dispatch(getCommentsUsers(s)),
            localStorage.setItem('comments',JSON.stringify(s)),
            console.log(s)
          )
        })
      }
      if(tweetProfile!==undefined&&comments!==undefined){
     console.log(comments.map(s=>s))
      }
     useEffect(()=>{
   thisResponse(tweetProfile.id)
  },[])
   console.log(comments)
    return(
        <>
        <div className="main">
    <div className="sidebar right">
      {Authuser!==undefined&&(  
     <LiftSidebar user={Authuser}/>
      )}
      </div>
      {Authuser===undefined&&(
        <ReactLoading type="spin" color="blue" height={35} width={35} className="loading follow_loading tweet_loading"/>    
      )}
      {tweetProfile!==undefined&&Authuser!==undefined&&(  
       <>  
    <div className="center_page" style={{border:"none"}}>
    <div className="profile_info text_profile_info_tweet">
      <img src="http://localhost:3000/back.png" onClick={()=>window.location.assign(`http://localhost:3000/profile/${Authuser.nickname}/${Authuser.id}`)}/>
        <p className="text_profile_info">Posts</p>
        </div>  
    <div className="container tweet_container">
      <div className="img_container">{tweetProfile.user.firstname[0]}</div>
      <div className="auth_deatails">
        <p className="auth_deatails_name">{tweetProfile.user.firstname} {tweetProfile.user.lastname}</p>
        <p className="auth_deatails_nickname">@{tweetProfile.user.nickname}</p>
      </div>
      <div className="date_container">{tweetProfile.createdAt}</div>
      <div className="post_container">
        <div className="text_post_container">
            {tweetProfile.post_text}
        </div>
        </div>
        <div className="text_post_comment">
            <img src="http://localhost:3000/chat.png"></img>
          
              <p className="comment_number">{tweetProfile.comments.length}</p>
        </div>
      </div>
      <div className="comment_tweet"> 
       <input type="text" className="comment_tweet_input" value={reply} style={{border:"none"}} onChange={(e)=>SetReply(e.target.value)}/>
       <p className="comment_tweet_input_reply">Replaying to <span style={{color:"#19afd8"}}>@{tweetProfile.user.nickname}</span></p>
      <div className="img_container" style={{marginTop:"20px"}}>{Authuser.firstname[0]}</div>
      {reply===""&&(
      <p className="comment_tweet_reply">Post your reply</p>
      )}
      {reply===""&&(
      <div className="comment_tweet_btn">
        <button disabled>Reply</button>
      </div>
       )}
      {reply!==""&&(
      <div className="comment_tweet_btn_active">
        <button onClick={()=>AddComment()}>Reply</button>
      </div>
      )}
      </div>

    {comments!==undefined&&comments!==null&&comments.statusCode!==500&&(
      console.log(comments),
    comments.map(s=>(
      console.log(s),
        <Link to={`http://localhost:3000/tweets/${s.user.nickname}/status/${s.id}`} onClick={()=>{
          comment_datails_profile!==null&&comment_datails_profile_user!==null&&(
            dispatch(getThisComment(comment_datails_profile,comment_datails_profile_user))
          )
          return(
          dispatch(getThisComment(s,s.user)),
          localStorage.setItem('comment_profile',JSON.stringify(s)),
          localStorage.setItem('comment_profile_user',JSON.stringify(s.user))
          )
         }}>  
        <div className="comments">
        <div className="container tweet_container tweet_container_reply">
          <div className="img_container">{s.user.firstname[0]}</div>
          <div className="auth_deatails">
            <p className="auth_deatails_name">{s.user.firstname} {s.user.lastname}</p>
            <p className="auth_deatails_nickname_tweet">@{s.user.nickname}</p>
          </div>
          <div className="date_container">{s.createdAt}</div>
          <div className="post_container">
            <div className="text_post_container_tweet">
                {s.comment_text}
            </div>
            <div className="text_post_comment text_post_comment_tweet">
            <img src="http://localhost:3000/chat.png"></img>
              <p className="comment_number">{s.Responses.length}</p>
        </div>
            </div>
            
          </div>       
        </div>
        </Link>
      ))
      )
    }
    
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