import React from 'react';
import { Image, View, TouchableOpacity, Text} from "react-native";
import agent from "../api/agent";
import Assets from "../definition/Assets";


const PeopleListItem = ({onClick, peopleData, isFav = false}) => {
    const path = 'https://image.tmdb.org/t/p/w500'+peopleData.item.profile_path;
    const getThumbnail = () => {
        if (peopleData.item.profile_path) {
            return (
                <Image source={{ uri: agent.People.getImage({img: peopleData.item.profile_path}) }} />
            );
        };
        return (
            <View>
                <Image source={Assets.icons.missingIMG} />
            </View>
        );
    };

    return (
        <TouchableOpacity onPress={() => {onClick(peopleData.item.id)}}>
            {getThumbnail()}
            <View>
                <View>
                    <Text>{peopleData.item.id}</Text>
                    <Text>{peopleData.item.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default PeopleListItem;