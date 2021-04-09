import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { fade, makeStyles } from '@material-ui/core/styles'
import Navigation from '../Navigation/Navigation'
import { useCurrentRestaurantActions } from '../../hooks/commands/useCurrentRestaurantActions'
import { useCurrentRestaurant } from '../../hooks/queries/useCurrentRestaurant'
import { Button } from '@material-ui/core'
import { PinDrop } from '@material-ui/icons'
import './Landing.css'
import { useAuth } from '../../hooks/queries/useAuth'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'transparent',
        height: '100vh',
        overflow: 'hidden',
    },
    button: {
        height: '30px',
        textTransform: 'none',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        margin: theme.spacing(3, 0)
    }
}))

export default function Landing({ match }){
    const classes = useStyles()
    const { getRestaurantById } = useCurrentRestaurantActions()
    const { info } = useCurrentRestaurant()
    const { isAuthenticated, user } = useAuth()
    const history = useHistory()


    const handleClickToPreferences = () => {
        let id = user._id

        let path = `/users/${id}`

        history.push(path)
    }

    useEffect(() => {
        getRestaurantById({id: match.params.id})
    }, [])

    return (
        <div className={classes.root}>
            <Navigation />
            <div className={'restaurant-main-image'} style={{background: `url(/images/${match.params.id}/main.png)`}} />
            
            
            <div className='text-wrapper'>
                <div className='title-text'>
                    {info.name}
                </div>
                <div className='address-wrap'>
                    <PinDrop outlined style={{padding: '2px 5px 0px 0px','top': '5px', color: 'black'}} />
                    <div className='address-text'>
                        {`${info.address.street}`} 
                    </div>
                </div>
                <div className='button-wrap' >
                    <Button className={classes.button} href={`/menu/${info._id}`}>
                        Menu
                    </Button>
                    {isAuthenticated ? 
                        <Button className={classes.button} onClick={handleClickToPreferences}>
                            Set Preferences
                        </Button>
                        : <Button className={classes.button} href='/signin'>
                            Login / Sign Up
                        </Button>}
                </div>
            </div>
        </div>
    )
}