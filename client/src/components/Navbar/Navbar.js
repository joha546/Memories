import React, {useState, useEffect} from 'react'
import {AppBar, Avatar, Toolbar, Typography, Button} from '@material-ui/core'
import {Link, useHistory, useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import useStyles from './styles.js'
import memories from '../../images/memories.jpeg';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT'});

        history.push('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        // JWT...
        if (token) {
            const decodedToken = decode(token);
      
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div>
                <Typography component={Link} to='/' className = {classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </div>

            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sign in</Button>
                )}
            </Toolbar>
        </AppBar> 
    );
};

export default Navbar;