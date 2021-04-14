import { STOCK_PRICE_REQUESTED, STOCK_PRICE_SUCCESS, STOCK_PRICE_FAILED } from './stocksTypes';
import axios from 'axios';

export const getStockPriceByCountry = (database_code, dataset_code) => {
  return (dispatch) => {
    dispatch(stockPriceRequested());
    return axios
      .get(`https://www.quandl.com/api/v3/datasets/${database_code}/${dataset_code}/data.json?api_key=SNkBNBjbrCkdmZbYKMzU`)
      .then(response => {
        const data = {

            title: {
                text: 'Stock Price Data:'
            },

            xAxis: {
                categories: response.data.dataset_data.data.map(d => {
                  return d[0];
                })
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            series: [{
                name: 'Stock Price',
                data: response.data.dataset_data.data.map(d => {
                  return d[4];
                })
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        }
        dispatch(stockPriceReceived(data))
      })
      .catch(error => {
        console.log("failed...", error);
        dispatch(stockPriceFailed(error));
      })
  }
}

export const stockPriceRequested = () => {
  return {
    type: STOCK_PRICE_REQUESTED
  }
}

export const stockPriceReceived = (data) => {
  return {
    type: STOCK_PRICE_SUCCESS,
    data: data
  }
}

export const stockPriceFailed = (error) => {
  return {
    type: STOCK_PRICE_FAILED,
    data: error
  }
}




