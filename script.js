// ====== 1) Grab things from the page (DOM) ======
const tabs = document.querySelectorAll('.tab');
const screens = document.querySelectorAll('.screen');

// Home elements
const elWord = document.getElementById('wordText');
const elPos = document.getElementById('partOfSpeech');
const elIpa = document.getElementById('ipa');
const elMeaning = document.getElementById('meaning');
const elExamples = document.getElementById('examples');
const elTip = document.getElementById('tip');
const btnSpeak = document.getElementById('btnSpeak');
const btnSpeakWordOnly = document.getElementById('btnSpeakWordOnly');
const btnAnother = document.getElementById('btnAnother');
const btnGenerate = document.getElementById('btnGenerate');
const btnToggleMastered = document.getElementById('btnToggleMastered');
const elSeenToday = document.getElementById('seenToday');
const elHistoryCount = document.getElementById('historyCount');
const elMasteredBadge = document.getElementById('masteredBadge');

// History elements
const elHistoryList = document.getElementById('historyList');
const elSearchHistory = document.getElementById('searchHistory');
const btnClearHistory = document.getElementById('btnClearHistory');

// Settings elements
const segButtons = document.querySelectorAll('.seg');
const btnResetToday = document.getElementById('btnResetToday');
const dailyTimeInput = document.getElementById('dailyTime');
const chkAutoSpeak = document.getElementById('chkAutoSpeak');

// Add-word form elements
const inWord = document.getElementById('inWord');
const inPos = document.getElementById('inPos');
const inIpa = document.getElementById('inIpa');
const inMeaning = document.getElementById('inMeaning');
const inExamples = document.getElementById('inExamples');
const inTip = document.getElementById('inTip');
const btnSaveWord = document.getElementById('btnSaveWord');
const btnClearForm = document.getElementById('btnClearForm');


