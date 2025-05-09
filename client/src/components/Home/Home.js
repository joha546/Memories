import React, {useState, useEffect } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Chip } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'

import Posts from '../Posts/Posts'
import Form from '../Forms/Form'
import {getPosts, fetchPostsBySearch } from '../../actions/posts'
import Pagination from '../Pagination.jsx';
import useStyles from './styles.js'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    
        // In here we want to keep track of the current id.
        // because we've share the state of current id between the POSTS and FORM and App.js contains parent component to both POST and FORM.
    
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);


    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    const searchPost = () => {
        if(search.trim() || tags){
            // dispatch -> fetch search posts.
            dispatch(fetchPostsBySearch({ search, tags: tags.join(',') }));

            // Client side routing.
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags.join(',')`);
        }
        else{
            history.push('/');
        }
    }

    const handleKeyPRESS = (e) => {
        if(e.key === 'Enter') {
          searchPost();
        }
    };
      

    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
        <Container maxWidth='xl'>
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>

               <Grid item xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                    <TextField name='search' variant='outlined' label='Search Memories'
                        onKeyDown={handleKeyPRESS}
                        fullWidth
                        value= {search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <ChipInput 
                        style={{ margin: '10px 0'}}
                        value={tags}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        label='Search Tags'
                        variant='outlined'
                    />
                    
                    <Button onClick={searchPost} className={classes.searchButton} variant='contained' color='primary'>Search</Button>
                </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    <Paper elevation={6}>
                        <Pagination />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home