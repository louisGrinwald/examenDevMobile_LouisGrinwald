import React from 'react';
import {BottomNavigation, BottomNavigationTab} from "@ui-kitten/components";

const BottomTabBar = ({navigation, state}) => (
    <BottomNavigation selectedIndex={state.index} onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='Rechercher'/>
        <BottomNavigationTab title='Suivis'/>
    </BottomNavigation>
)

export default BottomTabBar;