import axios from "../../axios-order";
import {put} from 'redux-saga/effects'
import "regenerator-runtime/runtime";
import { setIngredients, fetchIngredientFailed } from "../action/actionBurgerBuilder";


export function* fetchIngredientSaga(action) {
    try {
        const response = yield axios.get('/ingredients.json')
        // console.log(response.data)
        yield put(setIngredients(response.data))
    } catch (error) {
        yield put(fetchIngredientFailed())
    }
}