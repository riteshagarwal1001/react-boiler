import { Action } from '../../../common';

export const LOADER_START = 'LOADER_START';
export const LOADER_STOP = 'LOADER_STOP';

export interface LoaderActionsInterface {
    startLoaderAction?: Function;
    stopLoaderAction?: Function;
}

function startLoader(message: string): Action {
    const data: Action = {
        type: LOADER_START,
        response: message,
    };
    return data;
}

function stopLoader() {
    const data: Action = {
        type: LOADER_STOP,
        response: null as any,
    };
    return data;
}

export function startLoaderAction(message: string): Function {
    return function(dispatch: any, getState: Function) {
        return dispatch(startLoader(message));
    };
}

export function stopLoaderAction(): Function {
    return function(dispatch: any, getState: Function) {
        return dispatch(stopLoader());
    };
}
