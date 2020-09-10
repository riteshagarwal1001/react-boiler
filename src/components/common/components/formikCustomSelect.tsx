import { useField } from 'formik';
import * as React from 'react';
import Select from 'react-select';
import { OptionsType, ValueType } from 'react-select/src/types';

interface Option {
    label: string;
    value: string;
}

interface CustomSelectProps {
    options: OptionsType<Option>;
    name: string;
    isMulti: boolean;
    placeholder: string;
    className?: string;
    fieldSetCallback?: (value: any) => void;
    disabled?: boolean;
}

const FormikCustomSelect = (props: CustomSelectProps) => {
    const { options, isMulti, className, placeholder, name, disabled } = props;
    const [field, , helpers] = useField<string>(name);
    const { setValue } = helpers;

    const onChange = (option: ValueType<Option | Option[]>) => {
        let val;
        if (isMulti) {
            if (!option) option = [];
            val = (option as Option[]).map((item: Option) => item.value) as any;
        } else {
            val = option ? (option as Option).value : '';
        }
        setValue(val);
        props.fieldSetCallback && props.fieldSetCallback(val);
    };

    const getValue = () => {
        if (options) {
            return isMulti
                ? options.filter(
                      (option: Option) =>
                          field.value.indexOf(option.value) >= 0,
                  )
                : options.find(
                      (option: Option) => option.value === field.value,
                  ) || '';
        } else {
            return isMulti ? [] : ('' as any);
        }
    };

    return (
        <Select
            className={className}
            name={field.name}
            value={getValue()}
            onChange={onChange}
            onBlur={(e: any) => {
                e.target.name = field.name;
                field.onBlur(e);
            }}
            placeholder={placeholder}
            options={options}
            isMulti={isMulti}
            isDisabled={disabled}
        />
    );
};

export default FormikCustomSelect;
