import React, { Component } from "react";
import { getPatients } from "./services";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import DisplayPatientsInformation from './components/fetchAndDisplayPatients';
import QuestionnaireComp from './components/Questionnaire/Questionnaire';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
           patientsState: undefined
        };
  }
  componentDidMount() {
    getPatients().then((res) => {
      if(res) {
        this.setState({
          patientsState: res
        });
      }
    });
  }

  // componentDidUpdate() {
    
  // }

  render() {

    return(
      <div className="mainApp">
        <QuestionnaireComp/>
      </div>
    )
  }
}

export default App;
