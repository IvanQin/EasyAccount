/**
 * Created by Qinyifan on 18/2/26.
 */
const DEFAULT_DB_NAME = "test";
/**
 * Generate template for db operation between frontend and backend
 * @param opID: operation ID ( defined in expressServer/utils/dbHelper.js )
 * @param collectionName: the name of collection to operate in mongodb
 * @param data: content
 * @returns {{dbName: string, collectionName: *, operation: *, document: *, updateDoc: *}}
 */
export function getDbOperationTemplate(opID, collectionName, data) {
    let dbName = DEFAULT_DB_NAME;
    let template = {
        "dbName": dbName,
        "collectionName": collectionName,
        "operation": opID,
        "document": data.document ? data.document : {},
        "updateDoc": data.updateDoc ? data.updateDoc : {},
        "projectionDoc": data.projectionDoc ? data.projectionDoc : {}
    };
    return template;
}
//module.exports = getDbOperationTemplate;

export function isEmpty(obj) {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
}

export const INSERT = 0;
export const UPDATE = 1;
export const SEARCH = 2;
export const DELETE = 3;
export const SEARCH_BY_ID = 4;
export const DELETE_BY_ID = 5;
export const UPDATE_BY_ID = 6;
export const UPDATE_MANY = 7;
export const GROUP_BY = 8;
