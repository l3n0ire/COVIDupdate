import React from 'react';
import '../App.css';

class Summary extends React.Component{
    numWithCommas=(x)=> {
        if (x != null)
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return x
    }
    render(){
        let HRSection
        let provinceSection
        if(this.props.section === "healthRegion"){
            HRSection =  <p> <b>Health Region:</b> {this.props.data.health_region}</p>
            provinceSection = <p> <b>Province:</b> {this.props.data.province}</p>
        }
        else if(this.props.section === "province")
            provinceSection = <p> <b>Province:</b> {this.props.data.province}</p>
        return(
            <div>
                {HRSection}
                {provinceSection}
                <table>
                    <tbody>
                        <tr>
                            <td>
                                {this.props.loaded? this.numWithCommas(this.props.data.cumulative_cases):"Loading..." }
                                <br/>
                                {this.props.loaded? this.numWithCommas(this.props.data.cases):"Loading..." }
                            </td>
                            <td>
                                {this.props.loaded? this.numWithCommas(this.props.data.cumulative_deaths):"Loading..." }
                                <br/>
                                {this.props.loaded? this.numWithCommas(this.props.data.deaths):"Loading..." }
                            </td>
                            <td>
                                {this.props.loaded? this.numWithCommas(this.props.data.cumulative_recovered):"Loading..." }
                                <br/>
                                {this.props.loaded? this.numWithCommas(this.props.data.recovered):"Loading..." }
                            </td>
                            <td>
                                {this.props.loaded? this.numWithCommas(this.props.data.active_cases):"Loading..." }
                                <br/>
                                {this.props.loaded? this.numWithCommas(this.props.data.active_cases_change):"Loading..." }
                            </td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th>Cases</th>
                            <th>Deaths</th>
                            <th>Recoverd</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                </table>
                <p></p>
            </div>

        );
    }
}
export default Summary;