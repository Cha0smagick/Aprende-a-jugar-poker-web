// Global initialization script
(function() {
  'use strict';

  // Theme management
  function initTheme() {
    const root = document.documentElement;
    const stored = localStorage.getItem('poker-mastery-theme') || 'system';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    function applyTheme(theme) {
      if (theme === 'dark' || (theme === 'system' && prefersDark)) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }

    applyTheme(stored);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (stored === 'system') {
        applyTheme('system');
      }
    });

    // Theme toggle button
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = localStorage.getItem('poker-mastery-theme') || 'system';
        const next = current === 'dark' ? 'light' : current === 'light' ? 'system' : 'dark';
        localStorage.setItem('poker-mastery-theme', next);
        applyTheme(next);
        updateToggleIcon(next);
      });
      updateToggleIcon(stored);
    }

    function updateToggleIcon(theme) {
      const isDark = theme === 'dark' || (theme === 'system' && prefersDark);
      toggle?.setAttribute('aria-pressed', isDark.toString());
    }
  }

  // Mobile menu
  function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', (!expanded).toString());
      menu.classList.toggle('hidden');
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.add('hidden');
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.add('hidden');
        toggle.focus();
      }
    });
  }

  // User menu dropdown
  function initUserMenu() {
    const trigger = document.getElementById('user-menu-trigger');
    const dropdown = document.getElementById('user-menu-dropdown');
    if (!trigger || !dropdown) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', (!expanded).toString());
      dropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
        trigger.setAttribute('aria-expanded', 'false');
        dropdown.classList.add('hidden');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !dropdown.classList.contains('hidden')) {
        trigger.setAttribute('aria-expanded', 'false');
        dropdown.classList.add('hidden');
        trigger.focus();
      }
    });
  }

  // Search modal
  function initSearch() {
    const trigger = document.getElementById('search-toggle');
    const modal = document.getElementById('search-modal');
    const close = document.getElementById('search-close');
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    const empty = document.getElementById('search-empty');

    if (!trigger || !modal || !close || !input || !results) return;

    let searchIndex: Array<{title: string, url: string, description: string, type: string}> = [];

    // Load search index
    async function loadSearchIndex() {
      try {
        const res = await fetch('/search-index.json');
        if (res.ok) searchIndex = await res.json();
      } catch (e) {
        console.warn('Search index not available:', e);
      }
    }

    function openSearch() {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      input.focus();
      trigger.setAttribute('aria-expanded', 'true');
    }

    function closeSearch() {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
      input.value = '';
      results.innerHTML = '';
      empty.style.display = 'block';
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    }

    trigger.addEventListener('click', openSearch);
    close.addEventListener('click', closeSearch);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!modal.classList.contains('hidden')) closeSearch();
        else openSearch();
      }
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeSearch();
      }
    });

    // Backdrop click
    modal.querySelector('.modal-backdrop')?.addEventListener('click', closeSearch);

    // Search logic
    let debounceTimer: number;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(() => {
        const query = input.value.toLowerCase().trim();
        if (!query) {
          results.innerHTML = '';
          empty.style.display = 'block';
          return;
        }

        const matches = searchIndex
          .filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
          )
          .slice(0, 10);

        if (matches.length === 0) {
          results.innerHTML = '<p class="text-text-muted text-center py-8">No se encontraron resultados</p>';
          empty.style.display = 'none';
          return;
        }

        empty.style.display = 'none';
        results.innerHTML = matches.map((item, i) => `
          <a href="${item.url}" class="block p-3 bg-bg-tertiary rounded-lg hover:bg-bg-hover transition-colors group" role="listitem" tabindex="${i === 0 ? 0 : -1}">
            <div class="flex items-start gap-3">
              <span class="badge badge-info text-xs shrink-0">${item.type}</span>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-text-primary group-hover:text-poker-gold transition-colors">${highlightMatch(item.title, query)}</p>
                <p class="text-sm text-text-muted truncate">${highlightMatch(item.description, query)}</p>
              </div>
            </div>
          </a>
        `).join('');
      }, 150);
    });

    function highlightMatch(text: string, query: string): string {
      if (!query) return text;
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      return text.replace(regex, '<mark class="bg-poker-gold/30 px-0.5 rounded">$1</mark>');
    }

    // Keyboard navigation in results
    input.addEventListener('keydown', (e) => {
      const items = results.querySelectorAll('[role="listitem"]');
      if (!items.length) return;

      const active = results.querySelector('[tabindex="0"]');
      let index = Array.from(items).indexOf(active as Element);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        index = Math.min(index + 1, items.length - 1);
        updateFocus(items, index);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        index = Math.max(index - 1, 0);
        updateFocus(items, index);
      } else if (e.key === 'Enter' && active) {
        e.preventDefault();
        (active as HTMLAnchorElement).click();
      }
    });

    function updateFocus(items: NodeListOf<Element>, index: number) {
      items.forEach((item, i) => {
        item.setAttribute('tabindex', i === index ? '0' : '-1');
        if (i === index) (item as HTMLElement).focus();
      });
    }

    // Load index on first open
    let indexLoaded = false;
    modal.addEventListener('transitionstart', () => {
      if (!indexLoaded && !modal.classList.contains('hidden')) {
        loadSearchIndex();
        indexLoaded = true;
      }
    }, { once: true });
  }

  // Newsletter form
  function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]') as HTMLInputElement;
      const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      const email = input.value.trim();

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Email inválido', 'error');
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Suscribiendo...';

      try {
        // In production, this would call an API endpoint
        // await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) });
        await new Promise(r => setTimeout(r, 1000)); // Simulate
        showToast('¡Suscrito correctamente! Revisa tu bandeja de entrada.', 'success');
        input.value = '';
      } catch {
        showToast('Error al suscribir. Intenta más tarde.', 'error');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Suscribirse';
      }
    });
  }

  // Toast notifications
  window.showToast = function(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') {
    const container = document.getElementById('toasts');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `pointer-events-auto animate-slide-up px-4 py-3 rounded-lg shadow-elevated max-w-sm ${
      type === 'success' ? 'bg-success text-white' :
      type === 'error' ? 'bg-error text-white' :
      type === 'warning' ? 'bg-warning text-white' :
      'bg-info text-white'
    }`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s ease-in forwards';
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  };

  // Progress bar animation on scroll
  function initProgressBars() {
    const bars = document.querySelectorAll('.progress-bar, .progress-bar-gold, .xp-fill');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target as HTMLElement;
          const width = bar.style.getPropertyValue('--progress-width') || bar.dataset.width || '100%';
          bar.style.setProperty('--progress-width', width);
          bar.style.width = width;
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => observer.observe(b));
  }

  // KaTeX auto-render for dynamic content
  function initKaTeX() {
    if (typeof renderMathInElement === 'function') {
      // Re-render for any dynamically added content
      const observer = new MutationObserver((mutations) => {
        let shouldRender = false;
        mutations.forEach(m => {
          if (m.type === 'childList' && m.addedNodes.length) {
            m.addedNodes.forEach(node => {
              if (node.nodeType === 1 && (node as Element).querySelector?.('math, .katex, [data-katex]')) {
                shouldRender = true;
              }
            });
          }
        });
        if (shouldRender) {
          try {
            renderMathInElement(document.body, {
              delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false},
                {left: '\\(', right: '\\)', display: false},
                {left: '\\[', right: '\\]', display: true},
              ],
              throwOnError: false,
              trust: true,
            });
          } catch (e) {
            console.warn('KaTeX render error:', e);
          }
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  // Initialize all
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initUserMenu();
    initSearch();
    initNewsletter();
    initProgressBars();
    initKaTeX();
  });
})();