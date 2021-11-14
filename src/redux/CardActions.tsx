import * as CustomService from '../CustomService'
import { CardList } from "../interfaces/ListInterface";

export const startFetchCards = () => ({ type: "FETCH_CARDS" })
export const fetchCardsOk = (cards: Array<CardList>) => ({ type: "FETCH_OK", payload: cards })
export const fetchCardFailure = (error: any) => ({ type: "FETCH_ERROR", payload: error })

export const fetchCollectionAsync = () => {
    return (dispatch: any) => {
        dispatch(startFetchCards());
        CustomService.getTickers()
            .then(({ data }: { data: Array<CardList> }) => {
                dispatch(fetchCardsOk(data));
            }).catch((err: string) => {
                dispatch(fetchCardFailure(err));
            })
    }
}
