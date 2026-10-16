// Questions only. The quizmaster reads the answers aloud at the end, so they never ship with the site.
export const subjects = [
  {
    key: "yhteiskuntaoppi",
    title: "Yhteiskuntaoppi",
    color: "#2f7fd8",
    questions: [
      "Kuinka monta allekirjoitusta kansalaisaloite tarvitsee, jotta eduskunta ottaa sen käsiteltäväksi?",
      "Kuinka monta jäsenmaata Euroopan unionissa on?",
      "Minä vuonna Suomesta tuli Naton jäsen?",
    ],
  },
  {
    key: "uskonto",
    title: "Uskonto",
    color: "#8b4fc9",
    questions: [
      "Kenet Raamatussa nieli suuri kala?",
      "Mikä on islamin pyhä kirja?",
      "Mitä kristillistä juhlaa vietetään 50 päivää pääsiäisen jälkeen?",
    ],
  },
  {
    key: "matematiikka",
    title: "Matematiikka",
    color: "#e2463f",
    questions: [
      "Kuinka monta särmää kuutiolla on?",
      "Mikä on säännöllisen kuusikulmion kulmien summa?",
      "Kun heität kahta noppaa, mikä silmälukujen summa on todennäköisin?",
    ],
  },
  {
    key: "aidinkieli",
    title: "Äidinkieli",
    color: "#e0559a",
    questions: [
      "Missä sijamuodossa on sana ”talossa”?",
      "Kuka on Suomen ainoa kirjallisuuden Nobel-palkinnon saaja?",
      "Mihin sanaluokkaan sana ”nopeasti” kuuluu?",
    ],
  },
  {
    key: "fysiikka",
    title: "Fysiikka",
    color: "#1d9aa8",
    questions: [
      "Mikä on voiman yksikkö SI-järjestelmässä?",
      "Mitä kirjain I tarkoittaa Ohmin laissa U = RI?",
      "Mikä on valon nopeus tyhjiössä suunnilleen?",
    ],
  },
  {
    key: "kemia",
    title: "Kemia",
    color: "#5aa832",
    questions: [
      "Minkä alkuaineen kemiallinen merkki on Au?",
      "Mikä metalli on huoneenlämmössä nestemäistä?",
      "Mikä on puhtaan veden pH?",
    ],
  },
  {
    key: "biologia",
    title: "Biologia",
    color: "#2e9d5b",
    questions: [
      "Mikä veriryhmä sopii luovutettavaksi kaikille vastaanottajille?",
      { text: "Tunnista laji.", figure: "bird" },
      "Kuinka monta kromosomia ihmisen tavallisessa solussa on?",
    ],
  },
  {
    key: "historia",
    title: "Historia",
    color: "#b5702e",
    questions: [
      "Minä vuonna Suomesta tuli Venäjän autonominen suuriruhtinaskunta?",
      "Minä vuonna Berliinin muuri murtui?",
      "Minkä henkilön murha Sarajevossa vuonna 1914 käynnisti ensimmäisen maailmansodan?",
    ],
  },
  {
    key: "musiikki",
    title: "Musiikki",
    color: "#f08a24",
    questions: [
      { text: "Mikä on kuvassa näkyvän symbolin nimi?", symbol: "\u{1D11E}" },
      "Mitä dynamiikkamerkintä f eli forte tarkoittaa?",
      "Mitä tempomerkintä allegro tarkoittaa?",
    ],
  },
  {
    key: "puutyot",
    title: "Puutyöt",
    color: "#c9822f",
    questions: [
      "Mistä puulajista suomalainen vaneri valmistetaan yleisimmin?",
      "Mikä on Suomen metsien yleisin puulaji?",
      "Mikä on sen puuliitoksen nimi, jossa toisen laudan kieli sopii toisen laudan uraan?",
    ],
  },
  {
    key: "kuvaamataito",
    title: "Kuvaamataito",
    color: "#7b5cd6",
    questions: [
      { text: "Kuka maalasi teoksen Huuto?", figure: "painting" },
      "Mikä grafiikan menetelmä perustuu siihen, että kuvio syövytetään metallilaattaan hapolla?",
      "Mikä maalaustekniikka tarkoittaa maalaamista märälle kalkkirappaukselle?",
    ],
  },
  {
    key: "maantieto",
    title: "Maantieto",
    color: "#1f8fc4",
    questions: [
      "Mikä on Ruotsin korkein vuori?",
      "Mikä on Euroopan pisin joki?",
      "Mikä on Suomen pohjoisin kunta?",
    ],
  },
  {
    key: "terveystieto",
    title: "Terveystieto",
    color: "#e2463f",
    questions: [
      "Mikä hormoni laskee veren sokeripitoisuutta?",
      "Mikä on ruorijuopumuksen promilleraja Suomessa?",
      "Mikä on aikuisen elvytyksessä painallusten ja puhallusten suhde?",
    ],
  },
];

