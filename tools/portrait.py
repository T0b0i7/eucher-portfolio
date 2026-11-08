import re, base64
s = open('assets/css/app.css', encoding='utf-8').read()
m = re.search(r'--me:url\(data:image/jpeg;base64,([^)]+)\)', s)
d = base64.b64decode(m.group(1))
open('assets/img/portrait.jpg', 'wb').write(d)
s = s.replace(m.group(0), '--me:url(../img/portrait.jpg)')
open('assets/css/app.css', 'w', encoding='utf-8', newline='\n').write(s)
print('portrait bytes', len(d))
