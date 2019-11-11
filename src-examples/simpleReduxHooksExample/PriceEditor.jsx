import React, {useEffect, forwardRef, useImperativeHandle, useRef} from "react";

export default forwardRef((props, ref) => {
    const inputRef = useRef();
    useImperativeHandle(ref, () => {
        return {
            getValue: () => {
                return inputRef.current.value;
            }
        };
    });

    useEffect(() => {
        // https://github.com/facebook/react/issues/7835#issuecomment-395504863
        setTimeout(() => inputRef.current.focus(), 10)
    }, []);
    return <input type="text" ref={inputRef} defaultValue={props.value}/>;
})