// Traced from the quizmaster's chart (Finland vs. OECD average); larger is better, units are chart height, not PISA points.
export const pisa = {
  years: [2006, 2009, 2012, 2015, 2018, 2022, 2025],
  series: [
    { label: "luonnontieteet", color: "#2ec4d6", finland: [386, 354, 255, 220, 200, 96, 30], oecd: [173, 177, 164, 150, 150, 78, 25] },
    { label: "lukeminen", color: "#ff8f2e", finland: [454, 414, 374, 310, 270, 219, 188], oecd: [181, 196, 192, 154, 137, 126, 105] },
    { label: "matematiikka", color: "#ffd96b", finland: [380, 332, 278, 286, 259, 123, 51], oecd: [146, 164, 173, 154, 137, 88, 15] },
  ],
};

// High schools with their 2026 admission cut-off (lukuaineiden keskiarvo), most selective first.
export const schools = [
  { name: "Helsingin normaalilyseo (Helsinki)", year: 2026, limit: 9.58 },
  { name: "Ressun lukio (Helsinki)", year: 2026, limit: 9.54 },
  { name: "Tampereen yliopiston normaalikoulun lukio", year: 2026, limit: 9.33 },
  { name: "Jyväskylän normaalikoulun lukio", year: 2026, limit: 9.25 },
  { name: "Otaniemen lukio (Espoo)", year: 2026, limit: 9.17 },
  { name: "Tapiolan lukio (Espoo)", year: 2026, limit: 9.17 },
  { name: "Kulosaaren yhteiskoulun lukio (Helsinki)", year: 2026, limit: 9.17 },
  { name: "Töölön yhteiskoulun lukio (Helsinki)", year: 2026, limit: 9.08 },
  { name: "Kerttulin lukio (Turku)", year: 2026, limit: 9.00 },
  { name: "Tampereen lyseon lukio", year: 2026, limit: 8.83 },
  { name: "Turun Suomalaisen Yhteiskoulun lukio", year: 2026, limit: 8.83 },
  { name: "Alppilan lukio (Helsinki)", year: 2026, limit: 8.77 },
  { name: "Puolalanmäen lukio (Turku)", year: 2026, limit: 8.75 },
  { name: "Pyynikin lukio (Tampere)", year: 2026, limit: 8.42 },
  { name: "Helsingin kielilukio", year: 2026, limit: 8.42 },
  { name: "Martinlaakson lukio (Vantaa)", year: 2026, limit: 8.33 },
  { name: "Tampereen yhteiskoulun lukio", year: 2026, limit: 8.25 },
  { name: "Luostarivuoren Lyseon lukio (Turku)", year: 2026, limit: 8.08 },
  { name: "Vaskivuoren lukio (Vantaa)", year: 2026, limit: 7.92 },
  { name: "Turun klassillinen lukio", year: 2026, limit: 7.92 },
  { name: "Kallion lukio (Helsinki)", year: 2026, limit: 7.85 },
  { name: "Tampereen teknillinen lukio", year: 2026, limit: 7.75 },
  { name: "Tikkurilan lukio (Vantaa)", year: 2026, limit: 7.75 },
  { name: "Konepajan lukio (Helsinki)", year: 2026, limit: 7.69 },
  { name: "Sotungin lukio (Vantaa)", year: 2026, limit: 7.67 },
  { name: "Vuosaaren lukio (Helsinki)", year: 2026, limit: 7.58 },
  { name: "Helsingin medialukio", year: 2026, limit: 7.15 },
  { name: "Lumon lukio (Vantaa)", year: 2026, limit: 7.08 },
  { name: "Euran lukio", year: 2026, limit: 5.33 },
  { name: "Kouvolan yhteislukio, Kuusankosken toimipiste", year: 2026, limit: 5.33 },
];
