import * as React from 'react';
import { useState } from 'react';
import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { TEFilterDropdownComponentProps } from '../../../common/interfaces';

const FilterDropdown = (props: TEFilterDropdownComponentProps) => {
    const {
        options,
        handleFilterSelection,
        currentFilter,
        defaultDisplayValue,
        selectedValue,
        isDisabled,
    } = props;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    if (!options || !options.length) {
        return null;
    }
    const toggle = () => setDropdownOpen((prevState: boolean) => !prevState);

    const selectedOption =
        selectedValue &&
        options &&
        options.find(item => item.value === selectedValue);

    return (
        <ButtonDropdown
            isOpen={dropdownOpen}
            toggle={toggle}
            className="DropDown m-2"
        >
            <DropdownToggle caret color="white" disabled={isDisabled}>
                {selectedOption ? selectedOption.label : defaultDisplayValue}
            </DropdownToggle>
            <DropdownMenu>
                {options &&
                    options.map((option, index) => {
                        return (
                            <DropdownItem
                                key={index}
                                onClick={() =>
                                    handleFilterSelection(
                                        option.value,
                                        currentFilter,
                                    )
                                }
                            >
                                {option.label}
                            </DropdownItem>
                        );
                    })}
            </DropdownMenu>
        </ButtonDropdown>
    );
};

export default FilterDropdown;
