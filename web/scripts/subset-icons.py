"""Gera public/fonts/material-symbols.woff2 só com os ícones usados no código.

Por quê: a fonte completa do Material Symbols pesa ~4 MB e vinha de 3 lugares (link do Google,
@nuxt/fonts e CSS). Aqui o site serve um arquivo próprio de poucos KB, sem rede de terceiros.

Quando rodar: ao usar um ícone novo (nome do Material Symbols em snake_case, ex.: "mark_email_read").
  npm i --no-save material-symbols
  pip install fonttools brotli
  npm run icons
"""
import re
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
SRC_FONT = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "node_modules/material-symbols/material-symbols-outlined.woff2"
OUT = ROOT / "public/fonts/material-symbols.woff2"
# Só código que escreve nomes de ícone. i18n fica de fora (texto corrido gera falsos positivos).
SOURCES = ["app.vue", "error.vue", "components", "pages", "shared", "composables"]

font = instancer.instantiateVariableFont(TTFont(SRC_FONT), {"wght": 400, "opsz": 24, "FILL": 0, "GRAD": 0})

glyph_char = {g: chr(cp) for cp, g in font.getBestCmap().items()}
ligatures = []  # (nome do ícone, subtabela, glifo inicial, ligadura)
for lookup in font["GSUB"].table.LookupList.Lookup:
    for st in lookup.SubTable:
        st = getattr(st, "ExtSubTable", st)
        for first, ligs in getattr(st, "ligatures", {}).items():
            for lig in ligs:
                chars = [glyph_char.get(g) for g in (first, *lig.Component)]
                if None not in chars:
                    ligatures.append(("".join(chars), st, first, lig))
known = {name for name, *_ in ligatures}

# Um nome conta quando aparece sozinho entre aspas ou entre tags: 'bolt', "bolt", >bolt<.
token = re.compile(r"""['"`>]\s*([a-z][a-z0-9_]*)\s*['"`<]""")
used = set()
for entry in SOURCES:
    for path in [ROOT / entry] if (ROOT / entry).is_file() else sorted((ROOT / entry).rglob("*")):
        if path.suffix in {".vue", ".ts"}:
            used |= {m for m in token.findall(path.read_text(encoding="utf-8")) if m in known}

# Poda: mantém só as ligaduras dos ícones usados; o subset descarta o resto dos glifos.
for name, st, first, lig in ligatures:
    if name not in used:
        st.ligatures[first].remove(lig)
for _, st, first, _ in ligatures:
    if not st.ligatures.get(first, True):
        del st.ligatures[first]

options = subset.Options(layout_features=["*"], glyph_names=False, notdef_outline=False, name_IDs=[1, 2], flavor="woff2")
subsetter = subset.Subsetter(options)
subsetter.populate(unicodes=[ord(c) for c in "abcdefghijklmnopqrstuvwxyz0123456789_"])
subsetter.subset(font)

OUT.parent.mkdir(parents=True, exist_ok=True)
font.flavor = "woff2"
font.save(OUT)
print(f"{len(used)} ícones, {OUT.stat().st_size / 1024:.1f} KB -> {OUT.relative_to(ROOT)}")
print(", ".join(sorted(used)))
