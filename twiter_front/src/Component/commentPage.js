import React, { useState } from "react";
import LiftSidebar from "./liftSidebar";
import RightSideBar from "./rightSidebar";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from 'react-loading';
import {getResponses} from "../action/user";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function CommentPage(){
    const {tweetProfile}=useSelector(state=>state.userProfile)
    const {Authuser}=useSelector(state=>state.userProfile)
    const {comments}=useSelector(state=>state.userProfile)

    const {comment}=useSelector(state=>state.userProfile)
    const {createdUser}=useSelector(state=>state.userProfile)  
    const {Responses}=useSelector(state=>state.userProfile) 
    const[reply,SetReply]=useState('')
    const[reply2,SetReply2]=useState('')
    const [appear,SetAppear]=useState(false)
    const [replyAppear,SerReplyAppear]=useState([])
    const token=localStorage.getItem('token')
    const dispatch=useDispatch()
    
    const AddResponse=()=>{
      const url='http://localhost:8000/response/add'
      fetch(url,{
        method:'POST',
        headers:{
          'Content-type':"application/json",
          'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({
          "comment_text":reply,
          "tweetId":comment.tweetId,
          "target":comment.user.nickname,
          "commentId":comment.id
        })
      }).then(res=>{
        if(res.status===401){
          window.location.assign('http://localhost:3000/signin')   
         }else{
          return(
          res.json()
        )}
      }).then( s=>{
        return(
         GetResponses(),
         SetReply('')
        )
       })
      }
      const AddResponse_Reply=()=>{
        const url='http://localhost:8000/response/add'
        fetch(url,{
          method:'POST',
          headers:{
            'Content-type':"application/json",
            'Authorization':`Bearer ${token}`
          },
          body:JSON.stringify({
            "comment_text":reply2,
            "tweetId":replyAppear.tweetId,
            "target":replyAppear.user.nickname,
            "commentId":replyAppear.comment.id
          })
        }).then(res=>{
          if(res.status===401){
            window.location.assign('http://localhost:3000/signin')   
           }else{
            return(
            res.json()
          )}
        }).then( s=>{
          return(
           GetResponses(),
           SetReply2(''),
           SetAppear(!appear)
          )
         })
  
        }
      const GetResponses=()=>{
        const url='http://localhost:8000/response/all'
        fetch(url,{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({
                "commentId":`${comment.id}`
            })
        }).then(res=>{
            if(res.status===401){
            window.location.assign('http://localhost:3000/signin')    
            }else{
                return(
                    res.json()
                )
            }
        }).then(s=>{
            return(
                localStorage.setItem('responses',JSON.stringify(s)),
                dispatch(getResponses(s))
            )
        })
      }
      if(tweetProfile!==undefined&&comments!==undefined){
     console.log(comments.map(s=>s))
      }


     useEffect(()=>{
   GetResponses()
},[])
   
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
      {comment!==undefined&&createdUser!==undefined&&Responses!==undefined&&(  
       <>  
    <div className="center_page" style={{border:"none"}}>
    <div className="profile_info text_profile_info_tweet">
      <img src="http://localhost:3000/back.png" onClick={()=>window.history.back()}/>
        <p className="text_profile_info">Replys</p>
        </div>  
    <div className="container tweet_container">
      <div className="img_container">{createdUser.firstname[0]}</div>
      <div className="auth_deatails">
        <p className="auth_deatails_name">{createdUser.firstname} {createdUser.lastname}</p>
        <p className="auth_deatails_nickname">@{createdUser.nickname}</p>
      </div>
      <div className="date_container">{comment.createdAt}</div>
      <div className="post_container">
        <div className="text_post_container">
            {comment.comment_text}
        </div>
        </div>
        <div className="text_post_comment">
            <img src="http://localhost:3000/chat.png"></img>
          
              <p className="comment_number">{Responses.length}</p>
        </div>
      </div>
      <div className="comment_tweet"> 
       <input type="text" className="comment_tweet_input" value={reply} style={{border:"none"}} onChange={(e)=>SetReply(e.target.value)}/>
       <p className="comment_tweet_input_reply">Replaying to <span style={{color:"#19afd8"}}>@{createdUser.nickname}</span></p>
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
        <button onClick={()=>AddResponse()}>Reply</button>
      </div>
      )}
      </div>

    {Responses!==undefined&&(
    
      Responses.map(s=>(
        <>
        <div onClick={()=>{
          SetAppear(!appear)
          SerReplyAppear(s)
          /*return(
          dispatch(getThisComment(a,s)),
          localStorage.setItem('comment_profile',JSON.stringify(a)),
          localStorage.setItem('comment_profile_user',JSON.stringify(s))
          )*/
         }}>  
        <div className="comments">
        <div className="container tweet_container tweet_container_reply">
          <div className="img_container">{s.user.firstname[0]}</div>
          <div className="auth_deatails">
          <p className="auth_deatails_reply">Replaying to <span style={{color:"#19afd8"}}>@{s.target}</span></p>
            <p className="auth_deatails_name">{s.user.firstname} {s.user.lastname}</p>
            <p className="auth_deatails_nickname_tweet">@{s.user.nickname}</p>
          </div>
          <div className="date_container">{s.createdAt}</div>
          <div className="post_container">
            <div className="text_post_container_tweet text_post_container_comment">
                {s.comment_text}
            </div>
            </div>
            
          </div>       
        </div>
        
        </div>
        {appear!==false&&replyAppear.user!==undefined&&(
          replyAppear.id===s.id&&(
          <div className="comment_tweet"> 
         <input type="text" className="comment_tweet_input" value={reply2} style={{border:"none"}} onChange={(e)=>SetReply2(e.target.value)}/>
         <p className="comment_tweet_input_reply">Replaying to <span style={{color:"#19afd8"}}>@{replyAppear.user.nickname}</span></p>
        <div className="img_container" style={{marginTop:"20px"}}>{Authuser.firstname[0]}</div>
        {reply2===""&&(
        <p className="comment_tweet_reply">Post your reply</p>
        )}
        {reply2===""&&(
        <div className="comment_tweet_btn">
          <button disabled>Reply</button>
        </div>
         )}
        {reply2!==""&&(
        <div className="comment_tweet_btn_active">
          <button onClick={()=>AddResponse_Reply()}>Reply</button>
        </div>
        )}
        </div>
        ))}
         
        </>
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