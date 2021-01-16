const initialState = {
    favs: []
}

function reducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'ADD':
            nextState = {
                ...state,
                favs: [...state.favs, action.value]
            };
            return nextState || state
        case 'REMOVE':
            nextState = {
                ...state,
                favs: state.favs.filter(id => id !== action.value)
            }
            return nextState || state
        default:
            return state
    };
}

export default reducer;