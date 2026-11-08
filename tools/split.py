import os
src = open('assets/js/app.js', encoding='utf-8').read().split('\n')
cuts = [(0, 154, 'data'), (154, 314, 'sections'), (314, 501, 'admin'),
        (501, 548, 'ui'), (548, len(src), 'effects')]
os.makedirs('assets/js', exist_ok=True)
for a, b, name in cuts:
    open('assets/js/%s.js' % name, 'w', encoding='utf-8', newline='\n').write('\n'.join(src[a:b]).strip() + '\n')
    print(name, b - a)
