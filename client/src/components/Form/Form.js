import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, getPosts, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {

    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })

    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    // const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const clear = () => {
        setCurrentId(0)
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
        getPosts();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0){
            dispatch(createPost({ ...postData, name: user?.result?.name }));
            clear();
        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clear();
        }
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please sign in to create your own eggs
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>

                <Typography variant="h6">{currentId ? "Editing" : "Creating"} an Egg</Typography>

                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />

                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    multiline rows={4}
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />

                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags (comma seperated)"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => {
                        console.log(e.target.value);
                        setPostData({ ...postData, tags: e.target.value.split(',') })}
                    }
                />

                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}
                    >

                    </FileBase>
                </div>

                <Button disabled={!postData.tags||!postData.title||!postData.message} className={classes.button} variant="contained" type="submit" color="primary" size="large" fullWidth>Submit</Button>
                <Button variant="contained" className={classes.button} color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

            </form>
        </Paper>
    );
}

export default Form;
