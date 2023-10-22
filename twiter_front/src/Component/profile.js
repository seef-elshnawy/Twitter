
import React from "react"
import LiftSidebar from "./liftSidebar"
import RightSideBar from "./rightSidebar"
import Main from "./main"

export default class Profile extends React.Component{
  
  
    render(){
    console.log(this.props)
        return(
            <div className="main">
      <div className="sidebar right">
     <LiftSidebar user={this.props.user}/>
      </div>
      <div className="center_page">
        <Main/>
      </div>
      <div className="sidebar_right">
        <RightSideBar />
      </div>
      
        </div>
        )
    }
}