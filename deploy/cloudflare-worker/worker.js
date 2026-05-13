// =====================================================================
// Komuny Chat - Cloudflare Worker
// =====================================================================
// chat.komuny.org -> librechat-production-e10b.up.railway.app
//
// Funciones del Worker:
// 1. Reverse proxy hacia Railway con override del Host header
// 2. Espanol como idioma default (localStorage i18nextLng=es)
// 3. Tutorial inicial en primer login (4 pasos)
// 4. Branding Komuny: reemplaza favicons + logo del login + textos LibreChat
//
// Deploy: PUT /accounts/{id}/workers/scripts/komuny-chat-proxy
// =====================================================================

const BACKEND_HOST = 'librechat-production-e10b.up.railway.app';
const DEFAULT_LANG = 'es';

// Version para cache busting de assets de logo
const LOGO_VERSION = 'v3-rebranding-2026-05-12';

// URLs de assets de Komuny (servidos desde komuny.org)
const KOMUNY_FAVICON_32_URL = `https://www.komuny.org/favicon-32x32.png?v=${LOGO_VERSION}`;
const KOMUNY_FAVICON_16_URL = `https://www.komuny.org/favicon-16x16.png?v=${LOGO_VERSION}`;
const KOMUNY_APPLE_TOUCH_URL = `https://www.komuny.org/apple-touch-icon.png?v=${LOGO_VERSION}`;
const KOMUNY_MASKABLE_URL = `https://www.komuny.org/icons/icon-maskable-512x512.png?v=${LOGO_VERSION}`;
const KOMUNY_ISOLOGO_URL = `https://www.komuny.org/icons/icon-512x512.png?v=${LOGO_VERSION}`;

// Logo completo Komuny con texto negro (para login screen)
const KOMUNY_LOGO_BLACK_URL = `https://www.komuny.org/komuny-logo-black-text-transparent.png?v=${LOGO_VERSION}`;

// Mapping de paths Railway -> assets Komuny
// NO mapeamos /assets/logo.svg porque LibreChat NO lo sirve como archivo
// (es SVG inline en React), y mapearlo causaba broken image (X roja)
const LOGO_PATH_MAP = {
  '/assets/favicon-32x32.png': KOMUNY_FAVICON_32_URL,
  '/assets/favicon-16x16.png': KOMUNY_FAVICON_16_URL,
  '/assets/apple-touch-icon-180x180.png': KOMUNY_APPLE_TOUCH_URL,
  '/assets/apple-touch-icon.png': KOMUNY_APPLE_TOUCH_URL,
  '/assets/maskable-icon.png': KOMUNY_MASKABLE_URL,
  '/favicon.ico': KOMUNY_FAVICON_32_URL,
  '/favicon-32x32.png': KOMUNY_FAVICON_32_URL,
  '/favicon-16x16.png': KOMUNY_FAVICON_16_URL,
  '/apple-touch-icon.png': KOMUNY_APPLE_TOUCH_URL,
  // Asset propio servido por el Worker para uso en injected scripts
  '/assets/komuny-logo.png': KOMUNY_LOGO_BLACK_URL,
  '/assets/komuny-isologo.png': KOMUNY_ISOLOGO_URL,
};

