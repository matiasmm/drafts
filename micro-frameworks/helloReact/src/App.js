// helloReact/src/App.js
import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'

const helloWorld = () => (<div>Hello World!</div>)
const helloReact = () => (<div>Hello React!</div>)

export default ({ history }) => {
    return <div>
        <Router history={history}>
            <Switch>
                <Route path="/react" component={helloReact} />
                <Route path="/" component={helloWorld} />
            </Switch>
        </Router>
    </div>
}
