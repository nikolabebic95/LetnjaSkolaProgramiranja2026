// Pretraga imena — isto ovo radi i u prezentaciji i na igralištu.
//
// Model pretrage: ime MORA da počinje onim što si ukucao. Tako radi svaki
// "autocomplete" — kad kucaš u pretragu mapa, ona traži imena koja počinju
// tvojim slovima. Zapamti to, jer je pola priče upravo u toj rečenici.

// Prefiksi koje pokušavamo da skinemo. Ovo je spisak koji se menja uživo.
const PREFIKSI = [
  "Градска општина",
  "Општина",
  "Град",
  "Gradska opština",
  "Opština",
  "Grad",
];

// Naivno: "da li ime počinje ovim slovima?"
// Ovo je verzija koju svi napišemo iz prve. I ovde je bug.
function skiniPrefiksNaivno(ime, prefiksi = PREFIKSI) {
  for (const p of prefiksi) {
    if (ime.startsWith(p)) {
      return ime.slice(p.length).trim();
    }
  }
  return ime;
}

// Ispravno: prefiks mora da bude cela reč, pa tek onda razmak.
function skiniPrefiks(ime, prefiksi = PREFIKSI) {
  for (const p of prefiksi) {
    if (ime.startsWith(p + " ")) {
      return ime.slice(p.length + 1).trim();
    }
  }
  return ime;
}

// Pravi string po kome se zaista traži, u zavisnosti od toga šta je uključeno.
//   opcije.pismo   — koristi latinični tag umesto ćiriličnog imena
//   opcije.prefiks — skini administrativni prefiks
//   opcije.naivno  — koristi pokvarenu verziju skidanja prefiksa
function zaPretragu(mesto, opcije = {}) {
  let ime = mesto.naziv;

  if (opcije.pismo) {
    // Ako mesto nema latinični tag, nemamo šta da uzmemo — ostaje ćirilica.
    ime = mesto.latinica || mesto.naziv;
  }

  if (opcije.prefiks) {
    ime = opcije.naivno ? skiniPrefiksNaivno(ime) : skiniPrefiks(ime);
  }

  return ime;
}

function trazi(upit, mesta, opcije = {}) {
  const q = upit.trim().toLowerCase();
  if (!q) return [];

  return mesta
    .map((mesto) => ({ mesto, kljuc: zaPretragu(mesto, opcije) }))
    .filter(({ kljuc }) => kljuc.toLowerCase().startsWith(q));
}
