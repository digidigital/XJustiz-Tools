var arr_kanzleiform = [
  {
    key: "001",
    val: "Einzelanwalt"
  },
  {
    key: "002",
    val: "Sozietät"
  }
];

var arr_empfaenger = [
  {
    key: "1",
    val: "Empfänger ist Gericht*"
  },
  {
    key: "2",
    val: "Empfänger ist Polizei*"
  },
  {
    key: "3",
    val: "Sonstiger Empfänger*"
  }
];

var arr_bestandteiltyp = [
  {
    key: "001",
    val: "Original"
  },
  {
    key: "002",
    val: "Repräsentat"
  },
  {
    key: "003",
    val: "Signaturdatei"
  },
  {
    key: "004",
    val: "signierte Vorversion"
  },
  {
    key: "006",
    val: "Transfervermerk"
  },
  {
    key: "010",
    val: "Prüfvermerk"
  },
  {
    key: "011",
    val: "VHN"
  },
  {
    key: "012",
    val: "hinlaufendes eEB"
  }
];




var arr_sache = [
  {
    "-value": "001",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Adoptionssachen" }
    }
  },
  {
    "-value": "002",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Baulandsachen" }
    }
  },
  {
    "-value": "003",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Beratungshilfesachen" }
    }
  },
  {
    "-value": "004",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Betreuungssachen" }
    }
  },
  {
    "-value": "005",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Ermittlungsrichter" }
    }
  },
  {
    "-value": "006",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Ermittlungsverfahren" }
    }
  },
  {
    "-value": "007",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Ermittlungssache" }
    }
  },
  {
    "-value": "008",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Erweitertes Schöffengericht" }
    }
  },
  {
    "-value": "009",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Erzwingungshaft" }
    }
  },
  {
    "-value": "010",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Familiensachen" }
    }
  },
  {
    "-value": "011",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Führungsaufsicht" }
    }
  },
  {
    "-value": "012",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Genossenschaftsregister" }
    }
  },
  {
    "-value": "013",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Grundbuchsachen" }
    }
  },
  {
    "-value": "014",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Güterrechtssachen" }
    }
  },
  {
    "-value": "015",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Handelsregister" }
    }
  },
  {
    "-value": "016",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Handelssachen" }
    }
  },
  {
    "-value": "017",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Hinterlegungssachen" }
    }
  },
  {
    "-value": "018",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Insolvenzsachen" }
    }
  },
  {
    "-value": "019",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Jugendkammer" }
    }
  },
  {
    "-value": "020",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Jugendrichter" }
    }
  },
  {
    "-value": "021",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Jugendschöffensachen" }
    }
  },
  {
    "-value": "022",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Landwirtschaftssachen" }
    }
  },
  {
    "-value": "023",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Mahnsachen" }
    }
  },
  {
    "-value": "024",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Musterregister" }
    }
  },
  {
    "-value": "025",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Nachlasssachen" }
    }
  },
  {
    "-value": "026",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "OWi-Sachen" }
    }
  },
  {
    "-value": "027",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Pachtsachen" }
    }
  },
  {
    "-value": "028",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Partnerschaftsregister" }
    }
  },
  {
    "-value": "029",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Privatklage" }
    }
  },
  {
    "-value": "030",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Schiffsregistersachen" }
    }
  },
  {
    "-value": "031",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Schöffensachen" }
    }
  },
  {
    "-value": "032",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Schuldnerverzeichnissachen" }
    }
  },
  {
    "-value": "033",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Schwurgerichtssachen" }
    }
  },
  {
    "-value": "034",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Sonstige Sachen" }
    }
  },
  {
    "-value": "035",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Spruchstellenverfahren" }
    }
  },
  {
    "-value": "036",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Staatsschutzssachen" }
    }
  },
  {
    "-value": "037",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Strafrichtersachen" }
    }
  },
  {
    "-value": "038",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Strafvollstreckungssachen" }
    }
  },
  {
    "-value": "039",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Unbekannt" }
    }
  },
  {
    "-value": "040",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Urkundsachen" }
    }
  },
  {
    "-value": "041",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Vereinsregister" }
    }
  },
  {
    "-value": "042",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Vermögensverzeichnissachen" }
    }
  },
  {
    "-value": "043",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Verteilungsverfahren" }
    }
  },
  {
    "-value": "044",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Verwaltungssachen" }
    }
  },
  {
    "-value": "045",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Vormundschaftssachen" }
    }
  },
  {
    "-value": "046",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Wirtschaftsstrafsachen" }
    }
  },
  {
    "-value": "047",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Zivilsachen" }
    }
  },
  {
    "-value": "048",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Zwangsversteigerungssachen" }
    }
  },
  {
    "-value": "049",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Zwangsverwaltungssachen" }
    }
  },
  {
    "-value": "050",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Zwangsvollstreckungssachen" }
    }
  },
  {
    "-value": "051",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Ordnungsgeld nach § 335 HGB" }
    }
  },
  {
    "-value": "052",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Beschwerde" }
    }
  },
  {
    "-value": "053",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Arbeitsgerichtssachen" }
    }
  },
  {
    "-value": "054",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Finanzgerichtssachen" }
    }
  },
  {
    "-value": "055",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Sozialgerichtssachen" }
    }
  },
  {
    "-value": "056",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Verwaltungsgerichtssachen" }
    }
  },
  {
    "-value": "057",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Gesellschaftsregister" }
    }
  },
  {
    "-value": "058",
    "xs:annotation": {
      "xs:appinfo": { "codeName": "Unterbringungssachen" }
    }
  }
];


