import { forwardRef, useRef } from "react"

const RefForwardingComponent = () => {
    const ref= useRef<HTMLHeadingElement>(null);
    const clickHandler = () => {
        if(ref.current) {
            ref.current.style.color = 'red'
        }
    }
    return(
        <>
            <h1>Ref Forwarding!!!</h1> 
            <button onClick={clickHandler}>Change Child Component Color</button>
            <ChildComponent ref={ref} />
            <ChildComponent>Another Instance</ChildComponent>
        </>
       
    )
}

interface IProp {
    children?: React.ReactNode
}

export const ChildComponent = forwardRef<HTMLHeadingElement, IProp>((props, ref) => {
    console.log(ref);
    return(
        <>
            <h1 ref={ref}>Child Component !!</h1>
            <div>{props.children}</div>
        </>
        
    )
})

export default RefForwardingComponent;

// Using forward ref concept you can control the DOM node which is not the part of current react component where ref is defined.