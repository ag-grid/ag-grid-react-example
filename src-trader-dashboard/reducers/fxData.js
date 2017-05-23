export default (state = {fxData: []}, action) => {
    switch (action.type) {
        case 'FX_DATA_CHANGED':
            return {
                fxData: action.fxData.slice(0)
            };
        default:
            return state;
    }
};