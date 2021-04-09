import React, { useState, useEffect } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import Navigation from '../../Navigation/Navigation'
import InputClass from '../../../factory/Input/InputClass'
import GreenButton from '../../../factory/Button/GreenButton'
import { Paper, Chip, Button } from "@material-ui/core"
import { ValidatorForm } from 'react-material-ui-form-validator'
import formArray from './AdminPreferencesConfig'
import { usePrefActions } from '../../../hooks/commands/usePrefActions'
import { usePref } from '../../../hooks/queries/usePref'


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
    categoryWrapper: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        padding: theme.spacing(1.5),
    },
    categoryTitle: {
        fontWeight: 'bold',
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
    },
    tagAllergy: {
        margin: theme.spacing(0.5),
        backgroundColor: 'rgba(202, 211, 90, 1)',
        '&:hover': {
            backgroundColor: 'rgba(202, 211, 90, 1)'
        }
    },
    tagDiet: {
        margin: theme.spacing(0.5),
        backgroundColor: 'rgba(158, 211, 109, 1)',
        '&:hover': {
            backgroundColor: 'rgba(158, 211, 109, 1)'
        }
    },
    tagCuisine: {
        margin: theme.spacing(0.5),
        backgroundColor: 'rgba(73, 148, 61, 1)',
        '&:hover': {
            backgroundColor: 'rgba(73, 148, 61, 1)'
        }
    }
}))

const initialPreferenceData = {
    formData: {
        category: '',
        preference: ''
    },
    submitted: false
}

export default function AdminPreferences(){
    const classes = useStyles()
    const [preferenceData, setPreferenceData] = useState(initialPreferenceData)
    const { createPref, getAllPref } = usePrefActions()
    const { preferences } = usePref()

    const { submitted } = preferenceData

    const submissionSuccess = () => {
        setPreferenceData({
            submitted: false,
            formData: {
                category: '',
                preference: ''
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        setPreferenceData({
            submitted: true
        })

        createPref(preferenceData.formData)
        submissionSuccess()
    }

    const handleChange = (event) => {
        const { formData } = preferenceData
        formData[event.target.name] = event.target.value
        setPreferenceData({
            ...preferenceData,
            formData
        })
    }

    let form = (
        formArray.map((field) => {
            return (
                <div key={field.input.label}>
                    <InputClass
                        {...field}
                        {...preferenceData.formData}
                        handleChange={handleChange}
                    />
                </div>
            )
        })
    )

    useEffect(() => {
        getAllPref()
    }, [submitted])

    useEffect(() => {
        ValidatorForm.addValidationRule('isPreferenceNotDuplicate', (value) => {
            if (preferenceData.formData.category) {
                let preferenceNames = preferences[preferenceData.formData.category].map(pref => pref.name.toLowerCase())
                let check = value.toLowerCase()
                if (preferenceNames.includes(check)){
                    return false
                }
                return true
            }
            return true
        })
    }, [preferences])

    return (
        <div className={classes.root}>
            <Navigation />
            <div className={classes.mainWrapper}>
                <div className={classes.textWrap}>
                    <Paper className={classes.categoryWrapper}>
                        <div className={classes.categoryTitle}>Allergies</div>
                        <Paper component='ul' className={classes.tagWrapper}>
                            {preferences["Allergy"].map(data => {
                                return (
                                    <li key={data._id}>
                                        <Chip
                                            label={data.name}
                                            className={classes.tagAllergy}
                                        />
                                    </li>
                                )
                            })}
                        </Paper>
                    </Paper>
                    <Paper className={classes.categoryWrapper}>
                        <div className={classes.categoryTitle}>Diets</div>
                        <Paper component='ul' className={classes.tagWrapper}>
                            {preferences["Diet"].map(data => {
                                return (
                                    <li key={data._id}>
                                        <Chip
                                            label={data.name}
                                            className={classes.tagDiet}
                                        />
                                    </li>
                                )
                            })}
                        </Paper>
                    </Paper>
                    <Paper className={classes.categoryWrapper}>
                        <div className={classes.categoryTitle}>Cuisines</div>
                        <Paper component='ul' className={classes.tagWrapper}>
                            {preferences["Cuisine"].map(data => {
                                return (
                                    <li key={data._id}>
                                        <Chip
                                            label={data.name}
                                            className={classes.tagCuisine}
                                        />
                                    </li>
                                )
                            })}
                        </Paper>
                    </Paper>
                    <ValidatorForm
                        className='Form'
                        onSubmit={handleSubmit}
                    >
                        {
                            submitted ? 'Submitted...' : form
                        }
                        <br />
                        <GreenButton color='primary' variant='contained' type='submit' disabled={submitted}>
                            {
                                (submitted && 'Your form is submitted!')
                                || (!submitted && 'Submit')
                            }
                        </GreenButton>
                    </ValidatorForm>
                </div>
            </div>
        </div>
    )
}