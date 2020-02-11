import React from 'react';
import { AppLoading } from 'expo';
import { StyleSheet, Platform, StatusBar, Text, View } from 'react-native';
import { Header, Body, Title } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import FactHolder from './components/FactHolder';
import Colors from './Colors';
import { LinearGradient } from 'expo-linear-gradient';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      fact: '',
      facts: []
    };
  }

  async componentDidMount() {
    axios.get('https://uselessfacts.jsph.pl/random.json?language=en')
    .then(doc => {
      this.setState({fact:`${doc.data.text}`, loader: false, facts: [doc.data.text]})
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
      this.setState({fact:`${doc.data.text}`, facts: [...this.state.facts, doc.data.text]})
    }).catch(e => {
      console.log(e);
    });
  }

  next = () => {
    const currentFact = this.state.fact;
    var currentFacts = [...this.state.facts];
    if (currentFact !== currentFacts[currentFacts.length - 1]) {
      this.setState({fact:currentFacts[currentFacts.indexOf(currentFact) + 1]});
    }
  }

  back = () => {
    const currentFact = this.state.fact;
    var currentFacts = [...this.state.facts];
    if (currentFact !== currentFacts[0]) {
      this.setState({fact:currentFacts[currentFacts.indexOf(currentFact) - 1]});
    }
  }

  render() {
    let loader = <Text></Text>;
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    if (this.state.fact == '') {
      loader = <Text style={{color: 'white', fontSize: 16}}>loading</Text>
    } else {
      loader = <Text></Text>;
    }
    return (
        <View style={styles.container}>
          <LinearGradient style={{width: '100%', height: '100%'}} colors={[Colors.secondary, Colors.primary, '#000000']}>
            <Header style={{backgroundColor: Colors.primary, width: '100%', marginBottom: 40}}>
                <Body>
                  <Title style={styles.headerTitle}>Random Facts</Title>
                </Body>
            </Header>
            <FactHolder next={this.next} back={this.back} loader={loader} fact={this.state.fact} newFact={this.newFact}/>
          </LinearGradient>
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
        android: {
            marginTop: StatusBar.currentHeight
        }
    }),
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  headerTitle: {
    color: Platform.OS === 'ios' ? 'white' : 'white',
    marginLeft: 20
  }
});