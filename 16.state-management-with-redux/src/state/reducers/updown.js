const initialstate = 0
const changenumber = (state = initialstate, action) => {
    switch (action.type) {
        case "INCREMENT": return state = state + 1
        case "DECREMENT": return state = state - 1
        default: return state

    }
}


export default changenumber;