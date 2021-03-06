import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Paper, Typography } from '@material-ui/core'
import Post from './Post/Post';
import useStyles from './styles'

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    // const posts = [];
    const classes = useStyles();
    console.log("posts");
    console.log(posts);

    if (!posts.length && !isLoading) {

        return  (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    No posts
                </Typography>
            </Paper>
        )
        }


    return (
        isLoading ? < CircularProgress component="img"/> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
}

export default Posts;
