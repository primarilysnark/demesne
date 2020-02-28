import { Component, Fragment } from 'react'
import { Phases } from './_phases'
import KingdomCheckPanel from '../../components/KingdomCheckPanel'

interface KingdomPhaseWizardProps {
  router: any
}

interface KingdomPhaseWizardState {
  stepIndex: number
  wizard: {
    isActive: boolean
  }
}

class KingdomPhaseWizard extends Component<
  KingdomPhaseWizardProps,
  KingdomPhaseWizardState
> {
  constructor(props: KingdomPhaseWizardProps) {
    super(props)

    this.state = {
      stepIndex: 0,
      wizard: {
        isActive: false
      }
    }

    this.advanceWizard = this.advanceWizard.bind(this)
    this.startWizard = this.startWizard.bind(this)
  }

  startWizard() {
    this.setState(state => ({
      wizard: {
        ...state.wizard,
        isActive: true
      }
    }))
  }

  advanceWizard() {
    this.setState(state => ({
      stepIndex: state.stepIndex + 1
    }))
  }

  render() {
    const { stepIndex } = this.state
    const adjustment = Math.min(stepIndex, Phases.Upkeep.length - 2)

    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Upkeep Phase</h1>
          <h2 className="subtitle">
            Check kingdom stability, pay costs, and deal with unrest
          </h2>

          <div
            className="tile is-ancestor"
            style={{
              transition: `transform 0.2s`,
              transform: `translate(-${25 * adjustment}%)`
            }}
          >
            {Phases.Upkeep.map((phase, index) => {
              const isPassed = stepIndex > index
              const isCurrent = stepIndex === index

              return (
                <Fragment key={phase.title}>
                  <div className="tile is-parent is-3">
                    <div
                      className={`tile is-child notification ${
                        isPassed ? 'is-success' : ''
                      } ${isCurrent ? 'is-black' : ''}`}
                    >
                      {isPassed ? (
                        <div className="tile-overlay">
                          <i className="fa fa-check" />
                        </div>
                      ) : null}

                      <div className="content">
                        <p className="title">{phase.title}</p>
                        {phase.description.map(paragraph => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {isCurrent ? (
                    <div className="tile is-parent is-6">
                      <div className="tile is-child">
                        <KingdomCheckPanel
                          attribute="stability"
                          bonus={17}
                          dc={23}
                        />
                      </div>
                    </div>
                  ) : null}
                </Fragment>
              )
            })}
          </div>
        </div>
      </section>
    )
  }
}

export default KingdomPhaseWizard
