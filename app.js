/**
 * ANTI-GRAVITY GAMING HOMEPAGE CORE PHYSICS & AUDIO ENGINE
 * Crafted with modern high-energy zero-G animations and responsive kinematics.
 */

// ==========================================
// 1. WEB AUDIO SCI-FI SYNTH ENGINE
// ==========================================
class SciFiSynth {
  constructor() {
    this.ctx = null;
    this.ambientHum = null;
    this.ambientGain = null;
    this.isMuted = true;
  }

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContextClass();
    
    // Create master gain control
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.8;
    this.masterGain.connect(this.ctx.destination);
    
    this.setupAmbientHum();
  }

  setupAmbientHum() {
    // Zero-G deep-space core engine hum (sub-bass drone + LFO filter sweep)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.value = 0; // Start at 0 volume
    
    osc1.type = 'sawtooth';
    osc1.frequency.value = 55; // A1 note
    
    osc2.type = 'sine';
    osc2.frequency.value = 110; // A2 note
    
    filter.type = 'lowpass';
    filter.frequency.value = 120;
    filter.Q.value = 6;
    
    lfo.frequency.value = 0.25; // 4 seconds sweep cycle
    lfoGain.gain.value = 40; // modulate filter by 40Hz
    
    // Connections
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(this.ambientGain);
    this.ambientGain.connect(this.masterGain);
    
    // Start nodes
    osc1.start();
    osc2.start();
    lfo.start();
    
    this.ambientHum = { osc1, osc2, lfo };
  }

  toggleMute(btnEl) {
    this.init();
    
    // Resume audio context if suspended (browser security)
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    
    if (this.isMuted) {
      // Fade in ambient hum
      this.ambientGain.gain.setTargetAtTime(0.2, this.ctx.currentTime, 1.5);
      this.isMuted = false;
      btnEl.innerHTML = `
        <svg class="w-5 h-5 mr-2 text-cyan-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18.75V5.25L7.75 9.5H4.5v5h3.25L12 18.75z" />
        </svg>
        <span>AUDIO CORE: ONLINE</span>
      `;
      btnEl.classList.add('border-cyan-500', 'text-glow-cyan');
      btnEl.classList.remove('border-purple-600', 'opacity-60');
      this.playBeep(600, 100, 0.08);
    } else {
      // Fade out ambient hum
      this.ambientGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
      this.isMuted = true;
      btnEl.innerHTML = `
        <svg class="w-5 h-5 mr-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
        <span>AUDIO CORE: SILENT</span>
      `;
      btnEl.classList.remove('border-cyan-500', 'text-glow-cyan');
      btnEl.classList.add('border-purple-600', 'opacity-60');
    }
  }

  playBeep(frequency = 440, durationMs = 150, volume = 0.1) {
    if (this.isMuted || !this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = frequency;
    
    gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + durationMs / 1000);
    
    osc.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + durationMs / 1000);
  }

  playGravShift() {
    if (this.isMuted || !this.ctx) return;
    
    // Sci-fi zero-G sweep sound when hovering over cards
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.4);
    
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(250, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.4);
    filter.Q.value = 4;
    
    gainNode.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
    
    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  playPickup() {
    if (this.isMuted || !this.ctx) return;
    
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.07); // E5
    
    gainNode.gain.setValueAtTime(0.12, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    
    osc.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    osc.start(now);
    osc.stop(now + 0.22);
  }

  playShieldHit() {
    if (this.isMuted || !this.ctx) return;
    
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.3);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(80, now + 0.3);
    
    gainNode.gain.setValueAtTime(0.35, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    
    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    osc.start(now);
    osc.stop(now + 0.3);
  }

  playGameOver() {
    if (this.isMuted || !this.ctx) return;
    
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(50, now + 0.9);
    
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
    
    osc.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    osc.start(now);
    osc.stop(now + 0.9);
  }
}

const synth = new SciFiSynth();

