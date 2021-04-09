import React, { useEffect, useState } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import Navigation from '../../Navigation/Navigation'
import MenuEditSection from './MenuEditSection'
import { Button, List, ListItem, ListItemText } from '@material-ui/core'
import { useModal } from '../../../hooks/queries/useModal'
import { useModalActions } from '../../../hooks/commands/useModalActions'
import AddRestaurantModal from './AddRestaurantModal'
import { useCurrentRestaurantActions } from '../../../hooks/commands/useCurrentRestaurantActions'
import { useCurrentRestaurant } from '../../../hooks/queries/useCurrentRestaurant'
import { timeInfoFormArray } from './AddRestaurantModalConfig'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#ABD1B5',
        height: '100vh',
        overflow: 'auto',
    },
    mainWrapper: {
        width: '100%',
        // height: '100vh',
        display: 'flex',
    },
    textWrap: {
        padding: '0 16px 50px',
        marginTop: '100px',
        zIndex: 3,       
    },
    restaurantName: {
        fontSize: '32px',
        padding: theme.spacing(1.5)
    },
    addressInfo: {
        fontSize: '12px',
        padding: theme.spacing(1.5)
    },
    timeInfo: {
        fontSize: '12px',
        padding: theme.spacing(1.5)
    },
    editButton: {
        textTransform: 'none',
        backgroundColor: '#EDF4ED',
        fontSize: '10px',
        fontWeight: 'bold',
        borderRadius: '15px',
        margin: theme.spacing(1.0)
    }
}))

export default function AdminRestaurantMenu({ match }){
    const classes = useStyles()
    const { modalVisible } = useModal()
    const { toggleModalTrue } = useModalActions()
    const { getRestaurantById } = useCurrentRestaurantActions()
    const { info } = useCurrentRestaurant()

    let { timeInfo } = info
    
    let initialRestaurantData = {
        restaurantInfo: {
            name: info.name,
            email: info.email,        
            street: info.address.street,
            city: info.address.city,
            state: info.address.state,
            zip: info.address.zip,
            _id: info._id
        }
    }

    let initialTimeData = {
        timeInfo: timeInfo
    }

    const data = {
        initialRestaurantData: initialRestaurantData,
        initialTimeData: initialTimeData
    }

    const handleOpenModal = () => {
        toggleModalTrue('restaurant')
    }

    useEffect(() => {
        getRestaurantById({id: match.params.id})
    }, [modalVisible])

    return (
        <div className={classes.root}>
            <Navigation />
            <div className={classes.mainWrapper}>
                <div className={classes.textWrap}>
                    <div className={classes.restaurantName}>{info.name}</div>
                    <div className={classes.addressInfo}>
                        <div>{info.address.street}</div>
                        <div>{`${info.address.city}, ${info.address.state} ${info.address.zip}`}</div>
                    </div>
                    <div className={classes.timeInfo}>

                        <div>{"Breakfast: "} {timeInfo.breakfast.closed ? 'Closed' : `${timeInfo.breakfast.start} - ${timeInfo.breakfast.end}`}</div>
                        <div>{"Lunch: "} {timeInfo.lunch.closed ? 'Closed' : `${timeInfo.lunch.start} - ${timeInfo.lunch.end}`}</div>
                        <div>{"Dinner: "} {timeInfo.dinner.closed ? 'Closed' : `${timeInfo.dinner.start} - ${timeInfo.dinner.end}`}</div>
                    </div>
                    <Button className={classes.editButton} onClick={handleOpenModal}>
                        Edit Restaurant Info
                    </Button>
                    <AddRestaurantModal data={data}/>
                    <MenuEditSection />
                </div>
            </div>
        </div>
    )
}