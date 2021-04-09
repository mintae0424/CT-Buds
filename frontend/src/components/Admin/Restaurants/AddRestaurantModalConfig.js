export const basicInfoFormArray = [
    {
        input: {
            type: 'text',
            name: 'name',
            id: 'input-name',
            label: 'Restaurant Name',
            style: {
                width: '250px',
                marginTop: '10px'
            },
            validators: ['required'],
            errorMessages: ['this field is required']
        }
    },
    {
        input: {
            type: 'text',
            name: 'street',
            id: 'input-street',
            label: 'Street Address',
            style: {
                width: '250px',
                marginTop: '10px'
            },
            validators: ['required'],
            errorMessages: ['this field is required']
        }
    },
    {
        input: {
            type: 'text',
            name: 'city',
            id: 'input-city',
            label: 'City',
            style: {
                width: '250px',
                marginTop: '10px'
            },
            validators: ['required'],
            errorMessages: ['this field is required']
        }
    },
    {
        input: {
            type: 'text',
            name: 'state',
            id: 'input-state',
            label: 'State',
            style: {
                width: '250px',
                marginTop: '10px'
            },
            validators: ['required'],
            errorMessages: ['this field is required']
        }
    },
    {
        input: {
            type: 'number',
            name: 'zip',
            id: 'input-zip',
            label: 'Zip Code',
            style: {
                width: '250px',
                marginTop: '10px'
            },
            validators: ['required'],
            errorMessages: ['this field is required']
        }
    },
    {
        input: {
            type: 'email',
            name: 'email',
            id: 'input-email',
            label: 'Email',
            style: {
                width: '250px',
                marginTop: '10px'
            },
            validators: ['required', 'isEmail'],
            errorMessages: ['this field is required', 'email is not valid']
        }
    },
]

export const timeInfoFormArray = [
    {
        key: 'input-breakfastTimes',
        name: 'Breakfast',
        start: {
            type: 'time',
            name: 'start',
            label: 'Breakfast Start',
            id: 'breakfast',
            disabled: true,
            defaultValue: '06:00',
            style: {
                width: '110px',
                marginTop: '15px'
            }
        },
        end: {
            type: 'time',
            name: 'end',
            label: 'Breakfast End',
            id: 'breakfast',
            defaultValue: '10:00',
            style: {
                width: '110px',
                marginTop: '15px'
            }
        }
    },
    {
        key: 'input-lunchTimes',
        name: 'Lunch',
        start: {
            type: 'time',
            id: 'lunch',
            name: 'start',
            label: 'Lunch Start',
            defaultValue: '11:00',
            style: {
                width: '110px',
                marginTop: '15px'
            }
        },
        end: {
            type: 'time',
            id: 'lunch',
            name: 'end',
            label: 'Lunch End',
            defaultValue: '15:00',
            style: {
                width: '110px',
                marginTop: '15px'
            }
        }
    },
    {
        key: 'input-dinnerTimes',
        name: 'Dinner',
        start: {
            type: 'time',
            id: 'dinner',
            name: 'start',
            label: 'Dinner Start',
            defaultValue: '17:00',
            style: {
                width: '110px',
                marginTop: '15px'
            }
        },
        end: {
            type: 'time',
            id: 'dinner',
            name: 'end',
            label: 'Dinner End',
            defaultValue: '23:00',
            style: {
                width: '110px',
                marginTop: '15px'
            }
        },
    }
]
