import * as React from 'react';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Form, FormGroup, Button } from 'reactstrap';
import { TEFileUploaderComponentProps } from '../../../common/interfaces';
import { useHistory } from 'react-router';

const FileUploader = (props: TEFileUploaderComponentProps) => {
    const history = useHistory();
    const {
        uploadFile,
        clearFileUploadData,
        isUploading,
        isSuccessfullyUploaded,
        errorOccurred,
        acceptedFileTypes,
        errorMessage,
        additionalRequestParams,
        icon,
        onCancelClick,
    } = props;
    const [file, setUploadedFile] = useState(null);

    useEffect(() => {
        return () => {
            setUploadedFile(null);
            clearFileUploadData();
        };
    }, [clearFileUploadData]);

    const responseMessage = useMemo(() => {
        if (isSuccessfullyUploaded) {
            return 'The selected file has been successfully uploaded';
        }
        if (errorOccurred && !errorMessage) {
            return 'An error occurred while uploading the file';
        }
        if (errorOccurred && errorMessage) {
            return errorMessage;
        }
    }, [isSuccessfullyUploaded, errorOccurred, errorMessage]);

    const handleFormSubmit = () => {
        var formData = new FormData();
        formData.append('file', file);
        if (additionalRequestParams) {
            Object.keys(additionalRequestParams).forEach(key =>
                formData.append(key, additionalRequestParams[key]),
            );
        }
        uploadFile({ requestData: formData });
    };

    const handleCancelClick = () => {
        if (onCancelClick) onCancelClick();
        else history.goBack();
    };

    const onDrop = useCallback(files => setUploadedFile(files[0]), []);
    const {
        isDragActive,
        getRootProps,
        getInputProps,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: acceptedFileTypes
            ? acceptedFileTypes
            : ['.csv', 'application/vnd.ms-excel'], // one for select, one for drag
    });
    // TODO: this MIME type during drag works only for windows, find alternate solution

    return (
        <div className="px-2">
            <Form className="form upload-form bg-white">
                <div className="px-4 py-3 font-weight-bold border-bottom border-secondary">
                    Upload a file
                </div>
                <FormGroup className="p-4">
                    <section className="container">
                        <div
                            {...getRootProps()}
                            className="container uploadbox text-center p-5"
                        >
                            <input {...getInputProps()} />
                            {icon && <div className="mb-4">{icon}</div>}
                            <p className="drag-file mb-3">
                                {!isDragActive &&
                                    `Drag a ${
                                        acceptedFileTypes
                                            ? acceptedFileTypes[0]
                                            : '.csv'
                                    } document here`}
                                {isDragActive &&
                                    !isDragReject &&
                                    "Drop it like it's hot!"}
                                {isDragReject &&
                                    'File type not accepted, sorry!'}
                            </p>
                            or
                            <p className="select-file mb-0 mt-3">
                                <span>Select a file from your computer</span>
                            </p>
                        </div>
                    </section>
                    <ul className="list-group mt-2">
                        {file && (
                            <li className="list-group-item list-group-item-success">
                                {file.name}
                            </li>
                        )}
                    </ul>
                </FormGroup>
                <FormGroup className="pb-4 text-center btngroup">
                    <Button
                        onClick={handleFormSubmit}
                        disabled={!file || isUploading}
                        className="update-file"
                    >
                        Update file
                    </Button>
                    <Button
                        className="ml-3 cancel-file"
                        type="button"
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </Button>
                </FormGroup>
            </Form>
            {responseMessage &&
                responseMessage.split('\n').map((i, key) => {
                    return <div key={key}>{i}</div>;
                })}
        </div>
    );
};

export default FileUploader;