// ====== 2) Built-in dictionary with tips (unchanged) ======
const BUILT_IN_WORDS = [
  { word: "concise", partOfSpeech: "adjective", ipa: "/kənˈsaɪs/",
    meaning: "Short and clear; using only a few words to say something important.",
    examples: ["Keep your email concise.", "Her explanation was concise and helpful.", "Please be concise during the meeting."],
    tip: "Often used with “be” (be concise) or before a noun (a concise summary)." },
  { word: "elaborate", partOfSpeech: "verb", ipa: "/ɪˈlæb.ə.reɪt/",
    meaning: "To explain something in more detail.",
    examples: ["Could you elaborate on that point?", "The report will elaborate on the results.", "He asked her to elaborate during the call."],
    tip: "Use with “on” + topic: elaborate on your idea / that point." },
  { word: "subtle", partOfSpeech: "adjective", ipa: "/ˈsʌt.əl/",
    meaning: "Not obvious; small and delicate but important.",
    examples: ["She noticed a subtle change in his tone.", "The flavor is subtle but pleasant.", "A subtle gesture can show respect."],
    tip: "Often used before a noun: a subtle change, a subtle hint." },
  { word: "clarify", partOfSpeech: "verb", ipa: "/ˈklær.ɪ.faɪ/",
    meaning: "To make something easier to understand.",
    examples: ["Let me clarify the steps.", "Please clarify your question.", "The manager tried to clarify the policy."],
    tip: "Use with an object: clarify the rules / clarify your point." },
  { word: "concern", partOfSpeech: "noun", ipa: "/kənˈsɜːn/",
    meaning: "A worry or something that matters to you.",
    examples: ["Your safety is our main concern.", "She raised a concern about the delay.", "Do you have any concerns?"],
    tip: "Common with raise/express a concern; main/primary concern." },
  { word: "acknowledge", partOfSpeech: "verb", ipa: "/əkˈnɒl.ɪdʒ/",
    meaning: "To accept or admit that something is true or exists.",
    examples: ["He acknowledged the mistake.", "Please acknowledge receipt of the email.", "She acknowledged their support."],
    tip: "Often used with objects: acknowledge a mistake/support." },
  { word: "practical", partOfSpeech: "adjective", ipa: "/ˈpræk.tɪ.kəl/",
    meaning: "Useful and sensible in real-life situations.",
    examples: ["We need a practical plan.", "She gave practical advice.", "This tool is practical for daily tasks."],
    tip: "Common pairs: practical advice, practical skills, practical solution." },
  { word: "reliable", partOfSpeech: "adjective", ipa: "/rɪˈlaɪ.ə.bəl/",
    meaning: "Something or someone you can trust to work well.",
    examples: ["He is a reliable teammate.", "Choose a reliable supplier.", "The data is reliable and accurate."],
    tip: "Often before a noun: reliable data/supplier/transport." },
  { word: "brief", partOfSpeech: "adjective", ipa: "/briːf/",
    meaning: "Short in time or words.",
    examples: ["Keep your answer brief.", "We had a brief meeting.", "Please give a brief summary."],
    tip: "Before a noun: brief meeting/summary; after ‘be’: be brief." },
  { word: "expand", partOfSpeech: "verb", ipa: "/ɪkˈspænd/",
    meaning: "To make something bigger or add more detail.",
    examples: ["Expand your notes with examples.", "The company plans to expand next year.", "She asked him to expand on his idea."],
    tip: "Use with ‘on’ when adding detail: expand on your idea." },
  { word: "emphasize", partOfSpeech: "verb", ipa: "/ˈem.fə.saɪz/",
    meaning: "To show that something is important.",
    examples: ["The teacher emphasized the deadline.", "We should emphasize safety.", "He emphasized the main point."],
    tip: "Often followed by noun/gerund: emphasize safety/the need to..." },
  { word: "appropriate", partOfSpeech: "adjective", ipa: "/əˈprəʊ.pri.ət/",
    meaning: "Right or suitable for a situation.",
    examples: ["Wear appropriate clothing.", "That tone is not appropriate.", "Use appropriate language at work."],
    tip: "Often with ‘for’: appropriate for work/school/weather." },
  { word: "confirm", partOfSpeech: "verb", ipa: "/kənˈfɜːm/",
    meaning: "To check that something is correct or true.",
    examples: ["Please confirm your appointment.", "They confirmed the booking.", "I can confirm the details later."],
    tip: "Common with objects: confirm details/booking/attendance." },
  { word: "compose", partOfSpeech: "verb", ipa: "/kəmˈpəʊz/",
    meaning: "To create or write something carefully.",
    examples: ["She will compose the email now.", "Compose your thoughts before speaking.", "He composed a short message."],
    tip: "Often used with email/message: compose an email/message." },
  { word: "consistent", partOfSpeech: "adjective", ipa: "/kənˈsɪs.tənt/",
    meaning: "Doing something in the same way over time.",
    examples: ["Be consistent with your practice.", "Her results are consistent.", "We need a consistent process."],
    tip: "Common pairs: consistent results/effort/process; be consistent." }
];


// ====== 3) Storage keys ======
const KEY_TODAY_WORD = "speakAndUse_todayWord";
const KEY_TODAY_DATE = "speakAndUse_todayDate";
const KEY_HISTORY    = "speakAndUse_history";
const KEY_THEME      = "speakAndUse_theme";
const KEY_MASTERED   = "speakAndUse_mastered";    // { wordText: true/false }
const KEY_AUTOSPEAK  = "speakAndUse_autoSpeak";   // "true"/"false"
const KEY_CUSTOM     = "speakAndUse_customWords"; // array of custom word objects
const KEY_THEME_FORCED = "speakAndUse_themeForced"; // NEW: "true"/"false"



// ====== 4) Helpers: read/write JSON safely ======
function readJSON(key, fallback) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
  catch { return fallback; }
}
function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getLocalDateKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// ====== 5) Date helper (local YYYY-MM-DD) ======
function getLocalDateKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}


// ====== 6) App state ======
let todayWord = readJSON(KEY_TODAY_WORD, null);
let todayDate = localStorage.getItem(KEY_TODAY_DATE) || "";
let history = readJSON(KEY_HISTORY, []);
let theme = localStorage.getItem(KEY_THEME) || "light";
let themeForced = localStorage.getItem(KEY_THEME_FORCED) === "true"; 
let mastered = readJSON(KEY_MASTERED, {});
let autoSpeak = localStorage.getItem(KEY_AUTOSPEAK) === "true";
let customWords = readJSON(KEY_CUSTOM, []); // array of objects like built-ins


// ====== 7) Words accessors (always use built-ins + custom) ======
function allWords() { return [...BUILT_IN_WORDS, ...customWords]; } // merge arrays

function findWord(wordText) {
  return allWords().find(w => w.word.toLowerCase() === String(wordText || "").toLowerCase());
}

