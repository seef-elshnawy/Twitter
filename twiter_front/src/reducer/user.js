
import { ADD_COMMENTS, ADD_COMMENTS_USERS, ADD_FOLLOWERS, ADD_TWEET, ADD_TWEET_PROFILE, Add_User_Profile,AUTH_USER,DIS_UPDATE_TWEETS,DISABLE_LOADING,GET_COMMENTS_USERS,GET_FOLLOWERS,GET_FOLLOWINGS,GET_RESPONSES,GET_THIS_COMMENT,LOADING,REMOVE_FOLLOWERS, UPDATE_TWEET, UPDATE_TWEETS} from "../action/user";

const initialState={userProfileState:[]}
export function userProfile(state=initialState,action){
switch(action.type){
    case Add_User_Profile:
    return{
       ...state,
       user:action.user
    }
    case AUTH_USER:
        return{
            ...state,
            Authuser:action.user
        }
    case ADD_TWEET:
        const {tweet}=action
        return{
            ...state,
            Authuser:{
                ...state.Authuser,
               tweets:state.Authuser.tweets.concat(tweet)
            }
        }
    case UPDATE_TWEET:
        return{
            ...state,
            Authuser:{
                ...state.Authuser,
               tweets:action.tweets
            }
        }        
    case ADD_FOLLOWERS:
        console.log(action.user)
        return{
            ...state,
            Authuser:{
                ...action.Authuser,
                followings:action.Authuser.followings.concat(action.follow)
            },
            user:{
                ...action.user,
                followers:action.user.followers.concat(action.custom)
            }
           /* [action.targetUser]:{
                ...state[action.targetUser],
                followers:[
                    ...state[action.targetUser].followers,
                    action.follow
                ]
            }*/
            
        }
        case REMOVE_FOLLOWERS:
           const {follow}=action 
           const{customFollow}=action
           console.log(follow)
           console.log([action.Authuser.followers][0].filter(s=>s.id==follow).splice())
           console.log(customFollow)
           console.log(action.Authuser.followings.map(a=>a).filter(s=>s.id!==follow[0].id))
           console.log()

            return{
                ...state,
                Authuser:{
                    ...action.Authuser,
                    followings: action.Authuser.followings.map(a=>a).filter(s=>s.id!==follow[0].id)
                },
                user:{
                    ...action.user,
                    followers:action.user.followers.map(a=>a).filter(s=>s.id!==follow[0].id)
                },
            }
        case GET_FOLLOWERS:
            return{
                ...state,
                userFollowers:action.followers
            }
        case GET_FOLLOWINGS:
                return{
                    ...state,
                    userFollowings:action.followings
                }
        case ADD_TWEET_PROFILE:
            return{
                ...state,
                tweetProfile:action.tweet
            }
        case GET_COMMENTS_USERS:
            return{
                ...state,
                comments:action.comments
            }
        case ADD_COMMENTS:
            return{
                ...state,
                tweetProfile:{
                    ...state.tweetProfile,
                    comments:state.tweetProfile.comments.concat(action.comment)
                }
            }
        case GET_THIS_COMMENT:
            return{
                ...state,
                comment:action.comment,
                createdUser:action.user
            }
        case GET_RESPONSES:
            return{
              ...state,
              Responses:action.responses  
            }                                          
        case LOADING:
            return{
                ...state,
                loading:true
            }
        case UPDATE_TWEETS:
            return{
                ...state,
                UpdateTweets:true
            }
        case DIS_UPDATE_TWEETS:
            return{
                ...state,
                UpdateTweets:false
            }        
        case DISABLE_LOADING:
            return{
                ...state,
                loading:false
            }    
    default: return state
}

}
