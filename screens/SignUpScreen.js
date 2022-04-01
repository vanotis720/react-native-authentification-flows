import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Platform,
    StatusBar,
    Alert
} from "react-native";

import { LinearGradient } from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../components/context';
import { validateEmail, checkPassword, usernameIsValid } from '../helpers/formValidation';


function SignUpScreen({ navigation }) {
    const [data, setData] = React.useState({
        email: '',
        username: '',
        password: '',
        secureTextEntry: true,
        isValidEmail: true,
        isValidUsername: true,
        isValidPassword: true,
        check_emailChange: false,
        check_usernameChange: false,
    });

    const { signUp } = React.useContext(AuthContext);


    const usernameChange = (val) => {
        if (usernameIsValid(val)) {
            setData({
                ...data,
                username: val,
                isValidUsername: true,
                check_usernameChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                isValidUsername: false,
                check_usernameChange: true
            });
        }
    }

    const emailChange = (val) => {
        if (validateEmail(val)) {
            setData({
                ...data,
                email: val,
                isValidEmail: true,
                check_emailChange: true,
            });
        } else {
            setData({
                ...data,
                email: val,
                isValidEmail: false,
                check_emailChange: true,
            });
        }
    }

    const passwordChange = (val) => {
        if (checkPassword(val)) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        }
        else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const signUpHandle = (userEmail, userName, password) => {

        if (userEmail.length == 0 || userName.length == 0 || password.length == 0) {
            Alert.alert('Entrée erronée!', 'le champ email, nom ou mot de passe ne peut pas être vide.', [
                { text: 'D\'accord' }
            ]);
            return;
        }

        signUp(userEmail, userName, password);
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Inscrivez-vous maintenant !</Text>
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
                        onChangeText={(val) => emailChange(val)}
                    />
                    {data.isValidEmail ?
                        <Animatable.View animation="bounceIn">
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidEmail ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Entrer une adresse e-mail valide.</Text>
                    </Animatable.View>
                }

                <Text style={[styles.text_footer, { marginTop: 35 }]}>Votre nom</Text>
                <View style={styles.action}>
                    <Feather
                        name="user"
                        color="green"
                        size={20}
                    />
                    <TextInput
                        placeholder="Entrer votre nom"
                        style={styles.text_input}
                        autoCapitalize='none'
                        onChangeText={(val) => usernameChange(val)}
                    />
                    {data.isValidUsername ?
                        <Animatable.View animation="bounceIn">
                            <Feather
                                name="user-check"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidUsername ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>
                            le nom d'utilisateur doit contenir un minimum de 4 caractères composé uniquement de chiffres, de lettres et de caractères _ et -
                        </Text>
                    </Animatable.View>
                }

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
                        onChangeText={(val) => passwordChange(val)}

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
                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>
                            Le mot de passe doit comporter au minimum 8 lettres, avec au moins un symbole, des lettres majuscules et minuscules et un chiffre
                        </Text>
                    </Animatable.View>
                }

                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => { signUpHandle(data.email, data.username, data.password) }}
                    >
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>S'inscrire</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Se connecter</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

export default SignUpScreen;

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