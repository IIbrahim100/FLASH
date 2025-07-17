// Hero animation: car moving with lights turning on/off
document.addEventListener('DOMContentLoaded', () => {
  // Hero animation
  const heroAnim = document.querySelector('.hero-animation');
  if (heroAnim) {
    heroAnim.innerHTML = `<svg width="100%" height="120" viewBox="0 0 600 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="street">
        <rect x="0" y="70" width="600" height="20" rx="10" fill="#333" />
        <g id="lights">
          ${Array.from({length: 10}).map((_,i) => `<circle id="light${i}" cx="${60*i+30}" cy="80" r="10" fill="#444" />`).join('')}
        </g>
        <g id="car">
          <rect id="car-body" x="0" y="60" width="40" height="20" rx="8" fill="#ffb300" filter="url(#glow)" />
          <circle id="car-wheel1" cx="10" cy="85" r="5" fill="#232326" />
          <circle id="car-wheel2" cx="30" cy="85" r="5" fill="#232326" />
        </g>
      </g>
      <defs>
        <filter id="glow" x="-10" y="50" width="60" height="40">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </svg>`;
    const svg = heroAnim.querySelector('svg');
    let carPos = 0;
    function animateCar() {
      carPos += 2;
      if (carPos > 560) carPos = 0;
      const car = svg.getElementById('car');
      car.setAttribute('transform', `translate(${carPos},0)`);
      // Lights logic: turn on 3 ahead, off behind
      for (let i = 0; i < 10; i++) {
        const light = svg.getElementById('light'+i);
        if (i*60+30 > carPos-60 && i*60+30 < carPos+120) {
          light.setAttribute('fill', '#ffb300');
          light.setAttribute('filter', 'url(#glow)');
        } else {
          light.setAttribute('fill', '#444');
          light.removeAttribute('filter');
        }
      }
      requestAnimationFrame(animateCar);
    }
    animateCar();
  }

  // How It Works animation
  const howAnim = document.querySelector('.how-animation');
  if (howAnim) {
    howAnim.innerHTML = `<svg width="100%" height="120" viewBox="0 0 700 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="street">
        <rect x="0" y="70" width="700" height="20" rx="10" fill="#333" />
        <g id="lights">
          ${Array.from({length: 8}).map((_,i) => `<circle id="how-light${i+1}" cx="${i*80+40}" cy="80" r="12" fill="#444" />`).join('')}
        </g>
        <g id="car">
          <rect id="car-body" x="0" y="60" width="48" height="24" rx="10" fill="#ffb300" filter="url(#glow)" />
          <circle id="car-wheel1" cx="14" cy="88" r="6" fill="#232326" />
          <circle id="car-wheel2" cx="34" cy="88" r="6" fill="#232326" />
        </g>
      </g>
      <defs>
        <filter id="glow" x="-10" y="50" width="70" height="44">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </svg>`;
    const svg = howAnim.querySelector('svg');
    let carPole = 4;
    function animateHow() {
      // Move car to pole 4
      const car = svg.getElementById('car');
      car.setAttribute('transform', `translate(${(carPole-1)*80+16},0)`);
      // Lights logic: 4-8 ON, 1-3 OFF
      for (let i = 1; i <= 8; i++) {
        const light = svg.getElementById('how-light'+i);
        if (i >= 4 && i <= 8) {
          light.setAttribute('fill', '#ffb300');
          light.setAttribute('filter', 'url(#glow)');
        } else {
          light.setAttribute('fill', '#444');
          light.removeAttribute('filter');
        }
      }
    }
    animateHow();
  }

  // Micro-interactions: glow on hover for .benefit and .cta
  document.querySelectorAll('.benefit, .cta, .download-pdf, .social-icons a').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.boxShadow = '0 0 16px #ffb300cc';
    });
    el.addEventListener('mouseleave', () => {
      el.style.boxShadow = '';
    });
  });

  // Contact form (demo only)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thank you for contacting FLASH! We will get back to you soon.');
      form.reset();
    });
  }

  // --- INTERACTIVE DEMO (IMPROVED) ---
  const demoAnim = document.querySelector('.demo-animation');
  if (demoAnim) {
    // SVG parameters
    const poleCount = 6;
    const poleSpacing = 140;
    const poleY = 30;
    const roadY = 80;
    const svgWidth = poleSpacing * (poleCount - 1) + 120;
    const svgHeight = 120;
    // SVG template
    demoAnim.innerHTML = `<svg width="100%" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" fill="none" xmlns="http://www.w3.org/2000/svg" style="background:#20232a">
      <rect x="0" y="${roadY}" width="${svgWidth}" height="18" rx="8" fill="#333" />
      <g id="poles">
        ${Array.from({length: poleCount}).map((_,i) => `
          <g id="pole${i+1}">
            <rect x="${i*poleSpacing+60}" y="${poleY+10}" width="6" height="50" rx="3" fill="#aaa" />
            <rect x="${i*poleSpacing+60}" y="${poleY}" width="6" height="16" rx="3" fill="#bbb" />
            <path d="M${i*poleSpacing+63} ${poleY+10} Q${i*poleSpacing+80} ${poleY-10}, ${i*poleSpacing+100} ${poleY+10}" stroke="#aaa" stroke-width="4" fill="none" />
            <rect x="${i*poleSpacing+98}" y="${poleY+7}" width="16" height="6" rx="3" fill="#bbb" />
          </g>
        `).join('')}
      </g>
      <g id="lights">
        ${Array.from({length: poleCount}).map((_,i) => `
          <g id="light${i+1}">
            <ellipse id="cone${i+1}" cx="${i*poleSpacing+106}" cy="${poleY+13}" rx="28" ry="8" fill="#ffb30000" />
            <rect id="lamp${i+1}" x="${i*poleSpacing+98}" y="${poleY+7}" width="16" height="6" rx="3" fill="#555" />
          </g>
        `).join('')}
      </g>
      <g id="car-group">
        <rect id="car-body" x="0" y="${roadY-22}" width="48" height="22" rx="6" fill="#181b1f" stroke="#222" stroke-width="2" />
        <rect id="car-cabin" x="8" y="${roadY-32}" width="22" height="14" rx="4" fill="#232326" />
        <circle id="car-wheel1" cx="14" cy="${roadY}" r="6" fill="#232326" />
        <circle id="car-wheel2" cx="34" cy="${roadY}" r="6" fill="#232326" />
        <polygon id="car-headlight" points="48,${roadY-12} 68,${roadY-8} 68,${roadY-2} 48,${roadY-2}" fill="#ffe082" opacity="0.7" />
      </g>
    </svg>`;
    const svg = demoAnim.querySelector('svg');
    let carX = 0;
    let direction = 1;
    function animateDemo() {
      // Car moves left to right, then loops
      carX += 1.2 * direction;
      if (carX > svgWidth-90) { direction = -1; }
      if (carX < 0) { direction = 1; }
      // Move car
      const carGroup = svg.getElementById('car-group');
      carGroup.setAttribute('transform', `translate(${carX},0)`);
      // Move headlight
      const headlight = svg.getElementById('car-headlight');
      headlight.setAttribute('points', `${48+carX},68 ${68+carX},72 ${68+carX},78 ${48+carX},78`);
      // Lights logic: turn ON lights ahead of car, OFF behind
      for (let i = 1; i <= poleCount; i++) {
        const lamp = svg.getElementById('lamp'+i);
        const cone = svg.getElementById('cone'+i);
        const polePos = (i-1)*poleSpacing+106;
        if (polePos > carX+30 && polePos < carX+120) {
          lamp.setAttribute('fill', '#ffb300');
          cone.setAttribute('fill', '#ffb30033');
        } else {
          lamp.setAttribute('fill', '#555');
          cone.setAttribute('fill', '#ffb30000');
        }
      }
      requestAnimationFrame(animateDemo);
    }
    animateDemo();
  }

  // --- CALCULATOR ---
  const calcForm = document.getElementById('savings-calculator');
  const calcResults = document.getElementById('calc-results');
  if (calcForm && calcResults) {
    calcForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const poles = parseInt(this.poles.value, 10);
      const hours = parseFloat(this.hours.value);
      const cost = parseFloat(this.cost.value);
      // Assume: Traditional = all ON, FLASH = only 50% ON (saves 50%)
      const wattPerPole = 60; // 60W typical LED
      const days = 365;
      const totalKWhTraditional = (poles * wattPerPole * hours * days) / 1000;
      const totalKWhFlash = totalKWhTraditional * 0.5;
      const moneyTraditional = totalKWhTraditional * cost;
      const moneyFlash = totalKWhFlash * cost;
      const kWhSaved = totalKWhTraditional - totalKWhFlash;
      const moneySaved = moneyTraditional - moneyFlash;
      calcResults.innerHTML = `
        <div class="calc-card">
          <div>Traditional</div>
          <div><b>${totalKWhTraditional.toFixed(0)}</b> kWh/year</div>
          <div><b>$${moneyTraditional.toFixed(2)}</b> / year</div>
        </div>
        <div class="calc-card">
          <div>With FLASH</div>
          <div><b>${totalKWhFlash.toFixed(0)}</b> kWh/year</div>
          <div><b>$${moneyFlash.toFixed(2)}</b> / year</div>
        </div>
        <div class="calc-card">
          <div><b>SAVED</b></div>
          <div><b>${kWhSaved.toFixed(0)}</b> kWh/year</div>
          <div><b>$${moneySaved.toFixed(2)}</b> / year</div>
        </div>
      `;
    });
  }

  // --- FAQ COLLAPSIBLE ---
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function() {
      const item = this.closest('.faq-item');
      item.classList.toggle('open');
      // Close others
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) other.classList.remove('open');
      });
    });
  });

  // --- DEMO REQUEST FORM ---
  const demoForm = document.getElementById('demo-request-form');
  if (demoForm) {
    demoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for requesting a demo! We will contact you soon.');
      demoForm.reset();
    });
  }

  // --- STEP-BY-STEP VISUALS ---
  function stepVisualSVG(step) {
    // Returns a small SVG for each step
    if (step === 1) {
      return `<svg width="60" height="60" viewBox="0 0 60 60"><rect x="0" y="40" width="60" height="8" rx="4" fill="#333"/><circle cx="18" cy="44" r="8" fill="#181b1f" stroke="#222" stroke-width="2"/><rect x="12" y="36" width="12" height="8" rx="3" fill="#232326"/><polygon points="24,40 32,42 32,46 24,48" fill="#ffe082" opacity="0.5"/></svg>`;
    }
    if (step === 2) {
      return `<svg width="60" height="60" viewBox="0 0 60 60"><rect x="0" y="40" width="60" height="8" rx="4" fill="#333"/><rect x="40" y="20" width="4" height="28" rx="2" fill="#bbb"/><circle cx="18" cy="44" r="8" fill="#181b1f" stroke="#222" stroke-width="2"/><rect x="12" y="36" width="12" height="8" rx="3" fill="#232326"/><polygon points="24,40 32,42 32,46 24,48" fill="#ffe082" opacity="0.5"/><circle cx="42" cy="20" r="4" fill="#ffb300" opacity="0.5"/></svg>`;
    }
    if (step === 3) {
      return `<svg width="60" height="60" viewBox="0 0 60 60"><rect x="0" y="40" width="60" height="8" rx="4" fill="#333"/><rect x="40" y="20" width="4" height="28" rx="2" fill="#bbb"/><rect x="48" y="20" width="4" height="28" rx="2" fill="#bbb"/><rect x="56" y="20" width="4" height="28" rx="2" fill="#bbb"/><ellipse cx="42" cy="28" rx="10" ry="4" fill="#ffb300" opacity="0.4"/><ellipse cx="50" cy="28" rx="10" ry="4" fill="#ffb300" opacity="0.4"/><ellipse cx="58" cy="28" rx="10" ry="4" fill="#ffb300" opacity="0.4"/><circle cx="18" cy="44" r="8" fill="#181b1f" stroke="#222" stroke-width="2"/><rect x="12" y="36" width="12" height="8" rx="3" fill="#232326"/><polygon points="24,40 32,42 32,46 24,48" fill="#ffe082" opacity="0.5"/></svg>`;
    }
    if (step === 4) {
      return `<svg width="60" height="60" viewBox="0 0 60 60"><rect x="0" y="40" width="60" height="8" rx="4" fill="#333"/><rect x="8" y="20" width="4" height="28" rx="2" fill="#888"/><rect x="16" y="20" width="4" height="28" rx="2" fill="#888"/><rect x="24" y="20" width="4" height="28" rx="2" fill="#888"/><rect x="40" y="20" width="4" height="28" rx="2" fill="#bbb"/><rect x="48" y="20" width="4" height="28" rx="2" fill="#bbb"/><rect x="56" y="20" width="4" height="28" rx="2" fill="#bbb"/><ellipse cx="42" cy="28" rx="10" ry="4" fill="#ffb300" opacity="0.4"/><ellipse cx="50" cy="28" rx="10" ry="4" fill="#ffb300" opacity="0.4"/><ellipse cx="58" cy="28" rx="10" ry="4" fill="#ffb300" opacity="0.4"/><circle cx="18" cy="44" r="8" fill="#181b1f" stroke="#222" stroke-width="2"/><rect x="12" y="36" width="12" height="8" rx="3" fill="#232326"/><polygon points="24,40 32,42 32,46 24,48" fill="#ffe082" opacity="0.5"/></svg>`;
    }
    if (step === 5) {
      return `<svg width="60" height="60" viewBox="0 0 60 60"><rect x="0" y="40" width="60" height="8" rx="4" fill="#333"/><rect x="40" y="20" width="4" height="28" rx="2" fill="#bbb"/><rect x="48" y="20" width="4" height="28" rx="2" fill="#bbb"/><rect x="56" y="20" width="4" height="28" rx="2" fill="#bbb"/><ellipse cx="50" cy="28" rx="20" ry="6" fill="#ffb300" opacity="0.3"/><circle cx="18" cy="44" r="8" fill="#181b1f" stroke="#222" stroke-width="2"/><rect x="12" y="36" width="12" height="8" rx="3" fill="#232326"/><polygon points="24,40 32,42 32,46 24,48" fill="#ffe082" opacity="0.5"/></svg>`;
    }
    return '';
  }
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById(`step${i}-visual`);
    if (el) el.innerHTML = stepVisualSVG(i);
  }

  // --- SMART LIGHTING DEMO ---
  const smartDemo = document.querySelector('.smart-demo-animation');
  if (smartDemo) {
    const poleCount = 8;
    const poleSpacing = 90;
    const poleY = 40;
    const roadY = 120;
    const svgWidth = poleSpacing * (poleCount - 1) + 120;
    const svgHeight = 180;
    let carPole = 4;
    function renderDemo() {
      smartDemo.innerHTML = `<svg width="100%" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" fill="none" xmlns="http://www.w3.org/2000/svg" style="background:#20232a">
        <rect x="0" y="${roadY}" width="${svgWidth}" height="18" rx="8" fill="#333" />
        <g id="dashed-road">
          ${Array.from({length: 12}).map((_,i) => `<rect x="${i*70+20}" y="${roadY+8}" width="30" height="3" rx="2" fill="#bbb" opacity="0.3" />`).join('')}
        </g>
        <g id="poles">
          ${Array.from({length: poleCount}).map((_,i) => `
            <g id="pole${i+1}">
              <rect x="${i*poleSpacing+60}" y="${poleY+10}" width="6" height="60" rx="3" fill="#aaa" />
              <rect x="${i*poleSpacing+60}" y="${poleY}" width="6" height="16" rx="3" fill="#bbb" />
              <path d="M${i*poleSpacing+63} ${poleY+10} Q${i*poleSpacing+80} ${poleY-10}, ${i*poleSpacing+100} ${poleY+10}" stroke="#aaa" stroke-width="4" fill="none" />
              <rect x="${i*poleSpacing+98}" y="${poleY+7}" width="16" height="6" rx="3" fill="#bbb" />
              <text x="${i*poleSpacing+106}" y="${poleY+35}" text-anchor="middle" font-size="13" fill="#fff" opacity="0.7">${i+1}</text>
            </g>
          `).join('')}
        </g>
        <g id="lights">
          ${Array.from({length: poleCount}).map((_,i) => `
            <g id="light${i+1}">
              <ellipse id="cone${i+1}" cx="${i*poleSpacing+106}" cy="${poleY+13}" rx="36" ry="16" fill="${(i+1)>=carPole&&(i+1)<=8?'#ffb30033':'#ffb30000'}" />
              <rect id="lamp${i+1}" x="${i*poleSpacing+98}" y="${poleY+7}" width="16" height="6" rx="3" fill="${(i+1)>=carPole&&(i+1)<=8?'#ffb300':'#555'}" />
            </g>
          `).join('')}
        </g>
        <g id="car-group">
          <rect id="car-body" x="${(carPole-1)*poleSpacing+60}" y="${roadY-32}" width="48" height="22" rx="6" fill="#181b1f" stroke="#222" stroke-width="2" />
          <rect id="car-cabin" x="${(carPole-1)*poleSpacing+68}" y="${roadY-42}" width="22" height="14" rx="4" fill="#232326" />
          <circle id="car-wheel1" cx="${(carPole-1)*poleSpacing+74}" cy="${roadY-10}" r="6" fill="#232326" />
          <circle id="car-wheel2" cx="${(carPole-1)*poleSpacing+94}" cy="${roadY-10}" r="6" fill="#232326" />
          <polygon id="car-headlight" points="${(carPole-1)*poleSpacing+108},${roadY-20} ${(carPole-1)*poleSpacing+148},${roadY-10} ${(carPole-1)*poleSpacing+148},${roadY-2} ${(carPole-1)*poleSpacing+108},${roadY-2}" fill="#ffe082" opacity="0.7" />
        </g>
      </svg>`;
    }
    renderDemo();
    // Controls
    const moveBtn = document.getElementById('move-car-btn');
    const replayBtn = document.getElementById('replay-demo-btn');
    const seeActionBtn = document.getElementById('see-action-btn');
    function updateDemo() { renderDemo(); }
    if (moveBtn) moveBtn.onclick = () => { if (carPole < 8) { carPole++; updateDemo(); } };
    if (replayBtn) replayBtn.onclick = () => { carPole = 1; updateDemo(); };
    if (seeActionBtn) seeActionBtn.onclick = () => {
      const howSection = document.getElementById('how');
      if (howSection) howSection.scrollIntoView({behavior:'smooth'});
    };
  }
}); 
