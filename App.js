import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootStackScreen from './screens/navigation/RootStackScreen';
import AppStackScreen from './screens/navigation/AppStackScreen';
import { AuthContext } from './components/context';

const Stack = createNativeStackNavigator();

const App = () => {

	const [isLoading, setIsLoading] = React.useState(true);
	const [userToken, setUserToken] = React.useState(null);

	const authContext = React.useMemo(() => ({
		signIn: () => {
			setUserToken('userToken');
			setIsLoading(false);
		},
		signOut: () => {
			setUserToken(null);
			setIsLoading(false);
		},
		signUp: () => {
			setUserToken('userToken');
			setIsLoading(false);
		}
	}));

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);


	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="#009387" />
			</View>
		);
	}

	return (
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				{userToken !== null ?
					<AppStackScreen />
					:
					<RootStackScreen />
				}
			</NavigationContainer>
		</AuthContext.Provider>
	);
}

export default App;
