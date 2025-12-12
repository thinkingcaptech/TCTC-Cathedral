// Analytics Dashboard Module

let analyticsData = {
    leads: [],
    conversionFunnel: {},
    leadSources: {},
    salesVelocity: 0,
    revenueForecast: 0
};

// Load Analytics
async function loadAnalytics() {
    try {
        const leads = await getLeads();
        analyticsData.leads = leads;
        
        calculateAnalytics(leads);
        renderConversionFunnel();
        renderLeadSources();
        renderSalesVelocity();
        renderRevenueForecast();
    } catch (error) {
        console.error('Load analytics error:', error);
        showToast('Failed to load analytics', 'error');
    }
}

// Calculate Analytics Data
function calculateAnalytics(leads) {
    // Conversion Funnel
    analyticsData.conversionFunnel = {};
    appConfig.stages.forEach(stage => {
        analyticsData.conversionFunnel[stage] = leads.filter(l => l.stage === stage).length;
    });
    
    // Lead Sources
    analyticsData.leadSources = {};
    leads.forEach(lead => {
        const source = lead.source || 'Unknown';
        analyticsData.leadSources[source] = (analyticsData.leadSources[source] || 0) + 1;
    });
    
    // Sales Velocity (average days to close)
    const closedLeads = leads.filter(l => l.stage === 'Closed');
    if (closedLeads.length > 0) {
        const totalDays = closedLeads.reduce((sum, lead) => {
            const created = lead.createdAt?.toDate() || new Date();
            const lastContact = lead.lastContact?.toDate() || new Date();
            const days = Math.floor((lastContact - created) / (1000 * 60 * 60 * 24));
            return sum + days;
        }, 0);
        analyticsData.salesVelocity = Math.round(totalDays / closedLeads.length);
    } else {
        analyticsData.salesVelocity = 0;
    }
    
    // Revenue Forecast
    const activeLeads = leads.filter(l => l.stage !== 'Closed' || l.wonLost === 'won');
    const totalPipeline = activeLeads.reduce((sum, l) => sum + (l.estimatedValue || 0), 0);
    
    // Simple forecast: pipeline value * average conversion rate
    const conversionRate = closedLeads.length > 0 ? 
        closedLeads.filter(l => l.wonLost === 'won').length / closedLeads.length : 
        0.25; // Default 25% if no data
    
    analyticsData.revenueForecast = Math.round(totalPipeline * conversionRate);
}

