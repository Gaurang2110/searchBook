import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux/es/exports';
import {
  SEARCH_DATA_FAILED,
  SEARCH_DATA_SUCCESS,
} from '../redux/action/homeAction';

const Home = () => {
  const dispatch = useDispatch();
  const searchData = useSelector(state => state.homeReducer.searchData);
  const [searchText, setSearchText] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [page, setPage] = useState(1);

  // https://openlibrary.org/search.json?q=the+lord+of+the+rings

  useEffect(() => {
    fetchData();
  }, []);

  const searchFilter = () => {
    return data.filter(item => item.toLowerCase() === searchText.toLowerCase());
  };

  const fetchData = async () => {
    if (data.length > 0) {
      const newData = searchFilter(searchData);
      console.log('new Searcj was..........,', newData);
      setFilterData(newData);
    } else {
      try {
        const res = await axios.get(
          `https://openlibrary.org/search.json?q=${searchText}&page=${page} `,
        );
        if (res.status === 200) {
          dispatch({type: SEARCH_DATA_SUCCESS, payload: res.data.docs});
          const newData = searchFilter(res.data.docs);
          setFilterData(newData);
        } else {
          dispatch({type: SEARCH_DATA_FAILED, payload: res.data});
        }
      } catch (error) {
        dispatch({type: SEARCH_DATA_FAILED, payload: error});
      }
    }
  };

  const onSearch = val => {
    setSearchText(val);
    setTimeout(() => {
      fetchData();
    }, 2000);
  };

  const _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          borderWidth: 0.5,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 5,
        }}>
        <Text>{item.title}</Text>
        <Text style={{paddingVertical: 10}}>{item.author_name[0]}</Text>
        <Text>{item.publish_date[0]}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{margin: 20}}>
        <TextInput
          value={searchText}
          onChangeText={text => onSearch(text)}
          style={{
            borderWidth: 1,
            borderColor: 'grey',
            width: '100%',
            paddingVertical: 10,
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}
          placeholder={'Enter book name'}
          placeholderTextColor={'grey'}
          onSubmitEditing={() => {}}
        />

        <View style={{marginTop: 20}}>
          <FlatList data={filterData} renderItem={_renderItem} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
