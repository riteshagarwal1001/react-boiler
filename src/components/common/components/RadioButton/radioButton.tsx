import * as React from 'react';
import { Input } from 'reactstrap';

const RadioButton = (props: {
    data: any;
    name: any;
    checked: boolean;
    value: string | number;
    onChange?: (e: any) => void;
    disabled?: boolean;
}) => {
    return (
        <div
            className={
                props.checked
                    ? 'radio-button d-flex align-items-center selected'
                    : 'radio-button d-flex align-items-center'
            }
        >
            <div className="position-relative mr-2">
                <Input
                    type="radio"
                    className="m-auto"
                    onChange={props.onChange}
                    value={props.value}
                    checked={props.checked}
                    name={props.name}
                    disabled={props.disabled}
                />{' '}
                <label></label>
            </div>
            {props.data}
        </div>
    );
};

export default RadioButton;
