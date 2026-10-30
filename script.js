/**
 * Python Full Stack Developer Portfolio
 * Interactive Scripts: Typing Hero, Live Terminal CLI, Category Filters, Modals, Contact Form
 */

// ============================================================================
// 1. Dynamic Typing Effect for Hero Section
// ============================================================================
const typedTextElement = document.getElementById('typedText');
const roles = [
  'Python Full Stack Developer',
  'Django & FastAPI Developer',
  'MySQL Database Practitioner',
  'Docker & Git Specialist',
  'BCA Student & Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 90;

function typeEffect() {
  if (!typedTextElement) return;
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 45;
  } else {
    typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 90;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typingSpeed = 1800; // Pause at end of text
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 400; // Pause before typing next word
  }

  setTimeout(typeEffect, typingSpeed);
}

// ============================================================================
// 2. Mobile Navigation Toggle
// ============================================================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      menuIcon.setAttribute('name', 'close-outline');
    } else {
      mobileMenu.classList.add('hidden');
      menuIcon.setAttribute('name', 'menu-outline');
    }
  });

  // Close mobile menu when a nav link is clicked
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIcon.setAttribute('name', 'menu-outline');
    });
  });
}

// Navbar shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('shadow-lg', 'shadow-black/20');
  } else {
    navbar.classList.remove('shadow-lg', 'shadow-black/20');
  }
});

