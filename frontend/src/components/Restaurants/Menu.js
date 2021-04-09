import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { Button, Badge, Chip, Checkbox, IconButton, Typography, Select, MenuItem, Slider, Popper } from '@material-ui/core'
import { PinDrop, ArrowForwardIos, ArrowBackIos, Tune, Search, ShoppingCart, RoomService, AddCircle, RemoveCircle } from '@material-ui/icons'
import Navigation from '../Navigation/Navigation'
import { usePref } from '../../hooks/queries/usePref'
import GreenButton from '../../factory/Button/GreenButton'
import GreenSlider from '../../factory/Slider/GreenSlider'
import { useAuth } from '../../hooks/queries/useAuth'
import { useAuthActions } from '../../hooks/commands/useAuthActions'
import { useCurrentRestaurant } from '../../hooks/queries/useCurrentRestaurant'
import './Menu.css'
import { useCart } from '../../hooks/queries/useCart'
import { useCartActions } from '../../hooks/commands/useCartActions'
import CartModal from './CartModal'
import { useModalActions } from '../../hooks/commands/useModalActions'

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
    topArea: {
        position: 'absolute',
        top: '-40px',
        width: '100%',
    },
    tagAllergy: {
        backgroundColor: 'rgba(202, 211, 90, 1)',
        fontSize: '10px',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'rgba(202, 211, 90, 1)'
        }
    },
    tagDiet: {
        backgroundColor: 'rgba(158, 211, 109, 1)',
        fontSize: '10px',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'rgba(158, 211, 109, 1)'
        }
    },
    tagCuisine: {
        backgroundColor: 'rgba(73, 148, 61, 1)',
        fontSize: '10px',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'rgba(73, 148, 61, 1)',
        }
    },
    bottomButton: {
        textTransform: 'none',
        margin: '5px',
        height: '30px',
        width: '80px',
        borderRadius: '20px'
    },
    popperArea: {
        width: '150px',
    },
    popperButton: {
        textTransform: 'none',
        margin: '2px',
        height: '30px',
        width: '110px',
        fontSize: '11px',
        boxShadow: 'none',
    },
    filterButton: {
        backgroundColor: 'rgba(73, 148, 61, 1)',
        padding: '5px',
        borderRadius: '10px',
        color: 'white',
    },
    errorButton: {
        textTransform: 'none',
        margin: '30px',
        height: '30px',
        width: '150px',
        borderRadius: '20px'
    },
    quantityAdjustmentIcon: {
        color: ''
    }
}))


