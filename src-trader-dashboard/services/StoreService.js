import {createStore} from "redux";

import fxData from "../reducers/fxData";

class StoreService {
}
StoreService.STORE = createStore(fxData);
export default StoreService;