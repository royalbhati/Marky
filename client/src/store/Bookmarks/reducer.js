import { actionTypes } from "./action";

const getInitialState = () => ({
  data: "",
  loading: false,
  msg: ""
});

const bookMarks = (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: "done"
      };
    case actionTypes.FETCH_REQUEST:
      return {
        ...state,
        loading: "started"
      };
    case actionTypes.ADD_SUCCESS:
      return {
        ...state,
        msg: payload
      };
    case actionTypes.DELETE:
      return {
        ...state,
        msg: payload
      };
    case actionTypes.DELETE_FAIL:
      return {
        ...state,
        msg: payload
      };
    default:
      return state;
  }
};

export default bookMarks;
