import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import Navigation from '../Navigation/Navigation'
import WorkInProgressImage from '../../images/WorkInProgressImage.png'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#fff6e9',
    },
    mainWrapper: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    textWrap: {
        padding: '0 16px',
        marginTop: '-150px',
        zIndex: 3,       
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    mainBG: {
        position: 'absolute',
        width: '100%',
        top: '50vh',
        left: 0,
        right: 0,
        margin: 'auto',
        zIndex: 0,
        [theme.breakpoints.up('lg')]: {
            width: '1000px',
        },
        [theme.breakpoints.up('md')]: {
            width: '800px',
        },
    },
}))

export default function WorkInProgress(){
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Navigation />
            <div className={classes.mainWrapper}>
                <div className={classes.textWrap}>
                    <div className={classes.titleText}>
                        Our site is still cooking...
                    </div>
                    <div className={classes.subText}>
                        Come back soon to experience the new way of dining!
                    </div>
                </div>
                <img className={classes.mainBG} src={WorkInProgressImage} />
            </div>
        </div>
    )
}