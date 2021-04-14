import { STOCK_PRICE_SUCCESS, STOCK_PRICE_FAILED, STOCK_PRICE_REQUESTED } from './stocksTypes';
import { ProfileDataSuccess, ProfileDataFailure, getProfileDataTemp, getCustomerDetails } from './stocksAction';
import axios from 'axios';
import store from '../../redux/store';


const initialState = {
  stocksPriceData: [],
  loading: true,
  error: null,
}

const stocksReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case STOCK_PRICE_REQUESTED: {      
      return { 
        ...state, 
        loading: true,
        error: null
      };
    }
    case STOCK_PRICE_SUCCESS: {
      return {
        ...state,
        stocksPriceData: action.data,
        loading: false,
        error: null
      }

    }

     case STOCK_PRICE_FAILED: {  
     console.log("fsail", action.data);    
      return { 
        ...state, 
        loading: false,
        error: action.data 
      };
    }

    default: return state
  }
}

export default stocksReducer