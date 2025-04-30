import React, {useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField, emphasize } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';

import useStyles from './styles'
import Input from './Input.js'
import Icon from './Icon.js'

const initialState = {
    firstName : '',
    lastName : '',
    email : '',
    password : '',
    confirmPassword : ''
}
const Auth = () => {
    // const state = null;
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const classes = useStyles();
    const history = useHistory();

    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => 
        !prevShowPassword
    );

    const handleSubmit= (e) => {
        e.preventDefault();
        console.log(formData);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value})
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        handleShowPassword(false);
    }


    // current Implementation of the googleSuccess function is designed for the old Google API (react-google-login package)
    // const googleSuccess = async(credentialResponse) => {
    //     // console.log("Google Login Success:", credentialResponse);

    //     const result = credentialResponse?.profileObj;
    //     const token = credentialResponse?.tokenId;

    //     try{
    //         dispatch({ type: 'AUTH', data: {result, token} });
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
    // };

    const googleSuccess = async(credentialResponse) => {
        try {
            const token = credentialResponse?.credential;
            const decoded = jwt_decode(token);

            const result = {
                name: decoded.name,
                email: decoded.email,
                googleId: decoded.sub,
                picture: decoded.picture
            };
            dispatch({ type: 'AUTH', data: { result, token } });

            history.push('/');

        } catch (error) {
            console.log("Google Login Error:", error);
        }
    }


    const googleFailure = (error) => {
        console.log("Google Login Failed:", error);
    };


  return (
    <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>

            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name='firstName' label='FirstName' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='LastName' handleChange={handleChange} autoFocus half />
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                    {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                </Grid>
                
                <Grid item xs={12}>
                    <GoogleLogin
                        onSuccess={googleSuccess}
                        onError={googleFailure}
                    />
                </Grid>

                <Button type="submit" fullWidth variant="contained" color='primary' className={classes.submit}>
                    {isSignup ? "Sign UP" : "Sign In"}
                </Button>

                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? "Already have account? SignIn" : "Don't have an account? SignUP"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth