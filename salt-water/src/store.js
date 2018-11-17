
const state = {
    index: ['users', 'todos'],
        users: {
            header: {
                index: ['id', 'name', 'email'],
                columnNames: {
                    id: 'ID',
                    name: 'Name',
                    email: 'Email',
                },
            },
            sendingRequest: false,
            error: null, 
            data: []
        },
        todos: {
            header: {
                index: ['id', 'userId', 'completed'],
                columnNames: {
                    id: 'ID',
                    userId: 'User ID',
                    completed: 'completed',
                }
            },
            sendingRequest: false,
            error: null,           
            data: []
        }
    },


// const rootReducer = combineReducers(reducers);

// const store = createStore(rootReducer, state, applyMiddleware(logger, promise()));