/*  
	Skript für den Formularaufbau und die Eventhandler der Steuerelemente für elektronische Empfangsbekenntnisse
    Version 351.1.0; erstellt von der XJustiz-Pflegestelle 
	
	Lokal vorliegende Typ3-Codelisten (Ordner 'codelisten_typ3'):
	a) GDS.Gerichte (Version: 3.6)
	b) GDS.Dokumentklasse (Version: 1.4)
	c) GDS.Dokumenttyp (Version: 3.7)
*/




/* --------------------------------------------------------------------------
   Aufbau des eEBs durch Aufruf des XSLT-Stylesheets
   -------------------------------------------------------------------------- */


// Funktion zum Aufbau des hinlaufenden eEBs
function aufbauHinlaufendesEEB(xmlString) {
	
	document.getElementById('startseite').style.display = 'none'; // Startseiten-Output (mit Dateiauswahl) ausblenden
	
	// Initialisierung Fehler
	var leereSeiteFehler = true;
	var dateiFehler = false;
	
	const parser = new DOMParser();
	const xjustiz = parser.parseFromString(xmlString, "application/xml"); 
	
	// Fehlerhinweis zu einer 'leeren Seite' - Code für Firefox und Chromium-basierte Browser (z.B. Edge)  
	document.getElementById('hauptUeberschriftFehlerbox').style.display = 'block';
	document.getElementById('fehlerBoxLeereSeite').style.display = 'block'; // Fehlerhinweis zu einer 'leeren Seite' (z.B. fehlende Browser-Einstellungen entsprechend den Angaben im Leitfaden oder CORS-Policy-Fehler) zunaechst einblenden (s. 'start_eeb.html').
	
	// When using the XML parser with a string that doesn't represent well-formed XML, the XMLDocument returned by parseFromString will contain a <parsererror> node describing the nature of the parsing error.
	const searchParserError = xjustiz.querySelector('parsererror');
	
	// Fehler: Es handelt sich um keine gueltige ('wohlgeformte') XML-Nachricht!
	if (searchParserError != null) {
		leereSeiteFehler = false;
		dateiFehler = true;
		document.getElementById('hauptUeberschriftFehlerbox').style.display = 'block';
		document.getElementById('fehlerBoxXMLParserFehler').style.display = 'block';
		document.getElementById('fehlerBoxLeereSeite').style.display = 'none'; 
	}

	var xhttpXSL   = new XMLHttpRequest();
	xhttpXSL.open("GET", "xslt/stylesheet_xjustiz_eeb_aktiv_351_1.xslt", false);
	xhttpXSL.send();
	var stylesheet = xhttpXSL.responseXML;
	var xslt = new XSLTProcessor();  
	xslt.importStylesheet(stylesheet);
	eebHTML = xslt.transformToFragment(xjustiz, document);
	document.getElementById("eeb").appendChild(eebHTML);


	// Fehler 'Falsche Nachricht'? Uebernahme 'fehler_falscheNachricht' aus xslt-Datei: Wurde falsche oder rueckl. eEB - XJ-Nachricht statt hinl. eEB - XJ-Nachricht ausgewaehlt?
	const falscheNachrichtFehler = document.getElementById("fehler_falscheNachricht").innerText; // enthaelt 0 oder 1 aus xslt-Datei
	// Fehlermeldung: 'FEHLER: Es wurde kein hinlaufendes eEB als XJustiz-Nachricht, für die das elektronische Empfangsbekenntnis (eEB) angefordert wird, ausgewählt!' (Hinweis: Ein vorhandener 'searchParserError' fuehrt auch zu 'falscheNachrichtFehler' - Fehler und muss daher abgefangen werden!)
	if (falscheNachrichtFehler === "1" && (searchParserError == null)) {
		leereSeiteFehler = false;
		dateiFehler = true;
		document.getElementById('hauptUeberschriftFehlerbox').style.display = 'block';
		document.getElementById('fehlerBoxFalscheNachricht').style.display = 'block';
		document.getElementById('fehlerBoxLeereSeite').style.display = 'none'; 
	} 


	// Folgeseite einblenden, soweit kein Datei-Fehler vorliegt (Hinweis: Wenn ein 'leereSeiteFehler' vorliegt, wurde der JS-Code bereits oben vor 'parsererror' abgebrochen!)
	if (dateiFehler == false) {
		// Fehlerhinweis zu einer 'leeren Seite' wieder ausblenden, wenn Datei mittels JS mit lokalem Dateizugriff ohne CORS-Policy ['Cross origin requests'] - Fehler durchgeladen werden konnte. Die eEB-Seite wird korrekt angezeigt!
		document.getElementById('hauptUeberschriftFehlerbox').style.display = 'none';
		document.getElementById('fehlerBoxLeereSeite').style.display = 'none'; 
		leereSeiteFehler = false; // nur 'pro forma'
	} else {
		// Folgeseite ausblenden, soweit ein Datei-Fehler vorliegt
		document.getElementById('eeb').style.display = 'none';
	}


	// XJustiz-Version der hinlaufenden(!) eEB-Nachricht ermitteln
	var xjustizVersion = document.getElementById("xjustizVersion").innerText;

	// GDS.Gerichte/GDS.Dokumentklasse/GDS.Dokumenttyp - Typ3-Codelisten-Version aus hinlaufender eEB-Nachricht ermitteln (erstes Auftreten, soweit vorhanden)
	if (xjustizVersion == "3.4.1" || xjustizVersion == "3.5.1") {

			if (document.getElementById("Code.GDS.Gerichte.Typ3_listVersionID") != null) {
				var codeGDSGerichteTyp3_listVersionID = document.getElementById("Code.GDS.Gerichte.Typ3_listVersionID").innerText;
			} 
			
			if (document.getElementById("Code.GDS.Dokumentklasse.Typ3_listVersionID") != null) {
				var codeGDSDokumentklasseTyp3_listVersionID = document.getElementById("Code.GDS.Dokumentklasse.Typ3_listVersionID").innerText;
			}
			
			if (document.getElementById("Code.GDS.Dokumenttyp.Typ3_listVersionID") != null) {
				var codeGDSDokumenttypTyp3_listVersionID = document.getElementById("Code.GDS.Dokumenttyp.Typ3_listVersionID").innerText;
			}
		
	}

	// anzupassende 'Konstante' 1/3: gueltige Versionen der Codeliste 'GDS.Gerichte' (vorliegende lokale Version: 3.6)
	const gueltigeCodelistenVersionen_GDSGerichteTyp3 = "3.2_3.3_3.4_3.5_3.6";

	// anzupassende 'Konstante' 2/3: gueltige Versionen der Codeliste 'GDS.Dokumentklasse' (vorliegende lokale Version: 1.3)
	const gueltigeCodelistenVersionen_GDSDokumentklasseTyp3 = "1.0_1.1_1.2_1.3_1.4";

	// anzupassende 'Konstante' 3/3: gueltige Versionen der Codeliste 'GDS.Dokumenttyp' (vorliegende lokale Version: 3.7)
	const gueltigeCodelistenVersionen_GDSDokumenttypTyp3 = "3.2_3.3_3.4_3.5_3.6_3.7";


	// im hinl. eEB verwendete Codes zu den Codelisteneintraegen in den dazugehoerigen Wert uebersetzen
	uebersetzeCodelistenIDs();


	/* --------------------------------------------------------------------------
	   Formularverarbeitung
	   -------------------------------------------------------------------------- */

		// Template für die zu erstellende ruecklaufende XML-Instanz (XJ-3.5.1)
		
		var xmlDatei = [];
		
		// Befuellt werden die Array-Indizes [0] - [6]
		var xmlDatei01 = ['<?xml version="1.0" encoding="UTF-8"?>',
				'<tns:nachricht.eeb.zuruecklaufend.2200007 ',
				'  	xmlns:tns="http://www.xjustiz.de" ',
				'	xmlns:dinspec91379="urn:xoev-de:kosit:xoev:datentyp:din-spec-91379_2019-03" ',
				'  	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ',
				'  	xsi:schemaLocation="http://www.xjustiz.de xjustiz_2200_eeb_3_1.xsd">',
				'   <tns:nachrichtenkopf xjustizVersion="3.5.1">'];

		var xmlDatei02 = []; //<tns:aktenzeichen.absender></tns:aktenzeichen.absender>
		
		var xmlDatei03 = []; //<tns:aktenzeichen.empfaenger></tns:aktenzeichen.empfaenger>
		
		// Befuellt werden die Array-Indizes [0] - [10]; '<tns:absender.' und '<tns:empfaenger.' nur vorlaeufige Platzhalter!
		var xmlDatei04 = ['       <tns:erstellungszeitpunkt></tns:erstellungszeitpunkt>',
				'       <tns:auswahl_absender>',
				'           <tns:absender.',
				'       </tns:auswahl_absender>',
				'       <tns:auswahl_empfaenger>',
				'           <tns:empfaenger.',
				'       </tns:auswahl_empfaenger>',
				'       <tns:eigeneNachrichtenID></tns:eigeneNachrichtenID>',
				'       <tns:fremdeNachrichtenID></tns:fremdeNachrichtenID>',
				'   </tns:nachrichtenkopf>',
				'   <tns:fachdaten>'];
				
		// Befuellt werden die Array-Indizes [0] - [1]
		var xmlDatei05 = ['   </tns:fachdaten>',
				'</tns:nachricht.eeb.zuruecklaufend.2200007>'];


	// Initialisierung weiterer Konstanten/Variablen (2/2)

	var eeb_annahme_status  = true; // Initialwert; true = eEB angenommen, false = eEB abgelehnt
	// Ablehnungs-Bereich initial deaktivieren:
	document.getElementById("ueberschrift_ablehnungsgrund").style.color="gray";
	document.getElementById("radio1").disabled = true;
	document.getElementById("radio2").disabled = true;
	document.getElementById("radio3").disabled = true;
	document.getElementById("container_ablehnungsgruende").style.color="gray";
	document.getElementById("label_stoerungsgrund").style.color="gray";
	document.getElementById("eingabe_stoerungsgrund").disabled = true;
	document.getElementById("eingabe_stoerungsgrund").style.color="gray";
	// Vetreter-Angabe initial deaktivieren
	document.getElementById("eingabe_vertreter").disabled = true;

	var fehlercode_eeb_ablehnung = 1; // Vorbelegter Fehlercode-Wert zu 'Ich lehne das Empfangsbekenntnis ab'
	var abweichenderEmpfaenger = false;

	var erstellungszeitpunkt = new Date().toISOString(); // aktuelles Datum fuer festen Erstellungszeitpunkt rueckl. eEB und die Vorbelegung zur veraenderbaren Empfangsbestaetigung (Datumsfeld)
	var eeb_datum = erstellungszeitpunkt.substr(0, 10); // YYYY.MM.DD aus 'erstellungszeitpunkt' fuer Element '<empfangsbestaetigung>' ausschneiden

	// Beachte: 'aktenzeichen_absender_hinlEEB' aus hinl. eEB wird zum 'aktenzeichen_empfaenger_ruecklEEB' im rueckl. eEB!
	var aktenzeichen_empfaenger_ruecklEEB = document.getElementById("aktenzeichen_absender_hinlEEB").innerText;

	var absender_tag = document.getElementById("absender_tag").innerHTML;
	var absender = document.getElementById("absender").innerHTML;

	var empfaenger_tag = document.getElementById("empfaenger_tag").innerHTML;
	var empfaenger = document.getElementById("empfaenger").innerHTML;

	// Geschaefts-/Aktenzeichen Empfaenger bzw. Absender im hinl. eEB
	const divContainer01_azEmpfHinlEEB = document.getElementById("aktenzeichen_empfaenger_hinlEEB");
	const divContainer02_azAbsHinlEEB = document.getElementById("aktenzeichen_absender_hinlEEB");
	let inputElementId, spanElementId;


	// Ausgabe 'Geschaefts-/Aktenzeichen Empfaenger' mit Vorbelegung aus hinl. eEB, inhaltliche Aenderungs-/Loeschmoeglichkeit
	if (divContainer01_azEmpfHinlEEB.hasChildNodes()) {
		
		let zaehler1 = 1, zaehler2 = 1;
		for (let i = 0; i < divContainer01_azEmpfHinlEEB.childNodes.length; i++) {
			
			// fortlaufende Id erstellen fuer vorhandene Elemente '<tns:aktenzeichen.empfaenger>' 
			if (divContainer01_azEmpfHinlEEB.childNodes[i].nodeName.toLowerCase() == "input") {
				divContainer01_azEmpfHinlEEB.childNodes[i].setAttribute("id", "eingabe_aktenzeichen_absender_ruecklEEB_" + zaehler1);
				inputElementId = divContainer01_azEmpfHinlEEB.childNodes[i].getAttribute("id"); // fuer Vorbefuellung unten)
				zaehler1++;
			}
			
			// Vorbefuellung mit Ursprungswert aus hinl. eEB ausgeben
			if (divContainer01_azEmpfHinlEEB.childNodes[i].nodeName.toLowerCase() == "span") {
				divContainer01_azEmpfHinlEEB.childNodes[i].setAttribute("id", "ausgabe_aktenzeichen_empfaenger_hinlEEB_" + zaehler2);
				spanElementId = divContainer01_azEmpfHinlEEB.childNodes[i].getAttribute("id");
				// Steuerelement initialisieren
				document.getElementById(inputElementId).value = document.getElementById(spanElementId).innerText; 
				zaehler2++;
			}

		}
		
	}


	// Versteckte Bearbeitung 'Geschaefts-/Aktenzeichen Absender' aus hinl. eEB ohne Benutzer-Aenderungsmoeglichkeit beim rueckl. eEB
	if (divContainer02_azAbsHinlEEB.hasChildNodes()) {
		
		let zaehler1 = 1;
		for (let i = 0; i < divContainer02_azAbsHinlEEB.childNodes.length; i++) {
			
			// fortlaufende Id erstellen fuer vorhandene Elemente '<tns:aktenzeichen.absender>'
			if (divContainer02_azAbsHinlEEB.childNodes[i].nodeName.toLowerCase() == "span") {
				divContainer02_azAbsHinlEEB.childNodes[i].setAttribute("id", "ausgabe_aktenzeichen_absender_hinlEEB_" + zaehler1);
				zaehler1++;
			}

		}
		
	}


	// Steuerelement zu 'eingabedatum' initialisieren (mit  - s.o. - aktuellem Datum im Format YYYY.MM.DD)
	document.getElementById("eingabe_datum").value = eeb_datum;


	// Steuerelemente - Events
	document.getElementById("checkbox_ablehnung").onclick = aendereStatusEB;
	document.getElementById("checkbox_vertreter").onclick = chkVertreter_aktiviert;
	if (xjustizVersion == "3.4.1" || xjustizVersion == "3.5.1") {
		document.getElementById("go").onclick = erstelleRuecklaufendesEEB;
	} else {
		document.getElementById("go").disabled = true;
	}
	document.getElementById("radio1").onclick = aendereStatusAblehnungsgrund;
	document.getElementById("radio2").onclick = aendereStatusAblehnungsgrund;
	document.getElementById("radio3").onclick = aendereStatusAblehnungsgrund;
	

	// Pruefung, ob ein eEB angefordert wurde
	if (document.getElementById("noEEB") && !(dateiFehler)) {
		
		document.getElementById("ueberschrift_buttons").innerHTML = "Es wurde kein elektronisches Empfangsbekenntnis angefordert.";
		document.getElementById("ueberschrift_buttons").classList.remove("element-invisible");
		document.getElementById("go").disabled = true;
		
		// Delay fuer Chromium-Browser noetig fuer Anzeige nicht schon auf Startseite
		setTimeout(function () {
			alert("Eine eEB-Anforderung liegt nicht vor.\n" +
				  "Daher wird kein rücklaufendes eEB erzeugt.\n" +
				  "Die Formularverarbeitung wird beendet.");
		}, 100);
		
	}


	// #################################   START: Hilfs-Funktionen   ################################# //
	
	/* --------------------------------------------------------------------------
	   Hilfs-Funktionen
	   -------------------------------------------------------------------------- */

	// Funktionen für die Steuerung der aktiven Elemente (Buttons, Checkbox usw.)
	function aendereStatusEB() { 

		if (document.getElementById("checkbox_ablehnung").checked) {
			eeb_annahme_status = false;
			document.getElementById("ueberschrift_ablehnungsgrund").style.color="black";
			document.getElementById("radio1").disabled = false;
			document.getElementById("radio2").disabled = false;
			document.getElementById("radio3").disabled = false;
			document.getElementById("container_ablehnungsgruende").style.color="black";
			document.getElementById("label_stoerungsgrund").style.color="black";
			document.getElementById("eingabe_stoerungsgrund").disabled = false;
			document.getElementById("eingabe_stoerungsgrund").style.color="black";
			
			
		} else {
			eeb_annahme_status = true;
			document.getElementById("ueberschrift_ablehnungsgrund").style.color="gray";
			document.getElementById("radio1").disabled = true;
			document.getElementById("radio2").disabled = true;
			document.getElementById("radio3").disabled = true;
			document.getElementById("container_ablehnungsgruende").style.color="gray";
			document.getElementById("label_stoerungsgrund").style.color="gray";
			document.getElementById("eingabe_stoerungsgrund").disabled = true;
			document.getElementById("eingabe_stoerungsgrund").style.color="gray";
		}
		
	}
	

	// Funktion zur Vertreter-Checkbox
	function chkVertreter_aktiviert() {
		
		if (document.getElementById("checkbox_vertreter").checked) {
			document.getElementById("eingabe_vertreter").disabled = false;
			document.getElementById("eingabe_vertreter").focus();
		} else {
			document.getElementById("eingabe_vertreter").disabled = true;
		}
		
	}
	
	
	// Funktion zu den Ablehnungsgrund-Radio-Buttons
	function aendereStatusAblehnungsgrund() {
		
		if (document.getElementById("radio1").checked) {
			fehlercode_eeb_ablehnung = 1;
		}
		
		if (document.getElementById("radio2").checked) {
			fehlercode_eeb_ablehnung = 2;
		}
		
		if (document.getElementById("radio3").checked) {
			fehlercode_eeb_ablehnung = 3;
		}
		
	}


	// Funktion zum Erstellen des ruecklaufenden eEB's
	function erstelleRuecklaufendesEEB() {
		
		var neueNachricht = "";
		
		// Pruefungen auf vollstaendige Daten
		let fehlerLeeresDatum = 0;
		let fehlerLeererVertretername = 0;
		
		// Datumspruefung ('Datum vorhanden'?) erfolgt nur bei Annahme des eEBs - nicht bei Ablehnung eEB!
		if (eeb_annahme_status && document.getElementById("eingabe_datum").value == "") {
			fehlerLeeresDatum = 1;
		}
		
		if (document.getElementById("checkbox_vertreter").checked && document.getElementById("eingabe_vertreter").value == "") {
			fehlerLeererVertretername = 1;
		}
		
		// 'Datum fehlt' oder 'Vertretername fehlt trotz aktivierter Vertreter-Checkbox':
		if (fehlerLeeresDatum || fehlerLeererVertretername) {
			
			if (fehlerLeeresDatum && fehlerLeererVertretername) {
				alert("Bitte geben Sie ein gültiges Datum an.\n" + "Bitte geben Sie den Namen des abweichenden Empfängers an.");
				document.getElementById("eingabe_datum").focus();
				return;
				
			} else if (fehlerLeeresDatum && !fehlerLeererVertretername) {
				alert("Bitte geben Sie ein gültiges Datum an.");
				document.getElementById("eingabe_datum").focus();
				return;
			}
			
			else { 
				// !fehlerLeeresDatum && fehlerLeererVertretername (nur der Vertretername fehlt)
				alert("Bitte geben Sie den Namen des abweichenden Empfängers an.");
				document.getElementById("eingabe_vertreter").focus();
				return;
			}
			
		}
		// /Pruefungen auf vollstaendige Daten
		
		
		// Fertigstellen der XML-Instanz:
		// ------------------------------
		
		// 1a. Ergaenzen des Absender-Aktenzeichens im rueckl. eEB (<tns:aktenzeichen.absender>). Entspricht Empfaenger-AZ im hinl. eEB, soweit befuellt gewesen oder in der Browseranwendung neu befuellt worden.
		
			if (divContainer01_azEmpfHinlEEB.hasChildNodes()) {
				
				let zaehler1 = 1, azEmpfaengerWertHinlEEB;
				for (let i = 0; i < divContainer01_azEmpfHinlEEB.childNodes.length; i++) {
								
					if (divContainer01_azEmpfHinlEEB.childNodes[i].nodeName.toLowerCase() == "input") {
						
						azEmpfaengerWertHinlEEB = document.getElementById("eingabe_aktenzeichen_absender_ruecklEEB_" + zaehler1).value;
						azEmpfaengerWertHinlEEB = maskiereString(azEmpfaengerWertHinlEEB); //unzulaessige/problematische Zeichen maskieren
						
						xmlDatei02.push('       <tns:aktenzeichen.absender>' + azEmpfaengerWertHinlEEB + '</tns:aktenzeichen.absender>'); 
						zaehler1++;
						
					}
				}
				
				// Nach Benutzereingaben leere '<tns:aktenzeichen.absender>' - Elemente (<tns:aktenzeichen.absender></tns:aktenzeichen.absender>) finden und aus Array loeschen
				// Absteigend noetig, da Array-Laenge und Index-Position von jedem Loeschen dynamisch beinflusst wird!
				let arrayLengthOriginal = xmlDatei02.length;
				for (let i = (arrayLengthOriginal - 1); i >= 0; i--) {
					if (xmlDatei02[i].includes("<tns:aktenzeichen.absender></tns:aktenzeichen.absender>")) {
						xmlDatei02.splice(i, 1); // ab Position Zeile, Anzahl zu loeschende Zeilen)
					}
				}
				
			}
			
		// 1b. Ergaenzen der Empfaenger-Aktenzeichen im rueckl. eEB (<tns:aktenzeichen.absender>). Entspricht Absender-AZ im hinl. eEB, soweit befuellt gewesen. Keine manuelle Eingabe/Aenderung in der Browseranwendung moeglich!

			if (divContainer02_azAbsHinlEEB.hasChildNodes()) {
			
				let zaehler1 = 1, azAbsenderWertHinlEEB;
				for (let i = 0; i < divContainer02_azAbsHinlEEB.childNodes.length; i++) {
								
					if (divContainer02_azAbsHinlEEB.childNodes[i].nodeName.toLowerCase() == "span") {
						
						azAbsenderWertHinlEEB = document.getElementById("ausgabe_aktenzeichen_absender_hinlEEB_" + zaehler1).innerText;
						azAbsenderWertHinlEEB = maskiereString(azAbsenderWertHinlEEB); //unzulaessige/problematische Zeichen maskieren
						
						xmlDatei03.push('       <tns:aktenzeichen.empfaenger>' + azAbsenderWertHinlEEB + '</tns:aktenzeichen.empfaenger>'); 
						zaehler1++;
						
					}
				}
			
			}
			
		// 2. Ergaenzen des (automatisiert erzeugten) Erstellungszeitpunkts im rueckl. eEB (<tns:erstellungszeitpunkt>)
			
			xmlDatei04[0] = xmlDatei04[0].substr(0, 33) + erstellungszeitpunkt + xmlDatei04[0].substr(33);
		
		
		// 3a. Ergaenzen von Absender. Beachte: Empfaenger ('empfaenger_tag', 'empfaenger') aus hinl. eEB wird zum Absender im rueckl. eEB !


		// Wurde ein abweichender Empfaenger (Vertreter) angegeben (Teil 1/2)?
		if (document.getElementById("checkbox_vertreter").checked) {
			
			let vertreter = document.getElementById("eingabe_vertreter").value;
			vertreter = maskiereString(vertreter); //unzulaessige/problematische Zeichen maskieren

			xmlDatei04[2] = '           <tns:absender.sonstige>' + vertreter + '</tns:absender.sonstige>';
			
		} else {

			switch (empfaenger_tag) {
				
				// XJ-3.x
						
				case "empfaenger.gericht":
					// bei hinl. eEB mit XJ-3.x: 'listVersionID' ist variabel in XJ-3.x, da Typ3-Codeliste
					xmlDatei04[2] = '           <tns:absender.gericht listVersionID="' + codeGDSGerichteTyp3_listVersionID + '">\n';	  
					xmlDatei04[2] += '               <code>' + empfaenger + '</code>\n';
					xmlDatei04[2] += '           </tns:absender.gericht>';
					break;
						
				case "empfaenger.rvTraeger":
					xmlDatei04[2] = '           <tns:absender.rvTraeger listVersionID="2.0">\n';	  
					xmlDatei04[2] += '               <code>' + empfaenger + '</code>\n';
					xmlDatei04[2] += '           </tns:absender.rvTraeger>';
					break;

			/*		
				case "empfaenger.polizeibehoerde":
					xmlDatei04[2] = '           <tns:absender.polizeibehoerde listVersionID="1.0">\n';	  
					xmlDatei04[2] += '               <code>' + empfaenger + '</code>\n';
					xmlDatei04[2] += '           </tns:absender.polizeibehoerde>';
					break;
			*/
					
				default:
					xmlDatei04[2] = '           <tns:absender.sonstige>' + empfaenger + '</tns:absender.sonstige>';
					break;
					
			}
		
		}
		  
		  
		// 3b. Ergaenzen von Empfaenger. Beachte: Absender ('absender_tag', 'absender') aus hinl. eEB wird zum Empfaenger im rueckl. eEB!

			switch (absender_tag) {
				
				// XJ-3.x
				
				case "absender.gericht":
					// bei hinl. eEB mit XJ-3.x: 'listVersionID' ist variabel in XJ-3.x, da Typ3-Codeliste
					xmlDatei04[5] = '           <tns:empfaenger.gericht listVersionID="' + codeGDSGerichteTyp3_listVersionID + '">\n';	  
					xmlDatei04[5] += '               <code>' + absender + '</code>\n';
					xmlDatei04[5] += '           </tns:empfaenger.gericht>';
					break;

				case "absender.rvTraeger":
					xmlDatei04[5] = '           <tns:empfaenger.rvTraeger listVersionID="2.0">\n';	  
					xmlDatei04[5] += '               <code>' + absender + '</code>\n';
					xmlDatei04[5] += '           </tns:empfaenger.rvTraeger>';
					break;
					
			/*		
				case "absender.polizeibehoerde":
					xmlDatei04[5] = '           <tns:empfaenger.polizeibehoerde listVersionID="1.0">\n';	  
					xmlDatei04[5] += '               <code>' + absender + '</code>\n';
					xmlDatei04[5] += '           </tns:empfaenger.polizeibehoerde>';
					break;
			*/	
				
				default:
					xmlDatei04[5] = '           <tns:empfaenger.sonstige>' + absender + '</tns:empfaenger.sonstige>';
					break;
					
			}
		
		
		// 4a./4b. Ergänzen der Nachrichten-IDs (a. eigeneNachrichten.ID (neu erzeugt), b. fremdeNachrichten.ID (vorherige eigeneNachrichtenID im hinl. eEB))

		xmlDatei04[7] = xmlDatei04[7].substr(0,32) + uuid() + xmlDatei04[7].substr(32);
		xmlDatei04[8] = xmlDatei04[8].substr(0,32) + document.getElementById("nachrichtenID").innerHTML + xmlDatei04[8].substr(32);


		// 5. Erstellen des Fachdatenteils (je nach 'eeb_annahme_status')
		
		if (eeb_annahme_status) {
			// Empfangsbekenntnis wird abgegeben
			eeb_datum = document.getElementById("eingabe_datum").value;
			neueNachricht = '       <tns:empfangsbestaetigung>' + eeb_datum + '</tns:empfangsbestaetigung>';
			xmlDatei04.push(neueNachricht);
			
		} else {
			// Empfangsbekenntnis wird abgelehnt
			neueNachricht = '       <tns:stoerungsmeldung>\n';
			neueNachricht += '           <tns:stoerungsID listVersionID="2.1">\n';
			neueNachricht += '               <code>' + fehlercode_eeb_ablehnung + '</code>\n';
			neueNachricht += '           </tns:stoerungsID>\n';
			
			// soweit ein Stoerungsgrund angegeben wurde
			if (document.getElementById("eingabe_stoerungsgrund").value != "") {
				let stoerungsgrund = document.getElementById("eingabe_stoerungsgrund").value;
				stoerungsgrund = maskiereString(stoerungsgrund); //unzulaessige/problematische Zeichen maskieren
				neueNachricht += '           <tns:stoerungsGrund>' + stoerungsgrund + '</tns:stoerungsGrund>\n';
			}
			
			neueNachricht += '       </tns:stoerungsmeldung>';
			xmlDatei04.push(neueNachricht);
			
		}


		// 6. Wurde ein abweichender Empfaenger (Vertreter) angegeben (Teil 2/2)?
		
		if (document.getElementById("checkbox_vertreter").checked) {
			neueNachricht = '       <tns:zustellungsempfaenger.abweichend>true</tns:zustellungsempfaenger.abweichend>';
			xmlDatei04.push(neueNachricht);
		}
		

		// 7. Sub-Arrays verbinden zu Gesamt-Array 'xmlDatei'

		xmlDatei = xmlDatei.concat(xmlDatei01);
		xmlDatei = xmlDatei.concat(xmlDatei02);
		xmlDatei = xmlDatei.concat(xmlDatei03);
		xmlDatei = xmlDatei.concat(xmlDatei04);
		xmlDatei = xmlDatei.concat(xmlDatei05);


		// 8. Deaktivieren der Steuerelemente (abgesehen vom Speichern-Button 'XML-Datei speichern')
		
		document.getElementById("eingabe_datum").disabled = true;
		// Steuerelement fuer 'Aktenzeichen des Absenders im ruecklEEB'
		let zaehler1 = 1, azAbsenderID;
		for (let i = 0; i < divContainer01_azEmpfHinlEEB.childNodes.length; i++) {
						
			if (divContainer01_azEmpfHinlEEB.childNodes[i].nodeName.toLowerCase() == "input") {
				
				azAbsenderID = "eingabe_aktenzeichen_absender_ruecklEEB_" + zaehler1;
				document.getElementById(azAbsenderID).disabled = true;
				zaehler1++;
				
			}
		}
		// /Steuerelement fuer 'Aktenzeichen des Absenders im ruecklEEB'

		document.getElementById("checkbox_vertreter").disabled = true;
		document.getElementById("eingabe_vertreter").disabled = true;
		document.getElementById("checkbox_ablehnung").disabled = true;
		document.getElementById("radio1").disabled = true;
		document.getElementById("radio2").disabled = true;
		document.getElementById("radio3").disabled = true;
		document.getElementById("eingabe_stoerungsgrund").disabled = true;
		document.getElementById("go").disabled = true;
		document.getElementById("go").classList.add("go_buttonDisabled_onlyPrint");
		document.getElementById("ueberschrift_buttons").innerHTML = "Änderungen sind nicht mehr möglich. Sie können das XML-Dokument beliebig oft speichern:";
		document.getElementById("ueberschrift_buttons").classList.remove("element-invisible");
		document.getElementById("btnSpeichern").disabled = false;
		document.getElementById("btnSpeichern").style.visibility = "visible";


		// 9. Ausgabe der XML-Instanz
		
		alert("Das XML-Dokument zum rücklaufenden eEB wurde erfolgreich erstellt.\n" +
			  "Bitte speichern Sie die Datei durch Bestätigen des folgenden Dialogs ab.\n" +
			  "Anschließend finden Sie die XML-Datei unter dem Namen\n" +
			  "'xjustiz_nachricht.xml' im Download-Ordner oder im\n" +
			  "ausgewählten Zielverzeichnis Ihres Browsers.");
		
		
		// 10. Browser-Button 'XML-Datei erneut speichern' fuer optionalen, erneuten Nachrichten-Download

		document.getElementById("btnSpeichern").onclick = download;
		document.getElementById("btnSpeichern").click();
		
	}
	// /Funktion zum Erstellen des ruecklaufenden eEB's


	// Funktionen zum Speichern der XML-Instanz
	function download() {
		
		var a = document.createElement('a');
		
		// Funktionsaufruf 'linkDownload(a, filename, content)'
		linkDownload(a, "xjustiz_nachricht.xml", xmlDatei.join("\r\n"));
		
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

	}

	function linkDownload(a, filename, content) {
		
		var contentType =  'data:application/octet-stream,';
		var uriContent = contentType + encodeURIComponent(content);
		a.setAttribute('href', uriContent);
		a.setAttribute('download', filename);
		
	}
	// /Funktionen zum Speichern der XML-Instanz


	// Funktion zum Maskieren in XML nicht zulaessiger Zeichen (ohne Attribut-Content)
	function maskiereString(htmlStr) {
		// '&' als Erstes zu ersetzen!
		return htmlStr.replace(/&/g, "&amp;")
					  .replace(/</g, "&lt;");
	}


	// Funktion zum Erstellen einer UUID (Rueckgabeformat: 00000000-0000-0000-0000-000000000000)
	function uuid() {

		function str4() {
			
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			
		}
		
		return str4() + str4() + '-' + str4() + '-' + str4() + '-' +
				str4() + '-' + str4() + str4() + str4();
	}

	// Funktion zum Umwandeln der Codes zu den Codelisteneintraegen in den dazugehoerigen Wert (nur fuer die Darstellung des eEBs; allg. Workaround wegen nicht moeglichem XSLT-Codelisten-Zugriff bei Chromium-Browsern)
	// ACHTUNG: Die enthaltene Codefehleranzeige greift nur fuer Typ3-Codelisten, da Nachricht bei Codefehler zu Typ1-Codelisten dann bereits nicht mehr Schema-valide waere!
	function uebersetzeCodelistenIDs() {

		// Dateizugriff Codelisten Typ1: (Achtung: bei neuer XJ-Version ggf. geaenderten CL - Schema-Dateinamen und Codelisten - Struktur/Position der jeweiligen Typ1-CL innerhalb der Struktur fuer 'getElementsByTagName' anpassen!)
		
		if (xjustizVersion == "3.4.1") {
			// XJ-3.4.1
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", "xsd/341/xjustiz_0010_cl_allgemein_3_5.xsd", false);
			xhttp.send();
			var clAllgemeinTyp1XML = xhttp.responseXML;
		} else {
			// XJ-3.5.1
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", "xsd/351/xjustiz_0010_cl_allgemein_3_6.xsd", false);
			xhttp.send();
			var clAllgemeinTyp1XML = xhttp.responseXML;
		}
		
		// ##############################################
		
		// Dateizugriff  Codelisten Typ3:
		
		if (xjustizVersion == "3.4.1" || xjustizVersion == "3.5.1") {
		
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", "codelisten_typ3/GDS.Gerichte.xml", false);
			xhttp.send();
			var clGerichteTyp3XML = xhttp.responseXML;
			
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", "codelisten_typ3/GDS.Dokumentklasse.xml", false);
			xhttp.send();
			var clDokumentklasseTyp3XML = xhttp.responseXML;
			
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", "codelisten_typ3/GDS.Dokumenttyp.xml", false);
			xhttp.send();
			var clDokumenttypTyp3XML = xhttp.responseXML;
		/* 
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", "codelisten_typ3/GDS.Polizeibehoerden.xml", false);
			xhttp.send();
			var clPolizeibehoerdenTyp3XML = xhttp.responseXML;	
		 */	
		}
		
		// ##############################################

		// XSLT - Element-Zugriff (per CSS-Klasse):
		
		var codesGericht = document.getElementsByClassName('gericht');
		var codesRVTrager = document.getElementsByClassName('rvtraeger');
		var codesAktentyp = document.getElementsByClassName('aktentyp');
		var codesTeilaktentyp = document.getElementsByClassName('teilaktentyp');
		var codesDokumentklasse = document.getElementsByClassName('dokumentklasse');
		var codesDokumenttyp = document.getElementsByClassName('dokumenttyp');
		// var codesPolizeibehoerde = document.getElementsByClassName('polizeibehoerde');
			
		// ##############################################
		
		// Typ1/Typ3 - Codelisten: Code-Aufloesung 'Schluessel > Wert':
		
		if (xjustizVersion == "3.4.1" || xjustizVersion == "3.5.1") {
			
			// XJ-3.4.1 oder XJ-3.5.1
			
			// Code.GDS.Gerichte.Typ3
			if (typeof codesGericht !== 'undefined') {
				
				let simpleValues = clGerichteTyp3XML.getElementsByTagName("SimpleValue");
				
				/* Fuer jede Gerichts - Code-Stelle (z.B. 'A1000') ... */
				for (let i = 0; i < codesGericht.length; i++) {
				
					let treffer = false;
					/* ... den passenden Wert finden (z.B. 'Bundesgerichtshof Karlsruhe')! */
					for (let j = 0; j < simpleValues.length; j++) {
						
						if (simpleValues[j].textContent == codesGericht[i].innerText) {
							codesGericht[i].innerText = simpleValues[j + 1].textContent;
							treffer = true;
							break;
						}
					}  
					
					// nur bei Typ3-Codelisten, da Typ1-Codelistenschluessel bereits schema-valide sein muessen
					if (treffer !== true) {
						
						// Code konnte keinem Eintrag aus der Typ3-Codeliste 'GDS.Gerichte' zugeordnet werden!
						if (gueltigeCodelistenVersionen_GDSGerichteTyp3.includes(codeGDSGerichteTyp3_listVersionID) !==  true || codeGDSGerichteTyp3_listVersionID == "") {
							
							if (codeGDSGerichteTyp3_listVersionID != "") {
								// zusaetzlich unbekannte CL-Version (triggert zusaetzlich zentrale Update-Hinweisbox)
								codesGericht[i].firstChild.nodeValue = "Fehler: Kein Codelisteneintrag zum Schlüssel '" + codesGericht[i].innerHTML + "' (Code.GDS.Gerichte.Typ3, unbekannte Version: " + document.getElementById("Code.GDS.Gerichte.Typ3_listVersionID").innerHTML + ")";
							} else {
								// zusaetzlich fehlende CL-Version (triggert NICHT zusaetzlich zentrale Update-Hinweisbox)
								codesGericht[i].firstChild.nodeValue = "Fehler: Kein Codelisteneintrag zum Schlüssel '" + codesGericht[i].innerHTML + "' (Code.GDS.Gerichte.Typ3, fehlende Versionsangabe!)";
							}
							
						} else {
							
							// bekannte CL-Version
							codesGericht[i].firstChild.nodeValue = "Fehler: Kein Codelisteneintrag zum Schlüssel '" + codesGericht[i].innerHTML + "' (Code.GDS.Gerichte.Typ3, Version: " + document.getElementById("Code.GDS.Gerichte.Typ3_listVersionID").innerHTML + ")";
						}
						
						codesGericht[i].classList.add("fehlerCodeliste");
						codesGericht[i].classList.add("fehler");

						
						// Zentrale Hinweisbox zum Update der Anwendung etc. einblenden, wenn zusaetzlich die 'GDS.Gerichte' - Codelistenversion (erstes Vorkommen) nicht im String der gueltigen Codelisten-Versionen enthalten ist
						if (gueltigeCodelistenVersionen_GDSGerichteTyp3.includes(codeGDSGerichteTyp3_listVersionID) !==  true) {
							document.getElementById('hinweisBoxUpdateBrowseranwendung').style.display = 'block';
						}
					
					}

				}

			} 
			
			// Code.GDS.RVTrager (Typ1)
			if (typeof codesRVTrager !== 'undefined') {
	
				/* ggf. bei neuer XJ-Version anzupassende Zielstelle: x. 'xs:simpleType' - Element! */
				let enumerations = clAllgemeinTyp1XML.getElementsByTagName("xs:simpleType")[11].getElementsByTagName("xs:enumeration");
				
				/* Fuer jede RV-Traeger - Code-Stelle (z.B. '02') ... */
				for (let i = 0; i < codesRVTrager.length; i++) {
					
					/* ... den passenden Wert finden (z.B. 'Deutsche Rentenversicherung Nord')! */
					for (let j = 0; j < enumerations.length; j++) {
						
						if (enumerations[j].getAttribute('value') == codesRVTrager[i].innerText) {
						  codesRVTrager[i].innerText = enumerations[j].children[0].children[0].children[0].textContent;
						  break;
						}
					}
				}
				
			}
			
			// Code.GDS.Aktentyp (Typ1) (nur hinl. eEB)
			if (typeof codesAktentyp !== 'undefined') {
				
				/* ggf. bei neuer XJ-Version anzupassende Zielstelle: x. 'xs:simpleType' - Element! */
				let enumerations = clAllgemeinTyp1XML.getElementsByTagName("xs:simpleType")[1].getElementsByTagName("xs:enumeration");
				
				/* Fuer jede Akte - Code-Stelle (z.B. '001') ... */
				for (let i = 0; i < codesAktentyp.length; i++) {
					
					/* ... den passenden Wert finden (z.B. 'Zivilakte')! */
					for (let j = 0; j < enumerations.length; j++) {
						
						if (enumerations[j].getAttribute('value') == codesAktentyp[i].innerText) {
						  codesAktentyp[i].innerText = enumerations[j].children[0].children[0].children[0].textContent;
						  break;
						}
					}
				}
				
			}
			
			// Code.GDS.Teilaktentyp (Typ1) (nur hinl. eEB)
			if (typeof codesTeilaktentyp !== 'undefined') {
				
				let enumerations = ""
				
				// XJ-3.4.1 oder XJ-3.5.1
				if (xjustizVersion == "3.4.1") {
					/* ggf. bei neuer XJ-Version anzupassende Zielstelle: x. 'xs:simpleType' - Element! (hier Position 0 -> 14) */
					enumerations = clAllgemeinTyp1XML.getElementsByTagName("xs:simpleType")[14].getElementsByTagName("xs:enumeration");
				} else {
					
					if (xjustizVersion == "3.5.1") {
						/* ggf. bei neuer XJ-Version anzupassende Zielstelle: x. 'xs:simpleType' - Element! (hier Position 0 -> 13) */
						enumerations = clAllgemeinTyp1XML.getElementsByTagName("xs:simpleType")[13].getElementsByTagName("xs:enumeration");
					} 
				}
				
				if (enumerations != "") {
				
					/* Fuer jede Teilakte - Code-Stelle (z.B. '003') ... */
					for (let i = 0; i < codesTeilaktentyp.length; i++) {
						
						/* ... den passenden Wert finden (z.B. 'Beiakte')! */
						for (let j = 0; j < enumerations.length; j++) {
							
							if (enumerations[j].getAttribute('value') == codesTeilaktentyp[i].innerText) {
							  codesTeilaktentyp[i].innerText = enumerations[j].children[0].children[0].children[0].textContent;
							  break;
							}
						}
					}
				
				}
					
			}
			
			// Code.GDS.Dokumentklasse.Typ3 (nur hinl. eEB)
			if (typeof codesDokumentklasse !== 'undefined') {
				
				let simpleValues = clDokumentklasseTyp3XML.getElementsByTagName("SimpleValue");
				
				/* Fuer jede Dokumentklasse - Code-Stelle (z.B. '006') ... */
				for (let i = 0; i < codesDokumentklasse.length; i++) {
				
					let treffer = false;
					/* ... den passenden Wert finden (z.B. 'Urteil')! */
					for (let j = 0; j < simpleValues.length; j++) {
						
						if (simpleValues[j].textContent == codesDokumentklasse[i].innerText) {
							codesDokumentklasse[i].innerText = simpleValues[j + 1].textContent;
							treffer = true;
							break;
						}
					}  
					
					// nur bei Typ3-Codelisten, da Typ1-Codelistenschluessel bereits schema-valide sein muessen
					if (treffer !== true) {
						
						// Code konnte keinem Eintrag aus der Typ3-Codeliste 'GDS.Dokumentklasse' zugeordnet werden!
						if (gueltigeCodelistenVersionen_GDSDokumentklasseTyp3.includes(codeGDSDokumentklasseTyp3_listVersionID) !==  true || codeGDSDokumentklasseTyp3_listVersionID == "") {
							
							if (codeGDSDokumentklasseTyp3_listVersionID != "") {
								// zusaetzlich unbekannte CL-Version (triggert zusaetzlich zentrale Update-Hinweisbox)
								codesDokumentklasse[i].firstChild.nodeValue = "Fehler: Kein Codelisteneintrag zum Schlüssel '" + codesDokumentklasse[i].innerHTML + "' (Code.GDS.Dokumentklasse.Typ3, unbekannte Version: " + document.getElementById("Code.GDS.Dokumentklasse.Typ3_listVersionID").innerHTML + ")";
							} else {
								// zusaetzlich fehlende CL-Version (triggert NICHT zusaetzlich zentrale Update-Hinweisbox)
								codesDokumentklasse[i].firstChild.nodeValue = "Fehler: Kein Codelisteneintrag zum Schlüssel '" + codesDokumentklasse[i].innerHTML + "' (Code.GDS.Dokumentklasse.Typ3, fehlende Versionsangabe!)";
							}
							
						} else {
							// bekannte CL-Version
							codesDokumentklasse[i].firstChild.nodeValue = "Fehler: Kein Codelisteneintrag zum Schlüssel '" + codesDokumentklasse[i].innerHTML + "' (Code.GDS.Dokumentklasse.Typ3, Version: " + document.getElementById("Code.GDS.Dokumentklasse.Typ3_listVersionID").innerHTML + ")";
						}
							
						codesDokumentklasse[i].classList.add("fehlerCodeliste");
						codesDokumentklasse[i].classList.add("fehler");
						
						// Zentrale Hinweisbox zum Update der Anwendung etc. einblenden, wenn zusaetzlich die 'GDS.Dokumentklasse' - Codelistenversion (erstes Vorkommen) nicht im String der gueltigen Codelisten-Versionen enthalten ist
						if (gueltigeCodelistenVersionen_GDSDokumentklasseTyp3.includes(codeGDSDokumentklasseTyp3_listVersionID) !==  true) {
							document.getElementById('hinweisBoxUpdateBrowseranwendung').style.display = 'block';
						}
					
					}

				}
		
			}
			
			// Code.GDS.Dokumenttyp.Typ3 (nur hinl. eEB)
			if (typeof codesDokumenttyp !== 'undefined') {
				
				/* Fuer jede Dokumenttyp - Code-Stelle (z.B. '037') ... */
				let simpleValues = clDokumenttypTyp3XML.getElementsByTagName("SimpleValue");
				
				for (let i = 0; i < codesDokumenttyp.length; i++) {
				
					let treffer = false;
					/* ... den passenden Wert finden (z.B. 'Berichtigungsmitteilung')! */
					for (let j = 0; j < simpleValues.length; j++) {
						
						if (simpleValues[j].textContent == codesDokumenttyp[i].innerText) {
							codesDokumenttyp[i].innerText = simpleValues[j + 1].textContent;
							treffer = true;
							break;
						}
					} 

					// nur bei Typ3-Codelisten, da Typ1-Codelistenschluessel bereits schema-valide sein muessen
					if (treffer !== true) {
						
						// Code konnte keinem Eintrag aus der Typ3-Codeliste 'GDS.Dokumenttyp' zugeordnet werden!
						if (gueltigeCodelistenVersionen_GDSDokumenttypTyp3.includes(codeGDSDokumenttypTyp3_listVersionID) !==  true || codeGDSDokumenttypTyp3_listVersionID == "") {
							
							if (codeGDSDokumenttypTyp3_listVersionID != "") {
								// zusaetzlich unbekannte CL-Version (triggert zusaetzlich zentrale Update-Hinweisbox)
								codesDokumenttyp[i].firstChild.nodeValue = "Fehler: Kein Codelisteneintrag zum Schlüssel '" + codesDokumenttyp[i].innerHTML + "' (Code.GDS.Dokumenttyp.Typ3, unbekannte Version: " + document.getElementById("Code.GDS.Dokumenttyp.Typ3_listVersionID").innerHTML + ")";
							} else {
								// zusaetzlich fehlende CL-Version (triggert NICHT zusaetzlich zentrale Update-Hinweisbox)
								codesDokumenttyp[i].firstChild.nodeValue = "Fehler: Kein Codelisteneintrag zum Schlüssel '" + codesDokumenttyp[i].innerHTML + "' (Code.GDS.Dokumenttyp.Typ3, fehlende Versionsangabe!)";
							}

						} else {
							// bekannte CL-Version
							codesDokumenttyp[i].firstChild.nodeValue = "Hinweis: Kein Codelisteneintrag zum Schlüssel '" + codesDokumenttyp[i].innerHTML + "' (Code.GDS.Dokumenttyp.Typ3, Version: " + document.getElementById("Code.GDS.Dokumenttyp.Typ3_listVersionID").innerHTML + ")";
						}
							
						codesDokumenttyp[i].classList.add("fehlerCodeliste");
						codesDokumenttyp[i].classList.add("fehler");
						
						// Zentrale Hinweisbox zum Update der Anwendung etc. einblenden, wenn zusaetzlich die 'GDS.Dokumenttyp' - Codelistenversion (erstes Vorkommen) nicht im String der gueltigen Codelisten-Versionen enthalten ist
						if (gueltigeCodelistenVersionen_GDSDokumenttypTyp3.includes(codeGDSDokumenttypTyp3_listVersionID) !==  true) {
							document.getElementById('hinweisBoxUpdateBrowseranwendung').style.display = 'block';
						}
					
					}
					
				}
				
			}
			
		} else {
			// do nothing! (fuer Debugging)
		}

	}
	
	// #################################   ENDE: Hilfs-Funktionen   ################################# //
	
}
// Script-Ende
