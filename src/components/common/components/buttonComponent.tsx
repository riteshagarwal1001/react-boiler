import * as React from 'react';
import { Button } from 'reactstrap';
import { Download } from './svgIconList';

export interface TEButtonComponent {
    onClick: () => void;
    name: string;
    isDownload?: boolean;
    disabled?: boolean;
}

const ButtonComponent = (props: TEButtonComponent) => {
    const { onClick, name, isDownload, disabled } = props;

    return (
        <>
            {isDownload && (
                <Button onClick={onClick} className="actionBtn download-btn">
                    <div className="d-flex align-items-center">
                        <div className="mr-2">{Download}</div>
                        <div className="mt-1">{name}</div>
                    </div>
                </Button>
            )}
            {!isDownload && (
                <Button
                    onClick={onClick}
                    className="actionBtn"
                    disabled={disabled}
                >
                    <div>
                        <span>{name}</span>
                    </div>
                </Button>
            )}
        </>
    );
};
export default ButtonComponent;
