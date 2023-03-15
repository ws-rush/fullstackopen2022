const counterReducer = {
    name: 'counter',
    initialState: 0,
    reducer: (state, action) => {
        console.log('notification', state, action)
      switch (action.type) {
        case 'counter/increment':
          return state + 1;
        case 'counter/decrement':
          return state - 1;
        default:
          return state;
      }
    }
}

export default counterReducer