import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'


export const Container = ({ style, children }: any) => {
  return (
    <ScrollView>
          <View style={[style, styles.wrapper ]}>
            { children }
        </View>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
   wrapper: {
    padding: 20
   }
});