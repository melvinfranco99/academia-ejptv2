# 🛡️ Academia eJPTv2 → OSCP

Curso web completo, visual y en español para aprender pentesting desde cero hasta nivel eJPTv2, con la vista puesta en el OSCP.

## Contenido
- **Nivel 0 · Bases:** informática, redes, Linux y Windows desde cero.
- **Nivel 1 · eJPTv2:** metodología, reconocimiento, Nmap, enumeración, web, explotación, contraseñas, privesc Linux/Windows y pivoting.
- **Nivel 2 · Hacia OSCP:** Active Directory, reportes profesionales y estrategia de examen.
- **Recursos:** glosario con buscador (150+ términos), chuleta de comandos, simulacro final de 30 preguntas, laboratorios y plantilla de reporte descargable.

Cada tema incluye definiciones, analogías, diagramas SVG, tablas, ejemplos, vídeos recomendados y **cuestionarios autocorregidos + ejercicios + prácticas con solución**.

## Desarrollo
Las páginas de `modulos/` se generan desde `src/` con la plantilla común:
```bash
python3 build.py
```
Edita los fragmentos en `src/modulos/` y vuelve a ejecutar el build. El resto de páginas (`index.html`, `glosario.html`, `cheatsheet.html`, `examen-final.html`, `laboratorios.html`) son HTML directo.

## Aviso legal
Material educativo. Practica **solo** en sistemas propios o en plataformas autorizadas (TryHackMe, HackTheBox, PortSwigger, VulnHub). Atacar sistemas sin permiso es delito.
