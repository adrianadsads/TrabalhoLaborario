import { StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from "react"
import { Image, FlatList, TextStyle, View, ViewStyle, ImageStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import RNPickerSelect from 'react-native-picker-select';
import ClienteService from "../../services/cliente-service"
import ServicoService from "../../services/servico-service"
import { Button, Header, Screen, Wallpaper } from "../../components"
// import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import { TextInput } from 'react-native-gesture-handler';
import { spacing } from '../../theme';
import { colorsDark } from 'react-native-elements/dist/config';


//import {Avatar} from 'react-native-elements'

const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
  color: 'white'
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
  color: 'white'
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}

export const AgendamentoListScreen = observer(function AgendamentoListScreen() {
  const countries = ["Egypt", "Canada", "Australia", "Ireland"]
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const clienteService = new ClienteService()
  const servicoService = new ServicoService()

  const { clienteStore } = useStores()

  const [clientes, setClientes] = useState([])

  useEffect(() => {
    async function fetchData() {
      setClientes(await clienteService.getClientes())
    }
    fetchData()
  }, [])



  return (
    <View style={styles.container}>
      <Wallpaper />
      <Header
        headerText="Lista de Agendamentos"
        leftIcon="back"
        onLeftPress={goBack}
        style={HEADER}
        titleStyle={HEADER_TITLE}
      />
      <FlatList
        contentContainerStyle={FLAT_LIST}
        data={clientes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={LIST_CONTAINER}>

            <Text style={LIST_TEXT}>
            <Text style={{ color: 'orange' }}> Nome : </Text>
              {item.nome}

              {"\n"}

              <Text style={{ color: 'orange' }}> Data : </Text>
              {item.dataNascimento} 
              {"\n"}
              <Text style={{ color: 'orange' }}> Contato: </Text>
              
              {item.contato}
              {"\n"}
              <Text style={{ color: 'gold' }}> Status: </Text> 
              {item.status} 
              {"\n"}

              <Text style={{ color: 'orange' }}> Pet Nome: </Text>
              {item.petnome}

              {"\n"}
              {"\n"}
            
  <Text style={{ color: 'lime' }}>Próximo cliente</Text>

              {"\n"}
              {"\n"}




            </Text>
            




          </View>
        )}
      />

<Text style={{ color: 'gold' }}> Pet ▬ Service ™</Text>

    </View>
    
  );

})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    borderColor: '#0ed973',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }

});


