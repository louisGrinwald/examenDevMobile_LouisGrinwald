import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as eva from '@eva-design/eva';
import {Provider} from "react-redux";
import Store from './src/state/stores/appStore'
import {ApplicationProvider} from "@ui-kitten/components";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import BottomTabBar from "./src/components/BottomTabBar";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Search from './src/pages/Search'
import People from './src/pages/People'
import FavPeople from './src/pages/FavPeople'
const {Navigator, Screen} = createBottomTabNavigator();
const PeopleNavigation = createStackNavigator();
const FavNavigation = createStackNavigator();

const peopleStackScreen = () => {
    return (
        <PeopleNavigation.Navigator initialRouteName={'Search'}>
            <PeopleNavigation.Screen name={'SearchPlace'} component={Search} options={{title: 'Rechercher'}}/>
            <PeopleNavigation.Screen name={'People'} component={People} options={{title: 'Détails'}}/>
        </PeopleNavigation.Navigator>
    )
}

const favPeopleStackScreen = () => {
    return (
        <PeopleNavigation.Navigator initialRouteName={'FavPeople'}>
            <FavNavigation.Screen name={'FavPeople'} component={FavPeople} options={{title: 'Suivis'}}/>
            <FavNavigation.Screen name={'People'} component={People} options={{title: 'Détails'}}/>
        </PeopleNavigation.Navigator>
    )
}

const TabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props}/>}>
        <Screen name={'Rechercher'} component={peopleStackScreen}/>
        <Screen name={'Suivs'} component={favPeopleStackScreen}/>
    </Navigator>
)

export default function App() {
    return (
        <Provider store={Store}>
            <ApplicationProvider {...eva} theme={eva.light}>
                <NavigationContainer>
                    <TabNavigator />
                </NavigationContainer>
            </ApplicationProvider>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
