import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import Initial from "./screens/auth/initial";

type StackNavigation = {
  SmartDot: undefined;
  Login: undefined;
};

type StackTypes = NativeStackNavigationProp<StackNavigation>

function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        
      </View>
      <View style={[styles.buttom, {backgroundColor: "#C07F00"}]}>
        <TextInput style={{color: "#CBE4DE", fontWeight: "bold", fontSize: 19}} placeholder='Email or username'/>
      </View>
      <View style={[styles.buttom, {backgroundColor: "#C07F00"}]}>
        <TextInput style={{color: "#CBE4DE", fontWeight: "bold", fontSize: 19}} placeholder='Password'/>
      </View>
      <View style={styles.info}>
        <Text style={{color: "#83908D", fontWeight: "bold", fontSize: 19, paddingBottom: "10%"}}>Forgot Password?</Text>
        <Text style={{color: "#83908D", fontWeight: "bold", fontSize: 19, paddingBottom: "10%"}}>Remember me</Text>
      </View>
      <View style={[styles.buttom, {backgroundColor: "#4C3D3D", borderBottomRightRadius: 33}]}>
        <Text style={{color: "#CBE4DE", fontWeight: "bold", fontSize: 19}}>Login</Text>
      </View>
      <View style={styles.info}>
        <Text style={{color: "#83908D", fontWeight: "bold", fontSize: 19, paddingBottom: "10%"}}>Terms of use      More about project</Text>
      </View>
    </View>
  )
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SmartDot - Ponto Eletrônico" component={Initial}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttom: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: "2%",
    width: "65%",
    height: "10%",
    borderRadius: 20
  },
  info: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
});