function pickRandomWord() {
  const list = allWords();
  return list[Math.floor(Math.random() * list.length)];
}

function pickRandomDifferentFrom(excludeWord) {
  const list = allWords();
  if (list.length <= 1) return pickRandomWord();
  let w; do { w = pickRandomWord(); } while (w.word.toLowerCase() === String(excludeWord || "").toLowerCase());
  return w;
}

function pickNextUnseenWord() {
  const list = allWords();
  const unseen = list.find(w => !history.includes(w.word));
  return unseen || pickRandomWord();
}


// ====== 8) Mastered helpers ======
function isMastered(wordText) { return !!mastered[wordText]; }
function setMastered(wordText, value) {
  mastered[wordText] = !!value;
  writeJSON(KEY_MASTERED, mastered);
}


// ====== 9) Render + Speech ======
function renderWord(wordObj) {
  if (!wordObj) return;
  elWord.textContent = wordObj.word;
  elPos.textContent = wordObj.partOfSpeech || "";
  elIpa.textContent = wordObj.ipa || "";
  elMeaning.textContent = wordObj.meaning || "";

  elExamples.innerHTML = "";
  (wordObj.examples || []).forEach(ex => {
    const li = document.createElement("li");
    li.textContent = ex;
    elExamples.appendChild(li);
  });

  elTip.textContent = wordObj.tip || "";

  const isToday = todayWord === wordObj.word;
  elSeenToday.textContent = `Seen today: ${isToday ? "yes" : "no"}`;
  elHistoryCount.textContent = `History: ${history.length} words`;

  const m = isMastered(wordObj.word);
  if (elMasteredBadge) elMasteredBadge.style.display = m ? "inline" : "none";
  if (btnToggleMastered) btnToggleMastered.textContent = m ? "❎ Unmark Mastered" : "✅ Mark as Mastered";
}

function speakWord(wordObj) {
  if (!wordObj) return;
  const toSay = `${wordObj.word}. ${wordObj.meaning}`;
  const utter = new SpeechSynthesisUtterance(toSay);
  utter.rate = 1.0; utter.pitch = 1.0;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

function speakWordOnly(wordObj) {
  if (!wordObj) return;
  const utter = new SpeechSynthesisUtterance(wordObj.word);
  utter.rate = 1.0; utter.pitch = 1.0;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}


// ====== 10) History rendering/search ======
function refreshHistoryList(filterText = "") {
  if (!elHistoryList) return;
  elHistoryList.innerHTML = "";

  const items = history.slice().reverse(); // newest first

  items.forEach(wordText => {
    const w = findWord(wordText);
    const searchable = (w ? (w.word + " " + (w.meaning || "") + " " + (w.tip || "")) : wordText).toLowerCase();
    const ok = filterText.trim() === "" || searchable.includes(filterText.toLowerCase());
    if (!ok) return;

    const li = document.createElement("li");
    li.style.cursor = "pointer";
    const check = isMastered(wordText) ? "✓ " : "";
    li.textContent = w ? `${check}${w.word} (${w.partOfSpeech || ""})` : `${check}${wordText}`;

    li.addEventListener("click", () => {
      showScreen("screen-home");
      const obj = w || { word: wordText, partOfSpeech: "", ipa: "", meaning: "", examples: [], tip: "" };
      renderWord(obj);
      if (autoSpeak) speakWordOnly(obj);
    });

    elHistoryList.appendChild(li);
  });

  elHistoryCount.textContent = `History: ${history.length} words`;
}


// ====== 11) Theme ======
function applyTheme(themeName) { document.body.classList.toggle("dark", themeName === "dark"); }
function setTheme(themeName) {
  theme = themeName;
  localStorage.setItem(KEY_THEME, themeName);
  localStorage.setItem(KEY_THEME_FORCED, "true"); // user made a manual choice
  themeForced = true;
  document.documentElement.classList.add("theme-forced"); // lock CSS auto
  applyTheme(themeName);
  segButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.theme === themeName));
}

// Apply auto theme (only when not forced)
function applyAutoThemeIfAllowed(){
  if (themeForced) return; // user already chose → do nothing
  document.documentElement.classList.remove("theme-forced");
  document.body.classList.add("auto-dark");  // enables prefers-color-scheme CSS
  // Also mirror the current system pref to the base class
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
  // Keep segmented buttons in sync visually
  segButtons.forEach(btn => btn.classList.toggle("active", prefersDark ? (btn.dataset.theme==="dark") : (btn.dataset.theme==="light")));
}


