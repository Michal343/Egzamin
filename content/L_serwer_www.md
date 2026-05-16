# Serwer WWW ( Apache2 )

## Instalacja

`apt -y install apache2` - instlacja pakietu apache2

Opcjonalna kopia zapasowa:
``` bash
cd /etc/apache2
cp apache2.conf apache2.conf.bak
cp ./conf-enabled/security.conf ./conf-enabled/security.conf.bak
cp ./mods-enabled/dir.conf ./mods-enabled/dir.conf.bak
```

## Konfiguracja

Dla innych nazw plików np. **strona.html** dodajemy nazwe do pliku dir.conf

```bash
# Edycja pliku
nano /etc/apache2/mods-enabled/dir.conf

# dir.conf (dodajemy na końcu nazwe plku)

DirectoryIndex index.html index.cgi index.pl strona.html
```

By zmienić **katalog pliku** zmieniacie **DocumentRoot**.

```bash
# Edycja pliku
nano /etc/apache2/sites-enabled/000-default.conf

# 000-default.conf (zmieniacie scieżkę)
DocumentRoot /strona
```
By zmienić **port** strony edytujemy plik **ports.conf**.

``` bash
# Edycja pliku
nano /etc/apache2/ports.conf

# ports.conf (zmieniamy 80 na inny)
Listen 81
```

## Sprawdzenie

Restartujemy i sprawdzamy status usługi
``` bash
systemctl restart apache2
systemctl status apache2

ss -tulnp | grep :80    # sprawdzamy czy jest apache
```


