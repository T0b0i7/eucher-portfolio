import re, base64, os
s = open('index.html', encoding='utf-8').read()
os.makedirs('assets/img', exist_ok=True)
pat = re.compile(r'<img class="(ilogo|logo|flogo)" src="data:image/(png|jpeg);base64,([^"]+)"')
def f(m):
    cls, ext, b64 = m.group(1), m.group(2), m.group(3)
    ext = 'png' if ext == 'png' else 'jpg'
    open('assets/img/%s.%s' % (cls, ext), 'wb').write(base64.b64decode(b64))
    return '<img class="%s" src="assets/img/%s.%s"' % (cls, cls, ext)
s2 = pat.sub(f, s)
open('index.html', 'w', encoding='utf-8', newline='').write(s2)
print('html', len(s), '->', len(s2))
print(os.listdir('assets/img'))