export default function UserPreferences(){
    const classes = useStyles()
    const { preferences } = usePref()
    const [ menuState, setMenuState ] = useState(0)
    const [ categoryState, setCategoryState ] = useState('Main')
    const { isAuthenticated, user } = useAuth() 
    const { info } = useCurrentRestaurant()
    const history = useHistory()
    const [ customMenu, setCustomMenu ] = useState(info.menu_ids)
    const [ anchorEl, setAnchorE1 ] = useState(null)
    const [ secondAnchor, setSecondAnchor ] = useState(null)
    const [ calories, setCalories ] = useState(1500)
    const [ pref, setPref ] = useState(true)
    const { cart } = useCart()
    const { addToCart, removeFromCart } = useCartActions()
    const { toggleModalTrue } = useModalActions()
    const [ quantity, setQuantity ] = useState(1)

    const disabled = (quantity === 1)
    

    let { Allergy, Diet } = preferences

    const categories = ['Main', 'Sides', 'Desserts', 'Drinks']

    const popperOpen = Boolean(anchorEl)
    const popperId = popperOpen ? 'simple-popper' : undefined

    const secondPopperOpen = Boolean(secondAnchor)
    const secondPopperId = secondPopperOpen ? 'simple-popper' : undefined

    const handleMenuBack = () => {
        setMenuState((prevActiveStep) => prevActiveStep - 1)
        setQuantity(1)
    }

    const handleMenuForward = () => {
        setMenuState((prevActiveStep) => prevActiveStep + 1)
        setQuantity(1)
    }

    const handleCategoryChange = (event) => {
        setCategoryState(event.target.value)
        setMenuState(0)
        setQuantity(1)
    }

    const handlePopperClick = (event) => {
        setAnchorE1(anchorEl ? null : event.currentTarget)
    }

    const handleSecondPopperClick = (event) => {
        setSecondAnchor(secondAnchor ? null : event.currentTarget)
    }

    const handleCaloriesChange = (event, newValue) => {
        setCalories(newValue)
        setMenuState(0)
        setQuantity(1)
    }

    const handleFilterClear = () => {
        setPref(false)
        setCalories(1500)
    }

    const handlePrefClick = () => {
        setPref((prevPref) => !prevPref)
        setMenuState(0)
        setQuantity(1)
    }

    const handleAddClick = () => {
        let item = customMenu[menuState]
        item.quantity = quantity
        addToCart(item)
        setQuantity(1)
    }

    const handleOpenModal = () => {
        toggleModalTrue('cart')
    }

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity - 1)
    }

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1)
    }

    let allergen_tags = (
            Allergy.map(data => {
                return (
                    <>
                        { customMenu.length > 0 && customMenu[menuState].allergy_id.includes(data._id) && 
                            <Chip
                                label={data.name}
                                size='small'
                                className={classes.tagAllergy}
                            /> 
                        }
                    </>
                )
            })
    )

    let diet_tags = (
        Diet.map(data => {
            return (
                <>
                    { customMenu.length > 0 && customMenu[menuState].diet_id.includes(data._id) && 
                        <Chip
                            label={data.name}
                            size='small'
                            className={classes.tagDiet}
                        /> 
                    }
                </>
            )
        })
    )

    const compare = (a, b) => (
        a.filter(v => b.includes(v)).length
    )

    useEffect(() => {
        let newMenu = info.menu_ids

        newMenu = newMenu.filter(menu => {
            if (cart.every(item => item._id !== menu._id)) {
                return menu
            }
        })

        if (categoryState === 'Main'){
            newMenu = newMenu.filter(menu => {
                let other = ['Sides', 'Desserts', 'Drinks']
                if (!other.includes(menu.category.name)){
                    return menu
                }
            })
        } else {
            newMenu = newMenu.filter(menu => {
                if (menu.category.name === categoryState){
                    return menu
                }
            })
        }
        newMenu = newMenu.filter(menu => {
            if (menu.calories.high < calories){
                return menu
            }
        })
        if (pref) {
            newMenu = newMenu.filter(menu => {
                if (menu.allergy_id.every(id => !user.allergy_id.includes(id))){
                    return menu
                }
            })
    
            
            if (categoryState !== 'Drinks' && categoryState !== 'Desserts'){
                newMenu = newMenu.sort((a, b) => 
                    compare(a.diet_id, user.diet_id) - compare(b.diet_id, user.diet_id)
                ).reverse()
            }
    
        }

        setCustomMenu(newMenu)
    }, [categoryState, calories, pref, cart])


    return (
        
        <div className={classes.root}>
            <div>
                <svg className={classes.topArea} width="414" height="304" viewBox="0 0 414 304" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-13.6509 -45.183C-7.12904 -91.9805 33.2256 -126 80.4753 -126H201.777H338.589C382.424 -126 420.787 -96.6486 428.838 -53.5601C445.591 36.101 463.162 186.06 412.874 260.716C338.34 371.365 69.9739 231.435 -1.31574 260.716C-52.3751 281.687 -30.2945 74.2418 -13.6509 -45.183Z" fill="#49943D"/>
                </svg>
                <Navigation />
                <div className='category-select'>
                    <Select
                        value={categoryState}
                        onChange={handleCategoryChange}
                        style={{width: '150px', fontWeight: 'bold'}}
                        disableUnderline={true}
                    >
                        {categories.map(category => {
                            return (
                                <MenuItem value={category}>{category}</MenuItem>
                            )
                        })}
                    </Select>
                </div>
                <div className='title-text'>
                    {info.name}
                </div>
            </div>
            
            <div className='address-wrap'>
                <PinDrop outlined style={{fontSize: '20px', padding: '2px 5px 0px 0px','top': '5px', color: 'black'}} />
                <div className='address-text'>
                    {`${info.address.street}`} 
                </div>
            </div>
            
            {customMenu.length > 0 ?
                <div className='main-wrapper'>
                    <div className='back-button-wrapper'>
                        {menuState !== 0 && <ArrowBackIos onClick={handleMenuBack} style={{fontSize: '40px', color: 'rgba(0, 0, 0, .5)'}} />}
                    </div>
                    <div className='forward-button-wrapper'>
                        {menuState !== customMenu.length-1 && <ArrowForwardIos onClick={handleMenuForward} style={{fontSize: '40px', color: 'rgba(0, 0, 0, .5)'}}/>}
                    </div>
                    <div className='menu-image'  style={{background: `url(/images/${info._id}/${customMenu[menuState].name.replace(/[^A-Z0-9]/ig, "").toLowerCase()}.png)`}} />
                    <div className='menu-text-wrap'>
                        <div className='menu-title'>
                            <div className='menu-name'>{customMenu[menuState].name}</div>
                            <div className='menu-price'>{`$${customMenu[menuState].price.toFixed(2)}`}</div>
                        </div>
                        <div className='menu-tags'>
                            {allergen_tags} {diet_tags}
                        </div>
                        <div className='menu-description'>
                            {customMenu[menuState].description}
                        </div>
                        <div className='calories-range'>
                            {`Calories: ${customMenu[menuState].calories.low}-${customMenu[menuState].calories.high}`}
                        </div>

                    </div> 
                    {!anchorEl && 
                        <>
                            <div className='quantity-adjustment'>
                                <IconButton disabled={disabled} onClick={decreaseQuantity}>
                                    <RemoveCircle  className={classes.quantityAdjustmentIcon}/>
                                </IconButton>
                                <div>{quantity}</div>
                                <IconButton onClick={increaseQuantity}>
                                    <AddCircle className={classes.quantityAdjustmentIcon}/>
                                </IconButton>
                            </div>

                            <div className='button-wrapper'>
                                <GreenButton className={classes.bottomButton} onClick={handleAddClick} color='primary' variant='contained'>
                                        Add
                                </GreenButton>
                            </div>
                        </>
                    }
                </div>
                
                : <div className='error-wrapper'>
                    <div>Sorry, we could not find dishes that match your preference</div>
                    <GreenButton className={classes.errorButton}  onClick={handleFilterClear} color='primary' variant='contained'>
                            See full menu
                    </GreenButton>
                </div>
            }
            
            <div className='bottom-wrapper'>
                <div className='icon-wrapper-1'>
                    <Popper id={secondPopperId} open={secondPopperOpen} anchorEl={secondAnchor} placement={'right'}>
                        <div className='filter-button-wrapper'>
                            <Popper id={popperId} open={popperOpen} anchorEl={anchorEl} placement={'top'}>
                                <div className={classes.popperArea}>
                                    <GreenSlider
                                        onChange={handleCaloriesChange}
                                        valueLabelDisplay='auto'
                                        value={calories}
                                        step={100}
                                        min={100}
                                        max={1500}
                                    />
                                </div>
                            </Popper>
                            <GreenButton className={classes.popperButton} color='primary' variant='contained' onClick={handlePopperClick}>
                                    Set Calories
                            </GreenButton>
                            {pref ? 
                                <GreenButton className={classes.popperButton} color='primary' variant='contained' onClick={handlePrefClick}>
                                    Clear Preferences
                                </GreenButton>
                                : <GreenButton className={classes.popperButton} color='primary' variant='contained' onClick={handlePrefClick}>
                                    Set Preferences
                                </GreenButton>
                            }
                            
                        </div>
                    </Popper>
                    <Tune className={classes.filterButton} color='primary' variant='contained' onClick={handleSecondPopperClick} />
                </div>
                <div className='icon-wrapper-2'>
                    {!secondAnchor && <Search className={classes.filterButton}/>}
                </div>
                <div className='icon-wrapper-3'>
                    {!secondAnchor && 
                        <Badge badgeContent={cart.length} color='primary'>
                            <ShoppingCart className={classes.filterButton} onClick={handleOpenModal}/>
                        </Badge>
                    }
                </div>
                <div className='icon-wrapper-4'>
                    {!secondAnchor &&<RoomService className={classes.filterButton}/>}
                </div>
                <div className='popper-button-wrapper'>
                    {anchorEl && secondAnchor &&
                        <GreenButton className={classes.bottomButton} onClick={handlePopperClick} color='primary' variant='contained'>
                            Set
                        </GreenButton>
                    }
                </div>
                
            </div>
            <CartModal />
        </div>


    )
}