/* ============================================================
   Netflix Clone — script.js
   Features:
   - Sticky navbar with scroll detection
   - Floating label email validation
   - FAQ accordion
   - Scroll-triggered section animations (IntersectionObserver)
   - Language dropdown toggle
   ============================================================ */

(function () {
    'use strict';

    /* ── Navbar scroll ── */
    const navbar = document.getElementById('navbar');

    function onScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load


    /* ── Language dropdown ── */
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.addEventListener('click', function (e) {
            langSelect.classList.toggle('open');
            e.stopPropagation();
        });

        document.addEventListener('click', function () {
            langSelect.classList.remove('open');
        });

        langSelect.querySelectorAll('.lang-option').forEach(function (opt) {
            opt.addEventListener('click', function (e) {
                e.stopPropagation();
                langSelect.querySelectorAll('.lang-option').forEach(function (o) { o.classList.remove('active'); });
                opt.classList.add('active');
                langSelect.querySelector('.lang-text').textContent = opt.textContent;
                langSelect.classList.remove('open');
            });
        });
    }


    /* ── Email validation helper ── */
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }

    function setupEmailForm(inputId, errorId, btnEl) {
        const input = document.getElementById(inputId);
        const errorEl = errorId ? document.getElementById(errorId) : null;
        if (!input) return;

        function showError(msg) {
            input.classList.add('error');
            if (errorEl) errorEl.textContent = msg;
        }

        function clearError() {
            input.classList.remove('error');
            if (errorEl) errorEl.textContent = '';
        }

        input.addEventListener('input', clearError);

        const btn = btnEl || input.closest('.hero-form')?.querySelector('.btn-get-started');
        if (btn) {
            btn.addEventListener('click', function () {
                const val = input.value.trim();
                if (!val) {
                    showError('Email is required.');
                    input.focus();
                } else if (!isValidEmail(val)) {
                    showError('Please enter a valid email address.');
                    input.focus();
                } else {
                    clearError();
                    // Simulate success feedback
                    btn.textContent = '✓ Continue';
                    btn.style.background = '#2ecc40';
                    setTimeout(function () {
                        btn.innerHTML = 'Get Started <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>';
                        btn.style.background = '';
                    }, 2000);
                }
            });
        }

        // Submit on Enter
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                if (btn) btn.click();
            }
        });
    }

    setupEmailForm('emailInput', 'heroError');
    setupEmailForm('emailInput2', null);


    /* ── FAQ accordion ── */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {
        const btn = item.querySelector('.faq-q');
        if (!btn) return;

        btn.addEventListener('click', function () {
            const isOpen = item.classList.contains('open');

            // Close all
            faqItems.forEach(function (fi) {
                fi.classList.remove('open');
                fi.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
            });

            // Open clicked (if was not open)
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });


    /* ── Scroll-triggered animations (IntersectionObserver) ── */
    const animatedEls = document.querySelectorAll('.feature');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        animatedEls.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show all
        animatedEls.forEach(function (el) { el.classList.add('visible'); });
    }


    /* ── Smooth scroll hint arrow ── */
    const scrollHint = document.querySelector('.hero-scroll-hint');
    if (scrollHint) {
        scrollHint.addEventListener('click', function () {
            const firstSep = document.querySelector('.sep');
            if (firstSep) {
                firstSep.nextElementSibling?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        scrollHint.style.cursor = 'pointer';
    }


    /* ── Footer language button (cosmetic) ── */
    const footerLangBtn = document.getElementById('footerLangBtn');
    if (footerLangBtn) {
        footerLangBtn.addEventListener('click', function () {
            const current = footerLangBtn.textContent.includes('English');
            footerLangBtn.textContent = current ? '🌐 हिन्दी ▾' : '🌐 English ▾';
        });
    }

})();