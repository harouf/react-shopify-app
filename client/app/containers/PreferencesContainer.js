import React, { Component } from 'react'
import PropTypes from 'prop-types'
import connectToStores from 'alt-utils/lib/connectToStores'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import { ResponsiveDialog } from 'common-frontend'
import { Loading } from 'components'

import { ExtendedUserActions } from 'actions'
import { ExtendedUserStore } from 'stores'


const styles = {
  radioButton: { marginBottom: '10px' }
}

@connectToStores
export default class PreferencesContainer extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    currentUser: React.PropTypes.object,
  }

  static propTypes = {
    shopifyUserUpdateLoading: PropTypes.bool,
    shopifyUserUpdateSuccess: PropTypes.bool,
  }

  static getStores() {
    return [ExtendedUserStore]
  }

  static getPropsFromStores() {
    return ExtendedUserStore.getState()
  }

  constructor(props) {
    super(props)
    this.state = {
      stepIndex: 0,
      imageOptimMode: 'auto',
      imageCompressMode: 'lossless',
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.shopifyUserUpdateSuccess && newProps.shopifyUserUpdateSuccess) {
      this.context.router.push('/dashboard')
    }
  }

  handleNext = () => {
    const { stepIndex, imageOptimMode, imageCompressMode } = this.state
    if (stepIndex < 1) {
      this.setState({ stepIndex: stepIndex + 1 })
    } else {
      ExtendedUserActions.updateCurrent(this.context.currentUser.accessToken, {
        imageOptimMode,
        imageCompressMode
      })
    }
  }

  handlePrev = () => {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 })
    }
  }

  onChangeImageOptimMode = (event, value) => this.setState({ imageOptimMode: value })

  onChangeImageCompressMode = (event, value) => this.setState({ imageCompressMode: value })

  getStepContent(stepIndex) {
    const { imageOptimMode, imageCompressMode } = this.state
    switch (stepIndex) {
      case 0:
        return (
          <div className="preferences-block">
            <div className="preference-option" style={{ marginBottom: '20px' }}>
              <h5 style={styles.radioButton}>Run Mode</h5>
              <RadioButtonGroup
                name="imageOptimMode"
                valueSelected={imageOptimMode}
                onChange={this.onChangeImageOptimMode}
              >
                <RadioButton value="auto" label="Automatic" style={styles.radioButton} />
                <RadioButton value="manual" label="Manual" style={styles.radioButton} />
              </RadioButtonGroup>
            </div>
            <div className="preference-option">
              <h5 style={styles.radioButton}>Compress Mode</h5>
              <RadioButtonGroup
                name="imageCompressMode"
                valueSelected={imageCompressMode}
                onChange={this.onChangeImageCompressMode}
              >
                <RadioButton value="lossless" label="Lossless" style={styles.radioButton} />
                <RadioButton value="lossy" label="Lossy" style={styles.radioButton} />
              </RadioButtonGroup>
            </div>
          </div>
        )
      case 1:
        return <p style={{ textAlign: 'center' }}>You are all set, good to go!</p>
      default:
        return ''
    }
  }

  render() {
    const { shopifyUserUpdateLoading } = this.props
    const { stepIndex } = this.state
    const contentStyle = { margin: '0 16px' }
    return (
      <ResponsiveDialog
        title={
          <div className="branding-banner branding-banner--blimpon" style={{ backgroundColor: config.brandingColour, height: '60px', textAlign: 'center', overflow: 'hidden', padding: '10px' }}>
            <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={config.logo} />
          </div>
        }
        open={true}
        modal={true}
      >
        <div style={{ padding: '24px 24px 0 24px' }}>
          <h2 style={{ marginBottom: '9px' }}>Preferences</h2>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Image Optimzation</StepLabel>
            </Step>
            <Step>
              <StepLabel>Done!</StepLabel>
            </Step>
          </Stepper>
          <div style={{ marginBottom: '10px' }}>
            {this.getStepContent(stepIndex)}
            <div style={{ marginTop: 12, textAlign: 'center' }}>
              <FlatButton
                label="Back"
                disabled={ stepIndex === 0 }
                onTouchTap={this.handlePrev}
                style={{ marginRight: 12 }}
              />
              <RaisedButton
                label={stepIndex === 1 ? 'Finish' : 'Next'}
                primary={true}
                onTouchTap={this.handleNext}
              />
            </div>
          </div>
          {shopifyUserUpdateLoading && <Loading />}
        </div>
      </ResponsiveDialog>
    )
  }
}
