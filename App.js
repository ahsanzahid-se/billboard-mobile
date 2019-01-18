import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, SafeAreaView, DrawerItems, Button } from 'react-native';
import { createSwitchNavigator, createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import ActiveWallpaper from './screens/ActiveWallpaper';
import Subscriptions from './screens/Subscriptions';
import ProfileSettings from './screens/ProfileSettings';
import SignOut from './screens/SignOut';
import AuthMain from './screens/AuthMain';
import AuthLoading from './screens/AuthLoading';
import { auth } from './agent';

const AuthStack = createStackNavigator(
    {
      AuthMain: {
        screen: AuthMain
      }
    },
    {
      initialRouteName: 'AuthMain',
    }
  );

const signout = () => {
  auth.signOut();
  AsyncStorage.removeItem('curr_email');
}

const AppNavigator = createDrawerNavigator(
  {
    Wallpaper: {
      screen: ActiveWallpaper
    },
    Subscriptions: {
      screen: Subscriptions
    },
    Profile: {
      screen: ProfileSettings
    },
    Signout: {
      screen: SignOut
    }
  },
  {
    initialRouteName: 'Wallpaper',
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
