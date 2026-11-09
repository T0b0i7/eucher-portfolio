s = open('index.html', encoding='utf-8').read()
t = """<script>
setTimeout(function(){
 var x=new XMLHttpRequest();
 x.open('GET','https://pwpfoqgiltdgdlaazdjc.supabase.co/rest/v1/portfolio?id=eq.1&select=data',false);
 x.setRequestHeader('apikey','sb_publishable_zJ1a7eLIzCj2RB5WG1DLCQ_0HUG4bK0');
 x.send();
 try{var d=JSON.parse(x.responseText)[0].data;localStorage.setItem('ea_admin_v1',JSON.stringify(d));applyData();document.title='OK '+P.length}
 catch(e){document.title='ERR '+e.message}
},1500)
</script>"""
open('__t.html', 'w', encoding='utf-8', newline='').write(s.replace('</body>', t + '</body>'))
print('ok')
