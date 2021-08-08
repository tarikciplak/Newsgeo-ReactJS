import * as types from './types'

export const mapState = (data) => async (dispatch) => {

    try {
        dispatch({
            type: types.MAP_STATE,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}