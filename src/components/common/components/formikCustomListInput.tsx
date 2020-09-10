import { FieldArray, Field, FieldArrayRenderProps } from 'formik';
import * as React from 'react';
import { Button, Input } from 'reactstrap';

const DynamicAddRemoveComponent = (props: FieldArrayRenderProps) => {
    const { name, remove, push, form } = props;
    return (
        <div>
            {form.values[name] &&
                form.values[name].length > 0 &&
                form.values[name].map((item: string, index: number) => (
                    <div
                        key={index}
                        style={{ display: 'flex', paddingBottom: '2px' }}
                    >
                        <Input
                            type="text"
                            name={`${name}.${index}`}
                            tag={Field}
                        />
                        {/* <Field name={`${name}.${index}`} /> */}
                        <Button type="button" onClick={() => remove(index)}>
                            x
                        </Button>
                    </div>
                ))}
            <Button type="button" onClick={() => push('')}>
                Add Item
            </Button>
        </div>
    );
};

export default function FormikCustomListInput(props: { name: string }) {
    return (
        <FieldArray name={props.name} component={DynamicAddRemoveComponent} />
    );
}
