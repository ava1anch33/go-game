import {
    getLegalMoves,
    cloneBoard,
    setStone,
    hasLiberty,
    captureGroups,
    getStoneIntArrayPosition,
    getStone2DPosition,
} from './board.js'

/**
 * A simple AI for Go using Monte Carlo Tree Search (MCTS).
 * It performs random simulations to evaluate moves and selects the one with the most wins.
 */
class SimpleGoAI {
    constructor(board, simulations = 5) {
        this.board = board
        this.simulations = simulations
        this.SIZE = 19
    }

    // random rollout
    simulate(color) {
        let simBoard = cloneBoard(this.board)
        let current = color

        while (true) {
            const moves = getLegalMoves(simBoard, current)
            if (moves.length === 0) break

            const move = moves[Math.floor(Math.random() * moves.length)]
            setStone(simBoard, move.x, move.y, current)
            captureGroups(simBoard, move.x, move.y, current)

            current = 3 - current
        }

        // calculate stone differ
        let black = 0,
            white = 0
        for (let i = 0; i < simBoard.length; i++) {
            if (simBoard[i] === 1) black++
            if (simBoard[i] === 2) white++
        }
        return color === 1 ? black - white : white - black
    }

    // MCTS thinking
    think(color) {
        const moves = getLegalMoves(this.board, color)
        if (moves.length === 0) return null

        const stats = new Map()
        for (const move of moves) {
            stats.set(getStoneIntArrayPosition(move.x, move.y), { visits: 0, wins: 0 })
        }

        for (let i = 0; i < this.simulations; i++) {
            const move = moves[Math.floor(Math.random() * moves.length)]
            const simBoard = cloneBoard(this.board)
            setStone(simBoard, move.x, move.y, color)
            captureGroups(simBoard, move.x, move.y, color)

            const score = this.simulate(3 - color)

            const key = getStoneIntArrayPosition(move.x, move.y)
            const s = stats.get(key)
            s.visits++
            s.wins += score > 0 ? 1 : score < 0 ? 0 : 0.5
        }

        let bestMove = null
        let bestVisits = -1
        for (const [key, s] of stats) {
            if (s.visits > bestVisits) {
                bestVisits = s.visits
                bestMove = getStone2DPosition(key)
            }
        }
        return bestMove
    }
}

export { SimpleGoAI }
