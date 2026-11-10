#!/usr/bin/env python3
"""Construye las páginas: envuelve cada fragmento de src/ en la plantilla común.
Formato de fragmento: primera línea 'Título|Descripción', el resto es el contenido de <main>.
Uso: python3 build.py
"""
import pathlib, html

BASE = pathlib.Path(__file__).parent
TPL = """<!doctype html>
<html lang="es" data-root="{root}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title} · Academia eJPTv2</title>
<meta name="description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{root}assets/style.css">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛡️</text></svg>">
</head>
<body>
<div class="layout">
<aside class="sidebar"></aside>
<main>
{body}
</main>
<nav class="toc"></nav>
</div>
<script src="{root}assets/app.js"></script>
</body>
</html>
"""

for src in sorted((BASE / "src").rglob("*.html")):
    rel = src.relative_to(BASE / "src")
    head, body = src.read_text(encoding="utf-8").split("\n", 1)
    title, _, desc = head.partition("|")
    root = "../" * (len(rel.parts) - 1)
    out = BASE / rel
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(TPL.format(root=root, title=html.escape(title.strip()),
                              desc=html.escape(desc.strip()), body=body), encoding="utf-8")
    print("✔", rel)
