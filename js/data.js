// Questions only. The quizmaster reads the answers aloud at the end, so they never ship with the site.
export const subjects = [
  {
    key: "yhteiskuntaoppi",
    title: "Yhteiskuntaoppi",
    color: "#2f7fd8",
    questions: [
      "Kuinka monta allekirjoitusta kansalaisaloite tarvitsee, jotta eduskunta ottaa sen käsiteltäväksi?",
      "Kuinka monta jäsenmaata Euroopan unionissa on?",
      "Kuinka monen vuoden välein eduskuntavaalit järjestetään?",
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
      "Mikä eläin on Suomen kansalliseläin?",
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
      "Kuka hävisi Waterloon taistelun vuonna 1815?",
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
      "Kuinka monta senttimetriä on yksi tuuma?",
    ],
  },
  {
    key: "kasityot",
    title: "Käsityöt",
    color: "#e05b7c",
    questions: [
      "Mikä on sen ompelukoneen osan nimi, joka painaa kangasta alaspäin ompelun aikana?",
      "Mitä ompelukoneen ommelta käytetään yleisimmin kankaan reunan huolitteluun?",
      "Mihin sormeen sormustin laitetaan?",
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
      "Mikä on rattijuopumuksen promilleraja Suomessa?",
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
