import React, { useState, useEffect } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import Navigation from '../Navigation/Navigation'
import LandingMain from './LandingMain'
import LandingSub from './LandingSub'
import Footer from '../Footer/Footer'


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#7ec5c1',
    },
    mainWrapper: {
        width: '100%',
        height: '100vh',
        
    },
    subWrapper: {
        padding: theme.spacing(4, 0),
        width: '100%',
    },
}))

export default function Landing(){
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Navigation />
            <div className={classes.mainWrapper}>
                <LandingMain />
            </div>
            <div className={classes.subWrapper}>
                <LandingSub />
            </div>
            <Footer />
        </div>
    )
}