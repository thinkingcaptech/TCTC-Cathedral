// Pipeline Kanban Board Module

let pipelineLeads = [];

// Load Pipeline View
async function loadPipeline() {
    try {
        const leads = await getLeads();
        pipelineLeads = leads;
        renderPipeline(leads);
    } catch (error) {
        console.error('Load pipeline error:', error);
        showToast('Failed to load pipeline', 'error');
    }
}

// Render Pipeline
function renderPipeline(leads) {
    // Calculate total pipeline value
    const totalValue = leads.reduce((sum, lead) => 
        sum + (lead.estimatedValue || 0), 0
    );
    document.getElementById('pipeline-total-value').textContent = formatCurrency(totalValue);
    
    // Clear all columns
    appConfig.stages.forEach(stage => {
        const column = document.querySelector(`.column-content[data-stage="${stage}"]`);
        if (column) {
            column.innerHTML = '';
        }
    });
    
    // Group leads by stage
    const stageGroups = {};
    appConfig.stages.forEach(stage => {
        stageGroups[stage] = leads.filter(lead => lead.stage === stage);
    });
    
    // Render each stage
    Object.entries(stageGroups).forEach(([stage, stageLeads]) => {
        const column = document.querySelector(`.column-content[data-stage="${stage}"]`);
        const countBadge = document.querySelector(`.kanban-column[data-stage="${stage}"] .column-count`);
        
        if (column && countBadge) {
            countBadge.textContent = stageLeads.length;
            
            if (stageLeads.length === 0) {
                column.innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: var(--text-tertiary);">
                        <p>No leads</p>
                    </div>
                `;
            } else {
                column.innerHTML = stageLeads.map(lead => createKanbanCard(lead)).join('');
            }
        }
    });
    
    // Initialize drag and drop
    initializeDragAndDrop();
}

// Create Kanban Card
function createKanbanCard(lead) {
    const score = lead.score || 0;
    const scoreClass = getScoreClass(score);
    
    return `
        <div class="kanban-card" 
             draggable="true" 
             data-lead-id="${lead.id}"
             onclick="openLeadDetail('${lead.id}')">
            <h4>${lead.name}</h4>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 0.25rem 0;">
                ${lead.company || 'Individual'}
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
                <span class="score ${scoreClass}" style="font-size: 0.85rem;">
                    ${score}
                </span>
                <span style="color: var(--gold); font-weight: 700;">
                    ${formatCurrency(lead.estimatedValue || 0)}
                </span>
            </div>
            <p style="color: var(--text-tertiary); font-size: 0.85rem; margin-top: 0.5rem;">
                ${formatRelativeTime(lead.lastContact)}
            </p>
        </div>
    `;
}

// Initialize Drag and Drop
function initializeDragAndDrop() {
    const cards = document.querySelectorAll('.kanban-card');
    const columns = document.querySelectorAll('.column-content');
    
    // Card drag events
    cards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    });
    
    // Column drop events
    columns.forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('dragenter', handleDragEnter);
        column.addEventListener('dragleave', handleDragLeave);
        column.addEventListener('drop', handleDrop);
    });
}

let draggedCard = null;

function handleDragStart(e) {
    draggedCard = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    
    // Remove drag-over class from all columns
    document.querySelectorAll('.column-content').forEach(col => {
        col.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

async function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    this.classList.remove('drag-over');
    
    if (draggedCard) {
        const leadId = draggedCard.dataset.leadId;
        const newStage = this.dataset.stage;
        const oldStage = draggedCard.closest('.column-content').dataset.stage;
        
        if (newStage !== oldStage) {
            try {
                // Update lead stage
                await updateLead(leadId, { stage: newStage });
                
                // Create activity
                await createActivity(leadId, 'note', `Stage changed from "${oldStage}" to "${newStage}"`);
                
                // Reload pipeline
                await loadPipeline();
                
                showToast(`Lead moved to ${newStage}`, 'success');
            } catch (error) {
                console.error('Move lead error:', error);
                showToast('Failed to move lead', 'error');
            }
        }
    }
    
    return false;
}

// Win/Loss Tracking
async function markLeadClosed(leadId, wonLost) {
    try {
        await updateLead(leadId, { 
            stage: 'Closed',
            wonLost: wonLost
        });
        
        await createActivity(leadId, 'note', 
            wonLost === 'won' ? 'Deal Won! 🎉' : 'Deal Lost'
        );
        
        showToast(wonLost === 'won' ? 'Deal marked as Won!' : 'Deal marked as Lost', 'success');
        await loadPipeline();
    } catch (error) {
        console.error('Mark closed error:', error);
        showToast('Failed to update lead', 'error');
    }
}

// Export for global access
if (typeof window !== 'undefined') {
    window.loadPipeline = loadPipeline;
    window.markLeadClosed = markLeadClosed;
}
