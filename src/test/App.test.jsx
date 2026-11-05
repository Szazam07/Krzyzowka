import { describe, test, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import App from "../App";

afterEach(() => {
  cleanup();
});

describe("Testowanie krzyżówki", () => {

  // Test 1 - sprawdzanie czy aplikacja się wyświetla
  test("Wyświetla tytuł krzyżówki", () => {

    render(<App />);

    expect(screen.getByText("Krzyżówka")).toBeInTheDocument();

  });

  // Test 2 - sprawdzanie liczby definicji
  test("Wyświetla wszystkie 10 definicji", () => {

    render(<App />);

    expect(screen.getByText(/Wydzielony, wywoływalny fragment kodu/)).toBeInTheDocument();
    expect(screen.getByText(/Program tłumaczący kod źródłowy/)).toBeInTheDocument();
    expect(screen.getByText(/Biblioteka do budowania interfejsów/)).toBeInTheDocument();
    expect(screen.getByText(/Komputer udostępniający usługi/)).toBeInTheDocument();
    expect(screen.getByText(/Instrukcja powtarzająca fragment kodu/)).toBeInTheDocument();
    expect(screen.getByText(/System kontroli wersji/)).toBeInTheDocument();
    expect(screen.getByText(/Polska nazwa buga/)).toBeInTheDocument();
    expect(screen.getByText(/Nazwane miejsce w pamięci/)).toBeInTheDocument();
    expect(screen.getByText(/Uporządkowana kolekcja elementów/)).toBeInTheDocument();
    expect(screen.getByText(/Język skryptowy działający/)).toBeInTheDocument();

  });

  // Test 3 - sprawdzanie przycisków
  test("Wyświetla trzy przyciski", () => {

    render(<App />);

    expect(screen.getByText("Sprawdź")).toBeInTheDocument();
    expect(screen.getByText("Pokaż rozwiązanie")).toBeInTheDocument();
    expect(screen.getByText("Wyczyść")).toBeInTheDocument();

  });

  // Test 4 - sprawdzanie czy można wpisać tylko jedną literę
  test("Nie pozwala wpisać dwóch liter jednocześnie", () => {

    render(<App />);

    const input = document.querySelector(".pole input");

    fireEvent.change(input, {
      target: { value: "AB" }
    });

    expect(input.value).toBe("A");

  });

  // Test 5 - sprawdzanie czy nie można wpisać cyfry
  test("Nie pozwala wpisywać cyfr", () => {

    render(<App />);

    const input = document.querySelector(".pole input");

    fireEvent.change(input, {
      target: { value: "5" }
    });

    expect(input.value).toBe("");

  });

  // Test 6 - sprawdzanie pokazywania rozwiązania
  test("Przycisk pokazania rozwiązania wypełnia planszę", () => {

    render(<App />);

    fireEvent.click(screen.getByText("Pokaż rozwiązanie"));

    const inputs = document.querySelectorAll(".pole input");

    inputs.forEach((input) => {
      expect(input.value).not.toBe("");
    });

    expect(document.querySelectorAll(".poprawne").length).toBeGreaterThan(0);

  });

  // Test 7 - sprawdzanie czyszczenia planszy
  test("Przycisk wyczyść usuwa wszystkie odpowiedzi", () => {

    render(<App />);

    fireEvent.click(screen.getByText("Pokaż rozwiązanie"));

    fireEvent.click(screen.getByText("Wyczyść"));

    const inputs = document.querySelectorAll(".pole input");

    inputs.forEach((input) => {
      expect(input.value).toBe("");
    });

  });

  // Test 8 - sprawdzanie podświetlania hasła
  test("Kliknięcie definicji podświetla odpowiednie pola", () => {

    render(<App />);

    fireEvent.click(
      screen.getByText(/Biblioteka do budowania interfejsów/)
    );

    const aktywnePola = document.querySelectorAll(".aktywne");

    expect(aktywnePola.length).toBe(5);

  });

});