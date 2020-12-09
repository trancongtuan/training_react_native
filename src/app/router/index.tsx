import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from '../view/home/home'
import New from '../view/news/news'

const Routes = () => (
    <Router>
        <Scene key="root">
            <Scene key="home" component={Home} title="TMDB" initial={true} />
            <Scene key="news" component={New} title="News" />
        </Scene>
    </Router>
)
export default Routes