// ====== 12) Daily word logic ======
function ensureTodayWordForDate() {
  const currentKey = getLocalDateKey();
  if (todayDate !== currentKey || !todayWord) {
    const wordObj = pickNextUnseenWord();
    todayWord = wordObj.word;
    todayDate = currentKey;
    writeJSON(KEY_TODAY_WORD, todayWord);
    localStorage.setItem(KEY_TODAY_DATE, todayDate);
    if (!history.includes(todayWord)) {
      history.push(todayWord);
      writeJSON(KEY_HISTORY, history);
    }
    return wordObj;
  }
  return findWord(todayWord) || pickRandomWord();
}


// ====== 13) Tabs ======
function showScreen(id) {
  screens.forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
  tabs.forEach(t => t.classList.toggle('active', t.dataset.target === id));
}
tabs.forEach(tab => tab.addEventListener('click', () => showScreen(tab.dataset.target)));


// ====== 14) Form helpers ======
function clearAddForm() {
  if (!inWord) return;
  inWord.value = "";
  inPos.value = "";
  inIpa.value = "";
  inMeaning.value = "";
  inExamples.value = "";
  inTip.value = "";
}

// Validate the form and return a word object or null
function buildWordFromForm() {
  const word = (inWord.value || "").trim();
  const partOfSpeech = (inPos.value || "").trim();
  const ipa = (inIpa.value || "").trim();
  const meaning = (inMeaning.value || "").trim();

  // split examples by new lines, remove empties
  const examples = (inExamples.value || "")
    .split(/\r?\n/)
    .map(s => s.trim())
    .filter(Boolean);

  const tip = (inTip.value || "").trim();

  // ---- Validation rules ----
  if (!word) { alert("Please enter the word (required)."); return null; }
  if (!meaning) { alert("Please enter a simple meaning (required)."); return null; }
  if (examples.length < 2) { alert("Please add at least 2 example sentences (one per line)."); return null; }

  // Prevent duplicates (case-insensitive)
  const exists = !!findWord(word);
  if (exists) {
    const ok = confirm(`“${word}” already exists. Add anyway as a custom override?`);
    if (!ok) return null;
  }

  return { word, partOfSpeech, ipa, meaning, examples, tip };
}

// ====== Share to clipboard (NEW) ======
async function shareTodayToClipboard(){
  const w = findWord(todayWord);
  if(!w){ alert("No word to share yet."); return; }

  const examples = (w.examples||[]).slice(0,3).map((e,i)=>`${i+1}. ${e}`).join("\n");
  const text =
`Speak & Use — Today’s Word
${w.word} (${w.partOfSpeech||""}) ${w.ipa||""}

Meaning:
${w.meaning||""}

Examples:
${examples}

Tip: ${w.tip||""}`;

  // Helper: ultra-compatible fallback using a hidden <textarea>
  const legacyCopy = (str) => {
    const ta = document.createElement('textarea');
    ta.value = str;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch {}
    document.body.removeChild(ta);
  };

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);        // modern, secure contexts only
    } else {
      legacyCopy(text);                                 // fallback for http/file contexts
    }
    showToast("Copied today’s word to clipboard!");
  } catch (err) {
    console.error(err);
    // Last-resort: open a prompt so the user can copy manually
    const ok = prompt("Copy this text:", text);
    if (ok !== null) showToast("Copy window opened.");
  }
}

async function shareTodayToClipboard(){
  const w = findWord(todayWord);
  if(!w){ alert("No word to share yet."); return; }

  const examples = (w.examples||[]).slice(0,3).map((e,i)=>`${i+1}. ${e}`).join("\n");
  const text =
`Speak & Use — Today’s Word
${w.word} (${w.partOfSpeech||""}) ${w.ipa||""}

Meaning:
${w.meaning||""}

Examples:
${examples}

Tip: ${w.tip||""}`;

  // Helper: ultra-compatible fallback using a hidden <textarea>
  const legacyCopy = (str) => {
    const ta = document.createElement('textarea');
    ta.value = str;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch {}
    document.body.removeChild(ta);
  };

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);        // modern, secure contexts only
    } else {
      legacyCopy(text);                                 // fallback for http/file contexts
    }
    showToast("Copied today’s word to clipboard!");
  } catch (err) {
    console.error(err);
    // Last-resort: open a prompt so the user can copy manually
    const ok = prompt("Copy this text:", text);
    if (ok !== null) showToast("Copy window opened.");
  }
}



