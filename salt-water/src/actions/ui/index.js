const SELECT_TABLE = 'SELECT_TABLE';

const selectTable = (index) => ({
    type: SELECT_TABLE,
    payload: index
})