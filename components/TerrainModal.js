import './TerrainModal.module.scss'

const VALID_TERRAINS = [
  'desert',
  'forest',
  'hills',
  'jungle',
  'marsh',
  'mountain',
  'plains',
  'water'
]

function TerrainModal({ onSubmit }) {
  return (
    <div className="terrain-modal">
      <div className="terrain-modal__header">
        <div className="icon icon--circle">
          <i class="fas fa-island-tropical" />
        </div>
        <div className="terrain-modal__title">
          Choose terrain
        </div>
      </div>
      <div className="terrain-modal__content">
        <ul className="terrain-list">
          {VALID_TERRAINS.map(terrain => (
            <li key={terrain}>
              <button className="terrain-list__option" onClick={() => onSubmit({ terrain })}>
                <img src={`./${terrain}-1.png`} />
                <div className="terrain-list__name">{terrain}</div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="terrain-modal__footer">
        <button className="button button--link">Cancel</button>
        <button className="button button--action">Next</button>
      </div>
    </div>
  )
}

export default TerrainModal
