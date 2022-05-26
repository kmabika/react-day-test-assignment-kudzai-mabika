import React, {PureComponent} from 'react';
import ProgressBar from './ProgressBar.component';

import * as stepsObject from "SourceRoute/Checkout/Checkout.config";

export class ProgressBarContainer extends PureComponent {

    constructor(props){
        super(props);
        const filteredSteps = Object.keys(stepsObject).filter((key) => key.includes("STEP")).slice(0,2);
        const stepAlt = filteredSteps.map((step) => {return { name: step.split("_")[0].charAt(0) +
        step.split("_")[0].slice(1).toString().toLowerCase(), isCompleted: false}});
        this.state = {stepList: stepAlt};
        this.updateSelectedSteps = this.updateSelectedSteps.bind(this);
    };


    updateSelectedSteps(name, itemAttributes) {
        let index = this.state.stepList.findIndex(x=> x.name.toLowerCase() === name.toLowerCase());
        if (index === -1){
            console.error('Not found')
        }
        else
          this.setState({
            stepList: [
               ...this.state.stepList.slice(0,index),
               Object.assign({}, this.state.stepList[index], itemAttributes),
               ...this.state.stepList.slice(index+1)
            ]
          });
    }

    containerProps(){
        const {activeStep} = this.props;
        return{
            activeStep,
            steps: this.state.stepList,
            updateSelectedSteps: this.updateSelectedSteps,
        }
    }

    render(){
        return(
            <ProgressBar {...this.containerProps()}/>
        )
    }
}

export default ProgressBarContainer;