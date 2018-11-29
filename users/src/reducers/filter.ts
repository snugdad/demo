import { CompositeFilterDescriptor } from "@progress/kendo-data-query";

const initialState: CompositeFilterDescriptor = {
    logic: "or",
    filters: [{ 
        field: "isActive", 
        operator: "eq", 
        value: true, 
    }]
}

export default (state: any = initialState, action: any) => {
    switch(action.type){
        case 'users/CHANGE_FILTER':
            return action.payload;
        default:
            return state;
    }
}