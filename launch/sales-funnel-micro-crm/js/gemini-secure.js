// Secure Gemini AI Integration - Client Side
// All API calls go through Firebase Cloud Functions

class SecureGeminiAI {
    constructor() {
        // No API key stored on client side!
    }

    // Call Gemini through secure Cloud Function
    async callGemini(prompt) {
        try {
            const callGeminiFunc = firebase.functions().httpsCallable('callGemini');
            const result = await callGeminiFunc({ prompt });
            
            if (result.data.success) {
                return result.data.text;
            } else {
                throw new Error('Gemini API call failed');
            }
        } catch (error) {
            console.error('Gemini API error:', error);
            
            if (error.code === 'unauthenticated') {
                throw new Error('Please log in to use AI features');
            } else if (error.code === 'failed-precondition') {
                throw new Error('AI not configured. Please contact administrator.');
            } else {
                throw new Error('Failed to call AI service');
            }
        }
    }

    // Score a lead (1-100)
    async scoreLead(lead) {
        try {
            // Serialize lead data to avoid Firestore timestamp issues
            const leadData = {
                ...lead,
                createdAt: lead.createdAt?.toDate?.()?.toISOString() || null,
                lastContact: lead.lastContact?.toDate?.()?.toISOString() || null
            };
            
            const scoreLeadFunc = firebase.functions().httpsCallable('scoreLead');
            const result = await scoreLeadFunc({ lead: leadData });
            
            if (result.data.success) {
                return result.data.score;
            } else {
                return 50; // Default score if parsing fails
            }
        } catch (error) {
            console.error('Lead scoring error:', error);
            throw new Error('Failed to score lead with AI');
        }
    }

    // Generate personalized email
    async draftEmail(lead) {
        try {
            // Serialize lead data to avoid Firestore timestamp issues
            const leadData = {
                ...lead,
                createdAt: lead.createdAt?.toDate?.()?.toISOString() || null,
                lastContact: lead.lastContact?.toDate?.()?.toISOString() || null
            };
            
            const draftEmailFunc = firebase.functions().httpsCallable('draftEmail');
            const result = await draftEmailFunc({ lead: leadData });
            
            if (result.data.success) {
                return result.data.email;
            } else {
                throw new Error('Email generation failed');
            }
        } catch (error) {
            console.error('Email drafting error:', error);
            throw new Error('Failed to draft email with AI');
        }
    }

    // Suggest next best action
    async suggestNextAction(lead, activities) {
        try {
            // Serialize data to avoid Firestore timestamp issues
            const leadData = {
                ...lead,
                createdAt: lead.createdAt?.toDate?.()?.toISOString() || null,
                lastContact: lead.lastContact?.toDate?.()?.toISOString() || null
            };
            const activitiesData = activities.map(a => ({
                ...a,
                createdAt: a.createdAt?.toDate?.()?.toISOString() || null
            }));
            
            const suggestActionFunc = firebase.functions().httpsCallable('suggestNextAction');
            const result = await suggestActionFunc({ lead: leadData, activities: activitiesData });
            
            if (result.data.success) {
                return result.data.action;
            } else {
                throw new Error('Action suggestion failed');
            }
        } catch (error) {
            console.error('Next action error:', error);
            throw new Error('Failed to suggest next action');
        }
    }

    // Generate weekly insights
    async generateInsights(leads) {
        try {
            // Serialize leads data to avoid Firestore timestamp issues
            const leadsData = leads.map(lead => ({
                ...lead,
                createdAt: lead.createdAt?.toDate?.()?.toISOString() || null,
                lastContact: lead.lastContact?.toDate?.()?.toISOString() || null
            }));
            
            const generateInsightsFunc = firebase.functions().httpsCallable('generateInsights');
            const result = await generateInsightsFunc({ leads: leadsData });
            
            if (result.data.success) {
                return result.data.insights;
            } else {
                throw new Error('Insights generation failed');
            }
        } catch (error) {
            console.error('Insights generation error:', error);
            throw new Error('Failed to generate insights');
        }
    }

    // Analyze lead engagement
    async analyzeEngagement(lead, activities) {
        try {
            // Serialize data to avoid Firestore timestamp issues
            const leadData = {
                ...lead,
                createdAt: lead.createdAt?.toDate?.()?.toISOString() || null,
                lastContact: lead.lastContact?.toDate?.()?.toISOString() || null
            };
            const activitiesData = activities.map(a => ({
                ...a,
                createdAt: a.createdAt?.toDate?.()?.toISOString() || null
            }));
            
            const analyzeFunc = firebase.functions().httpsCallable('analyzeEngagement');
            const result = await analyzeFunc({ lead: leadData, activities: activitiesData });
            
            if (result.data.success) {
                return result.data.analysis;
            } else {
                throw new Error('Engagement analysis failed');
            }
        } catch (error) {
            console.error('Engagement analysis error:', error);
            throw new Error('Failed to analyze engagement');
        }
    }
}

// Initialize Secure Gemini AI (no API key needed on client!)
const geminiAI = new SecureGeminiAI();

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.geminiAI = geminiAI;
}
