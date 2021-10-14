import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
    const {loggedInUser} = useSelector(state=>state.loggedIn)

    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedInUser.status === true && loggedInUser?.email !== '' ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;