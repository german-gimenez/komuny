// =====================================================================
// Komuny Chat - Cloudflare Worker
// =====================================================================
// chat.komuny.org -> librechat-production-e10b.up.railway.app
//
// Funciones:
// 1. Reverse proxy hacia Railway con override del Host header
// 2. Inyecta español como idioma default (localStorage i18nextLng=es)
// 3. Inyecta tutorial inicial (modal overlay en primer login)
// 4. Reemplaza el logo de LibreChat con el de Komuny en login/header
//
// Deploy: PUT /accounts/{id}/workers/scripts/komuny-chat-proxy
// =====================================================================

const BACKEND_HOST = 'librechat-production-e10b.up.railway.app';
const DEFAULT_LANG = 'es';

// Logo de Komuny servido desde komuny.org
const KOMUNY_LOGO_URL = 'https://www.komuny.org/icons/icon-512x512.png';
const KOMUNY_FAVICON_32_URL = 'https://www.komuny.org/favicon-32x32.png';
const KOMUNY_FAVICON_16_URL = 'https://www.komuny.org/favicon-16x16.png';
const KOMUNY_APPLE_TOUCH_URL = 'https://www.komuny.org/apple-touch-icon.png';
const KOMUNY_MASKABLE_URL = 'https://www.komuny.org/icons/icon-maskable-512x512.png';

// Mapping de paths que deben ser reemplazados por el logo de Komuny
const LOGO_PATH_MAP = {
  '/assets/logo.svg': KOMUNY_LOGO_URL,
  '/assets/favicon-32x32.png': KOMUNY_FAVICON_32_URL,
  '/assets/favicon-16x16.png': KOMUNY_FAVICON_16_URL,
  '/assets/apple-touch-icon-180x180.png': KOMUNY_APPLE_TOUCH_URL,
  '/assets/apple-touch-icon.png': KOMUNY_APPLE_TOUCH_URL,
  '/assets/maskable-icon.png': KOMUNY_MASKABLE_URL,
  '/favicon.ico': KOMUNY_FAVICON_32_URL,
  '/favicon-32x32.png': KOMUNY_FAVICON_32_URL,
  '/favicon-16x16.png': KOMUNY_FAVICON_16_URL,
  '/apple-touch-icon.png': KOMUNY_APPLE_TOUCH_URL,
};

