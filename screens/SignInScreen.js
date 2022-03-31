import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Platform,
    StatusBar
} from "react-native";

import { LinearGradient } from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../components/context';


function SignInScreen({ navigation }) {
    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
    });

    const { signIn } = React.useContext(AuthContext);

    const userInfo = { email: 'root@info.com', pass: '1234' };

    const textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val,
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const _login = async () => {
        if (userInfo.email === data.email && userInfo.pass === data.password) {
            try {
                await AsyncStorage.setItem('isLoggedIn', '1')
            } catch (e) {
                alert("error on saving, reinstall the app")
            }
        }
        else {
            alert("wrong password or email")
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Hello! Bienvenue !</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}>
                <Text style={styles.text_footer}>Adresse e-mail</Text>
                <View style={styles.action}>
                    <Feather
                        name="mail"
                        color="green"
                        size={20}
                    />
                    <TextInput
                        placeholder="Votre E-mail"
                        style={styles.text_input}
                        autoCapitalize='none'
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View animation="bounceIn">
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                <Text style={[styles.text_footer, { marginTop: 35 }]}>Mot de passe</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color="green"
                        size={20}
                    />
                    <TextInput
                        placeholder="Votre Mot de passe"
                        secureTextEntry={data.secureTextEntry}
                        style={styles.text_input}
                        autoCapitalize='none'
                        onChangeText={(val) => handlePasswordChange(val)}

                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => { signIn() }}
                    >
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Se connecter</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUpScreen')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Créer un compte</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    text_input: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -6,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});