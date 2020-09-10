import { TERequestOverrideOption } from '../middlewares/interfaces';
import { InputType } from 'reactstrap/lib/Input';

export interface Action {
    type: string;
    response: any;
    params?: any;
    error?: any;
    actionData?: any;
    payload?: any;
}

export interface TEFilterConfig {
    key: string;
    name: string;
    filterField: string;
}

export interface TEFilterDropdownComponentProps {
    options: { label: string; value: string | number }[];
    handleFilterSelection: (
        value: string | number,
        filterField: string,
    ) => void;
    currentFilter?: string;
    selectedValue: string;
    defaultDisplayValue?: string;
    isDisabled?: boolean;
}

export interface TESideBarComponentProps {
    activeTab: string | string[];
    sideBarTabOptions: any;
    handleChangeTab: (selectedTabId: string) => void;
    isTabVisibleFunc: (tabKey: any) => boolean;
}

export interface TETableStatusConfig {
    hideColumns: string[];
    actionEnabledStatus: number[];
    showActionButtons: boolean;
    actionsInfo: { name: string; data: any }[];
    hideColumnsBasedOnStatus: { [key: string]: string[] };
}

export interface TETableColumnsConfigItem {
    header: string;
    dataField: string;
    id?: string;
    isSelectionCheckbox?: boolean;
    transFormationFunc?: (rawValue: any, ...additionalParams: any) => any;
    key?: string;
    sortType?: string;
    customComponent?: any;
    clickableCustomComponent?: any;
    inputType?: InputType;
    xlsTransformtion?: boolean;
    summable?: boolean;
    rightAligned?: boolean;
    enableSelectiveDisabling?: boolean;
    resolver?: string;
}

export interface TETableComponentProps {
    isTableDataLoading: boolean;
    tableItemsArray: any[];
    tableColumnsConfigData: TETableColumnsConfigItem[];
    clearTableComponentApisData: () => void;
    updateTableData?: (
        requestOverrideParams: TERequestOverrideOption,
        data: any,
    ) => void;
    isChecked?: (row: any, columnKey?: string) => boolean;
    updateRow?: (key: any, value: any, row: any) => any;
    onChangeSort?: (sortBy?: any[]) => any;
    initialSortBy?: any;
    onPageChange?: (skip: number, limit: number) => void;
    pageSize?: number;
    currentPageIndex?: number;
    totalDataCount?: number;
    pageSizeOptions?: number[];
    tableHeading?: { key: any; value: any }[];
    actionButtons?: () => any;
    isFileDataLoading?: boolean;
    currentRowId?: string;
    currentColId?: string;
    hideDownloadReportButton?: boolean;
    downloadXLSReport?: () => void;
    actionRowIds?: string[];
}

export interface TEFileUploaderComponentProps {
    uploadFile: (requestOverrideParams: TERequestOverrideOption) => void;
    clearFileUploadData: () => void;
    isUploading: boolean;
    isSuccessfullyUploaded: boolean;
    errorOccurred: boolean;
    acceptedFileTypes?: string[];
    errorMessage?: string;
    icon?: any;
    additionalRequestParams?: { [key: string]: string };
    onCancelClick?: () => void;
}
