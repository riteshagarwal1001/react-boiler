import { Action, createSlice, Reducer, PayloadAction } from '@reduxjs/toolkit';
import Axios from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TERequest, TEApi, TERequestOverrideOption } from './interfaces';
import { TERootState } from '../store/store';
import * as _ from 'lodash';
export const formatRequest = (request: TERequest): void => {
    if (_.isNil(request.headers)) {
        request.headers = {};
    }
    if (_.isNil(request.params)) {
        request.params = [];
    }
    if (_.isNil(request.queryParams)) {
        request.queryParams = {};
    }
    if (_.isUndefined(request.requestData)) {
        request.requestData = null;
    }
};

export const setHeaders = (request: TERequest): void => {
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: localStorage.getItem('usertoken')
            ? `Bearer ${localStorage.getItem('usertoken')}`
            : '',
    };
    if (_.isNil(request.headers)) {
        request.headers = headers;
    } else {
        request.headers = _.assign({}, request.headers, headers);
    }
};

export const setParams = (request: TERequest): void => {
    if (_.isNil(request.params) || request.params.length <= 0) return;
    request.url =
        request.url +
        '/' +
        request.params.map((str: string) => encodeURIComponent(str)).join('/');
};

/**
 * @param request self explained request params
 * @param name must be unique for every api
 * S = success response type
 * E = error response type default is null
 */
export const ApiCaller = <S, E = any>(
    name: string,
    request: TERequest,
): {
    reducer: Reducer;
    thunkAction: (
        request?: TERequestOverrideOption,
        successCallback?: (response: any) => void,
    ) => any;
    clear: (request?: TERequestOverrideOption) => any;
} => {
    formatRequest(request);
    const initialState: TEApi<S, E> = {
        ...request,
        requestData: null,
        responseData: null,
        error: null,
        isLoading: false,
    };

    const apiSlice = createSlice({
        name,
        initialState,
        reducers: {
            requested(state, action: PayloadAction<TERequest | null>): void {
                if (action.payload) {
                    _.assign(state, action.payload);
                }
                state.isLoading = true;
                state.responseData = null;
                state.error = null;
            },
            success(state, action): void {
                state.isLoading = false;
                state.responseData = action.payload;
                state.error = null;
            },
            error(state, action): void {
                state.isLoading = false;
                state.responseData = null;
                state.error = action.payload;
            },
            clear(state, action): void {
                state.isLoading = false;
                state.responseData = null;
                state.error = null;
            },
        },
    });

    const { error, requested, success, clear } = apiSlice.actions;
    const upperScopeRequest = request;

    function thunkAction(
        requestParams?: TERequestOverrideOption,
        successCallback?: (response: any) => void,
    ): ThunkAction<Promise<any>, TERootState, unknown, Action<string>> {
        return async (
            dispatch: ThunkDispatch<TERootState, unknown, Action<string>>,
        ): Promise<any> => {
            if (_.isNil(requestParams)) {
                requestParams = {};
            }
            const currentRequest = _.assign(
                {},
                upperScopeRequest,
                requestParams,
            );
            formatRequest(currentRequest);
            dispatch(requested(currentRequest));
            setHeaders(currentRequest);
            setParams(currentRequest);
            return Axios({
                method: currentRequest.type,
                url: currentRequest.url,
                data:
                    currentRequest.type !== 'get'
                        ? currentRequest.requestData
                        : {},
                params: currentRequest.queryParams,
                headers: currentRequest.headers,
            })
                .then(axiosResponse => {
                    successCallback && successCallback(axiosResponse.data);
                    return dispatch(success(axiosResponse.data));
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
                    return dispatch(error(JSON.stringify(err)));
                });
        };
    }

    return {
        reducer: apiSlice.reducer,
        thunkAction,
        clear,
    };
};
