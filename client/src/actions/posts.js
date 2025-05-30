import * as api from '../api';
import { FETCH_BY_SEARCH } from '../constatns/actionTypes';

// Action Creators
export const getPosts = () => async (dispatch) => {

    try {
        const {data} = await api.fetchPosts();
        dispatch({type: 'FETCH_ALL', payload: data});

    } catch (error) {
        console.log(error.message);
    }
}

export const fetchPostsBySearch = (searchQuery) => async(dispatch) => {
    try {
        const { data : { data } } = await api.fetchPostsBySearch(searchQuery);
        // we've destructure the data double time because one time is for axios req
        // another time is for getting data values.
        
        // console.log(data);
        dispatch({type: 'FETCH_BY_SEARCH', payload: data});
    }
    catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post);

        dispatch({type: 'CREATE', payload: data});
    } 
    catch (error) {
        console.log(error.message);    
    }
}

export const updatePost =(id, post) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({type: 'UPDATE', payload: data});
    } 
    
    catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({type: 'DELETE', payload: id});
    } 
    
    catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);

        dispatch({type: 'UPDATE', payload: data});
    } 
    
    catch (error) {
        console.log(error);
    }
}
