// Yūhi Hero Animation - ASCII Battle Style
(function() {
  const container = document.querySelector('.hero-console');
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'ascii-canvas';
  canvas.style.cssText = 'width:100%;height:120px;margin-top:0.5rem;background:#0a1628;border:2px solid #9bc3f5;';
  
  const pre = document.createElement('pre');
  pre.style.cssText = 'margin:0;padding:0.5rem;font-family:monospace;font-size:8px;line-height:8px;overflow:hidden;color:#9bc3f5;';
  
  container.appendChild(canvas);
  canvas.appendChild(pre);

  const width = 40;
  const height = 15;
  
  // ASCII Pokemon-style sprites
  const sprites = [
    [
      "        ,'``.",
      "       ,'   `.",
      "      /   ()  \\",
      "     |   ()   |",
      "     |    `   |",
      "      \\      /",
      "       `----'",
      "      Cynthia"
    ],
    [
      "      /\\  /\\",
      "     /  \\/  \\",
      "    |   ||   |",
      "    |   ||   |",
      "     \\  /\\  /",
      "      \\    /",
      "       '=='" ,
      "       Rowan"
    ]
  ];
  
  let frame = 0;
  let currentSprite = 0;
  
  function render() {
    let output = '';
    const sprite = sprites[currentSprite];
    const bounce = Math.sin(frame * 0.15) > 0 ? 1 : 0;
    
    for (let y = 0; y < height; y++) {
      let line = '';
      for (let x = 0; x < width; x++) {
        const spriteY = y - 3 + bounce;
        const spriteX = x - 15;
        
        if (spriteY >= 0 && spriteY < sprite.length) {
          const char = sprite[spriteY][spriteX];
          if (char) {
            line += char;
          } else if (x < width - 1) {
            line += ' ';
          }
        } else {
          line += ' ';
        }
      }
      output += line + '\n';
    }
    
    pre.textContent = output;
    frame++;
    
    if (frame % 60 === 0) {
      currentSprite = (currentSprite + 1) % sprites.length;
    }
  }
  
  render();
  setInterval(render, 80);
})();
