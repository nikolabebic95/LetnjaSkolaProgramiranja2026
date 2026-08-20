// Prava imena iz OpenStreetMap-a. Nijedno nije izmišljeno.
//
// Sve provereno preko Overpass API-ja 20. avgusta 2026. Svaki objekat ima link
// ka svojoj stranici na openstreetmap.org — otvori ga, to je ista ta baza koju
// bilo ko na svetu može da menja. Uključujući tebe.
//
//   naziv     — tačno ono što piše u OSM tagu `name`
//   latinica  — tag `name:sr-Latn`, ili null ako ga uopšte nema
//   traze     — ono što ljudi zaista kucaju kada traže ovo mesto
//   zamka     — zašto je baš ovaj primer ovde
//
// Podaci: © OpenStreetMap contributors, ODbL.

const MESTA = [
  // --- Ovo je cela poenta: podatak je tačan, a čovek ne može da nađe svoju opštinu.
  {
    naziv: "Градска општина Звездара",
    latinica: "Gradska opština Zvezdara",
    traze: ["Zvezdara", "Звездара"],
    tip: "gradska opština",
    koord: [44.77154, 20.53136],
    osm: "https://www.openstreetmap.org/relation/6930224",
    zamka: "Dva problema odjednom: i pismo i prefiks. Ni latinični tag ne pomaže — i on počinje sa 'Gradska opština'.",
  },

  // --- Isti prefiks, ali ime koje zvuči kao opis, a pravo je ime.
  {
    naziv: "Градска општина Стари град",
    latinica: "Gradska opština Stari grad",
    traze: ["Stari grad", "Стари град"],
    tip: "gradska opština",
    koord: [44.82071, 20.46159],
    osm: "https://www.openstreetmap.org/relation/2027114",
    zamka: "Zvuči kao opis ('stari deo grada'), ali je zvanično ime.",
  },
  {
    naziv: "Стари град",
    latinica: "Stari grad",
    traze: ["Stari grad", "Стари град"],
    tip: "naselje",
    koord: [44.81975, 20.46015],
    osm: "https://www.openstreetmap.org/node/7015932276",
    zamka: "U Srbiji postoji šest mesta koja se zovu tačno 'Стари град'. Pravilo 'obriši generička imena' bi obrisalo svih šest.",
  },

  // --- Kontrola: ovde prefiks pravilo radi savršeno.
  {
    naziv: "Градска општина Нови Београд",
    latinica: "Gradska opština Novi Beograd",
    traze: ["Novi Beograd", "Нови Београд"],
    tip: "gradska opština",
    koord: [44.80228, 20.38701],
    osm: "https://www.openstreetmap.org/relation/3085749",
    zamka: null,
  },
  {
    naziv: "Град Београд",
    latinica: "Grad Beograd",
    traze: ["Beograd", "Београд"],
    tip: "grad",
    koord: [44.67985, 20.41457],
    osm: "https://www.openstreetmap.org/relation/1677007",
    zamka: "Drugi prefiks ('Град'), pa ti treba i on u spisku.",
  },

  // --- Najteži slučaj kod nas: ime je PRIDEV izveden od imenice.
  // Skidanje prefiksa ovde ne pomaze uopste — reč koju čovek kuca ne postoji u podacima.
  {
    naziv: "Златиборски управни округ",
    latinica: "Zlatiborski upravni okrug",
    traze: ["Zlatibor", "Златибор"],
    tip: "okrug",
    koord: [43.58798, 19.76007],
    osm: "https://www.openstreetmap.org/relation/2114084",
    zamka: "Ti kažeš 'Zlatibor'. U podacima piše 'Zlatiborski'. Skini 'upravni okrug' i dobiješ 'Zlatiborski' — i dalje ne ono što si tražio.",
  },
  {
    naziv: "Моравички управни округ",
    latinica: "Moravički upravni okrug",
    traze: ["Moravica", "Моравица"],
    tip: "okrug",
    koord: [43.77213, 20.28481],
    osm: "https://www.openstreetmap.org/relation/2114082",
    zamka: "Okrug je dobio ime po reci Moravici. Reč 'Moravica' ne postoji nigde u imenu — moraš da je izmisliš nazad.",
  },

  // --- Dva mesta, jedno te isto ime, slovo u slovo. Koje prvo prikazuješ?
  {
    naziv: "Градска општина Палилула",
    latinica: "Gradska opština Palilula",
    traze: ["Palilula", "Палилула"],
    tip: "gradska opština",
    koord: [44.93888, 20.45888],
    osm: "https://www.openstreetmap.org/relation/7737269",
    zamka: "Palilula u Beogradu.",
  },
  {
    naziv: "Градска општина Палилула",
    latinica: "Gradska opština Palilula",
    traze: ["Palilula", "Палилула"],
    tip: "gradska opština",
    koord: [43.29245, 21.85305],
    osm: "https://www.openstreetmap.org/relation/10276545",
    zamka: "Palilula u Nišu. Isto ime, isti tip, drugo mesto — sada ti treba i rangiranje.",
  },

  // --- Zamke za naivno "skini prefiks": stvarna sela koja počinju na 'Град'.
  {
    naziv: "Градиште",
    latinica: null,
    traze: ["Gradište", "Градиште"],
    tip: "naselje",
    koord: [43.52295, 22.36642],
    osm: "https://www.openstreetmap.org/relation/6357746",
    zamka: "startswith('Град') seče ovo u 'иште'. I nema latinični tag, pa ni to ne spašava.",
  },
  {
    naziv: "Градац",
    latinica: "Gradac",
    traze: ["Gradac", "Градац"],
    tip: "naselje",
    koord: [43.21984, 20.90274],
    osm: "https://www.openstreetmap.org/relation/6952135",
    zamka: "Postaje 'ац'.",
  },
  {
    naziv: "Градашница",
    latinica: "Gradašnica",
    traze: ["Gradašnica", "Градашница"],
    tip: "naselje",
    koord: [43.03759, 22.07278],
    osm: "https://www.openstreetmap.org/relation/7232970",
    zamka: "Postaje 'ашница'.",
  },
  {
    naziv: "Градсково",
    latinica: null,
    traze: ["Gradskovo", "Градсково"],
    tip: "naselje",
    koord: [44.01253, 22.37866],
    osm: "https://www.openstreetmap.org/relation/6354917",
    zamka: "Postaje 'сково', i takođe nema latinicu.",
  },

  // --- Ime koje je zapravo opis.
  {
    naziv: "Извор",
    latinica: "Izvor",
    traze: ["Izvor", "Извор"],
    tip: "selo",
    koord: [42.51550, 22.51317],
    osm: "https://www.openstreetmap.org/node/2185711007",
    zamka: "Selo se zove 'Извор'. U Srbiji ih ima šest sa istim imenom.",
  },
  {
    naziv: "Поток",
    latinica: "Potok",
    traze: ["Potok", "Поток"],
    tip: "selo",
    koord: [43.42786, 19.66793],
    osm: "https://www.openstreetmap.org/node/3217454152",
    zamka: null,
  },
  {
    naziv: "Река",
    latinica: "Reka",
    traze: ["Reka", "Река"],
    tip: "selo",
    koord: [43.44585, 20.49759],
    osm: "https://www.openstreetmap.org/node/3709594576",
    zamka: null,
  },

  // --- Isto ime, dva mesta — a maper je rešio tako što je objašnjenje ugurao u ime.
  {
    naziv: "Младеновац",
    latinica: "Mladenovac",
    traze: ["Mladenovac", "Младеновац"],
    tip: "varošica",
    koord: [44.44012, 20.69415],
    osm: "https://www.openstreetmap.org/node/364942011",
    zamka: null,
  },
  {
    naziv: "Младеновац (село)",
    latinica: "Mladenovac (selo)",
    traze: ["Mladenovac", "Младеновац"],
    tip: "selo",
    koord: [44.45870, 20.70242],
    osm: "https://www.openstreetmap.org/node/5948376284",
    zamka: "Niko se ne zove 'Mladenovac (selo)'. Zagrada je u imenu zato što drugog mesta nije bilo.",
  },

  // --- Ista reč, druga strana granice, drugo pismo u istom tagu.
  {
    naziv: "Foča",
    latinica: "Foča",
    traze: ["Foča", "Фоча"],
    tip: "varošica",
    koord: [43.50586, 18.77439],
    osm: "https://www.openstreetmap.org/node/251856799",
    zamka: "U Bosni i Hercegovini `name` je latinicom, a u Srbiji ćirilicom. Ista baza, suprotno pravilo.",
  },
];

