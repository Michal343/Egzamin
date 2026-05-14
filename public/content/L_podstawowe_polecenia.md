# Podstawowe Polecenia Terminala (Linux)

Ten dokument zawiera zestawienie najważniejszych poleceń systemowych, ich opis oraz przykłady użycia. Jest to niezbędnik dla każdego administratora i ucznia przygotowującego się do egzaminów z systemów operacyjnych.

| Polecenie | Działanie | Przykład użycia |
| :--- | :--- | :--- |
| **ls** | Listowanie zawartości katalogu. | `ls -l` (szczegóły), `ls -a` (ukryte pliki) |
| **cd** | Zmiana katalogu (nawigacja). | `cd /etc/bind`, `cd ..` (folder wyżej) |
| **pwd** | Wyświetla pełną ścieżkę aktualnego katalogu. | `pwd` |
| **mkdir** | Tworzenie nowego folderu. | `mkdir dane_egzamin` |
| **touch** | Tworzenie pustego pliku. | `touch konfiguracja.txt` |
| **cp** | Kopiowanie plików lub folderów. | `cp plik.txt /home/uzytkownik/` |
| **mv** | Przenoszenie lub zmiana nazwy pliku. | `mv stary_plik.txt nowy_plik.txt` |
| **rm** | Usuwanie plików (uważaj!). | `rm plik.txt`, `rm -r folder` (usuwa z zawartością) |
| **cat** | Wyświetlanie zawartości pliku w terminalu. | `cat /etc/network/interfaces` |
| **nano** | Prosty edytor tekstowy (najlepszy na egzamin). | `sudo nano /etc/netplan/00-config.yaml` |
| **grep** | Wyszukiwanie frazy w tekście. | `cat plik.txt \| grep "szukane_slowo"` |
| **history** | Wyświetla listę ostatnio używanych poleceń. | `history` |
| **clear** | Czyści okno terminala. | `clear` |

