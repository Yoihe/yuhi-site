/**
 * Ember Particles - Three.js Fire-Themed Hero Background
 * Subtle rising ember particles with warm glow effects
 */

(function() {
  'use strict';
  
  const container = document.getElementById('ember-canvas');
  if (!container) return;
  
  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true 
  });
  
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  
  // Adjust camera for overlay effect
  camera.position.z = 50;
  camera.position.y = 20;
  
  // Ember particle system
  const emberCount = 150;
  const embers = [];
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(emberCount * 3);
  const colors = new Float32Array(emberCount * 3);
  const sizes = new Float32Array(emberCount);
  
  // Warm ember color palette
  const emberColors = [
    new THREE.Color(0xff6b35), // Orange
    new THREE.Color(0xff8c42), // Light orange
    new THREE.Color(0xffaa5e), // Pale orange
    new THREE.Color(0xf4a261), // Sandy
    new THREE.Color(0xe76f51), // Terracotta
  ];
  
  // Initialize particles
  for (let i = 0; i < emberCount; i++) {
    const i3 = i * 3;
    
    // Random starting positions
    positions[i3] = (Math.random() - 0.5) * 100;
    positions[i3 + 1] = Math.random() * 60 - 30;
    positions[i3 + 2] = (Math.random() - 0.5) * 50;
    
    // Random ember color
    const color = emberColors[Math.floor(Math.random() * emberColors.length)];
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
    
    // Random sizes
    sizes[i] = Math.random() * 2 + 0.5;
    
    // Store animation data
    embers.push({
      speed: Math.random() * 0.1 + 0.02,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      originalSize: sizes[i]
    });
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  
  // Custom shader for soft glow effect
  const vertexShader = `
    attribute float size;
    attribute vec3 color;
    varying vec3 vColor;
    varying float vAlpha;
    
    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
      vAlpha = smoothstep(50.0, 0.0, -mvPosition.z);
    }
  `;
  
  const fragmentShader = `
    varying vec3 vColor;
    varying float vAlpha;
    
    void main() {
      vec2 center = gl_PointCoord - 0.5;
      float dist = length(center);
      float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
      alpha *= vAlpha;
      
      // Soft glow falloff
      float glow = 1.0 - smoothstep(0.0, 1.0, dist * 2.0);
      glow = pow(glow, 1.5);
      
      vec3 finalColor = vColor + vec3(0.2, 0.1, 0.05) * (1.0 - dist * 2.0);
      
      gl_FragColor = vec4(finalColor, alpha * glow * 0.8);
    }
  `;
  
  const material = new THREE.ShaderMaterial({
    uniforms: {},
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  
  const particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);
  
  // Ambient light for subtle scene illumination
  const ambientLight = new THREE.AmbientLight(0xff6b35, 0.3);
  scene.add(ambientLight);
  
  // Animation loop
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.016;
    
    const positions = particleSystem.geometry.attributes.position.array;
    const sizes = particleSystem.geometry.attributes.size.array;
    
    for (let i = 0; i < emberCount; i++) {
      const i3 = i * 3;
      const ember = embers[i];
      
      // Rising motion with wobble
      positions[i3 + 1] += ember.speed;
      positions[i3] += Math.sin(time * ember.wobbleSpeed + ember.wobble) * 0.02;
      
      // Pulse size
      const pulse = Math.sin(time * 2 + ember.wobble) * 0.3 + 1;
      sizes[i] = ember.originalSize * pulse;
      
      // Reset particle when it goes too high
      if (positions[i3 + 1] > 50) {
        positions[i3 + 1] = -30;
        positions[i3] = (Math.random() - 0.5) * 100;
      }
    }
    
    particleSystem.geometry.attributes.position.needsUpdate = true;
    particleSystem.geometry.attributes.size.needsUpdate = true;
    
    // Gentle camera movement
    camera.position.x = Math.sin(time * 0.1) * 2;
    camera.lookAt(0, 0, 0);
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Handle resize
  window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
  
  // Pause animation when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Animation continues but at reduced rate handled by browser
    }
  });
})();
