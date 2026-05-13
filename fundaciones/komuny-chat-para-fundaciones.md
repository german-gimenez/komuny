# Komuny Chat para Fundaciones — Propuesta detallada

> Documento operativo para fundaciones interesadas en implementar
> Komuny Chat en su organizacion.

---

## Resumen ejecutivo

**Komuny Chat** es una plataforma IA conversacional open source (basada en
[LibreChat](https://www.librechat.ai/)) preconfigurada con asistentes pedagogicos,
modelos Anthropic Claude Opus 4.6 + Sonnet 4.6, agentes, MCPs y memoria.

**Para tu fundacion ofrecemos:**
1. Deployment con tu marca (white-label)
2. Presets pedagogicos a medida para tu programa
3. Acompañamiento integral de Napsix.AI
4. Programa [Anthropic for Nonprofits](https://claude.com/solutions/nonprofits)

---

## Que reciben tus usuarios

### Acceso a la plataforma
- URL propia: `chat.tu-fundacion.org`
- Login con email/contrasena o SSO institucional
- Disponible en navegador, mobile y como PWA instalable

### Presets incluidos
6 asistentes pre-cargados, listos para usar desde el primer dia:

1. **Asistente Komuny** — generalista pedagogico (default)
2. **Generador de Rubrica** — evaluacion estructurada
3. **Planificador de Clases** — secuencias didacticas
4. **Simplificador de Textos** — adaptacion lectora
5. **Detector de Sesgos** — revision inclusiva
6. **Banco de Preguntas Bloom** — diseno cognitivo

### Capacidades avanzadas
- **Agentes** con manejo de archivos, codigo y APIs
- **+20 MCP Servers** (GitHub, Stripe, HuggingFace, MySQL, etc.)
- **Artifacts** — React, HTML, Mermaid en chat
- **Memoria persistente** — contexto entre conversaciones
- **Web Search** — internet en vivo con reranking
- **Code Interpreter** — ejecutar codigo sin instalar nada
- **SSO/SAML/OAuth** — integracion con sistemas existentes

### Modelos Anthropic
- **Claude Opus 4.6** (default) — razonamiento profundo
- **Claude Sonnet 4.6** — velocidad + calidad balanceada
- Modelos seguros, alineados, ideales para educacion

---

## Que entregamos en la implementacion

### Fase 1 — Setup (semanas 1-2)
- Configuracion de instancia LibreChat en infraestructura acordada
- Branding completo: logo, colores, dominio, footer
- Setup de Anthropic API + creditos iniciales
- Configuracion de auth (email/SSO segun necesidad)
- Carga de los 6 presets pedagogicos base

### Fase 2 — Personalizacion (semanas 3-4)
- Diseno e implementacion de presets a medida
- Configuracion de MCPs especificos para tu fundacion
- Importacion de contenido Komuny (skills, glosario, prompts)
- Quality assurance pedagogica

### Fase 3 — Lanzamiento (semana 5)
- Capacitacion del equipo coordinador (4 hs)
- Webinar de lanzamiento para usuarios (1 hs)
- Material onboarding personalizado
- Soporte intensivo primeras 2 semanas

### Fase 4 — Operacion continua
- Soporte tecnico Tier 1
- Monitoreo y mejoras de presets segun uso real
- Reportes mensuales de actividad
- Upgrades de modelos cuando Anthropic publique nuevos
- Reuniones trimestrales de revision

---

## Estimacion de costos (referencia)

> Los costos finales dependen de cantidad de usuarios, frecuencia de uso,
> region de hosting y customizaciones. Esta es una estimacion para 500 usuarios
> activos mensuales con uso moderado.

### Costos variables (mensuales)
| Item | Estimado USD/mes |
|------|------------------|
| Creditos Anthropic Claude | 300 - 800 |
| Hosting (Vercel + DB) | 50 - 150 |
| Email/Auth services | 20 - 50 |

### Costos fijos
| Item | Estimado USD |
|------|--------------|
| Setup inicial Napsix.AI (one-time) | 2.500 - 5.000 |
| Soporte mensual Napsix.AI | 800 - 1.500 |
| Capacitacion equipo (one-time) | 500 - 1.000 |

**Total Año 1 estimado:** USD 15.000 - 28.000 para 500 usuarios activos.

### Reducciones disponibles
- **Anthropic for Nonprofits**: tu fundacion puede aplicar a programa de creditos reducidos.
- **Volumen LATAM**: tarifas Napsix.AI reducidas para implementaciones en region.
- **Open source**: cero costo de licencia (LibreChat es MIT).

---

## Stack tecnico detallado

```
┌─────────────────────────────────────────────────────┐
│                  USUARIO FINAL                       │
│              chat.tu-fundacion.org                   │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│         LibreChat (open source frontend)             │
│         Branded con tu fundacion                     │
│         Hosting: Vercel / Cloudflare / AWS           │
└─────────┬───────────────────────────┬───────────────┘
          │                           │
┌─────────▼──────────┐    ┌──────────▼────────────┐
│  PostgreSQL/Mongo  │    │  Anthropic API        │
│  (en tu region)    │    │  Claude Opus / Sonnet │
│  Conversaciones    │    │  Modelos seguros      │
└────────────────────┘    └───────────────────────┘
          │
┌─────────▼────────────────────────────────────────────┐
│  MCP Servers (extensiones modulares)                 │
│  GitHub | Stripe | HuggingFace | MySQL | DeepWiki    │
│  + tus propios MCPs custom                           │
└──────────────────────────────────────────────────────┘
```

### Auth flow
1. Usuario va a `chat.tu-fundacion.org`
2. Login con email/contrasena o SSO institucional (SAML/OAuth)
3. Acceso a chat con su perfil cargado
4. Sus conversaciones persisten en base de datos en tu region

### Privacidad y seguridad
- Conversaciones cifradas en transito (HTTPS) y en reposo
- No se usa data para entrenar modelos (politica Anthropic)
- Logs de acceso para auditoria
- Backup periodico configurable
- Compatible con GDPR/LGPD/LFPDPPP

---

## Roadmap tipico de adopcion

### Mes 1-2: Setup + lanzamiento piloto
- 50-100 usuarios early adopters
- Recoleccion intensiva de feedback
- Ajuste de presets a medida

### Mes 3-6: Expansion
- Ampliacion a 500+ usuarios
- Refinamiento de presets segun uso real
- Webinars de uso avanzado (Artifacts, MCPs, memoria)
- Casos de exito documentados

### Mes 7-12: Madurez
- Programa de "embajadores" entre los usuarios
- Presets nuevos creados por el equipo de la fundacion
- Integraciones con sistemas internos via MCPs custom
- Reportes de impacto educativo

---

## Ejemplos de presets a medida

### Ejemplo 1: "Tutor IES Mendoza"
Preset para becarios del IES 9-029:
- Adaptado al curriculo de formacion docente argentino
- Vocabulario y referencias regionales (Mendoza, Cuyo)
- Soporte para 4 carreras especificas
- Memoria de seguimiento academico

### Ejemplo 2: "Asistente de Coordinador Territorial"
Preset para staff de una fundacion social:
- Generacion de informes de campo
- Asistencia para planificacion comunitaria
- Conexion via MCP a Google Sheets de la fundacion
- Templates de comunicados con familias

### Ejemplo 3: "Tutor Bilingue Quechua-Espanol"
Preset para programas en region andina:
- Genera materiales bilingues
- Respeta cosmovision indigena
- Vocabulario y referencias quechuas

---

## Preguntas frecuentes

### ¿Komuny Chat reemplaza a otros chats IA?
No necesariamente. Es complementario. La diferencia: Komuny Chat viene
configurado especificamente para educacion en español, con presets pedagogicos
ya disenados, y con soporte de Napsix.AI.

### ¿Que pasa si Anthropic cambia precios o politicas?
LibreChat soporta multi-proveedor. Si necesitaramos cambiar de Anthropic a
otro proveedor (OpenAI, Google, etc.), la migracion es directa. Tu fundacion
no queda atada a un solo proveedor.

### ¿Tenemos que comprometer datos sensibles?
No. Komuny Chat puede correr enteramente en infraestructura controlada por
tu fundacion. Datos en tu region. No usamos data para entrenar.

### ¿Necesitamos un equipo tecnico?
No. Napsix.AI se encarga de toda la operacion tecnica. Tu fundacion necesita
solo un punto de contacto (coordinador) y poder definir necesidades pedagogicas.

### ¿Que pasa si crecemos rapido?
La infraestructura escala automaticamente. Mas usuarios = mas creditos Anthropic
+ ligero aumento en hosting. Sin cambios estructurales necesarios hasta 10.000+ usuarios.

### ¿Es compatible con nuestro LMS (Moodle/Classroom/Canvas)?
Si. Via MCPs custom podemos integrar Komuny Chat con tu LMS para que la IA
pueda consultar materiales, calificaciones, calendarios. Cada integracion se
disena en la fase de personalizacion.

---

## ¿Como avanzamos?

1. **Conversacion inicial (30 min)** — entendemos tu fundacion y necesidades
2. **Propuesta formal (1 semana)** — cotizacion concreta y roadmap
3. **Acuerdo y kick-off** — inicia fase 1
4. **Lanzamiento en 5 semanas**

**Contacto:** [hola@napsix.ai](mailto:hola@napsix.ai)
**Web:** [komuny.org/para-fundaciones](https://komuny.org/para-fundaciones)

---

*Komuny Chat para Fundaciones — Hecho con [Anthropic](https://anthropic.com),
desarrollado por [Napsix.AI](https://napsix.ai) para fundaciones de LATAM.*
