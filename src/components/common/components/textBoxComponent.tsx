import * as React from 'react';
import { Input } from 'reactstrap';
import { InputType } from 'reactstrap/lib/Input';

export interface TETextBoxComponent {
    onChange: () => void;
    value: string | number;
    type?: InputType;
    uniquekey: string;
}

const TextBoxComponent = (props: TETextBoxComponent) => {
    const { onChange, value, type, uniquekey } = props;
    const [input, setInput] = React.useState(value);
    const handleChange = (e: any) => {
        setInput(e.target.value);
    };
    return (
        <Input
            key={uniquekey}
            name={uniquekey}
            onChange={handleChange}
            value={input}
            type={type || 'text'}
            style={{ width: 'auto' }}
            onBlur={onChange}
        />
    );
};
export default TextBoxComponent;