// Primeri iz sveta — za priču, ne za pretragu.
const SVET = [
  {
    naziv: "Piran / Pirano",
    traze: ["Piran"],
    zemlja: "Slovenija",
    koord: [45.52849, 13.56845],
    osm: "https://www.openstreetmap.org/node/29098903",
    zamka: "Dva jezika u istom tagu, razdvojena kosom crtom. Ceo slovenački primorski pojas je ovakav — Izola / Isola, Portorož / Portorose. Isto i na mađarskoj strani — Lendava / Lendva.",
  },
  {
    naziv: "województwo łódzkie",
    traze: ["Woj. Łódzkie"],
    zemlja: "Poljska",
    osm: "https://www.openstreetmap.org/relation/224458",
    zamka: "Ono što ljudi hoće da vide ne postoji nigde u podacima. Ne možeš da ga skineš — moraš da ga izmisliš.",
  },
  {
    naziv: "Δήμος Τεμπών",
    traze: ["Τέμπη"],
    zemlja: "Grčka",
    osm: "https://www.openstreetmap.org/relation/2246179",
    zamka: "Reč menja oblik, ne gubi samo prefiks. Isto kao Zvezdara → Zvezdare → Zvezdari. Sečenje stringa ne zna gramatiku.",
  },
  {
    naziv: "ⵍⵣⵣⴰⵢⴻⵔ الجزائر",
    traze: ["Alžir"],
    zemlja: "Alžir",
    osm: "https://www.openstreetmap.org/relation/192756",
    zamka: "Dva pisma u jednom tagu. Koje ide na mapu? Kada je ovaj govor prvi put držan, bila su tri — francusko ime je u međuvremenu obrisano.",
  },
];
