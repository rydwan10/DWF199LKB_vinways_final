import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
    },
    heroTitle: {
        fontFamily: 'Abhaya Libre !important',
        color: '#FFFFFF',
        fontSize: '100px',
    },
    heroTitle2: {
        fontFamily: 'Abhaya Libre !important',
        color: '#03F387',
        fontSize: '100px',
    },
    hero2Wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    registerButton: {
        backgroundColor: '#03F387',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontFamily: 'Nunito',
        fontSize: '18px',
    },
    tinyHero: {
        fontFamily: 'Nunito !important',
        color: '#8B8B8B',
        fontSize: '24px',
    },
    heroImage: {
        width: '120px'
    },
    [theme.breakpoints.down('sm')]: {
        heroTitle: {
            fontSize: '70px',
        },
        heroTitle2: {
            fontSize: '70px',
        },
        heroImage: {
            width: '50px'
        }
    },
    [theme.breakpoints.down('xs')]: {
        heroTitle: {
            fontSize: '50px',
        },
        heroTitle2: {
            fontSize: '50px',
        },
        heroImage: {
            width: '40px'
        },
    },

}))