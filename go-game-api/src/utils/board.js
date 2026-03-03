export {
  pos,
  getStone2DPosition,
  isStonePositionValid,
  getPositionStoneValue,
  setStone,
  cloneBoard,
  hasLiberty,
  isLegal,
  getLegalMoves,
  captureGroups,
};

const SIZE = 19;

/** get relative stone position */
function getStoneIntArrayPosition(x, y) {
  return y * SIZE + x;
}

/** get real stone position */
function getStone2DPosition(index) {
  return { x: index % SIZE, y: Math.floor(index / SIZE) };
}

/** stone position is valid */
function isStonePositionValid(x, y) {
  return x >= 0 && x < SIZE && y >= 0 && y < SIZE;
}

/** get stone */
function getPositionStoneValue(board, x, y) {
  return isStonePositionValid(x, y) ? board[getStoneIntArrayPosition(x, y)] : 0;
}

/** set stone */
function setStone(board, x, y, color) {
  if (isStonePositionValid(x, y)) board[getStoneIntArrayPosition(x, y)] = color;
}

function cloneBoard(board) {
  return new Int8Array(board);
}

/** check if the stones group has liberty */
function hasLiberty(board, x, y, color) {
  const visited = new Set();
  const queue = [{ x, y }];
  visited.add(getStoneIntArrayPosition(x, y));

  while (queue.length) {
    const { x: cx, y: cy } = queue.shift();
    for (const [dx, dy] of [[0,1],[0,-1],[1,0],[-1,0]]) {
      const nx = cx + dx, ny = cy + dy;
      if (!isStonePositionValid(nx, ny)) continue;
      const np = getStoneIntArrayPosition(nx, ny);
      if (board[np] === 0) return true;
      if (board[np] === color && !visited.has(np)) {
        visited.add(np);
        queue.push({ x: nx, y: ny });
      }
    }
  }
  return false;
}

/** check if position for placing a stone is legal */
function isLegal(board, x, y, color) {
  if (!isStonePositionValid(x, y) || board[getStoneIntArrayPosition(x, y)] !== 0) return false;

  const temp = cloneBoard(board);
  setStone(temp, x, y, color);

  if (hasLiberty(temp, x, y, color)) return true;

  for (const [dx, dy] of [[0,1],[0,-1],[1,0],[-1,0]]) {
    const nx = x + dx, ny = y + dy;
    if (isStonePositionValid(nx, ny) && temp[getStoneIntArrayPosition(nx, ny)] === (3 - color)) {
      if (!hasLiberty(temp, nx, ny, 3 - color)) return true;
    }
  }
  return false;
}

function captureGroups(board, x, y, color) {
  const groups = [];
  for (const [dx, dy] of [[0,1],[0,-1],[1,0],[-1,0]]) {
    const nx = x + dx, ny = y + dy;
    if (isStonePositionValid(nx, ny) && board[getStoneIntArrayPosition(nx, ny)] === (3 - color)) {
      if (!hasLiberty(board, nx, ny, 3 - color)) {
        const visited = new Set();
        const queue = [{ x: nx, y: ny }];
        while (queue.length) {
          const { x: qx, y: qy } = queue.shift();
          const p = getStoneIntArrayPosition(qx, qy);
          if (visited.has(p)) continue;
          visited.add(p);
          board[p] = 0;
          for (const [ddx, ddy] of [[0,1],[0,-1],[1,0],[-1,0]]) {
            const nnx = qx + ddx, nny = qy + ddy;
            if (isStonePositionValid(nnx, nny) && board[getStoneIntArrayPosition(nnx, nny)] === (3 - color)) {
              queue.push({ x: nnx, y: nny });
            }
          }
        }
      }
    }
  }
}

function getLegalMoves(board, color) {
  const moves = [];
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (isLegal(board, x, y, color)) {
        moves.push({ x, y });
      }
    }
  }
  return moves;
}