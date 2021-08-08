import * as types from './types'
import * as services from '../services/service'

export const fetchNews = () => async (dispatch) => {
    try {
        const { data } = await services.fetchLocalNews()
        dispatch({
            type: types.FETCH_NEWS,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}
export const createNews = (data) => async (dispatch) => {
    try {
        const { response } = await services.createNews(data)
        dispatch({
            type: types.CREATE_NEWS,
            payload: response
        })
    } catch (error) {
        console.log(error);
    }
}
