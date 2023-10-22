import { Nav, NavItem, NavLink,} from "reactstrap"
import React,{ useState, }  from "react"

export default function LiftSidebar(props){
    
    const [display,updateDisplay]=useState(false)

    const items=[{text:"Home",img:"http://localhost:3000/home.png",href:`/profile/${props.user['nickname']}/${props.user['id']}`},
    {text:"Expolre",img:"http://localhost:3000/magnifying-glass.png",href:"#"},
    {text:"Notifications",img:"http://localhost:3000/bell.png",href:"#"},
    {text:"Messages",img:"http://localhost:3000/messenger.png",href:"#"},
    {text:"Profile",img:"http://localhost:3000/user.png",href:`/profile/view/${props.user['nickname']}/${props.user['id']}`}
  ]
  const action=()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('user_profile')
    window.location.assign('http://localhost:3000/signin')
  }
   const change=()=>{
      updateDisplay(!display)

   }
    return(
        <Nav
  vertical
>
  
<NavItem>
  <div className="img_sidebar">
<img src="http://localhost:3000/twitter.png" className="img_profile_jpg" >
</img>    
</div>  
</NavItem>
{items.map(s=>{ return(
  <NavItem className="flex_profile_sidebar">
  <img src={s.img} className="img_Sidebar_jpg" >
</img> 
    <NavLink
      active
      href={s.href}
    >
      <p className="text_Sidebar">{s.text}</p>
    </NavLink>
  </NavItem>  
  )})}
     
  <div className="profile_inf" onClick={()=>change()}>

    <div>
    <div className="profile_pic">{props["user"]['firstname'][0]}</div>
    </div>

    <div className="profile_name">{props.user["firstname"]} {props.user["lastname"]}
    <div className="profile_nickname">@{props.user["nickname"]}</div>
    </div>
    
    <div className="options">
    <img src="http://localhost:3000/option.png" className="img_Sidebar_jpg_option" />

    </div>

  </div>
  {display===true&&(
  <div className="hiden_field" >
      <div onClick={()=>action()}>Log out</div>   
    </div>
  )}
</Nav>
    )
}
