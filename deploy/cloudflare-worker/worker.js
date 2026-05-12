// =====================================================================
// Komuny Chat - Cloudflare Worker reverse proxy + español por defecto
// =====================================================================
// chat.komuny.org -> librechat-production-e10b.up.railway.app
//
// Funciones del Worker:
// 1. Reverse proxy hacia Railway con override del Host header
// 2. Inyecta script en el HTML que fuerza español como idioma default
//    (LibreChat detecta browser locale por defecto, este script lo
//    setea a 'es' antes de que React monte)
//
// Deploy:
//   wrangler deploy
//   o via API: PUT /accounts/{id}/workers/scripts/komuny-chat-proxy
// =====================================================================

const BACKEND_HOST = 'librechat-production-e10b.up.railway.app';
const DEFAULT_LANG = 'es';

// Script que se inyecta en el HTML antes del React mount.
// Setea localStorage i18nextLng = 'es' si no esta seteado.
// Tambien fuerza el atributo lang="es" en <html>.
const LOCALE_INJECT_SCRIPT = `<script>
(function() {
  try {
    if (!localStorage.getItem('i18nextLng')) {
      localStorage.setItem('i18nextLng', '${DEFAULT_LANG}');
    }
    document.documentElement.lang = '${DEFAULT_LANG}';
  } catch (e) {}
})();
</script>`;

class LangInjector {
  element(element) {
    element.append(LOCALE_INJECT_SCRIPT, { html: true });
  }
}

class HtmlLangSetter {
  element(element) {
    element.setAttribute('lang', DEFAULT_LANG);
  }
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    url.host = BACKEND_HOST;

    const proxyRequest = new Request(url.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'manual',
    });

    // Override del Host header para que Railway rutee al servicio LibreChat
    proxyRequest.headers.set('Host', BACKEND_HOST);

    const response = await fetch(proxyRequest);

    // Solo transformar HTML del index (para inyectar el locale script)
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      return new HTMLRewriter()
        .on('html', new HtmlLangSetter())
        .on('head', new LangInjector())
        .transform(response);
    }

    return response;
  },
};
