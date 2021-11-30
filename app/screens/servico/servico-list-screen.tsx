import React, { useEffect, useState } from "react"
import { Image, FlatList, TextStyle, View, ViewStyle, ImageStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import ServicoService from "../../services/servico-service"

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
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
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

export const ServicoListScreen = observer(function ServicoListScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const servicoService = new ServicoService()

  const { servicoStore } = useStores()
  
  const [servicos, setServicos] = useState([])

  useEffect(() => {
    async function fetchData() {
      setServicos(await servicoService.getServicos())
    }
    fetchData()
  }, [])

  async function removerServico(id: string) {
    await servicoService.removeServico(id)
  }

  return (
    
    <View testID="ServicoListScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText="Lista de Serviços"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={CONTAINER_ADD}>
          <Button
            style={BUTTON_ADD}
            text="Adicionar Servico"
            onPress={() => navigation.navigate("servicoFormCreate")}></Button>
        </View>
        <FlatList
          contentContainerStyle={FLAT_LIST}
          data={servicos}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={LIST_CONTAINER}>
                <Text style={LIST_TEXT}>
                {item.nome} 
                </Text>
              <Button
                style={BUTTON_EDIT}
                onPress={() => {
                  servicoStore.setServicoId(item.id)
                  navigation.navigate("servicoFormEdit")
                }}
                text="Editar"
                >
                  
                </Button>
              <Button
                style={BUTTON_REMOVE}
                onPress={() => { removerServico(item.id) 
                navigation.navigate("home")
                navigation.navigate("servicoList")}}
                text="Remover"></Button>
            </View>
          )}
        />
      </Screen>
    </View>
  )
})
