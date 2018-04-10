import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

// Watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

// function that makes the API request and returns a promise for response
function fetchDog() {
  return axios({
    method: "get",
    url: "https://dog.ceo/api/breeds/image/random"
  });
}

// Worker saga: makes the API call when watcher saga sees the action
function* workerSaga() {
  try {
    const response = yield call(fetchDog);
    const dog = response.data.message;

    //Dispatch a success action to the store with the new dog
    yield put({ type: "API_CALL_SUCCESS", dog });

  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "API_CALL_FAILURE", error });
  }
}