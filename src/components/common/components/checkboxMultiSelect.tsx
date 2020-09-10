import * as React from 'react';
import { useState, useRef } from 'react';
import MultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { OptionsType, ValueType } from 'react-select/src/types';

interface Option {
    label: string;
    value: string | number;
}

interface MultiSelectProps {
    options: OptionsType<Option>;
    name?: string;
    handleFilterSelection: (val, field) => void;
    currentFilter: any;
    defaultDisplayValue: string;
    selectedValue: any;
}
const selectAllValue = 'selectAll';
const selectAllOption = { label: 'Select All', value: selectAllValue };
const CheckboxMultiSelect = (props: MultiSelectProps) => {
    const {
        options,
        defaultDisplayValue,
        name,
        currentFilter,
        handleFilterSelection,
        selectedValue,
    } = props;
    const defaultSelectedValues = React.useMemo(
        () => options.map((item: Option) => item.value),
        [options],
    );
    const [selectedValues, setSelectedValues] = React.useState(
        selectedValue || [],
    );
    const [selectAllChecked, setSelectAll] = React.useState(false);

    React.useEffect(() => {
        setSelectedValues(selectedValue || []);
    }, [selectedValue]);

    const onChange = (option: ValueType<Option | Option[]>) => {
        if (!option) option = [];
        let val = (option as Option[]).map((item: Option) => item.value);
        const relValues = val.filter(item => item !== selectAllValue);
        const allSelected = options.every(item =>
            relValues.includes(item.value),
        );

        if (selectAllChecked && allSelected) {
            setSelectAll(false);
            val = [];
        } else if (
            allSelected ||
            (val.includes(selectAllValue) && !selectAllChecked)
        ) {
            setSelectAll(true);
            val = defaultSelectedValues;
        } else {
            setSelectAll(false);
            val = relValues;
        }
        setSelectedValues([...val]);
    };

    const currentvalues = React.useMemo(() => {
        if (options) {
            const selvalues = options.filter(
                (option: Option) => selectedValues.indexOf(option.value) >= 0,
            );
            if (selectAllChecked) selvalues.unshift(selectAllOption);
            return selvalues;
        } else {
            return [];
        }
    }, [selectedValues, options, selectAllChecked]);
    const targetRef = useRef(null);
    const [open, setIsOpen] = useState('');

    const isOpen = e => {
        if (open === 'open') {
            if (targetRef.current.childNodes[0].childNodes[2] === e.target) {
                setIsOpen('');
            }
        } else {
            setIsOpen('open');
        }
    };

    const onApplyFilter = () => {
        const filterVal =
            !selectedValues.length || selectAllChecked ? '' : selectedValues;
        handleFilterSelection(filterVal, currentFilter);
    };

    const newOptions = [selectAllOption, ...options];

    // const getDropdownButtonLabel = ({ placeholderButtonLabel, value }) => {
    //     if (
    //         !Array.isArray(value) ||
    //         (Array.isArray(value) && value.length === 0)
    //     ) {
    //         return placeholderButtonLabel;
    //     }
    //     return `${value.length} ${placeholderButtonLabel} selected`;
    // };

    return (
        <>
            {name && <div className="title">{name}</div>}
            <div
                className={'d-flex multi-select-wrap ' + open}
                onClick={e => isOpen(e)}
                ref={targetRef}
            >
                <MultiSelectCheckboxes
                    name={name}
                    value={currentvalues}
                    onChange={onChange}
                    placeholderButtonLabel={defaultDisplayValue}
                    // getDropdownButtonLabel={getDropdownButtonLabel}
                    placeholder={'Search'}
                    options={newOptions}
                    onBlur={onApplyFilter}
                />
            </div>
        </>
    );
};

export default CheckboxMultiSelect;
