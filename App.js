import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootStackScreen from './screens/navigation/RootStackScreen';
import AppStackScreen from './screens/navigation/AppStackScreen';
import { AuthContext } from './components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

const App = () => {

	const initialLoginState = {
		isLoading: true,
		userEmail: null,
		userToken: null,
	};

	const loginReducer = (prevState, action) => {
		switch (action.type) {
			case 'RETRIEVE_TOKEN':
				return {
					...prevState,
					userToken: action.token,
					isLoading: false,
				}
			case 'LOGIN':
				return {
					...prevState,
					userEmail: action.id,
					userName: action.username,
					userToken: action.token,
					isLoading: false,
				}
			case 'REGISTER':
				return {
					...prevState,
					userEmail: action.id,
					userName: action.username,
					userToken: action.token,
					isLoading: false,
				}
			case 'LOGOUT':
				return {
					...prevState,
					userEmail: null,
					userName: null,
					userToken: null,
					isLoading: false,
				}
		}

	};

	const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

	const authContext = React.useMemo(() => ({
		signIn: async (foundUser) => {

			const userToken = String(foundUser[0].userToken);
			const userName = foundUser[0].username;
			const email = foundUser[0].email;

			try {
				await AsyncStorage.setItem('userToken', userToken)
			} catch (e) {
				alert('error on saving to local storage')
				console.log(e);
			}
			dispatch({ type: 'LOGIN', id: email, username: userName, token: userToken });
		},
		signOut: async () => {
			try {
				userToken = await AsyncStorage.removeItem('userToken')
			} catch (e) {
				console.log(e);
			}
			dispatch({ type: 'LOGOUT' });
		},
		signUp: (email, username, password) => {
			// add to ../model/users file
			dispatch({ type: 'REGISTER', id: email, username: username, token: 'tokenUser' });
		}
	}), []);

	useEffect(() => {
		setTimeout(async () => {
			let userToken = null;
			try {
				userToken = await AsyncStorage.getItem('userToken')
			} catch (e) {
				console.log(e);
			}
			dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
		}, 2000);
	}, []);


	if (loginState.isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="#009387" />
			</View>
		);
	}

	return (
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				{loginState.userToken !== null ?
					<AppStackScreen />
					:
					<RootStackScreen />
				}
			</NavigationContainer>
		</AuthContext.Provider>
	);
}

export default App;
