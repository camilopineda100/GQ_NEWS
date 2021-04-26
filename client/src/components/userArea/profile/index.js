import React from 'react'
import UserAreaHOC from '../../hoc/userAreaHoc'
import EmailPass from './emailPass'

const Profile = (props) => {
    return (
        <UserAreaHOC>
            <div className="mt-3">
                <EmailPass {...props}/>
            </div>
        </UserAreaHOC>
    )
}

export default Profile