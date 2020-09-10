import * as React from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import { leftArrow, rightArrow, close } from '../components/svgIconList';
import { Button } from 'reactstrap';
import { createObjectUrlFromBufferData } from './pdfHelper';

const PdfViewer = (props: any) => {
    const [noOfPages, setNoOfPages] = React.useState(null);
    const [scale, setScale] = React.useState(1.5);
    const [pageNumber, setPageNumber] = React.useState(1);

    function removeTextLayerOffset() {
        const textLayers = document.querySelectorAll(
            '.react-pdf__Page__textContent',
        );
        textLayers.forEach(layer => {
            const { style } = layer as any;
            style.top = '0';
            style.left = '0';
            style.transform = '';
        });
    }

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNoOfPages(numPages);
    };

    const fileData = React.useMemo(() => {
        return {
            data: props.fileBufferData.data,
        };
    }, [props.fileBufferData]);

    const blobUrl = React.useMemo(() => {
        return createObjectUrlFromBufferData(props.fileBufferData.data);
    }, [props.fileBufferData]);

    const changePage = (offset: number) => setPageNumber(pageNumber + offset);
    const previousPage = () => changePage(-1);
    const nextPage = () => changePage(1);
    return (
        <div>
            {noOfPages && (
                <div className="d-flex py-2">
                    <span>
                        <Button
                            onClick={() => setScale(scale - 0.5)}
                            disabled={scale === 0.5}
                        >
                            {'  -  '}
                        </Button>
                        <input
                            type={'range'}
                            name={'zoom-scale'}
                            value={scale}
                            onChange={e => setScale(Number(e.target.value))}
                            min={0.5}
                            max={3}
                            step={0.5}
                        />
                        <Button
                            onClick={() => setScale(scale + 0.5)}
                            disabled={scale === 3}
                        >
                            {' + '}
                        </Button>
                    </span>
                    <div
                        className="pagination align-items-center"
                        style={{ marginLeft: 'auto' }}
                    >
                        <span className="mr-3">
                            Page {pageNumber} of {noOfPages}
                        </span>
                        <div className="mr-3">
                            <button
                                onClick={() => previousPage()}
                                disabled={pageNumber <= 1}
                            >
                                {leftArrow}
                            </button>{' '}
                            <button
                                onClick={() => nextPage()}
                                disabled={pageNumber >= noOfPages}
                            >
                                {rightArrow}
                            </button>{' '}
                        </div>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <a
                            href={blobUrl}
                            download={props.fileName}
                            role={'button'}
                            className={'btn btn-secondary'}
                        >
                            Download PDF
                        </a>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <Button onClick={props.close}>{close}</Button>
                    </div>
                </div>
            )}
            <Document file={fileData} onLoadSuccess={onDocumentLoadSuccess}>
                <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    onLoadSuccess={removeTextLayerOffset}
                />
            </Document>
        </div>
    );
};

export default PdfViewer;
