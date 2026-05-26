# Chess Backend

Lightweight Express backend for chess game state using chess.js.

Quick start:

```bash
cd backend
npm install
npm run start
```

API:
- `GET /game/state` — returns JSON: `{ fen, board, turn, history }`.
- `POST /game/new` — resets default game.
- `POST /game/move` — body `{ from, to, promotion? }` applies move and returns updated state.