// Script bootstrap: i18n, tutorial, rebranding
const KOMUNY_BOOTSTRAP_SCRIPT = `<script>
(function() {
  try {
    // ===== 1. Idioma espanol por defecto =====
    if (!localStorage.getItem('i18nextLng')) {
      localStorage.setItem('i18nextLng', '${DEFAULT_LANG}');
    }
    document.documentElement.lang = '${DEFAULT_LANG}';

    // ===== 2. Rebranding: reemplaza logos y textos de LibreChat =====
    const KOMUNY_LOGO = '/assets/komuny-logo.png';
    const KOMUNY_ISOLOGO = '/assets/komuny-isologo.png';

    // Reemplaza el SVG del logo del login con imagen Komuny
    function replaceLoginLogo() {
      // LibreChat renderiza un SVG grande como logo del login.
      // Buscamos SVGs en el root del login screen (no en botones/iconos pequenos).
      const allSvgs = document.querySelectorAll('svg');
      let replaced = 0;

      allSvgs.forEach(function(svg) {
        // Solo reemplazar SVGs grandes (logo del login mide ~60-200px)
        const rect = svg.getBoundingClientRect();
        if (rect.width >= 50 && rect.width <= 250 && rect.height >= 50 && rect.height <= 250) {
          // Verificar que NO sea un icono dentro de un boton/control
          const parent = svg.parentElement;
          const grandparent = parent && parent.parentElement;
          // Si el SVG esta en un boton, link, o tiene clase de icono, skipear
          if (parent && (parent.tagName === 'BUTTON' || parent.tagName === 'A')) return;
          if (parent && parent.className && typeof parent.className === 'string' && /icon|button|btn/i.test(parent.className)) return;
          if (svg.getAttribute('data-komuny-replaced')) return;

          // Reemplazar el SVG con un img Komuny
          const img = document.createElement('img');
          img.src = KOMUNY_LOGO;
          img.alt = 'Komuny Chat';
          img.style.cssText =
            'width: auto; max-width: 280px; height: ' + rect.height + 'px; object-fit: contain; display: block;';
          img.setAttribute('data-komuny-replaced', '1');
          svg.style.display = 'none';
          svg.parentNode.insertBefore(img, svg.nextSibling);
          svg.setAttribute('data-komuny-replaced', '1');
          replaced++;
        }
      });
      return replaced;
    }

    // Reemplaza todo texto "LibreChat" por "Komuny Chat" en el DOM
    function replaceLibreChatText() {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
      const nodesToReplace = [];
      let node;
      while ((node = walker.nextNode())) {
        const t = node.nodeValue;
        if (t && (/LibreChat/i.test(t) || /Every AI for Everyone/i.test(t))) {
          nodesToReplace.push(node);
        }
      }
      nodesToReplace.forEach(function(n) {
        n.nodeValue = n.nodeValue
          .replace(/LibreChat/gi, 'Komuny Chat')
          .replace(/Every AI for Everyone/gi, 'Asistente IA pedagogico para LATAM');
      });
      return nodesToReplace.length;
    }

    // Aplicar rebranding cada vez que el DOM cambia
    function applyRebranding() {
      try {
        replaceLoginLogo();
        replaceLibreChatText();
      } catch (e) {}
    }

    // MutationObserver para reaplicar rebranding en cada cambio
    function startObserver() {
      if (!window.MutationObserver) return;
      const observer = new MutationObserver(function(mutations) {
        // Debounce
        if (window.__komunyRebrandTimer) clearTimeout(window.__komunyRebrandTimer);
        window.__komunyRebrandTimer = setTimeout(applyRebranding, 100);
      });
      observer.observe(document.body, { childList: true, subtree: true, characterData: true });

      // Aplicar tambien inmediatamente
      applyRebranding();
      setTimeout(applyRebranding, 500);
      setTimeout(applyRebranding, 1500);
      setTimeout(applyRebranding, 3000);
    }

    // ===== 3. Tutorial inicial - primer login =====
    function shouldShowTutorial() {
      if (localStorage.getItem('komuny_tutorial_done')) return false;
      const hasToken = Object.keys(localStorage).some(function(k) { return k.includes('token'); });
      return hasToken;
    }

    function showKomunyTutorial() {
      if (document.getElementById('komuny-tutorial')) return;
      const overlay = document.createElement('div');
      overlay.id = 'komuny-tutorial';
      overlay.innerHTML = \`
        <style>
          #komuny-tutorial { position: fixed; inset: 0; background: rgba(0,0,0,0.75); z-index: 99999;
            display: flex; align-items: center; justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1A1208; }
          #komuny-tutorial .kt-modal { background: #F5F0E8; max-width: 560px; width: 90%; max-height: 85vh;
            border-radius: 16px; padding: 32px; overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.4); border: 2px solid #D8D0C0; }
          #komuny-tutorial h2 { font-size: 24px; margin: 0 0 8px 0; color: #D4622A; font-weight: 700; }
          #komuny-tutorial p { margin: 0 0 12px 0; line-height: 1.6; font-size: 15px; }
          #komuny-tutorial .kt-step { color: #5C5040; font-size: 13px; margin-bottom: 16px; }
          #komuny-tutorial .kt-tip { background: #FBE9DF; padding: 12px 16px; border-radius: 8px;
            border-left: 4px solid #D4622A; margin: 16px 0; font-size: 14px; }
          #komuny-tutorial ul { padding-left: 20px; margin: 8px 0; }
          #komuny-tutorial li { margin: 6px 0; line-height: 1.5; }
          #komuny-tutorial .kt-buttons { display: flex; justify-content: space-between; margin-top: 24px; gap: 12px; }
          #komuny-tutorial button { padding: 10px 20px; border-radius: 8px; border: none;
            font-size: 14px; font-weight: 600; cursor: pointer; transition: opacity 0.2s; }
          #komuny-tutorial button:hover { opacity: 0.85; }
          #komuny-tutorial .kt-primary { background: #D4622A; color: white; flex: 1; }
          #komuny-tutorial .kt-secondary { background: transparent; color: #5C5040; border: 1px solid #D8D0C0; }
          #komuny-tutorial a { color: #D4622A; text-decoration: underline; }
        </style>
        <div class="kt-modal">
          <div class="kt-step">Paso <span id="kt-current">1</span> de 4</div>
          <div id="kt-content"></div>
          <div class="kt-buttons">
            <button class="kt-secondary" id="kt-skip">Saltar tutorial</button>
            <button class="kt-primary" id="kt-next">Siguiente</button>
          </div>
        </div>
      \`;
      const steps = [
        { title: 'Bienvenido a Komuny Chat',
          body: '<p>Soy tu asistente IA pedagogico, construido por <strong>Napsix.AI</strong> para educadores de America Latina.</p><div class="kt-tip">Usa <strong>Claude (Anthropic)</strong>, pagado por Komuny.</div>' },
        { title: '6 asistentes especializados',
          body: '<p>En el selector arriba tenes 6 asistentes ya configurados:</p><ul><li><strong>Asistente Komuny</strong></li><li><strong>Generador de Rubricas</strong></li><li><strong>Planificador de Clases</strong></li><li><strong>Simplificador de Textos</strong></li><li><strong>Detector de Sesgos</strong></li><li><strong>Banco de Preguntas Bloom</strong></li></ul>' },
        { title: 'Adaptacion regional',
          body: '<p>Guarda tu pais y nivel educativo en el perfil (icono superior derecho). Los asistentes adaptaran vocabulario y marco curricular (NAP, Aprendizajes Clave, DBA, Bases Curriculares).</p>' },
        { title: 'Privacidad y buenas practicas',
          body: '<p><strong>No ingreses datos personales de estudiantes.</strong> Usa contextos anonimos.</p><div class="kt-tip">📚 <a href="https://github.com/german-gimenez/komuny/blob/main/templates/prompts-komuny-chat-latam.md" target="_blank">Pack de 12 prompts listos</a></div>' }
      ];
      let currentStep = 0;
      document.body.appendChild(overlay);
      function renderStep() {
        document.getElementById('kt-current').textContent = (currentStep + 1).toString();
        const step = steps[currentStep];
        document.getElementById('kt-content').innerHTML = '<h2>' + step.title + '</h2>' + step.body;
        document.getElementById('kt-next').textContent = currentStep === steps.length - 1 ? 'Empezar' : 'Siguiente';
      }
      function closeTutorial() {
        localStorage.setItem('komuny_tutorial_done', '1');
        overlay.remove();
      }
      document.getElementById('kt-next').addEventListener('click', function() {
        if (currentStep < steps.length - 1) { currentStep++; renderStep(); } else { closeTutorial(); }
      });
      document.getElementById('kt-skip').addEventListener('click', closeTutorial);
      renderStep();
    }

    function waitForLogin() {
      let attempts = 0;
      const interval = setInterval(function() {
        attempts++;
        if (shouldShowTutorial()) {
          clearInterval(interval);
          setTimeout(showKomunyTutorial, 800);
        } else if (attempts > 60) {
          clearInterval(interval);
        }
      }, 1000);
    }

    // ===== Boot =====
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        startObserver();
        waitForLogin();
      });
    } else {
      startObserver();
      waitForLogin();
    }
  } catch (e) {
    console.error('[Komuny] bootstrap error:', e);
  }
})();
</script>`;

