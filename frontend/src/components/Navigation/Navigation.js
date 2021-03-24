import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Link, useMediaQuery, Typography, Drawer, Divider, List, ListItem, ListItemText, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core"
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import ClearIcon from '@material-ui/icons/Clear'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { NavLink } from 'react-bootstrap'
import { ScatterPlot } from '@material-ui/icons'
import { useAuth } from '../../hooks/queries/useAuth'

const drawerWidth = '80%';

const useStyles = makeStyles((theme) => ({
    navRoot: {
        backgroundColor: 'inherit',
    },
    title: {
        flex: '70%',
        margin: theme.spacing(2),
        fontSize: '1.5em',
        color: 'black',
        '&:hover': {
            textDecoration: 'none',
        }
    },
    navLink: {
        flexGrow: 2,
        margin: theme.spacing(2),
        textTransform: 'none',
        color: 'black',
        fontSize: '1.2em',
    },
    navDropdown: {
        flexGrow: 2,
        margin: theme.spacing(2),
        textTransform: 'none',
        color: 'black',
        fontSize: '1.2em',
    },
    dropDown: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(7),

    },
    dropDownItem: {
        color: 'black',
        '&:hover': {
            textDecoration: 'none',
        }
    },
    navSignIn: {
        color: 'black',
        textTransform: 'none',
    },
    navSignUp: {
        color: 'white',
        fontSize: '12px',
        fontWeight: 'bold',
        backgroundColor: 'black',
        textTransform: 'none',
        borderRadius: '500px',
    },
    menuButton: {
        margin: theme.spacing(2),
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth})`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        textAlign: 'right',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    signInWrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
    signInButton: {
        textAlign: 'center',
        backgroundColor: 'black',
        color: 'white',
        width: '60%',
        margin: '5px', 
        '&:hover': {
            backgroundColor: 'gray',
        }
    },

    menuItemDropdown: {
        width: '100%',
    }

}))

export default function Navigation() {
    const classes = useStyles()
    const theme = useTheme()
    const matches = useMediaQuery('(min-width:800px)')
    const [anchorEl, setAnchorE1] = React.useState(null)
    const [open, setOpen] = React.useState(false)
    const { isAuthenticated } = useAuth()

    const handleMouseOver = (event) => {
        setAnchorE1(event.currentTarget)
    }

    const handleClose = (event) => {
        setAnchorE1(null)
    }

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <>
            { matches ?
            <>        
                <AppBar className={classes.navRoot} color='inherit' position="fixed" elevation={0}>
                    <Toolbar>
                        <Typography component={Link} href='/' className={classes.title} variant="h6" >
                            Buds
                        </Typography>                        
                        <Button className={classes.navLink} href='/comingsoon'>About</Button>
                        <Button className={classes.navDropdown} onMouseOver={handleMouseOver}>
                            Partners {anchorEl ?  <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Button>
                        <Menu 
                            className={classes.dropDown}
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            elevation={0}
                            disableScrollLock={true}
                            MenuListProps={{ onMouseLeave: handleClose }}
                        >
                            <MenuItem component={Link} className={classes.dropDownItem} href='/comingsoon'>Restaurants</MenuItem>
                            <MenuItem component={Link} className={classes.dropDownItem} href='/comingsoon'>Advertisements</MenuItem>
                        </Menu>
                        { isAuthenticated ? 
                            <IconButton
                                className={classes.navSignIn} href='/signin'>
                                <AccountCircle />
                            </IconButton>
                            : <Button className={classes.navSignUp} href='/signin'>Sign In</Button> }                        
                    </Toolbar>
                </AppBar>
            </> : <>
                <AppBar className={classes.navRoot} color='inherit' position="fixed" elevation={0}>
                    <Toolbar>
                        <Typography component={Link} href='/' className={classes.title} variant="h6" >
                            Buds
                        </Typography>
                        { isAuthenticated ? 
                        <IconButton
                            className={classes.navSignIn}
                            href='/signin'>
                            <AccountCircle />
                        </IconButton>
                        : <Button className={classes.navSignUp} href='/signin'>Sign In</Button> }
                        <IconButton 
                            className={classes.menuButton, clsx(open && classes.hide)} 
                            edge="end" 
                            color='inherit' 
                            onClick={handleDrawerOpen}
                            arial-label='menu'>
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant='persistent'
                    anchor='right'
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            <ClearIcon />
                        </IconButton>
                    </div>
                    <List className={classes.signInWrapper}>
                        <ListItem component='a' className={classes.signInButton} href='/signin' button key="SignIn">
                            <ListItemText className={classes.signInText} primary='Sign In' />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem component='a' button href='/' key='Home'>
                            <ListItemText primary='Home' />
                        </ListItem>
                        <ListItem>
                            <Accordion elevation={0}>
                                <AccordionSummary className={classes.menuItemDropdown} expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Partners</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List>
                                        <ListItem component='a' button href='/comingsoon' key="Restaurants">
                                            <ListItemText primary="Restaurants" />
                                        </ListItem>
                                        <ListItem component='a' button href='/comingsoon' key='Advertisers'>
                                            <ListItemText primary='Advertisers' />
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        </ListItem>
                    </List>
                </Drawer>
            </>}
        </>
    )
}
