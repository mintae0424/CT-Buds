import React, { useState, useEffect } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import { Modal, Button, IconButton } from '@material-ui/core'
import { RemoveCircle, AddCircle, Delete } from '@material-ui/icons'
import { useModal } from '../../hooks/queries/useModal'
import { useModalActions } from '../../hooks/commands/useModalActions'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useHistory } from 'react-router'
import { useAuth } from '../../hooks/queries/useAuth'
import './CartModal.css'
import { useCurrentRestaurant } from '../../hooks/queries/useCurrentRestaurant'
import { useCart } from '../../hooks/queries/useCart'
import { useCartActions } from '../../hooks/commands/useCartActions'
import GreenButton from '../../factory/Button/GreenButton'


const useStyles = makeStyles((theme) => ({
    iconWrapper: {
        padding: '7px'
    },
    quantityAdjustmentIcon: {
        fontSize: '18px',
    },
    cancelButton: {
        textTransform: 'none',
        margin: '5px',
        height: '30px',
        width: '80px',
        borderRadius: '20px'
    },
    cartButton: {
        textTransform: 'none',
        margin: '5px',
        height: '30px',
        width: '150px',
        borderRadius: '20px'
    }
}))

export default function CartModal(){

    const classes = useStyles()

    const { modalVisible } = useModal()
    const { toggleModalFalse } = useModalActions()
    const { user } = useAuth()
    const { info } = useCurrentRestaurant()
    const { cart } = useCart()
    const { clearCart, updateCart } = useCartActions()
    let history = useHistory()


    const decreaseQuantity = (id) => {
        let adjustedCart = cart.map(item => {
            if (item._id === id){
                item.quantity -= 1
            }
            return item
        })
        adjustedCart = adjustedCart.filter(item => item.quantity !== 0)
        updateCart(adjustedCart)
    }

    const increaseQuantity = (id) => {
        let adjustedCart = cart.map(item => {
            if (item._id === id){
                item.quantity += 1
            }
            return item
        })
        updateCart(adjustedCart)
    }
    
    const handleClearCart = () => {
        clearCart()
        toggleModalFalse()
    }

    const handlePlaceOrder = () => {
        toggleModalFalse()
        history.push('/comingsoon')
    }

    return (
        <>
            <Modal
                open={(modalVisible === 'cart')}
                onClose={toggleModalFalse}
            >
                <div className='modal'>
                    <div className='cart-title'>{info.name}</div>
                    <div className='cart-detail'>
                        {cart.map(item => {
                            return (
                                <div className='item-row'>
                                    <div className='quantity-wrap'>
                                        <IconButton  className={classes.iconWrapper} onClick={() => decreaseQuantity(item._id)}>
                                            <RemoveCircle className={classes.quantityAdjustmentIcon} />
                                        </IconButton>
                                        <div>{item.quantity}</div>
                                        <IconButton className={classes.iconWrapper} onClick={() => increaseQuantity(item._id)}>
                                            <AddCircle className={classes.quantityAdjustmentIcon}/>
                                        </IconButton>
                                    </div>
                                    {item.name}
                                    <div className='price-text'>
                                        {`$${(item.price * item.quantity).toFixed(2)}`}
                                    </div>
                                </div>
                            )
                        })}
                        {/* <Button onClick={clearCart}>Click</Button> */}
                    </div>
                    <div className='line-break'></div>
                    <div className='amount-detail'>
                        <div className='subtotal'>
                            <div className='text'>Subtotal</div>
                            <div className='amount'>{`$${cart.reduce((a,b) => a + ((b.price * b.quantity)|| 0), 0).toFixed(2)}`}</div>
                        </div>
                        <div className='tax'>
                            <div className='text'>Tax</div>
                            <div className='amount'>{`$${(cart.reduce((a,b) => a + ((b.price * b.quantity)|| 0), 0) * .08875).toFixed(2)}`}</div>
                        </div>
                        <div className='total'>
                            <div className='text'>Total</div>
                            <div className='amount'>{`$${(cart.reduce((a,b) => a + ((b.price * b.quantity)|| 0), 0) * 1.08875).toFixed(2)}`}</div>
                        </div>
                    </div>
                    <div className='button-group'>
                        <IconButton onClick={handleClearCart}><Delete /></IconButton>
                        <Button style={{backgroundColor: '#C4C4C4'}} className={classes.cancelButton} onClick={toggleModalFalse}>Cancel</Button>
                        <GreenButton className={classes.cartButton} onClick={handlePlaceOrder}>Place your order</GreenButton>
                    </div>
                    <div className='clear-button'>
                    </div>
                </div>
            </Modal>
        </>
    )
}