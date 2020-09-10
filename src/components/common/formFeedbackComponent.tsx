import * as React from 'react';

export interface FormFeedbackProps {
    errors: any;
    touched: any;
}

const FormFeedbackComponent = (props: FormFeedbackProps) => {
    const { errors, touched } = props;

    return errors && touched ? (
        <div className="input-feedback text-danger f-12">{errors}</div>
    ) : null;
};

export default FormFeedbackComponent;
