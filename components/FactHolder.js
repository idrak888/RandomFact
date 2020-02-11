import React from 'react';
import { Text, StyleSheet, ScrollView, Image, View } from 'react-native';
import { Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const FactHolder = props => {
    return (
        
        <ScrollView contentContainerStyle={{alignItems: 'center', backgroundColor: 'transparent'}}>
              <Image 
                source={require('../assets/icon.png')}
                style={{width: 150, height: 90, resizeMode: 'contain'}}
              />
              <Text style={styles.title}>Generate Random Fact</Text>
              <Text style={{color: 'white'}}>Uses https://uselessfacts.jsph.pl/ API</Text>
              <View style={styles.buttonsContainer}>
                <Button onPress={props.back} style={{...styles.button, backgroundColor: '#EEEEEE', padding: 20, marginHorizontal: 5}}>
                  <Text style={{...styles.buttonText, color: 'black'}}><Ionicons name="ios-arrow-back" size={32} color="black" /></Text>
                </Button>
                <Button onPress={props.next} style={{...styles.button, backgroundColor: '#42B43A', padding: 20, marginHorizontal: 5}}>
                  <Text style={styles.buttonText}><Ionicons name="ios-arrow-forward" size={32} color="white" /></Text>
                </Button>
              </View>
              <View style={{borderBottomColor: 'white', borderBottomWidth: 0.5, width: 180, marginTop: 20}}></View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  {props.loader}
                  {props.fact}
                </Text>
              </View>
              <Button onPress={props.newFact} style={{...styles.button, backgroundColor: '#42B43A'}}>
                <Text style={styles.buttonText}>New Fact</Text>
              </Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text: {
      fontFamily: 'Roboto_medium',
      fontSize: 25,
      color: 'black',
      textAlign: 'center',
      color: 'white'
    },
    textContainer: {
      padding: 20
    },  
    title: {
      fontSize: 30,
      fontFamily: 'Roboto_medium',
      color: 'white',
      paddingVertical: 12,
      fontWeight: 'bold'
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15
    },  
    buttonText: {
      color: 'white',
      fontSize: 20
    },
    button: {padding: 40, marginVertical: 12, borderRadius: 5}
});

export default FactHolder;