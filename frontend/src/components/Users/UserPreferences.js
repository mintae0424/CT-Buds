import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { Button, Paper, Chip, Checkbox, IconButton, Typography } from '@material-ui/core'
import { AddCircle, Delete, Clear } from '@material-ui/icons'
import Navigation from '../Navigation/Navigation'
import './UserPreferences.css'
import { usePref } from '../../hooks/queries/usePref'
import GreenButton from '../../factory/Button/GreenButton'
import { useAuth } from '../../hooks/queries/useAuth'
import { useAuthActions } from '../../hooks/commands/useAuthActions'
import { usePrefActions } from '../../hooks/commands/usePrefActions'

const initialFormData = {
    submitted: false,
    id: '',
    name: '',
    allergy_id: [],
    diet_id: [],
    cuisine_id: [],
}

const theme = createMuiTheme({
    overrides: {
      MuiChip: {
        clickableColorSecondary: {
          "&:hover, &:focus": {
            backgroundColor: "red"
          },
          "&:active": {
            backgroundColor: "green"
          }
        }
      }
    }
  });

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#ffffff',
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
        marginTop: '140px',
        zIndex: 3,       
    },
    titleText: {
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
    topArea: {
        position: 'absolute',
        top: '-40px',
        width: '100%',
    },
    formContainer: {

    },
    formTitle: {
        textAlign: 'left',
        padding: theme.spacing(2, 2, 1),
        fontWeight: 'bold',
    },
    formSubTitle: {
        textAlign: 'left',
        padding: theme.spacing(1, 2),
        color: 'rgba(0, 0, 0, .75)'
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
    buttonWrapper: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'flex-end',
        height: '50px',
        width: '100%',
        bottom: '0px',
        left: '0',
    },
    bottomButton: {
        textTransform: 'none',
        margin: '5px',
        height: '30px',
        width: '80px',
        borderRadius: '20px'
    }
}))

export default function UserPreferences(){
    const classes = useStyles()
    const { preferences } = usePref()
    const [ formData, setFormData ] = useState(initialFormData)
    const { isAuthenticated, user } = useAuth() 
    const { updatePreference } = useAuthActions()
    const { getAllPref } = usePrefActions()
    const history = useHistory()

    let updated = false
    
    let { Allergy, Diet, Cuisine } = preferences

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

    const handleSave = (event) => {
        event.preventDefault()

        updated = false
        
        setFormData({
            ...formData,
            submitted: true
        })


        let prefObj = {
            allergy_id: formData.allergy_id,
            diet_id: formData.diet_id,
            cuisine_id: formData.cuisine_id,
            id: user._id
        }

        updatePreference(prefObj)

        updated = true
        history.goBack()
    }

    useEffect(() => {
        getAllPref()
    }, [])

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
        setFormData({
            allergy_id: user.allergy_id,
            diet_id: user.diet_id,
            cuisine_id: user.cuisine_id
        })
    }, [updated])

    return (
        
        <div className={classes.root}>
            <div>
                <svg className={classes.topArea} width="414" height="304" viewBox="0 0 414 304" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-13.6509 -45.183C-7.12904 -91.9805 33.2256 -126 80.4753 -126H201.777H338.589C382.424 -126 420.787 -96.6486 428.838 -53.5601C445.591 36.101 463.162 186.06 412.874 260.716C338.34 371.365 69.9739 231.435 -1.31574 260.716C-52.3751 281.687 -30.2945 74.2418 -13.6509 -45.183Z" fill="#49943D"/>
                </svg>
                <Navigation />
            </div>
            
            
            <div className={classes.mainWrapper}>
                <div className={classes.textWrap}>
                    
                    <div className='titleText'>
                        Let us know a bit more about you
                    </div>
                    <div className={classes.formContainer}>
                        <div className={classes.formTitle}>
                            Select tags that match you
                        </div>
                        <div className={classes.formSubGroup}>
                            <div className={classes.formSubTitle}>Allergens <AddCircle style={{'color': 'rgba(202, 211, 90, 1)', 'position': 'relative', 'top': '7px'}} /></div>
                            {allergenList}
                        </div>
                        <div className={classes.formSubGroup}>
                            <div className={classes.formSubTitle}>Dietary Preferences <AddCircle style={{'color': 'rgba(158, 211, 109, 1)', 'position': 'relative', 'top': '7px'}} /></div>
                            {dietList}
                        </div>
                        <div className={classes.formSubGroup}>
                            <div className={classes.formSubTitle}>Favorite Cuisines <AddCircle style={{'color': 'rgba(73, 148, 61, 1)', 'position': 'relative', 'top': '7px'}} /></div>
                            {cuisineList}
                        </div>
                    </div>
                    <div className={classes.buttonWrapper}>
                        <Button className={classes.bottomButton} variant='contained' onClick={history.goBack}>Cancel</Button>
                        <GreenButton className={classes.bottomButton}  color='primary' variant='contained' onClick={handleSave}>
                            Save
                        </GreenButton>
                    </div>
                </div>
            </div>
        </div>

        /* Let us know a bit more about you */



    )
}