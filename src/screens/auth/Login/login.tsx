import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import styles from "./styles"

function Login() {
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
export default Login;