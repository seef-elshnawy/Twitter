export const Add_User_Profile="Add_user_profile"
export const ADD_FOLLOWERS="ADD_FOLLOWERS"
export const AUTH_USER="AUTH_USER"
export const REMOVE_FOLLOWERS="REMOVE_FOLLOWERS"
export const LOADING="LOADING"
export const DISABLE_LOADING="DISABLE_LOADING"
export const ADD_TWEET="ADD_TWEET"
export const UPDATE_TWEETS="UPDATE_TWEETS"
export const UPDATE_TWEET="UPDATE_TWEET"
export const DIS_UPDATE_TWEETS="DIS_UPDATE_TWEETS"
export const GET_FOLLOWERS="GET_FOLLOWERS"
export const GET_FOLLOWINGS="GET_FOLLOWINGS"
export const ADD_TWEET_PROFILE="ADD_TWEET_PROFILE"
export const GET_COMMENTS_USERS="GET_COMMENTS_USERS"
export const ADD_COMMENTS="ADD_COMMENTS"
export const GET_THIS_COMMENT="GET_THIS_COMMENT"
export const GET_RESPONSES="GET_RESPONSES"
export const ADD_RESPONSE="ADD_RESPONSES"


export function userProfiles(user){
    return{
        type:Add_User_Profile,
        user
    }

}

export function addFollows(user,follow,Authuser,custom){
return{
    type:ADD_FOLLOWERS,
    user,
    follow,
    Authuser,
    custom
}
}
export function authUser(user){
    return{
       type:AUTH_USER,
       user
    }
}

export function removeFollows(user,Authuser,follow,customFollow){
    return{
        type:REMOVE_FOLLOWERS,
        user,
        Authuser,
        follow,
        customFollow
    }
}

export function loading(){
return{
    type:LOADING,
}
}
export function updateTweets(){
    return{
        type:UPDATE_TWEETS,
    }
    }
    export function dis_updateTweets(){
        return{
            type:DIS_UPDATE_TWEETS,
        }
    }    
export function AddTweet(tweet){
    return{
      type:ADD_TWEET,
      tweet
    }
}
export function updateTweet(tweets){
    return{
        type:UPDATE_TWEET,
        tweets
    }
    }
export function StopLoading(){
    return{
      type:DISABLE_LOADING       
    }
}

export function getFollowers(followers){
return{
    type:GET_FOLLOWERS,
    followers
}
}

export function getFollowings(followings){
    return{
        type:GET_FOLLOWINGS,
        followings
    }
}

export function tweetProfiles(tweet){
return{
    type:ADD_TWEET_PROFILE,
    tweet
}}

export function getCommentsUsers(comments){
    return{
        type:GET_COMMENTS_USERS,
        comments

}}

export function addComments(comment){
    return{
        type:ADD_COMMENTS,
        comment
}}

export function getThisComment(comment,user){
    return{
        type:GET_THIS_COMMENT,
        comment,
        user
    }
}

export function getResponses(responses){
return{
    type:GET_RESPONSES,
    responses
}
}