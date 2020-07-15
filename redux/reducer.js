const initialState = {
    user: {},
    isLoddingIn: false
}

const USER_SESSION_TO_STORE = 'USER_SESSION_TO_STORE'

export function userSessionToStore(user_id, user_email, username, user_image, user_banner, cake_day){
  return{
    type: USER_SESSION_TO_STORE,
    payload: {user_id, user_email, username, user_image, user_banner, cake_day}
  }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case USER_SESSION_TO_STORE:
        return {...state, ...action.payload}
    
      default:
        return state
    }
  }