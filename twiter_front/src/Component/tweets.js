import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { dis_updateTweets, tweetProfiles, updateTweet } from "../action/user";
import { Link } from "react-router-dom";

export default function Tweets(props){
    const [tweets,updateTweets]=useState([])
    const [Mytweets,updateMyTweets]=useState([])
    const {UpdateTweets}=useSelector(state=>state.userProfile)
    const dispatch=useDispatch()

    const getTweets=async ()=>{
        const url="http://localhost:8000/tweets/get"
        const token=localStorage.getItem('token')

        await fetch(url,{
          method:'GET',
          headers:{
              authorization:`Bearer ${token}`
          }
        }).then(res=>{
            if(res.status===401){
                window.location.assign('http://localhost:3000/signin')   
            }else{
            return(
            res.json()
            )
            }
        }).then(s=>updateTweets(s))
      }
      const getMyTweets=async ()=>{
        const url="http://localhost:8000/tweets/get/mine"
        const token=localStorage.getItem('token')

        await fetch(url,{
          method:'GET',
          headers:{
              authorization:`Bearer ${token}`
          }
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
            updateMyTweets(s),
            dispatch(updateTweet(s)))
        }
      )}
      if(UpdateTweets===true){
            const url="http://localhost:8000/tweets/get/mine"
            const token=localStorage.getItem('token')
    
             fetch(url,{
              method:'GET',
              headers:{
                  authorization:`Bearer ${token}`
              }
            }).then(res=>{
                if(res.status===401){
                    window.location.assign('http://localhost:3000/signin')   
                }else{
                return(
                res.json()
                )
                }
            }).then(s=>updateMyTweets(s)).then(()=>dispatch(dis_updateTweets()))
          } 
    
    useEffect(()=>{    
        getTweets()
        getMyTweets()
    },[])
    console.log(Mytweets)

    console.log(props.user.followings.map(a=>a.followerId))
    console.log(tweets.map(a=>a).filter(s=>props.user.followings.map(a=>a.followerId).includes(s.userId)))
    console.log(tweets)
return(
    <div className="elements">
    {tweets.map(a=>a).filter(s=>props.user.followings.map(a=>a.followerId).includes(s.userId)).concat(Mytweets).reverse().map(s=>{
            return(
       <Link to={`http://localhost:3000/tweet/${s.user.nickname}/status/${s.id}`} onClick={()=>{
        return(
        dispatch(tweetProfiles(s)),
        localStorage.setItem('tweet_profile',JSON.stringify(s))
        )
       }}>       
      <div className="container">
      <div className="img_container">{s.user.firstname[0]}</div>
      <div className="auth_deatails">
        <p className="auth_deatails_name">{s.user.firstname} {s.user.lastname}</p>
        <p className="auth_deatails_nickname">@{s.user.nickname}</p>
      </div>
      <div className="date_container">{s.createdAt}</div>
      <div className="post_container">
        <div className="text_post_container">
            {s.post_text}
        </div>
        </div>
        <div className="text_post_comment">
            <img src="http://localhost:3000/chat.png"></img>
            <p className="comment_number">{s.comments.length}</p>
        </div>
      </div>
      </Link>  
            )
        })}

    </div>
)
}