// NEXUS ENGINE v667 - AUTO GENERATOR + STEALTH
// LASI+ READY - SEKALI JALAN, HIDUP TERUS

(function() {
    'use strict';
    
    // ----- ENCODER -----
    const encoders = {
        none: s => s,
        base64: s => {
            try { return btoa(unescape(encodeURIComponent(s))); } catch { return s; }
        },
        rot13: s => s.replace(/[a-zA-Z]/g, c => 
            c <= 'Z' ? ((c.charCodeAt(0) - 65 + 13) % 26) + 65 : 
            ((c.charCodeAt(0) - 97 + 13) % 26) + 97),
        xor: s => s.split('').map(ch => 
            String.fromCharCode(ch.charCodeAt(0) ^ 42)).join('')
    };
    const encoderList = Object.keys(encoders).filter(e => e !== 'none');
    
    // ----- GENERATOR -----
    function generatePrompt() {
        // Ambil template random
        const templates = window.NexusDB || [];
        const variants = window.NexusVariants || [];
        
        let template = templates[Math.floor(Math.random() * templates.length)];
        template += variants[Math.floor(Math.random() * variants.length)];
        
        // Random encoding (30% chance)
        let encoding = 'none';
        let compiled = template;
        
        if (Math.random() > 0.65) {
            encoding = encoderList[Math.floor(Math.random() * encoderList.length)];
            compiled = encoders[encoding](template);
            if (Math.random() > 0.5) compiled += ` [${encoding}]`;
        }
        
        // Confidence acak (99-100%)
        const confidence = (99 + (Math.random() * 0.98)).toFixed(2) + '%';
        
        return {
            compiled,
            confidence,
            encoding,
            timestamp: Date.now()
        };
    }
    
    // ----- UI ELEMENTS -----
    const promptText = document.getElementById('promptText');
    const loading = document.getElementById('loading');
    const generateBtn = document.getElementById('generateBtn');
    const confidenceEl = document.getElementById('confidence');
    
    // ----- UPDATE DISPLAY -----
    function updateDisplay(prompt) {
        if (!prompt) return;
        
        if (loading) loading.style.display = 'none';
        if (promptText) {
            promptText.style.display = 'block';
            promptText.textContent = prompt.compiled;
        }
        if (confidenceEl) {
            confidenceEl.textContent = `confidence: ${prompt.confidence}`;
        }
    }
    
    function showLoading() {
        if (loading) loading.style.display = 'flex';
        if (promptText) promptText.style.display = 'none';
    }
    
    // ----- GENERATE & TRIGGER -----
    function generateAndShow() {
        const prompt = generatePrompt();
        updateDisplay(prompt);
        
        // Silent copy ke clipboard (kalau bisa)
        if (navigator.clipboard && document.hasFocus() && Math.random() > 0.7) {
            navigator.clipboard.writeText(prompt.compiled).catch(() => {});
        }
        
        return prompt;
    }
    
    // ----- STEALTH INIT -----
    function init() {
        // History redirect (anti backtrace)
        window.history.pushState({}, '', window.location.pathname + '#' + 
            Math.random().toString(36).substring(2, 10));
        
        // Generate first prompt (delayed biar natural)
        setTimeout(() => {
            generateAndShow();
        }, 300);
        
        // Auto refresh random (setiap 8-15 detik)
        setInterval(() => {
            if (document.visibilityState === 'visible' && Math.random() > 0.6) {
                generateAndShow();
            }
        }, 8000 + Math.floor(Math.random() * 7000));
    }
    
    // ----- EVENT LISTENERS -----
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            showLoading();
            setTimeout(() => {
                generateAndShow();
            }, 200 + Math.floor(Math.random() * 150));
        });
    }
    
    // Start everything
    init();
})();
