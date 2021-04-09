import React from 'react'
import { TextField, MenuItem, FormControl, InputLabel, InputAdornment } from '@material-ui/core'
import { TextValidator, SelectValidator } from 'react-material-ui-form-validator'

const InputClass = (props) => {
    const { input } = props
    let dynamicInputField = null

    switch (input.type) {
        case ('text'):
            dynamicInputField = <TextValidator
                                    id = {input.id}
                                    label = {input.label}
                                    required = {input.required}
                                    style = {input.style}
                                    name = {input.name}
                                    type = {input.type}
                                    value = {props[input.name]}
                                    validators = {input.validators}
                                    errorMessages = {input.errorMessages}
                                    onChange = {props.handleChange}
                                />
            break
        
        case ('number'):
            dynamicInputField = <TextValidator
                                    id = {input.id}
                                    label = {input.label}
                                    required = {input.required}
                                    style = {input.style}
                                    name = {input.name}
                                    type = {input.type}
                                    value = {props[input.name]}
                                    validators = {input.validators}
                                    errorMessages = {input.errorMessages}
                                    onChange = {props.handleChange}
                                />
            break
        
        case ('price'):
                dynamicInputField = <TextValidator
                                        id = {input.id}
                                        label = {input.label}
                                        required = {input.required}
                                        style = {input.style}
                                        name = {input.name}
                                        type = 'number'
                                        value = {props[input.name]}
                                        validators = {input.validators}
                                        errorMessages = {input.errorMessages}
                                        onChange = {props.handleChange}
                                        InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                                    />
            break
        
        case ('email'):
            dynamicInputField = <TextValidator
                                    id = {input.id}
                                    label = {input.label}
                                    required = {input.required}
                                    style = {input.style}
                                    name = {input.name}
                                    type = {input.type}
                                    value = {props.email}
                                    validators = {input.validators}
                                    errorMessages = {input.errorMessages}
                                    onChange = {props.handleChange}
                                />
            break

        case('select'):
            dynamicInputField = <FormControl >
                                    <InputLabel htmlFor='input-category' style={{top: '-15px'}}>
                                        {props[input.name].length > 1 ? '' : 'Category'}
                                    </InputLabel>
                                    <SelectValidator
                                        value={props[input.name] || ''}
                                        onChange={props.handleChange}
                                        validators={input.validators}
                                        errorMessages={input.errorMessages}
                                        name={input.name}
                                        style={{width: '150px'}}
                                    >
                                        {
                                            input.value.map(option => {
                                                return (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </SelectValidator>
                                </FormControl>
            break
        
        case('multiline'):
            dynamicInputField = <TextField
                                    id={input.id}
                                    label={input.label}
                                    placeholder="Enter menu item description"
                                    name={input.name}
                                    multiline
                                    value = {props[input.name]}
                                    style={input.style}
                                    onChange={props.handleChange}
                                    rows={input.rows}
                                />
            break

        default:
            return null
    }

    return (
        <>
            {dynamicInputField}
        </>
    )
}
export default InputClass