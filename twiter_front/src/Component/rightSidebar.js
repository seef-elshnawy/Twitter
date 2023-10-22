import React,{ useState,useEffect} from "react";
import { InputGroup,Input,InputGroupText} from "reactstrap";
import ReactLoading from 'react-loading'
import { Link } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';
import UserProfile from "./userProfile";
import { useDispatch, useSelector } from "react-redux";
import { userProfiles } from "../action/user";


export default function RightSideBar(props){
    const token=localStorage.getItem('token')
    const [Results,updateResults]=useState([])
    const[loading,updateLoading]=useState(false)
    const dispatch=useDispatch()
    
    const data=localStorage.getItem('user')
    let user
    if(data!==null){
     user=JSON.parse(data)
    }else{
      user={}
    }
      console.log('hello')
        
       const searchResults=(e)=>{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Authorization", `Bearer ${token}`)
        
        const urlencoded = new URLSearchParams();
        urlencoded.append("Search", e.target.value);
        
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
        }    
     fetch("http://localhost:8000/user/search", requestOptions)
  .then(response => {
    if(response.status===401){
        window.location.assign('http://localhost:3000/signin')   
    }
    if(!e.target.value){
      updateLoading(true)
    }
    else if(e.target.value!==""){
      updateLoading(true)
        return (
          response.json()
          )
    }
})
  .then(result =>{
    return(
      updateLoading(true),
      updateResults(result) ,
      updateLoading(false)
    )
  })
  .catch(error => console.log('error', error));        

    }
console.log(Results)

return(
    <div className="search">
    <InputGroup> 
 
    <InputGroupText className="search_img_field" >
    <img src="http://localhost:3000/search-interface-symbol.png" className="search_img"/>
    </InputGroupText>
    <Input placeholder="Search" className="search_input" onChange={async(e)=>searchResults(e)}/>
  </InputGroup>
  {Results!==undefined&&(
    <div className="results">
      {loading===true&&(
             <ReactLoading type="spin" color="blue" height={50} width={50} className="loading" />
      )}
    {Results.filter(s=>s.nickname!==user.nickname).map(s=>{
     return(
        <>
     <Link to={`http://localhost:3000/profile/view/${s.nickname}/${s.id}`} className="link" onClick={()=>{
     return(
     dispatch(userProfiles(s)),
     localStorage.setItem('user_profile',JSON.stringify(s))
      )}}>
   <div className="element">
   <div className="profile_pic_element">{s.firstname[0]}</div>
    <div className="profile_name_element">{s.firstname} {s.lastname}
        </div>
    <div className="profile_nickname_element">@{s.nickname}</div>
    </div>
    </Link>   

 </>
     )
    })}
   </div>
   
  )}
  
  </div>
)
}