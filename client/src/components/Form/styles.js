import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    paper: {
        padding: theme.spacing(2),
        backgroundColor: '#f7ebe8',
        color: '#201a23',
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
    submitButton: {
        margin: 5,
        backgroundColor: '#7189ff'
    },
    clearButton: {
        margin: 5,
        color: 'white',
        backgroundColor: '#e5383b'
    },
}));
