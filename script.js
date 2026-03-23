// ============================================
// AI PRODUCT GENERATOR v2.0 - PRODUCTION READY
// ============================================

class AIProductGenerator {
    constructor() {
        this.isGenerating = false;
        this.currentProduct = '';
        this.init();
    }

    init() {
        // Cache DOM elements
        this.elements = {
            topicInput: document.getElementById('topic'),
            resultDiv: document.getElementById('result'),
            promoDiv: document.getElementById('promo'),
            promoBtn: document.getElementById('promoBtn'),
            loadingOverlay: document.getElementById('loadingOverlay'),
            productLoader: document.getElementById('product-loader'),
            generateBtn: document.querySelector('.btn-primary')
        };

        this.initEventListeners();
        console.log('✅ AI Product Generator initialized');
    }

    initEventListeners() {
        const { topicInput } = this.elements;

        // Enter key to generate
        topicInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !this.isGenerating) {
                this.generateProduct();
            }
        });

        // Real-time input styling
        topicInput.addEventListener('input', () => topicInput.classList.add('focused'));
        topicInput.addEventListener('blur', () => {
            setTimeout(() => topicInput.classList.remove('focused'), 200);
        });

        // Clear button click
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn-clear')) this.clearAll();
        });
    }

    // ==================== LOADING ====================
    showLoading(show = true) {
        this.isGenerating = show;
        
        // Toggle overlay
        this.elements.loadingOverlay?.classList.toggle('active', show);
        this.elements.topicInput.disabled = show;
        
        // Button states
        const btn = this.elements.generateBtn;
        if (show) {
            this.elements.productLoader?.classList.add('active');
            btn?.classList.add('loading');
            btn.disabled = true;
        } else {
            this.elements.productLoader?.classList.remove('active');
            btn?.classList.remove('loading');
            btn.disabled = false;
        }
    }

    // ==================== NOTIFICATIONS ====================
    showNotification(message, type = 'success') {
        // Clean previous
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notif = document.createElement('div');
        notif.className = `notification notification-${type}`;
        notif.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
            <span>${message}</span>
            <button class="notif-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        document.body.appendChild(notif);
        requestAnimationFrame(() => notif.classList.add('show'));
        
        // Auto remove
        setTimeout(() => {
            notif.classList.remove('show');
            setTimeout(() => notif.remove(), 300);
        }, 5000);
    }

    // ==================== GENERATE PRODUCT ====================
    async generateProduct() {
        const topic = this.elements.topicInput.value.trim();
        
        // Validation
        if (!topic) {
            this.showNotification('📝 Masukkan topik produk dulu!', 'error');
            this.elements.topicInput.focus();
            return;
        }

        if (this.isGenerating) {
            this.showNotification('⏳ Sabar, AI masih berpikir...', 'info');
            return;
        }

        try {
            this.showLoading(true);
            this.elements.resultDiv.innerHTML = `
                <div class="loading-text">
                    <i class="fas fa-brain spinner"></i>
                    <p>🤖 AI sedang generate 5-7 ide produk inovatif...</p>
                </div>
            `;

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic })
            });

            // Better error handling
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || errorData.detail || `Server error: ${response.status}`);
            }

            const data = await response.json();
            const result = data.result || data.message || 'Tidak ada hasil';

            // Success UI
            this.elements.resultDiv.innerHTML = `
                <div class="success-header">
                    <i class="fas fa-lightbulb success-icon"></i>
                    <h3>✅ ${topic} - Ide Produk Siap!</h3>
                </div>
                <div class="result-markdown">${this.formatMarkdown(result)}</div>
                <div class="result-actions">
                    <button class="btn-copy" onclick="app.copyToClipboard('product')">
                        <i class="fas fa-copy"></i> Copy Semua
                    </button>
                    <button class="btn-promo" onclick="app.createPromo()">
                        <i class="fas fa-bullhorn"></i> Buat Caption IG
                    </button>
                    <button class="btn-clear" onclick="app.clearAll()">
                        <i class="fas fa-trash"></i> Clear
                    </button>
                </div>
            `;

            this.currentProduct = result;
            this.enablePromoButton();

            this.showNotification(`✨ ${topic} berhasil digenerate!`, 'success');

        } catch (error) {
            console.error('Generate error:', error);
            this.elements.resultDiv.innerHTML = `
                <div class="error-card">
                    <i class="fas fa-exclamation-triangle error-icon"></i>
                    <h3>⚠️ Generate Gagal</h3>
                    <p>${error.message}</p>
                    <div class="error-actions">
                        <button class="btn-retry" onclick="app.generateProduct()">🔄 Retry</button>
                        <button class="btn-clear" onclick="app.clearAll()">🗑️ Clear</button>
                    </div>
                </div>
            `;
            this.showNotification(`❌ ${error.message}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    // ==================== CREATE PROMO ====================
    async createPromo() {
        if (!this.currentProduct) {
            this.showNotification('Generate produk dulu! 😊', 'error');
            return;
        }

        try {
            this.elements.promoDiv.innerHTML = `
                <div class="loading-text">
                    <i class="fas fa-magic spinner"></i>
                    <p>✨ AI buat caption Instagram viral...</p>
                </div>
            `;

            const response = await fetch('/api/promo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product: this.currentProduct })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP ${response.status}`);
            }

            const data = await response.json();
            const promoText = data.result || data.message || 'No caption';

            this.elements.promoDiv.innerHTML = `
                <div class="success-header">
                    <i class="fas fa-hashtag success-icon"></i>
                    <h3>📱 Caption Instagram Ready!</h3>
                </div>
                <div class="promo-markdown">${this.formatMarkdown(promoText)}</div>
                <div class="result-actions">
                    <button class="btn-copy" onclick="app.copyToClipboard('promo')">
                        <i class="fas fa-copy"></i> Copy Caption
                    </button>
                    <button class="btn-share" onclick="app.sharePromo()">
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                    <button class="btn-clear" onclick="app.clearPromo()">
                        <i class="fas fa-trash"></i> Clear
                    </button>
                </div>
            `;

            // Smooth scroll
            this.elements.promoDiv.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });

            this.showNotification('🎉 Caption siap posting Instagram!', 'success');

        } catch (error) {
            console.error('Promo error:', error);
            this.elements.promoDiv.innerHTML = `
                <div class="error-card">
                    <i class="fas fa-exclamation-triangle error-icon"></i>
                    <h3>⚠️ Promo Gagal</h3>
                    <p>${error.message}</p>
                </div>
            `;
            this.showNotification(`❌ ${error.message}`, 'error');
        }
    }

    // ==================== UTILITIES ====================
    enablePromoButton() {
        const btn = this.elements.promoBtn;
        btn.disabled = false;
        btn.classList.add('active');
    }

    copyToClipboard(type) {
        let text = '';
        
        try {
            if (type === 'product') {
                text = this.elements.resultDiv.querySelector('.result-markdown')?.textContent?.trim() || '';
            } else {
                text = this.elements.promoDiv.querySelector('.promo-markdown')?.textContent?.trim() || '';
            }

            if (!text) {
                this.showNotification('Tidak ada teks untuk dicopy', 'error');
                return;
            }

            // Modern clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    this.showNotification('📋 Tersalin ke clipboard! ✅', 'success');
                });
            } else {
                // Fallback
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                this.showNotification('📋 Tersalin! (fallback)', 'success');
            }
        } catch (error) {
            this.showNotification('Gagal copy 😅', 'error');
        }
    }

    sharePromo() {
        if (navigator.share) {
            navigator.share({
                title: 'AI Product Generator',
                text: this.currentProduct?.slice(0, 100) || '',
                url: window.location.href
            });
        } else {
            this.copyPromoLink();
        }
    }

    copyPromoLink() {
        navigator.clipboard.writeText(window.location.href).then(() => {
            this.showNotification('🔗 Link website dicopy!', 'success');
        });
    }

    clearAll() {
        this.elements.topicInput.value = '';
        this.elements.resultDiv.innerHTML = '';
        this.elements.promoDiv.innerHTML = '';
        this.currentProduct = '';
        this.elements.promoBtn.disabled = true;
        this.elements.promoBtn.classList.remove('active');
        this.elements.topicInput.focus();
        this.showNotification('🗑️ Semua dibersihkan', 'info');
    }

    clearPromo() {
        this.elements.promoDiv.innerHTML = '';
        this.showNotification('🗑️ Promo dibersihkan', 'info');
    }

    // ==================== MARKDOWN RENDER ====================
    formatMarkdown(text) {
        if (!text) return '<p><em>Tidak ada konten dari AI</em></p>';
        
        let formatted = text
            // Headers
            .replace(/^###\s*(.+)$/gim, '<h4 style="color:#fbbf24;margin:1rem 0">$1</h4>')
            .replace(/^##\s*(.+)$/gim, '<h3 style="color:#f59e0b;margin:1.2rem 0 0.8rem">$1</h3>')
            .replace(/^#\s*(.+)$/gim, '<h2 style="color:#fbbf24;font-size:1.6em;margin:1.5rem 0">$1</h2>')
            
            // Bold, italic, strikethrough
            .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#fbbf24">$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/~~(.+?)~~/g, '<del>$1</del>')
            
            // Lists
            .replace(/^(\s*)([-*•])\s+(.+)$/gm, '$1<div class="list-item"><i class="fas fa-circle" style="color:#94a3b8"></i>$3</div>')
            
            // Links & mentions
            .replace(/\$(.+?)\$\$(.+?)\$/g, '<a href="$2" target="_blank" style="color:#60a5fa">$1</a>')
            .replace(/@(\w+)/g, '<span style="color:#fbbf24">@$1</span>')
            
            // Code & quotes
            .replace(/```([\s\S]+?)```/g, '<pre style="background:rgba(251,191,36,0.1);padding:1rem;border-radius:12px;font-family:monospace">$1</pre>')
            .replace(/^>\s*(.+)$/gm, '<blockquote style="border-left:3px solid #fbbf24;padding-left:1rem;margin:1rem 0">$1</blockquote>')
            
            // Emojis & separators
            .replace(/---/g, '<hr style="border: none;height:1px;background:linear-gradient(90deg,transparent,#fbbf24,transparent);margin:2rem 0">')
            
            // Line breaks
            .replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>');

        return `<div class="markdown-content"><p>${formatted}</p></div>`;
    }
}

// 🔥 GLOBAL INIT - VERCEL READY
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AIProductGenerator();
    window.generateProduct = () => app.generateProduct();
    window.createPromo = () => app.createPromo();
    
    // Welcome message
    setTimeout(() => {
        app.showNotification('🚀 AI Product Generator siap digunakan!', 'success');
    }, 1000);
});

// Error boundary
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    app?.showNotification('Ada error teknis. Refresh halaman.', 'error');
});
