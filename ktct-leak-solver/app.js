const questions = window.KTCT_QUESTIONS || [];
const $ = (id) => document.getElementById(id);
const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
let practiceOrder = [...questions.keys()];
let practicePos = 0;

function unique(key) {
  return [...new Set(questions.map(q => q[key]).filter(Boolean))];
}

function initFilters() {
  $('totalCount').textContent = questions.length;
  for (const exam of unique('exam')) $('examFilter').insertAdjacentHTML('beforeend', `<option>${exam}</option>`);
  for (const ch of unique('chapter')) $('chapterFilter').insertAdjacentHTML('beforeend', `<option>${ch}</option>`);
  ['searchInput', 'examFilter', 'chapterFilter'].forEach(id => $(id).addEventListener('input', renderList));
  $('resetBtn').addEventListener('click', () => { $('searchInput').value=''; $('examFilter').value='all'; $('chapterFilter').value='all'; renderList(); });
  $('shuffleBtn').addEventListener('click', shufflePractice);
  $('nextBtn').addEventListener('click', nextPractice);
}

function filtered() {
  const term = $('searchInput').value.trim().toLowerCase();
  const exam = $('examFilter').value;
  const ch = $('chapterFilter').value;
  return questions.filter(q => {
    const hay = [q.question, q.answer, q.chapter, q.exam, ...(q.tags || [])].join(' ').toLowerCase();
    return (exam === 'all' || q.exam === exam) && (ch === 'all' || q.chapter === ch) && (!term || hay.includes(term));
  });
}

function renderList() {
  const list = filtered();
  $('questionList').innerHTML = list.map(q => cardHTML(q)).join('') || '<div class="notice">Không tìm thấy câu phù hợp.</div>';
}

function cardHTML(q) {
  const opts = q.options.map((o, i) => `<div class="option ${i === q.correctIndex ? 'correct' : 'wrong'}"><span class="letter">${letters[i]}</span>${o}</div>`).join('');
  const wrongs = q.options.map((o, i) => i === q.correctIndex ? '' : `<div class="wrong-item"><b>${letters[i]} sai:</b> ${q.wrongExplain?.[i] || 'Không đúng với bản chất khái niệm trong chương nguồn.'}</div>`).join('');
  return `<article class="qcard">
    <div class="qtop">
      <div class="badges"><span class="badge">${q.exam}</span><span class="badge">${q.chapter}</span><span class="badge warn">${q.difficulty}</span></div>
      <small>${q.id}</small>
    </div>
    <div class="qtitle">${q.question}</div>
    <div class="options">${opts}</div>
    <div class="explain">
      <div class="explain-box good"><b>Đáp án đúng: ${letters[q.correctIndex]}.</b> ${q.correctExplain}<br><b>Kết luận:</b> ${q.answer}</div>
      <div class="wrong-grid">${wrongs}</div>
      <div class="explain-box source"><b>Nguồn giải thích:</b> ${q.sourceFile}<br><b>Ý nguồn:</b> ${q.sourceQuote}</div>
    </div>
  </article>`;
}

function renderPractice() {
  if (!questions.length) return;
  const q = questions[practiceOrder[practicePos % practiceOrder.length]];
  $('practiceCard').innerHTML = `<div class="badges"><span class="badge">${q.exam}</span><span class="badge">${q.chapter}</span></div>
    <div class="qtitle">${q.question}</div>
    ${q.options.map((o, i) => `<button class="practice-option" onclick="answerPractice(${i})"><span class="letter">${letters[i]}</span>${o}</button>`).join('')}
    <div id="practiceResult"></div>`;
}

window.answerPractice = function(i) {
  const q = questions[practiceOrder[practicePos % practiceOrder.length]];
  const ok = i === q.correctIndex;
  $('practiceResult').innerHTML = `<div class="practice-result ${ok ? 'good' : 'bad'}">
    ${ok ? 'Đúng.' : `Sai. Đáp án đúng là ${letters[q.correctIndex]}.`} ${ok ? q.correctExplain : (q.wrongExplain?.[i] || q.correctExplain)}
  </div>`;
}

function nextPractice() { practicePos++; renderPractice(); }
function shufflePractice() { practiceOrder.sort(() => Math.random() - .5); practicePos = 0; renderPractice(); }

initFilters();
renderList();
renderPractice();
