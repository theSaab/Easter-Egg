import React from 'react';
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    const openPost = () => {
        navigate(`/posts/${post._id}`);
    }

    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    return (
        <Card className={classes.card} raised elevation={6}>
            {/* <ButtonBase
                className={classes.cardAction}
                onClick={openPost}
            > */}
            <CardMedia style={{ cursor: 'pointer' }} onClick={openPost} className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />

            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>

            <div className={classes.overlay2}>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button style={{color: 'white'}} size='small' onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                )}

            </div>

            <div className={classes.details}>
                <Typography variant="body2" component="h2" >{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>

            <Typography variant="h5" className={classes.title} component="h2" gutterBottom>{post.title}</Typography>

            <CardContent>
                <Typography variant="body2" className={classes.message} component="p">{post.message}</Typography>
            </CardContent>
            {/* </ButtonBase> */}
            <CardActions className={classes.cardActions}>

                <Button size="small" disabled={!user?.result} className={classes.likeButton} onClick={() => {dispatch(likePost(post._id))}}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" className={classes.deleteButton} onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}

            </CardActions>
        </Card>
    );
}

export default Post;
