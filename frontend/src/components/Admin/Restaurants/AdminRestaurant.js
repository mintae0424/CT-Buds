import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Navigation from '../../Navigation/Navigation'
import WorkInProgressImage from '../../../images/WorkInProgressImage.png'
import { Button, List, ListItem, ListItemText } from '@material-ui/core'
import { useModal } from '../../../hooks/queries/useModal'
import { useModalActions } from '../../../hooks/commands/useModalActions'
import AddRestaurantModal from './AddRestaurantModal'
import { useRestaurantActions } from '../../../hooks/commands/useRestaurantActions'
import { useRestaurants } from '../../../hooks/queries/useRestaurants'
import { useCurrentRestaurantActions } from '../../../hooks/commands/useCurrentRestaurantActions'

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

const initialRestaurantData = {
    restaurantInfo: {
        name: '',
        email: '',        
        street: '',
        city: '',
        state: '',
        zip: '',
        _id: '',
    }
}

const initialTimeData = {
    timeInfo: {
        breakfast: {
            closed: false,
            start: '06:00',
            end: '10:00'
        },
        lunch: {
            closed: false,
            start: '11:00',
            end: '15:00'
        },
        dinner: {
            closed: false,
            start: '17:00',
            end: '23:00'
        }
    }
}


export default function AdminRestaurant(){
    const classes = useStyles()
    const { modalVisible } = useModal()
    const { toggleModalTrue } = useModalActions()
    const { getAllRestaurants } = useRestaurantActions()
    const { getRestaurantById } = useCurrentRestaurantActions()
    const { restaurants } = useRestaurants()
    const history = useHistory()

    const data = {
        initialRestaurantData: initialRestaurantData,
        initialTimeData: initialTimeData
    }
    
    

    const handleOpenModal = () => {
        toggleModalTrue('restaurant')
    }

    const handleClickToMenu = (id) => {

        getRestaurantById({id: id})

        let path = `/admin/restaurants/${id}`

        history.push(path)
    }

    useEffect(() => {
        getAllRestaurants()
    }, [modalVisible])

    let restaurantList = (
        restaurants.map(restaurant => {
            return (
                // <ListItem button component="a" href={`restaurants/${restaurant._id}`}>
                <ListItem button key={restaurant._id} onClick={() => handleClickToMenu(restaurant._id)}>
                    <ListItemText primary={restaurant.name} />
                </ListItem>
            )
        })
    )

    return (
        <div className={classes.root}>
            <Navigation />
            <div className={classes.mainWrapper}>
                <div className={classes.textWrap}>
                    <Button onClick={handleOpenModal}>
                        Add Restaurant
                    </Button>
                    <List key={'rl'}>
                        {restaurantList}
                    </List>
                    <AddRestaurantModal data={data}/>
                </div>
                <img className={classes.mainBG} src={WorkInProgressImage} />
            </div>
        </div>
    )
}