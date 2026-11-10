# Informe de Test de Penetración

**Cliente:** _________________________
**Proyecto / OSID:** _________________________
**Autor:** _________________________
**Fecha:** ____ / ____ / ________
**Clasificación:** CONFIDENCIAL

---

## Control de versiones

| Versión | Fecha | Autor | Cambios |
|---------|-------|-------|---------|
| 0.1     |       |       | Borrador inicial |
| 1.0     |       |       | Versión final |

---

## 1. Resumen ejecutivo

> Escribe 1-2 párrafos SIN jerga técnica, para directivos. Explica el estado
> general de seguridad y el riesgo para el negocio.

Se realizó un test de penetración sobre [sistemas] entre el [fecha] y el [fecha].
Durante la evaluación se identificaron **[N]** vulnerabilidades, de las cuales
**[N] son críticas**. En conjunto, un atacante podría [impacto en el negocio:
p. ej. acceder a los datos de clientes y tomar control total de la red interna].

### Resumen de riesgo

| Severidad | Nº de hallazgos |
|-----------|-----------------|
| 🔴 Crítica |  |
| 🟠 Alta    |  |
| 🟡 Media   |  |
| 🟢 Baja    |  |
| ℹ️ Informativa |  |

---

## 2. Alcance y metodología

**Sistemas en alcance:**

| Host / IP | Hostname | Notas |
|-----------|----------|-------|
| 10.x.x.x  |          |       |

**Fuera de alcance:** [lo que NO se podía tocar]

**Metodología:** Caja [negra / gris / blanca]. Se siguieron las fases de
reconocimiento, escaneo, enumeración, explotación, post-explotación y reporte,
conforme a [PTES / OWASP / OSSTMM].

**Herramientas:** Nmap, Burp Suite, Metasploit, etc.

---

## 3. Resumen de hallazgos

| # | Hallazgo | Severidad | CVSS | Sistema |
|---|----------|-----------|------|---------|
| 1 |          | Crítica   | 9.8  |         |
| 2 |          | Alta      |      |         |
| 3 |          | Media     |      |         |

---

## 4. Hallazgos detallados

### Hallazgo 1 — [Título claro de la vulnerabilidad]

| Campo | Valor |
|-------|-------|
| **Severidad** | 🔴 Crítica |
| **CVSS 3.1** | 9.8 (AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H) |
| **Sistemas afectados** | http://10.x.x.x/ruta (puerto XX) |
| **CVE / CWE** | CVE-XXXX-XXXX / CWE-XX |

**Descripción**
[Qué es la vulnerabilidad, en 2-3 frases.]

**Impacto**
[Qué consigue un atacante que la explote.]

**Prueba de concepto (PoC)**

1. [Paso 1 con el comando exacto]
   ```
   comando exacto aquí
   ```
2. [Paso 2]

   _[Captura 1: descripción — debe verse la IP de la víctima y la hora]_

3. Se obtiene acceso / la flag:
   ```
   cat proof.txt
   ```
   _[Captura 2: proof.txt junto a la salida de `ip a` / `ipconfig`]_

**Remediación**
[Cómo arreglarlo, de forma concreta y accionable.]

**Referencias**
- https://owasp.org/...
- https://nvd.nist.gov/vuln/detail/CVE-XXXX-XXXX

---

### Hallazgo 2 — [Título]

_(repetir la misma estructura)_

---

## 5. Recomendaciones (priorizadas)

1. **[Crítico]** [Acción concreta]
2. **[Alto]** [Acción concreta]
3. **[Medio]** [Acción concreta]
4. **Buenas prácticas generales:** gestión de parches, mínimo privilegio,
   segmentación de red, contraseñas robustas y MFA.

---

## 6. Anexos

### A. Rutas de compromiso (resumen técnico de cada máquina)

**Máquina: 10.x.x.x**
- Puertos abiertos: ...
- Acceso inicial: [servicio + técnica]
- Usuario obtenido: ...
- Escalada de privilegios: [técnica] → root/SYSTEM
- local.txt: `________` · proof.txt: `________`

### B. Salidas completas de herramientas

```
(pega aquí los escaneos Nmap completos, etc.)
```

---

_Informe generado como parte de la formación eJPTv2 → OSCP. Documento de ejemplo._
