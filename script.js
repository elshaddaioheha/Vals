// Ensure fonts loaded for best animation
window.addEventListener('DOMContentLoaded', () => document.body.classList.add('loaded'));

const message =
`Happy Valentine's Day! I don't want to say too much but I appreciate your amazing and strong personality. You are beautiful and I hope you know oh. But no know too much make e enter your head. You are true to your words, (don't ask me how) firm when needed and show true love. I hope that life gives you all that you deserve and that's nothing but kindness, good things and good people. I would love to say more but I have test tomorrow (Friday) I hope they cancel it. I love you (yes, I said it come and beat me). I would go on to glaze you but that's not the purpose of this letter😂. I wish you good things and I will continue to spoil you oh my madam. I think that should be all for now. I will write more as I am prompted and enabled to. I still excited to see how Saturday goes🌚. Make I go read abeg.`;

const btn = document.getElementById('revealBtn');
const messageWrapper = document.getElementById('messageWrapper');
const messageText = document.getElementById('messageText');
const prompt = document.getElementById('messagePrompt');
const confettiContainer = document.getElementById('confettiContainer');

let revealed = false;

/* Button interaction & reveal sequence */
btn.addEventListener('click', (e) => {
  if (revealed) return;
  revealed = true;
  // Animate ripple effect
  const rect = btn.getBoundingClientRect();
  btn.classList.add('ripple');
  btn.style.setProperty('--x', `${e.clientX - rect.left}px`);
  btn.style.setProperty('--y', `${e.clientY - rect.top}px`);
  setTimeout(() => btn.classList.remove('ripple'), 400);

  // Remove prompt, animate button out, show message in
  prompt.textContent = '';
  btn.style.pointerEvents = "none";
  btn.style.opacity = 0;
  btn.style.transform = "translateY(-40px) scale(0.8)";
  setTimeout(() => {
    btn.style.display = "none";
    messageWrapper.classList.add('revealed');
    typewriterReveal(message, messageText);
    confettiBurst();
  }, 350);
});

/* Keyboard accessibility: Enter/Space triggers click */
btn.addEventListener("keydown", function(e) {
  if (e.code === "Enter" || e.code === "Space" || e.key === " " || e.key === "Enter") {
    btn.click();
    e.preventDefault();
  }
});

/* Animate typewriter effect for reveal */
function typewriterReveal(msg, el) {
  el.classList.add('typewriter');
  el.textContent = '';
  let i = 0;
  function write() {
    if (i < msg.length) {
      el.textContent += msg[i];
      if (msg[i] === "\n" || msg[i] === ".") el.scrollIntoView({behavior: 'smooth', block: 'nearest'});
      i++;
      setTimeout(write, Math.random() * 30 + 50); // 50-80ms natural typing
    } else {
      el.classList.remove('typewriter');
    }
  }
  write();
}

/* Confetti burst - 20-30 colored hearts */
function confettiBurst() {
  const emojis = ['💜', '💕', '💖', '🌸', '💗','💝'];
  const confettiPieces = 24;
  for (let i = 0; i < confettiPieces; i++) {
    const div = document.createElement('div');
    div.className = 'confetti';
    div.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    confettiContainer.appendChild(div);

    // Random path and gravity with requestAnimationFrame
    const angle = Math.random() * (Math.PI * 2);
    const velocity = Math.random() * 6 + 6;
    const rot = (Math.random() - 0.5) * 100;

    let x = 0, y = 0, time = 0;
    function animate() {
      time += 1/60;
      x = Math.cos(angle) * velocity * time * 2 + window.innerWidth/2;
      y = Math.sin(angle) * velocity * time * 1.6 + 0.5 * 168 * (time**2);
      div.style.transform = `translate(${x + (Math.random()-0.5)*16}px, ${y}px) rotate(${rot*time}deg) scale(${1.1-Math.min(0.8,time/2)})`;
      div.style.opacity = \
`${Math.max(1 - time/2.5, 0)}`;
      if (y < window.innerHeight*0.95 && time < 2.1) requestAnimationFrame(animate);
      else setTimeout(() => div.remove(), 220);
    }
    setTimeout(animate, Math.random() * 180 + 10);
  }
}

/* Bokeh/particles: optional for desktop only */
window.addEventListener("load", () => {
  const canvas = document.getElementById('bokeh');
  if (!canvas || window.innerWidth < 800) return;
  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize(); window.addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for (let i = 0; i < 20; i++) {
      const x = Math.random()*canvas.width, y = Math.random()*canvas.height/1.2;
      const r = Math.random()*28 + 18;
      ctx.globalAlpha = (Math.sin(Date.now()/1300 + i*7) + 1.35)/4 + 0.06;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI*2);
      ctx.fillStyle = i%2===0 ? "#ffe3f3" : "#ffb3c6";
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
});

/* Scroll Animation with Intersection Observer */
const animatedEls = document.querySelectorAll('[data-animate]');
if ('IntersectionObserver' in window && animatedEls.length) {
  const observer = new window.IntersectionObserver(
    (entries) => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    }), { threshold: 0.20 }
  );
  animatedEls.forEach(el => observer.observe(el));
}

/* Focus-visible styles handled in CSS. Ensures accessibility. */

// Make hearts SVG or emoji
const heartSpans = document.querySelectorAll('.heart');
heartSpans.forEach(h => h.innerText = '💜');
