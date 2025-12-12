const STEPS = ['Management & Operations', 'Marketing & Lead Generation', 'Sales & Conversion', 'Finances & Scalability'];

const toast = (message, type = 'info') => {
    const toastEl = document.getElementById('formToast');
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.dataset.type = type;
    toastEl.classList.add('visible');
    setTimeout(() => toastEl.classList.remove('visible'), 4000);
};

const isFieldValid = (field) => {
    if (!field.required) return true;
    if (field.tagName === 'SELECT' || field.tagName === 'TEXTAREA') {
        return field.value.trim().length > 0;
    }
    return Boolean(field.value);
};

const validateStep = (stepEl) => {
    const fields = Array.from(stepEl.querySelectorAll('select[required], textarea[required], input[required]'));
    let isValid = true;
    fields.forEach((field) => {
        if (!isFieldValid(field)) {
            field.classList.add('invalid');
            isValid = false;
        } else {
            field.classList.remove('invalid');
        }
    });
    if (!isValid) {
        toast('Please complete all required questions before continuing.', 'error');
    }
    return isValid;
};

const collectAnswers = (formData) => {
    const payload = { management: {}, marketing: {}, sales: {}, finances: {}, metadata: {} };
    formData.forEach((value, key) => {
        const [pillar, ...rest] = key.split('_');
        if (payload[pillar]) {
            payload[pillar][rest.join('_') || 'value'] = value;
        } else {
            payload.metadata[key] = value;
        }
    });
    return payload;
};

const updateProgressUI = (currentStep) => {
    const progressFill = document.getElementById('progressFill');
    const stepsLabel = document.querySelectorAll('#progressSteps li');
    const percentage = ((currentStep + 1) / STEPS.length) * 100;
    if (progressFill) progressFill.style.width = `${percentage}%`;
    stepsLabel.forEach((label, index) => {
        label.classList.toggle('active', index <= currentStep);
    });
};

// API Key Modal Management
const showApiKeyModal = () => {
    const modal = document.getElementById('apiKeyModal');
    if (modal) {
        modal.classList.add('show');
        document.getElementById('apiKeyInput')?.focus();
    }
};

const hideApiKeyModal = () => {
    const modal = document.getElementById('apiKeyModal');
    if (modal) {
        modal.classList.remove('show');
    }
};

const initApiKeyModal = () => {
    const modal = document.getElementById('apiKeyModal');
    const apiKeyForm = document.getElementById('apiKeyForm');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const apiKeyError = document.getElementById('apiKeyError');
    const testBtn = document.getElementById('testApiKey');
    const toggleVisBtn = document.getElementById('toggleKeyVisibility');
    const rememberCheckbox = document.getElementById('rememberKey');

    if (!modal || !apiKeyForm) return;

    // Toggle password visibility
    if (toggleVisBtn && apiKeyInput) {
        toggleVisBtn.addEventListener('click', () => {
            const isPassword = apiKeyInput.type === 'password';
            apiKeyInput.type = isPassword ? 'text' : 'password';
            toggleVisBtn.textContent = isPassword ? '🙈' : '👁️';
        });
    }

    // Test API key
    if (testBtn) {
        testBtn.addEventListener('click', async () => {
            const apiKey = apiKeyInput?.value?.trim();
            if (!apiKey) {
                apiKeyError.textContent = 'Please enter an API key';
                return;
            }

            testBtn.disabled = true;
            testBtn.textContent = 'Testing...';
            apiKeyError.textContent = '';

            const result = await ApiKeyManager.test(apiKey);
            
            if (result.valid) {
                apiKeyError.textContent = '✓ API key is valid!';
                apiKeyError.style.color = 'var(--gold-500)';
            } else {
                apiKeyError.textContent = `✗ ${result.error}`;
                apiKeyError.style.color = 'var(--maroon-500)';
            }

            testBtn.disabled = false;
            testBtn.textContent = 'Test Key';
        });
    }

    // Save API key
    apiKeyForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const apiKey = apiKeyInput?.value?.trim();
        if (!apiKey) {
            apiKeyError.textContent = 'Please enter an API key';
            return;
        }

        const validation = ApiKeyManager.validate(apiKey);
        if (!validation.valid) {
            apiKeyError.textContent = validation.error;
            return;
        }

        const remember = rememberCheckbox?.checked ?? true;
        
        if (remember) {
            ApiKeyManager.save(apiKey);
            toast('API key saved successfully', 'success');
        } else {
            // Store in session only
            sessionStorage.setItem('temp_gemini_key', apiKey);
            toast('API key saved for this session', 'success');
        }

        hideApiKeyModal();
        apiKeyError.textContent = '';
    });

    // Check if key already exists on load
    if (ApiKeyManager.exists() || sessionStorage.getItem('temp_gemini_key')) {
        hideApiKeyModal();
    } else {
        showApiKeyModal();
    }
};

const getApiKey = () => {
    return ApiKeyManager.get() || sessionStorage.getItem('temp_gemini_key');
};

// Store results locally and navigate to results page
const saveAndNavigateToResults = (reportData) => {
    const reportId = 'report_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const reportWithId = { ...reportData, reportId, createdAt: new Date().toISOString() };
    
    // Store in localStorage
    localStorage.setItem(`diagnostic_${reportId}`, JSON.stringify(reportWithId));
    
    // Store report ID in session for easy retrieval
    sessionStorage.setItem('latest_report_id', reportId);
    
    // Navigate to results
    window.location.href = `results.html?reportId=${encodeURIComponent(reportId)}`;
};

const initMultiStepForm = () => {
    const form = document.getElementById('quizForm');
    if (!form) return;

    const steps = Array.from(form.querySelectorAll('.form-step'));
    let currentStep = 0;

    const showStep = (index) => {
        steps.forEach((step, idx) => {
            step.classList.toggle('active-step', idx === index);
        });
        updateProgressUI(index);
    };

    form.addEventListener('click', (event) => {
        const target = event.target;
        if (target.matches('.next-btn')) {
            if (validateStep(steps[currentStep]) && currentStep < steps.length - 1) {
                currentStep += 1;
                showStep(currentStep);
            }
        }
        if (target.matches('.prev-btn')) {
            if (currentStep > 0) {
                currentStep -= 1;
                showStep(currentStep);
            }
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!validateStep(steps[currentStep])) return;

        const apiKey = getApiKey();
        if (!apiKey) {
            toast('Please configure your API key first', 'error');
            showApiKeyModal();
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Analyzing...';
        }
        toast('Analyzing your responses with AI. This takes ~10 seconds.');

        const formData = new FormData(form);
        const answers = collectAnswers(formData);

        try {
            // Calculate scores client-side
            const scores = GeminiClient.calculateScores(answers);
            const weakestPillar = GeminiClient.getWeakestPillar(scores);

            // Generate AI recommendations
            toast('Generating personalized recommendations...');
            const prompt = GeminiClient.buildDiagnosticPrompt(answers, scores);
            const recommendations = await GeminiClient.generateContent(apiKey, prompt);

            // Save and navigate
            const reportData = {
                answers,
                scores,
                weakestPillar,
                recommendations,
                publicShare: true
            };

            saveAndNavigateToResults(reportData);

        } catch (error) {
            console.error('Submission error', error);
            const message = error?.message 
                ? `Could not generate your report: ${error.message}` 
                : 'Could not generate your report. Please try again.';
            toast(message, 'error');
            
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Generate My Report';
            }
        }
    });

    showStep(currentStep);
};

document.addEventListener('DOMContentLoaded', () => {
    initApiKeyModal();
    initMultiStepForm();
});
