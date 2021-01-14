import React, { Component  } from 'react';
import './Questionnaire.css';
import jsonData from '../../assets/questionnaire.json';

export class QuestionnaireComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        subGroups: [],
        someUserInput: undefined,
        checkboxInput: false,
        checked: true,
        allergies: false,
        gender: '',
        birthplace: '',
        dob: '',
        maritalStatus: '',
        smoke: false,
        alcohol: false,
        disableSubmitButton: false
        };
  }

  checkIfSubmitButtonHasToBeEnabledOnDisabled = ()=> {
    if((this.state.allergies || !this.state.allergies) &&
    this.state.gender &&
    this.state.dob &&
    this.state.birthplace &&
    this.state.maritalStatus && 
    (this.state.smoke || !this.state.smoke) && 
    (this.state.alcohol || !this.state.alcohol)) {
        this.setState({
            disableSubmitButton: true
        });
}
  };

  
    captureUserInput = (event, abrvIndexName, htmlControlType) => {

        if(abrvIndexName === 'allergies' && htmlControlType === 'checkbox') {
            this.setState({ checked: !this.state.checked });
            this.setState({
                allergies: this.state.checked
            });
            this.checkIfSubmitButtonHasToBeEnabledOnDisabled();
        }

        if(abrvIndexName === 'smoke' && htmlControlType === 'checkbox') {
            this.setState({ checked: !this.state.checked });
            this.setState({ smoke: this.state.checked });
            this.checkIfSubmitButtonHasToBeEnabledOnDisabled();
        }

        if(abrvIndexName === 'alcohol' && htmlControlType === 'checkbox') {
            this.setState({ checked: !this.state.checked });
            this.setState({ alcohol: this.state.checked});
            this.checkIfSubmitButtonHasToBeEnabledOnDisabled();
        }

        if(abrvIndexName === 'gender' && htmlControlType === 'textbox') {
            this.setState({
                gender: event.target.value
            });
            this.checkIfSubmitButtonHasToBeEnabledOnDisabled();
        }

        if(abrvIndexName === 'maritalStatus' && htmlControlType === 'textbox') {
            this.setState({
                maritalStatus: event.target.value
            });
            this.checkIfSubmitButtonHasToBeEnabledOnDisabled();
        }

        if(abrvIndexName === 'birthplace' && htmlControlType === 'textbox') {
            this.setState({
                birthplace: event.target.value
            });
            this.checkIfSubmitButtonHasToBeEnabledOnDisabled();
        }

        if(abrvIndexName === 'dob' && htmlControlType === 'textbox') {
            this.setState({
                dob: event.target.value
            });
            this.checkIfSubmitButtonHasToBeEnabledOnDisabled();
        }
  };


renderExampleFormGroups() {

    const data = jsonData.mainModalObject;
    return data.map((group, j) => {
        if(group.text !== 'General questions' && group.text !== 'Intoxications') {
            return <div className="form-group row" key={j}>

            <label htmlFor={group.abrvIndexName}
                   className="col-sm-5">
                {group.text}
            </label>

             <div className="col-sm-7">
                 {group.htmlControlType === 'textbox' ?
                 <input type={group.htmlControlType}
                 className="form-control"
                 id={group.abrvIndexName}
                 placeholder={group.abrvIndexName}
                 value={group.htmlControlType === 'textbox' ?  this.state.someUserInput : this.state.checkboxInput}
                 onChange={(e)=>this.captureUserInput(e, group.abrvIndexName, group.htmlControlType)}/> : 
                 <input type={group.htmlControlType}
                         className="form-control"
                         id={group.abrvIndexName}
                         placeholder={group.abrvIndexName}
                         onChange={(e)=>this.captureUserInput(e, group.abrvIndexName, group.htmlControlType)}/>}
              </div>
        </div>
        }
    });
};

renderExampleSubgroupFormGroups() {
  
    const subGroupData = this.state.subGroups;
     return subGroupData.map(group => {
         return group.items.map((each, i) => {
                return (<div className="form-group row" key={i}>
            <label htmlFor={each.abrvIndexName}
                   className="col-sm-5">
                {each.text}
            </label>

             <div className="col-sm-7">
             {each.htmlControlType === 'textbox' ?
                 <input type={each.htmlControlType}
                 className="form-control"
                 id={each.abrvIndexName}
                 placeholder={each.abrvIndexName}
                 value={each.htmlControlType === 'textbox' ?  this.state.someUserInput : this.state.checkboxInput}
                 onChange={(e)=>this.captureUserInput(e, each.abrvIndexName, each.htmlControlType)}/> : 
                 <input type={each.htmlControlType}
                         className="form-control"
                         id={each.abrvIndexName}
                         placeholder={each.abrvIndexName}
                         onChange={(e)=>this.captureUserInput(e, each.abrvIndexName, each.htmlControlType)}/>}
              </div>
        </div>)
        })
    });
};

_handleSubmit = () => {

    let userResponse = {
        allergies: this.state.allergies,
        gender: this.state.gender,
        birthplace: this.state.birthplace,
        dob: this.state.dob,
        maritalStatus: this.state.maritalStatus,
        smoke: this.state.smoke,
        alcohol: this.state.alcohol,
        gender: this.state.gender
    }
    console.log('all form value available for api call ', userResponse);
    
    alert(JSON.stringify(userResponse));
};

  render() {

    const data = jsonData.mainModalObject;
    this.state.subGroups = data.filter(a => a.hasOwnProperty('items') && a['items'].length > 0);
    
    return(
        <div className="container">
        <div className="panel panel-primary">
            <div className="panel-heading" style={{marginBottom:'20px'}}>DYNAMIC FORM USING QUESTIONNAIRE JSON DATA</div>
            <div className="panel-body">
                <form className="form-horizontal">
                {this.renderExampleFormGroups()}
                {this.state.subGroups.length ? this.renderExampleSubgroupFormGroups() : ''}
                </form>
                <div className="row">
                    <span className="col-sm-5"></span>
                    <span className="col-sm-5" style={{width: '300px', margin: 'auto', textAlign: 'center'}}>
                    <button className={this.state.disableSubmitButton ? "btn-danger" : "btn-default disableSubmitButton"}
                    onClick={() => {
                        this._handleSubmit('');
                      }}>Submit button</button>
                    </span>
                </div>
            </div>      
        </div>
    </div>
    );
  }
}


export default QuestionnaireComp;