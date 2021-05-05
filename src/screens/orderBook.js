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
import { getOrderBookDataSuccessAction } from "../actions/actions";
import _ from "lodash";
import { List } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

const OrderBook = ({ order_books }) => {
  const ws_public = new WebSocket(public_channel);
  const [precisionCount, setPrecisionCount] = useState(0);
  const orderBookTableHead = ["Price", "Count", "Amount"];
  const dispatch = useDispatch();

  //get order books data
  useEffect(() => {
    let channelId;
    let msg = JSON.stringify({
      event: "subscribe",
      channel: "book",
      symbol: "tBTCUSD",
      prec: "P" + precisionCount.toString(),
    });

    ws_public.onopen = () => ws_public.send(msg);
    ws_public.onmessage = async (msg) => {
      const data = await JSON.parse(msg.data);
      if (data.event && data.event == "subscribed") {
        console.log(data);
        channelId = data.chanId;
      } else {
        if (data[0] == channelId && Array.isArray(data[1])) {
          await dispatch(getOrderBookDataSuccessAction(data[1]));
        }
      }
    };
  },);

  return (
    <List.Accordion
      title="Order Books"
      titleStyle={{ color: "#fff" }}
      left={(props) => <List.Icon {...props} icon="folder" />}
    >
      <View style={styles.connectRow}>
        <TouchableOpacity
          onPress={() => {
            console.log('precisionCount');

            if (precisionCount < 4) {

              setPrecisionCount(precisionCount + 1);
            }
          }}
          style={{ marginRight: 10 }}
        >
          <AntDesign name="minussquareo" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log(precisionCount);

            if (precisionCount > 0) {
              setPrecisionCount(precisionCount - 1);
            }
          }}
        >
          <AntDesign name="pluscircleo" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.connectRow}>
        {orderBookTableHead.map((el, index) => {
          return (
            <View style={styles.tableBox}>
              <Text style={styles.headerText}>{orderBookTableHead[index]}</Text>
            </View>
          );
        })}
      </View>
      <FlatList
        data={_.takeRight(order_books, 10)}
        renderItem={({ item }) => {
          return (
            <View style={styles.connectRow}>
              {item != null &&
                item.map((el, index) => {
                  return (
                    <View style={styles.tableBox}>
                      <Text style={styles.whiteText}>{el}</Text>
                    </View>
                  );
                })}
            </View>
          );
        }}
        keyExtractor={(item, index) => "key-" + index}
      />
    </List.Accordion>
  );
};
const mapStateToProps = (state) => ({
  order_books: state.mainReducer.order_books,
});
const width = Dimensions.get("window").width;

export default connect(mapStateToProps)(OrderBook);

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
  whiteText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "700",
  },
  headerText: {
    color: "#ddd",
    fontSize: 14,
    fontWeight: "700",
  },
  tableBox: {
    width: width * 0.25,
  },
});