// Script bootstrap: idioma español + tutorial inicial
const KOMUNY_BOOTSTRAP_SCRIPT = `<script>
(function() {
  try {
    // 1. Idioma español por defecto
    if (!localStorage.getItem('i18nextLng')) {
      localStorage.setItem('i18nextLng', '${DEFAULT_LANG}');
    }
    document.documentElement.lang = '${DEFAULT_LANG}';

    // 2. Tutorial inicial - se muestra una sola vez al primer login
    function shouldShowTutorial() {
      if (localStorage.getItem('komuny_tutorial_done')) return false;
      const hasToken = Object.keys(localStorage).some(k => k.includes('token'));
      return hasToken;
    }

    function showKomunyTutorial() {
      if (document.getElementById('komuny-tutorial')) return;

      const overlay = document.createElement('div');
      overlay.id = 'komuny-tutorial';
      overlay.innerHTML = \`
        <style>
          #komuny-tutorial {
            position: fixed; inset: 0; background: rgba(0,0,0,0.75);
            z-index: 99999; display: flex; align-items: center; justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            color: #1A1208;
          }
          #komuny-tutorial .kt-modal {
            background: #F5F0E8; max-width: 560px; width: 90%; max-height: 85vh;
            border-radius: 16px; padding: 32px; overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.4);
            border: 2px solid #D8D0C0;
          }
          #komuny-tutorial h2 {
            font-size: 24px; margin: 0 0 8px 0; color: #D4622A;
            font-weight: 700;
          }
          #komuny-tutorial h3 {
            font-size: 18px; margin: 24px 0 8px 0; color: #1A1208;
          }
          #komuny-tutorial p { margin: 0 0 12px 0; line-height: 1.6; font-size: 15px; }
          #komuny-tutorial .kt-step { color: #5C5040; font-size: 13px; margin-bottom: 16px; }
          #komuny-tutorial .kt-tip {
            background: #FBE9DF; padding: 12px 16px; border-radius: 8px;
            border-left: 4px solid #D4622A; margin: 16px 0; font-size: 14px;
          }
          #komuny-tutorial ul { padding-left: 20px; margin: 8px 0; }
          #komuny-tutorial li { margin: 6px 0; line-height: 1.5; }
          #komuny-tutorial .kt-buttons {
            display: flex; justify-content: space-between; margin-top: 24px;
            gap: 12px;
          }
          #komuny-tutorial button {
            padding: 10px 20px; border-radius: 8px; border: none;
            font-size: 14px; font-weight: 600; cursor: pointer;
            transition: opacity 0.2s;
          }
          #komuny-tutorial button:hover { opacity: 0.85; }
          #komuny-tutorial .kt-primary {
            background: #D4622A; color: white; flex: 1;
          }
          #komuny-tutorial .kt-secondary {
            background: transparent; color: #5C5040;
            border: 1px solid #D8D0C0;
          }
          #komuny-tutorial a { color: #D4622A; text-decoration: underline; }
        </style>
        <div class="kt-modal">
          <div class="kt-step">Paso <span id="kt-current">1</span> de 4</div>
          <div id="kt-content"></div>
          <div class="kt-buttons">
            <button class="kt-secondary" id="kt-skip">Saltar tutorial</button>
            <button class="kt-primary" id="kt-next">Siguiente →</button>
          </div>
        </div>
      \`;

      const steps = [
        {
          title: '¡Bienvenido a Komuny Chat!',
          body: \`
            <p>Soy tu asistente IA pedagogico, construido por <strong>Napsix.AI</strong>
            para educadores de America Latina.</p>
            <p>Voy a guiarte en 4 pasos breves para que aproveches al maximo
            la plataforma.</p>
            <div class="kt-tip">
              🎯 <strong>Usa Claude (Anthropic)</strong> — uno de los modelos
              IA mas potentes del mundo, pagado por Komuny.
            </div>
          \`
        },
        {
          title: '6 asistentes especializados',
          body: \`
            <p>En la parte superior tenes un selector de modelo con asistentes
            ya configurados:</p>
            <ul>
              <li><strong>Asistente Komuny</strong> - consultas generales</li>
              <li><strong>Generador de Rubricas</strong> - evaluacion estructurada</li>
              <li><strong>Planificador de Clases</strong> - secuencias didacticas</li>
              <li><strong>Simplificador de Textos</strong> - adaptar para distintos niveles</li>
              <li><strong>Detector de Sesgos</strong> - revisar con perspectiva critica</li>
              <li><strong>Banco de Preguntas Bloom</strong> - por nivel cognitivo</li>
            </ul>
            <div class="kt-tip">
              💡 Cada asistente esta optimizado con instrucciones especificas
              para su tarea.
            </div>
          \`
        },
        {
          title: 'Adaptacion regional',
          body: \`
            <p>Komuny Chat se adapta a tu pais. Guarda tu informacion en el
            perfil (icono superior derecho → Configuracion → Personalizacion):</p>
            <ul>
              <li><strong>Pais</strong>: AR, MX, CO, CL, UY, PE, BO, EC...</li>
              <li><strong>Nivel educativo</strong>: primaria, secundaria, universidad</li>
              <li><strong>Materias</strong> que enseñas</li>
            </ul>
            <p>Los asistentes adaptaran vocabulario, marco curricular y referencias
            a tu region (NAP, Aprendizajes Clave, DBA, Bases Curriculares, etc).</p>
          \`
        },
        {
          title: 'Privacidad y buenas practicas',
          body: \`
            <p><strong>🛑 Importante:</strong> No ingreses datos personales de
            estudiantes (nombres, DNI, fotos). Usa contextos anonimos.</p>
            <p><strong>✅ Si:</strong> "un estudiante de 12 años con dificultades
            de lectura..."<br>
            <strong>❌ No:</strong> "Juan Perez, DNI 12345678, calificacion 4..."</p>
            <p>Recorda siempre <strong>revisar lo que genera la IA</strong> antes
            de usarlo en clase o compartir con familias.</p>
            <div class="kt-tip">
              📚 <a href="https://github.com/german-gimenez/komuny/blob/main/templates/prompts-komuny-chat-latam.md" target="_blank" rel="noopener">Pack de 12 prompts listos para usar →</a>
            </div>
          \`
        }
      ];

      let currentStep = 0;
      document.body.appendChild(overlay);

      function renderStep() {
        document.getElementById('kt-current').textContent = (currentStep + 1).toString();
        const step = steps[currentStep];
        document.getElementById('kt-content').innerHTML =
          '<h2>' + step.title + '</h2>' + step.body;
        const nextBtn = document.getElementById('kt-next');
        nextBtn.textContent = currentStep === steps.length - 1 ? '¡Empezar! 🚀' : 'Siguiente →';
      }

      function closeTutorial() {
        localStorage.setItem('komuny_tutorial_done', '1');
        overlay.remove();
      }

      document.getElementById('kt-next').addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
          currentStep++;
          renderStep();
        } else {
          closeTutorial();
        }
      });

      document.getElementById('kt-skip').addEventListener('click', closeTutorial);

      renderStep();
    }

    function waitForLogin() {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (shouldShowTutorial()) {
          clearInterval(interval);
          setTimeout(showKomunyTutorial, 800);
        } else if (attempts > 60) {
          clearInterval(interval);
        }
      }, 1000);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', waitForLogin);
    } else {
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

// Reemplaza el src del logo en el HTML
class LogoRewriter {
  element(element) {
    const src = element.getAttribute('src');
    if (src && LOGO_PATH_MAP[src]) {
      element.setAttribute('src', LOGO_PATH_MAP[src]);
    }
  }
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Interceptar requests al logo y favicons - servir desde komuny.org
    if (LOGO_PATH_MAP[pathname]) {
      const komunyAssetUrl = LOGO_PATH_MAP[pathname];
      const assetResponse = await fetch(komunyAssetUrl, {
        cf: { cacheTtl: 86400, cacheEverything: true },
      });

      // Devolver con cache headers correctos
      return new Response(assetResponse.body, {
        status: assetResponse.status,
        headers: {
          'Content-Type': assetResponse.headers.get('content-type') || 'image/png',
          'Cache-Control': 'public, max-age=86400',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Resto de requests: reverse proxy a Railway
    url.host = BACKEND_HOST;

    const proxyRequest = new Request(url.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'manual',
    });

    proxyRequest.headers.set('Host', BACKEND_HOST);

    const response = await fetch(proxyRequest);

    // Solo transformar HTML del index para inyectar bootstrap + reemplazar logo
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      return new HTMLRewriter()
        .on('html', new HtmlLangSetter())
        .on('head', new LangInjector())
        .on('img', new LogoRewriter())
        .on('link[rel="icon"]', new LogoRewriter())
        .on('link[rel="apple-touch-icon"]', new LogoRewriter())
        .on('link[rel="shortcut icon"]', new LogoRewriter())
        .transform(response);
    }

    return response;
  },
};
