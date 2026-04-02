# Skill 02: Generador de Evaluaciones y Rubricas

**Proposito:** Crear evaluaciones, preguntas, rubricas y herramientas de
valoracion de aprendizajes alineadas con tus objetivos pedagogicos.

---

## Instruccion de sistema (System Prompt)

```
Eres un experto en evaluacion educativa para docentes latinoamericanos.

Cuando generes evaluaciones o rubricas:
- Asegurate de que cada pregunta o criterio este alineado con el objetivo
- Incluye diferentes niveles cognitivos (recuerdo, comprension, aplicacion, analisis)
- Usa lenguaje claro y adecuado al nivel
- Para rubricas: usa 4 niveles de desempenio y criterios observables
- Para examenes: equilibra preguntas objetivas y de desarrollo
- Siempre incluye la clave de respuesta o descripcion del nivel esperado

Si el docente no especifica el nivel de dificultad, pregunta antes de generar.
```

---

## Prompts de uso

### Banco de preguntas
```
Genera 15 preguntas sobre [TEMA] para [NIVEL].
Distribucion:
- 5 preguntas de comprension basica (verdadero/falso o completar)
- 5 preguntas de opcion multiple con 4 alternativas
- 5 preguntas de aplicacion o analisis (respuesta breve)
Incluye la respuesta correcta para cada una.
```

### Rubrica de evaluacion
```
Necesito una rubrica para evaluar [TIPO DE TRABAJO: ensayo/proyecto/
presentacion oral/experimento] en [NIVEL].

Criterios a evaluar: [LISTA O "los mas importantes para este trabajo"].
Escala: 4 niveles (Excelente, Bueno, En proceso, Necesita mejora).
Formato: tabla clara con descriptores especificos y observables.
```

### Examen completo
```
Genera un examen de [X] puntos sobre [TEMA/UNIDAD] para [NIVEL].
Duracion estimada: [X] minutos.
Incluye:
- Datos del alumno y fecha
- Instrucciones claras por seccion
- [X] preguntas objetivas
- [X] preguntas de desarrollo
- 1 problema de aplicacion practica
Adjunta la clave de correccion al final.
```

### Autoevaluacion para alumnos
```
Crea una autoevaluacion para alumnos de [NIVEL] sobre [TEMA/PROYECTO].
Que sea:
- Reflexiva, no solo un checklist
- Con preguntas abiertas sobre el proceso de aprendizaje
- Que los invite a identificar sus logros y dificultades
- Que conecte con sus metas personales de aprendizaje
Maximo 1 pagina.
```

### Coevaluacion entre pares
```
Necesito una herramienta de coevaluacion para que los alumnos
evaluen el trabajo de sus compañeros.
Tipo de trabajo: [DESCRIPCION]
Nivel: [NIVEL]
Que sea justa, clara y que evite que se pongan notas altas por amistad.
Incluye criterios objetivos y observables.
```

---

## Evaluacion con IA: tipos segun proposito

| Tipo | Cuando usarlo | Herramienta sugerida |
|------|--------------|---------------------|
| Diagnostica | Inicio de unidad | Preguntas abiertas o mapa conceptual |
| Formativa | Durante el proceso | Preguntas rapidas o exit tickets |
| Sumativa | Final de unidad | Examen o proyecto con rubrica |
| Autoevaluacion | Siempre | Reflexion guiada |

---

## Exit ticket (evaluacion rapida al cierre)

```
Genera un exit ticket de 3 preguntas para el final de una clase
sobre [TEMA] con alumnos de [NIVEL].
Las preguntas deben revelar si lograron el objetivo: [OBJETIVO].
Deben poder responderse en 5 minutos o menos.
```

---

*Komuny Edu — komuny.org — Napsix.AI*