// ==========================================
// 2. CANVAS ZERO-G PARTICLES ENGINE
// ==========================================
class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -1000, y: -1000, active: false };
    this.repulsionRadius = 160;
    this.repulsionStrength = 0.55;
    this.friction = 0.94;
    
    this.resize();
    this.init();
    
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.active = true;
    });
    document.addEventListener('mouseleave', () => {
      this.mouse.active = false;
    });
  }
  
  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  init() {
    const numParticles = Math.min(75, Math.floor((window.innerWidth * window.innerHeight) / 18000));
    this.particles = [];
    
    for (let i = 0; i < numParticles; i++) {
      const radius = Math.random() * 2.5 + 1.2;
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.6 + 0.2), // gentle upward float
        radius: radius,
        baseSpeed: -(Math.random() * 0.4 + 0.15),
        color: Math.random() > 0.45 ? 'rgba(0, 240, 255, 0.45)' : 'rgba(157, 78, 221, 0.45)', // cyan or purple
        alpha: Math.random() * 0.5 + 0.3
      });
    }
  }
  
  update() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    for (let p of this.particles) {
      // Core Drift Force
      let fx = 0;
      let fy = p.baseSpeed;
      
      // Cursor Push Force
      if (this.mouse.active) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < this.repulsionRadius) {
          const force = (this.repulsionRadius - dist) / this.repulsionRadius;
          const push = force * this.repulsionStrength;
          fx += (dx / dist) * push;
          fy += (dy / dist) * push;
          
          // Fade alpha in glow field
          p.alpha = Math.min(0.9, p.alpha + 0.05);
        } else {
          p.alpha = Math.max(p.alpha - 0.01, 0.25);
        }
      }
      
      // Update velocities with friction
      p.vx = (p.vx + fx) * this.friction;
      p.vy = (p.vy + fy) * this.friction;
      
      // Speed clamps to avoid chaos
      const speed = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
      if (speed > 4) {
        p.vx = (p.vx / speed) * 4;
        p.vy = (p.vy / speed) * 4;
      }
      
      p.x += p.vx;
      p.y += p.vy;
      
      // Boundary wraps (Float upwards off-screen wraps to bottom)
      if (p.y < -10) {
        p.y = h + 10;
        p.x = Math.random() * w;
        p.vx = (Math.random() - 0.5) * 0.4;
      }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
    }
  }
  
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (let p of this.particles) {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color.replace('0.45', p.alpha.toFixed(2));
      
      // Draw neon shadow under particle
      this.ctx.shadowBlur = p.radius * 3;
      this.ctx.shadowColor = p.color.includes('240') ? '#00f0ff' : '#9d4edd';
      this.ctx.fill();
    }
    
    // Reset shadow blur
    this.ctx.shadowBlur = 0;
  }
}

// ==========================================
// 3. INTERACTIVE SPRING CARD PHYSICS ENGINE
// ==========================================
class CardPhysics {
  constructor(cardSelector) {
    this.cards = Array.from(document.querySelectorAll(cardSelector));
    this.cardModels = [];
    this.mouse = { x: -1000, y: -1000 };
    
    // Physics constants
    this.stiffness = 0.055;  // Spring hooke's k
    this.damping = 0.81;    // Kinetic damping
    this.repelDist = 260;   // Repulsion field radius
    this.repelForce = 2.4;  // Power of repulsion force
    
    this.setup();
    
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    
    window.addEventListener('resize', () => this.recalcAnchors());
  }
  
  setup() {
    this.cardModels = this.cards.map((card) => {
      const container = card.parentElement;
      
      // Save elements
      return {
        cardEl: card,
        containerEl: container,
        // Local offset position
        offsetX: 0,
        offsetY: 0,
        // Velocities
        vx: 0,
        vy: 0,
        // Parallax rotational values
        rotX: 0,
        rotY: 0,
        // Dimensions
        width: 0,
        height: 0,
        anchorX: 0, // absolute anchors for distance measurements
        anchorY: 0,
        hovered: false
      };
    });
    
    // Add hover triggers for sound and 3D tilting
    this.cardModels.forEach((model) => {
      model.cardEl.addEventListener('mouseenter', () => {
        model.hovered = true;
        synth.playGravShift();
      });
      model.cardEl.addEventListener('mouseleave', () => {
        model.hovered = false;
        model.rotX = 0;
        model.rotY = 0;
      });
    });
    
    this.recalcAnchors();
  }
  
