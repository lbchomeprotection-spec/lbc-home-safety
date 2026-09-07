/**
 * LBC Home Safety - Lightweight Interactive Script
 * - Mobile Navigation Toggle
 * - FAQ Accordion Functionality
 * - LBC Home Safety AI Support Assistant
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFaqAccordion();
  initAiSupport();
});

/* --------------------------------------------------------------------------
   1. Mobile Navigation
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   2. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items for neat UX
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          const btn = other.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle clicked item
      item.classList.toggle('active', !isActive);
      questionBtn.setAttribute('aria-expanded', String(!isActive));
    });
  });
}

/* --------------------------------------------------------------------------
   3. LBC Home Safety AI Support Assistant
   -------------------------------------------------------------------------- */
function initAiSupport() {
  const toggleBtn = document.getElementById('aiToggleBtn');
  const chatDrawer = document.getElementById('aiChatDrawer');
  const closeBtn = document.getElementById('aiChatClose');
  const sendBtn = document.getElementById('aiChatSend');
  const inputEl = document.getElementById('aiChatInput');
  const messagesContainer = document.getElementById('aiChatMessages');
  const chipsContainer = document.getElementById('aiChipsContainer');

  if (!toggleBtn || !chatDrawer) return;

  // Toggle Drawer
  toggleBtn.addEventListener('click', () => {
    const isOpen = chatDrawer.classList.toggle('open');
    if (isOpen && inputEl) {
      inputEl.focus();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      chatDrawer.classList.remove('open');
    });
  }

  // Handle Send Message
  function handleSendMessage(text) {
    const message = (text || (inputEl ? inputEl.value : '')).trim();
    if (!message) return;

    // Append User Message
    appendMessage(message, 'user');
    if (inputEl) inputEl.value = '';

    // Generate AI response with slight natural typing delay
    setTimeout(() => {
      const botResponse = generateAiResponse(message);
      appendMessage(botResponse, 'bot');
    }, 350);
  }

  if (sendBtn && inputEl) {
    sendBtn.addEventListener('click', () => handleSendMessage());
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSendMessage();
      }
    });
  }

  // Handle Quick Chips
  if (chipsContainer) {
    chipsContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.ai-chip');
      if (chip) {
        const query = chip.getAttribute('data-query');
        if (query) {
          handleSendMessage(query);
        }
      }
    });
  }

  function appendMessage(text, sender) {
    if (!messagesContainer) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-msg ${sender}`;
    msgDiv.innerHTML = formatMessageText(text);
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function formatMessageText(text) {
    // Preserve line breaks and safely link phone/email
    return text
      .replace(/\n/g, '<br>')
      .replace(/\+91\s*75640\s*86196/g, '<a href="tel:+917564086196" style="color:#087EA4;font-weight:bold;">+91 75640 86196</a>')
      .replace(/\+91\s*878\s*907\s*9389/g, '<a href="tel:+918789079389" style="color:#087EA4;font-weight:bold;">+91 878 907 9389</a>')
      .replace(/lbchomesafety@gmail\.com/g, '<a href="mailto:lbchomesafety@gmail.com" style="color:#087EA4;font-weight:bold;">lbchomesafety@gmail.com</a>');
  }

  // Predefined Knowledge Engine (Strictly complies with rules: no fake stats, no fake pricing)
  function generateAiResponse(rawQuery) {
    const q = rawQuery.toLowerCase();

    // 1. Price / Cost / Quote queries (MUST use the exact specified phrasing)
    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('quote') || q.includes('quotation') || q.includes('charge') || q.includes('fee') || q.includes('discount')) {
      return "Please contact LBC Home Safety at +91 75640 86196 or +91 878 907 9389 for the latest quotation.";
    }

    // 2. Invisible Grill
    if (q.includes('invisible') || q.includes('grill') || q.includes('balcony grill')) {
      return "LBC Home Safety installs professional Invisible Grills for balconies, windows, and suitable open spaces. They provide essential safety while maintaining unobstructed outdoor views and modern aesthetics. For measurement and details, call +91 75640 86196 or +91 878 907 9389.";
    }

    // 3. Bird Net / Pigeon Net
    if (q.includes('bird') || q.includes('pigeon') || q.includes('kabootar') || q.includes('droppings')) {
      return "Our Bird Net installation service protects balconies, windows, and open ducts from pigeons and birds without blocking natural light or ventilation. It helps keep your premises hygienic and clean. Call +91 75640 86196 or +91 878 907 9389.";
    }

    // 4. Safety Net / Child / Pet Safety
    if (q.includes('safety net') || q.includes('child') || q.includes('kid') || q.includes('pet') || q.includes('fall')) {
      return "LBC Home Safety provides reliable Safety Net installation for balconies, windows, and open galleries to create a dependable barrier protecting children and pets from accidental falls. Call +91 75640 86196 or +91 878 907 9389 to schedule a site measurement.";
    }

    // 5. Sports Net / Cricket
    if (q.includes('sport') || q.includes('cricket') || q.includes('football') || q.includes('badminton') || q.includes('turf') || q.includes('box cricket')) {
      return "We install durable Sports Nets for cricket practice pitches, football enclosures, badminton courts, and multi-sport setups on rooftops and grounds. Call +91 75640 86196 or +91 878 907 9389 for details.";
    }

    // 6. Service Areas / Locations
    if (q.includes('area') || q.includes('location') || q.includes('city') || q.includes('patna') || q.includes('kolkata') || q.includes('muzaffarpur') || q.includes('danapur') || q.includes('darbhanga') || q.includes('vaishali') || q.includes('bihar')) {
      return "LBC Home Safety provides services in Patna (Primary Office), Kolkata (West Bengal), and selected areas of Bihar including Muzaffarpur, Danapur, Darbhanga, and Vaishali. Reach us at +91 75640 86196 or +91 878 907 9389.";
    }

    // 7. Contact / Phone / Email / Office
    if (q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('call') || q.includes('email') || q.includes('office') || q.includes('address')) {
      return "LBC Home Safety\nPrimary Office: Patna, Bihar, India\nPhone: +91 75640 86196 | +91 878 907 9389\nEmail: lbchomesafety@gmail.com\n\nYou can reach us directly via Call or WhatsApp anytime.";
    }

    // 8. Installation Process / How it works / Site visit
    if (q.includes('process') || q.includes('how it works') || q.includes('step') || q.includes('site visit') || q.includes('measure') || q.includes('book')) {
      return "Our installation process has 4 simple steps:\n1. Contact LBC Home Safety\n2. Discuss your requirement\n3. Site visit & measurement\n4. Professional installation\n\nCall +91 75640 86196 or +91 878 907 9389 to arrange a visit.";
    }

    // Default polite response
    return "Hello! LBC Home Safety provides professional Invisible Grill, Bird Net, Safety Net, and Sports Net installation services in Patna, Kolkata, and selected areas of Bihar. How can we assist you today? You can also call us directly at +91 75640 86196 or +91 878 907 9389.";
  }
}
