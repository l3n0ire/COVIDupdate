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
        function arrow(value){
            if(value===0)
                return value
            else if (value == null)
                return "N/A"
            else if (value>0)
                return "(↑ "+value+")"
            else
                return ("(↓ "+value+")").replace('-','')
        }
        return(
            <div className="summary">
                {HRSection}
                {provinceSection}
                <table>
                    <tbody>
                        <tr>
                            <td>
                                {this.props.loaded? this.numWithCommas(this.props.data.cumulative_cases):"Loading..." }
                            </td>
                            <td>
                                {this.props.loaded? this.numWithCommas(this.props.data.cumulative_deaths):"Loading..." }
                            </td>
                            <td>
                                {this.props.loaded? this.numWithCommas(this.props.data.cumulative_recovered):"Loading..." }
                            </td>
                            <td>
                                {this.props.loaded? this.numWithCommas(this.props.data.active_cases):"Loading..." }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {this.props.loaded? this.numWithCommas(arrow(this.props.data.cases)):"Loading..." }
                            </td>
                            <td>
                                {this.props.loaded? this.numWithCommas(arrow(this.props.data.deaths)):"Loading..." }
                            </td>
                            <td>
                                {this.props.loaded? this.numWithCommas(arrow(this.props.data.recovered)):"Loading..." }
                            </td>
                            <td>
                                {this.props.loaded? this.numWithCommas(arrow(this.props.data.active_cases_change)):"Loading..." }
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