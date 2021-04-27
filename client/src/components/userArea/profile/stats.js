import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserStats } from '../../../store/actions'
import { Card, CardGroup, Alert } from 'react-bootstrap'


const Stats = (props) => {
    const user = useSelector( state => state.user )
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserStats(user.auth._id))
    }, [dispatch, user.auth._id])

    return (
        <>
            { user.stats ? 
                <>
                    <h3>Your Stats</h3>
                    <CardGroup>
                        <Card border="primary">
                            <Card.Title>Categories created by you</Card.Title>
                            { user.stats.categories.length === 0 ? 
                                "Sorry you do not have categories"
                                :
                                    user.stats.categories.map((item, idx) => (
                                        <Alert key={idx} variant="primary">
                                            {item.name}
                                        </Alert>
                                    ))
                            }
                        </Card>

                        <Card border="info">
                            <Card.Title>Last created posts: </Card.Title>
                            { user.stats.categories.length === 0 ? 
                                "Sorry you do not have categories"
                                :
                                    user.stats.posts.map((item, idx) => (
                                        <Alert key={idx} variant="info">
                                            {item.title}
                                        </Alert>
                                    ))
                            }
                        </Card>
                    </CardGroup>
                </>
                :
                null
            }
        </>
    )
}

export default Stats