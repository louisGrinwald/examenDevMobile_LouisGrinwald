import React, {useEffect, useState} from 'react';
import {Text} from "@ui-kitten/components";
import {View, FlatList} from "react-native";
import {connect} from "react-redux";
import agent from "../api/agent";
import PeopleListItem from "../components/PeopleListItem";

const FavPeople = ({navigation, favs}) => {
    const [peoples, setPeoples] = useState([])

    const refreshFavPeople = async () => {
        let people = [];
        try {
            for(const id of favs){
                const result = agent.People.getDetails2;
                people.push(result);
            }
            setPeoples(people);
        } catch (err) {
            console.log(err);
        }
    }

    const navigateToPeopleDetails = (peopleId) => {
        navigation.navigate("People", {peopleId});
    };

    useEffect(() => {
        refreshFavPeople().then();
    }, [favs])

    return (
        <View>
            {
                (favs.length > 0) ?
                    (<FlatList
                        data={peoples}
                        extraData={favs}
                        renderItem={item => (
                            <PeopleListItem
                                peopleData={item}
                                onClick={navigateToPeopleDetails}
                            />
                        )}
                        keyExtractor={item => item.id.toString()}
                    />) :
                    (<Text>Pas de favoris</Text>)
            }
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        favs: state.favs
    }
}
export default connect(mapStateToProps)(FavPeople);