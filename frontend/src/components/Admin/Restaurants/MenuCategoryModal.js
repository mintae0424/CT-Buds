import React, { useState, useEffect } from 'react'
import { fade, makeStyles, createMuiTheme } from '@material-ui/core/styles'
import { Button, Modal, Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField, ThemeProvider } from '@material-ui/core'
import { Delete, Check, Clear, Create } from '@material-ui/icons'
import { useModal } from '../../../hooks/queries/useModal'
import { useModalActions } from '../../../hooks/commands/useModalActions'
import { useCurrentRestaurant } from '../../../hooks/queries/useCurrentRestaurant'
import { useCurrentRestaurantActions } from '../../../hooks/commands/useCurrentRestaurantActions'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'


const initialModalState = {
    editing: false,
    deleting: false,
    submitted: false,
    categories: [],
    editingCategory: {
        id: '',
        name: '',
        order: 0
    },
    deletingCategory: {
        id: ''
    }
}

const theme = createMuiTheme({
    overrides: {
        MuiTableCell: {
            root: {
                padding: '10px 2px'
            }
        }
    }
})

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: '85%',
        height: '85%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 1, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '10px',
    },
    buttonWrapper: {
        position: 'absolute',
        top: '90%',
        right: '5%',
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
    tableForm: {
        padding: '5px',
        marginTop: '5px',
        width: '150px',
        fontSize: '14px !important',
    },
    tableFormSmall: {
        padding: '5px',
        marginTop: '5px',
        width: '15px',
        fontSize: '14px !important',
    },
    iconWrapper: {
        padding: '5px',
    },
    icon: {
        fontSize: '1rem'
    }
}))

export default function MenuCategoryModal(){

    const classes = useStyles()

    const { modalVisible } = useModal()
    const { toggleModalFalse } = useModalActions()
    const { editCategory } = useCurrentRestaurantActions()

    const { info } = useCurrentRestaurant()

    const [ modalState, setModalState ] = useState(initialModalState)

    let { editing, deleting, categories, editingCategory, deletingCategory } = modalState

    const handleEditToggle = (c) => {
        if (c._id === editingCategory.id) {
            editing = false
            editingCategory ={
                id: '',
                name: '',
                order: 0
            }
        } else {
            editing = true
            editingCategory = {
                id: c._id,
                name: c.name,
                order: c.order
            }
        }

        categories.forEach(category => {
            if (category._id == c._id){
                category.editing = !category.editing
            } else {
                category.editing = false
            }
        })

        setModalState({
            ...modalState,
            editing,
            categories,
            editingCategory
        })
    }

    const handleDeleteToggle = (c) => {
        if (c._id === deletingCategory.id) {
            deleting = false
            deletingCategory = {
                id: '',
            }
        } else {
            deleting = true
            deletingCategory = {
                id: c._id
            }
        }

        categories.forEach(category => {
            if (category._id == c._id){
                category.deleting = !category.deleting
            } else {
                category.deleting = false
            }
        })

        setModalState({
            ...modalState,
            deleting,
            categories,
            deletingCategory
        })
    }

    

    const handleInputChange = (event) => {
        editingCategory[event.target.name] = event.target.value

        setModalState({
            ...modalState,
            editingCategory
        })
    }

    const handleEditSubmit = (category) => {
        setModalState({
            ...modalState,
            submitted: true
        })

        let editedCategories = categories.map(c => {
            if (c._id === editingCategory.id){
                c.name = editingCategory.name
                c.order = editingCategory.order
            }
        })

        setModalState({
            ...modalState,
            categories: editedCategories,
            submitted: false
        })

        handleEditToggle(category)
    }

    const handleDeleteSubmit = (category) => {
        setModalState({
            ...modalState,
            submitted: true
        })

        let editedCategories = categories.filter(c => c._id !== deletingCategory.id)

        setModalState({
            ...modalState,
            categories: editedCategories,
            submitted: false
        })

        handleEditToggle(category)
    }

    const handleCloseModal = () => {
        toggleModalFalse()
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let categoryObj = {
            categories: modalState.categories,
            id: info._id
        }
        
        editCategory(categoryObj)

        toggleModalFalse()
    }


    let form = <>
        <TableCell>
            <TextField
                variant='outlined'
                type= {'text'}
                name= {'name'}
                id= {'input-name'}
                label= {'Category Name'}
                size={'small'}
                InputLabelProps={{
                    shrink: true
                }}
                inputProps={{className: classes.tableForm}}
                value= {editingCategory.name}
                onChange={handleInputChange}
            />
        </TableCell>
        <TableCell>
            <TextField
                variant='outlined'
                type= {'number'}
                name= {'order'}
                id= {'input-order'}
                label= {'Order'}
                size={'small'}
                InputLabelProps={{
                    shrink: true
                }}
                inputProps={{className: classes.tableFormSmall}}
                value= {editingCategory.order}
                onChange={handleInputChange}
            />
        </TableCell>
        </>

    useEffect(() => {
        toggleModalFalse()
    }, [])

    useEffect(() => {
        let categories = info.menu_categories

        let mappedCategories = []

        categories.forEach(category => {
            let categoryObj = {
                ...category,
                editing: false,
                deleting: false
            }
            mappedCategories.push(categoryObj)
        })
        
        setModalState({
            ...modalState,
            categories: mappedCategories
        })
    }, [modalVisible])

    return (
        <>
            <Modal
                open={(modalVisible === 'category')}
                onClose={handleCloseModal}
            >
                <div className={classes.modal}>

                    <ThemeProvider theme={theme}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>Actions</TableCell>
                                    <TableCell align='left'>Name</TableCell>
                                    <TableCell align='left'>Order</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    categories.map(category => (
                                        category.editing && <TableRow selected={true} key={category._id}>
                                            <TableCell align='left'>
                                                <IconButton className={classes.iconWrapper} onClick={() => handleEditSubmit(category)}><Check className={classes.icon} /></IconButton>
                                                <IconButton className={classes.iconWrapper} onClick={() => handleEditToggle(category)}><Clear className={classes.icon} /></IconButton>
                                            </TableCell>
                                            {form}
                                        </TableRow>
                                        || category.deleting && <TableRow selected={true} className={classes.rowDefault} key={category._id}>
                                            <TableCell align='left'>
                                                <IconButton className={classes.iconWrapper} onClick={() => handleDeleteSubmit(category)}><Delete className={classes.icon} /></IconButton>
                                                <IconButton className={classes.iconWrapper} onClick={() => handleDeleteToggle(category)}><Clear className={classes.icon} /></IconButton>
                                            </TableCell>
                                            <TableCell align='left' colspan={'4'}>{'Are you sure you want to delete this category?'}</TableCell>
                                        </TableRow>
                                        || !category.editing &&
                                        <TableRow className={classes.rowDefault} key={category._id}>
                                            <TableCell align='left'>
                                                <IconButton className={classes.iconWrapper} onClick={() => handleEditToggle(category)}><Create className={classes.icon} /></IconButton>
                                                <IconButton className={classes.iconWrapper} onClick={() => handleDeleteToggle(category)}><Delete className={classes.icon} /></IconButton>
                                            </TableCell>
                                            <TableCell component='th' scope='row'>{category.name}</TableCell>
                                            <TableCell align='left'>{category.order}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </ThemeProvider>
                    <div className={classes.buttonWrapper}>
                        <Button style={{'margin': '5px'}} onClick={toggleModalFalse} variant='contained'>Cancel</Button>
                        <Button style={{'margin': '5px'}} onClick={handleSubmit} variant='contained'>Submit</Button>
                    </div>
                </div>
            </Modal>

            
        </>
    )
}