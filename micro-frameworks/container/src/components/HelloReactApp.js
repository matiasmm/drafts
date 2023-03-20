import { mount } from 'helloReact/HelloReactApp'
import { Header } from 'fe1/header'
import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom';


export default () => {
    console.log(Header)
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const {onParentNavigate} = mount(ref.current)
        history.listen(onParentNavigate)
    }, [])

    return <div>
        <Header />
        <div ref={ref} />
    </div>
}