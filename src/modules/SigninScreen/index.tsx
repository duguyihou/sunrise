import { saveAuth } from 'app/authSlice'
import { useAppDispatch } from 'hooks/app'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { authorize } from 'react-native-app-auth'
import config from 'shared/config'
import { theme } from 'shared/theme'
import { windowHeight, windowWidth } from 'utils/dimensions'

function SigninScreen() {
  const dispatch = useAppDispatch()
  const handleSignin = async () => {
    const response = await authorize(config)
    dispatch(saveAuth(response))
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
