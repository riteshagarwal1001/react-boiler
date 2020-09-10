import * as React from 'react';
import Switch from 'react-switch';

export interface TESwitchComponent {
    onChange: () => void;
    value: boolean;
}

const SwitchComponent = (props: TESwitchComponent) => {
    const { onChange, value } = props;
    return <Switch onChange={onChange} checked={value ? true : false} />;
};
export default SwitchComponent;
