export const applicationPath = {
    Home: '/',
    Login: '/login',
    SignUp: '/signup',
    ResetPassword: '/reset-password',
    Unknown: '*',
};

export const allowedPathsWithoutAuthentication: string[] = [
    applicationPath.Home,
    applicationPath.Login,
    applicationPath.SignUp,
    applicationPath.ResetPassword,
    '/reset',
];
