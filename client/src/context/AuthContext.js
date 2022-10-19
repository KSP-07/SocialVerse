import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";

// const INITIAL_STATE = {
//     // user:null,      // because we didn't login
//    user:{
//        _id:"62733b87ddd9e557c4c545e6",
//        username:"ksp",
//        email:"ksp@gmail.com",
//        password:"$2b$10$WtQPi6EoqayGreYtqde1KeK9Eq4.RFOgV3E.iW.K9OChpnSbFuCBy",
//        profilePicture:"person/6.jpeg",
//        coverPicture:"",
//        followers:[],
//        followings:[],
//        isAdmin:false
//     },

//     isFetching: false,        // it's gonna decide the begining and ending of the process
//     error: false,       // cause at the begining we don't have any error
// };
const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
  };
// const INITIAL_STATE = {
//     user:null,
//     isFetching: false,
//     error: false,
//   };
  

//creating context
export const AuthContext = createContext(INITIAL_STATE);

// creating a wrapper( wrapped using children and using children in return statement in between authcontext.provider)
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
      },[state.user])

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {/* what's this children? it's gonna be my application , it can be app.js or it can be my index.js ...we can wrap anything in it....currently using in index.js*/}
            {children}
        </AuthContext.Provider>
    )

}