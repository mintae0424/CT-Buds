import { SET_CURRENT_RESTAURANT, ADD_CATEGORY, SET_CATEGORIES, ADD_MENU_ITEM } from '../actionTypes'

const initialState = {
    info: {
        address: {
            street: '',
            city: '',
            state: '',
            zip: ''
        },
        timeInfo: {
            breakfast: {
                closed: false,
                start: '06:00',
                end: '10:00'
            },
            lunch: {
                closed: false,
                start: '11:00',
                end: '15:00'
            },
            dinner: {
                closed: false,
                start: '17:00',
                end: '23:00'
            }
        },
        name: '',
        email: '',
        menu_categories: [],
        menu_ids: [],
        _id: '',
    },
}

export default function currentRestaurantReducer(currentRestaurantState = initialState, {payload, type}){
    switch(type){
        case SET_CURRENT_RESTAURANT:
            return {
                ...currentRestaurantState,
                info: payload.restaurant,
            }
        
        case ADD_CATEGORY:
            
            return {
                ...currentRestaurantState,
                info: {
                    ...currentRestaurantState.info,
                    menu_categories: payload
                }
            }

        case SET_CATEGORIES:
            return {
                ...currentRestaurantState,
                info: {
                    ...currentRestaurantState.info,
                    menu_categories: payload
                }
            }

        case ADD_MENU_ITEM:
            return {
                ...currentRestaurantState,
                info: {
                    ...currentRestaurantState.info,
                    menu_ids: payload
                }
            }

        default:
            return currentRestaurantState
    }
}