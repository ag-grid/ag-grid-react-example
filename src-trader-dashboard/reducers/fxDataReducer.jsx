export default (state = {fxData: [], fxTopMovers: []}, action) => {
    switch (action.type) {
        case 'FX_DATA_CHANGED':
            return {
                ...state,
                fxData: action.fxData.slice(0),
            };
        case 'FX_TOP_MOVERS_CHANGED':
            return {
                ...state,
                fxTopMovers: action.fxTopMovers.slice(0),
            };
        default:
            return action.state;
    }
};