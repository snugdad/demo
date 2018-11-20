

















// export const GET_ONE_HAULER: string = 'GET_ONE_HAULER';
// export type GET_ONE_HAULER = typeof GET_ONE_HAULER;

// export const GET_ALL_HAULERS: string = 'GET_ALL_HAULERS';
// export type GET_ALL_HAULERS = typeof GET_ALL_HAULERS;

// export const CREATE_HAULER: string = 'CREATE_HAULER';
// export type CREATE_HAULER = typeof CREATE_HAULER;

// export const UPDATE_HAULER: string = 'UPDATE_HAULER';
// export type UPDATE_HAULER = typeof UPDATE_HAULER;

// export const HAULER_COLLECTION = 'HAULER_COLLECTION';
// export type HAULER_COLLECTION = GET_ALL_HAULERS

// export const HAULER_VALIDATION = 'HAULER_VALIDATION';
// export type HAULER_VALIDATION = CREATE_HAULER | UPDATE_HAULER | GET_ONE_HAULER;














export const isHaulerValidationAction = (actionType: string): actionType is HAULER_VALIDATION => {
    const allowedKeys: string[] = [GET_ONE_HAULER, CREATE_HAULER, UPDATE_HAULER]
    return allowedKeys.indexOf(actionType) !== -1;
}

export const isHaulerCollectionAction = (actionType: string): actionType is HAULER_COLLECTION => {
    const allowedKeys: string[] = ['GET_ALL_HAULERS_PENDING', 'GET_ALL_HAULERS_REJECTED']
    return allowedKeys.indexOf(actionType) !== -1;
}

export const getHaulerActionSuperType = (actionType: string): string => {
    if (isHaulerValidationAction(actionType))
        return HAULER_VALIDATION;
    else if (isHaulerCollectionAction(actionType))
        return HAULER_COLLECTION;
    else
        return 'ACTION_TYPE_NOT_FOUND'
}

export const getActionStatus = (actionType: string): string => {
    if (actionType.includes('PENDING'))
        return 'PENDING';
    else if (actionType.includes('FULFILLED'))
        return 'FULFILLED';
    else if (actionType.includes('REJECTED'))
        return 'REJECTED';
    else
        return 'NOT_IMPLEMENTED';
}