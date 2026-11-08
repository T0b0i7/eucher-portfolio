import re, os
s = open('index.html', encoding='utf-8').read()
os.makedirs('assets/js', exist_ok=True)
b = [m for m in re.finditer(r'<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)</script>', s)]
m = max(b, key=lambda x: len(x.group(1)))
open('assets/js/app.js', 'w', encoding='utf-8', newline='\n').write(m.group(1).strip() + '\n')
s = s[:m.start()] + '<script src="assets/js/app.js" defer></script>' + s[m.end():]
open('index.html', 'w', encoding='utf-8', newline='').write(s)
print('js', len(m.group(1)), 'html', len(s))
