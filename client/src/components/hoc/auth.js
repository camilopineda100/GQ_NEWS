import React, {  useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function(ComposedComponent) {
    const AuthenticationCheck = (props) => {
        const [isAuth, setIsAuth] = useState(false)
        const user = useSelector( state => state.user )

        useEffect(() => {
            if(!user.auth) {
                props.history.push('/')
            } else {
                setTimeout(() => {
                    setIsAuth(true)
                }, 500)
            }
        }, [props, user])

        if( !isAuth ) {
            return (
                <div className="main_loader">
                    <div className="lds-heart"><div></div></div>
                </div>
            )
        } else {
            return (
                <ComposedComponent {...props}/>
            )
        }
    }

    return AuthenticationCheck
}