import * as React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { leftArrow, rightArrow, ExcelDownload } from '../svgIconList';
import { Row, Col } from 'reactstrap';

export const Table = (props: {
    columns: { [key: string]: any; rightAligned?: boolean }[];
    data: any[];
    onChangeSort?: (sortBy?: any[]) => any;
    initialSortBy?: any;
    onPageChange?: (skip: number, limit: number) => void;
    currentPageIndex?: number;
    dynamicPageCount?: number;
    pageSizeOptions?: number[];
    tableHeading?: { key: string; value: string }[];
    actionButtons?: () => any;
    downloadXLSReport: () => void;
    hideDownloadReportButton: boolean;
}) => {
    const {
        columns,
        data,
        onChangeSort,
        initialSortBy,
        onPageChange,
        currentPageIndex,
        dynamicPageCount,
        pageSizeOptions,
        tableHeading,
        actionButtons,
        downloadXLSReport,
        hideDownloadReportButton,
    } = props;
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        // pageCount,
        // gotoPage,
        nextPage,
        previousPage,
        // setPageSize,
        state: { sortBy, pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: {
                sortBy: initialSortBy ? initialSortBy : [],
                pageIndex: currentPageIndex || 0,
                pageSize: pageSizeOptions && pageSizeOptions[0],
            },
            manualSortBy: true,
            manualPagination: true,
            pageCount: dynamicPageCount,
        } as any,
        useSortBy,
        usePagination,
    ) as any;

    const getBackgroundColor = row => {
        if (row.original.highlightColor) {
            return { style: { backgroundColor: row.original.highlightColor } };
        }
        return;
    };

    // Store new sort state in reducer and call API to fetch new data from server
    React.useEffect(() => {
        onChangeSort && onChangeSort(sortBy);
    }, [onChangeSort, sortBy]);

    React.useEffect(() => {
        onPageChange && onPageChange(pageIndex, pageSize);
    }, [onPageChange, pageIndex, pageSize]);

    return (
        <>
            <div className="px-2">
                <div className="table-wrapper">
                    {(pageSizeOptions || tableHeading) && (
                        <div className="table-heading d-flex justify-content-between px-3 py-4 align-items-center bg-white">
                            <Row className="align-items-center w-100 m-0">
                                {tableHeading && (
                                    <Col>
                                        <Row>
                                            {tableHeading.map(item => {
                                                return (
                                                    <div
                                                        className="table-heading-text font-weight-bold my-2 mr-5 pl-3"
                                                        key={item.key}
                                                    >
                                                        <strong>
                                                            {item.key}{' '}
                                                        </strong>
                                                        <span>
                                                            {item.value}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </Row>
                                    </Col>
                                )}
                                {!hideDownloadReportButton &&
                                    downloadXLSReport && (
                                        <Col
                                            md={1}
                                            className="px-0 excel-icon"
                                            onClick={downloadXLSReport}
                                        >
                                            {ExcelDownload}
                                        </Col>
                                    )}
                                {pageSizeOptions && (
                                    <Col
                                        md={2}
                                        className="p-0"
                                        style={{ minWidth: '200px' }}
                                    >
                                        <div className="d-flex">
                                            <div className="pagination d-md-flex align-items-center d-none">
                                                <div className="arrow previous">
                                                    <button
                                                        onClick={() =>
                                                            previousPage()
                                                        }
                                                        disabled={
                                                            !canPreviousPage
                                                        }
                                                    >
                                                        {leftArrow}
                                                    </button>{' '}
                                                </div>
                                                <span className="mx-2">
                                                    Page {pageIndex + 1} of{' '}
                                                    {pageOptions.length}{' '}
                                                </span>
                                                <div className="arrow next">
                                                    <button
                                                        onClick={() =>
                                                            nextPage()
                                                        }
                                                        disabled={!canNextPage}
                                                    >
                                                        {rightArrow}
                                                    </button>{' '}
                                                </div>
                                                {/* <select
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value));
                            }}
                        >
                            {pageSizeOptions.map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select> */}
                                            </div>
                                        </div>
                                    </Col>
                                )}
                                <div className="d-xl-flex flex-wrap d-none">
                                    {actionButtons && actionButtons()}
                                </div>
                            </Row>
                        </div>
                    )}
                    <div className="table-container">
                        <table {...getTableProps()}>
                            <thead>
                                {headerGroups.map((group: any) => (
                                    <tr {...group.getHeaderGroupProps()}>
                                        {group.headers.map((column: any) => (
                                            <th
                                                className={
                                                    column.rightAligned
                                                        ? 'text-right'
                                                        : ''
                                                }
                                                {...column.getHeaderProps(
                                                    column.getSortByToggleProps(),
                                                )}
                                                title={column.render('Header')}
                                            >
                                                {column.render('Header')}
                                                <span>
                                                    {column.isSorted
                                                        ? column.isSortedDesc
                                                            ? ' 🔽'
                                                            : ' 🔼'
                                                        : ''}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row: any) => {
                                    prepareRow(row);
                                    return (
                                        <tr
                                            {...row.getRowProps(
                                                getBackgroundColor(row),
                                            )}
                                        >
                                            {row.cells.map((cell: any) => {
                                                return (
                                                    <td
                                                        className={
                                                            cell.column
                                                                .rightAligned
                                                                ? 'text-right'
                                                                : ''
                                                        }
                                                        {...cell.getCellProps()}
                                                        title={cell.value}
                                                    >
                                                        {cell.render('Cell')}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {pageSizeOptions && (
                        <div className="d-flex justify-content-end py-4 bg-white pr-3">
                            <div className="pagination d-md-flex align-items-center d-none">
                                <div className="arrow previous">
                                    <button
                                        onClick={() => previousPage()}
                                        disabled={!canPreviousPage}
                                    >
                                        {leftArrow}
                                    </button>{' '}
                                </div>
                                <span className="mx-2">
                                    Page {pageIndex + 1} of {pageOptions.length}{' '}
                                </span>
                                <div className="arrow next">
                                    <button
                                        onClick={() => nextPage()}
                                        disabled={!canNextPage}
                                    >
                                        {rightArrow}
                                    </button>{' '}
                                </div>
                                {/* <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {pageSizeOptions.map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select> */}
                            </div>
                        </div>
                    )}
                    <div className="d-flex flex-wrap justify-content-end">
                        {actionButtons && actionButtons()}
                    </div>
                </div>
            </div>
        </>
    );
};
