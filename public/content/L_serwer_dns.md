# Serwer DNS na Ubuntu Serwer

**Strefa wyszukiwania do przodu:** Zamienia nazwę domenową (np. www.google.pl) na adres IP (np. 142.250.179.195).

**Strefa wyszukiwania do tyłu:** Zamienia adres IP (np. 142.250.179.195) z powrotem na nazwę domenową

## Instalacja

`sudo apt install bind9 bind9utils bind9-doc -y` - instalacja pakietu **bind9**

`systemctl status bind9` - sprawdzenie stanu usługi, powinna być wyłącznona

## Konfiguracja

Plik **named.conf.options** służy do dodania następnych serwerów dns. (Przekierowuje gdy nie ma na swoim adresu)

`nano /etc/bind/named.conf.options` - edytujemy plik i dodajemy zewnętrzny adres dns ( np.  8.8.8.8 adres google'a )

``` c
forwarders {
    8.8.8.8;
};
```


---

Plik **named.conf.local** służy do utworzenia stref DNS na serwerze ( do przodu i wstecz )

`nano /etc/bind/named.conf.local` - edytujemy plik i dodajemy strefy.


``` c
// Strefa wyszukiwania w przód dla domeny mamdosc.test
zone "mamdosc.test" {
    type master;
    file "/etc/bind/zones/db.mamdosc.test";
};

// Strefa wyszukiwania wstecznego (zapisana wspak dla sieci 10.0.0.x)
zone "0.0.10.in-addr.arpa" {
    type master;
    file "/etc/bind/zones/db.10.0.0";
};
```

---

#### Strefa wyszukiwania do przodu dla domeny **mamdosc.test**



`sudo cp /etc/bind/db.local /etc/bind/db.mamdosc.test` - kopiowanie przykładowego pliku

`sudo nano /etc/bind/db.mamdosc.test` - edycja pliku (**WAŻNE KROPKI NA KOŃCACH DOMEN**)

``` c
;
; BIND data file for local loopback interface
;
$TTL    604800
@       IN      SOA     dev.mamdosc.test. root.mamdosc.test. (
                              2         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
;
; Rekordy serwerów nazw (NS)
@       IN      NS      dev.mamdosc.test.

; Rekordy mapowania Nazwa -> IP (A)
dev     IN      NS      10.0.0.3
host    IN      NS      10.0.0.2
```

---

#### Strefa wyszukiwania do tyłu (najczęściej nie potrzebna) dla sieci **10.0.0.x**

`sudo cp /etc/bind/db.127 /etc/bind/db.10.0.0` - kopiowanie przykładowego pliku (dla wstecznego wyszukiwania)

`sudo nano /etc/bind/db.10.0.0` - edycja pliku (**WAŻNE KROPKI NA KOŃCACH DOMEN**)

``` c
;
; BIND reverse data file for local loopback interface
;
$TTL    604800
@       IN      SOA     dev.mamdosc.test. root.mamdosc.test. (
                              1         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
;
; Rekordy serwerów nazw (NS)
@       IN      NS      dev.mamdosc.test.

; Rekordy mapowania IP -> Nazwa (PTR)
; Podajemy tylko ostatni oktet adresu IP
3       IN      PTR     dev.mamdosc.test.
2       IN      PTR     host.mamdosc.test.
```

## Sprawdzenie

`sudo named-checkconf` - sprawdzenie ogólnej konfiguracji, jeśli nic sie nie wyświetliło jest super.

Sprawdzenie poprawności plików stref

``` bash
sudo named-checkzone mamdosc.test /etc/bind/mamdosc.test
sudo named-checkzone 0.0.10.in-addr.arpa /etc/bind/db.10.0.0
```

Uruchomienie usługi i sprawdzenie stanu

``` bash
sudo systemctl restart bind9
sudo systemctl status bind9
```

Sprawdzenie działania za pomocą **nslookup**

```bash
nslookup dev.mamdosc.test
nslookup host.mamdosc.test
nslookup 10.0.0.3
nslookup 10.0.0.2
```