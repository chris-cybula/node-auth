// const authToken = (state = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjIyZTAwNDRkM2M4ZmU1NTc1YzE5OTYiLCJpYXQiOjE1OTYxMjEzMjN9.wEQF3I4CCuE_hFUEr1ooJgmj-3PiIxO7YIEhdOBaDgI', action) => {
const authToken = (state = null, action) => {

    switch(action.type) {
      case 'GET_TOKEN':
        return {...state, token: action.payload};

      default:
        return state
    }
  }

  export default authToken