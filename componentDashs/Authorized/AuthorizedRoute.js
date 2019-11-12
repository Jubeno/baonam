import React from 'react';
import Router, { Redirect } from 'next/router';
import Authorized from './Authorized';

// TODO: umi只会返回render和rest
const AuthorizedRoute = ({ component: Component, render, authority, redirectPath, ...rest }) => (
  <Authorized
    authority={authority}
    noMatch={<Router {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />}
  >
    <Router {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />
  </Authorized>
);

export default AuthorizedRoute;
