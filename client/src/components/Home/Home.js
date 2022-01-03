import React from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Chip } from '@material-ui/core';
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import { getPosts, getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination'
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);


    const classes = useStyles();

    const searchPost = () => {
        if (search.trim()) {
            dispatch(getPostsBySearch({ search }))
            navigate(`/posts/search?searchQuery=${search || 'none'}`);
        } else {
            navigate('/');
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    }

    const handleAdd = (tag) => setTags([ ...tags, tag ]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AppBar className={classes.appBarSearch} position='static' color="inherit">
                    <TextField name="search" style={{ marginBottom: '8px' }} variant="outlined" label="Search Memories" onKeyPress={handleKeyPress}
                        fullWidth value={search} onChange={(e) => {setSearch(e.target.value)}}/>

                        {/* <TextField
                            style={{ margin: '10px 0'}}
                            value={tags}
                            onAdd={handleAdd}
                            onDelete={handleDelete}
                            label="Search tags"
                            variant="outlined"
                        /> */}

                        <Button onClick={searchPost} className={classes.searchButon} variant="contained" color="primary">Search</Button>
                    </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                    <Paper style={{ marginTop: '10px', padding: '5px'}} elevation={6} >
                        <Pagination page={page}/>
                    </Paper>
                </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;
