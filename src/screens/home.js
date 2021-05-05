import React, { useEffect, useState, useMemo } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity,Dimensions,
ScrollView,  } from "react-native";
import { public_channel, auth_channel } from "../constants/urls";
import { connect,useDispatch } from "react-redux";
import {
  getOrderBookDataSuccessAction,
  getTradeDataSuccessAction,
  getTickerDataSuccessAction,
} from "../actions/actions";
import _ from 'lodash'
import OrderBook from './orderBook'
import Ticker from './ticker'
import Trades from './trades'

const Home = ({order_books, ticker_data, trades}) => {
  const ws_auth = new WebSocket(auth_channel);
  const ws_public = new WebSocket(public_channel);
  const orderBookTableHead =  ['Count', 'Price', 'Amount', ]
  const dispatch = useDispatch();
  //get trades data
  useEffect(() => {
    // ws_public.onmessage = async (msg) => {
    //   //console.log(JSON.parse(msg.data)[1])
    //   const data = await JSON.parse(msg.data);
    //   console.log(data)
    //  // await dispatch(getTradeDataSuccessAction(data[1]));
    //   //{"data": "[286,[54409,4,-0.0016479]]", "isTrusted": false}
    // };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
<View style={styles.connectRow}>
    <TouchableOpacity style={styles.connectButton}>
    <Text style={styles.connectText}>CONNECT</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.connectButton}>
    <Text style={styles.connectText}>DISCONNECT</Text>
    </TouchableOpacity>
</View>
      <ScrollView>
        <OrderBook />
        <Ticker />
        <Trades />
      </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  order_books: state.order_books,
  trades: state.trades,
  ticker_data: state.ticker_data,
});
const width = Dimensions.get('window').width;

export default connect(mapStateToProps,null)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#273640",
    paddingTop: 20,
  },
  connectRow:{
      flexDirection:'row',
      alignSelf:'center'
  },
  connectButton:{
     padding:20,
     backgroundColor:'#fff',
     borderRadius:10,
     marginRight:10
  },
  connectText:{
      color:'#000',
      fontSize:14,
  },
  tableBox:{
      width: width*0.25
  }
});