// Render Conversion Funnel
function renderConversionFunnel() {
    const container = document.getElementById('conversion-funnel');
    if (!container) return;
    
    const funnel = analyticsData.conversionFunnel;
    const maxCount = Math.max(...Object.values(funnel), 1);
    
    container.innerHTML = Object.entries(funnel).map(([stage, count]) => {
        const percentage = (count / maxCount * 100).toFixed(0);
        const dropoff = stage !== 'New Lead' ? calculateDropoff(stage, funnel) : null;
        
        return `
            <div class="chart-bar">
                <div class="chart-label">${stage}</div>
                <div style="flex: 1; display: flex; flex-direction: column; gap: 0.25rem;">
                    <div class="chart-bar-fill" style="width: ${percentage}%; min-width: 80px;">
                        <span>${count} lead${count !== 1 ? 's' : ''}</span>
                    </div>
                    ${dropoff !== null ? `
                        <div style="color: var(--text-tertiary); font-size: 0.85rem; padding-left: 4px;">
                            ${dropoff}% from previous
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Calculate dropoff percentage between stages
function calculateDropoff(currentStage, funnel) {
    const stages = Object.keys(funnel);
    const currentIndex = stages.indexOf(currentStage);
    
    if (currentIndex <= 0) return null;
    
    const previousStage = stages[currentIndex - 1];
    const previousCount = funnel[previousStage];
    const currentCount = funnel[currentStage];
    
    if (previousCount === 0) return 0;
    
    const dropoffRate = ((previousCount - currentCount) / previousCount * 100).toFixed(1);
    return dropoffRate;
}

// Render Lead Sources
function renderLeadSources() {
    const container = document.getElementById('lead-sources-chart');
    if (!container) return;
    
    const sources = analyticsData.leadSources;
    const totalLeads = Object.values(sources).reduce((sum, count) => sum + count, 0);
    
    if (totalLeads === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">No data available</p>';
        return;
    }
    
    const sortedSources = Object.entries(sources).sort((a, b) => b[1] - a[1]);
    
    container.innerHTML = sortedSources.map(([source, count]) => {
        const percentage = (count / totalLeads * 100).toFixed(1);
        
        return `
            <div class="chart-bar">
                <div class="chart-label">${source}</div>
                <div style="flex: 1;">
                    <div class="chart-bar-fill" style="width: ${percentage}%; min-width: 60px;">
                        ${count} (${percentage}%)
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Render Sales Velocity
function renderSalesVelocity() {
    const container = document.getElementById('sales-velocity');
    if (!container) return;
    
    const velocity = analyticsData.salesVelocity;
    const leads = analyticsData.leads;
    
    // Calculate stage-specific velocities
    const stageVelocities = {};
    appConfig.stages.forEach(stage => {
        const stageLeads = leads.filter(l => l.stage === stage);
        if (stageLeads.length > 0) {
            const avgDays = stageLeads.reduce((sum, lead) => {
                const created = lead.createdAt?.toDate() || new Date();
                const now = new Date();
                const days = Math.floor((now - created) / (1000 * 60 * 60 * 24));
                return sum + days;
            }, 0) / stageLeads.length;
            stageVelocities[stage] = Math.round(avgDays);
        }
    });
    
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem 0;">
            <div style="font-size: 3rem; color: var(--gold); font-weight: 700;">
                ${velocity} days
            </div>
            <p style="color: var(--text-secondary); margin-top: 0.5rem;">
                Average time to close
            </p>
        </div>
        <div style="margin-top: 2rem;">
            <h4 style="margin-bottom: 1rem;">Average Days in Stage</h4>
            ${Object.entries(stageVelocities).map(([stage, days]) => `
                <div class="chart-bar">
                    <div class="chart-label">${stage}</div>
                    <div style="flex: 1;">
                        <div class="chart-bar-fill" style="width: ${(days / 90 * 100)}%; min-width: 60px;">
                            ${days} days
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Render Revenue Forecast
function renderRevenueForecast() {
    const container = document.getElementById('revenue-forecast');
    if (!container) return;
    
    const forecast = analyticsData.revenueForecast;
    const leads = analyticsData.leads;
    
    // Calculate monthly breakdown
    const now = new Date();
    const monthlyData = [];
    
    for (let i = 0; i < 3; i++) {
        const month = new Date(now.getFullYear(), now.getMonth() + i, 1);
        const monthName = month.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        
        // Simple forecast: distribute revenue across next 3 months
        const monthForecast = Math.round(forecast / 3);
        monthlyData.push({ month: monthName, value: monthForecast });
    }
    
    // Win rate
    const closedLeads = leads.filter(l => l.stage === 'Closed');
    const wonLeads = closedLeads.filter(l => l.wonLost === 'won');
    const winRate = closedLeads.length > 0 ? 
        (wonLeads.length / closedLeads.length * 100).toFixed(1) : 
        0;
    
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem 0;">
            <div style="font-size: 3rem; color: var(--gold); font-weight: 700;">
                ${formatCurrency(forecast)}
            </div>
            <p style="color: var(--text-secondary); margin-top: 0.5rem;">
                Projected revenue (next 90 days)
            </p>
            <p style="color: var(--text-tertiary); margin-top: 0.5rem; font-size: 0.9rem;">
                Win Rate: ${winRate}% • ${wonLeads.length} won / ${closedLeads.length} closed
            </p>
        </div>
        <div style="margin-top: 2rem;">
            <h4 style="margin-bottom: 1rem;">Monthly Forecast</h4>
            ${monthlyData.map(({ month, value }) => {
                const maxValue = Math.max(...monthlyData.map(d => d.value));
                const percentage = maxValue > 0 ? (value / maxValue * 100).toFixed(0) : 0;
                
                return `
                    <div class="chart-bar">
                        <div class="chart-label">${month}</div>
                        <div style="flex: 1;">
                            <div class="chart-bar-fill" style="width: ${percentage}%; min-width: 80px;">
                                ${formatCurrency(value)}
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// Export for global access
if (typeof window !== 'undefined') {
    window.loadAnalytics = loadAnalytics;
}
