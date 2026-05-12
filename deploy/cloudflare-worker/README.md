# Komuny Chat - Cloudflare Worker

Reverse proxy que sirve `chat.komuny.org` con SSL Universal de Cloudflare
hacia el backend Railway de LibreChat.

## Arquitectura

```
Browser
  |
  v HTTPS (cert: CN=komuny.org, Let's Encrypt via Cloudflare)
[Cloudflare Edge]
  |
  v Worker: komuny-chat-proxy
  | - Reescribe Host header al backend Railway
  |
  v HTTPS
[Railway: librechat-production-e10b.up.railway.app]
  |
  v
LibreChat (Komuny Chat branding + Anthropic Claude)
```

## Por que existe

Railway emite SSL Let's Encrypt automatico para custom domains, pero
en nuestro setup tuvimos problemas de rate limit y validacion con Let's
Encrypt despues de varios delete/recreate del custom domain. El Worker
actua como reverse proxy transparente:

- Cloudflare sirve el cert Universal SSL para `*.komuny.org` (gratis, ilimitado)
- El Worker reescribe el `Host` header al backend Railway al originar la peticion
- Railway recibe `Host: librechat-production-e10b.up.railway.app` y rutea a LibreChat
- El user en el browser ve `chat.komuny.org` con cert Cloudflare valido

## Costos

Cloudflare Workers Free tier:
- **100,000 requests/dia** incluidos gratis
- CPU time: 10ms/request limite

Para Komuny Chat con educadores activos, es ampliamente suficiente.

## Deploy via Wrangler CLI

```bash
# Login (interactivo)
wrangler login

# Deploy
wrangler deploy
```

## Deploy via API (sin wrangler)

```bash
# Variables necesarias
CF_TOKEN="cfut_..."           # Token con scope: Workers Scripts Edit
CF_ACCOUNT_ID="2ea3d43050ece00f3beca49a4bc4bc71"
ZONE_ID="d76e5a6105179b9a8a6dc4b02c3acbc5"  # zone komuny.org

# 1. Subir el Worker
echo '{"main_module":"worker.js","compatibility_date":"2024-12-01"}' > metadata.json

curl -X PUT \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/workers/scripts/komuny-chat-proxy" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -F "metadata=@metadata.json;type=application/json" \
  -F "worker.js=@worker.js;type=application/javascript+module"

# 2. Asignar custom domain (asegurate que el CNAME chat.komuny.org NO exista antes)
curl -X PUT \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/workers/domains" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"environment\":\"production\",\"hostname\":\"chat.komuny.org\",\"service\":\"komuny-chat-proxy\",\"zone_id\":\"$ZONE_ID\"}"
```

## Verificacion end-to-end

```bash
# Status 200 esperado
curl -I https://chat.komuny.org

# Branding Komuny en config
curl https://chat.komuny.org/api/config | grep appTitle
# -> "appTitle":"Komuny Chat"
```

## Mantenimiento

**Si cambia el backend Railway** (nuevo deploy a otra URL):
1. Editar `worker.js` y cambiar `BACKEND_HOST`
2. `wrangler deploy` o re-subir via API

**Si quieres dejar de usar el Worker y volver al custom domain Railway:**
1. Eliminar el custom domain del Worker:
   `DELETE /accounts/{id}/workers/domains/{domain_id}`
2. Crear custom domain en Railway dashboard
3. Cloudflare recreara el CNAME apuntando al target Railway
4. Esperar que Railway emita el cert Let's Encrypt

## Recursos

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Workers Custom Domains API](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
- [Workers Free Plan limits](https://developers.cloudflare.com/workers/platform/pricing/)
