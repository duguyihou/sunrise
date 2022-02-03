import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'
import { authorize } from 'react-native-app-auth'
import { config } from 'shared/config'
import { windowHeight, windowWidth } from 'utils/dimensions'
import { theme } from 'shared/theme'

const SigninScreen = () => {
  const handleSignin = async () => {
    console.log('🐵', config)
    const response = await authorize(config)

    console.log('🐵', response)
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleSignin}>
        <Text style={styles.text}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SigninScreen

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: theme.bg.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: theme.bg.secondary,
    padding: 20,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
  },
})
