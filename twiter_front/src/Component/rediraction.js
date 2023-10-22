import React from 'react';
import ReactLoading from 'react-loading';

export default class Rediraction extends React.Component{
    componentDidMount(){
        const token=localStorage.getItem('token')
        const getUser=async ()=>{
            const url='http://localhost:8000/user/me'
            await fetch(url,{
                headers:{
                    authorization:`Bearer ${token}`
                }
            }).then(res=>res.json()).then(s=>{
            localStorage.setItem('user',JSON.stringify(s))
            window.location.assign(`profile/${s['nickname']}/${s['id']}`)
        })
        }
        return getUser()
    }
    render(){
   
return(
    <>
     <ReactLoading type="spin" color="blue" height={200} width={75} className="loading" />
      <h1>Rediraction page</h1>     
    </>
)
}
}