  recalcAnchors() {
    this.cardModels.forEach((model) => {
      if (!model.containerEl) return;
      const rect = model.containerEl.getBoundingClientRect();
      model.width = rect.width;
      model.height = rect.height;
      // Anchor sits in center of the grid container
      model.anchorX = rect.left + rect.width / 2;
      model.anchorY = rect.top + rect.height / 2;
    });
  }
  
  update() {
    // Re-verify anchors in case scrolling or reflow happened
    this.cardModels.forEach((model) => {
      if (!model.containerEl) return;
      const rect = model.containerEl.getBoundingClientRect();
      model.anchorX = rect.left + rect.width / 2;
      model.anchorY = rect.top + rect.height / 2;
      model.width = rect.width;
      model.height = rect.height;
      
      // Calculate cursor vector relative to anchor center
      const dx = (model.anchorX + model.offsetX) - this.mouse.x;
      const dy = (model.anchorY + model.offsetY) - this.mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      let pushX = 0;
      let pushY = 0;
      
      // Repel if within distance limit
      if (dist < this.repelDist && dist > 1) {
        const intensity = (this.repelDist - dist) / this.repelDist;
        // Stronger push force
        const power = intensity * this.repelForce;
        pushX = (dx / dist) * power * 2.5;
        pushY = (dy / dist) * power * 2.5;
        
        // 3D Parallax Tilt calculations
        if (model.hovered) {
          // Normalize coordinates inside the card from -1 to 1
          const normX = ((this.mouse.x - model.anchorX) / (model.width / 2));
          const normY = ((this.mouse.y - model.anchorY) / (model.height / 2));
          model.rotX = -normY * 18; // Max 18 degrees pitch
          model.rotY = normX * 18;  // Max 18 degrees yaw
        }
      }
      
      // Spring restore force
      const springX = -model.offsetX * this.stiffness;
      const springY = -model.offsetY * this.stiffness;
      
      // Damping resistance
      const dampX = -model.vx * (1 - this.damping);
      const dampY = -model.vy * (1 - this.damping);
      
      // Integrate equations (F = ma, dt = 1)
      model.vx += springX + pushX;
      model.vy += springY + pushY;
      
      // Apply kinetic damping friction
      model.vx *= this.damping;
      model.vy *= this.damping;
      
      // Shift offsets
      model.offsetX += model.vx;
      model.offsetY += model.vy;
      
      // Smooth damp tilt values
      if (!model.hovered) {
        model.rotX *= 0.85;
        model.rotY *= 0.85;
      }
    });
  }
  
  applyStyles() {
    this.cardModels.forEach((model) => {
      // Combine translation displacement and rotational parallax tilt
      model.cardEl.style.transform = `
        translate3d(${model.offsetX.toFixed(2)}px, ${model.offsetY.toFixed(2)}px, 0px)
        rotateX(${model.rotX.toFixed(2)}deg)
        rotateY(${model.rotY.toFixed(2)}deg)
      `;
    });
  }
}

