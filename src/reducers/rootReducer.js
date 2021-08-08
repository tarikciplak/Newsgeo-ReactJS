import { combineReducers } from "redux"
import mapReducer from "./mapReducer"
import newsReducer from "./newsReducer"

const rootReducer = combineReducers({
    news : newsReducer,
    map : mapReducer

})
  
export default rootReducer