// getById: (state, getters) => (id) => {
//   return state.articles.find(item => item.id === parseInt(id));
// }

// default
export const getById = function(state, id) {
	// console.log('TEST 12345')
	// console.log(state)
	// console.log(id)

	console.log(state.find(item => item.id === parseInt(id)))
	
  return state.find(item => item.id === parseInt(id));
}