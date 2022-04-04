import { createStore, applyMiddleware } from "redux";
//import reducers from "./reducers";
import thunk from 'redux-thunk' // 텅크를 사용하는이유: action에서 dispatch를 가능하게해준다.
import logger from 'redux-logger'
import rootReducer from '../store/reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = [logger, thunk]
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))


<<<<<<< HEAD
// /* eslint-disable no-underscore-dangle */
// const store = createStore(
//   reducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // Redux DevTools Extension
//   /* applyMiddleware(...middleware) */
// );
// /* eslint-enable */

=======
>>>>>>> 802cf51347c59628a478503963b978a8e98bf478
export default store;


