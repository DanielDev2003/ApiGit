import { GitModalAdd } from '@/components/modal/GitModalAdd';
import { GitModalDelete } from '@/components/modal/GitModalDelete';
import { ApiData } from '@/interface/ApiData';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GitScreen() {
  const [repoId, setRepoId] = useState('');
  const [ownerId, setOwnerId] = useState('');

  const [apiData, setApiData] = useState<ApiData[]>([])
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

  useEffect(()=>{
    async function getApiData() {
      try{
        const result = await AsyncStorage.getItem("@apiaxios:apiData");
        const apisData = result != null? JSON.parse(result):[];
        setApiData(apisData);
      }catch(error){
        console.log("Error: " + error);
        
      }
    }
    getApiData();
  }, [])

  async function handleAddApiData(){
    if (repoId.trim() === '' || ownerId.trim() === '')return;
    try {
      const response = await axios.get(`https://api.github.com/repos/${ownerId}/${repoId}`);
      const repo = response.data;

      const newApiData : ApiData = {
        id:repo.id,
        avatar_url: repo.owner.avatar_url,
        name: repo.name,
        login:repo.owner.login,
        description:repo.description,
        stargazers_count:repo.stargazers_count,
        forks_count:repo.forks_count
      }
  
      const ApiDataPlus : ApiData[] = [
        ...apiData,
        newApiData
      ];
      setApiData(ApiDataPlus);
      await AsyncStorage.setItem("@apiaxios:apiData", JSON.stringify(ApiDataPlus));
    } catch (error) {
      alert("Erro: " + error);
      
    }
  }
  
  async function handleDeleteAllApiData(){
    setApiData([]);
    await AsyncStorage.setItem("@apiaxios:apiData", JSON.stringify([]));
    setModalDeleteVisible(false);
  }
  function handleOpenDeleteModal(){
    if(apiData.length === 0) return;
    setModalDeleteVisible(true);
  }
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.button} onPress={()=> setModalVisible(true)}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDelete} onPress={()=> handleOpenDeleteModal()}>
                <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
        </View>
        <FlatList
          data={apiData}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.avatar_url }} style={{ width: 100, height: 100, borderRadius: 50 }} />
              <Text>📘 Repositório: {item.name}</Text>
              <Text>👤 Autor: {item.login}</Text>
              <Text>📝 Descrição: {item.description}</Text>
              <Text>⭐ Estrelas: {item.stargazers_count}</Text>
              <Text>🍴 Forks: {item.forks_count}</Text>
            </View>
          )
        }

        />
        <GitModalAdd
        visible={modalVisible}
        onClose={()=>setModalVisible(false)}
        onSave={() =>{
          handleAddApiData();
          setOwnerId('');
          setRepoId('');
          setModalVisible(false)}
        }
        repoId={repoId}
        ownerId={ownerId}
        setRepoId={setRepoId}
        setOwnerId={setOwnerId}
        />
        <GitModalDelete
          visible={modalDeleteVisible}
          onClose={()=> setModalDeleteVisible(false)}
          onDelete={handleDeleteAllApiData}
        />
    </View>

    
)
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
        padding:30,
    },
    header:{
        width: "100%",
        height:Dimensions.get('window').height/10,
        alignItems:'center',
        padding:10,
        flexDirection: 'row',
        justifyContent: 'center',
        gap:10
    },

    button:{
        width:30,
        height:30,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:'blue',
        borderRadius: 120,
    },
    buttonDelete:{
        width:30,
        height:30,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:'red',
        borderRadius: 120,  
    },
    buttonText:{
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '600',
    },
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#d0d0d0',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    alignItems:'center'
  },
})