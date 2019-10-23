
import SearchScreen from './screens/SearchScreen';
import HomeScreen from './screens/HomeScreen';

import { createAppContainer, createStackNavigator  } from 'react-navigation';
import { disableExpoCliLogging } from 'expo/build/logs/Logs';
const AppNavigator = createStackNavigator(
  {
      Home: { 
                screen: HomeScreen,
                navigationOptions: {
                  header: null,
                }
             },
      Search: { 
    screen: SearchScreen,
    navigationOptions: {
      header: null,
      }
    },

      
  },
  
);

const App = createAppContainer(AppNavigator);
export default App;

<Button title='' onPress={()=>alert('button pressed')}/>


