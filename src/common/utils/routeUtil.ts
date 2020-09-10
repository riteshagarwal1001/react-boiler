import {
    allowedPathsWithoutAuthentication,
    applicationPath,
} from '../../config/routePath';

export const isAuthenticated = () => {
    return localStorage.getItem('loginSuccess') === 'true';
};

export const isLoginPage = () => {
    return window.location.pathname.toLowerCase() === applicationPath.Login;
};

export const isHomePage = () => {
    return window.location.pathname.toLowerCase() === applicationPath.Home;
};

export const allowedToAccessWithoutLogin = () => {
    return allowedPathsWithoutAuthentication.includes(
        window.location.pathname.toLowerCase(),
    );
};

export const isRedirectToLoginRequired = () => {
    return (
        //!isAuthenticated() && !isLoginPage() && !allowedToAccessWithoutLogin()
        false
    );
};

export const isRedirectRequired = () => {
    return false;
};

export const getRedirectLandingPage = () => {
    return null;
};
