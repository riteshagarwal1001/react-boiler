import * as React from 'react';
import { useState } from 'react';
import { hamburger, close } from '../svgIconList';

const Header = (props: {}) => {
    const [State, setState] = useState(hamburger);

    const toggleSideMenu = (e: any) => {
        if (State === hamburger) {
            setState(close);
            document.querySelector('.sidemenu-wrapper').classList.add('expand');
        } else {
            setState(hamburger);
            document
                .querySelector('.sidemenu-wrapper')
                .classList.remove('expand');
        }
    };
    return (
        <header className="d-flex align-items-center position-relative bg-white position-fixed w-100">
            <div
                className="hamburger p-3 border-right border-secondary"
                onClick={(e: any) => {
                    toggleSideMenu(e);
                }}
            >
                {State}
            </div>
            <div className="logo py-2 px-4">
                <img
                    alt="interlinkages"
                    src={require('../../../../assets/images/logo.svg')}
                />
            </div>
            <div className="notification-icon d-flex align-items-center p-3 ">
                <img
                    alt="interlinkages"
                    src={require('../../../../assets/images/notification.svg')}
                />
                {/* <div className="ml-2">
                    <LogoutComponent />
                </div> */}
            </div>
        </header>
    );
};

export default Header;
