// Lead Management Module

let allLeads = [];
let currentLeadId = null;

// Load Dashboard
async function loadDashboard() {
    try {
        const leads = await getLeads();
        allLeads = leads;
        
        updateDashboardStats(leads);
        renderLeads(leads);
        
        // Load AI insights in background (don't block dashboard loading)
        setTimeout(() => loadAIInsights(leads), 500);
    } catch (error) {
        console.error('Load dashboard error:', error);
        showToast('Failed to load dashboard', 'error');
    }
}

// Update Dashboard Statistics
function updateDashboardStats(leads) {
    // Total leads
    document.getElementById('stat-total-leads').textContent = leads.length;
    
    // This month's leads
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthLeads = leads.filter(lead => {
        const createdDate = lead.createdAt?.toDate() || new Date();
        return createdDate >= startOfMonth;
    });
    document.getElementById('stat-month-leads').textContent = monthLeads.length;
    
    // Pipeline value
    const totalValue = leads.reduce((sum, lead) => 
        sum + (lead.estimatedValue || 0), 0
    );
    document.getElementById('stat-pipeline-value').textContent = formatCurrency(totalValue);
    
    // Conversion rate
    const closedWon = leads.filter(l => l.stage === 'Closed' && l.wonLost === 'won').length;
    const conversionRate = leads.length > 0 ? (closedWon / leads.length * 100).toFixed(1) : 0;
    document.getElementById('stat-conversion-rate').textContent = `${conversionRate}%`;
}

