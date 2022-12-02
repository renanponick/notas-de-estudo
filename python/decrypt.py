from cryptography.fernet import Fernet
import os
from pathlib import Path

folder = Path('C:\Arquivos')
ext = ('.txt', '.pdf', '.docx')

key = '4cL6vt3SpIcrOk2Ci5_vi5zkzzse0uWhweDIl_pvhXs='

def decrypt():
    for file in os.listdir(folder):
        if file.endswith(ext):
            fullPath = folder / file

            a = open(fullPath, 'rb')
            data = a.read()
            a.close()

            k = Fernet(key)
            decryptData = k.decrypt(data)

            decryptFile = open(fullPath, 'wb')
            decryptFile.write(decryptData)
            decryptFile.close()

decrypt()
