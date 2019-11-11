import React, {forwardRef, useImperativeHandle, useRef} from "react";

export default forwardRef((props, ref) => {
    const inputRef = useRef();
    useImperativeHandle(ref, () => {
        return {
            isFilterActive() {
                return inputRef.current.value !== '';
            },

            doesFilterPass: (params) => {
                return params.data.price.toString() === inputRef.current.value;
            }
        };
    });

    return <input type="text" ref={inputRef} onChange={() => props.filterChangedCallback()}/>;
})
