import * as api from '../api';

// Action Creators
/*
 * Function that returns action
 * Action is object that has type and payload
 * Asyncronous logic needs async, and we dispatch instead of return
 *
 */
export const getPosts = () => async (dispatch) => {

    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message);
    }

    const action = { type: 'FETCH_ALL', payload: [] }

    dispatch(action);
}

export const createPost = (post) => async (dispatch) => {

    try {
        const { data } = await api.createPost(post);

        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}