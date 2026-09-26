/**
 * APP LOGIC - ÔN TẬP MẠNG MÁY TÍNH
 */

// Key lưu trữ localStorage
const STORAGE_KEYS = {
  CUSTOM_QUIZ: 'net_app_custom_quiz_v1',
  CUSTOM_ESSAY: 'net_app_custom_essay_v1',
  CUSTOM_FLASHCARDS: 'net_app_custom_flashcards_v1',
  QUIZ_HISTORY: 'net_app_quiz_history_v1',
  ESSAY_PROGRESS: 'net_app_essay_progress_v1'
};

// State toàn cục của ứng dụng
let currentTab = 'quiz';
let allQuizQuestions = [];
let allEssayQuestions = [];
let allFlashcards = [];

// State cho phần Trắc nghiệm
let quizFilterTopic = 'all';
let quizMode = 'practice'; // 'practice' (xem đáp án ngay) hoặc 'exam' (làm hết rồi nộp)
let quizQuestions = [];
let quizCurrentIndex = 0;
let quizUserAnswers = {}; // { questionId: selectedIndex }
let quizSubmitted = false;
let quizTimerInterval = null;
let quizSecondsElapsed = 0;

// State cho phần Tự luận
let essayFilterTopic = 'all';
let essayQuestions = [];
let essayCurrentIndex = 0;
let essayUserScores = {}; // { essayId: score }

// State cho phần Flashcard
let flashcardList = [];
let flashcardIndex = 0;
let flashcardIsFlipped = false;

// Khởi chạy khi load trang
document.addEventListener('DOMContentLoaded', () => {
  loadDataFromStorage();
  initNavigation();
  initQuizModule();
  initEssayModule();
  initFlashcardModule();
  initAddContentModule();
  updateCustomBadge();
});

// ==========================================
// 1. DATA INITIALIZATION & LOCALSTORAGE
// ==========================================
function loadDataFromStorage() {
  const customQuiz = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_QUIZ) || '[]');
  const customEssay = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_ESSAY) || '[]');
  const customCards = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_FLASHCARDS) || '[]');

  allQuizQuestions = [...INITIAL_QUIZ_DATA, ...customQuiz];
  allEssayQuestions = [...INITIAL_ESSAY_DATA, ...customEssay];
  allFlashcards = [...INITIAL_FLASHCARDS, ...customCards];

  essayUserScores = JSON.parse(localStorage.getItem(STORAGE_KEYS.ESSAY_PROGRESS) || '{}');
}

function updateCustomBadge() {
  const customQuiz = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_QUIZ) || '[]');
  const customEssay = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_ESSAY) || '[]');
  const total = customQuiz.length + customEssay.length;
  const badge = document.getElementById('custom-badge-count');
  if (badge) {
    badge.innerText = total > 0 ? `+${total}` : '';
    badge.style.display = total > 0 ? 'inline-block' : 'none';
  }
}

// ==========================================
// 2. TAB NAVIGATION
// ==========================================
function initNavigation() {
  const tabs = document.querySelectorAll('.nav-tab-btn');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-tab');
      switchTab(tabTarget);
    });
  });
}

function switchTab(tabName) {
  currentTab = tabName;
  document.querySelectorAll('.tab-content').forEach(section => {
    section.classList.add('hidden');
  });

  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabName) {
      btn.classList.add('border-blue-500', 'text-blue-500', 'font-semibold', 'bg-blue-500/10');
      btn.classList.remove('border-transparent', 'text-gray-400');
    } else {
      btn.classList.remove('border-blue-500', 'text-blue-500', 'font-semibold', 'bg-blue-500/10');
      btn.classList.add('border-transparent', 'text-gray-400');
    }
  });

  const targetSection = document.getElementById(`tab-${tabName}`);
  if (targetSection) {
    targetSection.classList.remove('hidden');
  }

  if (tabName === 'quiz') {
    renderQuizQuestion();
  } else if (tabName === 'essay') {
    renderEssayQuestion();
  } else if (tabName === 'flashcard') {
    renderFlashcard();
  } else if (tabName === 'manage') {
    renderManageList();
  }
}

// ==========================================
// 3. QUIZ MODULE (TRẮC NGHIỆM)
// ==========================================
function initQuizModule() {
  // Topic filter dropdown
  const topicFilter = document.getElementById('quiz-topic-select');
  if (topicFilter) {
    topicFilter.innerHTML = INITIAL_TOPICS.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
    topicFilter.addEventListener('change', (e) => {
      quizFilterTopic = e.target.value;
      resetQuiz();
    });
  }

  // Quiz mode switch
  const modeRadios = document.querySelectorAll('input[name="quiz-mode"]');
  modeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      quizMode = e.target.value;
      resetQuiz();
    });
  });

  // Action buttons
  document.getElementById('quiz-prev-btn')?.addEventListener('click', prevQuizQuestion);
  document.getElementById('quiz-next-btn')?.addEventListener('click', nextQuizQuestion);
  document.getElementById('quiz-submit-btn')?.addEventListener('click', submitQuiz);
  document.getElementById('quiz-restart-btn')?.addEventListener('click', resetQuiz);
  document.getElementById('quiz-shuffle-btn')?.addEventListener('click', shuffleQuiz);

  resetQuiz();
}

