import React, { useEffect, useState } from "react"
import { TextStyle, View, ViewStyle, Text, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, TextField, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"

import PetService from "../../services/pet-service"
import PetModel from "../../models/pet-model"
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
const TEXT_FIELD_CONTENT2: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  color: "#5D2555",
  backgroundColor: "#FFF",
  padding: 8,
}

export const PetFormEditScreen = observer(function PetFormEditScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const petService = new PetService()
  const clienteService = new ClienteService()
  
  const { petStore } = useStores()

  //const [radioButtonsData, setRadioButtonsData] = useState([]);  
  const [idadeEmMeses, setSelecionarIdadeEmMeses] = useState(0);
  const [nomeSelecionado, setSelecionarNome] = useState("");
  const [especie, setSelecionarEspecie] = useState("");
  const [imagem, setSelecionarImagem] = useState("");
  //const [clienteRadioGroup, setSelecionarClienteoId] = useState(radioButtonsData);
  const [clientes, setClientes] = useState([])
  const [clienteId, setClienteId] = useState("")


  async function loadClientes() {
    setClientes(await clienteService.getClientes())
    
  }

  useEffect(() => {
    loadClientes()
  }, [])

  async function loadPetData() {
    const pet = await petService.getPetById(petStore.pet)
    setSelecionarNome(pet.nome)
    setSelecionarEspecie(pet.especie)
    setSelecionarIdadeEmMeses(pet.idadeEmMeses)
    setSelecionarImagem(pet.imagem)

    setClienteId(pet.clienteId)
  }

  useEffect(() => {
    loadClientes()
    loadPetData()
  }, [])
    

  async function editarPet() {
   
    const pet = new PetModel();
    pet.nome = nomeSelecionado,
    pet.idadeEmMeses = idadeEmMeses,
    pet.imagem = imagem,
    pet.especie = especie,
    pet.clienteId = clienteId,

    await petService.updatePet(petStore.pet, pet)

    navigation.navigate("home")
    navigation.navigate("petList")
  }

  return (
    <View testID="PetListScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText="Adicionar Pet"
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
            value={especie}
            onChangeText={setSelecionarEspecie}
            inputStyle={TEXT_FIELD_CONTENT}
            style={TEXT_FIELD}
            placeholder="Espécie"/>
          
          <Text style={TEXT_FIELD_CONTENT2}>{idadeEmMeses}</Text>
          <Button style={BUTTON_ADD}
           text="adicionar Idade" onPress={() => setSelecionarIdadeEmMeses(idadeEmMeses + 1)} />  
          <Button style={BUTTON_ADD}
          text="Diminue Idade" 
          onPress={() => {if (idadeEmMeses>0){setSelecionarIdadeEmMeses( idadeEmMeses - 1)}}} />  
          <TextField
            value={imagem}
            onChangeText={setSelecionarImagem}
            inputStyle={TEXT_FIELD_CONTENT}
            style={TEXT_FIELD}
            placeholder="Informe a Url da imagem"/>
          
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
            text="Salvar Alterações"
            onPress={() => {editarPet() 
            }}></Button>
        </View>
      </Screen>
    </View>
  )
})