// ==========================================
// 4. LIVE TELEMETRY SIMULATOR
// ==========================================
function initTelemetry() {
  const playersOnlineVal = document.getElementById('telemetry-players');
  const serverPingVal = document.getElementById('telemetry-ping');
  const driftVal = document.getElementById('telemetry-drift');
  const terminalBody = document.getElementById('terminal-log-body');
  
  if (!playersOnlineVal) return;
  
  let playersCount = 142803;
  let serverPing = 12;
  let cycle = 0;
  
  // Oscillate counters
  setInterval(() => {
    const deltaPlayers = Math.floor((Math.random() - 0.5) * 25);
    playersCount += deltaPlayers;
    playersOnlineVal.innerText = playersCount.toLocaleString();
    
    if (Math.random() > 0.75) {
      serverPing = Math.floor(Math.random() * 4) + 11; // 11-14ms
      serverPingVal.innerText = `${serverPing}ms`;
    }
  }, 1800);
  
  // Drift oscillations
  setInterval(() => {
    cycle += 0.05;
    const driftG = (0.02 + Math.sin(cycle) * 0.0035).toFixed(4);
    driftVal.innerText = `${driftG}G`;
  }, 200);

  // Terminal telemetry logs simulation
  const logMessages = [
    "LOG: AGE Gravity Core initialized on node AP-90",
    "LOG: Calibrating field vectors... k=0.055, c=0.81",
    "Telemetry: Spatial distortion dampening normalized",
    "SYS: Syncing node instances with Singularity cloud",
    "SUCCESS: Zero-G buffer verified. Latency: 12ms",
    "WARN: Atmospheric density anomaly detected in sector 4",
    "SYS: Magnetic shielding active. Buffer load: 14%",
    "LOG: Connected player pipeline synced successfully",
    "Telemetry: Vector warp drive stabilized at 1.002G"
  ];
  
  let currentLogIdx = 0;
  
  setInterval(() => {
    if (!terminalBody) return;
    const timeStr = new Date().toLocaleTimeString().split(' ')[0];
    const logLine = document.createElement('div');
    logLine.className = 'text-xs text-purple-300 font-mono py-0.5 opacity-0 transition-opacity duration-300';
    logLine.innerHTML = `<span class="text-cyan-400 font-bold">[${timeStr}]</span> ${logMessages[currentLogIdx]}`;
    
    terminalBody.appendChild(logLine);
    
    // Fade in
    setTimeout(() => logLine.classList.remove('opacity-0'), 50);
    
    // Scroll terminal
    terminalBody.scrollTop = terminalBody.scrollHeight;
    
    // Cap log size
    if (terminalBody.childElementCount > 30) {
      terminalBody.removeChild(terminalBody.firstChild);
    }
    
    currentLogIdx = (currentLogIdx + 1) % logMessages.length;
  }, 3500);
}