function resetQuiz() {
  clearInterval(quizTimerInterval);
  quizSecondsElapsed = 0;
  startQuizTimer();

  // Lọc theo chuyên đề
  if (quizFilterTopic === 'all') {
    quizQuestions = [...allQuizQuestions];
  } else {
    quizQuestions = allQuizQuestions.filter(q => q.topic === quizFilterTopic);
  }

  if (quizQuestions.length === 0) {
    quizQuestions = [];
  }

  quizCurrentIndex = 0;
  quizUserAnswers = {};
  quizSubmitted = false;

  const resultModal = document.getElementById('quiz-result-modal');
  if (resultModal) resultModal.classList.add('hidden');

  renderQuizNavGrid();
  renderQuizQuestion();
}

function startQuizTimer() {
  const timerEl = document.getElementById('quiz-timer');
  if (!timerEl) return;
  quizTimerInterval = setInterval(() => {
    quizSecondsElapsed++;
    const m = Math.floor(quizSecondsElapsed / 60).toString().padStart(2, '0');
    const s = (quizSecondsElapsed % 60).toString().padStart(2, '0');
    timerEl.innerText = `${m}:${s}`;
  }, 1000);
}

function shuffleQuiz() {
  quizQuestions = [...quizQuestions].sort(() => Math.random() - 0.5);
  quizCurrentIndex = 0;
  quizUserAnswers = {};
  quizSubmitted = false;
  renderQuizNavGrid();
  renderQuizQuestion();
}

function renderQuizNavGrid() {
  const grid = document.getElementById('quiz-nav-grid');
  if (!grid) return;

  grid.innerHTML = quizQuestions.map((q, idx) => {
    const isAnswered = quizUserAnswers[q.id] !== undefined;
    const isCurrent = idx === quizCurrentIndex;
    let colorClass = 'bg-slate-800 text-gray-400 border border-slate-700 hover:border-blue-400';

    if (quizSubmitted) {
      const userChoice = quizUserAnswers[q.id];
      if (userChoice === q.correct) {
        colorClass = 'bg-emerald-600/30 border-emerald-500 text-emerald-400 font-bold';
      } else {
        colorClass = 'bg-rose-600/30 border-rose-500 text-rose-400 font-bold';
      }
    } else if (isAnswered) {
      colorClass = 'bg-blue-600/30 border-blue-500 text-blue-400 font-medium';
    }

    if (isCurrent) {
      colorClass += ' ring-2 ring-yellow-400 scale-105';
    }

    return `<button onclick="jumpToQuizQuestion(${idx})" class="w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-all duration-150 ${colorClass}">
      ${idx + 1}
    </button>`;
  }).join('');
}

function jumpToQuizQuestion(idx) {
  if (idx >= 0 && idx < quizQuestions.length) {
    quizCurrentIndex = idx;
    renderQuizNavGrid();
    renderQuizQuestion();
  }
}

function prevQuizQuestion() {
  if (quizCurrentIndex > 0) {
    quizCurrentIndex--;
    renderQuizNavGrid();
    renderQuizQuestion();
  }
}

function nextQuizQuestion() {
  if (quizCurrentIndex < quizQuestions.length - 1) {
    quizCurrentIndex++;
    renderQuizNavGrid();
    renderQuizQuestion();
  }
}

