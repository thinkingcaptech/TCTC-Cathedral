// UI Management & Utilities

// Toast Notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Modal Management
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Close buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-close')) {
        const modal = e.target.closest('.modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }
});

// Theme Toggle
let currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

document.getElementById('theme-toggle')?.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    // Update icon
    const icon = document.getElementById('theme-toggle');
    icon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
});

// Update theme icon on load
const themeIcon = document.getElementById('theme-toggle');
if (themeIcon) {
    themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}

// View Navigation
const navLinks = document.querySelectorAll('.nav-link');
const views = document.querySelectorAll('.view');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const viewName = link.dataset.view;
        
        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Show active view
        views.forEach(v => v.classList.remove('active'));
        const activeView = document.getElementById(`view-${viewName}`);
        if (activeView) {
            activeView.classList.add('active');
            
            // Load view-specific data
            switch(viewName) {
                case 'dashboard':
                    loadDashboard();
                    break;
                case 'pipeline':
                    loadPipeline();
                    break;
                case 'analytics':
                    loadAnalytics();
                    break;
                case 'settings':
                    loadSettings();
                    break;
            }
        }
    });
});

// Tab Management
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-btn')) {
        const tabName = e.target.dataset.tab;
        const container = e.target.closest('.detail-main');
        
        // Update active tab button
        container.querySelectorAll('.tab-btn').forEach(btn => 
            btn.classList.remove('active')
        );
        e.target.classList.add('active');
        
        // Show active tab content
        container.querySelectorAll('.tab-content').forEach(content => 
            content.classList.remove('active')
        );
        const activeContent = container.querySelector(`#tab-${tabName}`);
        if (activeContent) {
            activeContent.classList.add('active');
        }
    }
});

// Format Date
function formatDate(timestamp) {
    if (!timestamp) return 'N/A';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Format Relative Time
function formatRelativeTime(timestamp) {
    if (!timestamp) return 'Never';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return formatDate(timestamp);
}

// Format Currency
function formatCurrency(amount) {
    if (!amount) return '$0';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(amount);
}

// Get Score Class
function getScoreClass(score) {
    if (score >= 70) return 'score-high';
    if (score >= 40) return 'score-medium';
    return 'score-low';
}

// Get Score Label
function getScoreLabel(score) {
    if (score >= 70) return 'High';
    if (score >= 40) return 'Medium';
    return 'Low';
}

// Search and Filter
let currentFilters = {
    search: '',
    stage: '',
    score: ''
};

function applyFilters(leads) {
    let filtered = [...leads];
    
    // Search filter
    if (currentFilters.search) {
        const search = currentFilters.search.toLowerCase();
        filtered = filtered.filter(lead => 
            lead.name.toLowerCase().includes(search) ||
            (lead.email && lead.email.toLowerCase().includes(search)) ||
            (lead.company && lead.company.toLowerCase().includes(search)) ||
            (lead.phone && lead.phone.includes(search))
        );
    }
    
    // Stage filter
    if (currentFilters.stage) {
        filtered = filtered.filter(lead => lead.stage === currentFilters.stage);
    }
    
    // Score filter
    if (currentFilters.score) {
        filtered = filtered.filter(lead => {
            const score = lead.score || 0;
            switch(currentFilters.score) {
                case 'high': return score >= 70;
                case 'medium': return score >= 40 && score < 70;
                case 'low': return score < 40;
                default: return true;
            }
        });
    }
    
    return filtered;
}

// Search input handler
document.getElementById('search-leads')?.addEventListener('input', (e) => {
    currentFilters.search = e.target.value;
    loadLeads();
});

// Filter handlers
document.getElementById('filter-stage')?.addEventListener('change', (e) => {
    currentFilters.stage = e.target.value;
    loadLeads();
});

document.getElementById('filter-score')?.addEventListener('change', (e) => {
    currentFilters.score = e.target.value;
    loadLeads();
});

// View Toggle (Grid/List)
let currentView = 'grid';

document.getElementById('view-grid')?.addEventListener('click', () => {
    currentView = 'grid';
    document.getElementById('view-grid').classList.add('active');
    document.getElementById('view-list').classList.remove('active');
    updateLeadsView();
});

document.getElementById('view-list')?.addEventListener('click', () => {
    currentView = 'list';
    document.getElementById('view-list').classList.add('active');
    document.getElementById('view-grid').classList.remove('active');
    updateLeadsView();
});

function updateLeadsView() {
    const container = document.getElementById('leads-container');
    if (!container) return;
    
    if (currentView === 'grid') {
        container.className = 'leads-grid';
    } else {
        container.className = 'leads-list';
    }
}

// Activity Type Icons
function getActivityIcon(type) {
    const icons = {
        email: '✉️',
        call: '📞',
        meeting: '🤝',
        note: '📝'
    };
    return icons[type] || '📌';
}

// CSV Parser - handles quoted fields properly
function parseCSV(text) {
    const lines = text.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
        console.error('CSV has less than 2 lines');
        return [];
    }
    
    // Parse CSV line properly handling quoted fields
    function parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim().replace(/^"|"$/g, ''));
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim().replace(/^"|"$/g, ''));
        
        return result;
    }
    
    const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase());
    console.log('CSV Headers:', headers);
    
    const leads = [];
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        const lead = {};
        
        headers.forEach((header, index) => {
            if (values[index]) {
                lead[header] = values[index];
            }
        });
        
        // Check for required fields
        if (lead.name && lead.email) {
            leads.push({
                name: lead.name,
                email: lead.email,
                phone: lead.phone || '',
                company: lead.company || '',
                source: lead.source || 'CSV Import',
                stage: lead.stage || 'New Lead',
                notes: lead.notes || 'Imported from CSV',
                tags: lead.tags ? lead.tags.split('|').filter(t => t) : [],
                estimatedValue: parseFloat(lead.value || lead.estimatedvalue || lead.estimatedValue || 0)
            });
        } else {
            console.warn('Skipping row (missing name or email):', lead);
        }
    }
    
    console.log('Successfully parsed', leads.length, 'leads');
    return leads;
}

