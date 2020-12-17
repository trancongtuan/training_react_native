import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from '../view/home/home'
import New from '../view/news/news'
import TabBar from '../common/components/TabBar'

const Routes = () => (
    <Router>
        <Scene key="root">
            <Scene key="home" component={TabBar} initial={true} hideNavBar={true}/>
            <Scene key="news" component={New} title="News" hideNavBar={true} />
        </Scene>
    </Router>
)
export default Routes