// ==========================================
// 5. PLAYABLE ZERO-G ARCADE GAME
// ==========================================
class ArcadeGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.gameState = 'idle'; // idle, playing, game-over
    this.score = 0;
    this.shield = 100;
    
    this.player = { x: 100, y: 225, radius: 12, targetY: 225, targetX: 100, speed: 0.15 };
    this.obstacles = [];
    this.collectibles = [];
    this.particles = [];
    
    this.spawnTimer = 0;
    this.shake = 0;
    this.animationId = null;
    
    // Mouse coords relative to canvas
    this.mouse = { x: 100, y: 225 };
    
    this.setupEvents();
    this.resize();
  }
  
  resize() {
    // Fixed internal resolution for consistent gameplay physics
    this.canvas.width = 800;
    this.canvas.height = 450;
  }
  
  setupEvents() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      // Calculate normalized coordinates on our internal 800x450 grid
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * this.canvas.width;
      this.mouse.y = ((e.clientY - rect.top) / rect.height) * this.canvas.height;
    });
    
    document.getElementById('start-game-btn').addEventListener('click', () => {
      this.start();
    });
  }
  
  start() {
    this.score = 0;
    this.shield = 100;
    this.player.x = 100;
    this.player.y = 225;
    this.player.targetX = 100;
    this.player.targetY = 225;
    this.obstacles = [];
    this.collectibles = [];
    this.particles = [];
    this.gameState = 'playing';
    this.shake = 0;
    
    document.getElementById('arcade-screen').classList.add('hidden');
    document.getElementById('game-shield').innerText = '100%';
    document.getElementById('game-shield').className = 'text-cyan-400 font-bold';
    document.getElementById('game-score').innerText = '0000';
    
    synth.playBeep(523, 150, 0.1); // High note to start
    
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.loop();
  }
  
  gameOver() {
    this.gameState = 'game-over';
    document.getElementById('arcade-title').innerText = 'CORE CRITICAL';
    document.getElementById('arcade-desc').innerHTML = `
      <span class="text-pink-500 font-bold block mb-2 text-sm uppercase">SHIELDS ENTIRELY DEPLETED</span>
      Your zero-G pod collapsed in the gravitational singularity vector.<br>
      <span class="text-white font-bold text-base block mt-4">FINAL SCORE: ${this.score}</span>
    `;
    document.getElementById('start-game-btn').innerText = 'REBOOT THRUSTERS';
    document.getElementById('arcade-screen').classList.remove('hidden');
    
    synth.playGameOver();
  }
  
  spawn() {
    this.spawnTimer++;
    if (this.spawnTimer % 45 === 0) { // spawn obstacle
      this.obstacles.push({
        x: this.canvas.width + 30,
        y: Math.random() * (this.canvas.height - 60) + 30,
        vx: -(Math.random() * 3 + 2.5),
        radius: Math.random() * 10 + 12,
        pulseSpeed: Math.random() * 0.05 + 0.02,
        pulseVal: 0
      });
    }
    
    if (this.spawnTimer % 65 === 0) { // spawn collectible
      this.collectibles.push({
        x: this.canvas.width + 30,
        y: Math.random() * (this.canvas.height - 60) + 30,
        vx: -(Math.random() * 2 + 2),
        radius: 8,
        pulseVal: 0
      });
    }
  }
  
  update() {
    this.spawn();
    
    // Smooth zero-G mouse follow inertia
    this.player.x += (this.mouse.x - this.player.x) * this.player.speed;
    this.player.y += (this.mouse.y - this.player.y) * this.player.speed;
    
    // Bounds clamping
    this.player.x = Math.max(20, Math.min(this.canvas.width - 20, this.player.x));
    this.player.y = Math.max(20, Math.min(this.canvas.height - 20, this.player.y));
    
    // Update Obstacles
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const o = this.obstacles[i];
      o.x += o.vx;
      o.pulseVal += o.pulseSpeed;
      
      // Collision detection with player
      const dx = o.x - this.player.x;
      const dy = o.y - this.player.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      if (dist < o.radius + this.player.radius) {
        // Collided!
        this.shield -= 25;
        this.shake = 15;
        synth.playShieldHit();
        
        // Spawn debris particles
        this.spawnExplosion(o.x, o.y, '#9d4edd', 12);
        
        // Remove obstacle
        this.obstacles.splice(i, 1);
        
        // Update shield HUD
        const shieldHUD = document.getElementById('game-shield');
        shieldHUD.innerText = `${this.shield}%`;
        if (this.shield <= 50) {
          shieldHUD.className = 'text-pink-500 font-bold animate-pulse';
        }
        
        if (this.shield <= 0) {
          this.gameOver();
          return;
        }
        continue;
      }
      
      // Offscreen remove
      if (o.x < -40) {
        this.obstacles.splice(i, 1);
      }
    }
    
    // Update Collectibles
    for (let i = this.collectibles.length - 1; i >= 0; i--) {
      const c = this.collectibles[i];
      c.x += c.vx;
      c.pulseVal += 0.08;
      
      const dx = c.x - this.player.x;
      const dy = c.y - this.player.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      if (dist < c.radius + this.player.radius) {
        // Collected!
        this.score += 100;
        this.shield = Math.min(100, this.shield + 5);
        synth.playPickup();
        
        // Spawn sparks
        this.spawnExplosion(c.x, c.y, '#00f0ff', 8);
        
        this.collectibles.splice(i, 1);
        
        document.getElementById('game-score').innerText = String(this.score).padStart(4, '0');
        const shieldHUD = document.getElementById('game-shield');
        shieldHUD.innerText = `${this.shield}%`;
        if (this.shield > 50) {
          shieldHUD.className = 'text-cyan-400 font-bold';
        }
        continue;
      }
      
      if (c.x < -40) {
        this.collectibles.splice(i, 1);
      }
    }
    
    // Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.03;
      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }
    
    // Decay shake
    if (this.shake > 0) this.shake *= 0.9;
  }
  
  spawnExplosion(x, y, color, count) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 2 + 1,
        color: color,
        alpha: 1
      });
    }
  }
  
  draw() {
    this.ctx.save();
    
    // Screen shake translate
    if (this.shake > 0.5) {
      const dx = (Math.random() - 0.5) * this.shake;
      const dy = (Math.random() - 0.5) * this.shake;
      this.ctx.translate(dx, dy);
    }
    
    // Clear canvas
    this.ctx.fillStyle = '#030306';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw sci-fi grid overlay onto canvas background
    this.ctx.strokeStyle = 'rgba(157, 78, 221, 0.04)';
    this.ctx.lineWidth = 1;
    const gridSz = 30;
    for (let x = 0; x < this.canvas.width; x += gridSz) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    for (let y = 0; y < this.canvas.height; y += gridSz) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
    
    // Draw obstacles (Collapsing Singularities)
    for (let o of this.obstacles) {
      this.ctx.save();
      const currentRadius = o.radius + Math.sin(o.pulseVal) * 3;
      
      // Draw outer gravity distortion rings
      this.ctx.beginPath();
      this.ctx.arc(o.x, o.y, currentRadius * 1.5, 0, Math.PI * 2);
      this.ctx.strokeStyle = 'rgba(157, 78, 221, 0.15)';
      this.ctx.lineWidth = 1.5;
      this.ctx.setLineDash([4, 4]);
      this.ctx.stroke();
      
      // Draw inner vortex core
      this.ctx.beginPath();
      this.ctx.arc(o.x, o.y, currentRadius, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(15, 10, 30, 0.9)';
      this.ctx.strokeStyle = '#9d4edd';
      this.ctx.lineWidth = 2.5;
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = '#c77dff';
      this.ctx.fill();
      this.ctx.stroke();
      
      this.ctx.restore();
    }
    
    // Draw collectibles (Glowing Energy Cores)
    for (let c of this.collectibles) {
      this.ctx.save();
      const rot = c.pulseVal;
      
      this.ctx.translate(c.x, c.y);
      this.ctx.rotate(rot);
      
      // Draw diamond core shape
      this.ctx.beginPath();
      this.ctx.moveTo(0, -c.radius);
      this.ctx.lineTo(c.radius, 0);
      this.ctx.lineTo(0, c.radius);
      this.ctx.lineTo(-c.radius, 0);
      this.ctx.closePath();
      
      this.ctx.fillStyle = 'rgba(0, 240, 255, 0.25)';
      this.ctx.strokeStyle = '#00f0ff';
      this.ctx.lineWidth = 2;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = '#00f0ff';
      this.ctx.fill();
      this.ctx.stroke();
      
      this.ctx.restore();
    }
    
    // Draw Debris Particles
    for (let p of this.particles) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fill();
      this.ctx.restore();
    }
    
    // Draw player ship (Cyan Delta Jet Pod)
    this.ctx.save();
    this.ctx.translate(this.player.x, this.player.y);
    
    // Jet flame behind player
    if (this.gameState === 'playing') {
      this.ctx.beginPath();
      this.ctx.moveTo(-15, -4);
      this.ctx.lineTo(-28 - Math.random() * 8, 0);
      this.ctx.lineTo(-15, 4);
      this.ctx.closePath();
      this.ctx.fillStyle = Math.random() > 0.4 ? '#00f0ff' : '#9d4edd';
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = '#00f0ff';
      this.ctx.fill();
    }
    
    // Vector triangular pod hull
    this.ctx.beginPath();
    this.ctx.moveTo(18, 0); // nose cone pointing right
    this.ctx.lineTo(-12, -11); // top wing
    this.ctx.lineTo(-6, 0);   // engine mount
    this.ctx.lineTo(-12, 11);  // bottom wing
    this.ctx.closePath();
    
    this.ctx.fillStyle = 'rgba(10, 15, 28, 0.95)';
    this.ctx.strokeStyle = '#00f0ff';
    this.ctx.lineWidth = 2.5;
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = '#00f0ff';
    this.ctx.fill();
    this.ctx.stroke();
    
    // Pilot canopy glass
    this.ctx.beginPath();
    this.ctx.moveTo(3, 0);
    this.ctx.lineTo(-6, -4);
    this.ctx.lineTo(-6, 4);
    this.ctx.closePath();
    this.ctx.fillStyle = '#9d4edd';
    this.ctx.fill();
    
    this.ctx.restore();
    
    this.ctx.restore();
  }
  
  loop() {
    if (this.gameState !== 'playing') return;
    
    this.update();
    this.draw();
    
    this.animationId = requestAnimationFrame(() => this.loop());
  }
}

