function KingdomTerminologyPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Kingdom Terminology</h1>
        <h2 className="subtitle">
          Check kingdom stability, pay costs, and deal with unrest
        </h2>

        <div className="tile is-ancestor">
          <div className="tile is-parent is-4">
            <div className="tile is-child notification">
              <div className="content">
                <p className="title">Alignment</p>
                <p>
                  Like a PC, a kingdom has an alignment, which is decided when
                  the kingdom is formed. The kingdom’s alignment represents the
                  majority outlook and behavior of the people within that
                  kingdom when they’re considered as a group. (Individual
                  citizens and even some leaders may be of different
                  alignments.)
                </p>
              </div>
            </div>
          </div>

          <div className="tile is-parent is-4">
            <div className="tile is-child notification">
              <div className="content">
                <p className="title">Build Points (BP)</p>
                <p>
                  Build points (or BP for short) are the measure of your
                  kingdom’s resources—equipment, labor, money, and so on.
                  They’re used to acquire new hexes and develop additional
                  buildings, settlements, and terrain improvements. Your kingdom
                  also consumes BP to maintain itself.
                </p>
              </div>
            </div>
          </div>

          <div className="tile is-parent is-4">
            <div className="tile is-child notification">
              <div className="content">
                <p className="title">Consumption</p>
                <p>
                  Consumption indicates how many BP are required to keep the
                  kingdom functioning each month. Your kingdom’s Consumption is
                  equal to its Size, modified by settlements and terrain
                  improvements (such as Farms and Fisheries). Consumption can
                  never go below 0.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="tile is-ancestor">
          <div className="tile is-parent is-4">
            <div className="tile is-child notification">
              <div className="content">
                <p className="title">Control DC</p>
                <p>
                  Some kingdom actions require a check (1d20 + modifiers) to
                  succeed – this is known as a control check. The base DC for a
                  control check is equal to 20 + the kingdom's Size in hexes +
                  the total number of districts in all your settlements + any
                  other modifiers from special circumstances or effects. Unless
                  otherwise stated, the DC of a kingdom check is the Control DC.
                </p>
              </div>
            </div>
          </div>

          <div className="tile is-parent is-4">
            <div className="tile is-child notification">
              <div className="content">
                <p className="title">Economy</p>
                <p>
                  This attribute measures the productivity of your kingdom’s
                  workers and the vibrancy of its trade, both in terms of money
                  and in terms of information, innovation, and technology. Your
                  kingdom’s initial Economy is 0 plus your kingdom’s alignment
                  and leadership modifiers.
                </p>
              </div>
            </div>
          </div>

          <div className="tile is-parent is-4">
            <div className="tile is-child notification">
              <div className="content">
                <p className="title">Kingdom Check</p>
                <p>
                  A kingdom has three attributes: Economy, Loyalty, and
                  Stability. Your kingdom’s initial scores in each of these
                  attributes is 0, plus modifiers for kingdom alignment, bonuses
                  provided by the leaders, and any other modifiers.
                </p>
                <p>
                  Many kingdom actions and events require you to attempt a
                  kingdom check, either using your Economy, Loyalty, or
                  Stability attribute (1d20 + the appropriate attribute + other
                  modifiers). You cannot take 10 or take 20 on a kingdom check.
                  Kingdom checks automatically fail on a natural 1 and
                  automatically succeed on a natural 20.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="tile is-ancestor">
          <div className="tile is-parent is-4">
            <div className="tile is-child notification">
              <div className="content">
                <p className="title">Loyalty</p>
                <p>
                  Loyalty refers to the sense of goodwill among your people,
                  their ability to live peaceably together even in times of
                  crisis, and to fight for one another when needed. Your
                  kingdom’s initial Loyalty is 0 plus your kingdom’s alignment
                  and any modifiers from your kingdom’s leadership role.
                </p>
              </div>
            </div>
          </div>

          <div className="tile is-parent is-4">
            <div className="tile is-child notification">
              <div className="content">
                <p className="title">Population</p>
                <p>
                  Actual population numbers don’t factor into your kingdom’s
                  statistics, but can be fun to track anyway.
                </p>
              </div>
            </div>
          </div>

          <div className="tile is-parent is-4">
            <div className="tile is-child notification">
              <div className="content">
                <p className="title">Size</p>
                <p>
                  This is how many hexes the kingdom claims. A new kingdom’s
                  Size is 1.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default KingdomTerminologyPage
