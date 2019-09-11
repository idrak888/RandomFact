import React from 'react';
import { AppLoading } from 'expo';
import { StyleSheet, Platform, StatusBar, Image, Text, ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Title, Button } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import FactHolder from './components/FactHolder';
import axios from 'axios';
import AnimatedLoader from "react-native-animated-loader";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      fact: ''
    };
  }

  async componentDidMount() {
    axios.get('https://uselessfacts.jsph.pl/random.json?language=en')
    .then(doc => {
      this.setState({fact:doc.data.text, loader: false})
    }).catch(e => {
      console.log(e);
    });
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  newFact = () => {
    this.setState({fact: ''})
    axios.get('https://uselessfacts.jsph.pl/random.json?language=en')
    .then(doc => {
      this.setState({fact:doc.data.text})
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    let loader = <Text></Text>;
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    if (this.state.fact == '') {
      loader = <Text style={{color: '#E26A5C', fontSize: 16}}>loading</Text>
    } else {
      loader = <Text></Text>;
    }
    return (
      <ScrollView style={Styles.container}>
        <Header style={{backgroundColor: '#E26A5C'}}>
          <Left/>
          <Body>
            <Title>Random Facts</Title>
          </Body>
          <Right/>
        </Header>
        <Container style={Styles.content}>
          <Image 
            source={{uri: 'https://cdn4.iconfinder.com/data/icons/game-design-flat-icons-2/512/13_dice_roll_random_game_design_flat_icon-512.png'}}
            style={{width: 100, height: 100}}
          />
          <Text style={Styles.title}>Generate Random Fact</Text>
          <FactHolder>
            {loader}
            {this.state.fact}
          </FactHolder>
          <Button onPress={this.newFact} large style={{padding: 40, backgroundColor: '#E26A5C'}}>
            <Text style={Styles.buttonText}>New Fact</Text>
          </Button>
        </Container>
      </ScrollView>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
        android: {
            marginTop: StatusBar.currentHeight
        }
    })
  },
  content: {
    alignItems: 'center',
    paddingTop: 70,
    backgroundColor: '#292929'
  },
  title: {
    fontSize: 20,
    fontFamily: 'Roboto_medium',
    color: 'white',
    paddingVertical: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 27
  }
});