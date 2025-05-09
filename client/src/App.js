import React from "react";
import { Container} from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom/cjs/react-router-dom.min.js";
import Navbar from './components/Navbar/Navbar.js'
import Home from './components/Home/Home.js'
import Auth from './components/Auth/Auth.js'
import PostDetails from "./components/PostDetails/PostDetails.jsx";

const App =() =>{
    const user = JSON.parse(localStorage.getItem('profile'));


    return (
        <BrowserRouter>
            <Container maxWidth='xl'>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={() => <Redirect to='/posts' />}/>
                    <Route path='/posts' exact component={Home} />
                    <Route path='/posts/search' exact component={Home} />   // added for search query.
                    <Route path='/posts/:id' component={PostDetails}/>
                    <Route path='/auth' exact component={() => (!user) ? <Auth /> : <Redirect to='/posts' /> }/>
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App;