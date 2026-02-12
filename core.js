/* Nexus Core UI Controller v667 */
/* Menghubungkan stealth engine dengan tampilan */

(function() {
    'use strict';
    
    // DOM elements
    const promptContent = document.getElementById('promptContent');
    const promptLoading = document.getElementById('promptLoading');
    const generateBtn = document.getElementById('generateBtn');
    const confidenceBadge = document.getElementById('confidenceBadge');
    
    // State
    let currentPrompt = null;
    
    // Update UI dengan prompt baru
    const updateDisplay = (promptData) => {
        if (!promptData) return;
        
        currentPrompt = promptData;
        
        // Sembunyiin loading, tampilin konten
        if (promptLoading) promptLoading.style.display = 'none';
        if (promptContent) {
            promptContent.style.display = 'block';
            promptContent.textContent = promptData.compiled;
        }
        
        // Update confidence badge
        if (confidenceBadge && promptData.confidence) {
            confidenceBadge.textContent = `confidence: ${promptData.confidence}`;
        }
        
        // Trigger efek subtle
        document.querySelector('.status-indicator')?.classList.add('active');
        setTimeout(() => {
            document.querySelector('.status-indicator')?.classList.remove('active');
        }, 500);
    };
    
    // Reset ke loading state
    const showLoading = () => {
        if (promptLoading) promptLoading.style.display = 'flex';
        if (promptContent) promptContent.style.display = 'none';
    };
    
    // Event listeners dari stealth engine
    window.addEventListener('nexus-update-display', (e) => {
        updateDisplay(e.detail);
    });
    
    window.addEventListener('nexus-prompt-generated', (e) => {
        // Update hanya kalau lagi visible dan gak ada loading paksa
        if (document.visibilityState === 'visible') {
            updateDisplay(e.detail);
        }
    });
    
    // Manual generate
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            showLoading();
            
            // Kasih efek delay biar natural
            setTimeout(() => {
                const newPrompt = NexusStealth.generateNow();
                updateDisplay(newPrompt);
            }, 300 + Math.floor(Math.random() * 200));
        });
    }
    
    // Fallback: kalau dalam 1 detik gak ada prompt, generate manual
    setTimeout(() => {
        if (!currentPrompt) {
            showLoading();
            setTimeout(() => {
                const fallback = NexusEngine.generate();
                updateDisplay(fallback);
            }, 100);
        }
    }, 1000);
    
    // Cleanup
    window.addEventListener('beforeunload', () => {
        // No logs, no traces
    });
})();