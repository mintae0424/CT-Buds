import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'
import { fade, makeStyles, withStyles } from '@material-ui/core/styles'
import Navigation from '../Navigation/Navigation'
import WorkInProgressImage from '../../images/WorkInProgressImage.png'
import { useAuthActions } from '../../hooks/commands/useAuthActions'
import { useAuth } from '../../hooks/queries/useAuth'
import { Button, IconButton, List, ListItem, ListItemText, Divider } from "@material-ui/core"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './firebaseui-styling.global.css'

const StyledButton = withStyles({
    root: {
        backgroundColor: '#0372bc',
        '&:hover': {
            backgroundColor: '#0372bc'
        },
        textTransform: 'none',
        color: 'white'
    }
})((props) => <Button color='default' {...props} />)

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#fff6e9',
        height: '100vh',
    },
    backarrowContainer: {
        padding: '15px',
        position: 'fixed',
    },
    backarrow: {
        fontSize: '1.5em',
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
        marginTop: '-150px',
        zIndex: 3,       
    },
    titleText: {
        position: 'absolute',
        width: '100%',
        top: '12vh',
        left: 0,
        right: 0,
        margin: 'auto',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    signinFeatures: {
        fontSize: '1.5em',
        lineHeight: '2em',
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
    myfitnesspalLogo: {
        margin: '2px 10px 2px 5px'
    }
}))

var firebaseConfig = {
    apiKey: "AIzaSyAplDvwpzx9ZuoQONh1E3cc3VE1tvzjYIk",
    authDomain: "ct-buds.firebaseapp.com",
    projectId: "ct-buds",
    storageBucket: "ct-buds.appspot.com",
    messagingSenderId: "1055470225835",
    appId: "1:1055470225835:web:21bb7fa48584aca7736aee",
    measurementId: "G-Z2R71ZCZRC"
}

firebase.initializeApp(firebaseConfig)

function onAuthStateChanged(callback1, callback2) {
    return firebase.auth().onAuthStateChanged(async user => {
        if (user) {
            const idToken = await firebase.auth().currentUser?.getIdToken()
            await callback1({isAuthenticated: true, user: user, token: idToken})
        } else {
            callback2()
        }
    })
}

function login(username, password) {
    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(username, password)
            .then(() => resolve())
            .catch(error => reject(error))
    })
}

function logout() {
    firebase.auth().signOut();
}

export default function Auth(){
    const classes = useStyles()
    const { authUser, logoutUser } = useAuthActions()
    const { isAuthenticated, user } = useAuth()

    const history = useHistory()

    const fireBaseUIConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false
        }
    }

    const handleClickToPreferences = () => {
        let id = user._id

        let path = `/users/${id}`

        history.push(path)
    }
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authUser, logoutUser)
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div className={classes.root}>
            <IconButton
                className={classes.backarrowContainer} href='/'>
                <ArrowBackIcon className={classes.backarrow}/>
            </IconButton>
            <div className={classes.titleText}>Welcome to Buds</div>
            <div className={classes.mainWrapper}>
                <div className={classes.textWrap}>
                    { isAuthenticated ? 
                        <>
                            <div>{user.displayName}</div>
                            <div>{user.email}</div>
                            <List>
                                <ListItem  button onClick={handleClickToPreferences}>
                                    <div className={classes.signinFeatures}>Set Preference</div>
                                </ListItem>
                                <ListItem  button component='a' href='/'>
                                    <div className={classes.signinFeatures}>Start Ordering</div>
                                </ListItem>
                                <ListItem  button onClick={() => firebase.auth().signOut()}>
                                    <div className={classes.signinFeatures}>Log Out</div>
                                </ListItem>
                            </List>
                        </>
                        : <><StyledFirebaseAuth uiConfig={fireBaseUIConfig} firebaseAuth={firebase.auth()} />
                          <StyledButton href="https://www.myfitnesspal.com/" target="_blank"><img className={classes.myfitnesspalLogo}src='/images/myfitnesspal.png' height='25'></img> Log in with myfitnesspal</StyledButton></>
                        }
                </div>
                <img className={classes.mainBG} src={WorkInProgressImage} />
            </div>
        </div>
    )
}