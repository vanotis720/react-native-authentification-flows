import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../HomeScreen';
import ProfileScreen from '../ProfileScreen';

const Tab = createMaterialBottomTabNavigator();

const BottomTabScreen = ({ navigation }) => (
    <Tab.Navigator
        initialRouteName="Profile" //must be home
        activeColor="#009387"
        barStyle={{ backgroundColor: 'white' }}
        shifting={true}
    >
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                tabBarLabel: 'Accueil',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                tabBarLabel: 'Mon compte',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />
                ),
            }}
        />
    </Tab.Navigator>
);

export default BottomTabScreen;