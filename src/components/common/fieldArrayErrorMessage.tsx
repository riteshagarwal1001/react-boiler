import * as React from 'react';
import { Field, getIn } from 'formik';

const FieldArrayErrorMessage = ({ name }) => (
    <Field name={name}>
        {({ form }) => {
            const error = getIn(form.errors, name);
            const touch = getIn(form.touched, name);
            return touch && error ? (
                <div className="input-feedback text-danger f-12">{error}</div>
            ) : null;
        }}
    </Field>
);

export default FieldArrayErrorMessage;
