import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home  from './src/screens/home';
import { Provider, useSelector, useDispatch } from 'react-redux'
import {store} from './src/store'

export default function App() {
  return (
       <Provider store={store}>
              <Home/>
       </Provider>
  )
}
