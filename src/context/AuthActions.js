export const LoginStart = (userCredentials)=>({
    type: "LOGIN_START",
});
//USER will contain our user details 
export const LoginSuccess = (user)=>({
    type: "LOGIN_SUCCESS",
    payload: user,   //this will go to our reducer and it is different with the user that is exported in brackets as they are user credentials
});

export const LoginFailure = (user)=>({
    type: "LOGIN_FAILURE",
    payload: error,
});

export const Follow = (userId)=>({
    type:"FOLLOW",
    payload: userId,                
})

export const UnFollow = (userId)=>({
    type:"UNFOLLOW",
    payload: userId,                
})