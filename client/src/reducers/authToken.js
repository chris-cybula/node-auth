const authToken = (state = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjE5NzcwNzNhNGFkNTIzNWQxNmNkZDciLCJpYXQiOjE1OTYwMTk1NTd9.5FGbHMIeSek5DnI4hGzQRO47dyp0k_aJ-eIInvNQgk0', action) => {
// const authToken = (state = null, action) => {

    switch(action.type) {
      case 'GET_TOKEN':
        return {...state, token: action.payload};

      default:
        return state
    }
  }

  export default authToken