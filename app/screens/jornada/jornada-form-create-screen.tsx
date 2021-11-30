import React, { useEffect, useState } from "react"
import { TextStyle, View, ViewStyle, Alert, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, TextField, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import RadioGroup from 'react-native-radio-buttons-group'
import JornadaService from "../../services/jornada-service"
import JornadaModel from "../../models/jornada-model"
import ClienteService from "../../services/cliente-service"


const FULL: ViewStyle = {
  flex: 1,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}
const BUTTON_SELECT: ViewStyle = {
  backgroundColor: "green",
  alignSelf: "stretch",
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const CONTAINER_ADD: ViewStyle = {
  ...LIST_CONTAINER,
  alignItems: "center",
  flexDirection: "column",
  padding: 10,
  alignSelf: "center",
  alignContent: "center",
}
const BUTTON_ADD: ViewStyle = {
  backgroundColor: "green",
  alignSelf: "center",
  width: 110,
  marginTop: 20
}
const TEXT_FIELD: ViewStyle = {
  width: 300,
}
const TEXT_FIELD_CONTENT: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  color: "#5D2555",
  padding: 8,
}

export const JornadaFormCreateScreen = observer(function JornadaFormCreateScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const jornadaService = new JornadaService()
  const clienteService = new ClienteService()
  
  //const [radioButtonsData, setRadioButtonsData] = useState([]);  
  
  const [horario, setSelecionarHorario] = useState("");
 
  //const [clienteRadioGroup, setSelecionarClienteoId] = useState(radioButtonsData);
  const [clientes, setClientes] = useState([])
  const [clienteId, setClienteId] = useState("")


  async function loadClientes() {
    setClientes(await clienteService.getClientes())
    
  }

  useEffect(() => {
    loadClientes()
  }, [])
  
  async function adicionarNovoJornada() {
    
    if (clienteId) {
      const jornada = new JornadaModel();
      jornada.horario = horario,
     
      jornada.clienteId = clienteId

      await jornadaService.saveJornada(jornada)
    
      navigation.navigate("home")
      navigation.navigate("petList")
    } 
    else {
      Alert.alert(
        "Atenção",
        "Falha ao cadastrar jornada de trabalho",
        [
          { text: "OK", onPress: () => navigation.navigate('home') }
        ]
      );
    }
}

  return (
    <View testID="JornadaListScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText="Adicionar Jornada"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={CONTAINER_ADD}>
          <TextField
            value={horario}
            onChangeText={setSelecionarHorario}
            inputStyle={TEXT_FIELD_CONTENT}
            style={TEXT_FIELD}
            placeholder="Horário"/>
        

          </View>
          <FlatList
                    contentContainerStyle={FLAT_LIST}
                    data={clientes}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                      <View style={LIST_CONTAINER}>
                          <Text style={LIST_TEXT}>
                          {item.nome} 
                          </Text>
                        <Button
                          style={BUTTON_SELECT}
                          disabled={clienteId===item.id}
                          onPress={() => {
                            setClienteId(item.id)
                            
                          }}
                          text="Selecionar"
                          >
                            
                          </Button>
                      
                      </View>
                    )}
                  />
                  <View>
          <Button
            style={BUTTON_ADD}
            text="Adicionar Jornada"
            onPress={() => { adicionarNovoJornada() }}></Button>
        </View>
      </Screen>
    </View>
  )
})
