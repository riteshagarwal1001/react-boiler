import * as React from 'react';
import { ReactElement } from 'react';
import { withRouter } from 'react-router';

function TestComponent(props: any): ReactElement {
    return <span>Hello World!</span>;
}
export default withRouter(TestComponent);
