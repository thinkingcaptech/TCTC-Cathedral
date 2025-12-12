// Main Application Controller

// Authentication Event Handlers
document.getElementById('show-signup')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
});

document.getElementById('show-login')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

// Login Form
document.getElementById('login-btn')?.addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (email && password) {
        await login(email, password);
    } else {
        showToast('Please enter email and password', 'error');
    }
});

// Email Link Login (Passwordless)
document.getElementById('email-link-login-btn')?.addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    
    if (email) {
        await sendSignInLink(email);
    } else {
        showToast('Please enter your email', 'error');
    }
});

// Signup Form
document.getElementById('signup-btn')?.addEventListener('click', async () => {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    if (name && email && password) {
        if (password.length < 6) {
            showToast('Password must be at least 6 characters', 'error');
            return;
        }
        await signUp(email, password, name);
    } else {
        showToast('Please fill in all fields', 'error');
    }
});

// Email Link Signup (Passwordless)
document.getElementById('email-link-signup-btn')?.addEventListener('click', async () => {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    
    if (name && email) {
        await sendSignInLink(email, name);
    } else {
        showToast('Please enter your name and email', 'error');
    }
});

// Logout Button
document.getElementById('logout-btn')?.addEventListener('click', async () => {
    await logout();
});

// Settings Functions
async function loadSettings() {
    try {
        await loadTemplates();
    } catch (error) {
        console.error('Load settings error:', error);
    }
}

