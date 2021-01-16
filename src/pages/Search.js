import React, {useEffect, useState} from 'react';
import {Text} from "@ui-kitten/components";
import {View, TextInput, Button, FlatList} from "react-native";
import {connect} from 'react-redux';
import agent from '../api/agent'
import PeopleListItem from "../components/PeopleListItem";

const Search = ({navigation, favs}) => {

    const [peoples, setPeoples] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [search, setSearch] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [page, setPage] = useState(1);

    const getPeoples = async () => {
        setIsRefreshing(true);
        agent.People.GetPeoples({page}).then(results => {
            setPeoples([...peoples, ...results.results]);
            setIsRefreshing(false);
        }).catch(err => {
            setIsRefreshing(false);
        })
    }

    const searchPeople = async () => {
        agent.People.searchPeoples({page, search: searchTerm}).then(results => {
            setPeoples([...peoples, ...results.results]);
            setIsRefreshing(false);
        }).catch(err => {
            setIsRefreshing(false);

        });
    }

    const loadMore = async () => {
        console.log(search)
        if(search)
            await searchPeople();
        else
            await getPeoples();
    }
    const reset = () => {
        setPeoples([]);
        setPage(1);
    }

    const amIFav = (peopleId) => {
        if (favs.findIndex(i => i === peopleId) !== -1) {
            return true;
        }
        return false
    };

    const navigateToPeopleDetails = (peopleId) => {
        navigation.navigate("People", {peopleId});
    };

    return (
        <View>
            <View>
                <TextInput placeholder='Rechercher'
                           onChangeText={text => setSearchTerm(text)}
                />
                <Button title='Rechercher' onPress={async () => {
                    setSearch(true);
                    reset()
                    await searchPeople()
                }}/>
                <Button title='Personnes populaires' onPress={async () => {
                    setSearch(false);
                    reset();
                    await getPeoples()
                }}/>
                <Button title='Vider la liste' onPress={() => {
                    reset();
                }}/>
            </View>
            {peoples !== null ?
                <FlatList data={peoples}
                          renderItem={item => (
                              <PeopleListItem
                                  peopleData={item}
                                  onClick={navigateToPeopleDetails}
                              />
                          )
                          }
                          extraData={favs}
                          keyExtractor={item => item.id.toString()}
                          onEndReached={async ({distanceFromEnd}) => {
                              if(distanceFromEnd < 0)return;
                              else{
                                  setPage(page + 1)
                                  await loadMore()
                              }
                          }}
                          onEndReachedThreshold={0.01}
                          refreshing={isRefreshing}
                /> :
                <View></View>
            }
        </View>
    )
}
const mapStateToProps = (state) => {
    return {
        favs: state.favs
    }
}

export default connect(mapStateToProps)(Search)