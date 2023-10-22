import React,{useState} from "react";
import { InputGroup,Input} from "reactstrap";
import Tweets from "./tweets";
import { useDispatch, useSelector } from "react-redux";
import { AddTweet, updateTweets } from "../action/user";

export default function Main(){
    const[text,updateText]=useState('')
    const data=localStorage.getItem('user')
    const token=localStorage.getItem('token')
    const {Authuser}=useSelector(state=>state.userProfile) 
    const dispatch=useDispatch()
    const addTweet=async()=>{
     const url='http://localhost:8000/tweets/add' 
     var myHeaders = new Headers();
     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
     myHeaders.append("Authorization", `Bearer ${token}`)
     var urlencoded = new URLSearchParams();
     urlencoded.append("post", text);
     var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      }
    await fetch(url, requestOptions)
  .then(response => {
    if(response.status===401){
        window.location.assign('http://localhost:3000/signin')   
    }else{
         return (
          response.json(),
          updateText('')
          )
    }
  }).then(res=>dispatch(AddTweet(res),dispatch(updateTweets())))
  .catch(error => console.log('error', error))

  const url2='http://localhost:8000/user/me'
   await fetch(url2,{
    headers:{
        authorization:`Bearer ${token}`
    }
}).then(res=>res.json()).then(s=>{
localStorage.setItem('user',JSON.stringify(s))
})
    }
return(
    <div className="main_page">
     <div className="title"><h5>Home</h5></div>
     <div className="tweet_input">
     {Authuser!==undefined&&(

       <>
        {     console.log(Authuser) }
     <InputGroup> 
   <Input className="tweet_input field" value={text} onChange={(e=>{
    return(
    updateText(e.target.value)   
    )
    
    })} size="50"/>
  </InputGroup>

    
  <div className="img_input">{Authuser.firstname[0]}</div>
  {text===""&&(
  <div className="txt_input">What's happening ?!</div>
  )}
  {text===""&&(
  <div className="btn_input_disabled"><button disabled>Post</button></div>
  )}
  {text!==""&&(
      <div className="btn_input"><button type="submit" onClick={()=>addTweet()} >Post</button></div>

  )}
    </> 
       )}
     </div>
     <div className="tweets">
      {Authuser!==undefined&&(
        <Tweets user={Authuser}/>
      )}
     </div>
    </div>
)
  }