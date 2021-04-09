import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, List, ListItem, ListItemText, Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core'
import { ExpandMore, ControlPoint } from '@material-ui/icons'
import { useCurrentRestaurant } from '../../../hooks/queries/useCurrentRestaurant'
import { useCurrentRestaurantActions } from '../../../hooks/commands/useCurrentRestaurantActions'
import { formArray } from './MenuCategoryEditConfig'
import InputClass from '../../../factory/Input/InputClass'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { useModal } from '../../../hooks/queries/useModal'
import { useModalActions } from '../../../hooks/commands/useModalActions'
import MenuCategoryModal from './MenuCategoryModal'
import MenuItemEditModal from './MenuItemEditModal'


let c = {
    name: 'test',
    order: 2
}
let b = {
    name: 'test2',
    order: 1
}
let menu_categories = [
    c, b
]

menu_categories.sort((a, b) => 
    a.order - b.order
)

const useStyles = makeStyles((theme) => ({
    nestedList: {
        width: '100%'
    },
    nestedListItem: {
        display: 'flex',
        justifyContent: 'center',
    },
    menuList: {
        width: '90vw',
    },
    menuListBottom: {
        width: '90vw',
        marginBottom: '50px'
    },
    editButton: {
        textTransform: 'none',
        backgroundColor: '#EDF4ED',
        fontSize: '10px',
        fontWeight: 'bold',
        borderRadius: '15px',
        margin: theme.spacing(1, 1, 3)
    },
    menuItem: {
        padding: theme.spacing(1)
    },
    priceText: {
        textAlign: 'right',
    }
}))

const initialMenuModalData = {
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
        high: 0,
    }
}

export default function MenuEditSection() {
    const classes = useStyles();
    const [ expanded, setExpanded ] = useState(false)
    const { info } = useCurrentRestaurant()
    const { createCategory, getRestaurantById } = useCurrentRestaurantActions()
    const { modalVisible } = useModal()
    const { toggleModalTrue } = useModalActions()
    const [ formData, setFormData ] = useState({submitted: false, name: ''})
    const [ menuModalData, setMenuModalData ] = useState(initialMenuModalData)
    let { submitted } = formData

    const handleOpenModal = () => {
        toggleModalTrue('category')
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    const handleInputChange = (event) => {
        
        formData[event.target.name] = event.target.value

        setFormData({
            ...formData,
            formData
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault()

        submitted = true

        let newCategoryObj = {
            name: formData.name,
            order: info.menu_categories.length + 1,
            id: info._id
        }

        createCategory(newCategoryObj)

        setFormData({
            submitted: false,
            name: ''
        })
    
    }

    const handleAddItemButton = (categoryName, categoryId) => {
        toggleModalTrue('menu-item')
        setMenuModalData({
            ...initialMenuModalData,
            allergy_id: [],
            diet_id: [],
            cuisine_id: [],
            category: {
                name: categoryName,
                id: categoryId,
            },
            meal_time: {
                breakfast: !info.timeInfo.breakfast.closed,
                lunch: !info.timeInfo.lunch.closed,
                dinner: !info.timeInfo.dinner.closed,
            },
            calories: {
                low: 0,
                high: 0
            }
        })
    }

    const handleEditItemButton = (menu_item) => {
        toggleModalTrue('menu-item')
        menu_item.editing = true
        setMenuModalData(
            menu_item
        )
    }

    info.menu_categories.sort((a,b) => a.order - b.order)


    let categoryList = info.menu_categories.map((category, index) => {
        return (
            <Accordion key={`${category.name}-${index}`} className={classes.menuList} expanded={expanded === category.name} onChange={handleChange(category.name)}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography>{category.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List component="div" disablePadding className={classes.nestedList}>
                        {(info.menu_ids.map(menu => { return (
                            menu.category.id === category._id ? 
                                <ListItem key={menu._id} button className={classes.menuItem}  onClick={() => handleEditItemButton(menu)}>
                                    <ListItemText>{menu.name}</ListItemText>
                                    <ListItemText className={classes.priceText}>{`$${menu.price.toFixed(2)}`}</ListItemText>
                                </ListItem>
                                : <></>
                        )}))}
                        <ListItem key={`${category.name}-${index}`} button className={classes.nestedListItem} onClick={() => handleAddItemButton(category.name, category._id)}>
                            <ControlPoint />
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
        )
    })

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

    return (
        <>
            <br />
            <Button className={classes.editButton} onClick={handleOpenModal}>
                Edit Menu Categories
            </Button>
            <MenuCategoryModal />
            {categoryList}
            <Accordion key={'expand-list'} className={classes.menuListBottom}>
                <AccordionSummary expandIcon={<ControlPoint />}>
                    <Typography>Add category</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ValidatorForm onSubmit={handleSubmit}>
                        {form}
                        <Button type='submit' variant='contained'>Submit</Button>
                    </ValidatorForm>
                </AccordionDetails>
            </Accordion>
            <MenuItemEditModal data={menuModalData} />
            
        </>
    )
}