// Load AI Insights
async function loadAIInsights(leads) {
    const insightsContainer = document.getElementById('ai-insights');
    const savedKey = localStorage.getItem('geminiApiKey');
    
    // Check if API key is configured
    if (!savedKey || savedKey === 'YOUR_GEMINI_API_KEY' || savedKey.length < 10) {
        insightsContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                    🤖 Configure your Gemini API key to unlock AI-powered insights
                </p>
                <button onclick="document.querySelector('[data-view=\\'settings\\']').click()" class="btn btn-primary">
                    Configure API Key
                </button>
            </div>
        `;
        return;
    }
    
    try {
        showLoading('ai-insights');
        const insights = await geminiAI.generateInsights(leads);
        insightsContainer.innerHTML = `<div class="insights-text">${insights.replace(/\n/g, '<br>')}</div>`;
    } catch (error) {
        console.error('AI insights error:', error);
        insightsContainer.innerHTML = `
            <p style="color: var(--text-secondary);">
                ${error.message || 'Unable to generate insights. Please check your API key in Settings.'}
            </p>
        `;
    }
}

// Refresh Insights Button
document.getElementById('refresh-insights')?.addEventListener('click', async () => {
    if (!requireApiKey('generateInsights')) return;
    await loadAIInsights(allLeads);
    showToast('Insights refreshed!', 'success');
});

// Load Leads
async function loadLeads() {
    try {
        const leads = await getLeads();
        allLeads = leads;
        renderLeads(leads);
    } catch (error) {
        console.error('Load leads error:', error);
        showError('leads-container', 'Failed to load leads');
    }
}

// Render Leads
function renderLeads(leads) {
    const container = document.getElementById('leads-container');
    if (!container) return;
    
    const filtered = applyFilters(leads);
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="glass-panel" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <h3>No leads found</h3>
                <p style="color: var(--text-secondary); margin: 1rem 0;">
                    ${leads.length === 0 ? 'Start by adding your first lead!' : 'Try adjusting your filters.'}
                </p>
                <button class="btn btn-primary" onclick="openAddLeadModal()">+ Add Lead</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filtered.map(lead => createLeadCard(lead)).join('');
}

// Create Lead Card HTML
function createLeadCard(lead) {
    const score = lead.score || 0;
    const scoreClass = getScoreClass(score);
    const tags = lead.tags || [];
    
    return `
        <div class="lead-card" data-lead-id="${lead.id}" onclick="openLeadDetail('${lead.id}')">
            <h3>${lead.name}</h3>
            <p style="color: var(--text-secondary); margin: 0.5rem 0;">
                ${lead.company || 'Individual'} • ${lead.email}
            </p>
            <div class="lead-meta">
                <span class="tag">${lead.source}</span>
                <span class="score ${scoreClass}">Score: ${score}</span>
            </div>
            <p class="lead-stage">Stage: ${lead.stage}</p>
            ${tags.length > 0 ? `
                <div class="tags-container" style="margin: 0.5rem 0;">
                    ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            ` : ''}
            <p style="color: var(--text-tertiary); font-size: 0.85rem; margin: 0.5rem 0;">
                ${lead.estimatedValue ? formatCurrency(lead.estimatedValue) : 'No value set'}
            </p>
            <div class="lead-actions" onclick="event.stopPropagation()">
                <button class="btn btn-primary" onclick="sendEmail('${lead.email}')">Email</button>
                <button class="btn btn-secondary" onclick="openLeadDetail('${lead.id}')">View</button>
            </div>
        </div>
    `;
}

// Open Add Lead Modal
function openAddLeadModal() {
    currentLeadId = null;
    document.getElementById('modal-title').textContent = 'Add New Lead';
    document.getElementById('lead-form').reset();
    openModal('lead-modal');
}

// Add Lead Button
document.getElementById('add-lead-btn')?.addEventListener('click', openAddLeadModal);

// Lead Form Submit
document.getElementById('lead-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const leadData = {
        name: document.getElementById('lead-name').value,
        email: document.getElementById('lead-email').value,
        phone: document.getElementById('lead-phone').value,
        company: document.getElementById('lead-company').value,
        source: document.getElementById('lead-source').value,
        stage: document.getElementById('lead-stage').value,
        estimatedValue: parseFloat(document.getElementById('lead-value').value) || 0,
        tags: document.getElementById('lead-tags').value
            .split(',')
            .map(t => t.trim())
            .filter(t => t),
        notes: document.getElementById('lead-notes').value
    };
    
    try {
        if (currentLeadId) {
            await updateLead(currentLeadId, leadData);
        } else {
            const leadId = await createLead(leadData);
            
            // Auto-score with AI (if key configured)
            const savedKey = localStorage.getItem('geminiApiKey');
            if (savedKey && savedKey !== 'YOUR_GEMINI_API_KEY' && savedKey.length > 10) {
                try {
                    const score = await geminiAI.scoreLead(leadData);
                    await updateLead(leadId, { score });
                } catch (error) {
                    console.error('Auto-scoring failed:', error);
                    // Continue without score - not critical
                }
            }
        }
        
        closeModal('lead-modal');
        await loadLeads();
        await loadDashboard();
    } catch (error) {
        console.error('Save lead error:', error);
    }
});

// Open Lead Detail Modal
async function openLeadDetail(leadId) {
    currentLeadId = leadId;
    
    try {
        const lead = await getLead(leadId);
        if (!lead) {
            showToast('Lead not found', 'error');
            return;
        }
        
        // Populate lead details
        document.getElementById('detail-lead-name').textContent = lead.name;
        document.getElementById('detail-email').textContent = lead.email;
        document.getElementById('detail-phone').textContent = lead.phone || 'N/A';
        document.getElementById('detail-company').textContent = lead.company || 'N/A';
        document.getElementById('detail-source').textContent = lead.source;
        document.getElementById('detail-stage').textContent = lead.stage;
        document.getElementById('detail-value').textContent = formatCurrency(lead.estimatedValue || 0);
        document.getElementById('detail-created').textContent = formatDate(lead.createdAt);
        document.getElementById('detail-last-contact').textContent = formatRelativeTime(lead.lastContact);
        
        // Score badge
        const score = lead.score || 0;
        const scoreEl = document.getElementById('detail-score');
        scoreEl.textContent = `${score} / 100`;
        scoreEl.className = `score-badge ${getScoreClass(score)}`;
        
        // Tags
        const tagsContainer = document.getElementById('detail-tags');
        if (lead.tags && lead.tags.length > 0) {
            tagsContainer.innerHTML = lead.tags.map(tag => 
                `<span class="tag">${tag}</span>`
            ).join('');
        } else {
            tagsContainer.innerHTML = '<span class="tag">No tags</span>';
        }
        
        // Notes
        document.getElementById('lead-notes-field').value = lead.notes || '';
        
        // Load activities
        await loadActivities(leadId);
        
        openModal('detail-modal');
    } catch (error) {
        console.error('Open lead detail error:', error);
        showToast('Failed to load lead details', 'error');
    }
}

// Load Activities Timeline
async function loadActivities(leadId) {
    const timeline = document.getElementById('activity-timeline');
    
    try {
        console.log('Loading activities for lead:', leadId);
        const activities = await getActivities(leadId);
        console.log('Activities loaded:', activities.length, activities);
        
        if (activities.length === 0) {
            timeline.innerHTML = `
                <p style="color: var(--text-secondary); text-align: center; padding: 2rem;">
                    No activities yet. Add your first interaction!
                </p>
            `;
            return;
        }
        
        timeline.innerHTML = activities.map(activity => `
            <div class="timeline-item">
                <span class="timeline-type">${getActivityIcon(activity.type)} ${activity.type}</span>
                <div class="timeline-date">${formatRelativeTime(activity.createdAt)}</div>
                <div class="timeline-description">${activity.description}</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Load activities error details:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        timeline.innerHTML = `
            <p style="color: var(--text-secondary); text-align: center; padding: 2rem;">
                Unable to load activities. ${error.message || 'Please try again.'}
            </p>
        `;
    }
}

