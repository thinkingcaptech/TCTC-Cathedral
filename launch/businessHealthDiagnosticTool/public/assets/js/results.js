const pillars = ['management', 'marketing', 'sales', 'finances'];

const formatNarrative = (score) => {
    if (score >= 85) return 'Elite operations. Keep investing in scalability.';
    if (score >= 70) return 'Strong fundamentals with select optimizations remaining.';
    if (score >= 55) return 'Momentum exists, but key bottlenecks now limit growth.';
    return 'Critical focus required. Address the weakest pillar immediately.';
};

const renderBreakdown = (scores) => {
    const grid = document.getElementById('breakdownGrid');
    if (!grid) return;
    grid.innerHTML = '';
    pillars.forEach((pillar) => {
        const score = scores?.[pillar] ?? 0;
        const titleMap = {
            management: 'Management & Operations',
            marketing: 'Marketing & Lead Generation',
            sales: 'Sales & Conversion',
            finances: 'Finances & Scalability',
        };
        const card = document.createElement('article');
        card.className = 'breakdown-card';
        card.innerHTML = `
            <h3>${titleMap[pillar]}</h3>
            <p>${score}/100</p>
            <div class="progress-pill"><span style="width:${score}%"></span></div>
        `;
        grid.appendChild(card);
    });
};

const renderRecommendations = (text) => {
    const container = document.getElementById('aiRecommendations');
    if (!container) return;
    container.classList.remove('loading');
    if (!text) {
        container.innerHTML = '<p>Recommendations are still processing. Check back shortly.</p>';
        return;
    }
    const bullets = text
        .split(/\n+/)
        .map((line) => line.replace(/^[*-]\s*/, '').trim())
        .filter(Boolean);

    if (bullets.length === 0) {
        container.innerHTML = `<p>${text}</p>`;
        return;
    }

    const list = document.createElement('ul');
    bullets.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
    container.innerHTML = '';
    container.appendChild(list);
};

const updateCtaCopy = (scores) => {
    const ctaPanel = document.getElementById('ctaPanel');
    if (!ctaPanel || !scores) return;
    const salesScore = scores.sales || 0;
    const paragraph = ctaPanel.querySelector('p:nth-of-type(2)');
    if (salesScore < 65) {
        paragraph.textContent = 'Sales & Conversion scored the lowest. The Sales Funnel Micro-CRM is tuned to remove friction exactly where you need it most.';
    }
};

const loadReportFromLocalStorage = (reportId) => {
    try {
        const reportData = localStorage.getItem(`diagnostic_${reportId}`);
        if (!reportData) return null;
        return JSON.parse(reportData);
    } catch (error) {
        console.error('Error parsing localStorage report:', error);
        return null;
    }
};

const loadReportFromFirestore = async (reportId) => {
    if (!window.db) return null;
    
    try {
        const doc = await window.db.collection('diagnostics').doc(reportId).get();
        if (!doc.exists) return null;
        return doc.data();
    } catch (error) {
        console.error('Error fetching from Firestore:', error);
        return null;
    }
};

const loadReport = async () => {
    const params = new URLSearchParams(window.location.search);
    const reportId = params.get('reportId') || sessionStorage.getItem('latest_report_id');
    const scoreEl = document.getElementById('scoreValue');
    const narrativeEl = document.getElementById('scoreNarrative');
    const reportIdLabel = document.getElementById('reportIdLabel');

    if (!reportId) {
        narrativeEl.textContent = 'Missing report ID. Please relaunch the diagnostic.';
        return;
    }

    reportIdLabel.textContent = reportId;
    narrativeEl.textContent = 'Loading your report...';

    try {
        // Try localStorage first (for BYOK mode)
        let data = loadReportFromLocalStorage(reportId);
        
        // Fallback to Firestore if available (for backwards compatibility)
        if (!data && window.db) {
            data = await loadReportFromFirestore(reportId);
        }

        if (!data) {
            narrativeEl.textContent = 'Report not found. Double-check the link or run the diagnostic again.';
            return;
        }

        const scores = data?.scores || {};
        const totalScore = scores.total ?? 0;
        scoreEl.textContent = `${totalScore}`;
        narrativeEl.textContent = formatNarrative(totalScore);
        renderBreakdown(scores);
        renderRecommendations(data?.recommendations);
        updateCtaCopy(scores);
    } catch (error) {
        console.error('Error loading report', error);
        narrativeEl.textContent = 'We hit a snag retrieving your report. Please refresh or rerun the diagnostic.';
    }
};

document.addEventListener('DOMContentLoaded', loadReport);