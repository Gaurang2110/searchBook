const {
  SEARCHDATA,
  SEARCH_DATA_SUCCESS,
  SEARCH_DATA_FAILED,
} = require('../action/homeAction');

const initalState = {
  searchData: [],
  lodaing: false,
  error: null,
};

const HomeReducer = (state = initalState, actions) => {
  switch (actions.type) {
    case SEARCHDATA:
      return {...state, loading: true};
    case SEARCH_DATA_SUCCESS:
      return {...state, searchData: actions.payload, loading: false};
    case SEARCH_DATA_FAILED:
      return {...state, loading: false, error: actions.payload};

    default:
      return {...initalState};
  }
};

export default HomeReducer;
