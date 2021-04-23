import React, { useEffect, useState } from 'react'
import { withRouter} from 'react-router'
import { useDispatch } from 'react-redux'
import { autoSignIn } from '../../store/actions'


const AutoSignIn = (props) => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(autoSignIn()).then(() => {
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        })
    }, [dispatch])

    if(loading) {
        return (
            <div className="main_loader">
                <div className="lds-heart"><div></div></div>
            </div>
        )
    }
    return (
        <>
            {props.children}
        </>
    )
}

export default AutoSignIn