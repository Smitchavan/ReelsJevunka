import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReelScreen from './src/screens/ReelScreen';
import Home from 'react-native-vector-icons/Octicons';
import Bag from 'react-native-vector-icons/Feather';
import User from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabbar,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Home name="home" color={'#FFFFFF'} size={30} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: () => <Home name="search" color={'#FFFFFF'} size={30} />,
        }}
      />
      <Tab.Screen
        name="Reels"
        component={ReelScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('./src/assets/images/reel2.png')}
              style={styles.img}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarIcon: () => (
            <Bag name="shopping-bag" color={'#FFFFFF'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <User name="user-circle" color={'#FFFFFF'} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.black}>Home Screen</Text>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.black}>Profile Screen</Text>
    </View>
  );
};

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.black}>Explore Screen</Text>
    </View>
  );
};

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.black}>Notification Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  black: {color: '#000000'},
  img: {
    height: 27,
    width: 27,
    resizeMode: 'contain',
    tintColor: '#FFF',
  },
  tabbar: {
    borderColor: '#000000',
    elevation: 2,
    backgroundColor: '#000000',
    height: '10%',
  },
});

export default App;
