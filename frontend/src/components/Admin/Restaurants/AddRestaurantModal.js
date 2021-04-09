import React, { useState, useEffect } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import { Modal, Stepper, Step, StepLabel, Button, Typography, Paper, TextField, Switch, List, ListItem, ListItemText } from '@material-ui/core'
import { useModal } from '../../../hooks/queries/useModal'
import { useModalActions } from '../../../hooks/commands/useModalActions'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { basicInfoFormArray, timeInfoFormArray } from './AddRestaurantModalConfig'
import InputClass from '../../../factory/Input/InputClass'
import { useRestaurantActions } from '../../../hooks/commands/useRestaurantActions'

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: '75%',
        height: '85%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
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
    }
}))

function getSteps() {
    return ['Basic Restaurant Info', 'Menu Categories', 'Review']
}


export default function AddRestaurantModal({data}){

    const classes = useStyles()

    const { modalVisible } = useModal()
    const { toggleModalFalse } = useModalActions()

    const [activeStep, setActiveStep] = useState(0)
    const steps = getSteps()

    const [ restaurantData, setRestaurantData ] = useState(data.initialRestaurantData)
    const [ timeData, setTimeData ] = useState(data.initialTimeData)

    let submitted = false

    const { createRestaurant } = useRestaurantActions()


    const handleNext = () => {
        if (activeStep === steps.length - 1){
            const { restaurantInfo } = restaurantData
            const { timeInfo } = timeData

            submitted = true

            let submitInfo = Object.assign({}, restaurantInfo)
            submitInfo.timeInfo = timeInfo

            createRestaurant(submitInfo)

            submitted = false

            setRestaurantData(
                data.initialRestaurantData
            )

            setTimeData(
                data.initialTimeData
            )

            setActiveStep(0)

            toggleModalFalse()
            

        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleReset = () => {
        setActiveStep(0)
    }
    
    const handleCloseModal = () => {
        toggleModalFalse()
    }

    const handleBasicInfoChange = (event) => {
        const { restaurantInfo } = restaurantData
        restaurantInfo[event.target.name] = event.target.value

        setRestaurantData({
            ...restaurantData,
            restaurantInfo
        })
    }

    const handleTimeInfoChange = (event) => {
        const { timeInfo } = timeData

        timeInfo[event.target.id][event.target.name] = event.target.value

        setTimeData({
            ...timeData,
            timeInfo
        })
    }

    const handleSwitch = (event) => {
        const { timeInfo } = timeData
        timeInfo[event.target.id].closed = !event.target.checked

        setTimeData({
            ...timeData,
            timeInfo
        })
    }

    let basicInfoForm = (
        basicInfoFormArray.map((field) => {
            return(
                <div key={field.input.label}>
                    <InputClass
                        handleChange={handleBasicInfoChange}
                        {...field}
                        {...restaurantData.restaurantInfo}
                    />
                </div>
            )
        })
    )

    let timeInfoForm = (
        timeInfoFormArray.map((field) => {
            return(
                <Paper className={classes.timeInfoWrapper} key={field.key}>
                    <div className={classes.timeTitle}>
                        {field.name}
                        <Switch
                            id={field.start.id}
                            checked={!timeData.timeInfo[field.start.id].closed}
                            onChange={handleSwitch}
                            color='default'
                        />
                    </div>
                    
                    <div className={classes.timeWrapper}>
                        <TextField
                            id = {field.start.id}
                            name = {field.start.name}
                            label = {field.start.label}
                            style = {field.start.style}
                            type = {field.start.type}
                            meal = {field.start.meal}
                            disabled = {timeData.timeInfo[field.start.id].closed}
                            value = {timeData.timeInfo[field.start.id].start}
                            onChange = {handleTimeInfoChange}
                        />
                        <TextField
                            id = {field.end.id}
                            name = {field.end.name}
                            label = {field.end.label}
                            style = {field.end.style}
                            type = {field.end.type}
                            meal = {field.start.meal}
                            disabled = {timeData.timeInfo[field.start.id].closed}
                            value = {timeData.timeInfo[field.end.id].end}
                            onChange = {handleTimeInfoChange}
                        />
                    </div>
                </Paper>
            )
        })
    )

    let reviewForm = (
        <>
            <List>
                <ListItem>
                    <ListItemText>Name</ListItemText>
                    <ListItemText>{restaurantData.restaurantInfo.name}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>Address</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        {`${restaurantData.restaurantInfo.street} \n ${restaurantData.restaurantInfo.city}, ${restaurantData.restaurantInfo.state} ${restaurantData.restaurantInfo.zip}`}
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>Email</ListItemText>
                    <ListItemText>{restaurantData.restaurantInfo.email}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>Breakfast Hours</ListItemText>
                    <ListItemText>{timeData.timeInfo.breakfast.closed ? "Closed" : `${timeData.timeInfo.breakfast.start}-${timeData.timeInfo.breakfast.end}`}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>Lunch Hours</ListItemText>
                    <ListItemText>{timeData.timeInfo.lunch.closed ? "Closed" : `${timeData.timeInfo.lunch.start}-${timeData.timeInfo.lunch.end}`}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>Dinner Hours</ListItemText>
                    <ListItemText>{timeData.timeInfo.dinner.closed ? "Closed" : `${timeData.timeInfo.dinner.start}-${timeData.timeInfo.dinner.end}`}</ListItemText>
                </ListItem>
            </List>
        </>
    )

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return basicInfoForm
            case 1:
                return timeInfoForm
            case 2:
                return reviewForm
            default:
                return "Unknown stepIndex"
        }
    }

    useEffect(() => {
        toggleModalFalse()
    }, [])

    return (
        <>
            <Modal
                open={(modalVisible === 'restaurant')}
                onClose={handleCloseModal}
            >
                <div className={classes.modal}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {activeStep === steps.length ? (
                            <div>
                                <Typography>All steps completed</Typography>
                                <Button onClick={handleReset}>Reset</Button>
                            </div>
                        ) : (
                            <ValidatorForm
                                onSubmit={handleNext}
                            >
                                {getStepContent(activeStep)}
                                <div className={classes.buttonWrapper}>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                    >
                                        Back
                                    </Button>
                                    <Button variant='contained' type='submit'>
                                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                    </Button>
                                </div>
                            </ValidatorForm>
                        )}
                    </div>

                </div>
            </Modal>
        </>
    )
}