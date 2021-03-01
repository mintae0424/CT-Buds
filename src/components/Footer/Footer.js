import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        ['@media (min-width: 500px)']: {
            flexDirection: 'row',
        },
        backgroundColor: 'black',
        color: 'white',
        fontSize: '1.1em',
        padding: theme.spacing(5, 2)
    },
    logoWrapper: {
        ['@media (min-width: 500px)']: {
            flex: '100%',
        },
        ['@media (min-width: 960px)']: {
            flex: '40%',
        },
        display: 'flex',
        padding: theme.spacing(2, 2, 5, 2),
        minWidth: '160x',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    listWrapper: {
        flexGrow: 1,
        display: 'flex',
        padding: theme.spacing(2, 2, 5, 2),
        minWidth: '160px',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    listHeader: {
        paddingBottom: theme.spacing(3)
    },
    listItem: {
        textDecoration: 'none',
        paddingBottom: theme.spacing(1.5),
        color: 'white',
        opacity: 0.5,
        '&:visited, &:link': {
            textDecoration: 'none',
        }
    },
}))

export default function Footer() {
    
    const classes = useStyles()

    return (
        <>
            <div className={classes.wrapper}>
                <div className={classes.logoWrapper}>
                    <div className={classes.logo}>Buds</div>
                </div>
                <div className={classes.listWrapper}>
                    <div className={classes.listHeader}>Company</div>
                    <a href='/comingsoon' className={classes.listItem}>About</a>
                    <a href='/comingsoon' className={classes.listItem}>Add your restaurant</a>
                    <a href='/comingsoon' className={classes.listItem}>Advertise</a>
                </div>
                <div className={classes.listWrapper}>
                    <div className={classes.listHeader}>Resources</div>
                    <a href='/comingsoon' className={classes.listItem}>Contact us</a>
                    <a href='/comingsoon' className={classes.listItem}>Promotions</a>
                    <a href='/comingsoon' className={classes.listItem}>Privacy Policy</a>
                </div>

            </div>
        </>
    )
}