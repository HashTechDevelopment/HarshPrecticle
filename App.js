/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {RootNavigation} from './src/utilities/RootNavigation';
import FlashMessage from 'react-native-flash-message';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {COLOR_BLACK} from './src/utilities/styles';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />

      <FlashMessage
        position={'top'}
        //  statusBarHeight={40}
        style={{
          backgroundColor: COLOR_BLACK,
          fontSize: 14,
          color: 'white',
        }}
      />
    </Provider>
  );
};

export default App;
