import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../components/context';
import GlobalStyles from '../styles/GlobalStyles';


const ProfileScreen = () => {

    const { signOut } = React.useContext(AuthContext);

    const signOutHandle = () => {
        signOut();
    }

    return (
        <SafeAreaView style={[styles.container, GlobalStyles.droidSafeArea]}>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        source={{
                            uri: 'https://adorable.io/wp-content/uploads/2021/06/racconadvice150x150.jpg',
                        }}
                        size={80}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>Raccoon</Title>
                        <Caption style={styles.caption}>@raccoon</Caption>
                    </View>
                </View>
            </View>
            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="map-marker-radius" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>Lubumbashi, CD</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>vanotis720@gmail.com</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="account" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>Root User</Text>
                </View>
            </View>
            <View style={styles.infoBoxWrapper}>
                <View
                    style={[styles.infoBox, {
                        borderRightColor: '#dddddd',
                        borderRightWidth: 1,
                    }]}
                >
                    <Title>1</Title>
                    <Caption>#ID</Caption>
                </View>
                <View style={styles.infoBox}>
                    <Title>15</Title>
                    <Caption>Favoris</Caption>
                </View>
            </View>
            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="heart-outline" color="#009387" size={25} />
                        <Text style={styles.menuItemText}>Vos favoris</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="share-outline" color="#009387" size={25} />
                        <Text style={styles.menuItemText}>Partager l'application</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="account-check-outline" color="#009387" size={25} />
                        <Text style={styles.menuItemText}>Me contacter</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="cogs" color="#009387" size={25} />
                        <Text style={styles.menuItemText}>Réglages</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { signOutHandle() }}
                >
                    <View style={styles.menuItem}>
                        <Icon name="logout" color="#FF6347" size={25} />
                        <Text style={styles.menuItemText}>Me déconnecter</Text>
                    </View>
                </TouchableRipple>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 5,
        borderTopColor: '#dddddd',
        borderTopWidth: 2,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});