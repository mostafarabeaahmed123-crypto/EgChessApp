import { useMemo, useState } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'

function App() {
  const [game, setGame] = useState(() => new Chess())

  const status = useMemo(() => {
    if (game.isCheckmate()) {
      return `Checkmate - ${game.turn() === 'w' ? 'Black' : 'White'} wins`
    }
    if (game.isDraw()) return 'Draw'
    if (game.isCheck()) return `Check - ${game.turn() === 'w' ? 'White' : 'Black'} to move`
    return `${game.turn() === 'w' ? 'White' : 'Black'} to move`
  }, [game])

  const makeMove = (from: string, to: string) => {
    const copy = new Chess(game.fen())
    const move = copy.move({
      from,
      to,
      promotion: 'q',
    })

    if (!move) return false
    setGame(copy)
    return true
  }

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    return makeMove(sourceSquare, targetSquare)
  }

  const resetGame = () => {
    setGame(new Chess())
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <h1>EG Chess</h1>
        <button onClick={resetGame}>New Game</button>
      </header>

      <main className="content">
        <section className="board-wrap">
          <Chessboard
            id="eg-chess-board"
            position={game.fen()}
            onPieceDrop={onDrop}
            boardWidth={520}
            areArrowsAllowed
            animationDurationInMs={120}
            customDarkSquareStyle={{ backgroundColor: '#769656' }}
            customLightSquareStyle={{ backgroundColor: '#eeeed2' }}
          />
        </section>

        <section className="side-info">
          <h2>Game Status</h2>
          <p>{status}</p>

          <h3>PGN</h3>
          <pre>{game.pgn() || 'No moves yet'}</pre>
        </section>
      </main>
    </div>
  )
}

export default App
