const initialState = []


const boards = (state = initialState, action) => {
	switch (action.type) {
    case 'ADD_BOARD':
      return[
        ...state,
        action.payload
      ];
    case 'ADD_BOARDS_ARRAY':
      return [
          ...state,
          ...action.payload
      ]
    case 'DELETE_BOARD':
      let boardId = action.payload.boardId;
      return [...state.filter(board => board._id !== boardId)];

    default:
      return state
  }
}

export default boards