// Email Templates
async function loadTemplates() {
    try {
        const templates = await getTemplates();
        const container = document.getElementById('templates-list');
        
        if (!container) return;
        
        if (templates.length === 0) {
            container.innerHTML = `
                <p style="color: var(--text-secondary); text-align: center; padding: 2rem;">
                    No templates yet. Create your first email template!
                </p>
            `;
            return;
        }
        
        container.innerHTML = templates.map(template => `
            <div class="template-item">
                <div>
                    <h4 style="margin-bottom: 0.25rem;">${template.name}</h4>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 0;">
                        ${template.subject}
                    </p>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn btn-secondary" onclick="viewTemplate('${template.id}')">View</button>
                    <button class="btn btn-danger" onclick="removeTemplate('${template.id}')">Delete</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Load templates error:', error);
    }
}

// Add Template Button
document.getElementById('add-template-btn')?.addEventListener('click', () => {
    document.getElementById('template-form').reset();
    openModal('template-modal');
});

// Template Form Submit
document.getElementById('template-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const template = {
        name: document.getElementById('template-name').value,
        subject: document.getElementById('template-subject').value,
        body: document.getElementById('template-body').value
    };
    
    try {
        await createTemplate(template);
        closeModal('template-modal');
        await loadTemplates();
    } catch (error) {
        console.error('Save template error:', error);
    }
});

// View Template
async function viewTemplate(templateId) {
    try {
        const templates = await getTemplates();
        const template = templates.find(t => t.id === templateId);
        
        if (template) {
            alert(`Template: ${template.name}\n\nSubject: ${template.subject}\n\n${template.body}`);
        }
    } catch (error) {
        console.error('View template error:', error);
    }
}

// Remove Template
async function removeTemplate(templateId) {
    if (!confirm('Are you sure you want to delete this template?')) {
        return;
    }
    
    try {
        await deleteTemplate(templateId);
        await loadTemplates();
    } catch (error) {
        console.error('Remove template error:', error);
    }
}

// CSV Import
document.getElementById('import-csv-btn')?.addEventListener('click', (e) => {
    console.log('Import CSV button clicked');
    e.preventDefault();
    const fileInput = document.getElementById('csv-upload');
    if (fileInput) {
        fileInput.click();
        console.log('File input triggered');
    } else {
        console.error('CSV upload input not found');
    }
});

document.getElementById('csv-upload')?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
        console.log('No file selected');
        return;
    }
    
    console.log('CSV file selected:', file.name, file.size, 'bytes', file.type);
    
    if (!file.name.endsWith('.csv')) {
        showToast('Please select a CSV file', 'error');
        e.target.value = '';
        return;
    }
    
    try {
        const text = await file.text();
        console.log('CSV content loaded, parsing...');
        
        const leads = parseCSV(text);
        console.log('Parsed leads:', leads.length, leads);
        
        if (leads.length === 0) {
            showToast('No valid leads found in CSV. Ensure it has name and email columns.', 'error');
            e.target.value = '';
            return;
        }
        
        if (!confirm(`Import ${leads.length} leads from CSV?`)) {
            e.target.value = '';
            return;
        }
        
        showToast(`Importing ${leads.length} leads...`, 'info');
        
        // Import leads one by one
        let imported = 0;
        for (const leadData of leads) {
            try {
                const leadId = await createLead(leadData);
                
                // Auto-score with AI
                try {
                    const score = await geminiAI.scoreLead(leadData);
                    await updateLead(leadId, { score });
                } catch (error) {
                    console.error('Auto-scoring failed:', error);
                    // Continue without score - not critical
                }
                
                imported++;
            } catch (error) {
                console.error('Failed to import lead:', leadData.name, error);
            }
        }
        
        showToast(`Successfully imported ${imported} leads!`, 'success');
        
        // Refresh dashboard
        await loadDashboard();
        
        // Clear file input
        e.target.value = '';
    } catch (error) {
        console.error('CSV import error:', error);
        showToast('Failed to import CSV', 'error');
    }
});

// CSV Export
document.getElementById('export-csv-btn')?.addEventListener('click', async () => {
    try {
        showToast('Preparing export...', 'info');
        
        const leads = await getLeads();
        
        if (leads.length === 0) {
            showToast('No leads to export', 'error');
            return;
        }
        
        // Get activity counts for each lead
        const leadsWithActivities = await Promise.all(leads.map(async (lead) => {
            try {
                const activities = await getActivities(lead.id);
                return {
                    ...lead,
                    activityCount: activities.length,
                    lastActivityDate: activities[0]?.createdAt?.toDate?.()?.toISOString() || 'N/A'
                };
            } catch (error) {
                return {
                    ...lead,
                    activityCount: 0,
                    lastActivityDate: 'N/A'
                };
            }
        }));
        
        const csv = exportLeadsToCSV(leadsWithActivities);
        downloadCSV(csv, `leads-export-${new Date().toISOString().split('T')[0]}.csv`);
        
        showToast(`Exported ${leads.length} leads successfully!`, 'success');
    } catch (error) {
        console.error('Export error:', error);
        showToast('Failed to export leads', 'error');
    }
});

// API Key Management
function checkApiKeyStatus() {
    const savedKey = localStorage.getItem('geminiApiKey');
    const statusDiv = document.getElementById('api-key-status');
    
    if (savedKey && savedKey.length > 10) {
        // Mask the key for security
        const maskedKey = savedKey.substring(0, 8) + '...' + savedKey.substring(savedKey.length - 4);
        if (statusDiv) {
            statusDiv.innerHTML = `
                <div style="background: var(--success); color: white; padding: 0.75rem; border-radius: 8px; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.2rem;">✓</span>
                    <div>
                        <strong>API Key Configured</strong><br>
                        <small style="opacity: 0.9;">Key: ${maskedKey}</small>
                    </div>
                </div>
            `;
        }
        return true;
    } else {
        if (statusDiv) {
            statusDiv.innerHTML = `
                <div style="background: var(--warning); color: white; padding: 0.75rem; border-radius: 8px; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.2rem;">⚠️</span>
                    <div>
                        <strong>API Key Not Configured</strong><br>
                        <small style="opacity: 0.9;">AI features disabled until you add your key</small>
                    </div>
                </div>
            `;
        }
        return false;
    }
}

// Validate API Key Format
function validateApiKeyFormat(apiKey) {
    if (!apiKey || apiKey.trim().length === 0) {
        return { valid: false, message: 'API key cannot be empty' };
    }
    
    if (apiKey.length < 20) {
        return { valid: false, message: 'API key appears too short. Please check and try again.' };
    }
    
    if (!apiKey.startsWith('AIza')) {
        return { valid: false, message: 'Google Gemini API keys typically start with "AIza". Please verify your key.' };
    }
    
    return { valid: true, message: 'API key format looks good!' };
}

// Test API Key Connection
async function testApiKey(apiKey) {
    try {
        showToast('Testing API connection...', 'info');
        
        // Validate key format first
        if (!apiKey || apiKey.length < 20) {
            return { success: false, message: 'Invalid API key format. Key should be at least 20 characters.' };
        }
        
        // Temporarily set the key
        const originalKey = geminiAI.apiKey;
        geminiAI.apiKey = apiKey;
        
        // Make a simple test call
        const response = await geminiAI.callGemini('Respond with only the word "OK" if you receive this.');
        
        // Restore original key
        geminiAI.apiKey = originalKey;
        
        console.log('API test response:', response);
        
        if (response && response.length > 0) {
            return { success: true, message: '✅ Connection successful! API key is working.' };
        } else {
            return { success: false, message: 'Unexpected empty response from API' };
        }
    } catch (error) {
        console.error('API test error:', error);
        // Return the actual error message for debugging
        const errorMsg = error.message || 'Unknown error';
        return { success: false, message: `❌ ${errorMsg}` };
    }
}

// Save Gemini API Key
document.getElementById('save-api-key')?.addEventListener('click', async () => {
    const apiKey = document.getElementById('gemini-api-key').value.trim();
    
    if (!apiKey) {
        showToast('Please enter an API key', 'error');
        return;
    }
    
    // Validate format
    const validation = validateApiKeyFormat(apiKey);
    if (!validation.valid) {
        showToast(validation.message, 'error');
        return;
    }
    
    // Save the key
    geminiAI.setApiKey(apiKey);
    showToast('Gemini API key saved successfully!', 'success');
    
    // Update status display
    checkApiKeyStatus();
    
    // Clear input for security
    document.getElementById('gemini-api-key').value = '';
});

// Test API Key Connection
document.getElementById('test-api-key')?.addEventListener('click', async () => {
    const apiKey = document.getElementById('gemini-api-key').value.trim();
    
    if (!apiKey) {
        // Test saved key
        const savedKey = localStorage.getItem('geminiApiKey');
        if (!savedKey || savedKey === 'YOUR_GEMINI_API_KEY') {
            showToast('Please enter an API key first', 'error');
            return;
        }
        
        const result = await testApiKey(savedKey);
        showToast(result.message, result.success ? 'success' : 'error');
    } else {
        // Test entered key
        const validation = validateApiKeyFormat(apiKey);
        if (!validation.valid) {
            showToast(validation.message, 'error');
            return;
        }
        
        const result = await testApiKey(apiKey);
        showToast(result.message, result.success ? 'success' : 'error');
    }
});

// Setup Modal Handlers
document.getElementById('save-setup-key-btn')?.addEventListener('click', async () => {
    const apiKey = document.getElementById('setup-api-key').value.trim();
    
    if (!apiKey) {
        showToast('Please enter an API key', 'error');
        return;
    }
    
    // Validate format
    const validation = validateApiKeyFormat(apiKey);
    if (!validation.valid) {
        showToast(validation.message, 'error');
        return;
    }
    
    // Test and save
    const testResult = await testApiKey(apiKey);
    if (testResult.success) {
        geminiAI.setApiKey(apiKey);
        showToast('API key configured successfully! 🎉', 'success');
        closeModal('api-key-setup-modal');
        checkApiKeyStatus();
        
        // Mark setup as complete
        localStorage.setItem('apiKeySetupComplete', 'true');
    } else {
        showToast(testResult.message, 'error');
    }
});

document.getElementById('skip-setup-btn')?.addEventListener('click', () => {
    closeModal('api-key-setup-modal');
    localStorage.setItem('apiKeySetupComplete', 'skipped');
    showToast('You can configure your API key anytime in Settings', 'info');
});

// Check if API key is configured on Settings view
document.querySelector('[data-view="settings"]')?.addEventListener('click', () => {
    setTimeout(() => checkApiKeyStatus(), 100);
});

// Show setup modal on first load if no key
function checkApiKeyOnLoad() {
    const savedKey = localStorage.getItem('geminiApiKey');
    const setupComplete = localStorage.getItem('apiKeySetupComplete');
    
    // Show setup modal if no key and hasn't been skipped
    if ((!savedKey || savedKey === 'YOUR_GEMINI_API_KEY') && setupComplete !== 'skipped' && setupComplete !== 'true') {
        setTimeout(() => {
            openModal('api-key-setup-modal');
        }, 1000);
    }
}

// Intercept AI feature calls and prompt for key if missing
function requireApiKey(action) {
    const savedKey = localStorage.getItem('geminiApiKey');
    
    if (!savedKey || savedKey === 'YOUR_GEMINI_API_KEY' || savedKey.length < 10) {
        showToast('Please configure your Gemini API key in Settings to use AI features', 'error');
        
        // Highlight settings tab
        setTimeout(() => {
            const settingsLink = document.querySelector('[data-view="settings"]');
            if (settingsLink) {
                settingsLink.style.animation = 'pulse 1s ease-in-out 3';
            }
        }, 500);
        
        return false;
    }
    
    return true;
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K: Quick Add Lead
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openAddLeadModal();
    }
    
    // Escape: Close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

// Real-time Lead Updates (Optional)
let unsubscribeLeads = null;

function enableRealTimeUpdates() {
    if (unsubscribeLeads) {
        unsubscribeLeads();
    }
    
    unsubscribeLeads = subscribeToLeads((leads) => {
        allLeads = leads;
        renderLeads(leads);
        updateDashboardStats(leads);
    });
}

// Cleanup on logout
auth?.onAuthStateChanged(user => {
    if (!user && unsubscribeLeads) {
        unsubscribeLeads();
        unsubscribeLeads = null;
    }
});

// Service Worker Registration (for PWA support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Export functions for global access
if (typeof window !== 'undefined') {
    window.loadSettings = loadSettings;
    window.viewTemplate = viewTemplate;
    window.removeTemplate = removeTemplate;
    window.requireApiKey = requireApiKey;
    window.checkApiKeyStatus = checkApiKeyStatus;
}

// Initialize app
console.log('Sales Funnel CRM initialized');
console.log('Version:', appConfig.version);

// Check API key on app load
auth?.onAuthStateChanged(user => {
    if (user) {
        // Check if API key setup is needed after user logs in
        setTimeout(() => checkApiKeyOnLoad(), 1500);
    }
});
