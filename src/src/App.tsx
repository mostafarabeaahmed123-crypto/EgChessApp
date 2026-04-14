import { useMemo, useState } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'

export default function App() {
  const [game, setGame] = useState(() => new Chess())

  const status = useMemo(() => {
    if (game.isCheckmate()) return `Checkmate - ${game.turn() === 'w' ? 'Black' : 'White'} wins`
    if (game.isDraw()) return 'Draw'
    if (game.isCheck()) return `Check - ${game.turn() === 'w' ? 'White' : 'Black'} to move`
    return `${game.turn() === 'w' ? 'White' : 'Black'} to move`
  }, [game])

  const onDrop = (from: string, to: string) => {
    const c = new Chess(game.fen())
    const m = c.move({ from, to, promotion: 'q' })
    if (!m) return false
    setGame(c)
    return true
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>EG Chess</h1>
      <Chessboard
        id="board"
        position={game.fen()}
        onPieceDrop={onDrop}
        boardWidth={520}
        animationDurationInMs={120}
      />
      <p>{status}</p>
    </div>
  )
}
