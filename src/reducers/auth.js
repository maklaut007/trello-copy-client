const initialState = {isAuthorized : false , authStatus: ""}


const auth = (state = initialState, action) => {
	switch (action.type) {

    case 'AUTH_SUCCESS':
    console.log(action.payload);
      localStorage.setItem("token",
        action.payload.token)
      localStorage.setItem("userName",
        action.payload.adressName)
      return{
        ...state,
        isAuthorized : true
      };
    case 'AUTH_FAILED':
      return{
        ...state,
        isAuthorized : false,
        authStatus: "Authorization failed"
      }; 	
    default:
      return state
  }
}

export default auth