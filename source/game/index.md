---
title: 黑白游戏
date: 2026-05-27
---

<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>黑白游戏</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      background: #000;
      color: #fff;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .game-container {
      max-width: 400px;
      width: 100%;
      text-align: center;
    }

    .game-title {
      font-size: 2.5rem;
      font-weight: 300;
      letter-spacing: 0.3em;
      margin-bottom: 40px;
      opacity: 0.9;
    }

    .score-panel {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      font-size: 0.9rem;
      opacity: 0.6;
    }

    .board {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      padding: 20px;
      background: #111;
      border-radius: 16px;
      box-shadow: 0 0 40px rgba(255, 255, 255, 0.05);
    }

    .tile {
      aspect-ratio: 1;
      background: #222;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      font-weight: 600;
      color: #000;
      transform: rotateY(180deg);
      opacity: 0;
    }

    .tile.revealed {
      background: #fff;
      transform: rotateY(0deg);
      opacity: 1;
    }

    .tile.matched {
      background: #333;
      color: #666;
      pointer-events: none;
      opacity: 0.5;
    }

    .tile:hover:not(.revealed):not(.matched) {
      background: #2a2a2a;
      transform: rotateY(180deg) scale(1.05);
    }

    .tile:active:not(.revealed):not(.matched) {
      transform: rotateY(180deg) scale(0.95);
    }

    .controls {
      margin-top: 30px;
      display: flex;
      gap: 15px;
      justify-content: center;
    }

    button {
      padding: 12px 30px;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #fff;
      border-radius: 30px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
      letter-spacing: 0.1em;
    }

    button:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
    }

    button:active {
      transform: scale(0.98);
    }

    .message {
      margin-top: 30px;
      font-size: 1.1rem;
      opacity: 0;
      transition: opacity 0.3s ease;
      min-height: 2rem;
    }

    .message.show {
      opacity: 0.8;
    }

    .message.success {
      color: #4ade80;
    }

    .message.error {
      color: #f87171;
    }

    .footer {
      margin-top: 50px;
      font-size: 0.75rem;
      opacity: 0.3;
      letter-spacing: 0.1em;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .game-container {
      animation: fadeIn 0.8s ease-out;
    }
  </style>
</head>
<body>
  <div class="game-container">
    <h1 class="game-title">MEMORY</h1>
    
    <div class="score-panel">
      <span>尝试: <span id="attempts">0</span></span>
      <span>配对: <span id="matches">0</span></span>
    </div>

    <div class="board" id="board">
    </div>

    <div class="message" id="message"></div>

    <div class="controls">
      <button id="new-game">新游戏</button>
    </div>

    <div class="footer">
      TURBO FLINT
    </div>
  </div>

  <script>
    const tiles = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    let board = [];
    let flippedTiles = [];
    let attempts = 0;
    let matches = 0;
    let isProcessing = false;

    const boardElement = document.getElementById('board');
    const attemptsElement = document.getElementById('attempts');
    const matchesElement = document.getElementById('matches');
    const messageElement = document.getElementById('message');

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function initGame() {
      board = shuffle([...tiles]);
      flippedTiles = [];
      attempts = 0;
      matches = 0;
      isProcessing = false;
      
      attemptsElement.textContent = attempts;
      matchesElement.textContent = matches;
      messageElement.textContent = '';
      messageElement.className = 'message';

      boardElement.innerHTML = '';
      
      board.forEach((tile, index) => {
        const tileElement = document.createElement('div');
        tileElement.className = 'tile';
        tileElement.dataset.index = index;
        tileElement.textContent = tile;
        tileElement.addEventListener('click', flipTile);
        boardElement.appendChild(tileElement);
      });
    }

    function flipTile(e) {
      if (isProcessing) return;
      
      const tile = e.target;
      if (tile.classList.contains('revealed') || tile.classList.contains('matched')) return;
      if (flippedTiles.length >= 2) return;

      tile.classList.add('revealed');
      flippedTiles.push({
        element: tile,
        value: board[tile.dataset.index]
      });

      if (flippedTiles.length === 2) {
        attempts++;
        attemptsElement.textContent = attempts;
        checkMatch();
      }
    }

    function checkMatch() {
      isProcessing = true;
      
      if (flippedTiles[0].value === flippedTiles[1].value) {
        showMessage('配对成功', 'success');
        
        setTimeout(() => {
          flippedTiles[0].element.classList.add('matched');
          flippedTiles[1].element.classList.add('matched');
          flippedTiles = [];
          matches++;
          matchesElement.textContent = matches;
          isProcessing = false;
          
          if (matches === tiles.length / 2) {
            setTimeout(() => {
              showMessage(`恭喜完成! 共尝试 ${attempts} 次`, 'success');
            }, 500);
          }
        }, 500);
      } else {
        showMessage('配对失败', 'error');
        
        setTimeout(() => {
          flippedTiles[0].element.classList.remove('revealed');
          flippedTiles[1].element.classList.remove('revealed');
          flippedTiles = [];
          isProcessing = false;
        }, 1000);
      }
    }

    function showMessage(text, type) {
      messageElement.textContent = text;
      messageElement.className = `message show ${type}`;
      
      setTimeout(() => {
        messageElement.className = 'message';
      }, 2000);
    }

    document.getElementById('new-game').addEventListener('click', initGame);

    initGame();
  </script>
</body>
</html>