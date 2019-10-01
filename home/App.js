import { createAppContainer,  } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'


import scanNetworkPage from './src/pages/ScanNetworksPage.js';


import connectWifiPage from './src/pages/connectWifi/ConnectWifiPage.js';



const AppNavigator = createStackNavigator({
	'Main': {
		screen: scanNetworkPage
	},
	'ConnectWifi': {
		screen: connectWifiPage,
		navigationOptions: ({ navigation }) => {
			return ({
				title: `Connect ${navigation.state.params.networkSSID}`,
				headerTitleStyle: {
					color: 'white',
					fontSize: 20,
				}
			});
		}
	},
	}, {
	defaultNavigationOptions: {
		title: 'Select network!',
		headerTintColor: 'white',
		headerStyle: {
			backgroundColor: '#6ca2f7',
			borderBottomWidth: 1,
			borderBottomColor: '#C5C5C5'
		},
		headerTitleStyle: {
			color: 'white',
			fontSize: 30,

			// centralizar o header
			flexGrow: 1,
			textAlign: 'center'
		},
	}
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;