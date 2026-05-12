# Komuny Chat - Deploy en Railway

Configuracion de **LibreChat** para `chat.komuny.org`, el chat IA completo
para educadores de Komuny Edu.

> **Nota arquitectonica:** `chat.komuny.org` no apunta directo a Railway.
> Pasa por un **Cloudflare Worker** que actua como reverse proxy hacia
> `librechat-production-e10b.up.railway.app`. Ver `../cloudflare-worker/README.md`
> para detalles.

## Archivos en esta carpeta

| Archivo | Proposito |
|---------|-----------|
| `librechat.yaml` | Config principal: branding + 6 presets de docente con Claude Haiku/Sonnet |
| `.env.komuny.example` | Template de variables de entorno para Railway |
| `README.md` | Esta guia |

## Stack desplegado

LibreChat en Railway provisiona 5 servicios:

| Servicio | Funcion |
|----------|---------|
| **LibreChat** (Node + React) | App principal de chat |
| **MongoDB** | Conversaciones, usuarios, presets |
| **Meilisearch** | Busqueda full-text en chats |
| **VectorDB** (pgvector) | Embeddings para RAG |
| **RAG API** | Procesa PDFs y archivos subidos |

## Quick start

### 1. Deploy template en Railway

```
https://railway.com/deploy/librechat-official
```

Click "Deploy on Railway" → login con GitHub → espera ~8 min al build.

### 2. Subir `librechat.yaml`

En Railway → servicio LibreChat → Settings → Source → conectar este repo
o subir el archivo `librechat.yaml` via Volumes.

Alternativa: pegarlo como variable de entorno multilinea (no recomendado).

### 3. Configurar variables de entorno

En Railway → servicio LibreChat → Variables → pegar el contenido de
`.env.komuny.example` y reemplazar los `changeme` por valores reales.

**CRITICO regenerar antes de productivo:**
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `CREDS_KEY` (32 bytes hex)
- `CREDS_IV` (16 bytes hex)

Generar con:
```bash
# Linux/Mac
openssl rand -hex 32   # JWT_SECRET, JWT_REFRESH_SECRET, CREDS_KEY
openssl rand -hex 16   # CREDS_IV

# PowerShell
-join ((1..32) | %{ '{0:x2}' -f (Get-Random -Maximum 256) })  # 32 bytes hex
-join ((1..16) | %{ '{0:x2}' -f (Get-Random -Maximum 256) })  # 16 bytes hex
```

### 4. Configurar dominio `chat.komuny.org`

**En Railway** → servicio LibreChat → Settings → Networking:
1. Generate Domain (`librechat-xxxx.up.railway.app`)
2. Custom Domain → ingresar `chat.komuny.org`
3. Railway te da un CNAME

**En Vercel** (DNS del dominio `komuny.org`):
- Agregar registro `CNAME` con name=`chat` value=`<el-cname-de-railway>`
- Esperar ~5 min para SSL automatico

### 5. Obtener API keys de modelos

Opciones para `VERCEL_AI_GATEWAY_KEY`:
1. Vercel Dashboard → AI Gateway → crear key
2. Permite usar zai/glm-4.7-flash + claude-sonnet-4 + gpt-5 etc. con un solo key

Si no quieres usar AI Gateway, comentar el endpoint custom en `librechat.yaml`
y setear `OPENAI_API_KEY=user_provided` y `ANTHROPIC_API_KEY=user_provided`.

### 6. Setup OAuth Google (opcional pero recomendado)

1. https://console.cloud.google.com → crear proyecto "Komuny Chat"
2. APIs y servicios → Credenciales → crear OAuth 2.0 Client ID
3. Tipo: aplicacion web
4. Authorized redirect URI: `https://chat.komuny.org/oauth/google/callback`
5. Copiar Client ID y Secret a Railway env vars

### 7. Primer login y testing

1. Ir a `https://chat.komuny.org`
2. Registrarse → el primer usuario se vuelve admin automaticamente
3. Probar cada uno de los 5 presets
4. Subir un PDF y probar el RAG (deberia responder citando el archivo)
5. Crear segundo usuario y verificar permisos

## Diferenciacion con KomIA (komuny.org)

| Caracteristica | KomIA (komuny.org) | Komuny Chat (chat.komuny.org) |
|----------------|---------------------|-------------------------------|
| UI | Drawer flotante | App completa tipo ChatGPT |
| Auth | Sin login | Email + Google OAuth |
| Historial | No persistente | Todas las conversaciones guardadas |
| Modelos | glm-4.7-flash unico | Multi-modelo (glm, claude, gpt) |
| Skills | 5 herramientas curadas | 5 presets + chat libre |
| RAG | No | Si (sube PDFs y conversa) |
| Agents | No | Si (constructor de agentes) |
| Web search | No | Opcional (Tavily) |
| MCP | No | Si |
| Target | Educadores nuevos a IA | Educadores power user |

## Costos estimados

| Item | Costo mensual |
|------|---------------|
| Railway (5 servicios) | ~$20-35 |
| Vercel AI Gateway (glm-4.7-flash) | Pay per use (~$0.0002/1K tokens) |
| Email Resend (free tier) | $0 |
| Google OAuth | $0 |
| **Total minimo** | **~$25-40/mes** |

## Troubleshooting

**LibreChat no levanta:**
- Verificar que MONGO_URI esta correcto (Railway lo inyecta automaticamente)
- Revisar logs del servicio LibreChat
- Confirmar que JWT_SECRET/CREDS_KEY estan seteados (no vacios)

**Modelos no aparecen en el selector:**
- Verificar que `VERCEL_AI_GATEWAY_KEY` esta seteado
- Revisar que el `librechat.yaml` esta en la ruta correcta (`CONFIG_PATH`)
- En logs deberia decir "Loaded custom endpoint: Komuny AI Gateway"

**RAG no funciona al subir PDFs:**
- Verificar `RAG_OPENAI_API_KEY` (NO puede ser user_provided, debe ser real)
- Confirmar que el servicio RAG API esta corriendo
- pgvector debe estar healthy

**Google OAuth no funciona:**
- El callback URL debe coincidir exactamente: `https://chat.komuny.org/oauth/google/callback`
- En Google Console, el dominio `chat.komuny.org` debe estar verificado o en testing
- `ALLOW_SOCIAL_LOGIN=true` y `ALLOW_SOCIAL_REGISTRATION=true`

## Links

- LibreChat docs: https://www.librechat.ai/docs
- Railway template: https://railway.com/deploy/librechat-official
- LibreChat repo: https://github.com/danny-avila/LibreChat
- Komuny web: https://komuny.org
- Komuny repo publico: https://github.com/german-gimenez/komuny

---

*Komuny Edu — Napsix.AI — German Gimenez*
