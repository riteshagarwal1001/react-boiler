import Axios from 'axios';
import { formatRequest, setHeaders, setParams } from '../../middlewares/api';
import { TERequest } from '../../middlewares/interfaces';

export const axiosRequestCall = (currentRequest: TERequest) => {
    formatRequest(currentRequest);
    setHeaders(currentRequest);
    setParams(currentRequest);
    const response = {
        isLoading: false,
        responseData: null,
        error: null,
    };
    return Axios({
        method: currentRequest.type,
        url: currentRequest.url,
        data: currentRequest.type !== 'get' ? currentRequest.requestData : {},
        params: currentRequest.queryParams,
        headers: currentRequest.headers,
    })
        .then(axiosResponse => {
            response.responseData = axiosResponse.data;
            return response;
        })
        .catch(err => {
            if (
                err &&
                err.response &&
                err.response.data &&
                err.response.data.message === 'No access For resource'
            ) {
                localStorage.clear();
                window.location.reload();
            }
            response.error = JSON.stringify(err);
            return response;
        });
};
