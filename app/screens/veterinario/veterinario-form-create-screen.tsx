import React, { useEffect, useState } from "react"
import { TextStyle, View, ViewStyle, Alert, Text, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, TextField, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import DatePicker from 'react-native-datepicker'
import { RadioGroup } from "react-native-radio-buttons-group"
import VeterinarioService from '../../services/veterinario-service'
import VeterinarioModel from "../../models/veterinario-model"
import JornadaService from "../../services/jornada-service"

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

export const VeterinarioFormCreateScreen = observer(function VeterinarioFormCreateScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const veterinarioService = new VeterinarioService()
  const jornadaService = new JornadaService()
  

  const [nomeSelecionado, setSelecionarNome] = useState("");
  const [emailSelecionado, setSelecionarEmail] = useState("");
  const [contatoSelecionada, setContatoSelecionada] = useState("");
  const [dataAtendimento, setDataAtendimentoSelecionada] = useState("")
  const [jornadaId, setJornadaId] = useState("");
  const [jornadas, setJornadas] = useState([]);


  async function loadJornadas() {
    setJornadas(await jornadaService.getJornadas())
   
  }

  useEffect(() => {
    loadJornadas()
  }, [])
  
  async function adicionarNovoVeterinario() {
    
    if (jornadaId) {
      try {
        const veterinario = new VeterinarioModel()
        veterinario.nome = nomeSelecionado,
   
        veterinario.email = emailSelecionado,
        veterinario.dataAtendimento = dataAtendimento,
        veterinario.contato = contatoSelecionada,
        veterinario.jornadaId

        await veterinarioService.saveVeterinario(veterinario)
        
        navigation.navigate("home")
        navigation.navigate("veterinarioList")
      } catch(e) {
        console.log(e)
        Alert.alert(
          "Aten????o",
          "Ocorreu um erro ao tentar cadastrar o veterin??rio!"
        )
      }
    } else {
      Alert.alert(
        "Aten????o",
        "Jornada de trabalho n??o informada",
        [
          { text: "OK", onPress: () => navigation.navigate('home') }
        ]
      );
    }
  }

  return (
    <View testID="VeterinarioListScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerText="Adicionar Veterin??rio"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={CONTAINER_ADD}>
          <TextField
            value={nomeSelecionado}
            onChangeText={setSelecionarNome}
            inputStyle={TEXT_FIELD_CONTENT}
            style={TEXT_FIELD}
            placeholder="Nome"/>
          
          
          <TextField
            value={emailSelecionado}
            onChangeText={setSelecionarEmail}
            inputStyle={TEXT_FIELD_CONTENT}
            style={TEXT_FIELD}
            placeholder="Email"/>
            
            <TextField
            value={contatoSelecionada}
            onChangeText={setContatoSelecionada}
            inputStyle={TEXT_FIELD_CONTENT}
            style={TEXT_FIELD}
            placeholder="Telefone de Contato"/>
            

            <DatePicker
            format="DD/MM/YYYY"
            mode="date"
            placeholder="Informe a Data de Admiss??o"
            style={{width: 200, backgroundColor: "white"}}
            date={dataAtendimento}
            onDateChange={setDataAtendimentoSelecionada}></DatePicker>

          </View>
          <FlatList
                    contentContainerStyle={FLAT_LIST}
                    data={jornadas}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                      <View style={LIST_CONTAINER}>
                          <Text style={LIST_TEXT}>
                          {item.horario} 
                          </Text>
                        <Button
                          style={BUTTON_SELECT}
                          disabled={jornadaId===item.id}
                          onPress={() => {
                            setJornadaId(item.id)
                            
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
            text="Adicionar Veterin??rio"
            onPress={() => { adicionarNovoVeterinario() }}></Button>
        </View>
      </Screen>
    </View>
  )
})
