import re, os, sys
s = open('index.html', encoding='utf-8').read()
m = re.search(r'<style[^>]*>([\s\S]*?)</style>', s)
css = m.group(1)
os.makedirs('assets/css', exist_ok=True)
open('assets/css/app.css', 'w', encoding='utf-8', newline='\n').write(css.strip() + '\n')
s = s[:m.start()] + '<link rel="stylesheet" href="assets/css/app.css">' + s[m.end():]
open('index.html', 'w', encoding='utf-8', newline='').write(s)
for i, b in enumerate(re.finditer(r'data:image/[a-z+]+;base64', s)):
    print(i, len(b.group(0)), repr(s[max(0, b.start()-70):b.start()]))
print('css', len(css), 'html', len(s))
