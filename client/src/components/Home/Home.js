import React, {useState, useEffect } from 'react'
import { Container, Grow, Grid} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Posts from '../Posts/Posts'
import Form from '../Forms/Form'
import {getPosts} from '../../actions/posts'

const Home = () => {
    
        // In here we want to keep track of the current id.
        // because we've share the state of current id between the POSTS and FORM and App.js contains parent component to both POST and FORM.
    
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

  return (
    <Grow in>
        <Container>
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>

               <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home