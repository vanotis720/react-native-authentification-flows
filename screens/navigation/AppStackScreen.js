import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../HomeScreen";


const RootStack = createNativeStackNavigator();

const AppStackScreen = ({ navigation }) => (
    <RootStack.Navigator>
        <RootStack.Screen name="HomeScreen" component={HomeScreen} />
    </RootStack.Navigator>
);

export default AppStackScreen;