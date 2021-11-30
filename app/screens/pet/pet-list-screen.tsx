import React, { useEffect, useState } from "react"
import { FlatList, TextStyle, View, ViewStyle} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import {Avatar} from 'react-native-elements'
import PetService from "../../services/pet-service"
import ClienteService from "../../services/cliente-service"

const FULL: ViewStyle = {
  flex: 1,
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
  flexDirection: "row",
  padding: 10,
  alignSelf: "center",
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}
const BUTTON_ADD: ViewStyle = {
  backgroundColor: "green",
  alignSelf: "stretch",
}
const BUTTON_EDIT: ViewStyle = {
  backgroundColor: "#2196F3",
  alignSelf: "stretch",
  width: 70,
}
const BUTTON_REMOVE: ViewStyle = {
  backgroundColor: "#FA5035",
  alignSelf: "stretch",
  width: 70,
  marginLeft: 10,
}

export const PetListScreen = observer(function PetListScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const petService = new PetService()
  const clienteService = new ClienteService()

  const [pets, setPets] = useState([])

  const { petStore } = useStores()

  useEffect(() => {
    async function fetchData() {
      setPets(await petService.getPets())
    }
    fetchData()
  }, [])

  async function removerPet(id: string) {
    await petService.removePet(id)
  }

  async function getClientePorId(id: string) {
    const cliente = await clienteService.getClienteById(id)
    let name = 'Nenhum cliente associado.';
    if (cliente) {
      name = cliente.nome
    }
    return name
  }
  

  return (
    <View testID="PetListScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText="Listar Pets"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={CONTAINER_ADD}>
          <Button
            style={BUTTON_ADD}
            text="Adicionar Pet"
            onPress={() => navigation.navigate("petFormCreate")}></Button>
        </View>
        <FlatList
          contentContainerStyle={FLAT_LIST}
          data={pets}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={LIST_CONTAINER}>
              <Avatar 
                    rounded
                    source={{uri: item.imagem}} />
              <Text style={LIST_TEXT}>
                {item.nome} {"\n"} {item.especie} {"\n"}
                {item.idadeEmMeses} meses de idade {"\n"}
                
              </Text>
              <Button
                style={BUTTON_EDIT}
                onPress={() => {
                  petStore.setPetId(item.id)
                  navigation.navigate("petFormEdit")
                }}
                text="Editar">

                </Button>
              <Button
                style={BUTTON_REMOVE}
                onPress={() => { removerPet(item.id) 
                  navigation.navigate("home")
                  navigation.navigate("petList")}}
                text="Remover"></Button>
            </View>
          )}
        />
      </Screen>
    </View>
  )
})