class LangInjector {
  element(element) {
    element.append(KOMUNY_BOOTSTRAP_SCRIPT, { html: true });
  }
}

class HtmlLangSetter {
  element(element) {
    element.setAttribute('lang', DEFAULT_LANG);
  }
}

// Reemplaza el <title> de LibreChat por Komuny Chat
class TitleRewriter {
  element(element) {
    element.setInnerContent('Komuny Chat');
  }
}

// Reemplaza meta description de LibreChat
class MetaDescriptionRewriter {
  element(element) {
    if (element.getAttribute('name') === 'description') {
      element.setAttribute(
        'content',
        'Komuny Chat - Asistente IA pedagogico para educadores de America Latina, construido por Napsix.AI'
      );
    }
  }
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Interceptar assets de logo/favicon
    if (LOGO_PATH_MAP[pathname]) {
      const komunyAssetUrl = LOGO_PATH_MAP[pathname];
      const assetResponse = await fetch(komunyAssetUrl, {
        cf: { cacheTtl: 3600, cacheEverything: true },
      });

      return new Response(assetResponse.body, {
        status: assetResponse.status,
        headers: {
          'Content-Type': assetResponse.headers.get('content-type') || 'image/png',
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*',
          'X-Komuny-Logo-Version': LOGO_VERSION,
        },
      });
    }

    // Reverse proxy a Railway
    url.host = BACKEND_HOST;

    const proxyRequest = new Request(url.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'manual',
    });
    proxyRequest.headers.set('Host', BACKEND_HOST);

    const response = await fetch(proxyRequest);

    // Transformar HTML del index para inyectar bootstrap + rebranding
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      return new HTMLRewriter()
        .on('html', new HtmlLangSetter())
        .on('title', new TitleRewriter())
        .on('meta', new MetaDescriptionRewriter())
        .on('head', new LangInjector())
        .transform(response);
    }

    return response;
  },
};
