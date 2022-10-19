const AuthReducer = (state, action)=>{    //here it is taking in state and action and then we will make switch case structure
    switch (action.type) {
        case "LOGIN_START":
          return {
            user: null,
            isFetching: true,
            error: false,
          };
        case "LOGIN_SUCCESS":
          return {
            user: action.payload,
            isFetching: false,
            error: false,
          };
        case "LOGIN_FAILURE":
          return {
            user: null,
            isFetching: false,
            error: true,
          };
        case "FOLLOW":
          return {
            ...state,      //state operator
            user:{
              ...state.user,
              followings: [...state.user.following,action.payload],
            }
          };
        case "UNFOLLOW":
          return {
            ...state,      //state operator
            user:{
              ...state.user,
              followings: state.user.followings.filter((following)=> following!==action.payload),
            }
          };
        default:
            return state;
    }
};

export default AuthReducer;