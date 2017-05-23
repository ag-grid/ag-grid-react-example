import cloneDeep from "lodash/cloneDeep";

export function fxDataUpdated(fxData) {
    return {
        type: 'FX_DATA_CHANGED',
        fxData: cloneDeep(fxData)
    };
}

export function fxTopMoversUpdated(fxTopMovers) {
    return {
        type: 'FX_TOP_MOVERS_CHANGED',
        fxTopMovers: cloneDeep(fxTopMovers)
    };
}

