import React from 'react';
import { StyleSheet, Text, View,Button, TextInput  } from 'react-native';
import RNShakeEvent from 'react-native-shake-event';
//import {  } from 'react-native-material-design';
//import { Provider as PaperProvider, Button, TextInput } from 'react-native-paper';
//import { Toolbar, ToolbarBackAction, ToolbarContent, ToolbarAction } from 'react-native-paper';

export default class BilanganRandom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
                    mulai: '0',
                    sampai: '100',
                    banyak: 0,
                    random: 0,
                    bgColor: 'lightblue'
                 };

  }

  componentWillMount() {
    RNShakeEvent.addEventListener('shake', () => {
      console.log('Device shake!');
      this.generate();
    });
  }

  componentWillUnmount() {
    RNShakeEvent.removeEventListener('shake');
  }

  playSound = (snd) => {
    const Sound = require('react-native-sound');
    Sound.setCategory('Playback');
    const whoosh = new Sound(snd, Sound.MAIN_BUNDLE, (error) => {
      //whoosh.stop();
      if (error) {
        console.log('failed to load the sound', error);
        return;
      } else {
          //  whoosh.play();
            console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
      }
      console.log('selesai');
    });

    //whoosh.release();
    return whoosh;
  }

  generate = () => {
    let soundShake=this.playSound('shake.wav');
    let soundCheer=this.playSound('cheers.mp3');
    let intv = setInterval(
      () => {
        soundShake.play();
        this.getRandom();
      },100
    );
    setTimeout(() => {
      clearInterval(intv);
      this.setState({bgColor: 'lightblue'})
      soundCheer.play();

    }, 2000);

  }

  getRandom = () => {
    this.setState({ bgColor: 'lightblue' });
    const mulai = parseInt(this.state.mulai, 10);
    const sampai = parseInt(this.state.sampai, 10);
    const rand = Math.round((Math.random() * (sampai-mulai)) + mulai);
    this.setState({ random: rand });

  /*  const bgColor = 'rgb(' + (Math.floor(Math.random() * 256)) +
    ',' + (Math.floor(Math.random() * 256)) + ',' +
    (Math.floor(Math.random() * 256)) + ')';
    this.setState({ bgColor }); */

  }

  render() {

      return (
        <View style={styles.containerMain} >
           <View style={styles.containerHeader}>
              <Text style={styles.textHeader}>Random Number Generator</Text>
           </View>
           <View style={styles.containerInput}>
               <View style={styles.conInputMulai}>
                   <Text style={styles.textDescInput} >Start</Text>
                   <TextInput
                    value={this.state.mulai}
                    label='start'
                     style={styles.input}
                     onChangeText={
                       (mulai) => this.setState({ mulai })
                     }
                     keyboardType='numeric'
                   />
               </View>

               <View style={styles.conInputSampai}>
                   <Text style={styles.textDescInput} >End</Text>
                   <TextInput
                    value={this.state.sampai}
                     style={styles.input}
                     onChangeText={
                       (sampai) => this.setState({ sampai })
                     }
                     keyboardType='numeric'
                   />
               </View>


          </View>

          <View style={styles.conBtn}>
          <View style={{alignItems: 'center'}}>
            <Text>Shake device or press Generate button</Text>
          </View>
          <Button
            raised
            //icon="add-a-photo"
            style = {styles.btnAcak}
            color = 'lightblue'

            onPress={
              () => {
                  this.generate();
                }
              }


            title="Generate"

          />

          </View>

          <View style={[styles.containerDesc, {backgroundColor:this.state.bgColor}] }>
              <Text style={styles.textDesc}>{ this.state.random }</Text>
          </View>
          <View style={styles.containerHeader}>
             <Text style={styles.textHeader}> Winda Kerti Kusumayani </Text>
          </View>

        </View>
      );
  }
  }
  const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'blue'
  },
  containerHeader: {
      flex: 1,
      backgroundColor: 'dodgerblue',
      justifyContent: 'center',
      alignItems: 'center',

  },
  toolbarHeader: {
    backgroundColor: 'dodgerblue'
  },
  containerInput: {
    margin: 10,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 10,
    flexDirection: 'row',
  },
  conInputMulai: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    marginRight: 10,
  },
  conInputSampai: {
    flexDirection: 'row',
    marginLeft: 10,
    flex: 1,
    justifyContent: 'space-around'
  },
  conBtn: {
      margin: 10,
      justifyContent: 'center',
      //alignItems: 'center',
      //backgroundColor: '#388E3C',
      flex: 1,
  },

  containerDesc: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
      backgroundColor: 'lightblue',
      flex: 4,
      padding: 10
  },
  containerFooter: {
      backgroundColor: 'lightblue',
      flex: 1,
  },

  textHeader: {
      fontSize: 20,
      color: 'white'
  },
  textDescInput: {
      fontSize: 22,
      color: '#000'
  },
  textDesc: {
      color: 'blue',
      fontSize: 80
    },
  input: {
    fontSize: 18,
    //borderWidth: 2,
    height: 30,
    width: 60,
    //justifyContent: 'center',
    //alignItems: 'flex-end',
  //  marginTop: 20,
    backgroundColor: 'white',
    padding: 5

  },
  btnAcak: {
    height: 40,
    backgroundColor: 'red'
  }
  });