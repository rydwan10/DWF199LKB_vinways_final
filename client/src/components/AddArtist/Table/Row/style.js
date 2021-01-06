import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
        '&:nth-of-type(odd)': {
            backgroundColor: '#191C35'
        }
    },
    tableHead: {
        backgroundColor: '#00031F'
    },
    tableCell: {
        color: '#ffffff',
        fontSize: '1rem',
        fontFamily: 'Nunito'
    },
    menuItem: {
        fontWeight: 'bold',
        fontFamily: 'Nunito'
    },


    greenText: {
        color: "#08F387",
    },
    redText: {
        color: 'red',
    },
    yellowText: {
        color: 'yellow',
    }
}))
