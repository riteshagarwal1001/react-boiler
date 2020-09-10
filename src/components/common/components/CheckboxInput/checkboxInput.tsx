import * as React from 'react';

const CheckboxInput = (props: {
    data: any;
    name: any;
    checked: boolean;
    value?: string | number;
    onChange?: (e: any) => void;
    disabled?: boolean;
}) => {
    return (
        <div className="d-flex align-items-center">
            <div className="position-relative">
                <input
                    className="position-absolute"
                    type="checkbox"
                    onChange={props.onChange}
                    value={props.value}
                    checked={props.checked}
                    name={props.name}
                    disabled={props.disabled}
                />{' '}
                <span></span>
            </div>
            {props.data}
        </div>
    );
};

export default CheckboxInput;
