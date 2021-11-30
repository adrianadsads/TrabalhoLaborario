import React from "react"
import { View, Image, ViewStyle, TextStyle, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
const meuPetShopLogo = require("./logo_meu_pet_shop.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D", marginBottom: 64 }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
const MY_STYLES = StyleSheet.create({
  logo: {
    alignSelf: "center",
    width: 200,
    height: 147,
  },
  menuItem: {
    alignItems: "center",
    backgroundColor: "#F2E18D",
    flexGrow: 1,
    margin: 4,
    padding: 20,
    borderRadius: 30,
  },
  menuItemText: {
    color: "#000",
    fontWeight: 'bold'
  }
})

export const HomeScreen = observer(function HomeScreen() {
  const navigation = useNavigation()
  const menu = {
    data: [
      { id: "1", screen: "agendamentoList", title: "Lista de Agendamento" },
      { id: "2", screen: "veterinarioList", title: "Veterinarios" },
      { id: "3", screen: "tosadorList", title: "Tosadores" },
      { id: "4", screen: "passeadorList", title: "Passeadores" },
      { id: "5", screen: "clienteList", title: "Agendar Cliente-Pet" },
   //   { id: "6", screen: "jornadaList", title: "Jornada" } , tela invisivel, pois as escalas de trabalho já foram informadas de 8:00 á 12:00 e 13:00 á 18:00 os horários podem ser modificados de acordo com a necessidade da empresa
      { id: "7", screen: "servicoList", title: "Servicos" },
    ]
  }

  return (
    <View testID="HomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="homeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
        <Image source={meuPetShopLogo} style={MY_STYLES.logo} />
        <Text style={{ color: 'orange' }}> Bem vindo ao PetServices </Text>
        <Text style={{ color: 'gold' }}> Agilidade, Segurança e Confiança </Text>
        <SafeAreaView>
          <FlatList 
            data={menu.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={MY_STYLES.menuItem} onPress={() => navigation.navigate(item.screen)}>
                  <Text style={MY_STYLES.menuItemText}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </SafeAreaView>
      </Screen>
    </View>
  )
})
