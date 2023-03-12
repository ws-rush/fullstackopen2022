const intialState = {
    good: 0,
    ok: 0, 
    bad: 0
}

export default function counterReducer(state = intialState, action) {
    console.log(action)
    switch (action.type) {
        case 'GOOD':
            return {...state, good: state.good + 1}
        case 'OK':
            return {...state, ok: state.ok + 1}
        case 'BAD':
            return {...state, bad: state.bad + 1}
        case 'ZERO':
            return {
                good: 0,
                ok: 0, 
                bad: 0
            }
        default: return state
    }
}