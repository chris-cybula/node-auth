const loginReducer = (state = false, action) => {
    switch(action.type) {
      case 'GET_TOKEN':
        // return response.headers["auth-token"]
        return true
      default:
        return state;
    }
  }

  export default loginReducer