function selectQuizOption(optIndex) {
  if (quizSubmitted) return; // Không sửa đáp án sau khi đã nộp bài trong chế độ exam

  const q = quizQuestions[quizCurrentIndex];
  if (!q) return;

  quizUserAnswers[q.id] = optIndex;
  renderQuizNavGrid();
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const container = document.getElementById('quiz-question-container');
  const emptyState = document.getElementById('quiz-empty-state');
  const submitBtn = document.getElementById('quiz-submit-btn');
  const prevBtn = document.getElementById('quiz-prev-btn');
  const nextBtn = document.getElementById('quiz-next-btn');

  if (quizQuestions.length === 0) {
    if (container) container.classList.add('hidden');
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (container) container.classList.remove('hidden');
  if (emptyState) emptyState.classList.add('hidden');

  const q = quizQuestions[quizCurrentIndex];
  const userChoice = quizUserAnswers[q.id];
  const hasAnswered = userChoice !== undefined;
  const isPractice = quizMode === 'practice';
  const showExplanation = (isPractice && hasAnswered) || quizSubmitted;

  // Cập nhật số thứ tự câu
  document.getElementById('quiz-question-progress').innerText = `Câu ${quizCurrentIndex + 1} / ${quizQuestions.length}`;
  const topicObj = INITIAL_TOPICS.find(t => t.id === q.topic);
  document.getElementById('quiz-question-topic-badge').innerText = topicObj ? topicObj.name : 'Chuyên đề khác';
  document.getElementById('quiz-question-text').innerText = q.question;

  // Thanh tiến độ %
  const answeredCount = Object.keys(quizUserAnswers).length;
  const progressPercent = Math.round((answeredCount / quizQuestions.length) * 100);
  document.getElementById('quiz-progress-bar').style.width = `${progressPercent}%`;
  document.getElementById('quiz-progress-percent').innerText = `${progressPercent}%`;

  // Render các lựa chọn
  const optionsContainer = document.getElementById('quiz-options-container');
  const letters = ['A', 'B', 'C', 'D'];
  optionsContainer.innerHTML = q.options.map((optText, optIdx) => {
    let optClasses = 'border-slate-700 bg-slate-800/80 hover:bg-slate-700/60 hover:border-slate-500 text-gray-200';
    let iconHtml = `<span class="w-7 h-7 rounded-full bg-slate-700 text-slate-300 font-semibold flex items-center justify-center text-xs mr-3 shrink-0">${letters[optIdx]}</span>`;

    if (showExplanation) {
      if (optIdx === q.correct) {
        optClasses = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-medium ring-1 ring-emerald-500';
        iconHtml = `<span class="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs mr-3 shrink-0">✓</span>`;
      } else if (userChoice === optIdx && userChoice !== q.correct) {
        optClasses = 'border-rose-500 bg-rose-950/40 text-rose-200 ring-1 ring-rose-500';
        iconHtml = `<span class="w-7 h-7 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-xs mr-3 shrink-0">✕</span>`;
      } else {
        optClasses = 'border-slate-800 bg-slate-900/40 text-gray-500 opacity-60';
      }
    } else if (userChoice === optIdx) {
      optClasses = 'border-blue-500 bg-blue-950/40 text-blue-200 ring-1 ring-blue-500';
      iconHtml = `<span class="w-7 h-7 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center text-xs mr-3 shrink-0">${letters[optIdx]}</span>`;
    }

    return `
      <button onclick="selectQuizOption(${optIdx})" class="w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-start ${optClasses}">
        ${iconHtml}
        <span class="leading-relaxed mt-0.5 text-sm sm:text-base">${optText}</span>
      </button>
    `;
  }).join('');

  // Render phần giải thích
  const explContainer = document.getElementById('quiz-explanation-box');
  if (showExplanation) {
    explContainer.classList.remove('hidden');
    const isCorrect = userChoice === q.correct;
    explContainer.className = `p-4 rounded-xl border mt-4 text-sm leading-relaxed ${isCorrect ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' : 'bg-amber-950/30 border-amber-500/40 text-amber-200'}`;
    explContainer.innerHTML = `
      <div class="flex items-center gap-2 font-semibold mb-1 ${isCorrect ? 'text-emerald-400' : 'text-amber-400'}">
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${isCorrect ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' : 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'}"></path></svg>
        <span>${isCorrect ? 'Chính xác!' : 'Giải thích đáp án đúng:'}</span>
      </div>
      <p class="text-slate-300 mt-1">${q.explanation}</p>
    `;
  } else {
    explContainer.classList.add('hidden');
  }

  // Điều khiển các nút bấm
  if (prevBtn) prevBtn.disabled = quizCurrentIndex === 0;
  if (nextBtn) nextBtn.disabled = quizCurrentIndex === quizQuestions.length - 1;

  if (submitBtn) {
    if (quizSubmitted) {
      submitBtn.classList.add('hidden');
    } else {
      submitBtn.classList.remove('hidden');
    }
  }
}

function submitQuiz() {
  clearInterval(quizTimerInterval);
  quizSubmitted = true;

  let correctCount = 0;
  quizQuestions.forEach(q => {
    if (quizUserAnswers[q.id] === q.correct) {
      correctCount++;
    }
  });

  const total = quizQuestions.length;
  const scorePercent = Math.round((correctCount / total) * 100);

  // Hiển thị modal kết quả
  const modal = document.getElementById('quiz-result-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.getElementById('result-score-text').innerText = `${correctCount} / ${total}`;
    document.getElementById('result-percent-text').innerText = `${scorePercent}%`;
    document.getElementById('result-time-text').innerText = document.getElementById('quiz-timer').innerText;

    let message = 'Cần cố gắng thêm!';
    if (scorePercent >= 90) message = 'Xuất sắc! Bạn nắm rất vững kiến thức!';
    else if (scorePercent >= 75) message = 'Rất tốt! Bạn hiểu sâu bài học!';
    else if (scorePercent >= 50) message = 'Khá ổn, hãy xem lại các câu sai để nhớ lâu hơn.';
    document.getElementById('result-message-text').innerText = message;
  }

  renderQuizNavGrid();
  renderQuizQuestion();
}

function closeResultModal() {
  const modal = document.getElementById('quiz-result-modal');
  if (modal) modal.classList.add('hidden');
}

// ==========================================
// 4. ESSAY MODULE (TỰ LUẬN & ĐỐI CHIẾU TỪ KHÓA)
// ==========================================
function initEssayModule() {
  const topicFilter = document.getElementById('essay-topic-select');
  if (topicFilter) {
    topicFilter.innerHTML = INITIAL_TOPICS.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
    topicFilter.addEventListener('change', (e) => {
      essayFilterTopic = e.target.value;
      filterEssayQuestions();
    });
  }

  document.getElementById('essay-prev-btn')?.addEventListener('click', () => {
    if (essayCurrentIndex > 0) {
      essayCurrentIndex--;
      renderEssayQuestion();
    }
  });

  document.getElementById('essay-next-btn')?.addEventListener('click', () => {
    if (essayCurrentIndex < essayQuestions.length - 1) {
      essayCurrentIndex++;
      renderEssayQuestion();
    }
  });

  document.getElementById('essay-check-btn')?.addEventListener('click', checkEssayAnswer);
  document.getElementById('essay-reset-btn')?.addEventListener('click', resetEssayAnswer);

  filterEssayQuestions();
}

function filterEssayQuestions() {
  if (essayFilterTopic === 'all') {
    essayQuestions = [...allEssayQuestions];
  } else {
    essayQuestions = allEssayQuestions.filter(q => q.topic === essayFilterTopic);
  }
  essayCurrentIndex = 0;
  renderEssayQuestion();
}

function renderEssayQuestion() {
  const container = document.getElementById('essay-content-container');
  const emptyState = document.getElementById('essay-empty-state');
  const prevBtn = document.getElementById('essay-prev-btn');
  const nextBtn = document.getElementById('essay-next-btn');

  if (essayQuestions.length === 0) {
    if (container) container.classList.add('hidden');
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (container) container.classList.remove('hidden');
  if (emptyState) emptyState.classList.add('hidden');

  const q = essayQuestions[essayCurrentIndex];

  document.getElementById('essay-progress-badge').innerText = `Câu ${essayCurrentIndex + 1} / ${essayQuestions.length}`;
  const topicObj = INITIAL_TOPICS.find(t => t.id === q.topic);
  document.getElementById('essay-topic-badge').innerText = topicObj ? topicObj.name : 'Chuyên đề';
  document.getElementById('essay-title').innerText = q.title;
  document.getElementById('essay-question-text').innerText = q.question;

  // Clear previous answer check result unless previously answered
  const inputEl = document.getElementById('essay-user-input');
  inputEl.value = '';
  document.getElementById('essay-analysis-card').classList.add('hidden');

  if (prevBtn) prevBtn.disabled = essayCurrentIndex === 0;
  if (nextBtn) nextBtn.disabled = essayCurrentIndex === essayQuestions.length - 1;
}

function checkEssayAnswer() {
  const q = essayQuestions[essayCurrentIndex];
  if (!q) return;

  const userInput = document.getElementById('essay-user-input').value.trim();
  if (!userInput) {
    alert('Vui lòng nhập câu trả lời của bạn trước khi đối chiếu nhé!');
    return;
  }

  const analysisCard = document.getElementById('essay-analysis-card');
  analysisCard.classList.remove('hidden');

  // Quét từ khóa
  const userLower = userInput.toLowerCase();
  const matchedKeywords = [];
  const missingKeywords = [];

  q.keywords.forEach(kw => {
    if (userLower.includes(kw.toLowerCase())) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const totalKw = q.keywords.length;
  const matchPercent = Math.round((matchedKeywords.length / totalKw) * 100);

  // Hiển thị phần trăm từ khóa
  document.getElementById('essay-keyword-percent').innerText = `${matchPercent}% (${matchedKeywords.length}/${totalKw} từ khóa)`;

  // Badge từ khóa đã có
  const matchedListEl = document.getElementById('essay-matched-keywords');
  matchedListEl.innerHTML = matchedKeywords.length > 0
    ? matchedKeywords.map(k => `<span class="px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-md text-xs font-mono">✓ ${k}</span>`).join(' ')
    : '<span class="text-xs text-gray-500 italic">Chưa tìm thấy từ khóa nào</span>';

  // Badge từ khóa còn thiếu
  const missingListEl = document.getElementById('essay-missing-keywords');
  missingListEl.innerHTML = missingKeywords.length > 0
    ? missingKeywords.map(k => `<span class="px-2.5 py-1 bg-rose-500/20 border border-rose-500/40 text-rose-300 rounded-md text-xs font-mono">✗ ${k}</span>`).join(' ')
    : '<span class="text-xs text-emerald-400 font-medium">Tuyệt vời! Bạn đã bao quát đủ mọi từ khóa cốt lõi!</span>';

  // Đáp án mẫu
  document.getElementById('essay-suggested-answer').innerText = q.suggestedAnswer;

  // Thanh tự chấm điểm (Rubric)
  renderEssayRubric(q.id);
}

function renderEssayRubric(qId) {
  const container = document.getElementById('essay-rubric-container');
  const currentScore = essayUserScores[qId] || 0;

  container.innerHTML = `
    <div class="mt-4 pt-4 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
      <span class="text-sm text-slate-300 font-medium">Tự đánh giá mức độ hiểu của bạn (Thang điểm 1 - 10):</span>
      <div class="flex items-center gap-1.5 flex-wrap">
        ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(pt => `
          <button onclick="saveEssayScore('${qId}', ${pt})" class="w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentScore === pt ? 'bg-amber-500 text-slate-950 shadow-lg scale-110' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}">
            ${pt}
          </button>
        `).join('')}
      </div>
      <span class="text-xs text-amber-400" id="essay-saved-feedback">${currentScore ? `Đã lưu: ${currentScore}/10 điểm` : ''}</span>
    </div>
  `;
}

function saveEssayScore(qId, score) {
  essayUserScores[qId] = score;
  localStorage.setItem(STORAGE_KEYS.ESSAY_PROGRESS, JSON.stringify(essayUserScores));
  renderEssayRubric(qId);
  const fb = document.getElementById('essay-saved-feedback');
  if (fb) fb.innerText = `Đã lưu: ${score}/10 điểm thành công!`;
}

function resetEssayAnswer() {
  document.getElementById('essay-user-input').value = '';
  document.getElementById('essay-analysis-card').classList.add('hidden');
}

// ==========================================
// 5. FLASHCARDS MODULE (THẺ GHI NHỚ)
// ==========================================
function initFlashcardModule() {
  flashcardList = [...allFlashcards];
  flashcardIndex = 0;
  flashcardIsFlipped = false;

  document.getElementById('fc-card')?.addEventListener('click', toggleFlashcardFlip);
  document.getElementById('fc-prev-btn')?.addEventListener('click', prevFlashcard);
  document.getElementById('fc-next-btn')?.addEventListener('click', nextFlashcard);
  document.getElementById('fc-shuffle-btn')?.addEventListener('click', shuffleFlashcards);

  renderFlashcard();
}

function toggleFlashcardFlip() {
  flashcardIsFlipped = !flashcardIsFlipped;
  const card = document.getElementById('fc-card-inner');
  if (card) {
    if (flashcardIsFlipped) {
      card.classList.add('flipped');
    } else {
      card.classList.remove('flipped');
    }
  }
}

function renderFlashcard() {
  if (flashcardList.length === 0) return;
  const fc = flashcardList[flashcardIndex];

  flashcardIsFlipped = false;
  const cardInner = document.getElementById('fc-card-inner');
  if (cardInner) cardInner.classList.remove('flipped');

  document.getElementById('fc-term').innerText = fc.term;
  document.getElementById('fc-def').innerText = fc.def;
  document.getElementById('fc-progress').innerText = `${flashcardIndex + 1} / ${flashcardList.length}`;
}

function prevFlashcard() {
  if (flashcardIndex > 0) {
    flashcardIndex--;
    renderFlashcard();
  }
}

function nextFlashcard() {
  if (flashcardIndex < flashcardList.length - 1) {
    flashcardIndex++;
    renderFlashcard();
  }
}

function shuffleFlashcards() {
  flashcardList = [...flashcardList].sort(() => Math.random() - 0.5);
  flashcardIndex = 0;
  renderFlashcard();
}

// ==========================================
// 6. THÊM NỘI DUNG (FILE 4 MANAGEMENT)
// ==========================================
function initAddContentModule() {
  // Chuyển đổi giữa thêm Trắc nghiệm và Tự luận trong form
  const typeRadios = document.querySelectorAll('input[name="new-type"]');
  typeRadios.forEach(r => {
    r.addEventListener('change', (e) => {
      const type = e.target.value;
      const quizFields = document.getElementById('form-quiz-fields');
      const essayFields = document.getElementById('form-essay-fields');
      if (type === 'quiz') {
        quizFields.classList.remove('hidden');
        essayFields.classList.add('hidden');
      } else {
        quizFields.classList.add('hidden');
        essayFields.classList.remove('hidden');
      }
    });
  });

  // Nút Lưu câu hỏi từ form thủ công
  document.getElementById('btn-save-manual')?.addEventListener('click', saveManualQuestion);

  // Nút Nạp văn bản nhanh (Quick text parser)
  document.getElementById('btn-quick-import')?.addEventListener('click', parseQuickText);

  // Nút Nạp câu hỏi mẫu của File 4 (Demo Network Layer / IP)
  document.getElementById('btn-load-sample-file4')?.addEventListener('click', loadSampleFile4Data);

  // Xuất & Nhập file JSON
  document.getElementById('btn-export-json')?.addEventListener('click', exportDataJson);
  document.getElementById('file-import-json')?.addEventListener('change', importDataJson);
  document.getElementById('btn-clear-custom')?.addEventListener('click', clearAllCustomQuestions);
}

function saveManualQuestion() {
  const type = document.querySelector('input[name="new-type"]:checked').value;
  const topic = document.getElementById('manual-topic-select').value;

  if (type === 'quiz') {
    const questionText = document.getElementById('manual-quiz-question').value.trim();
    const optA = document.getElementById('manual-opt-a').value.trim();
    const optB = document.getElementById('manual-opt-b').value.trim();
    const optC = document.getElementById('manual-opt-c').value.trim();
    const optD = document.getElementById('manual-opt-d').value.trim();
    const correctIdx = parseInt(document.getElementById('manual-quiz-correct').value);
    const expl = document.getElementById('manual-quiz-expl').value.trim();

    if (!questionText || !optA || !optB || !optC || !optD) {
      alert('Vui lòng nhập đầy đủ câu hỏi và cả 4 phương án A, B, C, D!');
      return;
    }

    const newQ = {
      id: 'custom-q-' + Date.now(),
      topic: topic,
      question: questionText,
      options: [optA, optB, optC, optD],
      correct: correctIdx,
      explanation: expl || 'Đáp án theo tài liệu Chuyên đề 4.'
    };

    const customQuiz = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_QUIZ) || '[]');
    customQuiz.push(newQ);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_QUIZ, JSON.stringify(customQuiz));

    // Clear form
    document.getElementById('manual-quiz-question').value = '';
    document.getElementById('manual-opt-a').value = '';
    document.getElementById('manual-opt-b').value = '';
    document.getElementById('manual-opt-c').value = '';
    document.getElementById('manual-opt-d').value = '';
    document.getElementById('manual-quiz-expl').value = '';

    alert('Đã thêm 1 câu trắc nghiệm mới thành công!');
  } else {
    const title = document.getElementById('manual-essay-title').value.trim();
    const questionText = document.getElementById('manual-essay-question').value.trim();
    const suggested = document.getElementById('manual-essay-answer').value.trim();
    const keywordsRaw = document.getElementById('manual-essay-keywords').value.trim();

    if (!questionText || !suggested) {
      alert('Vui lòng nhập câu hỏi tự luận và đáp án mẫu!');
      return;
    }

    const keywords = keywordsRaw ? keywordsRaw.split(',').map(s => s.trim()).filter(s => s.length > 0) : [];

    const newEssay = {
      id: 'custom-es-' + Date.now(),
      topic: topic,
      title: title || 'Câu hỏi tự luận Chuyên đề 4',
      question: questionText,
      suggestedAnswer: suggested,
      keywords: keywords
    };

    const customEssay = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_ESSAY) || '[]');
    customEssay.push(newEssay);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_ESSAY, JSON.stringify(customEssay));

    // Clear form
    document.getElementById('manual-essay-title').value = '';
    document.getElementById('manual-essay-question').value = '';
    document.getElementById('manual-essay-answer').value = '';
    document.getElementById('manual-essay-keywords').value = '';

    alert('Đã thêm 1 câu tự luận mới thành công!');
  }

  loadDataFromStorage();
  updateCustomBadge();
  renderManageList();
}

