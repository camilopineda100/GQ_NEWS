import React, { Component } from 'react'
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'

import Auth from './components/hoc/auth'
import Home from './components/home'
import Header from './components/header'
import UserAccess from './components/userArea/access'
import AutoSignIn from './components/hoc/autoSignIn'
import UserArea from './components/userArea'
import Profile from './components/userArea/profile'
import AdminArticles from './components/userArea/articles/index'
import CreateArticles from './components/userArea/articles/create'


class Routes extends Component {
    render () {
        return (
            <BrowserRouter>
                <AutoSignIn>
                    <ToastContainer />
                    <Header />

                    <Container className="mt-4">
                        <Switch>
                            <Route path="/user_area/profile" component={Auth(Profile)}/>
                            <Route path="/user_area/articles" component={Auth(AdminArticles)}/>
                            <Route path="/user_area/create" component={Auth(CreateArticles)}/>
                            <Route path="/user_area" component={Auth(UserArea)}/>
                            <Route path="/signin" component={UserAccess}/>
                            <Route path="/" component={Home}/>
                        </Switch>
                    </Container>
                </AutoSignIn>
            </BrowserRouter>
        )
    }
}

export default Routes