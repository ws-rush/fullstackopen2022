export default function filterReducer(state = '', action) {
    switch (action.type) {
        case 'UPDATE':
            return action.payload
        default: return state
    }
}

export function updateFilter(content) {
    return {
        type: 'UPDATE',
        payload: content
    }
}