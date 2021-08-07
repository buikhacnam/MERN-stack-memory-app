import * as api from '../api'
import { AUTH } from '../constants/actionTypes'

export const signin = (formData, history) => {
    return function (dispatch) {
        try {
            // do stuff
            history.push('/')
        } catch(error) {    
            console.log(error)
        }
    }
}

export const signup = (formData, history) => {
    return function (dispatch) {
        try {
            // do stuff
            history.push('/')
        } catch(error) {    
            console.log(error)
        }
    }
}