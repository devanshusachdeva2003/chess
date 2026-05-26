const express = require('express')
const cors = require('cors')
const { Chess } = require('chess.js')

const app = express()
app.use(cors())
app.use(express.json())

const games = {}

function getGame(id = 'default') {
  if (!games[id]) games[id] = new Chess()
  return games[id]
}

function boardToUnicode(board) {
  const black = { p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚' }
  const white = { p: '♙', r: '♖', n: '♘', b: '♗', q: '♕', k: '♔' }
  return board.map((row) =>
    row.map((cell) => {
      if (!cell) return ''
      return cell.color === 'w' ? white[cell.type] : black[cell.type]
    }),
  )
}

app.get('/game/state', (req, res) => {
  const id = req.query.id || 'default'
  const chess = getGame(id)
  res.json({ fen: chess.fen(), board: boardToUnicode(chess.board()), turn: chess.turn(), history: chess.history() })
})

app.post('/game/new', (req, res) => {
  const id = req.query.id || 'default'
  games[id] = new Chess()
  const chess = games[id]
  res.json({ ok: true, fen: chess.fen(), board: boardToUnicode(chess.board()) })
})

app.post('/game/move', (req, res) => {
  const id = req.query.id || 'default'
  const { from, to, promotion } = req.body || {}
  if (!from || !to) return res.status(400).json({ error: 'from and to required' })
  const chess = getGame(id)
  const moveObj = { from, to }
  if (promotion) moveObj.promotion = promotion
  const result = chess.move(moveObj)
  if (!result) return res.status(400).json({ error: 'illegal move' })
  res.json({ ok: true, move: result, fen: chess.fen(), board: boardToUnicode(chess.board()), turn: chess.turn(), history: chess.history(), in_check: chess.in_check(), in_checkmate: chess.in_checkmate(), in_draw: chess.in_draw() })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Chess backend listening on ${PORT}`))
