// ALTERNAR MODO CLARO / ESCURO
function toggleTheme() {
    const html = document.documentElement;
    html.getAttribute('data-theme') === 'dark' ? html.removeAttribute('data-theme') : html.setAttribute('data-theme', 'dark');
}

// CONJUNTO DE DADOS DOS GRÁFICOS
const chartDataSets = {
    geral: {
        labels: ['2021', '2022', '2023', '2024', '2025', '2026'],
        datasets: [
            { label: 'Rendimento Agrícola (Sacas/Ha)', data: [45, 52, 58, 68, 74, 85], borderColor: '#2d6a4f', tension: 0.2, fill: false },
            { label: 'Uso de Insumos Químicos (%)', data: [90, 82, 70, 58, 48, 35], borderColor: '#b07d62', tension: 0.2, fill: false }
        ]
    },
    agua: {
        labels: ['2021', '2022', '2023', '2024', '2025', '2026'],
        datasets: [
            { label: 'Captação de Água Bruta (Litros/kg)', data: [120, 105, 88, 65, 45, 22], borderColor: '#3a86c8', tension: 0.2, fill: false }
        ]
    },
    carbono: {
        labels: ['2021', '2022', '2023', '2024', '2025', '2026'],
        datasets: [
            { label: 'Emissão de CO2 Equivalente', data: [14, 13, 11, 8, 5, 2], borderColor: '#e53e3e', tension: 0.2, fill: false }
        ]
    }
};

// INICIALIZADOR DO GRÁFICO
const ctx = document.getElementById('analyticsChart').getContext('2d');
let currentChart = new Chart(ctx, {
    type: 'line',
    data: chartDataSets.geral,
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { font: { family: 'Inter' } } } } }
});

// ALTERNAR OS DADOS DO GRÁFICO NOS FILTROS
function updateChartData(type, button) {
    document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    currentChart.data = chartDataSets[type];
    currentChart.update();
}

// BANCO DE DADOS DO QUIZ
const quizData = [
    {
        question: "Qual técnica mitiga a erosão e armazena carbono diretamente no solo o ano todo?",
        options: ["Aragem profunda convencional", "Plantio Direto sobre palhada", "Monocultura contínua", "Queimada controlada sazonal"],
        correct: 1
    },
    {
        question: "Como os sensores de Internet das Coisas (IoT) atuam na eficiência hídrica?",
        options: ["Aumentando o volume total de água aspergida", "Calculando a evapotranspiração e umidade exata do solo", "Substituindo a necessidade de chuvas", "Modificando geneticamente as plantas"],
        correct: 1
    },
    {
        question: "O que caracteriza o modelo de Integração Lavoura-Pecuária-Floresta (ILPF)?",
        options: ["Separação física rígida entre as atividades", "Uso intensivo de defensivos sintéticos", "Consorciação de culturas no mesmo espaço otimizando recursos", "Foco exclusivo na exportação de madeira maciça"],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;

// SISTEMA DO QUIZ
function loadQuiz() {
    const container = document.getElementById('options-container');
    const nextBtn = document.getElementById('next-btn');
    const qData = quizData[currentQuestionIndex];
    
    nextBtn.style.display = "none";
    container.innerHTML = "";
    document.getElementById('progress').innerText = `Desafio: Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;
    document.getElementById('question').innerText = qData.question;

    qData.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-item';
        btn.innerText = opt;
        btn.onclick = () => selectOption(idx, btn);
        container.appendChild(btn);
    });
}

function selectOption(selectedIndex, clickedBtn) {
    const qData = quizData[currentQuestionIndex];
    const allOptions = document.querySelectorAll('.option-item');
    
    allOptions.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === qData.correct) {
        clickedBtn.style.borderColor = "var(--accent)";
        clickedBtn.style.backgroundColor = "rgba(82, 183, 136, 0.2)";
        score++;
    } else {
        clickedBtn.style.borderColor = "var(--danger)";
        clickedBtn.style.backgroundColor = "rgba(229, 62, 62, 0.1)";
        allOptions[qData.correct].style.borderColor = "var(--accent)";
    }
    
    document.getElementById('next-btn').style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuiz();
    } else {
        showResults();
    }
}

function showResults() {
    const wrapper = document.getElementById('quiz-wrapper');
    wrapper.innerHTML = `
        <div style='padding: 20px;'>
            <h3 style='font-size: 26px; margin-bottom: 15px; color: var(--primary);'>Desafio Concluído!</h3>
            <p style='font-size: 18px; margin-bottom: 20px; color: var(--texto-s);'>Você acertou <strong>${score}</strong> de <strong>${quizData.length}</strong> cenários técnicos.</p>
            <button class='btn-filter active' style='padding: 10px 20px; font-size:15px;' onclick='location.reload()'>Reiniciar Desafio</button>
        </div>
    `;
}

// Inicializar aplicativo
loadQuiz();
