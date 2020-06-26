import React from 'react'
import { HashRouter, Route } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

export default function Routes(){
    return(
        <HashRouter>
                <Route>
                    <Route path={'/'} exact component={Login} />
                    <Route path={'/dashboard'} component={Dashboard} />
                </Route>
        </HashRouter>
    )
}