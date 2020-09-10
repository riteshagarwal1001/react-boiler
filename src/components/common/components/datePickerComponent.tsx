import * as React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export interface TEDatePicker {
    onChange: any;
    selected: Date;
}

const DatePickerComponent = (props: TEDatePicker) => {
    const { onChange, selected } = props;
    return (
        <DatePicker
            onChange={onChange}
            selected={selected}
            className="datepicker"
            dateFormat="d MMMM yyyy"
        />
    );
};
export default DatePickerComponent;
