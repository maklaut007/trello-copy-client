const initialState = [];


const lists = (state = initialState, action) => {
	switch (action.type) {
    case 'ADD_LIST':
      return[
        ...state,
        action.payload
      ];
    case 'ADD_LISTS_ARRAY':
      return [
          ...state,
          ...action.payload
      ];
    case 'DELETE_LIST':
      let listId = action.payload.listId;
      return [...state.filter(list => list._id !== listId)];
    case 'ADD_CARD':
      let foundIndex = state.findIndex(list => list._id===action.payload.listId);
      state[foundIndex].cards.push(action.payload.card);
      return [...state];
    case 'DELETE_CARD':
      let foundListIndex = state.findIndex(list => list._id===action.payload.listId);
      let foundCardIndex = state[foundListIndex].cards.findIndex(card => card._id===action.payload.cardId);
      state[foundListIndex].cards.splice(foundCardIndex,1)
      return [...state];
    case 'MOVE_CARD':
      state[action.payload.listIndex].cards.splice(action.payload.sourseCard.index, 1);
      state[action.payload.listIndex].cards.splice(action.payload.targetCardIndex, 0, {'_id': action.payload.sourseCard._id, 'cardName': action.payload.sourseCard.cardName});
      return [...state]
    case 'MOVE_CARD_TO_LIST':
      state[action.payload.listIndex].cards.splice(action.payload.sourseCard.index, 1);
      state[action.payload.listIndex].cards.splice(action.payload.targetCardIndex, 0, {'_id': action.payload.sourseCard._id, 'cardName': action.payload.sourseCard.cardName});
      return [...state]
    
    default:
      return state 
  }
}

export default lists