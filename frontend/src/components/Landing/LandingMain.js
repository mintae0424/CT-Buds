import React, { useEffect, useState } from 'react'
import LandingImage from '../../images/LandingImage.png'
import { fade, makeStyles } from '@material-ui/core/styles'
import { InputBase, Button, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeTextWrap: {
        padding: '0 16px',
        marginTop: '-150px',
        zIndex: 3,       
    },
    homeTitle: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    mainBG: {
        position: 'absolute',
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            width: '1000px'
        },
        [theme.breakpoints.up('md')]: {
            width: '800px'
        },
        bottom: 0,
        right: 0,
        zIndex: 0,
    },
    restaurantSearch: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.50),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.75),
        },
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
        width: '100%',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
      findButton: {
          width: '100%',
          marginTop: theme.spacing(2),
          textTransform: 'none',
          fontSize: 14,
          fontWeight: 'bold',
          backgroundColor: 'black',
          color: 'white',
      },
      qrcodeText: {
          marginTop: theme.spacing(0.5),
          fontStyle: 'italic',
          opacity: 0.5,
      }
}))


export default function LandingMain() {

    const classes = useStyles()

    return (
        <div className={classes.wrapper}>
            <div className={classes.homeTextWrap}>
                <div className={classes.homeTitle}>
                    Get the menu that is designed for you
                </div>
                <div className={classes.restaurantSearch}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase 
                        placeholder="Search restaurant"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{'aria-label': 'search'}}
                    />
                </div>
                <Button href='/comingsoon' className={classes.findButton}>Find Restaurant</Button>
                <div className={classes.qrcodeText}>
                    or access menu by scanning the QR code
                </div>
            </div>
            <img className={classes.mainBG} src={LandingImage} />
        </div>
    )
}