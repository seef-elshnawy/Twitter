
export const Signup=async (firstName,lastName,email,nickName,password)=>{
const url='http://localhost:8000/auth/signup'
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
}).then(async (s)=>s.status)

}