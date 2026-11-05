# Krzyżówka informatyczna

## Opis projektu

Projekt przedstawia interaktywną krzyżówkę wykonaną przy użyciu biblioteki React oraz narzędzia Vite.
Krzyżówka składa się z planszy o wymiarach 13 × 13 pól. Zawiera 10 haseł, które należy odgadnąć na podstawie przygotowanych definicji.
Hasła zostały rozmieszczone poziomo i pionowo, a niektóre z nich przecinają się ze sobą.

## Wykorzystane technologie

- React
- JavaScript
- Vite
- CSS
- Vitest
- React Testing Library

## Funkcjonalności

- Wpisywanie liter do pól krzyżówki.
- Automatyczne przechodzenie do kolejnego pola.
- Wybieranie haseł poprzez kliknięcie definicji.
- Podświetlanie aktywnego hasła.
- Sprawdzanie poprawności wpisanych odpowiedzi.
- Podświetlanie poprawnych odpowiedzi na zielono.
- Podświetlanie błędnych odpowiedzi na czerwono.
- Wyświetlanie kompletnego rozwiązania.
- Czyszczenie całej planszy.
- Licznik wypełnionych pól.

## Uruchomienie projektu

### 1. Pobranie projektu

Sklonuj repozytorium:

`git clone ADRES_REPOZYTORIUM`

### 2. Instalacja zależności

Przejdź do folderu projektu i wpisz:

`npm install`

### 3. Uruchomienie aplikacji

`npm run dev`

Aplikacja zostanie uruchomiona na lokalnym serwerze Vite.

## Testowanie

Projekt wykorzystuje Vitest oraz React Testing Library.

Aby uruchomić testy jednostkowe, wpisz:

`npm run test`

Testy sprawdzają między innymi:

- Wyświetlanie aplikacji.
- Wyświetlanie definicji.
- Działanie przycisków.
- Walidację wpisywanych znaków.
- Pokazywanie rozwiązania.
- Czyszczenie planszy.
- Podświetlanie aktywnego hasła.