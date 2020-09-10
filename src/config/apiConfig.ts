export interface ApiConfigInterface {
    protocol: string;
    host: string;
    dataApiUrl: string;
    authUrl: string;
}

export const apiConfig: ApiConfigInterface = {
    protocol: 'http',
    host: 'localhost:9912',
    dataApiUrl: '',
    authUrl: 'auth/',
};
