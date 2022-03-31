import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootStackScreen from './screens/navigation/RootStackScreen';


const Stack = createNativeStackNavigator();


export default function App() {
	return (
		<NavigationContainer>
			<RootStackScreen />
		</NavigationContainer>
	);
}

