import * as React from 'react';
import { Button } from 'reactstrap';

const Tbutton = (props: {
    color: any;
    data: any;
    onClick?: () => any;
    disabled?: boolean;
}) => {
    return (
        <Button
            outline
            color={props.color}
            className=" px-4 py-2 m-2"
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.data}
        </Button>
    );
};

export default Tbutton;