/**
 * Bộ phân tích văn bản thông minh (Smart Quick-Text Parser)
 * Hỗ trợ định dạng tự nhiên dạng:
 * Câu: ...
 * A. ...
 * B. ...
 * C. ...
 * D. ...
 * Đ: A (hoặc Đáp án: B)
 * GT: ...
 */
function parseQuickText() {
  const text = document.getElementById('quick-text-input').value.trim();
  if (!text) {
    alert('Vui lòng dán nội dung văn bản câu hỏi vào khung trước!');
    return;
  }

  const defaultTopic = document.getElementById('quick-topic-select').value;
  const blocks = text.split(/(?:^|\n)(?=Câu\s*\d*[:.])/im).filter(b => b.trim().length > 0);

  let addedQuizCount = 0;
  const customQuiz = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_QUIZ) || '[]');

  blocks.forEach(block => {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    let question = '';
    let options = ['', '', '', ''];
    let correct = 0;
    let explanation = '';

    lines.forEach(line => {
      if (/^Câu\s*\d*[:.]/i.test(line)) {
        question = line.replace(/^Câu\s*\d*[:.]/i, '').trim();
      } else if (/^[A][.:)]/i.test(line)) {
        options[0] = line.replace(/^[A][.:)]/i, '').trim();
      } else if (/^[B][.:)]/i.test(line)) {
        options[1] = line.replace(/^[B][.:)]/i, '').trim();
      } else if (/^[C][.:)]/i.test(line)) {
        options[2] = line.replace(/^[C][.:)]/i, '').trim();
      } else if (/^[D][.:)]/i.test(line)) {
        options[3] = line.replace(/^[D][.:)]/i, '').trim();
      } else if (/^(?:Đáp án|Đ|DA)[:.]/i.test(line)) {
        const char = line.replace(/^(?:Đáp án|Đ|DA)[:.]/i, '').trim().toUpperCase();
        if (char.includes('A')) correct = 0;
        else if (char.includes('B')) correct = 1;
        else if (char.includes('C')) correct = 2;
        else if (char.includes('D')) correct = 3;
      } else if (/^(?:Giải thích|GT)[:.]/i.test(line)) {
        explanation = line.replace(/^(?:Giải thích|GT)[:.]/i, '').trim();
      }
    });

    if (question && options[0] && options[1]) {
      customQuiz.push({
        id: 'custom-q-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        topic: defaultTopic,
        question: question,
        options: options.map((opt, i) => opt || `Phương án ${['A', 'B', 'C', 'D'][i]}`),
        correct: correct,
        explanation: explanation || 'Nội dung nạp từ tài liệu bổ sung.'
      });
      addedQuizCount++;
    }
  });

  if (addedQuizCount > 0) {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_QUIZ, JSON.stringify(customQuiz));
    loadDataFromStorage();
    updateCustomBadge();
    renderManageList();
    document.getElementById('quick-text-input').value = '';
    alert(`Thành công! Đã tự động nhận diện và thêm ${addedQuizCount} câu trắc nghiệm mới vào ngân hàng câu hỏi!`);
  } else {
    alert('Không nhận diện được câu hỏi nào theo định dạng mẫu. Hãy xem lại cú pháp ví dụ bên dưới khung dán nhé!');
  }
}

