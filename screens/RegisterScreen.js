import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from '../firebase'

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login"
        })
    }, [navigation])

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                })
            }).catch(err => alert(err.message));  
    }

    
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{marginBottom: 50}}>Create a Signal Account</Text>

            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" value={name} onChangeText={text => setName(text)} type="text" />
                <Input placeholder="Email" value={email} onChangeText={text => setEmail(text)} type="email" />
                <Input placeholder="Password" value={password} onChangeText={text => setPassword(text)} secureTextEntry type="password" />
                <Input 
                    placeholder="Profile Picture Url (optional)" 
                    value={imageUrl} 
                    onChangeText={text => setImageUrl(text)} 
                    type="text" 
                    onSubmitEditing={register}
                />
            </View>

            <Button title="Register" onPress={register} raised containerStyle={styles.button} />
            <View style={{height: 50}} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
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
