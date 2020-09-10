import * as React from 'react';
import { withRouter, Link } from 'react-router-dom';

import './notFound.scss';

class ErrorNotFound extends React.Component<any> {
    render() {
        return (
            <div className="not-found-container">
                <div className="not-found-number-404">404</div>
                <h1 className="not-found-title">
                    Oops! This page can’t be found.
                </h1>
                <p className="not-found-desc">
                    It looks like nothing was found at this location. You can go
                    back to home and try other links.
                </p>
                <Link to={'/'} className="custom-link">
                    Return to home
                </Link>
            </div>
        );
    }
}

export default withRouter(ErrorNotFound);