/**
 * Nạp sẵn một số câu hỏi mẫu của File 4 (Chủ đề Network Layer & IP Subnetting)
 * Để người dùng có thể trải nghiệm ngay tính năng của File 4
 */
function loadSampleFile4Data() {
  const sampleQuiz = [
    {
      id: 'custom-q-sample-1',
      topic: 'custom',
      question: 'Trong mô hình TCP/IP, Tầng Mạng (Network Layer - Layer 3) đảm nhận nhiệm vụ chính nào?',
      options: [
        'Mã hóa luồng bit thành tín hiệu điện trên cáp đồng',
        'Định tuyến gói tin (Routing) qua các mạng khác nhau dựa vào địa chỉ IP logic',
        'Kiểm soát dòng và đảm bảo truyền tin cậy từng byte với TCP',
        'Gán địa chỉ MAC vật lý vào khung Ethernet'
      ],
      correct: 1,
      explanation: 'Tầng Network (Layer 3) chịu trách nhiệm định địa chỉ logic (IP) và tìm đường tối ưu để chuyển gói tin qua nhiều mạng trung gian (Routing).'
    },
    {
      id: 'custom-q-sample-2',
      topic: 'custom',
      question: 'Địa chỉ IPv4 192.168.1.150/24 có địa chỉ Network ID và địa chỉ Broadcast tương ứng là:',
      options: [
        'Network ID: 192.168.1.0 và Broadcast: 192.168.1.255',
        'Network ID: 192.168.0.0 và Broadcast: 192.168.255.255',
        'Network ID: 192.168.1.1 và Broadcast: 192.168.1.254',
        'Network ID: 192.168.1.150 và Broadcast: 255.255.255.255'
      ],
      correct: 0,
      explanation: 'Với tiền tố /24 (Subnet Mask 255.255.255.0), 24 bit đầu là phần mạng: 192.168.1.0 là Network ID, và tất cả bit host bằng 1 (192.168.1.255) là địa chỉ Broadcast.'
    }
  ];

  const sampleEssay = [
    {
      id: 'custom-es-sample-1',
      topic: 'custom',
      title: 'Mục đích của việc chia mạng con (Subnetting) trong IPv4',
      question: 'Hãy trình bày mục đích chính của việc chia mạng con (Subnetting) trong mạng máy tính IPv4. Lấy ví dụ minh họa cách chia một dải mạng /24 thành 2 mạng con.',
      suggestedAnswer: `1. Mục đích của Subnetting:
- Tiết kiệm và tối ưu hóa không gian địa chỉ IPv4 đang cạn kiệt.
- Thu hẹp kích thước Broadcast Domain: Giảm thiểu lưu lượng rác Broadcast gây nghẽn đường truyền.
- Tăng cường bảo mật và quản lý: Phân chia các phòng ban, phòng máy hoặc chi nhánh thành các mạng con độc lập, dễ thiết lập Access Control List (ACL) và tường lửa.

2. Ví dụ chia mạng con:
- Cho dải mạng ban đầu 192.168.1.0/24 (có 256 địa chỉ, mask 255.255.255.0).
- Mượn thêm 1 bit từ phần Host ID làm Network ID -> Tiền tố mới là /25 (Subnet Mask: 255.255.255.128).
- Ta được 2 mạng con:
  + Subnet 1: 192.168.1.0/25 (Dải khả dụng từ 192.168.1.1 đến 192.168.1.126; Broadcast: 192.168.1.127).
  + Subnet 2: 192.168.1.128/25 (Dải khả dụng từ 192.168.1.129 đến 192.168.1.254; Broadcast: 192.168.1.255).`,
      keywords: ['subnetting', 'tiết kiệm ip', 'broadcast domain', 'bảo mật', 'mượn bit', '/25', '255.255.255.128', 'mạng con', '192.168.1.0', '192.168.1.128']
    }
  ];

  const customQuiz = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_QUIZ) || '[]');
  const customEssay = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_ESSAY) || '[]');

  localStorage.setItem(STORAGE_KEYS.CUSTOM_QUIZ, JSON.stringify([...customQuiz, ...sampleQuiz]));
  localStorage.setItem(STORAGE_KEYS.CUSTOM_ESSAY, JSON.stringify([...customEssay, ...sampleEssay]));

  loadDataFromStorage();
  updateCustomBadge();
  renderManageList();
  alert('Đã nạp 2 câu trắc nghiệm và 1 câu tự luận mẫu cho Chuyên đề 4 thành công!');
}

