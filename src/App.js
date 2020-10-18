import React from 'react';
import './App.css';
import './css/main.css'
import Summary from './components/summary'
import{healthRegions} from './data/healthRegions'
const proxyurl = "https://cors-anywhere.herokuapp.com/";


class App extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      healthRegion:"3595",
      city:"toronto",
      province:"ON",
      country:"canada",
      healthRegionData:{},
      provinceData:{},
      countryData:{},
      date:"",
      isLoaded_healthRegion:false,
      isLoaded_province:false,
      isLoaded_country:false
    }
  }
  componentDidMount(){
    this.getDate()
  }
  getDate=()=>{
    fetch(`${proxyurl}https://api.opencovid.ca/version`)
    .then((res)=>res.json())
    .catch(function(error) {  
      console.log('Request failed', error)  
    })
    .then((json)=>{
      let dateStr = json['version']
      let y= dateStr.substring(0,4)
      let m =dateStr.substring(5,7)
      let d = dateStr.substring(8,10)
      this.setState({date:d+"-"+m+"-"+y},()=>{
        this.search("healthRegion")
        this.search("province")
        this.search("country")
      })
    })
  }
  updateState=(prop,e)=>{
    if (prop==="healthRegion"){
      this.setState({city: e.target.value})
      this.setState({[prop]: this.cityToHR(e.target.value.toLowerCase())})
    }
    if (prop==="province")
      this.setState({[prop]: e.target.value})
  }
  cityToHR(city){
      if(city in healthRegions)
        return healthRegions[city]
      else
        return city
  }
  search = (prop)=>{
    this.setState({["isLoaded_"+prop]:false})
    fetch(`${proxyurl}https://api.opencovid.ca/summary?loc=${this.state[prop]}&date=${this.state.date}`)
    .then((res)=>res.json())
    .catch(function(error) {  
      console.log('Request failed', error)  
    })
    .then((json)=>{
      this.setState({[prop+"Data"]:json.summary[0]}, ()=>console.log(this.state[prop+"Data"]))
      this.setState({["isLoaded_"+prop]:true})
    })
  }
  render(){
    return(
      <div>
        <h1>City</h1>
        <div className="searchGroup">
          <input type="text" value={this.state.city} onChange ={(e)=>this.updateState("healthRegion",e)}></input>
          <button onClick={(e)=>this.search("healthRegion")}>Search</button>
        </div>
    <Summary data={this.state.healthRegionData} loaded={this.state.isLoaded_healthRegion} section="healthRegion"></Summary>
        <h1>Province</h1>
        <div className="searchGroup">
          <input type="text" value={this.state.province} onChange ={(e)=>this.updateState("province",e) }></input>
          <button onClick={(e)=>this.search("province")}>Search</button>
        </div>
        <Summary data={this.state.provinceData} loaded={this.state.isLoaded_province} section="province"></Summary>
        <h1>Canada</h1>
        <Summary data={this.state.countryData} loaded={this.state.isLoaded_country} section="country"></Summary>
        <p>Data as of {this.state.date}</p>
      </div>
    );
  }
}

export default App;
