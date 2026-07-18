document.addEventListener('DOMContentLoaded', () => {
  // ================================================================
  //  ✨  YOUR CUSTOM CONTENT HERE — EDIT THESE ONLY  ✨
  // ================================================================
  const DEFAULT_YOUTUBE_URL = 'https://youtu.be/CnVVjLOGVoY?si=RVXbTAEhtKHzVnD5';
  const DEFAULT_LETTER = `My dearest love,

On this special day, I just wanted to remind you of something I hope you never forget—you are one of the best things that has ever happened to me. Every single day, I thank God that our paths crossed because meeting you changed my life in ways I never expected.

Before you came into my life, I had already accepted the idea that maybe love just wasn't meant to be easy for me. I became careful with my heart because I knew how painful it was to give everything to someone and still end up getting hurt. I built walls around myself, thinking they would protect me.

Then you came along.

Without even trying, you slowly broke down every wall I had built. You made me smile again, laugh again, and believe that genuine love still exists. You showed me that love doesn't always have to hurt. It can also bring peace, comfort, and happiness.

I know our relationship isn't perfect, and I know we still have a lot to learn about each other. But one thing I'm completely sure of is that I never want to lose what we have. Every conversation with you, every laugh we share, every little "I love you," and every moment we spend together, even through a screen, means so much to me.

I know we're in a long-distance relationship right now, and sometimes it's difficult not being able to hug you when you need comfort or kiss you when you're smiling. There are moments when I wish I could teleport just to spend a few minutes with you. But no matter how far apart we are, my heart has never felt closer to anyone than it does with you.

Please stay strong for us, baby. Let's keep believing that this distance is only temporary. One day, we won't have to count the days until we see each other anymore. I'll finally get to hold your hand, cuddle you whenever I want, kiss your forehead, and tell you "I love you" while looking into your beautiful eyes instead of through a phone screen.

Thank you for being patient with me, for understanding me, and for accepting me for who I am. Thank you for making me feel loved in ways I never experienced before. You make even the ordinary days feel special just because you're a part of them.

I know I'm not perfect. I'll make mistakes, I'll have moments when I overthink, and sometimes I'll need a little extra reassurance. But one thing you'll never have to question is how much I love you. My love for you is real, sincere, and genuine. Every day, I'll continue choosing you, respecting you, supporting you, and loving you with all that I have.

Whenever life gets hard, I hope you remember that you don't have to face everything alone anymore. You have me. I'll always be here to listen, encourage you, celebrate your victories, and stay beside you through your difficult days. I want to be your safe place, just like you've become mine.

Let's promise each other that no matter how busy life gets or how many misunderstandings we face, we'll never stop communicating. Let's never let pride be stronger than our love. Let's always choose to understand before judging, to forgive before giving up, and to fight for each other instead of against each other.

You are my favorite person, my greatest blessing, my peace, and the love I've been praying for without even realizing it. I don't know what the future has planned for us, but I know this: as long as you're willing to keep choosing me, I'll keep choosing you too.

I can't wait for the day when our good morning texts become real good mornings beside each other, when our goodnight calls turn into goodnight kisses, and when "I miss you" becomes something we rarely have to say because we'll finally be together.

Until then, I'll keep loving you a little more every single day.

I love you endlessly, my love. Thank you for making my heart feel at home. ❤️`;
  const DEFAULT_PICTURES = [
    'images/photo1.jpg', 
    'images/photo2.jpg', 
    'images/photo3.jpg', 
    'images/photo4.jpg', 
    'images/photo5.jpg', 
    'images/photo6.jpg', 
    'images/photo7.jpg', 
    'images/photo8.jpg', 
    'images/photo9.jpg', 
    'images/photo10.jpg',
    'images/photo11.jpg',
    'images/photo12.jpg',
    'images/photo13.jpg',
    'images/photo14.jpg',
    'images/photo15.jpg',
    'images/photo16.jpg',
    'images/photo17.jpg',
    'images/photo18.jpg',
    'images/photo19.jpg',
    'images/photo20.jpg',
    'images/photo21.jpg',
    'images/photo22.jpg',
    // 'images/photo1.jpg',
    // 'https://example.com/photo2.jpg',
  ];
  // Put your .mp3 song file here (drop the file in this folder), e.g. 'song.mp3'
  const DEFAULT_SONG_MP3 = 'bgmusic.mp3';
  // true = auto-play the song on the birthday page after unlock
  const AUTO_PLAY_SONG = true;
  // Separate song for the Music page (set to a different .mp3 filename if you want)
  const MUSIC_PAGE_MP3 = 'bgmusic.mp3';
  // ================================================================
  //  NO NEED TO TOUCH ANYTHING BELOW THIS LINE
  // ================================================================

  // ---------- tiny helpers ----------
  const $ = (id) => document.getElementById(id);
  const qs = (s) => document.querySelector(s);
  const qsa = (s) => document.querySelectorAll(s);

  // ---------- audio (clicks + bg song) ----------
  let audioCtx = null;
  function initAudio() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    }
  }
  function blip(freq = 660, dur = 0.08, type = 'sine', vol = 0.05) {
    if (!audioCtx) return;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime + dur);
  }
  function haptic(ms = 12) { if (navigator.vibrate) navigator.vibrate(ms); }

  // ---------- DOM refs ----------
  const pages = {
    lock: $('page-lock'), birthday: $('page-birthday'), menu: $('page-menu'),
    music: $('page-music'), letter: $('page-letter'), pictures: $('page-pictures')
  };
  const dots = [$('dot0'), $('dot1'), $('dot2'), $('dot3')];
  const numpad = qs('.numpad');
  const heartBtn = $('heartBtn');
  const heartsBg = $('heartsBg');
  const tulipContainer = $('tulipContainer');
  const cursorTrail = $('cursorTrail');
  const confettiContainer = $('confettiContainer');
  const menuBtns = qsa('.menu-btn');
  const imageInput = $('imageInput');
  const picturesGrid = $('picturesGrid');
  const uploadCard = $('uploadCard');
  const fullscreenBtn = $('fullscreenBtn');
  // love meter
  const loveTabs = qsa('.tab');
  const loveBtn = $('loveBtn');
  const loveFill = $('loveFill');
  const lovePercent = $('lovePercent');
  // music page
  const playMusicBtn = $('playMusicBtn');
  const musicVideo = $('musicVideo');
  let musicVideoUrl = 'visualmusic.mp4';
  if (musicVideo && musicVideo.src) {
    musicVideoUrl = musicVideo.src;
    playMusicBtn.disabled = false;
    musicVideo.parentElement.classList.add('has-video');
  } else if (musicVideo) {
    musicVideo.src = musicVideoUrl;
    playMusicBtn.disabled = false;
    musicVideo.parentElement.classList.add('has-video');
  }
  // lightbox
  const lightbox = $('lightbox');
  const lightboxImg = $('lightboxImg');
  const lightboxClose = $('lightboxClose');
  const lightboxPrev = $('lightboxPrev');
  const lightboxNext = $('lightboxNext');
  // slideshow
  const slideshowBtn = $('slideshowBtn');
  // tabs
  const tabMain = $('tab-main');
  const tabLove = $('tab-love');
  const tabGift = $('tab-gift');

  // ---------- falling tulips ----------
  function createFallingTulips() {
    if (!tulipContainer) return;
    const emojis = ['🌷','🌸','🌺','💐','🩷'];
    for (let i = 0; i < 18; i++) {
      const t = document.createElement('div');
      t.className = 'falling-tulip';
      t.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      t.style.left = Math.random() * 95 + '%';
      t.style.fontSize = (Math.random() * 1.5 + 1.2) + 'rem';
      t.style.animationDuration = (Math.random() * 8 + 10) + 's';
      t.style.animationDelay = (Math.random() * 15) + 's';
      tulipContainer.appendChild(t);
    }
  }
  createFallingTulips();

  // ---------- cursor trail (tiny hearts) ----------
  let lastTrail = 0;
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrail < 60) return;
    lastTrail = now;
    const h = document.createElement('div');
    h.className = 'trail-heart';
    h.textContent = ['💕','💗','💖','🌸'][Math.floor(Math.random()*4)];
    h.style.left = e.clientX + 'px';
    h.style.top = e.clientY + 'px';
    cursorTrail.appendChild(h);
    setTimeout(() => h.remove(), 1000);
  });
  // custom heart cursor
  const heartCursor = document.createElement('div');
  heartCursor.textContent = '💗';
  heartCursor.style.cssText = 'position:fixed;pointer-events:none;z-index:9998;font-size:1.4rem;transform:translate(-50%,-50%);transition:left .05s linear,top .05s linear;';
  document.body.appendChild(heartCursor);
  document.addEventListener('mousemove', (e) => {
    heartCursor.style.left = e.clientX + 'px';
    heartCursor.style.top = e.clientY + 'px';
  });

  // ---------- confetti ----------
  const CONFETTI_COLORS = ['#ff6b9d','#e74c3c','#c8a2c8','#ff9ecd','#8a2be2','#ffffff'];
  function burstConfetti(count = 120) {
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.background = CONFETTI_COLORS[Math.floor(Math.random()*CONFETTI_COLORS.length)];
      const size = Math.random() * 8 + 6;
      p.style.width = size + 'px';
      p.style.height = (size * (Math.random()>0.5?0.4:1)) + 'px';
      p.style.borderRadius = Math.random()>0.5 ? '50%' : '2px';
      const dur = Math.random() * 2 + 2.5;
      p.style.animation = `confettiFall ${dur}s linear forwards`;
      p.style.animationDelay = (Math.random() * 0.6) + 's';
      confettiContainer.appendChild(p);
      setTimeout(() => p.remove(), (dur + 1) * 1000);
    }
  }

  // ---------- state ----------
  const CORRECT_PIN = '0604';
  let enteredPin = '';
  let currentPage = 'page-lock';
  let letterTypedOnce = false;

  // ---------- apply custom content ----------
  function applyDefaults() {
    $('letterContent').value = DEFAULT_LETTER;
    DEFAULT_PICTURES.forEach(item => {
      if (Array.isArray(item)) addPictureCard(item[0], item[1]);
      else addPictureCard(item, '');
    });
  }
  try { applyDefaults(); } catch (err) { console.error('applyDefaults failed:', err); }

  // ---------- page navigation ----------
  function showPage(pageName, dir) {
    const prev = pages[currentPage];
    const next = pages[pageName];
    if (prev && prev !== next) {
      if (dir === 'left') prev.classList.add('swipe-left');
      else if (dir === 'right') prev.classList.add('swipe-right');
      setTimeout(() => prev.classList.remove('swipe-left','swipe-right'), 500);
    }
    Object.values(pages).forEach(p => p.classList.remove('active'));
    if (next) { next.classList.add('active'); currentPage = pageName; }
    onPageEnter(pageName);
  }

  function onPageEnter(name) {
    if (name === 'birthday') {
      startFloatingHearts();
      if (AUTO_PLAY_SONG) {
        setTimeout(() => {
          if (bgAudio && bgAudio.paused) bgAudio.play().catch(()=>{});
          else if (!bgAudio) startBirthdaySong();
        }, 50);
      }
    }
    if (name === 'letter' && !letterTypedOnce) {
      typeLetter();
    }
  }

  // ---------- auto-play song on birthday ----------
  let bgAudio = null;
  let bgFrame = null;
  function startBirthdaySong() {
    if (!AUTO_PLAY_SONG) return;
    if (DEFAULT_SONG_MP3) {
      if (!bgAudio) {
        bgAudio = document.getElementById('bgMusic');
        if (!bgAudio) {
          bgAudio = new Audio(DEFAULT_SONG_MP3);
          bgAudio.loop = true;
          bgAudio.volume = 0.6;
          bgAudio.preload = 'auto';
        } else {
          bgAudio.loop = true;
          bgAudio.volume = 0.6;
        }
        bgAudio.addEventListener('error', () => { console.error('Failed to load audio:', DEFAULT_SONG_MP3); });
        bgAudio.addEventListener('ended', () => { bgAudio.currentTime = 0; bgAudio.play().catch(()=>{}); });
      }
      bgAudio.play().then(() => {
      }).catch((e) => {
        console.error('Audio play failed:', e);
      });
      return;
    }
    const vid = extractVideoId(DEFAULT_YOUTUBE_URL);
    if (!vid) return;
    if (!bgFrame) {
      bgFrame = document.createElement('iframe');
      bgFrame.setAttribute('allow', 'autoplay; encrypted-media');
      bgFrame.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;bottom:0;left:0;z-index:-1;';
      document.body.appendChild(bgFrame);
    }
    bgFrame.src = `https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&rel=0`;
  }
  // Safety net: resume on first interaction if blocked
  document.addEventListener('pointerdown', () => {
    if (bgAudio && bgAudio.paused && currentPage !== 'music') bgAudio.play().catch(()=>{});
  }, { once: false });
  document.addEventListener('touchstart', () => {
    if (bgAudio && bgAudio.paused && currentPage !== 'music') bgAudio.play().catch(()=>{});
  }, { once: false });
  // Keep-alive: Chrome may suspend playback after transitions
  setInterval(() => {
    if (bgAudio && bgAudio.paused && AUTO_PLAY_SONG && currentPage !== 'music') bgAudio.play().catch(()=>{});
  }, 2000);
  function updateDots() {
    dots.forEach((d, i) => {
      d.classList.remove('filled','error');
      if (i < enteredPin.length) d.classList.add('filled');
    });
  }
  function checkPin() {
    if (enteredPin === CORRECT_PIN) {
      burstConfetti(140);
      haptic(40);
      showPage('birthday');
    } else if (enteredPin.length === 4) {
      const lockCard = qs('.lock-card');
      dots.forEach(d => d.classList.add('error'));
      if (lockCard) lockCard.classList.add('error-shake');
      haptic(40);
      setTimeout(() => haptic(30), 120);
      setTimeout(() => haptic(40), 240);
      initAudio();
      blip(180, 0.15, 'square', 0.1);
      setTimeout(() => blip(140, 0.15, 'square', 0.1), 150);
      setTimeout(() => {
        dots.forEach(d => d.classList.remove('error'));
        if (lockCard) lockCard.classList.remove('error-shake');
      }, 700);
      enteredPin = '';
      updateDots();
    }
  }
  function pressNum(num) {
    initAudio(); blip(720, 0.07, 'sine', 0.05); haptic(10);
    if (enteredPin.length < 4) {
      enteredPin += num; updateDots();
      if (enteredPin.length === 4) {
        setTimeout(checkPin, 250);
      }
    }
  }
  numpad.addEventListener('click', (e) => {
    const btn = e.target.closest('.num-btn');
    if (!btn) return;
    if (btn.classList.contains('clear-btn')) { enteredPin=''; updateDots(); blip(300,0.08,'square',0.04); return; }
    if (btn.classList.contains('del-btn')) { enteredPin = enteredPin.slice(0,-1); updateDots(); blip(400,0.07,'square',0.04); return; }
    if (btn.dataset.num !== undefined) pressNum(btn.dataset.num);
  });
  document.addEventListener('keydown', (e) => {
    if (currentPage !== 'page-lock') return;
    if (e.key >= '0' && e.key <= '9' && enteredPin.length < 4) pressNum(e.key);
    else if (e.key === 'Backspace') { enteredPin = enteredPin.slice(0,-1); updateDots(); }
    else if (e.key === 'Escape') { enteredPin=''; updateDots(); }
  });

  // ---------- heart -> menu ----------
  heartBtn.addEventListener('click', () => { initAudio(); blip(880,0.12,'triangle',0.06); showPage('menu'); });

  // ---------- glass tabs (menu / love / gift) ----------
  loveTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      loveTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      tabMain.classList.remove('active');
      tabLove.classList.remove('active');
      tabGift.classList.remove('active');
      if (tab.dataset.tab === 'love') tabLove.classList.add('active');
      else if (tab.dataset.tab === 'gift') tabGift.classList.add('active');
      else tabMain.classList.add('active');
      blip(700,0.08,'sine',0.05);
    });
  });

  // ---------- gift cards ----------
  const GIFT_LETTERS = {
    teddy: `My dearest teddy bear,
Hi baby ko i know na you love cuddle kaya naisip kong itong teddy bear na to is mayayakap mo sa bawat pagtulog mo, and habang malayo pako sya muna ang mayayakap mo tuwing gustong gusto mo na ako mayakap at makatabi, iloveyousomuch mahal ko hinding hindi ako magsasawa sayo, happy birthday ulit sa pinaka mamahal kong tao mahal na mahal kita sei`,
    gift: `My love,
This gift is just a small token of how much you mean to me. It may not be much, but every piece of it carries my love, my hopes, and all the dreams I have for us. I know I'm still courting you and we're LDR right now, that's why i create you a Digital gift for your birthday, I know this is not enough because its different feeling when you receive a physical gift, but you know that I'm not able to go there this time, I hope you like it baby Happy Birthday.`,
    balloons: `My beautiful girl,
These balloons are like my love for you—light, colorful, and always rising no matter what. May they lift your spirits and remind you of how high my love for you soars. Happy birthday, my love. I hope this day is filled with joy, Laughter, and all the Happiness you deserve. I can't wait to celebrate many more birthdays with you, when I able to go there to meet you so let this balloons carry my love for you iloceyousomuch mahal ko.`
  };
  const GIFT_IMAGES = {
    teddy: 'clickable/teddy.png',
    gift: 'clickable/gift.png',
    balloons: 'clickable/balloons.png'
  };
  const giftCards = qsa('.gift-card');
  const giftDetailOverlay = $('giftDetailOverlay');
  const giftDetailImg = $('giftDetailImg');
  const giftDetailLetter = $('giftDetailLetter');
  const giftDetailContent = $('giftDetailContent');
  const giftDetailBack = $('giftDetailBack');
  let giftTypewriterTimeout = null;

  function typeGiftLetter(text, el, speed = 40) {
    if (giftTypewriterTimeout) clearTimeout(giftTypewriterTimeout);
    el.textContent = '';
    el.classList.remove('done');
    let i = 0;
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        giftTypewriterTimeout = setTimeout(type, speed);
      } else {
        el.classList.add('done');
        giftTypewriterTimeout = null;
      }
    }
    type();
  }

  function openGiftDetail(key) {
    if (!giftDetailOverlay || !giftDetailImg || !giftDetailLetter) return;
    initAudio(); blip(880,0.12,'triangle',0.06);
    const text = GIFT_LETTERS[key] || '';
    const imgSrc = GIFT_IMAGES[key] || '';
    giftDetailImg.innerHTML = '';
    if (imgSrc) {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = key;
      giftDetailImg.appendChild(img);
    }
    giftDetailContent.classList.remove('teddy-layout');
    if (key === 'teddy') {
      giftDetailContent.classList.add('teddy-layout');
    }
    giftDetailLetter.classList.remove('done');
    typeGiftLetter(text, giftDetailLetter, 40);
    giftDetailOverlay.classList.add('open');
  }

  function closeGiftDetail() {
    if (giftTypewriterTimeout) clearTimeout(giftTypewriterTimeout);
    giftTypewriterTimeout = null;
    if (giftDetailOverlay) giftDetailOverlay.classList.remove('open');
    if (giftDetailLetter) giftDetailLetter.classList.remove('done');
  }

  giftCards.forEach(card => {
    card.addEventListener('click', () => openGiftDetail(card.dataset.gift));
  });

  if (giftDetailBack) {
    giftDetailBack.addEventListener('click', (e) => {
      e.stopPropagation();
      closeGiftDetail();
    });
  }
  if (giftDetailOverlay) {
    giftDetailOverlay.addEventListener('click', (e) => {
      if (e.target === giftDetailOverlay) closeGiftDetail();
    });
  }

  // ---------- love meter ----------
  loveBtn.addEventListener('click', () => {
    initAudio(); blip(880,0.12,'triangle',0.06);
    let p = 0;
    loveFill.classList.add('animate');
    const iv = setInterval(() => {
      p += 1;
      lovePercent.textContent = p;
      if (p >= 100) {
        clearInterval(iv);
        lovePercent.textContent = '100';
        loveFill.classList.remove('animate');
      }
    }, 20);
  });

  // ---------- menu buttons ----------
  menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      initAudio(); blip(820,0.1,'triangle',0.06);
      const t = btn.dataset.page;
      if (t==='music') showPage('music');
      else if (t==='letter') showPage('letter');
      else if (t==='pictures') showPage('pictures');
    });
  });

  // ---------- music / youtube ----------
  function extractVideoId(url) {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^?&\n\r\s#]+)/,
      /youtube\.com\/shorts\/([^?&\n\r\s#]+)/
    ];
    for (const p of patterns) { const m = url.match(p); if (m) return m[1]; }
    return null;
  }

  // ---------- pictures upload ----------
  uploadCard.addEventListener('click', () => { initAudio(); imageInput.click(); });
  imageInput.addEventListener('change', (e) => {
    Array.from(e.target.files).forEach(file => {
      const r = new FileReader();
      r.onload = (ev) => addPictureCard(ev.target.result, file.name.replace(/\.[^.]+$/, ''));
      r.readAsDataURL(file);
    });
    imageInput.value = '';
  });
  function addPictureCard(src, caption) {
    const tilt = (Math.random() * 6 - 3).toFixed(1);
    const card = document.createElement('div');
    card.className = 'picture-card';
    card.style.setProperty('--tilt', tilt + 'deg');
    card.innerHTML = `
      <div class="photo-inner"><img src="${src}" alt="Memory" /></div>
      <div class="polaroid-caption" title="Double-click to add a note">${caption || 'our memory'}</div>
      <button class="remove-btn">✕</button>`;
    card.querySelector('.remove-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      card.style.transform = 'scale(0) rotate(15deg)';
      card.style.opacity = '0';
      setTimeout(() => card.remove(), 350);
    });
    card.querySelector('.photo-inner').addEventListener('click', () => openLightbox(src));
    const cap = card.querySelector('.polaroid-caption');
    cap.addEventListener('dblclick', () => {
      cap.setAttribute('contenteditable', 'true');
      cap.focus();
    });
    cap.addEventListener('blur', () => cap.removeAttribute('contenteditable'));
    picturesGrid.insertBefore(card, uploadCard);
  }
  // drag & drop
  picturesGrid.addEventListener('dragover', (e) => { e.preventDefault(); uploadCard.style.borderColor='var(--pink)'; uploadCard.style.background='rgba(255,107,157,0.15)'; });
  picturesGrid.addEventListener('dragleave', () => { uploadCard.style.borderColor=''; uploadCard.style.background=''; });
  picturesGrid.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadCard.style.borderColor=''; uploadCard.style.background='';
    Array.from(e.dataTransfer.files).filter(f=>f.type.startsWith('image/')).forEach(file => {
      const r = new FileReader(); r.onload = (ev) => addPictureCard(ev.target.result, file.name.replace(/\.[^.]+$/, '')); r.readAsDataURL(file);
    });
  });

  // ---------- lightbox ----------
  let lightboxList = [];
  let lightboxIndex = 0;
  function openLightbox(src) {
    lightboxList = Array.from(picturesGrid.querySelectorAll('.picture-card img')).map(i => i.src);
    lightboxIndex = lightboxList.indexOf(src);
    if (lightboxIndex < 0) lightboxIndex = 0;
    lightboxImg.src = src;
    lightbox.classList.add('open');
    blip(700,0.1,'sine',0.05);
  }
  function lightboxNav(d) {
    if (!lightboxList.length) return;
    lightboxIndex = (lightboxIndex + d + lightboxList.length) % lightboxList.length;
    lightboxImg.style.opacity = '0';
    setTimeout(() => { lightboxImg.src = lightboxList[lightboxIndex]; lightboxImg.style.opacity='1'; }, 150);
    blip(600,0.06,'sine',0.04);
  }
  lightboxClose.addEventListener('click', () => { lightbox.classList.remove('open'); });
  lightboxPrev.addEventListener('click', () => lightboxNav(-1));
  lightboxNext.addEventListener('click', () => lightboxNav(1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') lightbox.classList.remove('open');
    if (e.key === 'ArrowLeft') lightboxNav(-1);
    if (e.key === 'ArrowRight') lightboxNav(1);
  });

  // ---------- slideshow ----------
  let slideTimer = null;
  slideshowBtn.addEventListener('click', () => {
    initAudio();
    const imgs = Array.from(picturesGrid.querySelectorAll('.picture-card img')).map(i=>i.src);
    if (imgs.length === 0) { alert('Add some photos first 💕'); return; }
    if (slideTimer) { clearInterval(slideTimer); slideTimer = null; slideshowBtn.textContent = '▶ Slideshow'; return; }
    slideshowBtn.textContent = '⏸ Stop';
    let i = 0;
    openLightbox(imgs[0]);
    slideTimer = setInterval(() => { i = (i+1) % imgs.length; lightboxNav(1); }, 2500);
  });

  // ---------- shuffle (polaroid wall) ----------
  $('shuffleBtn').addEventListener('click', () => {
    initAudio();
    const cards = Array.from(picturesGrid.querySelectorAll('.picture-card'));
    cards.forEach(c => c.style.setProperty('--tilt', (Math.random()*6-3).toFixed(1) + 'deg'));
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      picturesGrid.insertBefore(cards[j], cards[i]);
    }
    blip(620, 0.1, 'sine', 0.05);
    haptic(15);
  });

  // ---------- letter typing effect ----------
  function typeLetter() {
    letterTypedOnce = true;
    const ta = $('letterContent');
    const full = DEFAULT_LETTER;
    ta.value = '';
    let i = 0;
    const baseSpeed = 35;
    function type() {
      if (i >= full.length) { ta.value = full; return; }
      ta.value = full.slice(0, i + 1);
      ta.scrollTop = ta.scrollHeight;
      i++;
      const jitter = Math.random() * 25;
      const pause = full[i - 1] === '\n' ? 180 : full[i - 1] === '.' || full[i - 1] === '!' || full[i - 1] === '?' ? 90 : 0;
      setTimeout(type, baseSpeed + jitter + pause);
    }
    type();
  }

  // ---------- fullscreen ----------
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
    } else { if (document.exitFullscreen) document.exitFullscreen(); }
    blip(640,0.1,'sine',0.05);
  });

  // ---------- swipe between sub-pages ----------
  const subOrder = ['music','letter','pictures'];
  let touchX = null;
  document.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].clientX; }, {passive:true});
  document.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) < 60) return;
    const idx = subOrder.indexOf(currentPage);
    if (idx === -1) return;
    let target;
    if (dx < 0 && idx < subOrder.length-1) target = subOrder[idx+1];
    else if (dx > 0 && idx > 0) target = subOrder[idx-1];
    if (target) showPage(target, dx < 0 ? 'left' : 'right');
    blip(560,0.08,'sine',0.05);
    touchX = null;
  }, {passive:true});

  // ---------- easter egg: type "love" anywhere ----------
  let eggBuffer = '';
  document.addEventListener('keydown', (e) => {
    if (currentPage === 'page-lock') return;
    eggBuffer = (eggBuffer + e.key.toLowerCase()).slice(-4);
    if (eggBuffer === 'love') {
      eggBuffer = '';
      burstConfetti(200);
      const m = document.createElement('div');
      m.textContent = '💖 You found my secret love code, my queen 💖';
      m.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:rgba(255,107,157,0.9);color:#fff;padding:14px 26px;border-radius:30px;font-family:"Dancing Script",cursive;font-size:1.3rem;z-index:3000;box-shadow:0 10px 40px rgba(255,107,157,0.5);';
      document.body.appendChild(m);
      setTimeout(() => m.remove(), 4000);
      blip(990,0.2,'triangle',0.07);
    }
  });

  // ---------- floating hearts (birthday) ----------
  function startFloatingHearts() {
    if (!heartsBg) return;
    heartsBg.innerHTML = '';
    const symbols = ['❤️','💕','💖','💗','💝','🩷','💓'];
    setInterval(() => {
      const h = document.createElement('div');
      h.className = 'floating-heart';
      h.textContent = symbols[Math.floor(Math.random()*symbols.length)];
      h.style.left = Math.random()*90 + '%';
      h.style.fontSize = (Math.random()*1.8 + 1) + 'rem';
      h.style.animationDuration = (Math.random()*5 + 8) + 's';
      heartsBg.appendChild(h);
      setTimeout(() => h.remove(), 14000);
    }, 350);
  }

  // ================================================================
  //  NEW FEATURES (added on top of existing code)
  // ================================================================

  // ---------- 1) Calendar ----------
  const BIRTHDAY_DATE = new Date('2026-09-08T00:00:00');
  function renderCalendar() {
    const wrap = $('calendarWrap');
    if (!wrap) return;
    const now = new Date();
    const year = BIRTHDAY_DATE.getFullYear();
    const month = BIRTHDAY_DATE.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    let html = `<div class="calendar-title">September ${year}</div><div class="calendar">`;
    dayNames.forEach(d => html += `<div class="day-name">${d}</div>`);
    for (let i = 0; i < firstDay; i++) html += `<div class="day empty"></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
      const isHighlight = d === BIRTHDAY_DATE.getDate();
      if (isHighlight) {
        html += `<div class="day highlight"><span class="day-num">${d}</span><span class="heart-mark">💖</span></div>`;
      } else {
        html += `<div class="day">${d}</div>`;
      }
    }
    html += '</div>';
    wrap.innerHTML = html;
  }
  renderCalendar();

  // ---------- 4) Confetti + surprise buttons ----------
  $('confettiBtn').addEventListener('click', () => { burstConfetti(180); haptic(25); blip(990,0.12,'triangle',0.07); });
  $('surpriseBtn').addEventListener('click', () => {
    if (window._surpriseTyping) return;
    burstConfetti(220);
    const overlay = $('surpriseOverlay');
    const letterEl = $('surpriseLetter');
    const source = $('surpriseLetterSource');
    if (overlay && letterEl && source) {
      try {
        document.querySelectorAll('.compliment, .surprise-overlay.open, [style*="position:fixed"]').forEach(el => {
          if (el !== overlay) el.remove();
        });
      } catch (e) {}
      const fullText = source.textContent.trim();
      letterEl.textContent = '';
      overlay.classList.add('open');
      let i = 0;
      window._surpriseTyping = true;
      window._surpriseTimeout = null;
      try {
        function type() {
          try {
            if (!overlay.classList.contains('open')) {
              window._surpriseTyping = false;
              return;
            }
            if (i < fullText.length) {
              letterEl.textContent += fullText.charAt(i);
              i++;
              window._surpriseTimeout = setTimeout(type, 40);
            } else {
              window._surpriseTyping = false;
              window._surpriseTimeout = null;
            }
          } catch (e) {
            window._surpriseTyping = false;
            window._surpriseTimeout = null;
          }
        }
        if (window._surpriseTimeout) clearTimeout(window._surpriseTimeout);
        type();
      } catch (e) {
        window._surpriseTyping = false;
      }
    }
    blip(880,0.2,'triangle',0.08);
  });
  const surpriseBack = $('surpriseBack');
  if (surpriseBack) {
    surpriseBack.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window._surpriseTimeout) clearTimeout(window._surpriseTimeout);
      window._surpriseTyping = false;
      window._surpriseTimeout = null;
      const overlay = $('surpriseOverlay');
      if (overlay) overlay.classList.remove('open');
    });
  }
  const surpriseOverlay = $('surpriseOverlay');
  if (surpriseOverlay) {
    surpriseOverlay.addEventListener('click', (e) => {
      if (e.target === surpriseOverlay && !window._surpriseTyping) surpriseOverlay.classList.remove('open');
    });
    surpriseOverlay.addEventListener('pointerdown', (e) => e.stopPropagation());
    surpriseOverlay.addEventListener('touchstart', (e) => e.stopPropagation());
  }

  // ---------- 5) Date stamp on polaroids ----------
  function addDateStamp(card) {
    const d = new Date();
    const str = d.toLocaleDateString(undefined, { month:'short', year:'numeric' });
    const stamp = document.createElement('div');
    stamp.className = 'polaroid-date';
    stamp.textContent = str;
    card.appendChild(stamp);
  }

  // ---------- 7) Floating compliments ----------
  const COMPLIMENTS = ['beautiful','Iloveyouuualways', 'Iloveyouuuverymuchh','Iloveyouuu everyday', 'Iloveyouuu mylove','Iloveyouuusomuchh','adorable','queen','angel','Iloveyouuusomuchh', 'Iloveyouuusomuchh', 'Iloveyouuusomuchh','lovely','Iloveyouuusomuchh','Iloveyouuusomuchh','precious'];
  function floatCompliment() {
    const c = document.createElement('div');
    c.className = 'compliment';
    c.textContent = COMPLIMENTS[Math.floor(Math.random()*COMPLIMENTS.length)];
    c.style.left = Math.random()*80 + 10 + '%';
    c.style.bottom = '60px';
    c.style.fontSize = (Math.random()*0.8 + 1.2) + 'rem';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4200);
  }
  setInterval(floatCompliment, 3500);

  // ---------- 8) Typewriter for birthday text ----------
  function typeBirthdayText() {
    const el = $('birthday-text');
    if (!el || el.dataset.typed) return;
    el.dataset.typed = '1';
    const original = 'HAPPY BIRTHDAY\nMYLOVE';
    el.textContent = '';
    let i = 0;
    const iv = setInterval(() => {
      el.textContent = original.slice(0, i);
      if (i >= original.length) { clearInterval(iv); el.innerHTML = 'HAPPY BIRTHDAY<br><span class="mylove">MYLOVE</span>'; }
      i++;
    }, 80);
  }

  // ---------- 9) Save state (localStorage) ----------
  function saveState() {
    try {
      localStorage.setItem('birthday_letter', $('letterContent')?.value || '');
    } catch(e){}
  }
  function loadState() {
    try {
      const letter = localStorage.getItem('birthday_letter');
      if (letter && $('letterContent')) $('letterContent').value = letter;
    } catch(e){}
  }
  // Hook saves
  const letterTa = $('letterContent');
  if (letterTa) letterTa.addEventListener('input', () => { clearTimeout(letterTa._saveTimer); letterTa._saveTimer = setTimeout(saveState, 600); });

  // ---------- 10) Share / screenshot ----------
  // Lightbox download button
  const dlBtn = document.createElement('button');
  dlBtn.className = 'lightbox-download';
  dlBtn.textContent = '💾 Save Photo';
  dlBtn.addEventListener('click', () => {
    const src = lightboxImg.src;
    if (!src) return;
    const a = document.createElement('a');
    a.href = src;
    a.download = 'memory.png';
    a.click();
    blip(700,0.1,'sine',0.05);
  });
  lightbox.appendChild(dlBtn);

  // ---------- enhance existing flows ----------
  // hook addPictureCard to add date stamps
  const _origAddPictureCard = addPictureCard;
  addPictureCard = function(src, caption) {
    _origAddPictureCard(src, caption);
    const cards = picturesGrid.querySelectorAll('.picture-card');
    cards.forEach(card => {
      if (!card.querySelector('.polaroid-date')) addDateStamp(card);
    });
  };
  // stamp any existing cards (from defaults)
  setTimeout(() => {
    const cards = picturesGrid.querySelectorAll('.picture-card');
    cards.forEach(card => { if (!card.querySelector('.polaroid-date')) addDateStamp(card); });
  }, 100);

  // enhance onPageEnter with typewriter + save state load
  const _origOnPageEnter = onPageEnter;
  onPageEnter = function(name) {
    _origOnPageEnter(name);
    if (name === 'birthday') {
      setTimeout(typeBirthdayText, 200);
    }
    if (name === 'letter' && !letterTypedOnce) typeLetter();
  };

  let musicVideoWasPlaying = false;
  playMusicBtn.addEventListener('click', () => {
    initAudio(); blip(760,0.1,'triangle',0.06);
    const starting = musicVideo && musicVideo.paused;
    if (starting) {
      if (bgAudio) { bgAudio.pause(); bgAudio.currentTime = 0; bgAudio.volume = 0.2; }
      if (!musicVideo.src) musicVideo.src = musicVideoUrl;
      musicVideo.play().catch(()=>{});
    } else {
      musicVideo.pause();
      if (bgAudio) { bgAudio.volume = 0.6; bgAudio.play().catch(()=>{}); }
    }
    playMusicBtn.textContent = starting ? '⏸ Pause' : '▶ Play Our Song';
  });
  musicVideo.addEventListener('play', () => {
    if (bgAudio) { bgAudio.pause(); bgAudio.volume = 0.2; }
    musicVideoWasPlaying = true;
    playMusicBtn.textContent = '⏸ Pause';
  });
  musicVideo.addEventListener('pause', () => {
    musicVideoWasPlaying = false;
    if (bgAudio) bgAudio.volume = 0.6;
    playMusicBtn.textContent = '▶ Play Our Song';
  });
  musicVideo.addEventListener('ended', () => {
    musicVideoWasPlaying = false;
    playMusicBtn.textContent = '▶ Play Our Song';
  });

  $('backToBirthday').addEventListener('click', () => { blip(500,0.08,'sine',0.05); showPage('birthday'); });
  $('backFromMusic').addEventListener('click', () => { blip(500,0.08,'sine',0.05); showPage('menu'); });
  $('backFromLetter').addEventListener('click', () => { blip(500,0.08,'sine',0.05); showPage('menu'); });
  $('backFromPictures').addEventListener('click', () => { blip(500,0.08,'sine',0.05); showPage('menu'); });
});
