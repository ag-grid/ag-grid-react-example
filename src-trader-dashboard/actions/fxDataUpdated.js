import cloneDeep from "lodash/cloneDeep";

export default function fxDataUpdatedAction(fxData) {
    return {
        type: 'FX_DATA_CHANGED',
        fxData: cloneDeep(fxData)
    };
}

