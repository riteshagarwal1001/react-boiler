import * as React from 'react';
import { useState } from 'react';
import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

const DropDown = (props: { dropDownLabel: string; dropDownData: any[] }) => {
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);
    const dropDownItems = props.dropDownData.map((data: any, i: number) => (
        <DropdownItem key={i}>{data.value}</DropdownItem>
    ));
    return (
        <ButtonDropdown
            isOpen={dropdownOpen}
            toggle={toggle}
            className="DropDown m-2"
        >
            <DropdownToggle caret color="white">
                {props.dropDownLabel}
            </DropdownToggle>
            <DropdownMenu>{dropDownItems}</DropdownMenu>
        </ButtonDropdown>
    );
};

export default DropDown;
