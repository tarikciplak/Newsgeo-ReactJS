import * as types from "../actions/types"

const map = {
    locationState: []
}

const mapReducer = (state = map, action) => {

    switch (action.type) {
        case types.MAP_STATE:

            return {

                locationState: action.payload,
            }

        default:
            return {
                ...state
            }
    }
}

export default mapReducer