const formArray = [
    {
        input: {
            type: 'select',
            name: 'category',
            id: 'preference-categories',
            label: 'Category',
            value: ['Allergy', 'Diet', 'Cuisine'],
            style: {
                width: '250px',
            },
            validators: ['required'],
            errorMessages: ['this field is required']
        }
    },
    {
        input: {
            type: 'text',
            name: 'preference',
            id: 'preference-input',
            label: 'Preference',
            style: {
                width: '250px',
                marginTop: '15px'
            },
            validators: ['required', 'isPreferenceNotDuplicate'],
            errorMessages: ['this field is required', 'this preference already exits']
        }
    }
]

export default formArray