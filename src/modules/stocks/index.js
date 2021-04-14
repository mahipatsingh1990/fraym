import React, { useState, useEffect } from "react";
import { getStockPriceByCountry } from '../../redux/stocks/stocksAction';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Stocks = (props) => {
  const [database, setDatabase] = useState('WIKI')
  const [dataset, setDataset] = useState('FB')
  useEffect(() => {
    props.getStockPriceByCountry(database, dataset);
  }, []);

 
  
  return (
    
    <div>
      <div className="row">
        <input type="text" name="database_code" placeholder="Database code" onChange={e => setDatabase(e.target.value)} value={database}/>
        <input type="text" name="dataset_code" placeholder="Dataset code" onChange={e => setDataset(e.target.value)} value={dataset}/>
        <button  onClick={() => props.getStockPriceByCountry(database,dataset)}>Submit</button>
      </div>
      { 
        !props.error && !props.loading ? (
          <div>
            <h2> Stock Price of {dataset} </h2>
            <HighchartsReact highcharts={Highcharts} options={props.stocksPriceData}/> 
          </div>
        ) :(
          <div className="error"> Invalid Input</div>
         )
      }
    </div>
    
   
  )
}

const mapStateToProps = state => {
  return {
    stocksPriceData: state.stocks.stocksPriceData,
    loading: state.stocks.loading,
    error: state.stocks.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getStockPriceByCountry: (database_code, dataset_code) => dispatch(getStockPriceByCountry(database_code, dataset_code)),
  }
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
)(Stocks)