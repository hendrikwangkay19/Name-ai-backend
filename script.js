// Global state
let isGenerating = false;
let currentProduct = '';

class AIProductGenerator {
    constructor() {
        this.initEventListeners();
        this.topicInput = document.getElementById('topic');
        this.resultDiv = document.getElementById('result');
        this.promoDiv = document.getElementById('promo');
        this.promoBtn = document.getElementById('promoBtn');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.productLoader = document.getElementById('product-loader');
    }

    initEventListeners() {
        // Enter key support
        this.topicInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !isGenerating) {
                this.generateProduct();
            }
        });

        // Input focus effect
        this.topicInput.addEventListener('input', () => {
            this.topicInput.classList.add('focused');
        });

        // Clear focus on blur
        this.topicInput.addEventListener('blur', () => {
            setTimeout(() => this.topicInput.classList.remove('focused'), 200);
        });
    }

    async showLoading(show = true) {
        isGenerating = show;
        this.loadingOverlay?.classList.toggle('active', show);
        this.topicInput.disabled = show;
        
        const btnPrimary = document.querySelector('.btn-primary');
        if (show) {
            this.productLoader?.classList.add('active');
            btnPrimary?.classList.add('loading');
        } else {
            this.productLoader?.classList.remove('active');
            btnPrimary?.classList.remove('loading');
        }
    }

    showNotification(message, type = 'success') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });
        
        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    async generateProduct() {
        const topic = this.topicInput.value.trim();
        
        if (!topic) {
            this.showNotification('Masukkan topik produk terlebih dahulu! 😅', 'error');
            this.topicInput.focus();
            return;
        }

        if (isGenerating) return;

        try {
            this.showLoading(true);
            this.resultDiv.innerHTML = '<div class="loading-text">🤖 AI sedang generate ide produk cerdas...</div>';

            // 🔥 VERCEL PATH FIX
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic })
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP ${res.status}`);
            }

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Enhanced result dengan fallback
            const resultContent = data.result || data.message || 'Tidak ada hasil dari AI';
            this.resultDiv.innerHTML = `
                <div class="result-markdown">${this.formatMarkdown(resultContent)}</div>
                <div class="result-actions">
                    <button class="btn-copy" onclick="app.copyToClipboard('product')">
                        <i class="fas fa-copy"></i> Copy Ide Produk
                    </button>
                    <button class="btn-promo" onclick="app.createPromo()">
                        <i class="fas fa-bullhorn"></i> Buat Caption IG
                    </button>
                </div>
            `;

            currentProduct = resultContent;
            this.promoBtn.disabled = false;
            this.promoBtn.classList.add('active');
            
            this.showNotification('✅ 5-7 ide produk siap! Pilih yang terbaik 👆', 'success');
            this.topicInput.select();

        } catch (error) {
            console.error('Generate error:', error);
            this.resultDiv.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>⚠️ ${error.message}</p>
                    <small>Coba topic lain atau refresh halaman</small>
                    <button class="btn-retry" onclick="app.generateProduct()">🔄 Coba Lagi</button>
                </div>
            `;
            this.showNotification('❌ Gagal generate. Cek koneksi & API key', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async createPromo() {
        if (!currentProduct) {
            this.showNotification('Generate produk dulu ya! 😊', 'error');
            return;
        }

        try {
            this.promoDiv.innerHTML = '<div class="loading-text">✨ AI buat caption viral Instagram...</div>';

            // 🔥 VERCEL PATH FIX
            const res = await fetch("/api/promo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ product: currentProduct })
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP ${res.status}`);
            }

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            const promoContent = data.result || data.message || 'Tidak ada caption';
            this.promoDiv.innerHTML = `
                <div class="promo-markdown">${this.formatMarkdown(promoContent)}</div>
                <div class="result-actions">
                    <button class="btn-copy" onclick="app.copyToClipboard('promo')">
                        <i class="fas fa-copy"></i> Copy Caption
                    </button>
                    <button class="btn-copy" onclick="app.copyPromoLink()">
                        <i class="fas fa-link"></i> Share Link
                    </button>
                </div>
            `;

            this.showNotification('📱 Caption IG ready to post! 🔥', 'success');
            this.promoDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } catch (error) {
            console.error('Promo error:', error);
            this.promoDiv.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Gagal buat caption: ${error.message}</p>
                </div>
            `;
            this.showNotification('❌ Caption gagal dibuat', 'error');
        }
    }

    copyToClipboard(type) {
        let text = '';
        try {
            if (type === 'product') {
                text = this.resultDiv.querySelector('.result-markdown')?.textContent || '';
            } else if (type === 'promo') {
                text = this.promoDiv.querySelector('.promo-markdown')?.textContent || '';
            }

            if (!text) throw new Error('No content to copy');

            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('📋 Tersalin! Bisa langsung paste 👌', 'success');
            }).catch(() => {
                // Fallback for old browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                this.showNotification('📋 Tersalin!', 'success');
            });
        } catch (error) {
            this.showNotification('Gagal copy 😅', 'error');
        }
    }

    copyPromoLink() {
        try {
            const url = `${window.location.origin}${window.location.pathname}`;
            navigator.clipboard.writeText(url).then(() => {
                this.showNotification('🔗 Link website tersalin!', 'success');
            });
        } catch (error) {
            this.showNotification('Gagal copy link', 'error');
        }
    }

    formatMarkdown(text) {
        if (!text) return '<p>Tidak ada konten</p>';
        
        return text
            // Headers
            .replace(/^### (.*$)/gim, '<h4 style="color:#fbbf24">$1</h4>')
            .replace(/^## (.*$)/gim, '<h3 style="color:#f59e0b">$1</h3>')
            .replace(/^# (.*$)/gim, '<h2 style="color:#fbbf24;font-size:1.5em">$1</h2>')
            // Bold & Italic
            .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#fbbf24">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Lists
            .replace(/^(\s*[-*•] )(.*$)/gim, '<div class="markdown-list"><i class="fas fa-circle" style="color:#fbbf24"></i> $2</div>')
            // Links
            .replace(/\$([^\$]+)\$\$([^)]+)\$/g, '<a href="$2" target="_blank" style="color:#60a5fa">$1</a>')
            // Code blocks
            .replace(/```([\s\S]*?)```/g, '<pre style="background:rgba(251,191,36,0.1);padding:1rem;border-radius:8px">$1</pre>')
            // Line breaks
            .replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')
            // Wrap in paragraph
            .replace(/^/, '<p>').replace(/$/, '</p>');
    }
}

// Initialize app when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new AIProductGenerator();
    window.app = app;
    window.generateProduct = () => app.generateProduct();
    window.createPromo = () => app.createPromo();
});

// PWA Support (skip if no sw.js)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => registration.unregister());
    });
}