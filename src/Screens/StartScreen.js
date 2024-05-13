import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export class StartScreen extends Component {
  render() {
    return (
        <SafeAreaView>
            <View>
        <Text>StartScreen</Text>
      </View>

        </SafeAreaView>
      
    )
  }
}

export default StartScreen