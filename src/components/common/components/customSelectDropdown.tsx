import * as React from 'react';
import Select from 'react-select';
import { OptionsType, ValueType } from 'react-select/src/types';

interface Option {
    label: string;
    value: string | number;
}

interface CustomSelectProps {
    options: OptionsType<Option>;
    name: string;
    isMulti: boolean;
    handleFilterSelection: (val, field) => void;
    currentFilter: any;
    defaultDisplayValue: string;
    selectedValue: any;
    showNameAsLabel?: boolean;
    disabled?: boolean;
}

const CustomSelectDropdown = (props: CustomSelectProps) => {
    const {
        options,
        isMulti,
        defaultDisplayValue,
        name,
        currentFilter,
        handleFilterSelection,
        selectedValue,
        showNameAsLabel,
        disabled,
    } = props;

    const onChange = (option: ValueType<Option | Option[]>) => {
        let val;
        if (isMulti) {
            if (!option) option = [];
            val = (option as Option[]).map((item: Option) => item.value) as any;
            if (!val.length) val = '';
        } else {
            val = option ? (option as Option).value : '';
        }
        handleFilterSelection(val, currentFilter);
    };

    const getValue = () => {
        if (options && selectedValue) {
            return isMulti
                ? options.filter(
                      (option: Option) =>
                          selectedValue.indexOf(option.value) >= 0,
                  )
                : options.find(
                      (option: Option) => option.value === selectedValue,
                  );
        } else {
            return isMulti ? [] : ('' as any);
        }
    };

    return (
        <>
            {showNameAsLabel && <div className="title">{name}</div>}
            <Select
                name={name}
                value={getValue()}
                onChange={onChange}
                placeholder={defaultDisplayValue}
                options={options}
                isMulti={isMulti}
                isDisabled={disabled}
            />
        </>
    );
};

export default CustomSelectDropdown;
