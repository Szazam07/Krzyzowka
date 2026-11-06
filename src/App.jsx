import { useState, useRef } from "react";
import "./App.css";

function App() {

  const hasla = [
    { nr: 1, slowo: "FUNKCJA", r: 0, c: 3, kierunek: "poziom" },
    { nr: 2, slowo: "KOMPILATOR", r: 0, c: 6, kierunek: "pion" },
    { nr: 3, slowo: "REACT", r: 1, c: 10, kierunek: "pion" },
    { nr: 4, slowo: "SERWER", r: 2, c: 3, kierunek: "pion" },
    { nr: 5, slowo: "PETLA", r: 3, c: 6, kierunek: "poziom" },
    { nr: 6, slowo: "GIT", r: 5, c: 8, kierunek: "poziom" },
    { nr: 7, slowo: "BŁĄD", r: 5, c: 12, kierunek: "pion" },
    { nr: 8, slowo: "ZMIENNA", r: 6, c: 0, kierunek: "poziom" },
    { nr: 9, slowo: "TABLICĄ", r: 7, c: 6, kierunek: "poziom" },
    { nr: 10, slowo: "JAVASCRIPT", r: 9, c: 0, kierunek: "poziom" }
  ];

  const definicjePoziomo = [
    "Wydzielony, wywoływalny fragment kodu (7)",
    "Instrukcja powtarzająca fragment kodu (5)",
    "System kontroli wersji (3)",
    "Nazwane miejsce w pamięci na dane (7)",
    "Uporządkowaną kolekcją elementów nazywamy (7)",
    "Język skryptowy działający w przeglądarce (10)"
  ];

  const definicjePionowo = [
    "Program tłumaczący kod źródłowy na kod maszynowy (10)",
    "Biblioteka do budowania interfejsów od Meta (5)",
    "Komputer udostępniający usługi w sieci (6)",
    "Polska nazwa buga (4)"
  ];

  const [odpowiedzi, setOdpowiedzi] = useState({});
  const [aktywneHaslo, setAktywneHaslo] = useState(null);
  const [aktywnePole, setAktywnePole] = useState(null);
  const [sprawdzone, setSprawdzone] = useState(false);

  const pola = useRef({});

  const plansza = {};

  hasla.forEach((haslo) => {

    for (let i = 0; i < haslo.slowo.length; i++) {

      let r = haslo.r;
      let c = haslo.c;

      if (haslo.kierunek === "poziom") {
        c += i;
      } else {
        r += i;
      }

      let klucz = r + "-" + c;

      if (!plansza[klucz]) {
        plansza[klucz] = {
          litera: haslo.slowo[i],
          numer: i === 0 ? haslo.nr : null
        };
      } else if (i === 0) {
        plansza[klucz].numer = haslo.nr;
      }

    }

  });

  function normalizuj(litera) {
    return litera
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function wpiszLitere(e, r, c) {

    let litera = e.target.value.toUpperCase();

    litera = litera.replace(/[^A-ZĄĆĘŁŃÓŚŹŻ]/g, "");
    litera = litera.slice(0, 1);

    let klucz = r + "-" + c;

    setOdpowiedzi({
      ...odpowiedzi,
      [klucz]: litera
    });

    setSprawdzone(false);

    if (litera && aktywneHaslo !== null) {

      let haslo = hasla[aktywneHaslo];

      let index;

      if (haslo.kierunek === "poziom") {
        index = c - haslo.c;
      } else {
        index = r - haslo.r;
      }

      if (index < haslo.slowo.length - 1) {

        let nextR = haslo.r;
        let nextC = haslo.c;

        if (haslo.kierunek === "poziom") {
          nextC += index + 1;
        } else {
          nextR += index + 1;
        }

        let nextKey = nextR + "-" + nextC;

        pola.current[nextKey]?.focus();

      }

    }

  }

  function wybierzHaslo(index) {

    setAktywneHaslo(index);

    let haslo = hasla[index];

    let klucz = haslo.r + "-" + haslo.c;

    pola.current[klucz]?.focus();

  }

  function wybierzPole(r, c) {

    let index = hasla.findIndex((haslo) => {

      if (haslo.kierunek === "poziom") {

        return r === haslo.r &&
          c >= haslo.c &&
          c < haslo.c + haslo.slowo.length;

      }

      return c === haslo.c &&
        r >= haslo.r &&
        r < haslo.r + haslo.slowo.length;

    });

    if (index !== -1) {
      setAktywneHaslo(index);
    }

  }

  function sprawdz() {
    setSprawdzone(true);
  }

  function rozwiazanie() {

    let noweOdpowiedzi = {};

    Object.keys(plansza).forEach((klucz) => {
      noweOdpowiedzi[klucz] = plansza[klucz].litera;
    });

    setOdpowiedzi(noweOdpowiedzi);
    setSprawdzone(true);

  }

  function wyczysc() {

    setOdpowiedzi({});
    setSprawdzone(false);
    setAktywneHaslo(null);
    setAktywnePole(null);

  }

  function czyAktywne(r, c) {

    if (aktywneHaslo === null) return false;

    let haslo = hasla[aktywneHaslo];

    if (haslo.kierunek === "poziom") {

      return r === haslo.r &&
        c >= haslo.c &&
        c < haslo.c + haslo.slowo.length;

    }

    return c === haslo.c &&
      r >= haslo.r &&
      r < haslo.r + haslo.slowo.length;

  }

  function czyPoprawna(klucz) {

    return normalizuj(odpowiedzi[klucz] || "") ===
      normalizuj(plansza[klucz].litera);

  }

  let licznik = 0;

  Object.keys(plansza).forEach((klucz) => {

    if (odpowiedzi[klucz]) {
      licznik++;
    }

  });

  let liczbaPol = Object.keys(plansza).length;

  return (

    <div className="aplikacja">

      <h1>Krzyżówka</h1>

      <div className="glowna">

        <div className="lewa">

          <div className="plansza">

            {Array.from({ length: 13 }, (_, r) => (

              <div className="wiersz" key={r}>

                {Array.from({ length: 13 }, (_, c) => {

                  let klucz = r + "-" + c;
                  let pole = plansza[klucz];

                  if (!pole) {
                    return <div className="puste" key={c}></div>;
                  }

                  let kolor = "";

                  if (sprawdzone) {

                    kolor = czyPoprawna(klucz)
                      ? "poprawne"
                      : "bledne";

                  } else if (czyAktywne(r, c)) {

                    kolor = "aktywne";

                  }

                  return (

                    <div className={"pole " + kolor} key={c}>

                      {pole.numer && (
                        <span className="numer">
                          {pole.numer}
                        </span>
                      )}

                      <input
                        ref={(el) => {
                          pola.current[klucz] = el;
                        }}
                        maxLength="1"
                        value={odpowiedzi[klucz] || ""}
                        onChange={(e) => wpiszLitere(e, r, c)}
                        onFocus={() => setAktywnePole(klucz)}
                        onClick={() => wybierzPole(r, c)}
                        className={
                          aktywnePole === klucz
                            ? "zaznaczone"
                            : ""
                        }
                      />

                    </div>

                  );

                })}

              </div>

            ))}

          </div>

          <div className="przyciski">

            <button onClick={sprawdz}>
              Sprawdź
            </button>

            <button onClick={rozwiazanie}>
              Pokaż rozwiązanie
            </button>

            <button onClick={wyczysc}>
              Wyczyść
            </button>

          </div>

          <div className="licznik">
            {licznik}/{liczbaPol}
          </div>

        </div>

        <div className="definicje">

          <h2>Poziomo</h2>

          {[0, 4, 5, 7, 8, 9].map((nr, index) => (

            <div
              className={
                aktywneHaslo === nr
                  ? "definicja wybrana"
                  : "definicja"
              }
              key={nr}
              onClick={() => wybierzHaslo(nr)}
            >

              <strong>{nr + 1}.</strong>
              <span>{definicjePoziomo[index]}</span>

            </div>

          ))}

          <h2 className="pionowo">Pionowo</h2>

          {[1, 2, 3, 6].map((nr, index) => (

            <div
              className={
                aktywneHaslo === nr
                  ? "definicja wybrana"
                  : "definicja"
              }
              key={nr}
              onClick={() => wybierzHaslo(nr)}
            >

              <strong>{nr + 1}.</strong>
              <span>{definicjePionowo[index]}</span>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default App;