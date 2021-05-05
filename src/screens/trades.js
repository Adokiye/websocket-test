import React, { useEffect, useState, useMemo } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity,Dimensions,
ScrollView, FlatList,RefreshControl } from "react-native";
import { public_channel, auth_channel } from "../constants/urls";
import { connect,useDispatch } from "react-redux";
import {
  getOrderBookDataSuccessAction,
  getTradeDataSuccessAction,
  getTickerDataSuccessAction,
} from "../actions/actions";
import AccordionListItem from "../components/accordionListItem";
import _ from 'lodash'
import { List } from 'react-native-paper';
import moment from 'moment'

const Trades = ({trades}) => {
  const ws_public = new WebSocket(public_channel);
  const tradesTableHead =  [
    'ID',
    'TIME',
    'AMOUNT',
    'PRICE'
  ]

  const dispatch = useDispatch();

  useEffect(() => {
      let channelId
    let msg = JSON.stringify({
      event: "subscribe",
      channel: "trades",
      symbol: "tBTCUSD",
    });

    ws_public.onopen = () => ws_public.send(msg);
    ws_public.onmessage = async (msg) => {
      const data = await JSON.parse(msg.data);
      if(data.event && data.event == 'subscribed'){
          console.log(data)
        channelId = data.chanId
    }else{
        if(data[0] == channelId && Array.isArray(data[1])){
            console.log(data[1])
            await dispatch(getTradeDataSuccessAction(data[1]));
          }
    }
  
    };
  });

  return (
    <List.Accordion
    title="Trades"
    titleStyle={{color:'#fff'}}
    left={props => <List.Icon {...props} icon="folder" />}>
          <View style={styles.connectRow}>
                {tradesTableHead.map((el,index) => {
                return(<View style={styles.tableBox}>
                   <Text style={styles.headerText}>{tradesTableHead[index]}</Text>
                </View>);})}
            </View>
    <FlatList
            data={_.takeRight(trades,10)}
            renderItem={({item}) => {
                console.log(item)
                return  (
            <View style={styles.connectRow}>
                {
                 item != null&&   item.map((el,index)=>{
                     console.log(index)
                        return (
                          <View style={styles.tableBox}>
                          <Text style={styles.whiteText}>{index != 1?el :moment(el).format('h:mm:ss a')}</Text>
                          </View>
                        )
                     
                    })
                }</View>)
              }}
            keyExtractor={(item, index) => 'key-'+index}
          />
  </List.Accordion>
  );
};
const mapStateToProps = (state) => ({
    trades: state.mainReducer.trades,


});
const width = Dimensions.get('window').width;

export default connect(mapStateToProps)(Trades);

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
  },
  headerText:{
    color:'#ddd',
    fontSize: 14,
    fontWeight:'700'
 },
 whiteText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight:'700'
  },
});
