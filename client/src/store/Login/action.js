import Auth from "../../components/Auth/Auth";

const NS = "Login";

export const actionTypes = {
  LOGIN_REQUEST: `${NS}/LOGIN_REQUEST`,
  LOGIN: `${NS}/LOGIN`,
  IS_AUTH: `${NS}/IS_AUTH`,
  LOGIN_FAILIURE: `${NS}/LOGIN_FALIURE`,
  LOGOUT: `${NS}/LOGOUT`
};

const actions = {
  isAuth: (history, payload = {}) => {
    return dispatch => {
      const Authentication = new Auth(history);
      const { isAuthenticated } = Authentication;
      const response = isAuthenticated();
      dispatch({
        type: actionTypes.IS_AUTH,
        payload: { response }
      });
      return true;
    };
  },
  logout: (history, payload = {}) => {
    return dispatch => {
      const Authentication = new Auth(history);
      const { logout } = Authentication;
      return logout().then(value => {
        dispatch(actions.isAuth(history));
        return true;
      });
    };
  },
  loginRequest: history => {
    return dispatch => {
      dispatch(actions.isAuth(history));
    };
  }
};

export default actions;
