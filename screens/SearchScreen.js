import React from 'react';
import { StyleSheet, Text, View, ImageBackground , ScrollView, TextInput,TouchableWithoutFeedback, Keyboard, AsyncStorage} from 'react-native';
import { List, Card } from 'react-native-paper'


export default class SearchScreen extends React.Component {

  state = {
    text: '',
    cities:[]
  };

  // async buttonClick  ()  {
    //this.props.navigation.navigate("Home", {city: this.state.text})
    //await AsyncStorage.setItem("myCity", this.state.text)
  //}

  async listPressed  (name)  {
    this.setState({text:name})
    await AsyncStorage.setItem('myCity',this.state.text)
    this.props.navigation.navigate("Home", {city: this.state.text})
  }

  fetchCities = (text) =>{
    this.setState({text})
    fetch(`http://autocomplete.wunderground.com/aq?query=${text}`)
    .then(data => data.json())
    .then(city => {
       this.setState({
         cities:city.RESULTS.slice(0,9)
       })
    })
    
  }
  render(){
      renderCity = <Card><List.Item title = " No Cities Searched !" /></Card>
      if(this.state.cities.length>0)
      {
          renderCity = this.state.cities.map(city => {
              return(
                  <Card style={{marginTop:13}} key={city.zmw} onPress={() => this.listPressed(city.name)} >
                      <List.Item title = {city.name} />
                  </Card>
              )
          })
      }
  return (
    
    <View style={styles.container}>
     
     <ImageBackground  style={{width:"100%", height:"60%",}} resizeMode="stretch" source={require('./background.png')}>
         <TextInput  style={{borderRadius:30, marginTop:100,marginLeft:50,elevation: 8, backgroundColor:"white", height: 50,width: 300,paddingHorizontal: 15, }} 
         placeholder="Search City" value={this.state.text} onChangeText={text => this.fetchCities(text)} />
     </ImageBackground>
     
     <ScrollView style={{bottom:130,}}>
        {renderCity}
     </ScrollView>

    </View>
    
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
