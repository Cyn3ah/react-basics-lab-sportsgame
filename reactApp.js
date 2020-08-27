class Team extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      shots: 0,
      score: 0
    }

    this.shotSound = new Audio('./assets/audio/smb_fireball.wav')
    this.scoreSound = new Audio('assets/audio/smb_1-up.wav')
  }

  shotHandler = () => {
    let score = this.state.score
    this.shotSound.play()

    if (Math.random() > 0.5) {
      score += 1

      setTimeout(() => {
        this.scoreSound.play()
      }, 100)
    }

    this.setState((state, props) => ({
      shots: state.shots + 1,
      score
    }))
  }

  render() {
    let shotPercentageDiv

    if (this.state.shots) {
      const shotPercentage = Math.round((this.state.score / this.state.shots) * 100)
      shotPercentageDiv = (
        <div>
          <strong>Shooting %: {shotPercentage}</strong>
        </div>
      )
    }

    return (
      <div className="Team">
        <h2>{this.props.name}</h2>

        <div className="identity">
          <img src={this.props.logo} alt={this.props.name} />
        </div>

        <div>
          <strong>Shots:</strong> {this.state.shots}
        </div>

        <div>
          <strong>Score:</strong> {this.state.score}
        </div>

        {shotPercentageDiv}

        <button onClick={this.shotHandler}>Shoot!</button>
      </div>
    )
  }
}

function Game(props) {
  return (
    <div className="Game">
      <h1>Welcome to {props.venue}</h1>
      <div className="stats">
        <Team 
        name={props.visitingTeam.name}
        logo={props.visitingTeam.logoSrc}
        />

      <div className="versus">
        <h1>VS</h1>
      </div>

        <Team 
        name={props.homeTeam.name}
        logo={props.homeTeam.logoSrc}
        />
      </div>
    </div>
  )
}

function App(props) {
  const teamQ = {
    name: "Team 'Q'",
    logoSrc: '/assets/images/Q_portrait_2.jpg'
  }

  const teamGV = {
    name: "Team 'GV'",
    logoSrc: '/assets/images/GuinanVendetta.jpg'
  }

  const romuels = {
    name: "Romuels",
    logoSrc: '/assets/images/ParemTheRomulan.jpg'
  }

  const romulettes = {
    name: "Romulettes",
    logoSrc: '/assets/images/RomulanCommander.jpg'
  }

  return (
    <div className="App">
      <Game 
        venue="USSE Stadium"
        homeTeam={teamQ}
        visitingTeam={teamGV}
      />

      <Game 
      venue="Romulan Arena"
      homeTeam={romulettes}
      visitingTeam={romuels}
      />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);