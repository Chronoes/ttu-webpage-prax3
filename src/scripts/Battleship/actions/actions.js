var CREATE_FIELD = 'CREATE_FIELD';

function newState(state, change) {
  return Object.assign({}, state, change);
}

function createField(size) {
  for (var grid = []; grid.length < size;) {
    for (var subgrid = []; subgrid.push(React.createElement(Empty)) < size;);
    grid.push(subgrid);
  }
  return grid;
}

function fields(state, action) {
  if (typeof state === 'undefined') {
    return {};
  }
  switch(action.type) {
    case CREATE_FIELD:
      return newState(state, {
        fields: createField(action.size),
      });
    default:
      return state;
  }
}

module.exports = {
  CREATE_FIELD: CREATE_FIELD,
  fields: fields,
};
