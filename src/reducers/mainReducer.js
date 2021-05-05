import {GET_ORDER_BOOK_ERROR, GET_ORDER_BOOK_SUCCESS,
GET_TRADES_SUCCESS, GET_TICKER_ERROR, GET_TRADES_ERROR,
GET_TICKER_SUCCESS} from '../actions/actions'
const initialState = {
  order_books:[],
  trades: [],
  ticker_data:[]
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_ORDER_BOOK_SUCCESS:
      return { 
        ...state,
        order_books: [...state.order_books, action.payload]
    }
    case GET_TRADES_SUCCESS:
      return { 
        ...state,
        trades: action.payload
    }
    case GET_TICKER_SUCCESS:
      return { 
        ...state,
        ticker_data: action.payload
    }
    default:
      return state;
  }
};
