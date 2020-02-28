import { Component } from 'react'
import './KingdomCheckPanel.module.scss'

const PanelAttributes = {
  economy: {
    description:
      'Economy measures the productivity of your kingdom’s workers and the vibrancy of its trade, both in terms of money and in terms of information, innovation, and technology.',
    icon: 'fas fa-gem',
    title: 'Economy'
  },
  loyalty: {
    description:
      'Loyalty refers to the sense of goodwill among your people, their ability to live peaceably together even in times of crisis, and to fight for one another when needed.',
    icon: 'fad fa-users-crown',
    title: 'Loyalty'
  },
  stability: {
    description:
      'Stability refers to the physical and social well-being of the kingdom, from the health and security of its citizenry to the vitality of its natural resources and its ability to maximize their use.',
    icon: 'far fa-balance-scale-right',
    title: 'Stability'
  }
}

interface KingdomCheckPanelProps {
  attribute: 'economy' | 'loyalty' | 'stability'
  dc: number
  bonus: number
}

class KingdomCheckPanel extends Component<KingdomCheckPanelProps> {
  render() {
    const { attribute, bonus, dc } = this.props
    const attributeDetails = PanelAttributes[attribute]

    return (
      <div className="notification is-primary kingdom-check-panel">
        <div className="content">
          <p className="title">
            <i
              className={`fa-fw ${attributeDetails.icon}`}
              style={{ marginRight: '8px' }}
            />
            {attributeDetails.title} Check
          </p>
        </div>
        <p className="content">{attributeDetails.description}</p>

        <div className="box">
          <h2 className="content subtitle has-text-centered">
            Roller: Jenna Hoole - Captain Tito (Warden)
          </h2>

          <nav className="level">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Control DC</p>
                <p className="title">{dc}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">{attributeDetails.title}</p>
                <p className="title">+{bonus}</p>
              </div>
            </div>
          </nav>

          <nav className="level">
            <div className="level-item has-text-centered">
              <nav className="field is-grouped">
                <p className="control">
                  <button className="button is-danger is-outlined">
                    <span className="icon">
                      <i className="fas fa-times" />
                    </span>
                    <span>Failed by 5 or more</span>
                  </button>
                </p>
                <p className="control">
                  <button className="button is-danger is-outlined">
                    <span className="icon">
                      <i className="fas fa-times" />
                    </span>
                    <span>Failed by 4 or less</span>
                  </button>
                </p>
                <p className="control">
                  <button className="button is-success is-outlined">
                    <span className="icon">
                      <i className="fas fa-check" />
                    </span>
                    <span>Succeeded</span>
                  </button>
                </p>
              </nav>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

export default KingdomCheckPanel
