// =====================================================================
// Komuny Chat - Cloudflare Worker reverse proxy
// =====================================================================
// chat.komuny.org -> librechat-production-e10b.up.railway.app
//
// Por que existe este Worker:
// Railway emite SSL Let's Encrypt automatico para custom domains, pero
// hubo problemas de rate limit y validacion con nuestro setup. Mientras
// se resuelve, este Worker actua como reverse proxy transparente:
// - Cloudflare sirve el cert Universal SSL para *.komuny.org (gratis)
// - El Worker reescribe el Host header al backend Railway
// - Railway rutea correctamente a LibreChat
//
// Deploy:
//   wrangler deploy
//   o via API: PUT /accounts/{id}/workers/scripts/komuny-chat-proxy
//
// Custom Domain:
//   chat.komuny.org -> Worker (creado via API Workers Domains)
// =====================================================================

const BACKEND_HOST = 'librechat-production-e10b.up.railway.app';

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Apuntar al backend Railway manteniendo path + query
    url.host = BACKEND_HOST;

    // Nuevo request hacia el backend
    const proxyRequest = new Request(url.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'manual',
    });

    // Override del Host header para que Railway rutee a LibreChat
    proxyRequest.headers.set('Host', BACKEND_HOST);

    return fetch(proxyRequest);
  },
};
