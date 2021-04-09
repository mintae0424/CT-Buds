import React, { useState, useEffect } from 'react'
import { fade, makeStyles, withStyles } from '@material-ui/core/styles'
import { Button, Modal, Paper, Chip, Checkbox, InputLabel, FormControl, MenuItem, IconButton, TextField, Typography } from '@material-ui/core'
import { AddCircle, Delete, Clear } from '@material-ui/icons'
import { useModal } from '../../../hooks/queries/useModal'
import { useModalActions } from '../../../hooks/commands/useModalActions'
import { useCurrentRestaurant } from '../../../hooks/queries/useCurrentRestaurant'
import { useCurrentRestaurantActions } from '../../../hooks/commands/useCurrentRestaurantActions'
import { ValidatorForm, SelectValidator } from 'react-material-ui-form-validator'
import { formArray } from './MenuItemEditConfig'
import InputClass from '../../../factory/Input/InputClass'
import { usePrefActions } from '../../../hooks/commands/usePrefActions'
import { usePref } from '../../../hooks/queries/usePref'


const initialFormData = {
    submitted: false,
    name: '',
    restaurant_id: '',
    allergy_id: [],
    diet_id: [],
    cuisine_id: [],
    price: '',
    meal_time: {
        breakfast: false,
        lunch: false,
        dinner: false,
    },
    description: '',
    category: {
        name: '',
        id: '',
    },
    calories: {
        low: 0,
        high: 0
    }
}

const GreenCheckbox = withStyles({
    root: {
      color: 'rgba(73, 148, 61, 1)',
      '&$checked': {
        color: 'rgba(73, 148, 61, 1)',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

const GreenButton = withStyles({
    root: {
        backgroundColor: 'rgba(73, 148, 61, 1)',
    }
})((props) => <Button color='default' {...props} />)


const useStyles = makeStyles((theme) => ({
    formContainer: {
        width: '100%',        
    },
    formHeader: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '50px',
        top: '0',
        left: '0',
        padding: '10px',
        backgroundColor:  'rgba(255, 255, 255, 1)'
    },
    clearIcon: {
        position: 'abosolute',
        top: '-12px',
        right: '25px',
        padding: '0px'
    },
    formContent: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        top: '50px',
        bottom: '50px',
        fontSize: '10px',
        overflowY: 'auto',
        paddingTop: '25px',
        paddingBottom: '50px',
    },
    buttonWrapper: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'space-between',
        height: '50px',
        width: '100%',
        bottom: '0',
        left: '0',
        backgroundColor: 'rgba(82, 118, 77, 1)',
    },
    defaultButtons: {
        position: 'absolute',
        right: '5px',
    },
    deleteWrapper: {
        width: '130px',
        display: 'flex',
    },
    deleteWrapperText: {
        width: '100%',
        display: 'flex',
    },
    tagWrapper: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
        color: 'rgba(202, 211, 90, 1)',
    },
    categoryTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '12px',
        margin: theme.spacing(2, 1, 1)
    },
    tagAllergy: {
        backgroundColor: 'rgba(202, 211, 90, 1)',
        '&:hover': {
            backgroundColor: 'rgba(202, 211, 90, 1)'
        }
    },
    tagAllergyOutlined: {
        border: '2px solid rgba(202, 211, 90, 1)',
        fontColor: 'rgba(202, 211, 90, 1)',
        '&:hover': {
            backgroundColor: 'rgba(202, 211, 90, 1)'
        }
    },
    tagDiet: {
        backgroundColor: 'rgba(158, 211, 109, 1)',
        '&:hover': {
            backgroundColor: 'rgba(158, 211, 109, 1)'
        }
    },
    tagDietOutlined: {
        border: '2px solid rgba(158, 211, 109, 1)',
        '&:hover': {
            backgroundColor: 'rgba(158, 211, 109, 1)'
        }
    },
    tagCuisine: {
        backgroundColor: 'rgba(73, 148, 61, 1)',
        '&:hover': {
            backgroundColor: 'rgba(73, 148, 61, 1)',
        }
    },
    tagCuisineOutlined: {
        border: '2px solid rgba(73, 148, 61, 1)',
        '&:hover': {
            backgroundColor: 'rgba(73, 148, 61, 1)',
        }
    },
    timeInfoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: theme.spacing(2)
    },
    timeWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    mealTimeTitle: {
        fontSize: '13px',
        textAlign: 'center',
    },
    caloriesInfoWrapper:{
        marginTop: theme.spacing(2)
    },
    caloriesWrapper: {
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: theme.spacing(1)
    },
    caloriesTitle: {
        fontSize: '12px',
        textAlign: 'center',
        fontWeight: 'bold'
    }
}))

