import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Layout from './Layout';
import Badges from '../pages/Badges';
import BadgeNew from '../pages/BadgeNew';
import BadgeEdit from '../pages/BadgeEdit';
import BadgeDetailContainer from '../pages/BadgeDetailContainer'
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';

function App(){
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/badges" component={Badges}/>
                    <Route exact path="/badges/new" component={BadgeNew}/>
                    <Route exact path="/badges/:badge_id" component={BadgeDetailContainer}/>
                    <Route exact path="/badges/:badge_id/edit" component={BadgeEdit}/>
                    <Route component={NotFound}></Route>
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;