// Export leads to CSV
function exportLeadsToCSV(leads) {
    // CSV Headers
    const headers = [
        'Name',
        'Email',
        'Phone',
        'Company',
        'Source',
        'Stage',
        'AI Score',
        'Estimated Value',
        'Activity Count',
        'Last Activity',
        'Created Date',
        'Last Contact',
        'Tags',
        'Notes'
    ];
    
    // Helper to escape CSV values
    const escapeCSV = (value) => {
        if (value === null || value === undefined) return '';
        const str = String(value);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
    };
    
    // Build CSV rows
    const rows = leads.map(lead => [
        escapeCSV(lead.name),
        escapeCSV(lead.email),
        escapeCSV(lead.phone || ''),
        escapeCSV(lead.company || ''),
        escapeCSV(lead.source),
        escapeCSV(lead.stage),
        escapeCSV(lead.score || 0),
        escapeCSV(lead.estimatedValue || 0),
        escapeCSV(lead.activityCount || 0),
        escapeCSV(lead.lastActivityDate || ''),
        escapeCSV(lead.createdAt?.toDate?.()?.toISOString() || ''),
        escapeCSV(lead.lastContact?.toDate?.()?.toISOString() || ''),
        escapeCSV(lead.tags?.join('|') || ''),
        escapeCSV(lead.notes || '')
    ].join(','));
    
    // Combine headers and rows
    return [headers.join(','), ...rows].join('\n');
}

// Download CSV file
function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

// Loading Indicator
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="loading">Loading...</div>';
    }
}

// Error Display
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `<div class="error-message">${message}</div>`;
    }
}

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Copy to Clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('Copied to clipboard!', 'success');
    } catch (error) {
        console.error('Copy failed:', error);
        showToast('Failed to copy', 'error');
    }
}

// Confirm Dialog
function confirm(message) {
    return window.confirm(message);
}

// Initialize tooltips and other UI enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all cards
    document.querySelectorAll('.glass-panel').forEach(card => {
        observer.observe(card);
    });
});
