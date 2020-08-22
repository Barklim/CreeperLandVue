/* Getter function by Id
  @param id - identificator of object
  @param state - array of objects cartItems
*/
export const getById = function(state, id) {
  return state.find(item => item.id === parseInt(id));
}

// Exclude formattedCur functions