export const GET_ORDER_BOOK_ERROR = "GET_ORDER_BOOK_ERROR";
export const GET_ORDER_BOOK_SUCCESS = "GET_ORDER_BOOK_SUCCESS";

export const GET_TRADES_ERROR = "GET_TRADES_ERROR";
export const GET_TRADES_SUCCESS = "GET_TRADES_SUCCESS";

export const GET_TICKER_ERROR = "GET_TICKER_ERROR";
export const GET_TICKER_SUCCESS = "GET_TICKER_SUCCESS";
//save order book data on success
export function getOrderBookDataSuccessAction(payload) {
  return {
    type: GET_ORDER_BOOK_SUCCESS,
    payload,
  };
}

// send errror on get order error
export function getOrderBookDataErrorAction(error) {
  return {
    type: GET_ORDER_BOOK_ERROR,
    error,
  };
}

export function getTradeDataSuccessAction(payload) {
  return {
    type: GET_TRADES_SUCCESS,
    payload,
  };
}

// send error on get order error
export function getTradeDataErrorAction(error) {
  return {
    type: ET_TRADES_ERROR,
    error,
  };
}

export function getTickerDataSuccessAction(payload) {
    return {
      type: GET_TICKER_SUCCESS,
      payload,
    };
  }
  
  // send error on get order error
  export function getTickerDataErrorAction(error) {
    return {
      type: GET_TICKER_ERROR,
      error,
    };
  }
