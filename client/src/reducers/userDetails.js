const userDetails = (state = null, action) => {

    switch(action.type) {
      case 'GET_DATA':
        return {...state, userData: action.payload};

      default:
        return state
    }
  }

  export default userDetails