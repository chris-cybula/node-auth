const authToken = (state = null, action) => {
    switch(action.type) {
      case 'GET_TOKEN':
        return {...state, token: action.payload};
      default:
        return state
    }
  }

  export default authToken