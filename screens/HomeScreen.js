import React from 'react';
import { StyleSheet, Text, View, ImageBackground ,TouchableOpacity, Alert, Image, AsyncStorage} from 'react-native';
import {FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from 'react-native-linear-gradient';
import {  Card  } from 'native-base';

export default class HomeScreen extends React.Component {

  state = {
    name: '',
    temp: '',
    humidity: '',
    desc: '',
    icon: '',
    maxTemp:'',
    minTemp:'',
    title:'',
    wind:'',
    pressure:''
  };

  async getWeather () {
    MyCity = await AsyncStorage.getItem('myCity');
    if(!MyCity){
      MyCity = this.props.navigation.getParam('city','New Delhi')
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${MyCity}&units=metric&appid=00947ae8b5b45d3f7d4433b89f0c2d82`)
    .then(res => res.json())      //00947ae8b5b45d3f7d4433b89f0c2d82
    .then(data => {
        this.setState({
          name: data.name,
          temp: data.main.temp.toFixed(0),
          humidity: data.main.humidity,
          wind: data.wind.speed,
          desc: data.weather[0].description,
          icon: data.weather[0].icon,
          title: data.weather[0].main,
          maxTemp: data.main.temp_max.toFixed(0),
          minTemp: data.main.temp_min.toFixed(0),
          pressure: data.main.pressure
        });
    })
    .catch(error => console.log(error));
      
    
  };

  componentDidMount(){
    this.getWeather()
  }

  render(){
    if(this.props.navigation.getParam('city')){
      this.getWeather()
    }
  return (
    <View style={styles.container}>
     <ImageBackground  style={{width:"100%", height:"70%" }} resizeMode="stretch" source={require('./background.png')}>
      <View>
        <Text style={{marginTop:50, color:"#fff", marginLeft:35}}>{ this.state.name }</Text>
        <Text style={{marginTop:"-2%", color:"#fff", paddingLeft:30, fontSize:130, fontWeight:"100", fontFamily:"sans-serif-thin"}}>{ this.state.temp }º</Text>
        <Text style={{ color:"#fff", paddingLeft:35 ,fontSize:30, fontWeight:"100", fontFamily:"sans-serif-thin"}}>{ this.state.title }</Text>
      </View>
     </ImageBackground>
    <View style={styles.infoCard}>
      <Card transparent style={{flexDirection:"row",alignContent:"space-around"}}>
            <Text style={{paddingTop:20, paddingLeft: 25, fontSize:17,fontFamily:"monospace"}}>Today</Text>
            <Image style={{width:70, height:70,marginLeft:80}}
            source={{uri:'http://openweathermap.org/img/w/'+this.state.icon+".png"}}
            />
            <Text style={{paddingTop:20, color:"#000", paddingLeft:5, fontSize:20, fontSize:15, fontWeight:"100", textTransform:"capitalize", fontFamily:"monospace"}}>{ this.state.desc }</Text>
             
      </Card>
      <Card transparent style={{flexDirection:"row" }}>
             <Text style={{paddingTop:35, color:"#000", paddingLeft:45, fontSize:20, fontSize:23, fontWeight:"400"}}>{ this.state.maxTemp}º</Text>
             <View style={{flexDirection:"row", marginLeft:30}}>
               <View style={{paddingLeft:10, paddingTop:35}}>
               <FontAwesome name="thermometer-half" size={47} color="#7B8788" />
               </View>
               <View style={{paddingLeft:30, paddingTop:45}}>
               <FontAwesome name="thermometer-half" size={37} color="#7B8788" />
               </View>
               <View style={{paddingLeft:32, paddingTop:56}}>
               <FontAwesome name="thermometer-half" size={26} color="#7B8788"/>
               </View>
               <View style={{paddingLeft:30, paddingTop:64}}>
               <FontAwesome name="thermometer-half" size={18} color="#7B8788" />
               </View>
             </View>
             <Text style={{paddingTop:35, color:"#000", paddingLeft:35, fontSize:20, fontSize:23, fontWeight:"400"}}>{ this.state.minTemp}º</Text>
      </Card>
  
      <Card transparent style={{flexDirection:"row",}}>
        <View style={{flexDirection:"column", paddingTop:50, paddingLeft: 25,}}>
        <Text style={{fontSize:15, color:"#6C6666"}}>Wind</Text>
        <Text style={{fontSize:15, paddingTop:10, fontWeight:"200",}}>{this.state.wind}km/h</Text>
        </View>

        <View style={{flexDirection:"column", paddingTop:50, paddingLeft: 85}}>
        <Text style={{fontSize:14, color:"#6C6666"}}>Humidity</Text>
        <Text style={{fontSize:15, paddingTop:10, paddingLeft:15}}>{this.state.humidity}%</Text>
        </View>

        <View style={{flexDirection:"column", paddingTop:50, paddingLeft: 77}}>
        <Text style={{fontSize:14, color:"#6C6666"}}>Pressure</Text>
        <Text style={{fontSize:15, paddingTop:10,}}>{this.state.pressure}mb</Text>
        </View>

      </Card>
      
    
    </View>
  
    
    <TouchableOpacity 
       style={styles.floatButton}
       onPress={ () => {
         this.props.navigation.navigate("Search");
       }}
       >
         <FontAwesome name="search" size={20} color="#fff" />
       </TouchableOpacity>
    
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
  floatButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 60,
    backgroundColor: "#059837",
    borderRadius: 100
  },
  infoCard:{
    
    flex:2,
    marginTop:"-38%"
  },
  
});
