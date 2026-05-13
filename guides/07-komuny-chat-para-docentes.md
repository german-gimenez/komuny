# Guia 07 — Komuny Chat para docentes

> **Komuny Chat** es la plataforma IA conversacional de Komuny Edu.
> Construido con **Anthropic** (Claude Opus 4.6 y Sonnet 4.6),
> desarrollado por **Napsix.AI** para educadores y fundaciones de LATAM.
>
> Acceso: [chat.komuny.org](https://chat.komuny.org)

---

## Que es Komuny Chat

Komuny Chat es nuestro chat IA hosteado, basado en [LibreChat](https://www.librechat.ai/) (open source),
con configuracion pedagogica para docentes hispanohablantes. No es solo un wrapper:
viene pre-cargado con **6 asistentes especializados (presets)**, modelos seguros,
agentes, MCPs, memoria y mas.

A diferencia de KomIA (el asistente flotante del sitio que sirve para Q&A rapido),
Komuny Chat es una plataforma completa para trabajo profundo.

---

## Los 6 presets pre-cargados

Cuando abris Komuny Chat, en el selector superior izquierdo encontras 6 asistentes
configurados con prompts pedagogicos optimizados. Cada uno usa un system prompt
disenado por el equipo pedagogico de Komuny.

### 1. Asistente Komuny (default)

**Para que sirve:** consultas pedagogicas generales.

**Cuando usarlo:** cuando no sabes que preset elegir o tu necesidad es ampla:
"explicame que es la taxonomia de Bloom", "como integro IA en clase",
"resume estas 3 lecturas".

**Es el preset por defecto** — cuando abris una conversacion nueva, esta es la opcion seleccionada.

### 2. Generador de Rubrica

**Para que sirve:** crear rubricas de evaluacion claras y alineadas a objetivos.

**Cuando usarlo:** disenando instrumentos de evaluacion. Te pide
nivel educativo, materia, objetivos y criterios; devuelve una rubrica completa
con niveles de desempeno (excelente / muy bueno / bueno / a mejorar).

**Equivalente web:** [komuny.org/herramientas/rubrica](https://komuny.org/herramientas/rubrica)

### 3. Planificador de Clases

**Para que sirve:** disenar secuencias didacticas estructuradas.

**Cuando usarlo:** preparando una clase nueva. Pide tema, nivel, duracion;
devuelve plan con inicio - desarrollo - cierre, recursos y adaptaciones para
diversidad.

**Equivalente web:** [komuny.org/herramientas/planificador](https://komuny.org/herramientas/planificador)

### 4. Simplificador de Textos

**Para que sirve:** adaptar textos al nivel lector de tus estudiantes.

**Cuando usarlo:** un texto es muy complejo (universitario, tecnico, en otro
registro) y queres llevarlo a un nivel especifico. Pegas el texto y le decis
"nivel 6to grado primaria, vocabulario simple, sin tecnicismos".

**Equivalente web:** [komuny.org/herramientas/simplificador](https://komuny.org/herramientas/simplificador)

### 5. Detector de Sesgos

**Para que sirve:** analizar materiales en busca de sesgos involuntarios.

**Cuando usarlo:** antes de imprimir/proyectar un material. Detecta sesgos de
genero, culturales, socioeconomicos, etarios. Devuelve un informe con
sugerencias inclusivas concretas.

**Equivalente web:** [komuny.org/herramientas/detector-sesgos](https://komuny.org/herramientas/detector-sesgos)

### 6. Banco de Preguntas Bloom

**Para que sirve:** generar preguntas clasificadas por la Taxonomia de Bloom.

**Cuando usarlo:** disenando una evaluacion, un debate o ejercicios de
metacognicion. Pide tema y devuelve preguntas para los 6 niveles:
recordar, comprender, aplicar, analizar, evaluar, crear.

**Equivalente web:** [komuny.org/herramientas/preguntas](https://komuny.org/herramientas/preguntas)

---

## Como elegir un preset vs trabajar libre

| Situacion | Recomendado |
|-----------|-------------|
| Necesito rapidez y formato consistente | **Usar un preset** |
| Mi tarea calza con un preset existente | **Usar un preset** |
| Necesito iterar mucho un mismo problema | **Usar un preset + memoria** |
| Tarea muy especifica que no calza con ningun preset | **Asistente Komuny libre** |
| Trabajo de investigacion abierto | **Asistente Komuny + Web Search** |
| Aprender algo nuevo (formacion docente) | **Asistente Komuny libre** |

---

## Modelos disponibles

Komuny Chat usa modelos de **Anthropic** (los mas seguros y alineados disponibles
hoy para educacion):

### Claude Opus 4.6 (default)
- **Para que:** razonamiento profundo, tareas complejas, materiales largos.
- **Velocidad:** mas lento pero mas preciso.
- **Usar cuando:** disenando rubricas detalladas, analizando textos complejos,
  trabajando proyectos pluridisciplinarios.

### Claude Sonnet 4.6
- **Para que:** tareas medianas, velocidad alta, calidad muy buena.
- **Velocidad:** rapido.
- **Usar cuando:** generando ideas rapidas, simplificando textos cortos,
  preguntas frecuentes.

Cambias de modelo desde el dropdown superior. Sin compromiso: cada conversacion
puede usar el modelo que quieras.

---

## Capacidades avanzadas

Komuny Chat no es solo chat. Tiene:

### Agentes
Asistentes con manejo de archivos, codigo y APIs. Podes crear tu propio agente
para tareas recurrentes (ej. un "Tutor de Matematicas de 7mo grado").

### MCP Servers
Conexion a servicios externos via Model Context Protocol. Ya vienen configurados:
GitHub, PayPal, Stripe, HuggingFace, Vercel, MySQL, DeepWiki, y mas.

### Artifacts
Cuando le pedis algo visual (un diagrama, una pagina HTML, un componente React),
te lo renderiza directamente en el chat. Genial para:
- Diagramas Mermaid de procesos cientificos
- Mini-apps interactivas para clase
- Paginas HTML educativas

### Memoria
Komuny Chat puede recordar contexto entre conversaciones. Activate la memoria y
guarda info clave: tu pais, nivel educativo, materia, preferencias de formato.

### Web Search
Cualquier modelo puede consultar internet en vivo. Ideal para:
- Verificar datos antes de usar en clase
- Buscar curriculums oficiales actuales
- Encontrar recursos externos

### Code Interpreter
Ejecuta codigo en multiples lenguajes sin instalar nada. Ideal para enseñar
programacion o procesar datos.

---

## Tu perfil — configuracion regional

En el icono superior derecho de Komuny Chat podes guardar:

- **Pais:** Argentina, Mexico, Colombia, Chile, Uruguay, Peru, Bolivia, Ecuador, etc.
- **Nivel educativo donde trabajas:** primaria, secundaria, universitario, formacion docente.
- **Materia/area principal**

Con esta info, la IA usa terminologia y referencias curriculares de tu region
automaticamente. Si en tu pais se dice "carpeta" en vez de "cuaderno", lo aprende.
Si tu curriculo nacional usa "Practicas del Lenguaje" en vez de "Lengua y Literatura",
lo respeta.

---

## Consejos rapidos

1. **Usa contextos anonimos.** No pongas nombres reales de alumnos, direcciones,
   datos sensibles. Usa "estudiante A", "escuela X".
2. **Siempre revisa lo que genere la IA antes de usar en clase.** Es asistente,
   no reemplazo del criterio docente.
3. **Iterativo, no one-shot.** Si el primer resultado no es lo que buscas, pedi
   ajustes. La IA mejora con feedback.
4. **Combina presets con memoria.** Si trabajas mucho un tema, deja que la IA
   recuerde tu contexto.
5. **Probe los Artifacts.** Si necesitas un diagrama o una mini-app, pedilo
   explicito: "hace un diagrama Mermaid de X" o "genera una pagina HTML interactiva".

---

## Privacidad y datos

- Komuny Chat es open source (basado en LibreChat).
- Tus conversaciones **no se usan para entrenar modelos**.
- Tenes control sobre tu historial: podes eliminarlo cuando quieras.
- Anthropic (modelos) tiene su propia [politica de privacidad](https://www.anthropic.com/legal/privacy).
- Mas detalles en [komuny.org/privacidad](https://komuny.org/privacidad).

---

## Empeza ahora

Abri [chat.komuny.org](https://chat.komuny.org), seleccciona un preset
(o quedate con Asistente Komuny por defecto), y empeza a escribir.

Pack de **12 prompts listos** para copiar y pegar:
[`templates/prompts-komuny-chat-latam.md`](../templates/prompts-komuny-chat-latam.md)

---

## ¿Sos parte de una fundacion u organizacion educativa?

Hacemos implementaciones a medida de Komuny Chat para fundaciones:
white-label, presets adaptados, soporte de Napsix.AI.

Mas info: [komuny.org/para-fundaciones](https://komuny.org/para-fundaciones)

---

*Komuny Chat — Hecho con [Anthropic](https://anthropic.com), desarrollado por
[Napsix.AI](https://napsix.ai) para educadores y fundaciones de LATAM.*
