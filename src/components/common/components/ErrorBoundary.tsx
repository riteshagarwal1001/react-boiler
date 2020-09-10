import * as React from 'react';
import { Link } from 'react-router-dom';

export class ErrorBoundary extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="not-found-container">
                    <h1 className="not-found-title">
                        Oops! Something went wrong.
                    </h1>
                    <p className="not-found-desc">
                        It looks like some unexpected error occured. You can go
                        back to home by clicking below link.
                    </p>
                    <Link to={'/'} className="custom-link">
                        Return to home
                    </Link>
                </div>
            );
        }

        return this.props.children;
    }
}
