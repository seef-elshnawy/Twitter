import React from "react";
import { Label,Input,FormGroup} from "reactstrap";
import ReactLoading from 'react-loading';
import Rediraction from './rediraction';

export default class SignIn extends React.Component{
    state={
        email:"",
        password:"",
        loading:false,
    }
render(){
    const state=this.state
    /*const Signup=async (email,password)=>{
    const url='http://localhost:8000/auth/signin'
    const url2='http://localhost:8000/user/me'
    const res=await fetch(url,{
        method:'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
        "email":email,
        "password":password
        })
    }).then((s)=>{
        console.log(s.text())
     /* if(s.status===201){
        console.log('yes')
      return window.location.assign('signin')
      }
    else{
    return <>we have an error</>
  }}
  return s.json()
    }).then(result=>console.log(JSON.stringify(result)))}*/
    
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
var urlencoded = new URLSearchParams();
urlencoded.append("email", state.email);
urlencoded.append("password", state.password);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
};

const loading=()=>{
    console.log('loading')
this.setState({loading:true})
}
const DisableLoading=()=>{
    console.log('loading stop')
this.setState({loading:false})
}
const Signup=async ()=> await fetch("http://localhost:8000/auth/signin", requestOptions)
  .then(response => response.json()).then(loading())
  .then(result => {
    localStorage.setItem('token',result["access_token"])
    DisableLoading()
    console.log(result)
    if(result["statusCode"]!== 403&&404&&405&&500){
       return (
        window.location.assign('rediraction')
       )
    }
  })
  .catch(error => {
    console.log('error', error)
    DisableLoading()
});


    return(
        <>
        <div className="img_signUp">
          <img src="./twiterr.jpg" className="img_signUp_jpg">
          </img>
        </div>
        <div className="signUp">
         {this.state.loading===true &&(
        <ReactLoading type="spin" color="blue" height={200} width={75} className="loading"/>
         )}
    {this.state.loading===false&&(   
       <>
  <FormGroup>
    <Label
      for="exampleEmail"
      hidden
    >
      Email
    </Label>
    <Input
      id="exampleEmail"
      name="email"
      placeholder="Email"
      type="email"
      className="fields_signup"
      onChange={(e)=>this.setState({email:e.target.value})}
    />
  </FormGroup>
  
  {' '}
  <FormGroup>
    <Label
      for="examplePassword"
      hidden
    >
      Password
    </Label>
    <Input
      id="examplePassword"
      name="password"
      placeholder="Password"
      type="password"
      className="password_signUp"
      onChange={(e)=>this.setState({password:e.target.value})}

    />
  </FormGroup>
  {' '}
  <button className="btn_signUp" onClick={()=>Signup()}>
    Log in
  </button>
  </>
  )}  
        </div>
        </>
    )
}
}