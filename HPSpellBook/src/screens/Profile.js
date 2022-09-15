import mongoAPI from '../../config/mongoAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';

import styles from "../styles/Stylesheet";
import userProfileBar from '../../assets/notes/userProfileBar.png';
import blackbar from '../../assets/notes/blackbar.png';
import wizardGirl from '../../assets/notes/wizardGirl.png';
import wizardBoy from '../../assets/notes/wizardBoy.png';
import houseGry from '../../assets/registration/HouseGry.png'
import houseHuf from '../../assets/registration/HouseHuf.png'
import houseRav from '../../assets/registration/HouseRav.png'
import houseSly from '../../assets/registration/HouseSly.png'
import notesBG from '../../assets/notes/notesBG.png';
import TabNav from '../components/TabNav';
import { AuthContext } from '../contexts/AuthContext';
import ProfileNotes from '../components/ProfileNotes';
import ProfileSpells from '../components/ProfileSpells';
import ProfileElixirs from '../components/ProfileElixirs';

const NotesList = () => {

    const { logout, userToken } = useContext(AuthContext);
    const [showNotes, setShowNotes] = useState(true);
    const [showSpells, setShowSpells] = useState(false);
    const [showElixirs, setShowElixirs] = useState(false);
    const [userInfo, setUserInfo] = useState({
        id: null,
        name: null,
        email: null,
        gender: null,
        house: null
    })

    const getUserInfo = async () => {
        const res = await AsyncStorage.getItem('userInfo');
        const user = JSON.parse(res);
        setUserInfo({
            id: user.data.id,
            name: user.data.name,
            email: user.data.email,
            gender: user.data.gender,
            house: user.data.house
        })
    }

    useEffect(() => {
        getUserInfo();
    }, [showNotes, showSpells, showElixirs]);

    return (
        <View>

            <ImageBackground
                source={notesBG}
                style={styles.bg}>

                <ImageBackground
                    source={userProfileBar}
                    style={styles.userBar}>

                    <TouchableOpacity>
                        <Text style={styles.changePW}>
                            Edit Profile
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.line}>|</Text>

                    <TouchableOpacity
                        onPress={() => { logout() }}>
                        <Text style={styles.logout}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </ImageBackground>

                <ImageBackground
                    style={styles.blackbar}
                    source={blackbar}>
                    <Text style={styles.profileName}>{userInfo.name}</Text>
                    <Text style={styles.profileEmail}>{userInfo.email}</Text>
                </ImageBackground>

                {showNotes ? <ProfileNotes userInfo={userInfo} /> : null}
                {showSpells ? <ProfileSpells userInfo={userInfo} /> : null}
                {showElixirs ? <ProfileElixirs userInfo={userInfo} /> : null}

                <View style={styles.profileTabContainer}>
                    <TouchableOpacity onPress={() => { setShowNotes(true), setShowSpells(false), setShowElixirs(false) }}>
                        <Text style={styles.profileTabHeader}>Notes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setShowNotes(false), setShowSpells(true), setShowElixirs(false) }}>
                        <Text style={styles.profileTabHeader}>Spells</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setShowNotes(false), setShowSpells(false), setShowElixirs(true) }}>
                        <Text style={styles.profileTabHeader}>Elixirs</Text>
                    </TouchableOpacity>
                </View>

                <Image
                    style={styles.wizardGender}
                    source={userInfo.gender === 'male' ? wizardBoy : wizardGirl} />
                <Image
                    style={styles.wizardHouse}
                    source={userInfo.house === 'gryffindor' ? houseGry
                        : userInfo.house === 'hufflepuff' ? houseHuf
                            : userInfo.house === 'slytherin' ? houseSly
                                : houseRav} />

                <TabNav />

            </ImageBackground>
        </View>
    );

}

export default NotesList; 