import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
    navbar: {
        padding: '1rem 0',
        background: '#191C35',
    },
    bgAvatar: {
        border: '3px solid #03F387',
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    link: {
        textDecoration: 'none',
        fontFamily: 'Nunito',
    }
}))