// Edit Lead Button
document.getElementById('edit-lead-btn')?.addEventListener('click', async () => {
    const lead = await getLead(currentLeadId);
    if (!lead) return;
    
    // Populate form
    document.getElementById('lead-name').value = lead.name;
    document.getElementById('lead-email').value = lead.email;
    document.getElementById('lead-phone').value = lead.phone || '';
    document.getElementById('lead-company').value = lead.company || '';
    document.getElementById('lead-source').value = lead.source;
    document.getElementById('lead-stage').value = lead.stage;
    document.getElementById('lead-value').value = lead.estimatedValue || '';
    document.getElementById('lead-tags').value = (lead.tags || []).join(', ');
    document.getElementById('lead-notes').value = lead.notes || '';
    
    document.getElementById('modal-title').textContent = 'Edit Lead';
    closeModal('detail-modal');
    openModal('lead-modal');
});

// Delete Lead Button
document.getElementById('delete-lead-btn')?.addEventListener('click', async () => {
    if (!confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
        return;
    }
    
    try {
        await deleteLead(currentLeadId);
        closeModal('detail-modal');
        await loadLeads();
        await loadDashboard();
    } catch (error) {
        console.error('Delete lead error:', error);
    }
});

// Save Notes Button
document.getElementById('save-notes-btn')?.addEventListener('click', async () => {
    const notes = document.getElementById('lead-notes-field').value;
    
    try {
        await updateLead(currentLeadId, { notes });
        await createActivity(currentLeadId, 'note', 'Notes updated');
        await loadActivities(currentLeadId);
    } catch (error) {
        console.error('Save notes error:', error);
    }
});

// Add Activity
document.getElementById('add-activity-btn')?.addEventListener('click', () => {
    openModal('activity-modal');
});

document.getElementById('activity-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const type = document.getElementById('activity-type').value;
    const description = document.getElementById('activity-description').value;
    
    try {
        await createActivity(currentLeadId, type, description);
        closeModal('activity-modal');
        document.getElementById('activity-form').reset();
        await loadActivities(currentLeadId);
        showToast('Activity added!', 'success');
    } catch (error) {
        console.error('Add activity error:', error);
    }
});

// AI Actions
document.getElementById('ai-score-btn')?.addEventListener('click', async () => {
    if (!requireApiKey('scoreLead')) return;
    
    try {
        const lead = await getLead(currentLeadId);
        showToast('Scoring lead with AI...', 'info');
        
        const score = await geminiAI.scoreLead(lead);
        await updateLead(currentLeadId, { score });
        await createActivity(currentLeadId, 'note', `AI scored lead: ${score}/100`);
        
        showToast(`Lead scored: ${score}/100`, 'success');
        await openLeadDetail(currentLeadId);
    } catch (error) {
        console.error('AI score error:', error);
        showToast('Failed to score lead. Please check your API key in Settings.', 'error');
    }
});

document.getElementById('ai-email-btn')?.addEventListener('click', async () => {
    if (!requireApiKey('draftEmail')) return;
    
    try {
        const lead = await getLead(currentLeadId);
        showToast('Drafting email with AI...', 'info');
        
        const email = await geminiAI.draftEmail(lead);
        
        document.getElementById('ai-email-content').innerHTML = `
            <pre style="white-space: pre-wrap; font-family: inherit;">${email}</pre>
        `;
        
        openModal('ai-email-modal');
    } catch (error) {
        console.error('AI email error:', error);
        showToast('Failed to draft email. Please check your API key in Settings.', 'error');
    }
});

document.getElementById('ai-action-btn')?.addEventListener('click', async () => {
    if (!requireApiKey('analyzeEngagement')) return;
    
    try {
        const lead = await getLead(currentLeadId);
        const activities = await getActivities(currentLeadId);
        
        showLoading('lead-ai-insights');
        
        const action = await geminiAI.suggestNextAction(lead, activities);
        const analysis = await geminiAI.analyzeEngagement(lead, activities);
        
        document.getElementById('lead-ai-insights').innerHTML = `
            <h4>📊 Engagement Analysis</h4>
            <p style="margin-bottom: 1.5rem;">${analysis}</p>
            <h4>💡 Recommended Next Action</h4>
            <p><strong>${action}</strong></p>
        `;
        
        // Switch to AI insights tab
        document.querySelector('[data-tab="ai-insights"]').click();
    } catch (error) {
        console.error('AI action error:', error);
        showError('lead-ai-insights', 'Failed to generate AI insights');
    }
});

// Copy Email Button
document.getElementById('copy-email-btn')?.addEventListener('click', () => {
    const emailText = document.getElementById('ai-email-content').textContent;
    copyToClipboard(emailText);
});

// Send Email (opens mailto link)
function sendEmail(email) {
    window.location.href = `mailto:${email}`;
}

// Export for global access
if (typeof window !== 'undefined') {
    window.openAddLeadModal = openAddLeadModal;
    window.openLeadDetail = openLeadDetail;
    window.sendEmail = sendEmail;
}