// ====== 15) Wire up buttons/inputs ======
btnSpeak?.addEventListener('click', () => {
  const current = findWord(elWord.textContent);
  speakWord(current);
});

btnSpeakWordOnly?.addEventListener('click', () => {
  const current = findWord(elWord.textContent);
  speakWordOnly(current);
});

btnAnother?.addEventListener('click', () => {
  const next = pickRandomWord();
  renderWord(next);
});

btnGenerate?.addEventListener('click', () => {
  const currentText = elWord.textContent;
  const next = pickRandomDifferentFrom(currentText);
  renderWord(next);
});

btnToggleMastered?.addEventListener('click', () => {
  const currentText = elWord.textContent;
  const now = !isMastered(currentText);
  setMastered(currentText, now);
  renderWord(findWord(currentText));
  refreshHistoryList(elSearchHistory ? elSearchHistory.value : "");
});

elSearchHistory?.addEventListener('input', (e) => {
  refreshHistoryList(e.target.value);
});

btnClearHistory?.addEventListener('click', () => {
  const sure = confirm("Clear your word history? This cannot be undone.");
  if (!sure) return;
  history = [];
  writeJSON(KEY_HISTORY, history);
  refreshHistoryList(elSearchHistory ? elSearchHistory.value : "");
  elHistoryCount.textContent = `History: ${history.length} words`;
});

btnResetToday?.addEventListener('click', () => {
  const wordObj = pickNextUnseenWord();
  const currentKey = getLocalDateKey();
  todayWord = wordObj.word;
  todayDate = currentKey;
  writeJSON(KEY_TODAY_WORD, todayWord);
  localStorage.setItem(KEY_TODAY_DATE, todayDate);
  if (!history.includes(todayWord)) {
    history.push(todayWord);
    writeJSON(KEY_HISTORY, history);
  }
  renderWord(wordObj);
  refreshHistoryList(elSearchHistory ? elSearchHistory.value : "");
  alert(`Today's word reset to: ${wordObj.word}`);
});

// Auto-speak toggle
if (chkAutoSpeak) {
  chkAutoSpeak.checked = autoSpeak;
  chkAutoSpeak.addEventListener('change', () => {
    autoSpeak = chkAutoSpeak.checked;
    localStorage.setItem(KEY_AUTOSPEAK, autoSpeak ? "true" : "false");
  });
}


// Save Word
btnSaveWord?.addEventListener('click', () => {
  const obj = buildWordFromForm();
  if (!obj) return; // validation failed

  // Add to customWords and save
  customWords.push(obj);
  writeJSON(KEY_CUSTOM, customWords);

  // If today’s word wasn’t set or matches this, update the display
  if (!todayWord) {
    todayWord = obj.word;
    writeJSON(KEY_TODAY_WORD, todayWord);
  }

  alert(`Saved “${obj.word}”! You can find it via History or use Generate.`);
  clearAddForm();
  refreshHistoryList(elSearchHistory ? elSearchHistory.value : "");
});

// Clear form
btnClearForm?.addEventListener('click', clearAddForm);



// ====== 16) First load ======
(function init() {
  // Theme initialization with auto-detection and manual override support
  if (!themeForced) {
    applyAutoThemeIfAllowed(); // Auto-detect if user hasn't manually chosen
  } else {
    document.documentElement.classList.add("theme-forced");
    applyTheme(theme); // Apply saved manual preference
  }
  
  // Sync UI controls with current theme state
  segButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.theme === (document.body.classList.contains("dark") ? "dark" : "light")));
  
  // Enable manual theme selection (overrides auto-detection)
  segButtons.forEach(btn => btn.addEventListener('click', () => setTheme(btn.dataset.theme)));

  // Daily word initialization
  const wordObj = ensureTodayWordForDate();
  renderWord(wordObj);
  refreshHistoryList();

  // UI state restoration
  if (chkAutoSpeak) chkAutoSpeak.checked = autoSpeak;
  
  // Toast element initialization
  toastEl = document.querySelector('.toast') || null;

  // Show initial screen
  showScreen('screen-home');

  if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js");
}
})();