function renderManageList() {
  const customQuiz = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_QUIZ) || '[]');
  const customEssay = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_ESSAY) || '[]');

  const container = document.getElementById('manage-questions-list');
  if (!container) return;

  if (customQuiz.length === 0 && customEssay.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-slate-500 border border-dashed border-slate-700 rounded-xl">
        Chưa có câu hỏi nào được thêm thêm từ File 4. Hãy dùng Form hoặc Hộp dán nhanh phía trên để nạp thêm nhé!
      </div>
    `;
    return;
  }

  let html = '';

  if (customQuiz.length > 0) {
    html += `<h4 class="text-sm font-semibold text-blue-400 mb-2 mt-2">Câu hỏi Trắc nghiệm đã thêm (${customQuiz.length}):</h4>`;
    html += customQuiz.map((q, idx) => `
      <div class="p-3 bg-slate-800/80 border border-slate-700 rounded-lg mb-2 flex items-start justify-between gap-3 text-sm">
        <div>
          <span class="inline-block px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-xs font-mono mb-1">Trắc nghiệm #${idx + 1}</span>
          <p class="font-medium text-slate-200">${q.question}</p>
          <p class="text-xs text-slate-400 mt-1">Đáp án đúng: ${['A', 'B', 'C', 'D'][q.correct]} - ${q.options[q.correct]}</p>
        </div>
        <button onclick="deleteCustomQuestion('quiz', '${q.id}')" class="px-2.5 py-1 text-xs bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 rounded border border-rose-500/30 shrink-0">
          Xóa
        </button>
      </div>
    `).join('');
  }

  if (customEssay.length > 0) {
    html += `<h4 class="text-sm font-semibold text-emerald-400 mb-2 mt-4">Câu hỏi Tự luận đã thêm (${customEssay.length}):</h4>`;
    html += customEssay.map((es, idx) => `
      <div class="p-3 bg-slate-800/80 border border-slate-700 rounded-lg mb-2 flex items-start justify-between gap-3 text-sm">
        <div>
          <span class="inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono mb-1">Tự luận #${idx + 1}</span>
          <p class="font-medium text-slate-200">${es.title}</p>
          <p class="text-xs text-slate-400 mt-1 line-clamp-1">${es.question}</p>
        </div>
        <button onclick="deleteCustomQuestion('essay', '${es.id}')" class="px-2.5 py-1 text-xs bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 rounded border border-rose-500/30 shrink-0">
          Xóa
        </button>
      </div>
    `).join('');
  }

  container.innerHTML = html;
}

function deleteCustomQuestion(type, id) {
  if (!confirm('Bạn có chắc muốn xóa câu hỏi này không?')) return;

  if (type === 'quiz') {
    let customQuiz = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_QUIZ) || '[]');
    customQuiz = customQuiz.filter(q => q.id !== id);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_QUIZ, JSON.stringify(customQuiz));
  } else {
    let customEssay = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_ESSAY) || '[]');
    customEssay = customEssay.filter(es => es.id !== id);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_ESSAY, JSON.stringify(customEssay));
  }

  loadDataFromStorage();
  updateCustomBadge();
  renderManageList();
}

function clearAllCustomQuestions() {
  if (!confirm('CẢNH BÁO: Thao tác này sẽ xóa toàn bộ câu hỏi do bạn thêm từ File 4. Bạn có chắc không?')) return;
  localStorage.removeItem(STORAGE_KEYS.CUSTOM_QUIZ);
  localStorage.removeItem(STORAGE_KEYS.CUSTOM_ESSAY);
  loadDataFromStorage();
  updateCustomBadge();
  renderManageList();
  alert('Đã xóa sạch các câu hỏi tự thêm!');
}

function exportDataJson() {
  const customQuiz = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_QUIZ) || '[]');
  const customEssay = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_ESSAY) || '[]');
  const backup = {
    exportDate: new Date().toISOString(),
    customQuiz,
    customEssay
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `network_study_file4_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importDataJson(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (data.customQuiz || data.customEssay) {
        if (data.customQuiz) {
          const currentQuiz = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_QUIZ) || '[]');
          localStorage.setItem(STORAGE_KEYS.CUSTOM_QUIZ, JSON.stringify([...currentQuiz, ...data.customQuiz]));
        }
        if (data.customEssay) {
          const currentEssay = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_ESSAY) || '[]');
          localStorage.setItem(STORAGE_KEYS.CUSTOM_ESSAY, JSON.stringify([...currentEssay, ...data.customEssay]));
        }
        loadDataFromStorage();
        updateCustomBadge();
        renderManageList();
        alert('Đã nạp câu hỏi từ file JSON thành công!');
      } else {
        alert('File JSON không đúng định dạng lưu trữ của ứng dụng.');
      }
    } catch (err) {
      alert('Lỗi đọc file JSON: ' + err.message);
    }
  };
  reader.readAsText(file);
}
