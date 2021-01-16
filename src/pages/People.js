import React, {useEffect, useState} from 'react';
import {Text} from "@ui-kitten/components";
import {View, TextInput, Button, FlatList} from "react-native";
import {connect} from 'react-redux';
import agent from '../api/agent'

const People = ({navigation, route, dispatch, favs}) => {
    const [people, setPeople] = useState({});
    const save = async () => {
        const action = { type: 'ADD', value: route.params.id };
        dispatch(action);
    }
    const unsave = async () => {
        const action = { type: 'REMOVE', value: route.params.id };
        dispatch(action);
    }
    const displaySave = () => {
        if (favs.findIndex(i => i === route.params.id) !== -1) {
            return (
                <Button
                    title='Ne plus suivre'
                    onPress={unsave}
                />
            );
        }
        return (
            <Button
                title='Suivre'
                onPress={save}
            />
        );
    }
    useEffect(() => {
        /*agent.People.getDetails({id: route.params.peopleId}).then(result => {
            setPeople(result);
            console.log(result);
        })
        renvois 404*/
        setPeople(agent.People.getDetails2);
    }, [])
    return (
        <View>
            {displaySave()}
            <Text>Nom: {people.name}</Text>
            <Text>Domaine: {people.known_for_department}</Text>
            <Text>Naissance {people.birthday}</Text>
            <Text>Biographie {people.biography}</Text>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        favs: state.favs
    }
}

export default connect(mapStateToProps)(People);