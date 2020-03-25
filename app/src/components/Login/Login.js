import { Button, Card, CardContent, FormControl, FormGroup, FormHelperText, Input, InputLabel, Typography } from '@material-ui/core';
import { Redirect } from '@reach/router';
import axios from 'axios';
import React, { useContext } from 'react';
import { RootContext } from '../context/RootContext';
import config from './../../config';
import './Login.css';

const Login = () => {
    var [email, setEmail] = React.useState('');
    var [password, setPassword] = React.useState('');
    var [error, setError] = React.useState('');
    const { authData, setAuthData } = useContext(RootContext);

    const onSubmit = () => {
        axios
            .post(config.serverUrl + "/user/login", { email, password })
            .then(res => {
                alert(res.data.message);
                setError("");
                setAuthData(res.data.authData)
            })
            .catch(err => {
                console.log(err);
                setError("There is no user with specified email address!");
            });
    };

    var isButtonDisabled = () => {
        return hasPasswordError() || hasEmailError()
    }

    var hasEmailError = () => {
        var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        return !regex.test(email) ? true : false;
    }
    var hasPasswordError = () => {
        var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/i
        return !regex.test(password) ? true : false;
    }

    return (
        authData == null ?
            <div className='d-flex justify-content-center align-items-center mainBlock'>
                <div className='col-md-3'>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Sign in
                        </Typography>
                            <FormGroup>
                                <FormControl color="primary" required>
                                    <InputLabel htmlFor="tb-email">Email address</InputLabel>
                                    <Input
                                        id="tb-email"
                                        name="tb-email"
                                        aria-describedby="tb-email-helper-text"
                                        error={hasEmailError()}
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <FormHelperText id="tb-email-helper-text">We'll never share your email.</FormHelperText>
                                </FormControl>
                                <br />
                                <FormControl color="primary" required>
                                    <InputLabel htmlFor="tb-password">Password</InputLabel>
                                    <Input
                                        id="tb-password"
                                        aria-describedby="tb-password-helper-text"
                                        error={hasPasswordError()}
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)} />
                                    <FormHelperText id="tb-password-helper-text">Or your super secret password.</FormHelperText>
                                </FormControl>
                                <br />
                                <FormControl color="primary">
                                    <Button variant="contained" color="primary" size="small"
                                        onClick={onSubmit}
                                        disabled={isButtonDisabled()}
                                    >
                                        Login
                                </Button>
                                </FormControl>
                                <br />
                                <FormHelperText error>{error}</FormHelperText>
                            </FormGroup>
                        </CardContent>
                    </Card>
                </div>
            </div>
            :
            <Redirect
                from="login"
                to="home"
                noThrow
            />
    );
};

export default Login;