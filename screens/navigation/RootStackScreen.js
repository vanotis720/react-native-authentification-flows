import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GetStartedScreen from "../GetStartedScreen";
import SignInScreen from "../SignInScreen";
import SignUpScreen from "../SignUpScreen";

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({ navigation }) => (
    <RootStack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
        <RootStack.Screen name="GetStartedScreen" component={GetStartedScreen} />
        <RootStack.Screen name="SignInScreen" component={SignInScreen} />
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </RootStack.Navigator>
);

export default RootStackScreen;