import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from '../pages/Home'
import SingIn from '../pages/SignIn'
import ChatBot from '../pages/ChatBot';
import CreateAccount from '../pages/CreateAccount';
import Users from '../pages/Users';


const Stack = createNativeStackNavigator();

export default function Routes(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Welcome"
       component={Home}  options={{headerShown: false}}/>
      <Stack.Screen name="SignIn"
       component={SingIn} options={{headerShown: false}}/>
       <Stack.Screen name="ChatBot"
       component={ChatBot} options={{headerShown: false}}/>
       <Stack.Screen name="CreateAccount"
       component={CreateAccount} options={{headerShown: false}}/>
       <Stack.Screen name="Users"
       component={Users} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}