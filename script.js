// Dream of Freedom interactivity & content injection

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// === Config ===
// Ordered: free first, then cheapest -> most expensive (1-at-a-time carousel)
const PRODUCTS = [
  {
    title: "The 30-Day Online Business Starter Checklist",
    price: "$0+",
    link: "https://jared585.gumroad.com/l/sbqwjb",
    blurb: "A day-by-day launch plan. Printable and trackable.",
  },
  {
    title: "10 AI Money Hacks the Gurus Don’t Want You to Know",
    price: "$7",
    link: "https://jared585.gumroad.com/l/jxgog",
    blurb: "Shortcuts and systems you can deploy in a weekend.",
  },
  {
    title: "47-Method AI Profit Guide",
    price: "$17",
    link: "https://jared585.gumroad.com/l/ithyji",
    blurb: "47 practical methods to earn with AI — clearly explained, no fluff.",
  },
  {
    title: "Start a Business in 2025 (The Complete Guide)",
    price: "$31",
    link: "https://jared585.gumroad.com/l/oygcb",
    blurb: "From idea to launch — current, actionable, and realistic.",
  },
  {
    title: "50 Exclusive Money Secrets They Don’t Want You to Know",
    price: "$37",
    link: "https://jared585.gumroad.com/l/uhhjt",
    blurb: "Battle-tested money moves and mindset upgrades.",
  },
];

// Customer Wall (edit/add below)
const TESTIMONIALS = [
  { name: "K.P.", text: "No hype, just useful. The checklist kept me moving every day.", stars: 5 },
  { name: "D.S.", text: "Worth it for the templates alone. Clear and honest.", stars: 5 },
];

// === Build product slider (1-at-a-time with swipe) ===
const slidesEl = document.getElementById('product-slides');
const sliderRoot = document.querySelector('.slider');
function buildSlides() {
  slidesEl.innerHTML = "";
  PRODUCTS.forEach(p => {
    const item = document.createElement('div');
    item.className = 'product';
    const isFree = p.price.trim().startsWith("$0");
    const label = isFree ? "Get It Free" : "Buy on Gumroad";
    item.innerHTML = `
      <h3>${p.title}</h3>
      <p class="price">${p.price}</p>
      <p>${p.blurb}</p>
      <a class="btn" target="_blank" rel="noopener" href="${p.link}">${label}</a>
    `;
    slidesEl.appendChild(item);
  });
}
buildSlides();

let index = 0;
function updateSlider() {
  const viewportWidth = sliderRoot.getBoundingClientRect().width;
  slidesEl.style.transform = `translateX(${-index * viewportWidth}px)`;
}

function clampIndex() {
  const maxIndex = PRODUCTS.length - 1;
  if (index < 0) index = 0;
  if (index > maxIndex) index = maxIndex;
}

addEventListener('resize', updateSlider);
updateSlider();

document.querySelector('.slide-btn.prev').addEventListener('click', () => { index--; clampIndex(); updateSlider(); });
document.querySelector('.slide-btn.next').addEventListener('click', () => { index++; clampIndex(); updateSlider(); });

// Keyboard navigation
addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') { index--; clampIndex(); updateSlider(); }
  if (e.key === 'ArrowRight') { index++; clampIndex(); updateSlider(); }
});

// Touch swipe
let startX = null;
sliderRoot.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, {passive:true});
sliderRoot.addEventListener('touchend', (e) => {
  if (startX === null) return;
  const endX = e.changedTouches[0].clientX;
  const dx = endX - startX;
  const threshold = 50; // px
  if (dx > threshold) { index--; clampIndex(); updateSlider(); }
  else if (dx < -threshold) { index++; clampIndex(); updateSlider(); }
  startX = null;
}, {passive:true});

// Build testimonials
const wall = document.getElementById('testimonials');
TESTIMONIALS.forEach(t => {
  const el = document.createElement('div');
  el.className = 'testimonial';
  el.innerHTML = `
    <div class="stars">★★★★★</div>
    <p>${t.text}</p>
    <div class="name">— ${t.name}</div>
  `;
  wall.appendChild(el);
});

// Freebie button (MailerLite)
document.getElementById('freebie-mailerlite').addEventListener('click', (e) => {
  const url = "https://preview.mailerlite.io/forms/1651327/162231400689304578/share";
  if (!url || url.startsWith("#ADD_")) {
    e.preventDefault();
    alert("Add your MailerLite link first. Open script.js and set the freebie URL.");
  } else {
    e.currentTarget.setAttribute('href', url);
  }
});
