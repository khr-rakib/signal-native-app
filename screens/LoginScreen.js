import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import {Button, Input, Image} from 'react-native-elements';
import {StatusBar} from 'expo-status-bar'
import { auth } from '../firebase';


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                navigation.replace("Home")
            }
        })
        return unsubscribe;
    }, [])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .catch(err => alert(err.message));
    }

    return (
        <KeyboardAvoidingView enabled behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            
            <Image source={{uri: 'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png'}} style={{width: 200, height: 200}} />

            <View style={styles.inputContainer}>
                <Input value={email} placeholder="Email" onChangeText={text => setEmail(text)} type="email" />
                <Input value={password} onSubmitEditing={signIn} onChangeText={text => setPassword(text)} placeholder="Password" type="password" secureTextEntry />
            </View>

            <Button onPress={signIn} containerStyle={styles.button} title="Login" />
            <Button onPress={() => navigation.navigate('Register')} containerStyle={styles.button} title="Register" type="outline" />
            <View style={{height: 100}} />

        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10
    }
})
