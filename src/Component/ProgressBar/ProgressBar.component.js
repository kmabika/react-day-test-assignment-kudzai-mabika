import React, { Component } from "react";
import "./ProgressBar.styles";

class ProgressBar extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.activeStep !== undefined && prevProps.activeStep !== undefined) {
      if (this.props.activeStep !== prevProps.activeStep) {
        if (prevProps.activeStep !== undefined) {
          const str = prevProps.activeStep;
          const str2 = str.charAt(0).toUpperCase() + str.slice(1);
          this.props.updateSelectedSteps(prevProps.activeStep, { name: str2, isCompleted: true });
        };
      };
    };
  };

  renderSvgTick() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" 
      aria-hidden="true" role="img" width="1em" 
      height="1em" preserveAspectRatio="xMidYMid 
      meet" viewBox="0 0 16 16"><path fill="none" 
      stroke="#fff" strokeLinecap="round" 
      strokeLinejoin="round" strokeWidth="1.5" 
      d="m2.75 8.75l3.5 3.5l7-7.5" />
      </svg>
    )
  }

  renderCheckOutSteps() {
    const { steps, activeStep } = this.props;

    return (
      <>
        {steps.map((step, i) => (
          <div className="CheckoutStepsWrapper" key={i}>
            {i > 0 && i < steps.length ? (
              <div className="CenterProgressBarLine ProgressBarLine">
                {(activeStep.toLowerCase() === step.name.toLowerCase() || step.isCompleted) && (
                  <div className="ActiveProgressBarLine" />
                )}
              </div>
            ) : ""}
            <div className="CheckoutStepContentWrapper">
              <div className={`${activeStep.toLowerCase() === step.name.toLowerCase()  ? "ActiveCheckStepIndicator ": 'CheckStepIndicator'}`}>
                <div className="StepContent">
                  {step.isCompleted ? (this.renderSvgTick()) : (i + 1)}
                </div>
                {(activeStep.toLowerCase() === step.name.toLowerCase() || step.isCompleted) && (
                  <div className="ActiveStep" />
                )}
              </div>
              <p className={`${activeStep.toLowerCase() === step.name.toLowerCase() || step.isCompleted ? "ActiveCheckStepName ": 'StepNameWrapper'}`}>{step.name}</p>
            </div>
          </div>
        ))}
      </>
    )
  }

  renderProgressBar() {
    const { steps, activeStep} = this.props;
    return (
      <div className="ProgressBarWrapper">
        {steps.length > 0 && 
        ( <div className={`ProgressBarLine`}>
            <div className="ActiveProgressBarLine"></div>
        </div>)
        }
        {this.renderCheckOutSteps()}
        <div className="ProgressBarLine">
          <div
            className={`${activeStep === 'success' ? 'ActiveProgressBarLine' : ""}`}
          />
        </div>
      </div>
    )
  }

  render() {
    return (this.renderProgressBar())

  }
}

export default ProgressBar;
