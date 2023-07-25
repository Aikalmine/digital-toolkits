// actions/someActions.js
const fetchDataRequest = () => ({
  type: "FETCH_DATA_REQUEST",
});

const fetchDataSuccess = (data) => ({
  type: "FETCH_DATA_SUCCESS",
  payload: data,
});

const fetchDataFailure = (error) => ({
  type: "FETCH_DATA_FAILURE",
  payload: error,
});

// Asynchronous action using Redux Thunk
export const fetchData = () => {
  return (dispatch) => {
    dispatch(fetchDataRequest());
    // Your API call logic here
    fetch("https://admin.toolkit.law/api/menu-pages/tools")
      .then((response) => response.json())
      .then((data) => dispatch(fetchDataSuccess(data)))
      .catch((error) => dispatch(fetchDataFailure(error.message)));
  };
};