// ============================================================================
// 3. Technical Skills Category Filter
// ============================================================================
const filterButtons = document.querySelectorAll('.skill-filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button state
    filterButtons.forEach(b => {
      b.classList.remove('active', 'bg-emerald-500', 'text-slate-950');
      b.classList.add('text-slate-400', 'bg-slate-800/60');
    });
    btn.classList.add('active', 'bg-emerald-500', 'text-slate-950');
    btn.classList.remove('text-slate-400', 'bg-slate-800/60');

    const filter = btn.getAttribute('data-filter');

    skillCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (filter === 'all' || cardCategory === filter) {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ============================================================================
// 4. Interactive Terminal Simulator (Recruiter CLI)
// ============================================================================
const terminalInput = document.getElementById('terminalInput');
const terminalHistory = document.getElementById('terminalHistory');
const terminalBody = document.getElementById('terminalBody');

// Command history tracking (Up/Down arrow key navigation)
const commandHistory = [];
let historyIndex = -1;

const commandRegistry = {
  help: () => `
<div class="text-emerald-400 font-bold mb-1">AVAILABLE COMMANDS:</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
  <div><span class="text-cyan-400 font-bold">about</span>       - Brief summary & profile</div>
  <div><span class="text-cyan-400 font-bold">resume</span>      - Open / print 1-page resume</div>
  <div><span class="text-cyan-400 font-bold">skills</span>      - Python full-stack stack overview</div>
  <div><span class="text-cyan-400 font-bold">projects</span>    - Featured engineering projects</div>
  <div><span class="text-cyan-400 font-bold">education</span>   - College degree, CGPA & certificates</div>
  <div><span class="text-cyan-400 font-bold">contact</span>     - Email, Phone & Social handles</div>
  <div><span class="text-cyan-400 font-bold">python</span>      - Python version & environment</div>
  <div><span class="text-cyan-400 font-bold">date</span>        - Display current system timestamp</div>
  <div><span class="text-cyan-400 font-bold">clear</span>       - Clear current terminal screen</div>
  <div><span class="text-cyan-400 font-bold">sudo hire</span>   - Unlock direct offer letter flow!</div>
</div>`,

  resume: () => `
<div class="space-y-1 text-xs text-slate-300">
  <div class="text-emerald-400 font-bold">📄 Professional ATS Resume:</div>
  <div>Single-page print-ready resume is ready.</div>
  <div>👉 <a href="resume.html" target="_blank" class="text-cyan-400 underline font-bold">Open Resume (resume.html) in New Tab</a></div>
</div>`,

  about: () => `
<div class="space-y-1 text-slate-300">
  <div class="text-white font-bold">Selva Ganesh L — Aspiring Python Full Stack Software Engineer</div>
  <div>• Final Year BCA (Bachelor of Computer Applications) Student</div>
  <div>• Passionate about clean REST API design, database schemas & intuitive frontend UIs.</div>
  <div>• Location: Puthiyamputhur, Thoothukudi, Tamil Nadu</div>
</div>`,

  skills: () => `
<div class="space-y-1.5 text-xs">
  <div><span class="text-emerald-400 font-bold">[Backend]:</span>   Python, Django, FastAPI, OOPs Concepts</div>
  <div><span class="text-cyan-400 font-bold">[Frontend]:</span>  JavaScript (ES6+), CSS &amp; HTML</div>
  <div><span class="text-blue-400 font-bold">[Database]:</span>  MySQL Relational Database</div>
  <div><span class="text-purple-400 font-bold">[Tools]:</span>     Git, GitHub, Docker Containerization</div>
</div>`,

  projects: () => `
<div class="space-y-1.5 text-xs text-slate-300">
  <div class="text-emerald-400 font-bold">🚀 Projects In Progress:</div>
  <div>• Currently building web applications using Python, Django, FastAPI, MySQL &amp; Docker.</div>
  <div>• Repositories and live demos will be added to GitHub soon: <a href="https://github.com" target="_blank" class="text-cyan-400 underline">github.com/selvaganesh</a></div>
</div>`,

  education: () => `
<div class="space-y-1.5 text-slate-300 text-xs">
  <div>🎓 <span class="text-white font-bold">BCA (Bachelor of Computer Applications)</span> (2024 - 2027)</div>
  <div class="text-slate-400 pl-4">Kamaraj College (Autonomous), Thoothukudi | CGPA: <span class="text-emerald-400 font-bold">7.23/10</span> (Up to 4th Sem)</div>
  <div class="pt-1">🏫 <span class="text-white font-bold">Higher Secondary (12th State Board)</span> (2023 - 2024)</div>
  <div class="text-slate-400 pl-4">Mahatma Matric Hr. Sec. School | Score: <span class="text-cyan-400 font-bold">60%</span></div>
  <div class="pt-1">📜 <span class="text-emerald-400 font-bold">Professional Certifications (POSTULATE - ISO 9001:2015):</span></div>
  <div class="text-slate-400 pl-4">• <span class="text-white font-semibold">FULL STACK WEB DEVELOPMENT - PYTHON STACK</span> (C.No: 4060 | Distinction | 17-Feb-2026)</div>
  <div class="text-slate-400 pl-4">• <span class="text-white font-semibold">PYTHON PROGRAMMING</span> (C.No: 3229 | Distinction | 22-Jul-2025)</div>
</div>`,

  contact: () => `
<div class="space-y-1 text-xs">
  <div>📧 <span class="text-slate-400">Email:</span> <a href="mailto:selvaganesh2511200@gmail.com" class="text-emerald-400 underline">selvaganesh2511200@gmail.com</a></div>
  <div>📱 <span class="text-slate-400">WhatsApp/Phone:</span> <a href="tel:+918220235350" class="text-emerald-400 underline">+91 82202 35350</a></div>
  <div>📍 <span class="text-slate-400">Address:</span> 1/271, Sivan Kovil St, Puthiyamputhur, Thoothukudi - 628 402</div>
  <div>💼 <span class="text-slate-400">LinkedIn:</span> <a href="https://www.linkedin.com/in/selva-ganesh-l-467988241" target="_blank" class="text-cyan-400 underline">linkedin.com/in/selva-ganesh-l-467988241</a></div>
  <div>💻 <span class="text-slate-400">GitHub:</span> <a href="https://github.com" target="_blank" class="text-slate-200 underline">github.com/selvaganesh</a></div>
</div>`,

  python: () => `
<div class="text-xs font-mono text-emerald-400">
  Python 3.12.0 (tags/v3.12.0:0fb18b0, Oct 2023) [MSC v.1935 64 bit (AMD64)] on win32<br>
  Type "help", "copyright", "credits" or "license" for more information.<br>
  &gt;&gt;&gt; Ready to execute high-performance web backends!
</div>`,

  date: () => `
<div class="text-xs text-slate-300">
  Current System Time: <span class="text-cyan-400">${new Date().toLocaleString()}</span>
</div>`,

  'sudo hire': () => `
<div class="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs space-y-1">
  <div class="font-bold text-sm text-emerald-400">🎉 Congratulations! Offer Decision Executed!</div>
  <div>Permission granted. You've discovered a hardworking, fast-learning Python full-stack developer.</div>
  <div>Ready for interview rounds, technical assignments, and immediate joining.</div>
  <div class="pt-1 font-mono text-white">Let's connect: <span class="text-amber-300">selvaganesh2511200@gmail.com</span></div>
</div>`
};

function handleTerminalCommand(rawInput) {
  const trimmed = rawInput.trim();
  if (!trimmed) return;

  const normalized = trimmed.toLowerCase();

  // Add command to history
  commandHistory.push(trimmed);
  historyIndex = commandHistory.length;

  if (normalized === 'clear') {
    terminalHistory.innerHTML = '';
    return;
  }

  // Create terminal history entry
  const entry = document.createElement('div');
  entry.className = 'space-y-1.5 pt-1';

  const userLine = document.createElement('div');
  userLine.className = 'flex items-center gap-2 text-slate-200';
  userLine.innerHTML = `<span class="text-emerald-400 font-bold">visitor@selva:~$</span> <span>${escapeHtml(trimmed)}</span>`;

  const outputLine = document.createElement('div');
  outputLine.className = 'text-slate-300 pl-4 border-l border-slate-700/60 my-1';

  if (commandRegistry[normalized]) {
    outputLine.innerHTML = commandRegistry[normalized]();
  } else {
    outputLine.innerHTML = `
      <div class="text-rose-400 text-xs">
        command not found: <span class="font-bold text-white">${escapeHtml(trimmed)}</span>. 
        Type <span class="text-amber-300 font-bold cursor-pointer underline" onclick="executeQuickCommand('help')">'help'</span> for a list of valid commands.
      </div>`;
  }

  entry.appendChild(userLine);
  entry.appendChild(outputLine);
  terminalHistory.appendChild(entry);

  // Scroll to bottom
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Terminal input keydown listener
if (terminalInput) {
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      handleTerminalCommand(val);
    } else if (e.key === 'ArrowUp') {
      if (commandHistory.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
      e.preventDefault();
    }
  });
}

// Quick execute helper
window.executeQuickCommand = function(cmd) {
  if (terminalInput) {
    terminalInput.value = cmd;
    handleTerminalCommand(cmd);
    terminalInput.value = '';
    terminalInput.focus();
  }
};

window.clearTerminal = function() {
  if (terminalHistory) {
    terminalHistory.innerHTML = '';
  }
};

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// ============================================================================
// 5. Project Specification Modal Details
// ============================================================================
const projectSpecs = {
  devflow: {
    title: 'DevFlow - Developer Community Q&A',
    badge: 'Django + MySQL + JavaScript',
    desc: 'DevFlow is a full-featured collaborative question-and-answer platform built for engineering students to discuss coding bugs, share architectural advice, and build a technical knowledge base.',
    features: [
      'Session & Token-based Authentication with user profiles and security',
      'Dynamic voting mechanism: Upvote, Downvote, and reputation scoring',
      'Accepted answer solution marking by original question author',
      'Rich Markdown editor integration with automated client-side syntax highlighting',
      'Relational MySQL schema with multi-table indexing and search queries'
    ],
    architecture: [
      'Backend: Django MVT & REST Views',
      'Database: MySQL database with automated migrations',
      'Frontend: JavaScript, HTML5 & CSS3 responsive layout',
      'Container: Dockerized setup with Dockerfile'
    ],
    github: 'https://github.com'
  },
  smartspend: {
    title: 'SmartSpend - Student Expense Tracker',
    badge: 'FastAPI + MySQL + Docker',
    desc: 'A lightweight financial tracking system designed specifically for college hostelers and students to log expenses, set category budgets (Food, Books, Travel), and gain visual monthly spending insights.',
    features: [
      'Asynchronous REST endpoints powered by FastAPI and Starlette',
      'Strict input serialization and validation using Pydantic V2',
      'Dynamic interactive charts: Category donut charts and monthly burn rate bar charts',
      'One-click CSV/JSON transaction statement export',
      'Auto-generated interactive API documentation via Swagger UI (/docs)'
    ],
    architecture: [
      'Backend: Python 3 with FastAPI',
      'Database: MySQL with relational schema modeling',
      'Frontend: Responsive JavaScript & CSS',
      'Deployment: Dockerfile containerization'
    ],
    github: 'https://github.com'
  },
  campushub: {
    title: 'CampusHub - College Event & Club Portal',
    badge: 'Django + MySQL + Bootstrap',
    desc: 'An automated college event booking and student registration platform designed to eliminate paper-based ticketing for symposiums, cultural fests, and workshops.',
    features: [
      'Three-tier Role-Based Access Control: SuperAdmin, Club Coordinators, and Students',
      'Dynamic QR code generation on ticket confirmation for easy on-day check-in',
      'Real-time RSVP limit tracking to prevent venue overbooking',
      'Email confirmation notifications sent automatically upon registration',
      'Comprehensive organizer dashboard to view attendee lists and download Excel logs'
    ],
    architecture: [
      'Framework: Django MVT Architecture',
      'Database: MySQL with foreign key cascading and transaction isolation',
      'Email & QR: Python qrcode module + SMTP email integration'
    ],
    github: 'https://github.com'
  },
  pysnipp: {
    title: 'PySnipp - Python Snippet Sharer Microservice',
    badge: 'Flask + Redis + RESTful API',
    desc: 'A developer utility tool allowing programmers to paste Python code fragments, configure expiration times (TTL), and share clean syntax-highlighted URLs or fetch raw code programmatically.',
    features: [
      'High-speed read/write access powered by an in-memory Redis key-value store',
      'Cryptographically secure short-hash generator for snippet URLs (e.g. /s/a9f2)',
      'One-click "Copy Raw Code" and "Copy Embed Link" clipboard operations',
      'REST API endpoint for programmatic command-line sharing: curl -X POST ...'
    ],
    architecture: [
      'Backend: Flask micro-framework with Blueprint modularity',
      'Cache/Store: Redis for fast key lookups and automatic TTL expiration',
      'Frontend: Minimalist dark-mode developer UI with PrismJS'
    ],
    github: 'https://github.com'
  }
};

const projectModal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');

window.openProjectModal = function(projectId) {
  const data = projectSpecs[projectId];
  if (!data) return;

  modalContent.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center justify-between gap-3 pr-8">
        <h3 class="text-xl sm:text-2xl font-bold text-white">${data.title}</h3>
      </div>
      <div class="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs border border-emerald-500/20">
        ${data.badge}
      </div>
      <p class="text-slate-300 text-sm leading-relaxed">${data.desc}</p>
      
      <div class="space-y-2 pt-2">
        <h4 class="text-xs font-mono text-cyan-400 uppercase font-semibold">Key Capabilities & Features:</h4>
        <ul class="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
          ${data.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>

      <div class="space-y-2 pt-2">
        <h4 class="text-xs font-mono text-emerald-400 uppercase font-semibold">Technical Architecture:</h4>
        <ul class="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
          ${data.architecture.map(a => `<li>${a}</li>`).join('')}
        </ul>
      </div>

      <div class="pt-4 flex items-center gap-3">
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2 border border-slate-700">
          <ion-icon name="logo-github" class="text-base"></ion-icon>
          <span>View GitHub Repo</span>
        </a>
        <button onclick="closeProjectModal()" class="px-5 py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs">
          Close
        </button>
      </div>
    </div>
  `;

  projectModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

window.closeProjectModal = function() {
  projectModal.classList.add('hidden');
  document.body.style.overflow = 'auto';
};

window.openCertificateModal = function(imgSrc, title, certNo, issueDate) {
  if (!modalContent || !projectModal) return;

  modalContent.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-start justify-between gap-3 pr-8">
        <div>
          <span class="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[11px] border border-emerald-500/20 mb-1">
            ISO 9001:2015 Certified • POSTULATE
          </span>
          <h3 class="text-lg sm:text-2xl font-bold text-white">${title}</h3>
          <div class="text-xs font-mono text-slate-400 mt-1 flex flex-wrap gap-x-4 gap-y-1">
            <span>Certificate No: <strong class="text-cyan-400">${certNo}</strong></span>
            <span>Date: <strong class="text-slate-200">${issueDate}</strong></span>
            <span class="text-amber-300 font-semibold">★ First Class with Distinction</span>
          </div>
        </div>
      </div>
      
      <!-- Full Certificate Display -->
      <div class="rounded-xl overflow-hidden border border-slate-800 bg-[#090d16] flex items-center justify-center p-2">
        <img src="${imgSrc}" alt="${title} Certificate" class="w-full max-h-[62vh] object-contain rounded shadow-2xl" />
      </div>

      <div class="pt-2 flex flex-wrap items-center justify-between gap-3">
        <a href="${imgSrc}" target="_blank" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2 hover:opacity-90 transition-opacity">
          <ion-icon name="open-outline" class="text-base"></ion-icon>
          <span>Open Full Resolution Image</span>
        </a>
        <button onclick="closeProjectModal()" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold">
          Close
        </button>
      </div>
    </div>
  `;

  projectModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

// Close modal when clicking outside box
if (projectModal) {
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });
}

// ============================================================================
// 6. Contact Form Submission & Mailto Fallback
// ============================================================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim() || 'Portfolio Inquiry / Job Opportunity';
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      showFormStatus('Please complete all required fields.', 'error');
      return;
    }

    // Construct mailto link
    const mailtoBody = encodeURIComponent(
      `Hi Selva,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`
    );
    const mailtoUrl = `mailto:selvaganesh2511200@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

    // Show success message
    showFormStatus(
      `✓ Thank you, ${name}! Launching your default email client to send message...`,
      'success'
    );

    // Open mailto link
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 800);

    // Reset form after a brief delay
    contactForm.reset();
  });
}

function showFormStatus(msg, type) {
  if (!formStatus) return;
  formStatus.classList.remove('hidden', 'bg-emerald-500/10', 'text-emerald-400', 'border-emerald-500/20', 'bg-rose-500/10', 'text-rose-400', 'border-rose-500/20');
  
  if (type === 'success') {
    formStatus.classList.add('bg-emerald-500/10', 'text-emerald-400', 'border', 'border-emerald-500/20');
  } else {
    formStatus.classList.add('bg-rose-500/10', 'text-rose-400', 'border', 'border-rose-500/20');
  }

  formStatus.textContent = msg;

  setTimeout(() => {
    formStatus.classList.add('hidden');
  }, 6000);
}

// ============================================================================
// 7. Interactive 3D Tilt Animation for Profile Photo on Mouse Hover
// ============================================================================
const profileCard = document.getElementById('profileCard');

if (profileCard) {
  profileCard.addEventListener('mousemove', (e) => {
    const rect = profileCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-12deg to +12deg)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    profileCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale(1.03)`;
  });

  profileCard.addEventListener('mouseleave', () => {
    profileCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
  });
}

// ============================================================================
// 8. Initialization
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  typeEffect();
});

