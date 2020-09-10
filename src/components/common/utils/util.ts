export enum VissibilityMask {
    UPLOAD_LC = 1,
    VIEW_LC = 2,
    UPLOAD_ACCEPTANCES = 4,
    VIEW_ACCEPTANCES = 8,
    PREDICITIVE_POOL = 16,
    USERS = 32,
    UPLOAD_IMPORTER_BANKS = 64,
    ADMIN_ACCEPTANCE_TABLE_STATUS_CONFIG = 128,
    CORE_ROUTES = 256,
    PURCHASE_ORDER = 512,
    DASHBOARD = 1024,
    SECURITY_AGENT = 2048,
    KYC_DOCS_TAB = 4096,
    KYC_EDIT = 8192,
    FINANCING_BANK_USER = 16384,
    FACILITY_DOCS_TAB = 32768,
    FACILITY_EDIT = 65536,
    DATA_MINER = 131072,
    CONSENT_CREATE = 262144,
    CONSENT_VIEW = 524288,
}

export const hasAccess = (maskToCheck: number) => {
    let visibilityMask = localStorage.getItem('visibilityMask');
    if (!visibilityMask) return true;
    const numberMask = +visibilityMask;
    if ((numberMask & maskToCheck) === maskToCheck) {
        return true;
    }
    return false;
};

export const isDataMinerUser = () => {
    return (
        hasAccess(VissibilityMask.DATA_MINER) &&
        !hasAccess(VissibilityMask.CORE_ROUTES)
    );
};
