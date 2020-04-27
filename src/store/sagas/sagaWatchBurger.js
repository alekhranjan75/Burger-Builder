import {
    takeEvery
} from "redux-saga/effects"
import {
    INIT_INGREDIENT
} from "../action/actionBurgerBuilder"
import {
    fetchIngredientSaga
} from "./sagaBurgerBuilder"

export function* watchBurger() {
    console.log("[WATCHORDER]")
    yield takeEvery(INIT_INGREDIENT, fetchIngredientSaga)
}
