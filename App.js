import React, { useState } from "react";
import { Button, Text, View, StyleSheet, TextInput, Image } from "react-native";
import { useEffect } from 'react';
import app from './src/firebase'
import { getDatabase, ref, onValue } from "firebase/database";


const Plant = (props) => {
  const [isWatered, setisWatered] = useState(true);
  const [waterTime, setwaterTime] = useState(1);

  return (
    <View style={{paddingTop: 50, paddingBottom: 50}}>     
      <Image source = {{uri: props.url}}  style={{width: 100, height: 50}} />

      <Text style={{paddingTop: 10, paddingBottom: 10}}>
        I am {props.name}, and It is {isWatered ? "watered" : "being watered"}!
      </Text>
      <Text style={{paddingTop: 10, paddingBottom: 10}}>About me: {props.description}</Text>
      
      <Button
        onPress={() => {
          setisWatered(false);
          setTimeout(
            () => {
              setisWatered(true)
            }, waterTime
          );
        }}
        disabled={!isWatered}
        title={isWatered ? "Water me, please!" : "Watering!"}
      />   
      <TextInput
        style = {{height: 40}}
        placeholder = 'set a watering time'
        onChangeText = { inputValue => setwaterTime(parseFloat(inputValue)) }
        value = { waterTime }
        defaultValue = {waterTime}
        keyboardType = "numeric"
      /> 
     </View>
  );
}


const App = () => {

  const [plants, setplants]= useState([])

  useEffect(()=>
  { 
  const db = getDatabase(app);

  const dataRef = ref(db, '/Plants');
  
  const plantstemp = [];

  onValue( dataRef ,(snapshot ) =>{
    snapshot.forEach ((childSnapshot )=>{
    const childKey = childSnapshot.key;
    plantstemp.push(childSnapshot.val())   
    });
    console.log('PlantsTemp')
    setplants(plantstemp);
    console.log(plants);
    }, {onlyOnce: true})
  },[]

  );

  

  return (
    <View style={styles.container}>
      <>
      {
        plants.map((plant) => {
        return (
          <Plant key={plant.id} name={plant.name} description = {plant.description} url = {plant.url}/>
        );}
      )}
      </>
    </View>
  );
}

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;