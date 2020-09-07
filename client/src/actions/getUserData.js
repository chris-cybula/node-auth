export const getUserData = (userData) => {
    return {
      type: 'GET_DATA',
      payload: userData,
    }
  }