import {
    LOG_IN,
    LOG_OUT,
    UPDATE_INFO,
    CONFIRM_MODAL_ON,
    MODAL_OFF,
<<<<<<< HEAD
    FISH_BOARD, 
=======

>>>>>>> 802cf51347c59628a478503963b978a8e98bf478
    FISH_BOARD_REQUEST, 
    FISH_BOARD_SUCCESS,
    FISH_BOARD_FAILURE,
    TARGET_FIND,
    UPDATE_FISH,
    SIDE_BAR_ON,
    SIDE_BAR_OFF,
} from './actionTypes';
import axios from 'axios';

export const loginAction = (data) => ({
    type: LOG_IN,
    payload: {...data},
});

export const logoutAction = {
    type: LOG_OUT,
};

export const updateInfoAction = (data) => ({
    type: UPDATE_INFO,
    payload: {
        ...data,
    }
});

export const confirmModalOnAction = {
    type: CONFIRM_MODAL_ON,
};

export const modalOffAction = {
    type: MODAL_OFF,
}


// FishBoard 
export const fishBoardRequestAction = () => {
    return {
        type: FISH_BOARD_REQUEST,
    }
}

export const fishBoardSuccessAction = (data) => {
    return {
        type: FISH_BOARD_SUCCESS,
        payload: data
    }
}

export const fishBoardFailureAction = (error) => {
    return {
        type: FISH_BOARD_FAILURE,
        payload: error
    }
}

//*thunk를 사용하면 action에서 dispatch를 인자로 갖는 함수를 만들 수 있다. 
// action에서 직접 외부api요청을 보낼 수 있다. 
// export const fishBoard = () => {
//     return (dispatch) => {
//         dispatch(fishBoardRequestAction())
//         fetch('https://jsonplaceholder.typicode.com/comments')
//         .then(result => result.json())
//         .then(data => dispatch(fishBoardSuccessAction(data)))
//         .catch(error => dispatch(fishBoardFailureAction(error)))
//     } 
// }
export const fishBoard = (email, page, token) => {
    return (dispatch) => {
        dispatch(fishBoardRequestAction())
<<<<<<< HEAD
        axios.get(`https://localhost:5000/fish/board?email=${email}&page=${page}`,{
=======
        axios.get(`${process.env.REACT_APP_BASE_URL}/fish/board?email=${email}&page=${page}`,{
>>>>>>> 802cf51347c59628a478503963b978a8e98bf478
            headers :{ authorizationtoken: token}
        })
        .then(data => dispatch(fishBoardSuccessAction(data.data)))
        .catch(error => dispatch(fishBoardFailureAction(error)))
    } 
}




// UpdateFish
export const targetFind = (fish) => {
    return {
        type: TARGET_FIND,
        payload: fish
    }
}

export const updateFish = () => {
    return {
        type: UPDATE_FISH
    }
}

export const sideBarOn = {
    type: SIDE_BAR_ON,
}

export const sideBarOff = {
    type: SIDE_BAR_OFF,
}
