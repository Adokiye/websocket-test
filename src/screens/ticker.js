import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import { public_channel, auth_channel } from "../constants/urls";
import { connect, useDispatch } from "react-redux";
import {
  getOrderBookDataSuccessAction,
  getTradeDataSuccessAction,
  getTickerDataSuccessAction,
} from "../actions/actions";
import AccordionListItem from "../components/accordionListItem";
import _ from "lodash";
import { List } from "react-native-paper";

const Ticker = ({ ticker_data }) => {
  const ws_public = new WebSocket(public_channel);
  const tickerTableHead = [
    "BID",
    "BID_SIZE",
    "ASK",
    "ASK_SIZE",
    "DAILY_CHANGE",
    "DAILY_CHANGE_RELATIVE",
    "LAST_PRICE",
    "VOLUME",
    "HIGH",
    "LOW",
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    let channelId;
    let msg = JSON.stringify({
      event: "subscribe",
      channel: "ticker",
      symbol: "tBTCUSD",
    });

    ws_public.onopen = () => ws_public.send(msg);
    ws_public.onmessage = async (msg) => {
      const data = await JSON.parse(msg.data);
      if (data.event && data.event == "subscribed") {
        console.log(data);
        channelId = data.chanId;
      } else {
        if (data[0] == channelId && Array.isArray(data[1])) {
          await dispatch(getTickerDataSuccessAction(data[1]));
        }
      }
    };
  },);
  return (
    <List.Accordion
      title="Ticker"
      titleStyle={{ color: "#fff" }}
      left={(props) => <List.Icon {...props} icon="folder" />}
    >
      <View style={styles.connectRow}>
        {/* {tickerTableHead.map((el, index) => {
          return (
            <View style={styles.tableBox}>
              <Text style={styles.headerText}>{tickerTableHead[index]}</Text>
            </View>
          );
        })} */}
      </View>
      <FlatList
        data={ticker_data}
        renderItem={({item,index}) => {
            return  (
                <View>
                <Text style={styles.whiteText}>{tickerTableHead[index]}: {item}</Text>
                </View>)
          }}
        keyExtractor={(item, index) => "key-" + index}
      />
    </List.Accordion>
  );
};
const mapStateToProps = (state) => ({
  ticker_data: state.mainReducer.ticker_data,
});
const width = Dimensions.get("window").width;

export default connect(mapStateToProps)(Ticker);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#273640",
    paddingTop: 20,
  },
  connectRow: {
    flexDirection: "row",
    alignSelf: "center",
  },
  connectButton: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 10,
  },
  connectText: {
    color: "#000",
    fontSize: 14,
  },
  tableBox: {
    width: width * 0.15,
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