// ==========================================
// 6. MAIN RENDER LOOP & INITS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Check for canvas
  const backgroundParticles = new ParticleSystem('bg-particles');
  const cardPhysics = new CardPhysics('.physics-float-card');
  
  // Initialize telemetry numbers and console
  initTelemetry();
  
  // Setup audio trigger clicks and hovers for interactive buttons
  const muteBtn = document.getElementById('mute-toggle');
  if (muteBtn) {
    muteBtn.addEventListener('click', () => synth.toggleMute(muteBtn));
  }
  
  // Magnetic tech buttons standard trigger sound
  document.querySelectorAll('.magnetic-btn, nav a, .glass-panel button').forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      synth.playBeep(480, 50, 0.05);
    });
    btn.addEventListener('click', () => {
      synth.playBeep(640, 150, 0.08);
    });
  });
  
  // Wire up the Arcade Overlay triggers
  const gameOverlay = document.getElementById('game-overlay');
  const closeGameBtn = document.getElementById('close-game');
  const arcade = new ArcadeGame('arcade-canvas');
  
  function launchGame() {
    if (!gameOverlay) return;
    gameOverlay.classList.remove('hidden');
    gameOverlay.classList.add('flex');
    synth.init();
    
    // Auto unmute synth to give high-energy feel immediately!
    if (synth.isMuted && muteBtn) {
      synth.toggleMute(muteBtn);
    }
    synth.playBeep(480, 80, 0.08);
  }
  
  function exitGame() {
    if (!gameOverlay) return;
    gameOverlay.classList.remove('flex');
    gameOverlay.classList.add('hidden');
    if (arcade.gameState === 'playing') {
      arcade.gameState = 'idle';
      if (arcade.animationId) cancelAnimationFrame(arcade.animationId);
    }
    // Show start overlay screen for next run
    document.getElementById('arcade-screen').classList.remove('hidden');
    document.getElementById('arcade-title').innerText = 'SINGULARITY RUN';
    document.getElementById('arcade-desc').innerHTML = `
      Dodge the collapsing purple gravity singularities. Collect floating cyan energy cores to power your shields and boost your score. Use your cursor to steer your weightless pod.
    `;
    document.getElementById('start-game-btn').innerText = 'INITIATE THRUSTERS';
    
    synth.playBeep(320, 100, 0.08);
  }
  
  const heroLaunchBtn = document.getElementById('hero-launch-btn');
  const enterCoreBtn = document.getElementById('enter-core-btn');
  const triggerCard1 = document.getElementById('card-trigger-1');
  const triggerCard2 = document.getElementById('card-trigger-2');
  const triggerCard3 = document.getElementById('card-trigger-3');
  
  if (heroLaunchBtn) heroLaunchBtn.addEventListener('click', launchGame);
  if (enterCoreBtn) enterCoreBtn.addEventListener('click', launchGame);
  if (triggerCard1) triggerCard1.addEventListener('click', launchGame);
  if (triggerCard2) triggerCard2.addEventListener('click', launchGame);
  if (triggerCard3) triggerCard3.addEventListener('click', launchGame);
  if (closeGameBtn) closeGameBtn.addEventListener('click', exitGame);
  
  // Close on ESC keypress
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && gameOverlay && !gameOverlay.classList.contains('hidden')) {
      exitGame();
    }
  });
  
  // Core background render loop
  function loop() {
    // Update background particle states and draw
    backgroundParticles.update();
    backgroundParticles.draw();
    
    // Update spring-physics cards
    cardPhysics.update();
    cardPhysics.applyStyles();
    
    requestAnimationFrame(loop);
  }
  
  // Kick off render frame loop
  requestAnimationFrame(loop);
});
