import * as types from '../actions/types'


const initialState = {
    news: [],
    
}


const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_NEWS:

            return {
                ...state,
                news: action.payload,

            }
        case types.CREATE_NEWS:
            return {
                ...state,
                news: [...state.news, action.payload]
            }
        
        default: return {
            ...state
        }
    }
}
export default newsReducer