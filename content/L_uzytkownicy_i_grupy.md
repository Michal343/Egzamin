# Zarządzanie Użytkownikami, Grupami i Uprawnieniami w Linux

Ten dokument opisuje kluczowe polecenia służące do zarządzania kontami, grupami oraz uprawnieniami w systemie.

## Zarządzanie Użytkownikami
*   **adduser [nazwa_użytkownika]** – Interaktywne tworzenie nowego konta użytkownika (automatycznie tworzy katalog domowy i ustawia hasło).  
*   **useradd [parametry] [nazwa_użytkownika]** – tworzenie użytkownika 
    *   `-m`, `--create-home`: Tworzy katalog domowy użytkownika (zazwyczaj /home/user).
    *   `-d`, `--home-dir`: Określa inną ścieżkę katalogu domowego.
    *   `-s`, `--shell`: Ustawia domyślną powłokę (np. /bin/bash).
    *   `-c`, `--comment`: Dodaje komentarz (np. imię i nazwisko użytkownika).
    *   `-g`, `--gid`: Przypisuje użytkownika do głównej grupy.
    *   `-G`, `--groups`: Dodaje użytkownika do grup dodatkowych. 
*   **passwd [nazwa_użytkownika]** – Nadawanie lub zmiana hasła dla danego konta.
*   **userdel -r [nazwa_użytkownika]** – Usuwanie użytkownika wraz z jego katalogiem domowym (`-r`).
*   **usermod  [nazwa_użytkownika]** – Zarządzanie użytkownikiem.
    * `-a`, `--append`: Dodaje użytkownika do grup dodatkowych (używane tylko z opcją `-G`). Zapobiega usunięciu użytkownika z grup, w których już się znajduje.
    * `-G`, `--groups`: Definiuje listę grup dodatkowych, do których użytkownik ma należeć.
    * `-l`, `--login`: Zmienia nazwę użytkownika (login).
    * `-d`, `--home`: Określa nową ścieżkę do katalogu domowego.
    * `-m`, `--move-home`: Przenosi zawartość aktualnego katalogu domowego do nowej lokalizacji (używane razem z `-d`).
    * `-s`, `--shell`: Ustawia nową domyślną powłokę logowania (np. `/bin/bash` ).
    * `-c`, `--comment`: Zmienia pole opisu/komentarza użytkownika (często używane do wpisania imienia i nazwiska).
    * `-e`, `--expiredate`: Ustawia datę wygaśnięcia konta (w formacie RRRR-MM-DD). 
    * `-u`, `--uid`: Zmienia unikalny identyfikator użytkownika (UID).
    * `-g`, `--gid`: Zmienia grupę podstawową użytkownika (nazwę lub numer GID).
    * `-L`, `--lock`: Blokuje konto użytkownika (uniemożliwia logowanie hasłem).
    * `-U`, `--unlock`: Odblokowuje wcześniej zablokowane konto.
## Zarządzanie Grupami
*   **groupadd [nazwa_grupy]** – Tworzenie nowej grupy w systemie.
*   **groupdel [nazwa_grupy]** – Usuwanie istniejącej grupy.
*   **usermod -aG [nazwa_grupy] [nazwa_użytkownika]** – Dodawanie istniejącego użytkownika do dodatkowej grupy (opcja `-a` zapobiega usunięciu z poprzednich grup).
*   **gpasswd -d [użytkownik] [grupa]** – Usuwanie użytkownika z konkretnej grupy.

## 3. Uprawnienia i Własność (Zarządzanie folderami i plikami)
*   **chown [użytkownik]:[grupa] [nazwa]** – Zmiana właściciela i grupy pliku lub folderu.
*   **chown -R [użytkownik] [folder]** – Rekurencyjna zmiana właściciela (dla folderu i całej jego zawartości).
*   **chmod [uprawnienia] [nazwa]** – Zmiana uprawnień dostępu.
    *   *Przykład:* `chmod 755 skrypt.sh` (rwx dla właściciela, rx dla reszty).
    *   *Przykład:* `chmod u+x plik` (nadanie praw wykonywania właścicielowi).

## 4. Informacje o kontach
*   **id [użytkownik]** – Wyświetla UID, GID oraz grupy, do których należy użytkownik.
*   **who** – Pokazuje, kto jest aktualnie zalogowany w systemie.
*   **last** – Lista ostatnio zalogowanych użytkowników.
*   **groups [użytkownik]** – Wyświetla nazwy grup, do których należy użytkownik.


