import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignIn from './Component/signIn';
import SignUp from './Component/signup';
import Rediraction from './Component/rediraction';
import NotFound404 from './Component/notFound';
import Profile from './Component/profile';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authUser, getResponses, getThisComment, tweetProfiles, userProfiles } from './action/user';
import UserProfile from './Component/userProfile';
import MyProfile from './Component/myProfile';
import Followers from './Component/followers';
import Followings from './Component/followings';
import TweetPage from './Component/tweetPage';
import CommentPage from './Component/commentPage';

 function App(){
  const userProfileState=useSelector(state=>state.userProfile.user)
  const {Authuser}=useSelector(state=>state.userProfile)
  const loading=useSelector(state=>state.userProfile.loading)  
  const {tweetProfile}=useSelector(state=>state.userProfile)
  const {comment}=useSelector(state=>state.userProfile)
  const {createdUser}=useSelector(state=>state.userProfile)
  const comment_datails_profile=localStorage.getItem('comment_profile')
  const comment_datails_profile_user=localStorage.getItem('comment_profile_user')
  const responses_comment=localStorage.getItem('responses')

  let userProfileState2=localStorage.getItem('user_profile')
  const dispatch=useDispatch()
  const token=localStorage.getItem('token')
  const local_tweet_Profile=localStorage.getItem('tweet_profile')

 
  console.log(loading)
  let userProfile
  if(userProfileState2!==null){
     userProfile=JSON.parse(userProfileState2)
  }else{
    userProfile={}
  }
  let data=localStorage.getItem('user')
  let user
  if(data!==null){
   user=JSON.parse(data)
  }else{
    user={}
  }
 useEffect(()=>{
  if(user.id!==undefined){
    return(
      dispatch(authUser(user)),
      userProfileState2!==null?(
        userProfile=JSON.parse(userProfileState2)
      ):(
       userProfile={}
      ),
      userProfileState2!==null&&(
          dispatch(userProfiles(userProfile))
      ),
      local_tweet_Profile!==null&&(
        dispatch(tweetProfiles(JSON.parse(local_tweet_Profile)))
      ),
      comment_datails_profile!==null&&comment_datails_profile_user!==null&&(
        dispatch(getThisComment(JSON.parse(comment_datails_profile),JSON.parse(comment_datails_profile_user)))
      ),
      responses_comment!==null&&responses_comment===undefined&&(
        dispatch(getResponses(JSON.parse(responses_comment)))
      )
     
    )
  }
  
},[])
console.log(user.statusCode)

  return (
    <div className="App">
        <Routes>
          <Route exact path='/signin' Component={SignIn}/>
          <Route exact path='/signup' Component={SignUp}/>
          <Route exact path='/rediraction' Component={Rediraction}/>
          <Route exact path='/Not-Found' Component={NotFound404}/>
          {window.location.href.includes('http://localhost:3000/profile')&&(
          user!==undefined&&user!==null&&user.statusCode!==401?(
            <>
            <Route exact path={`/profile/${user['nickname']}/${user['id']}`} element={<Profile user={user} />}/>
            <Route exact path={`/profile/view/${user['nickname']}/${user['id']}`} element={<MyProfile userProfile={user} />}/>
            <Route exact path={`/profile/view/${user.nickname}/${user.id}/followers`} element={<Followers user={user}/>}/>    
            <Route exact path={`/profile/view/${user.nickname}/${user.id}/followings`} element={<Followings user={user}/>}/>             

             </>
          ):(
            window.location.assign('http://localhost:3000/Not-Found')
          )

          )}
          {window.location.href.includes('http://localhost:3000/profile/view')&&(
          userProfile!==undefined ?(
            <>
            <Route exact path={`/profile/view/${userProfile.nickname}/${userProfile.id}`} element={<UserProfile userProfile={userProfile} user={user}/>}/> 
            <Route exact path={`/profile/view/${userProfile.nickname}/${userProfile.id}/followers`} element={<Followers Authuser={user} user={userProfile}/>}/>    
            <Route exact path={`/profile/view/${userProfile.nickname}/${userProfile.id}/followings`} element={<Followings Authuser={user} user={userProfile}/>}/>             
         

           </>
        ):(
          <>
          <Route exact path={`/profile/view/${userProfileState.nickname}/${userProfileState.id}`} element={<UserProfile userProfile={userProfileState} user={user}/>}/>
          <Route exact path={`/profile/view/${userProfileState.nickname}/${userProfileState.id}/followers`} element={<Followers Authuser={user} user={userProfileState}/>}/>             
          <Route exact path={`/profile/view/${userProfileState.nickname}/${userProfileState.id}/followings`} element={<Followings Authuser={user} user={userProfileState}/>}/>             

         </>
          )
        )}
      {window.location.href.includes(`http://localhost:3000/tweet`)&&(
    
       tweetProfile!==undefined&&(
       <>
       <Route exact path={`/tweet/${tweetProfile.user.nickname}/status/${tweetProfile.id}`} element={<TweetPage />}/>
       </>
      )
       )}
       {window.location.href.includes(`http://localhost:3000/tweet`)&&(
       comment!==undefined&&createdUser!==undefined&&(
     <>
    <Route exact path={`/tweets/${createdUser.nickname}/status/${comment.id}`} element={<CommentPage/>}/>
     </>
   )
    )}
        </Routes>
    </div>
  );
    
}

export default App;
