import axios from "axios";
import getToken from "../../utils/getToken";

const NS = "BookMarks";

export const actionTypes = {
         FETCH_REQUEST: `${NS}/FETCH_REQUEST`,
         FETCH_SUCCESS: `${NS}/FETCH_SUCCESS`,
         ADD_SUCCESS: `${NS}/ADD_SUCCESS`,
         DELETE: `${NS}/DELETE`,
         DELETE_SINGLE: `${NS}/DELETE_SINGLE`,

         DELETE_FAIL: `${NS}/DELETE_FAIL`
       };

const actions = {
  fetchBookmarks: (payload = {}) => {
    return dispatch => {
      dispatch({ type: actionTypes.FETCH_REQUEST });
      const token = getToken();
      return axios.get(`http://localhost:5000/api/${token}`).then(value => {
        dispatch({
          type: actionTypes.FETCH_SUCCESS,
          payload: value.data
        });
        return true;
      });
    };
  },
  addBookmark: (category, payload = {}) => {
    return dispatch => {
      axios.post(`http://localhost:5000/api`, category).then(res => {
        dispatch({
          type: actionTypes.ADD_SUCCESS,
          payload: res.data
        });
        dispatch(actions.fetchBookmarks());
        return true;
      });
    };
  },
  deleteCategory: (param, payload = {}) => {
    return dispatch => {
      axios
        .get(`/api/category/${param.token}/${param.category}`)
        .then(res => {
          dispatch({
            type: actionTypes.DELETE,
            payload: res.data
          });
          dispatch(actions.fetchBookmarks());
          return true;
        })
        .catch(err =>
          dispatch({
            type: actionTypes.DELETE_FAIL,
            payload: err.data
          })
        );
    };
  },
  deleteSingle: (id, payload = {}) => {
    return dispatch => {
      axios
        .get(`/api/delete/single/${id}`)
        .then(res => {
          dispatch({
            type: actionTypes.DELETE_SINGLE,
            payload: res.data
          });
          dispatch(actions.fetchBookmarks());
          return true;
        })
        .catch(err =>
          dispatch({
            type: actionTypes.DELETE_FAIL,
            payload: err.data
          })
        );
    };
  }
};

export default actions;
