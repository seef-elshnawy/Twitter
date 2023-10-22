import React from "react";
import { Label,Input,FormGroup} from "reactstrap";
import ReactLoading from 'react-loading';

export default class SignUp extends React.Component{
    state={
        firstName:"",
        lastName:"",
        email:"",
        nickName:"",
        password:"",
        RePassword:"",
        loading:false
    }

render(){
    const state=this.state
      const Signup=async (firstName,lastName,email,nickName,password)=>{
      const url='http://localhost:8000/auth/signup'
      const loading=()=>{
        console.log('loading')
    this.setState({loading:true})
    }
    const DisableLoading=()=>{
        console.log('loading stop')
    this.setState({loading:false})
    }
      const res=await fetch(url,{
          method:'POST',
          headers:{
              "Content-Type": "application/json",
          },
          body:JSON.stringify({
          "firstName":firstName,
          "lastName":lastName,
          "nickName":nickName,
          "email":email,
          "password":password
          })
      }).then((s)=>{
        if(s.status===201){
          console.log('yes')
        return window.location.assign('signin')
        }
      else{
      return <>we have an error</>
    }}
    ).then(loading()).then(DisableLoading())}
    return(
        <>
        <div className="img_signUp">
        {this.state.loading===true &&(
        <ReactLoading type="spin" color="blue" height={200} width={75} className="loading"/>
         )}
          <img src="./twiterr.jpg" className="img_signUp_jpg">
          </img>
        </div>
        <div className="signUp">
  <FormGroup>
    <Label
      for="exampleEmail"
      hidden
    >
      First Name
    </Label>
    <Input
      id="examplefirstName"
      name="FirstName"
      placeholder="First Name"
      type="text"
      className="fields_signup"
      onChange={(e)=>this.setState({firstName:e.target.value})}
    />
  </FormGroup>
  <FormGroup>
    <Label
      for="exampleLastName"
      hidden
    >
      Last Name
    </Label>
    <Input
      id="examplelast Name"     
      name="LastName"
      placeholder="Last Name"
      type="text"
      className="fields_signup"
      onChange={(e)=>this.setState({lastName:e.target.value})}

    />
  </FormGroup>
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
  <FormGroup>
    <Label
      for="exampleNickName"
      hidden
    >
      nick name
    </Label>
    <Input
      id="example_nickName"
      name="nickname"
      placeholder="Nick name"
      type="text"
      className="fields_signup"
      onChange={(e)=>this.setState({nickName:e.target.value})}
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
  <FormGroup>
    <Label
      for="exampleRePassword"
      hidden
    >
      Password confirmation
    </Label>
    <Input
      id="exampleRePassword"
      name="password"
      placeholder="Password confirmation"
      type="password"
      className="password_signUp"
      onChange={(e)=>this.setState({RePassword:e.target.value})}
    />
    {this.state.password!==this.state.RePassword && this.state.RePassword!==''?<>password is not same</> :<></>}
  </FormGroup>
  {' '}
  <button className="btn_signUp" onClick={()=>Signup(state.firstName,state.lastName,state.email,state.nickName,state.password)}>
    Submit
  </button>
        </div>
        </>
    )
}
}