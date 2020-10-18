import React from 'react';
import '../App.css';

class Summary extends React.Component{
    numWithCommas=(x)=> {
        if (x != null)
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return x
    }
    render(){
        return(
            <div>
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