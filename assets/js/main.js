/**
 * Presora Official Website - Interactive Scripts
 * Provides mobile navigation toggle, clipboard copy, smooth scroll,
 * and dynamic binding from config.js.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
      mobileBtn.innerHTML = isOpen ? '&#10005;' : '&#9776;';
    });

    // Close mobile nav when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileBtn.innerHTML = '&#9776;';
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Dynamic Configuration Bindings
  if (typeof PRESORA_CONFIG !== 'undefined') {
    // Fill text elements with data-config attribute
    document.querySelectorAll('[data-config]').forEach(el => {
      const keyPath = el.getAttribute('data-config');
      const val = getNestedValue(PRESORA_CONFIG, keyPath);
      if (val !== undefined && val !== null) {
        el.textContent = val;
      }
    });

    // Fill href elements with data-config-href attribute
    document.querySelectorAll('[data-config-href]').forEach(el => {
      const keyPath = el.getAttribute('data-config-href');
      const val = getNestedValue(PRESORA_CONFIG, keyPath);
      if (val) {
        if (keyPath.includes('Email')) {
          el.setAttribute('href', `mailto:${val}`);
        } else {
          el.setAttribute('href', val);
        }
      }
    });
  }

  // Helper for dot notation in object keys
  function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined) ? acc[part] : undefined, obj);
  }

  // 3. Email Copy Functionality with Toast
  window.copyEmailToClipboard = function (email) {
    const textToCopy = email || (typeof PRESORA_CONFIG !== 'undefined' ? PRESORA_CONFIG.developer.supportEmail : 'avrizalrendiprayoga@gmail.com');
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Email ${textToCopy} disalin ke clipboard!`);
      }).catch(err => {
        fallbackCopyText(textToCopy);
      });
    } else {
      fallbackCopyText(textToCopy);
    }
  };

  function fallbackCopyText(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(`Email ${text} disalin ke clipboard!`);
    } catch (err) {
      alert(`Email dukungan: ${text}`);
    }
    document.body.removeChild(tempInput);
  }

  // 4. Toast Notification
  function showToast(message) {
    let toast = document.getElementById('siteToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'siteToast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 5. Active Link Highlight
  const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
      link.classList.add('active');
    }
  });
});
