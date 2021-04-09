import React, { useState, useEffect } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import { Modal, Stepper, Step, StepLabel, Button, Typography, Paper, TextField, Switch, List, ListItem, ListItemText } from '@material-ui/core'
import { useModal } from '../../hooks/queries/useModal'
import { useModalActions } from '../../hooks/commands/useModalActions'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useHistory } from 'react-router'
import { useAuth } from '../../hooks/queries/useAuth'


const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: '55%',
        height: '25%',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 1, 3),
        top: '23%',
        left: '55%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left'
    },
    icon : {
        position: 'absolute',
        fontSize: '32px',
        right: '16%',
        top: '2%',
        color: theme.palette.background.paper,
    },
    buttonWrapper: {
        position: 'absolute',
        top: '90%',
    },
    timeInfoWrapper: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        padding: theme.spacing(1.5),
        textAlign: 'space-between',
    },
    timeTitle: {
        fontWeight: 'bold',
    },
    timeWrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    button: {
        textTransform: 'none',
        width: '100%',
    }
}))

export default function NavModal(){

    const classes = useStyles()

    const { modalVisible } = useModal()
    const { toggleModalFalse } = useModalActions()
    const { user } = useAuth()
    let history = useHistory()

    const handleClickToPreferences = () => {
        let id = user._id

        let path = `/users/${id}`

        history.push(path)
        toggleModalFalse()
    }


    return (
        <>
            <Modal
                open={(modalVisible === 'navigation')}
                onClose={toggleModalFalse}
            >
                <div>
                    <AccountCircle onClick={toggleModalFalse} className={classes.icon} />
                    <div className={classes.modal}>
                        <Button className={classes.button} href='/'>Home</Button>
                        <Button className={classes.button} href='/'>Your Orders</Button>
                        <Button className={classes.button} onClick={handleClickToPreferences}>Your Preferences</Button>
                        <Button className={classes.button} href='/'>Share Your Experience</Button>
                        <Button className={classes.button} href='/'>Your Account</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}