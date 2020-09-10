export const createObjectUrlFromBufferData = (
    fileBufferData,
    fileType?: string,
) => {
    const type = fileType ? fileType : 'application/pdf';
    const blob = new Blob([new Uint8Array(fileBufferData)], {
        type,
    });
    return URL.createObjectURL(blob);
};
