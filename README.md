# Komuny Edu
### IA para Educadores y Fundaciones de LATAM -- Open Source

> **La inteligencia artificial debe ser accesible para todos los docentes y fundaciones educativas**, no solo para quienes saben programar.
> Komuny Edu es una comunidad y repositorio open source de recursos practicos para integrar IA en el aula y en programas educativos.

[![Built with Anthropic](https://img.shields.io/badge/Built%20with-Anthropic-CC785C)](https://anthropic.com)
[![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4%EF%B8%8F-brightgreen)](https://github.com/german-gimenez/komuny)
[![Licencia MIT](https://img.shields.io/badge/Licencia-MIT-purple)](LICENSE)
[![Idioma](https://img.shields.io/badge/Idioma-Espa%C3%B1ol-orange)](README.md)
[![Contribuciones](https://img.shields.io/badge/Contribuciones-Bienvenidas-blue)](CONTRIBUTING.md)
[![Hecho en LATAM](https://img.shields.io/badge/Hecho%20en-LATAM-red)](https://napsix.ai)
[![Fundacion](https://img.shields.io/badge/Fundaci%C3%B3n-Persona%20Jur%C3%ADdica-darkgreen)](fundacion/README.md)
[![Senado Mendoza](https://img.shields.io/badge/Aval-Senado%20de%20Mendoza-blue)](fundacion/reconocimientos.md)

---

## Que es Komuny Edu?

Komuny Edu nacio de una pregunta simple: **por que los docentes latinoamericanos no tienen acceso a recursos de IA en su idioma, adaptados a su realidad?**

Este repositorio es la respuesta. Un espacio colaborativo donde educadores de toda la region pueden encontrar, usar y contribuir herramientas concretas para integrar IA en su practica docente -- sin necesitar saber programar, sin barreras de idioma y sin costo.

### Para quien es?

**Educadores individuales:**
- Maestros de primaria y secundaria
- Profesores universitarios
- Coordinadores pedagogicos
- Directivos que quieren innovar
- Cualquier educador curioso sobre la IA

**Fundaciones y organizaciones educativas:**
- Fundaciones que capacitan docentes
- ONGs con programas de becas o tutorias
- Organizaciones con linea de educacion
- Organismos regionales de formacion docente

Ver [komuny.org/para-fundaciones](https://komuny.org/para-fundaciones) para implementaciones B2B.

---

## Komuny Chat — Nuestra plataforma IA conversacional

**[chat.komuny.org](https://chat.komuny.org)** — Chat IA con 6 presets pedagogicos
pre-cargados, agentes, MCPs, memoria y artifacts.

**Hecho con [Anthropic](https://anthropic.com)** (Claude Opus 4.6 + Sonnet 4.6),
desarrollado por **[Napsix.AI](https://napsix.ai)**.

### 6 presets incluidos
1. **Asistente Komuny** (default) — pedagogico generalista en español
2. **Generador de Rubrica** — evaluacion estructurada
3. **Planificador de Clases** — secuencias didacticas
4. **Simplificador de Textos** — adaptacion lectora
5. **Detector de Sesgos** — revision inclusiva
6. **Banco de Preguntas Bloom** — diseno cognitivo

### Capacidades
- Modelos Anthropic Claude Opus 4.6 + Sonnet 4.6
- Agentes con manejo de archivos, codigo y APIs
- +20 MCP Servers (GitHub, Stripe, HuggingFace, MySQL, etc.)
- Artifacts: React, HTML, Mermaid en chat
- Memoria persistente entre conversaciones
- Web Search live con reranking
- Code Interpreter
- SSO/SAML/OAuth para instituciones

Ver [guia completa](guides/07-komuny-chat-para-docentes.md) y
[pack de prompts](templates/prompts-komuny-chat-latam.md).

### Para tu fundacion
Implementaciones a medida con tu marca, presets personalizados y
acompañamiento Napsix.AI. Ver [`fundaciones/`](fundaciones/README.md) o
[komuny.org/para-fundaciones](https://komuny.org/para-fundaciones).

---

## Respaldo Institucional

Komuny Edu es el proyecto open source de la **Fundacion Komuny Social**, una organizacion
sin fines de lucro registrada legalmente en Argentina con CUIT 30-71735388-5.

| Reconocimiento | Organismo | Anho |
|---------------|-----------|------|
| Declaracion de Interes Legislativo | Honorable Camara de Senadores de Mendoza | 2022 |
| Convenio Marco de Cooperacion | Instituto de Educacion Superior IES 9-029 | 2022 |
| Persona Juridica registrada | AFIP Argentina -- CUIT 30-71735388-5 | 2021 |

Ver [documentacion completa de la Fundacion](fundacion/README.md) y [reconocimientos institucionales](fundacion/reconocimientos.md).

---

## Herramientas IA web

Komuny Edu tiene **5 herramientas generativas de IA** directamente en la web.
Gratis, sin cuenta, en espanol. Accede en [komuny.org/herramientas](https://komuny.org/herramientas)

> Estas herramientas tambien viven como **presets dentro de Komuny Chat**.
> Si queres mas funcionalidad (memoria, MCPs, agentes, multi-modelo), usa el chat.

| Herramienta | Descripcion | Web | Preset en Chat |
|------------|-------------|-----|----------------|
| Generador de Rubrica | Rubricas completas con niveles de desempeno | [Web](https://komuny.org/herramientas/rubrica) | Si |
| Planificador de Clases | Planificaciones didacticas completas | [Web](https://komuny.org/herramientas/planificador) | Si |
| Simplificador de Textos | Adapta textos a cualquier nivel | [Web](https://komuny.org/herramientas/simplificador) | Si |
| Detector de Sesgos | Analiza materiales para hacerlos inclusivos | [Web](https://komuny.org/herramientas/detector-sesgos) | Si |
| Banco de Preguntas | Preguntas por Taxonomia de Bloom | [Web](https://komuny.org/herramientas/preguntas) | Si |

Ver [guia completa de uso](guides/06-herramientas-ia-komuny.md) y [templates](templates/templates-herramientas-ia.md).

---

## Novedades del Ecosistema Educativo

Seguimos el ecosistema y respondemos con recursos concretos.

| Novedad | Contexto | Fecha |
|---------|----------|-------|
| [El sistema educativo no esta en crisis — esta cumpliendo para lo que fue disenado](novedades/2026-05-reinvencion-educativa.md) | Respuesta a nota de Facundo Vazquez — reinvencion del modelo educativo industrial | Mayo 2026 |

Ver todas las novedades en [komuny.org/novedades](https://komuny.org/novedades)

---

## Que encontraras aqui?

| Recurso | Descripcion | Estado |
|--------|-------------|--------|
| [**Komuny Chat**](https://chat.komuny.org) | Chat IA con 6 presets pedagogicos, agentes, MCPs y memoria — Built with Anthropic | Disponible |
| [**Para Fundaciones**](fundaciones/README.md) | Implementaciones B2B de Komuny Chat para fundaciones educativas | Disponible |
| [Guia Komuny Chat](guides/07-komuny-chat-para-docentes.md) | Como usar los 6 presets, modelos, agentes, MCPs y memoria | Disponible |
| [12 Prompts LATAM para Komuny Chat](templates/prompts-komuny-chat-latam.md) | Pack curado de prompts listos para usar | Disponible |
| [Novedades](novedades/) | Contexto del ecosistema educativo y respuesta de Komuny | Disponible |
| [Glosario](glosario/glosario-ia-docentes.md) | 30+ terminos de IA explicados sin tecnicismos | Disponible |
| [Skills para Claude](skills/) | 7 configuraciones listas para tareas docentes | Disponible |
| [Templates de Prompts](templates/) | Tickets listos para copiar y pegar | Disponible |
| [Guias paso a paso](guides/) | 7 guias: primera clase, evaluacion, inclusion, proyectos, herramientas IA, Komuny Chat | Disponible |
| [Herramientas gratuitas](recursos/herramientas-gratuitas.md) | Directorio de recursos, descuentos y portales regionales | Disponible |
| [Fundacion Komuny Social](fundacion/README.md) | Mision, valores y reconocimientos institucionales | Disponible |
| [Ejemplos reales](examples/) | Casos de uso de docentes de la region | En construccion |

---

## Por donde empezar?

1. **Quiero usar IA pedagogica con un chat completo** -- Ve a [Komuny Chat](https://chat.komuny.org)
2. **Quiero generar materiales sin abrir chat** -- Ve a [Herramientas IA](https://komuny.org/herramientas)
3. **Soy una fundacion y quiero implementar Komuny Chat** -- Ve a [Para Fundaciones](https://komuny.org/para-fundaciones)
4. **Soy nuevo en IA** -- Lee el [Glosario](glosario/glosario-ia-docentes.md)
5. **Quiero usar Claude en clase** -- Ve a [Skills](skills/)
6. **Necesito prompts listos** -- Explora los [Templates](templates/)
7. **Quiero aprender paso a paso** -- Lee las [Guias](guides/)
8. **Busco herramientas gratuitas** -- Ver [Recursos](recursos/herramientas-gratuitas.md)
9. **Quiero conocer la Fundacion** -- Ver [fundacion/README.md](fundacion/README.md)
10. **Quiero seguir el ecosistema educativo** -- Ver [Novedades](novedades/)

---

## Sitio Web

Visita [komuny.org](https://komuny.org) para explorar los recursos en formato web interactivo con busqueda y filtros.

---

## Redes Sociales

- Instagram: [instagram.com/komuny.social](https://www.instagram.com/komuny.social/)
- Facebook: [facebook.com/komuny.social](https://www.facebook.com/komuny.social/)
- LinkedIn: [linkedin.com/company/komuny](https://www.linkedin.com/company/komuny/)
- GitHub: [github.com/german-gimenez/komuny](https://github.com/german-gimenez/komuny)

---

## Como contribuir?

Este proyecto crece con la comunidad. Puedes:
- Agregar terminos al glosario
- Compartir un skill o prompt que te funciono
- Escribir una guia basada en tu experiencia real
- Traducir contenido al portugues
- Dar una estrella al repo para que mas docentes lo encuentren

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para mas detalles.

---

## Licencia

MIT (c) [Napsix.AI](https://napsix.ai) -- Ver [LICENSE](LICENSE)

---

## Equipo

Creado y mantenido por **German Gimenez**
CTO & Co-Founder -- [Napsix.AI](https://napsix.ai)
Mendoza, Argentina

> Napsix.AI es una agencia de inteligencia artificial enfocada en la democratizacion del acceso a la IA en America Latina.

---

## Stack tecnologico

- **Komuny Chat:** [LibreChat](https://github.com/danny-avila/LibreChat) (open source) + [Anthropic Claude](https://anthropic.com)
- **komuny.org:** Next.js 15 + React 19 + Framer Motion + Vercel
- **Modelos IA:** Claude Opus 4.6 + Claude Sonnet 4.6 (Anthropic)
- **Operacion:** [Napsix.AI](https://napsix.ai)

---

*Hecho con [Anthropic](https://anthropic.com), desarrollado por [Napsix.AI](https://napsix.ai) -- Para docentes y fundaciones de America Latina -- komuny.org*
