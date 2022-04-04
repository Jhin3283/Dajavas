<<<<<<< HEAD
import { updateFish } from '../../actions'
import { TARGET_FIND, UPDATE_FISH } from '../../actions/actionTypes'
=======
import { TARGET_FIND} from '../../actions/actionTypes'
>>>>>>> 802cf51347c59628a478503963b978a8e98bf478

const initialState = {

    data: null
   
}

const updateFishReducer = (state=initialState, action) => {
    switch(action.type) {
        case TARGET_FIND:
            return {
                ...state,
                data: action.payload
            }
<<<<<<< HEAD
        default: return state  
=======
        default: return state   
>>>>>>> 802cf51347c59628a478503963b978a8e98bf478
    }
}
export default updateFishReducer