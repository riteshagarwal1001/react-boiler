import * as React from 'react';
import { useEffect } from 'react';
import Loader from '../../../../common/loader/loader';
import { TETableComponentProps } from '../../../../common/interfaces';
import { Table } from './table';
const TabularList = (props: TETableComponentProps) => {
    const {
        currentColId,
        currentRowId,
        tableItemsArray,
        tableColumnsConfigData,
        isTableDataLoading,
        clearTableComponentApisData,
        isChecked,
        updateRow,
        onChangeSort,
        initialSortBy,
        currentPageIndex = 0,
        pageSize = 10,
        pageSizeOptions,
        onPageChange,
        totalDataCount,
        tableHeading,
        actionButtons,
        isFileDataLoading,
        hideDownloadReportButton,
        downloadXLSReport,
        actionRowIds,
    } = props;

    useEffect(() => {
        return () => {
            clearTableComponentApisData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clearTableComponentApisData]);

    const isAllChecked = () => {
        return tableItemsArray.every(row => isChecked(row));
    };

    const checkAll = (checkStatus, columnKey) => {
        tableItemsArray.forEach(row => {
            updateRow(columnKey, checkStatus, row);
        });
    };

    const columns = tableColumnsConfigData.map(column => {
        if (column.isSelectionCheckbox) {
            return {
                id: column.id,
                rightAligned: column.rightAligned,
                Header: ({
                    getToggleAllRowsSelectedProps,
                }: {
                    getToggleAllRowsSelectedProps: any;
                }) => (
                    <div className="position-relative">
                        <input
                            className="position-absolute"
                            type="checkbox"
                            checked={isAllChecked()}
                            onChange={e =>
                                checkAll(e.target.checked, column.key)
                            }
                        />
                        <span></span>
                    </div>
                ),
                Cell: ({ row }: { row: any }) => (
                    <div className="position-relative">
                        <input
                            className="position-absolute"
                            type="checkbox"
                            name={row.id}
                            checked={isChecked(row.original)}
                            onChange={e =>
                                updateRow(
                                    column.key,
                                    e.target.checked,
                                    row.original,
                                )
                            }
                        />
                        <span></span>
                    </div>
                ),
            };
        }
        if (column.customComponent) {
            return {
                id: column.id,
                rightAligned: column.rightAligned,
                Header: column.header,
                Cell: ({ row }: { row: any }) => (
                    <column.customComponent
                        onChange={(e: any) =>
                            updateRow(column.dataField, e, row.original)
                        }
                        value={row.original[column.dataField]}
                        checked={
                            isChecked && isChecked(row.original, column.key)
                        }
                        name={column.key}
                        type={column.inputType}
                        uniquekey={column.dataField}
                    />
                ),
            };
        }
        if (column.clickableCustomComponent) {
            return {
                id: column.id,
                rightAligned: column.rightAligned,
                Header: column.header,
                Cell: ({ row }: { row: any }) => (
                    <column.clickableCustomComponent
                        onClick={(e: any) =>
                            updateRow(column.dataField, e, row.original)
                        }
                        name={column.dataField}
                        isLoading={
                            isFileDataLoading &&
                            currentRowId === row.original._id &&
                            (currentColId
                                ? currentColId === column.dataField
                                : true)
                        }
                        disabled={
                            column.enableSelectiveDisabling &&
                            Array.isArray(actionRowIds) &&
                            actionRowIds.includes(row.original._id)
                        }
                    />
                ),
            };
        }
        const columnConfig = {
            Header: column.header,
            accessor: column.transFormationFunc
                ? (row: any) =>
                      column.transFormationFunc(row[column.dataField], row)
                : column.dataField,
            disableSortBy: true,
            id: column.id,
            rightAligned: column.rightAligned,
        };
        let sortConfig: any = {};
        if (column.sortType) {
            sortConfig = { sortType: column.sortType };
            delete columnConfig.disableSortBy;
        }
        return Object.assign({}, columnConfig, sortConfig);
    });

    if (isTableDataLoading) {
        return <Loader />;
    }
    if (!Array.isArray(tableItemsArray)) {
        return null;
    }
    return (
        <Table
            data={tableItemsArray}
            columns={columns}
            onChangeSort={onChangeSort}
            initialSortBy={initialSortBy}
            onPageChange={onPageChange}
            currentPageIndex={currentPageIndex}
            dynamicPageCount={
                totalDataCount ? Math.ceil(totalDataCount / pageSize) : null
            }
            pageSizeOptions={pageSizeOptions}
            tableHeading={tableHeading}
            actionButtons={actionButtons}
            downloadXLSReport={downloadXLSReport}
            hideDownloadReportButton={hideDownloadReportButton}
        />
    );
};

export default TabularList;
