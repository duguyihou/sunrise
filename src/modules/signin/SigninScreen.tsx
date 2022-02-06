import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'
import { authorize } from 'react-native-app-auth'
import { config } from 'shared/config'
import { windowHeight, windowWidth } from 'utils/dimensions'
import { theme } from 'shared'
import { fetchRefreshAccessToken, saveAuth } from 'app/authSlice'
import { useAppDispatch } from 'app/hooks'
import Config from 'react-native-config'

const SigninScreen = () => {
  const dispatch = useAppDispatch()
  const handleSignin = async () => {
    const response = await authorize(config)
    dispatch(saveAuth(response))
    const payload = {
      client_id: Config.CLIENT_ID,
      client_secret: Config.CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: response.refreshToken,
    }
    dispatch(fetchRefreshAccessToken(payload))
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
