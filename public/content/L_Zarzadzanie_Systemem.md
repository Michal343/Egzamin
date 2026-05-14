# Zarządzanie Systemem Linux

Ten dokument zawiera zestawienie podstawowych komend służących do zarządzania systemem operacyjnym, w tym nadawania uprawnień, konfiguracji tożsamości maszyny oraz sprawdzania wersji oprogramowania.

## 1. Nadawanie uprawnień administratora
W systemach Linux uprawnienia superużytkownika (root) są niezbędne do wykonywania zadań administracyjnych.

* `sudo <komenda>` – wykonuje pojedynczą komendę z uprawnieniami administratora.
* `sudo -i` lub `sudo su -` – uruchamia interaktywną sesję powłoki z uprawnieniami roota.

## 2. Zarządzanie hasłami
Bezpieczeństwo konta użytkownika opiera się na regularnej zmianie haseł.

* `passwd` – zmiana hasła aktualnie zalogowanego użytkownika.
* `sudo passwd <nazwa_użytkownika>` – zmiana hasła dla konkretnego użytkownika (wymaga uprawnień administratora).

## 3. Zmiana nazwy hosta (Hostname)
Nazwa hosta to unikalny identyfikator komputera w sieci.

* `hostnamectl` – wyświetla aktualne ustawienia nazwy hosta i informacje o systemie.
* `sudo hostnamectl set-hostname <nowa_nazwa>` – trwała zmiana nazwy hosta.

## 4. Sprawdzanie wersji systemu
Identyfikacja dystrybucji oraz wersji jądra jest kluczowa przy instalacji oprogramowania i rozwiązywaniu problemów.

* `lsb_release -a` – wyświetla szczegółowe informacje o dystrybucji (np. Ubuntu, Debian).
* `cat /etc/os-release` – standardowy plik zawierający dane o systemie operacyjnym.
* `uname -r` – wyświetla aktualnie używaną wersję jądra Linux.
* `uptime` – pokazuje jak długo system pracuje bez restartu.

---
*Dokument przygotowany jako podręczna ściąga dla administratorów.*
