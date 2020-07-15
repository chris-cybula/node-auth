const authToken = (state = false, action) => {
    switch(action.type) {
      case 'GET_TOKEN':
        // return response.headers["auth-token"]
        return !state
      default:
        return state;
    }
  }

  export default authToken