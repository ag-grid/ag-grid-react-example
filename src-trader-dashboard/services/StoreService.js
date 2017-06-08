import {createStore} from "redux";

import fxData from "../reducers/fxDataReducer.jsx";

class StoreService {
}
StoreService.STORE = createStore(fxData);
export default StoreService;