s = open('index.html', encoding='utf-8').read()
names = ['data', 'sections', 'admin', 'ui', 'effects']
t = '\n'.join('<script src="assets/js/%s.js" defer></script>' % n for n in names)
s = s.replace('<script src="assets/js/app.js" defer></script>', t)
open('index.html', 'w', encoding='utf-8', newline='').write(s)
print(s.count('assets/js/'))
