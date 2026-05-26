import './App.css'

const navItems = ['Play', 'Puzzles', 'Learn', 'Leaderboard']
const menuItems = [
  ['Play Online', '♙'],
  ['Play with Friend', '♘'],
  ['AI Bot', '♗'],
  ['Tournaments', '♕'],
]
const stats = [
  ['Games Played', '128'],
  ['Wins', '78'],
  ['Losses', '45'],
  ['Draws', '5'],
  ['Win Rate', '60.9%'],
]
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const ranks = [8, 7, 6, 5, 4, 3, 2, 1]
const board = [
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  ['♟', '♟', '♟', '♟', '', '♟', '♟', '♟'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '♟', '', '', ''],
  ['', '', '', '', '♙', '', '', ''],
  ['', '', '', '', '', '♘', '', ''],
  ['♙', '♙', '♙', '♙', '', '♙', '♙', '♙'],
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
]
const moves = [
  ['1.', 'e4', 'e5'],
  ['2.', 'Nf3', '-'],
]
const messages = [
  ['Alex', 'Good luck!', '10:15 AM'],
  ['You', 'You too!', '10:16 AM'],
  ['Alex', 'Thanks 🙂', '10:16 AM'],
]

function Avatar({ name, online = false }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

  return (
    <div className="avatar" aria-label={name}>
      <span>{initials}</span>
      {online && <i />}
    </div>
  )
}

function PlayerCard({ name, rating, time, side }) {
  return (
    <section className={`player-card ${side}`}>
      <div className="player-details">
        <Avatar name={name} online />
        <div>
          <strong>{name}</strong>
          <small>
            <span className="status-dot" />
            {rating}
          </small>
        </div>
      </div>
      <time>{time}</time>
    </section>
  )
}

function App() {
  return (
    <main className="arena-shell">
      <aside className="sidebar">
        <a className="brand" href="#">
          <span>♜</span>
          Chess Arena
        </a>

        <button className="new-game">+ New Game</button>

        <nav className="side-nav" aria-label="Game modes">
          {menuItems.map(([label, icon], index) => (
            <a className={index === 0 ? 'active' : ''} href="#" key={label}>
              <span>{icon}</span>
              {label}
            </a>
          ))}
        </nav>

        <div className="stats-panel">
          <p>Your Stats</p>
          {stats.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <div className="goal-card">
          <strong>Daily Goal</strong>
          <span>Play 3 games</span>
          <div className="progress">
            <i />
          </div>
          <small>2 / 3</small>
        </div>

        <div className="utility-row">
          <button aria-label="Settings">⚙</button>
          <button aria-label="Help">?</button>
          <button aria-label="Theme">☾</button>
        </div>
      </aside>

      <section className="main-stage">
        <header className="topbar">
          <nav className="top-nav" aria-label="Primary">
            {navItems.map((item, index) => (
              <a className={index === 0 ? 'active' : ''} href="#" key={item}>
                {item}
              </a>
            ))}
          </nav>

          <div className="top-actions">
            <button aria-label="Notifications">♧</button>
            <button aria-label="Friends">♙</button>
            <div className="profile">
              <Avatar name="John Doe" online />
              <div>
                <strong>John Doe</strong>
                <span>Rating: 1420</span>
              </div>
              <b>⌄</b>
            </div>
          </div>
        </header>

        <div className="game-grid">
          <section className="board-column">
            <PlayerCard name="Alex Thompson" rating="1350" time="09:48" side="opponent" />

            <div className="board-wrap" aria-label="Chess board">
              <div className="rank-labels">
                {ranks.map((rank) => (
                  <span key={rank}>{rank}</span>
                ))}
              </div>
              <div className="chessboard">
                {board.flatMap((row, rowIndex) =>
                  row.map((piece, colIndex) => (
                    <button
                      className={`square ${(rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark'} ${
                        piece ? 'occupied' : ''
                      }`}
                      key={`${rowIndex}-${colIndex}`}
                      aria-label={`${files[colIndex]}${ranks[rowIndex]} ${piece || 'empty'}`}
                    >
                      {piece}
                    </button>
                  )),
                )}
              </div>
              <div className="file-labels">
                {files.map((file) => (
                  <span key={file}>{file}</span>
                ))}
              </div>
            </div>

            <PlayerCard name="John Doe" rating="1420" time="09:56" side="self" />
          </section>

          <aside className="info-column">
            <section className="panel game-info">
              <div className="panel-title">
                <h2>Game Info</h2>
                <span>
                  <i />
                  Online
                </span>
              </div>
              <dl>
                <div>
                  <dt>Game Type</dt>
                  <dd>Standard</dd>
                </div>
                <div>
                  <dt>Time Control</dt>
                  <dd>10 min</dd>
                </div>
                <div>
                  <dt>Turn</dt>
                  <dd>White</dd>
                </div>
              </dl>
            </section>

            <section className="panel">
              <h2>Move History</h2>
              <div className="moves">
                {moves.map(([number, white, black]) => (
                  <div key={number}>
                    <span>{number}</span>
                    <strong>{white}</strong>
                    <b>{black}</b>
                  </div>
                ))}
              </div>
            </section>

            <section className="panel chat-panel">
              <h2>Chat</h2>
              <div className="messages">
                {messages.map(([sender, text, time]) => (
                  <p key={`${sender}-${text}`}>
                    <strong>{sender}:</strong>
                    <span>{text}</span>
                    <time>{time}</time>
                  </p>
                ))}
              </div>
              <form className="chat-form">
                <input aria-label="Message" placeholder="Type a message..." />
                <button>Send</button>
              </form>
            </section>

            <div className="game-actions">
              <button>
                <span>♙</span>
                Offer Draw
              </button>
              <button>
                <span>⚑</span>
                Resign
              </button>
              <button>
                <span>⊕</span>
                New Game
              </button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default App
