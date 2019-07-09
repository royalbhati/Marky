import { actionTypes } from "./action";

const getInitialState = () => ({
  isAuth: "",
  error: "",
  token: ""
});

const Authenticate = (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case actionTypes.IS_AUTH:
      return {
        ...state,
        isAuth: payload.response.response,
        token: payload.response.token
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuth:false
      };
    default:
      return state;
  }
};

export default Authenticate;
