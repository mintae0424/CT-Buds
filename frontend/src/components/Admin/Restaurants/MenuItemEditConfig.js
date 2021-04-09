export const formArray = [
    {
        input: {
            type: 'text',
            name: 'name',
            id: 'input-name',
            label: 'Item Name',
            style: {
                width: '90%',
                margin: '10px 10px 0px',
            },
            validators: ['required'],
            errorMessages: ['this field is required']
        }
    },
    {
        input: {
            type: 'price',
            name: 'price',
            id: 'input-price',
            label: 'Price',
            style: {
                width: '90%',
                margin: '10px 10px 0px'
            },
            validators: ['required'],
            errorMessages: ['this field is required']
        }
    },
    {
        input: {
            type: 'multiline',
            name: 'description',
            id: 'input-description',
            label: 'Description',
            style: {
                width: '90%',
                margin: '10px 10px 0px'
            },
            rows: 3,
            validators: ['required'],
            errorMessages: ['this field is required']
        }
    },
]