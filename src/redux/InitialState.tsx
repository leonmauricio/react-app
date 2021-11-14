import { CardList } from '../interfaces/ListInterface';

export interface State {
    favorites: Array<CardList>;
    cards: Array<CardList>;
    counter: number;
    loading: boolean;
    errorMessage: string;
} 

const initialState: State = {
    favorites: [], 
    cards: [], 
    counter: 0,
    loading: true,
    errorMessage: "" 
}

export default initialState;