export default function MenuItemEditModal({data}){

    const classes = useStyles()

    const { modalVisible } = useModal()
    const { toggleModalFalse } = useModalActions()
    const { createMenuItem } = useCurrentRestaurantActions()
    const { info } = useCurrentRestaurant()
    const { getAllPref } = usePrefActions()
    const { preferences } = usePref()
    const [ formData, setFormData ] = useState(data)
    const [ deleteState, setDeleteState ] = useState(false)
    let submitted = false
    const { editing } = formData
    
    let { Allergy, Diet, Cuisine } = preferences
    
    const handleCloseModal = () => {
        toggleModalFalse()
    }

    const handleMealStateChange = (event) => {
        setFormData({
            ...formData,
            meal_time: {
                ...formData.meal_time,
                [event.target.name]: event.target.checked
            }
        })
    }

    const handleInputChange = (event) => {
        formData[event.target.name] = event.target.value

        setFormData({
            ...formData,
            formData
        })
    }

    const handleSelectChange = (event) => {
        console.log(event)
        formData[event.target.name].name = event.target.value

        let i = info.menu_categories.findIndex(category => category.name === event.target.value)
        formData[event.target.name].id = info.menu_categories[i]._id

        setFormData({
            ...formData,
            formData
        })
    }

    const handleLowCaloriesChange = (event) => {
        setFormData({
            ...formData,
            calories: {
                ...formData.calories,
                low: event.target.value
            }
        })
    }

    const handleHighCaloriesChange = (event) => {
        setFormData({
            ...formData,
            calories: {
                ...formData.calories,
                high: event.target.value
            }
        })
    }

    const handleAddAllergy = (allergyId) => {
        formData.allergy_id.push(allergyId)

        setFormData({
            ...formData,
            formData
        })
    }

    const handleDeleteAllergy = (allergyId) => {
        let newAllergyIds = formData.allergy_id.filter(id => id !== allergyId)

        setFormData({
            ...formData,
            allergy_id: newAllergyIds
        })
    }

    const handleAddDiet = (dietId) => {
        formData.diet_id.push(dietId)

        setFormData({
            ...formData,
            formData
        })
    }

    const handleDeleteDiet = (dietId) => {
        let newDietIds = formData.diet_id.filter(id => id !== dietId)

        setFormData({
            ...formData,
            diet_id: newDietIds
        })
    }

    const handleAddCuisine = (cuisineId) => {
        formData.cuisine_id.push(cuisineId)

        setFormData({
            ...formData,
            formData
        })
    }

    const handleDeleteCuisine = (cuisineId) => {
        let newCuisineIds = formData.cuisine_id.filter(id => id !== cuisineId)

        setFormData({
            ...formData,
            cuisine_id: newCuisineIds
        })
    }
    

    const handleSubmit = (event) => {
        event.preventDefault()

        setFormData({
            ...formData,
            submitted: true,
        })

        let submitData = {
            _id: formData._id,
            name: formData.name,
            restaurant_id: info._id,
            allergy_id: formData.allergy_id,
            diet_id: formData.diet_id,
            cuisine_id: formData.cuisine_id,
            price: formData.price,
            category: {
                name: formData.category.name,
                id: formData.category.id
            },
            description: formData.description,
            meal_time: formData.meal_time,
            calories: {
                low: formData.calories.low,
                high: formData.calories.high,
            }
        }
        createMenuItem(submitData)

        setFormData({submitted: false,
            editing: false,
            _id: '',
            name: '',
            restaurant_id: '',
            allergy_id: [],
            diet_id: [],
            cuisine_id: [],
            price: '',
            meal_time: {
                breakfast: false,
                lunch: false,
                dinner: false,
            },
            description: '',
            category: {
                name: '',
                id: '',
            },
            calories: {
                low: 0,
                high: 0
            }
        })

        toggleModalFalse()
    }

    const handleDeleteToggle = () => {
        setDeleteState(
            !deleteState
        )
    }

    const handleDeleteSubmit = (event) => {
        event.preventDefault()
    }

    let form = (
        formArray.map((field) => {
            return(
                <div key={field.input.label}>
                    <InputClass
                        handleChange={handleInputChange}
                        {...field}
                        {...formData}
                    />
                </div>
            )
        })
    )
    Allergy = preferences.Allergy.sort((a,b) => {
        if (a.name.toUpperCase() < b.name.toUpperCase()){
            return -1
        }
        if (a.name.toUpperCase() > b.name.toUpperCase()){
            return 1
        }

        return 0
    })

    let allergenList = (
        <Paper component='ul' className={classes.tagWrapper}>
            {Allergy.map(data => {
                return (
                    <li className={classes.tagWrapper} key={data._id}>
                        { formData.allergy_id.includes(data._id) ? 
                            <Chip
                                label={data.name}
                                size='small'
                                onDelete={() => handleDeleteAllergy(data._id)}
                                onClick={() => handleDeleteAllergy(data._id)}
                                className={classes.tagAllergy}
                            /> 
                            : <Chip label={data.name}
                                size = 'small'
                                variant='outlined'
                                onDelete={() => handleAddAllergy(data._id)}
                                onClick={() => handleAddAllergy(data._id)}
                                deleteIcon={<AddCircle style={{'color': 'rgba(202, 211, 90, 1)'}}/>}
                                className={classes.tagAllergyOutlined}
                            />
                    }
                        
                    </li>
                )
            })}
        </Paper>
    )

    Diet = preferences.Diet.sort((a,b) => {
        if (a.name.toUpperCase() < b.name.toUpperCase()){
            return -1
        }
        if (a.name.toUpperCase() > b.name.toUpperCase()){
            return 1
        }

        return 0
    })

    let dietList = (
        <Paper component='ul' className={classes.tagWrapper}>
            {Diet.map(data => {
                return (
                    <li className={classes.tagWrapper} key={data._id}>
                        { formData.diet_id.includes(data._id) ? 
                            <Chip
                                label={data.name}
                                size='small'
                                onDelete={() => handleDeleteDiet(data._id)}
                                onClick={() => handleDeleteDiet(data._id)}
                                className={classes.tagDiet}
                            /> 
                            : <Chip label={data.name}
                                size = 'small'
                                variant='outlined'
                                onDelete={() => handleAddDiet(data._id)}
                                onClick={() => handleAddDiet(data._id)}
                                deleteIcon={<AddCircle style={{'color': 'rgba(158, 211, 109, 1)'}}/>}
                                className={classes.tagDietOutlined}
                            />
                    }
                        
                    </li>
                )
            })}
        </Paper>
    )

    let cuisineList = (
        <Paper component='ul' className={classes.tagWrapper}>
            {Cuisine.map(data => {
                return (
                    <li className={classes.tagWrapper} key={data._id}>
                        { formData.cuisine_id.includes(data._id) ? 
                            <Chip
                                label={data.name}
                                size='small'
                                onDelete={() => handleDeleteCuisine(data._id)}
                                onClick={() => handleDeleteCuisine(data._id)}
                                className={classes.tagCuisine}
                            /> 
                            : <Chip label={data.name}
                                size = 'small'
                                variant='outlined'
                                onDelete={() => handleAddCuisine(data._id)}
                                onClick={() => handleAddCuisine(data._id)}
                                deleteIcon={<AddCircle style={{'color': 'rgba(73, 148, 61, 1)'}}/>}
                                className={classes.tagCuisineOutlined}
                            />
                    }
                        
                    </li>
                )
            })}
        </Paper>
    )

    useEffect(() => {
        getAllPref()
        setFormData(data)
    }, [modalVisible])

    return (
        <>
            <Modal
                open={(modalVisible === 'menu-item')}
                onClose={handleCloseModal}
            >
                <ValidatorForm className={classes.formContainer} onSubmit={handleSubmit}>
                    <div className={classes.formHeader}>
                        {editing &&<Typography>Edit Menu Item</Typography>
                        || !editing && <Typography>New Menu Item</Typography>}
                        <IconButton className={classes.clearIcon} onClick={toggleModalFalse}><Clear /></IconButton>
                    </div>
                    <div className={classes.formContent}>
                        <FormControl >
                            <InputLabel shrink style={{top: '-15px', margin: '10px 10px 0px'}}>
                                Category
                            </InputLabel>
                            <SelectValidator
                                value={formData.category.name || ''}
                                onChange={handleSelectChange}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                name={'category'}
                                style={{width: '90%',
                                margin: '10px 10px 0px' }}
                            >
                                {
                                    info.menu_categories.map(option => {
                                        return (
                                            <MenuItem key={option._id} value={option.name}>
                                                {option.name}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </SelectValidator>
                        </FormControl>
                        {form}
                        <div className={classes.categoryTitle}>Select associated allergens</div>
                        {allergenList}
                        <div className={classes.categoryTitle}>Select associated diets</div>
                        {dietList}
                        <div className={classes.categoryTitle}>Select associated cuisines</div>
                        {cuisineList}
                        <div className={classes.categoryTitle}>Select meal times</div>
                        <div className={classes.timeInfoWrapper}>
                            <div className={classes.timeWrapper}>
                                <div className={classes.mealTimeTitle}>Breakfast</div>
                                <GreenCheckbox
                                        checked={formData.meal_time.breakfast}
                                        onChange={handleMealStateChange}
                                        disabled={info.timeInfo.breakfast.closed}
                                        name="breakfast"
                                        color="primary"
                                    />
                            </div>
                            <div className={classes.timeWrapper}>
                                <div className={classes.mealTimeTitle}>Lunch</div>
                                <GreenCheckbox
                                        checked={formData.meal_time.lunch}
                                        disabled={info.timeInfo.lunch.closed}
                                        onChange={handleMealStateChange}
                                        name="lunch"
                                        color="primary"
                                    />
                            </div>
                            <div className={classes.timeWrapper}>
                                <div className={classes.mealTimeTitle}>Dinner</div>
                                <GreenCheckbox
                                        checked={formData.meal_time.dinner}
                                        disabled={info.timeInfo.dinner.closed}
                                        onChange={handleMealStateChange}
                                        name="dinner"
                                        color="primary"
                                    />
                            </div>
                        </div>
                        <div className={classes.caloriesInfoWrapper}>
                            <div className={classes.caloriesTitle}>Input calories</div>
                            <div className={classes.caloriesWrapper}>
                                <TextField
                                    label="Low"
                                    type='number'
                                    onChange={handleLowCaloriesChange}
                                    value={formData.calories.low}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{
                                        width: '100px'
                                    }}
                                />
                                <TextField
                                    label="High"
                                    type='number'
                                    onChange={handleHighCaloriesChange}
                                    value={formData.calories.high}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{
                                        width: '100px'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={classes.buttonWrapper}>
                        {editing ? deleteState &&
                            <div className={classes.deleteWrapperText}>
                                <IconButton onClick={() => handleDeleteSubmit()}><Delete className={classes.icon} /></IconButton>
                                <IconButton onClick={() => handleDeleteToggle()}><Clear className={classes.icon} /></IconButton>
                                <Typography className={classes.confirmText}>Are you sure you want to delete this menu item?</Typography>
                                </div>
                                || !deleteState && 
                                <div className={classes.deleteWrapper}> 
                                    <IconButton onClick={() => handleDeleteToggle()}>
                                        <Delete className={classes.deleteIcon}/>
                                    </IconButton> 
                                </div> : <></>}
                        
                            <div>
                        {!deleteState && 
                        <div className={classes.defaultButtons}>
                        <Button style={{'margin': '5px'}} variant='contained' onClick={toggleModalFalse}>Cancel</Button>
                        <GreenButton style={{'margin': '5px'}} color='primary' variant='contained' type='submit' disabled={submitted}>
                            {
                                (submitted && 'Your form is submitted!')
                                || (!submitted && 'Submit')
                            }
                        </GreenButton></div>}
                        </div>
                    </div>
                    
                </ValidatorForm>                    
            </Modal>
        </>
    )
}