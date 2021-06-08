import {call, put, takeEvery} from "@redux-saga/core/effects";
import {FETCH_POSTS, HIDE_LOADER, REQUEST_POSTS} from "./typess";
import {hideAlert, hideLoader, showAlert, showLoader} from "./actions";


export function* sagaWatcher(){
    yield takeEvery(REQUEST_POSTS,sagaWorker)

}

function*  sagaWorker(){
    try{
        yield put(showLoader())
        const payload=yield call(fetchPosts)
        yield put({type:FETCH_POSTS,payload})
        yield put(hideLoader())
    }catch(e){
        yield put(showAlert('что-то пошло не так'))
        yield put(hideLoader())
    }


}
async function fetchPosts(){
    const response =await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    return await response.json()
}