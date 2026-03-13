<?xml version="1.0" encoding="UTF-8"?>
<!--
	Stylesheet zur eEB-Browseranwendung für die Anzeige von elektronischen Empfangsbekenntnissen auf Basis des XJustiz-Standards
	Version 351.1.0; erstellt von der XJustiz-Pflegestelle
	
	Lokal vorliegende Typ3-Codelisten (Ordner 'codelisten_typ3'):
	a) GDS.Gerichte (Version: 3.6)
	b) GDS.Dokumentklasse (Version: 1.3)
	c) GDS.Dokumenttyp (Version: 3.7)
	
-->

<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xs="http://www.w3.org/2001/XMLSchema"
	xmlns:tns="http://www.xjustiz.de"
	xmlns:gc="http://docs.oasis-open.org/codelist/ns/genericode/1.0/" >
	
	<!-- Variablen-Deklaration -->
	
		<!-- Hinweis: Bei den Versionsangaben zu Typ3-Codelisten im Instanzdokument wird immer nur das erste Vorkommen je Typ3-Codeliste ausgewertet! -->
	
		<!-- Verwendete XJ-Nachricht (XML-Instanz): -->
		<!-- Datei (hinlaufendes eEB mit beliebigen Dateinamen und Dateityp 'xml', z.B. 'xjustiz_nachricht.xml') wird in Browser-Startmaske 'start_eeb.html' ausgewaehlt und per Javascript eingelesen -->

		<!-- XJ-Version auslesen: -->
		<xsl:variable name="hinlaufendesEEB_xjustizVersion" select="//@xjustizVersion"/>
		
		
		<!-- GDS-Codelisten 'Allgemein' (Typ1, hier: Codelisten zu Aktentyp, Teilaktentyp und RVTraeger): -->
			<!-- per JS umgesetzt! -->
		<!-- /GDS-Codelisten 'Allgemein' -->																												   
			
		
		<!-- GDS-Codeliste 'GDS.Gerichte' (Typ3): -->
				
			<!-- Typ3: Versionsnummer der Codeliste 'GDS.Gerichte' ermitteln: 
			#	a) gemaess Versionsangabe zur 'Code.GDS.Gerichte.Typ3' aus hinlaufender eEB-Nachricht! (zusaetzlich auch per JS!)
			#	b) gemaess 'Konstante 1/3' entsprechend der lokal abgelegten 'Code.GDS.Gerichte.Typ3' - Datei und aelteren Versionen (Historie) (zusaetzlich auch per JS!)
			-->
			
			<!-- a) Version 'Code.GDS.Gerichte.Typ3' auslesen (aus lokaler hinlaufender eEB-Nachrichten-Datei, z.B. 'xjustiz_nachricht.xml'): -->
			<xsl:variable name="codelistenVersion_GDSGerichteTyp3_ausHinlaufendemEEB" select="//tns:nachrichtenkopf//tns:absender.gericht/@listVersionID|//tns:nachrichtenkopf//tns:empfaenger.gericht/@listVersionID"/>
			
			<!-- b) Anzupassende 'Konstante' 1/3: gueltige/zulaessige Versionen der Codeliste 'GDS.Gerichte' (vorliegende lokale Version: 3.6) -->
			<!-- (Hinweis: Aktuell im XRepository bereits abgekuendigte Codelistenversionen, koennen bei alten XJustiz - eEB-Nachrichten noch gueltig gewesen sein! Daher werden hier alte Codelisten-Versionen beibehalten!) -->
			<xsl:variable name="gueltigeCodelistenVersionen_GDSGerichteTyp3">3.2_3.3_3.4_3.5_3.6</xsl:variable>
			
			<!-- Typ3: Gesamte Codeliste 'GDS.Gerichte' in der vorliegenden lokalen Version zuweisen -->
			<!-- per JS umgesetzt! -->

		<!-- /GDS-Codeliste 'GDS.Gerichte' -->
		
		
		<!-- GDS-Codeliste 'GDS.Dokumentklasse' (Typ3): -->
		
			<!-- Typ3: Versionsnummer der Codeliste 'GDS.Dokumentklasse' ermitteln: 
			#	a) gemaess Versionsangabe zur 'Code.GDS.Dokumentklasse.Typ3' aus hinlaufender eEB-Nachricht! (zusaetzlich auch per JS!)
			#	b) gemaess 'Konstante 2/3' entsprechend der lokal abgelegten  'Code.GDS.Dokumentklasse.Typ3' - Datei und aelteren Versionen (Historie) (zusaetzlich auch per JS!)
			-->
		
			<!-- a) Version 'Code.GDS.Dokumentklasse.Typ3' auslesen (aus lokaler hinlaufender eEB-Nachrichten-Datei, z.B. 'xjustiz_nachricht.xml'): -->
			<xsl:variable name="codelistenVersion_GDSDokumentklasseTyp3_ausHinlaufendemEEB" select="//tns:schriftgutobjekte//tns:dokumentklasse/@listVersionID"/>
			
			<!-- b) Anzupassende 'Konstante' 2/3: gueltige Versionen der Codeliste 'GDS.Dokumentklasse (vorliegende lokale Version: 1.3) -->
			<!-- (Hinweis: Aktuell im XRepository bereits abgekuendigte Codelistenversionen, koennen bei alten XJustiz - eEB-Nachrichten noch gueltig gewesen sein! Daher werden hier alte Codelisten-Versionen beibehalten!) -->
			<xsl:variable name="gueltigeCodelistenVersionen_GDSDokumentklasseTyp3">1.0_1.1_1.2_1.3</xsl:variable>
			
			<!-- Typ3: Gesamte Codeliste 'GDS.Dokumentklasse' in der vorliegenden lokalen Version zuweisen -->
			<!-- per JS umgesetzt! -->

		<!-- /GDS-Codeliste 'GDS.Dokumentklasse' -->


		<!-- GDS-Codeliste 'GDS.Dokumenttyp' (Typ3): -->
		
			<!-- Typ3: Versionsnummer der Codeliste 'GDS.Dokumenttyp' ermitteln: 
			#	a) gemaess Versionsangabe zur 'Code.GDS.Dokumenttyp.Typ3' aus hinlaufender eEB-Nachricht! (zusaetzlich auch per JS!)
			#	b) gemaess 'Konstante 3/3' entsprechend der lokal abgelegten  'Code.GDS.Dokumenttyp.Typ3' - Datei und aelteren Versionen (Historie) (zusaetzlich auch per JS!)
			-->
		
			<!-- a) Version 'Code.GDS.Dokumenttyp.Typ3' auslesen (aus lokaler hinlaufender eEB-Nachrichten-Datei, z.B. 'xjustiz_nachricht.xml'): -->
			<xsl:variable name="codelistenVersion_GDSDokumenttypTyp3_ausHinlaufendemEEB" select="//tns:schriftgutobjekte//tns:dokumententyp/@listVersionID"/>
			
			<!-- b) Anzupassende 'Konstante' 3/3: gueltige Versionen der Codeliste 'GDS.Dokumenttyp (vorliegende lokale Version: 3.7) -->
			<!-- (Hinweis: Aktuell im XRepository bereits abgekuendigte Codelistenversionen, koennen bei alten XJustiz - eEB-Nachrichten noch gueltig gewesen sein! Daher werden hier alte Codelisten-Versionen beibehalten!) -->
			<xsl:variable name="gueltigeCodelistenVersionen_GDSDokumenttypTyp3">3.2_3.3_3.4_3.5_3.6_3.7</xsl:variable>
			
			<!-- Typ3: Gesamte Codeliste 'GDS.Dokumenttyp' in der vorliegenden lokalen Version zuweisen -->
			<!-- per JS umgesetzt! -->

		<!-- /GDS-Codeliste 'GDS.Dokumenttyp' -->
		
		
		<!-- eEB-Codeliste 'Stoerung' (Typ1): -->
			<!-- per JS umgesetzt! (s. Radio-Button - Auswahl mit Wert) -->
		<!-- /eEB-Codeliste 'Stoerung' (Typ1): -->
	
		<!-- Codeliste GDS.Polizeibehoerden (neu ab XJustiz 3.5.1 für Absender und Empfänger 			
			<xsl:variable name="codeliste_GDSPolizeibehoerdenTyp3" select="document('../codelisten_typ3/GDS.Polizeibehoerden.xml')" />
			<xsl:variable name="version_codeliste_GDSPolizeibehoerdenTyp3" select="$codeliste_GDSPolizeibehoerdenTyp3//gc:CodeList/Identification/Version"/>
		-->
	
	<!-- /Variablen-Deklaration -->


	<!-- HTML5 -->
	<xsl:output method="html" doctype-system="about:legacy-compat" encoding="UTF-8" indent="yes" cdata-section-elements="link script style noscript" />
	
	
	<!-- ############################# Vorlagen (I) zur Verarbeitung des XJustiz-Instanzdokuments ############################# -->
		
	<!-- /////////////// Auslesen der Dokumentwurzel \\\\\\\\\\\\\\\ -->
	<xsl:template match="/">

		<!-- Fehlerbehandlung: Falsche XJ-Nachricht ausgewaehlt? -->
		<xsl:choose>
			<!-- Achtung: alte SGO-Nachricht aus veralteter XJ-2.x - Version muss hier zunaechst mit abgefragt werden damit keine Fehlermeldung zu einer falschen hinl. eEB-Nachricht, sondern zu einer falschen XJ-Version erfolgt! -->
			<xsl:when test="tns:nachricht.gds.uebermittlung_schriftgutobjekte.0005005|tns:nachricht.gds.uebermittlungSchriftgutobjekte.0005005">
			
				<!-- Unsichtbarer Datencontainer fuer JS: Es wurde eine korrekte hinlaufende eEB-XJ-Nachricht ausgewaehlt -->
				<span id="fehler_falscheNachricht" class="element-invisible">0</span>
				
				<!-- alte SGO-Nachricht aus XJ-2.x -->
				<xsl:if test="tns:nachricht.gds.uebermittlung_schriftgutobjekte.0005005">
					<!-- Es wird zwar eine SGO-Nachricht verwendet - jedoch in einer alten Variante zu einer alten XJ-Version 2.x! -->
					<!-- do nothing! Die passende Fehlerausgabe erfolgt ueber die spaetere "PRUEFUNG 02: Wird die richtige XJ-Version verwendet?"! -->
				</xsl:if>
				
			</xsl:when>
			<xsl:otherwise>
				<!-- Unsichtbarer Datencontainer fuer JS: Es wurde fehlerhafter Weise keine eEB-XJ-Nachricht oder eine ruecklaufende eEB-XJ-Nachricht ausgewaehlt -->
				<span id="fehler_falscheNachricht" class="element-invisible">1</span>
			</xsl:otherwise>
		</xsl:choose>

		<h1 id="hauptUeberschrift">Empfangsbekenntnis</h1>

		<!-- Unsichtbarer Datencontainer fuer JS: XJustiz-Version aus hinl. eEB fuer JS -->
		<span id="xjustizVersion" class="element-invisible"><xsl:value-of select="$hinlaufendesEEB_xjustizVersion" /></span>
		
		<xsl:if test="contains('3.4.1_3.5.1', $hinlaufendesEEB_xjustizVersion)">
		
			<!-- Unsichtbarer Datencontainer fuer JS: 'Code.GDS.Gerichte.Typ3 - listVersionID' aus hinl. eEB fuer JS, soweit vorhanden -->
			<xsl:if test="$codelistenVersion_GDSGerichteTyp3_ausHinlaufendemEEB">
				<span id="Code.GDS.Gerichte.Typ3_listVersionID" class="element-invisible"><xsl:value-of select="$codelistenVersion_GDSGerichteTyp3_ausHinlaufendemEEB" /></span>
			</xsl:if>
			<!-- Unsichtbarer Datencontainer fuer JS: 'Code.GDS.Dokumentklasse.Typ3 - listVersionID' aus hinl. eEB fuer JS, soweit vorhanden -->
			<xsl:if test="$codelistenVersion_GDSDokumentklasseTyp3_ausHinlaufendemEEB">
				<span id="Code.GDS.Dokumentklasse.Typ3_listVersionID" class="element-invisible"><xsl:value-of select="$codelistenVersion_GDSDokumentklasseTyp3_ausHinlaufendemEEB" /></span>
			</xsl:if>
			<!-- Unsichtbarer Datencontainer fuer JS: 'Code.GDS.Dokumenttyp.Typ3 - listVersionID' aus hinl. eEB fuer JS, soweit vorhanden -->
			<xsl:if test="$codelistenVersion_GDSDokumenttypTyp3_ausHinlaufendemEEB">
				<span id="Code.GDS.Dokumenttyp.Typ3_listVersionID" class="element-invisible"><xsl:value-of select="$codelistenVersion_GDSDokumenttypTyp3_ausHinlaufendemEEB" /></span>
			</xsl:if>

		</xsl:if>
		
		<!-- Pruefungen und Template-Aufrufe -->
		<xsl:choose>
			<xsl:when test="($codelistenVersion_GDSGerichteTyp3_ausHinlaufendemEEB and not(contains($gueltigeCodelistenVersionen_GDSGerichteTyp3, $codelistenVersion_GDSGerichteTyp3_ausHinlaufendemEEB))) or ($codelistenVersion_GDSDokumentklasseTyp3_ausHinlaufendemEEB and not(contains($gueltigeCodelistenVersionen_GDSDokumentklasseTyp3, $codelistenVersion_GDSDokumentklasseTyp3_ausHinlaufendemEEB))) or ($codelistenVersion_GDSDokumenttypTyp3_ausHinlaufendemEEB and not(contains($gueltigeCodelistenVersionen_GDSDokumenttypTyp3, $codelistenVersion_GDSDokumenttypTyp3_ausHinlaufendemEEB)))">
				<!-- PRUEFUNG 01: Passt eine (konkret in dem Instanzdokument 'hinl. eEB' verwendete) Codelistenversion nicht zu den in der Variablen-Deklaration definierten 'Konstanten' - jeweils zu einer der drei lokalen Typ3-Codelisten 'GDS.Gerichte', 'GDS.Dokumentklasse' und 'GDS.Dokumenttyp'? Wenn noch zusaetzlich fuer den gesuchten Codelisten-Schluessel kein Eintrag in lokaler Codelistenversion gefunden werden kann, wird nachfolgende zentrale Hinweisbox ausgegeben! (Erscheint NICHT bei LEERER CL-Versionsangabe zu 'listVersionID - Attribut (dann nur mit lokalem inline-Text 'fehlende Versionsangabe!')!) -->
				<div class="box hinweisBox abstandUnten textCenter" id="hinweisBoxUpdateBrowseranwendung">
					<p class="meldung">Fehler:</p> 
					<p>Eine oder mehrere benötigte Codelistenversion(en) fehlen.<br />Bitte prüfen Sie, ob Ihre eEB-Browseranwendung der neuesten Version entspricht.</p>
				</div>
				<!-- PRUEFUNG 02: Wird die richtige XJ-Version verwendet? -->
				<xsl:call-template name="versionspruefung_xj"/>
				<!-- Aufruf SGO-Matcher (Schriftgutobjekte-Nachricht, also hinl. eEB) -->
				<xsl:if test="contains('3.4.1_3.5.1', $hinlaufendesEEB_xjustizVersion)">
					<xsl:apply-templates select="tns:nachricht.gds.uebermittlungSchriftgutobjekte.0005005" />
				</xsl:if>
			</xsl:when>
			<xsl:otherwise>
				<!-- PRUEFUNG 02: Wird die richtige XJ-Version verwendet? -->
				<xsl:call-template name="versionspruefung_xj"/>
				<!-- Aufruf SGO-Matcher (Schriftgutobjekte-Nachricht, also hinl. eEB) -->
				<xsl:if test="contains('3.4.1_3.5.1', $hinlaufendesEEB_xjustizVersion)">
					<xsl:apply-templates select="tns:nachricht.gds.uebermittlungSchriftgutobjekte.0005005" />
				</xsl:if>
			</xsl:otherwise>
		</xsl:choose>
		
	</xsl:template>


	<!-- /////////////// 'Ausgabe des Inhalts zum eEB' mit 'Auslesen der SGO-Nachricht' \\\\\\\\\\\\\\\ -->
	<xsl:template match="tns:nachricht.gds.uebermittlungSchriftgutobjekte.0005005">
	
		<!-- Adressat/Empfaenger des zu erzeugenden rueckl. eEB's (entspricht im hinl. eEB jedoch dem Absender des hinl. eEB's!) -->
			<!-- 'An das' -->
			<h2>Geschäftszeichen:</h2>
			
			<p id="aktenzeichen_absender_hinlEEB">
			<!-- Empfaenger-Aktenzeichen des rueckl. eEBs; Datenquelle: Absender-AZ des hinl. eEBs! Das Absender-Aktenzeichen kann in XJ-3.x mehr als einmal vorkommen -->
			<xsl:for-each select="//tns:nachrichtenkopf//tns:aktenzeichen.absender">
				<!-- Hier wird die fortlaufende 'id' dynamisch per JS nachtraeglich eingefuegt (z.B. id="ausgabe_aktenzeichen_absender_hinlEEB_1") -->
				<span><xsl:value-of select="."/></span>
				<xsl:if test="not(position() = last())">,&#160;</xsl:if>
			</xsl:for-each>
			</p>
		
			<!-- Empfaenger-Bezeichnung des rueckl. eEBs; Datenquelle: Absender hinl. eEB! -->
		<div><xsl:apply-templates select="//tns:absender.gericht|//tns:absender.rvTraeger|//tns:absender.sonstige"/></div>		
		<!-- /Adressat/Empfaenger des zu erzeugenden rueckl. eEB's -->


		<!-- eEB - Abgabe/Nicht-Abgabe -->
			<h2>In Sachen </h2>
		
			<!-- Datenquelle: hinl. eEB! -->
			<xsl:choose>
				<xsl:when test="//tns:kurzrubrum">
					<p><xsl:value-of select="//tns:kurzrubrum" /></p>
				</xsl:when>
				<xsl:otherwise>
					<!-- Kein Kurzrubrum im hinlaufenden eEB vorhanden! Es wird stattdessen das 'aktenzeichen.absender' aus dem hinlaufenden eEB verwendet. -->
					<p><xsl:value-of select="//tns:nachrichtenkopf/tns:aktenzeichen.absender[1]"/></p>
				</xsl:otherwise>
			</xsl:choose>
			
			
			<!-- Hier wird pauschal der Text zu Fall 'eEB wird abgegeben' (ohne/mit Vertreter) ausgeben -->
			<p>bin ich zur Entgegennahme legitimiert und habe heute als elektronische(s) Dokument(e) erhalten:</p>				
			
			
			<!-- Ausgabe der SGO - Tabelle (nur fuer Akten, Teilakten und Dokumente, bei denen jeweils das eEB angefordert wurde!) -->	
			<table class="abstandOben">
			
			 <thead>
				<tr>
					<th class="nobr">Nr</th><!-- Nr ('Nummer im uebergeordneten Container') -->
					<th class="nobr">Typ</th><!-- Kann Wert der Codeliste 'GDS.Aktentyp', 'GDS.Teilaktentyp' oder 'GDS.Dokumentklasse' (Pflicht), 'GDS.Dokumenttyp' (optional) sein! -->
					<th class="nobr_screen">Datum des Schreibens</th>
					<th>Anzeigename</th>
				</tr>
			 </thead>

			 <tbody>
				<xsl:choose>
				
					<!-- Datenquelle: hinl. eEB! -->
					<xsl:when test="count(//tns:ruecksendungEEB.erforderlich[text() = 'true'] | //tns:ruecksendungEEB.erforderlich[text() = '1']) &gt; 0">
						
						<!-- 1.) Alle Dokumente der obersten SGO-Ebene ausgeben -->
						<xsl:for-each select="tns:schriftgutobjekte/tns:dokument">

							<xsl:if test="(tns:xjustiz.fachspezifischeDaten/tns:ruecksendungEEB.erforderlich = 'true') or (tns:xjustiz.fachspezifischeDaten/tns:ruecksendungEEB.erforderlich = '1')">
								<tr>
								
									<!-- Template Dokument aufrufen -->
									<xsl:call-template name="dokumentdaten"/>

								</tr>
							</xsl:if> 
							
						</xsl:for-each>
						
						<!-- 2.) Alle Akten der obersten SGO-Ebene ausgeben, incl. der ggf. darin enhaltenen Teilakten und Dokumente (nicht jedoch weitere Akten). In den Teilakten koennen rekursiv weitere Teilakten und/oder Dokumente enthalten sein. -->
						<xsl:for-each select="(tns:schriftgutobjekte/tns:akte|tns:schriftgutobjekte/tns:akte//tns:teilakte|tns:schriftgutobjekte/tns:akte//tns:dokument)">

							<xsl:if test="(tns:xjustiz.fachspezifischeDaten/tns:ruecksendungEEB.erforderlich = 'true') or (tns:xjustiz.fachspezifischeDaten/tns:ruecksendungEEB.erforderlich = '1')">
								<tr>
								
									<!-- Templates fuer Akte, Teilakte und Dokument aufrufen -->
									<xsl:choose>
										<xsl:when test="local-name(.) = 'akte'">
											<xsl:call-template name="aktendaten"/>
										</xsl:when>
										<xsl:when test="local-name(.) = 'teilakte'">
											<xsl:call-template name="teilaktendaten"/>
										</xsl:when>
										<xsl:otherwise>
											<xsl:call-template name="dokumentdaten"/>
										</xsl:otherwise>
									</xsl:choose>
									
								</tr>
							</xsl:if> 
							
						</xsl:for-each>

					</xsl:when>
				
					<xsl:otherwise>
						<tr>
							<td id="noEEB" class="fehler" colspan="4">Kein Schriftgutobjekt mit erforderlichem elektronischen Empfangsbekenntnis vorhanden!</td>
						</tr>
					</xsl:otherwise>
					
				</xsl:choose>
			 </tbody>
			 
			</table>	


			<!-- Datumsausgabe, wann eEB abgegeben wurde -->
			<h2 id="datum">
				<label id="label_datum" for="eingabe_datum">Datum: </label>
				<input id="eingabe_datum" type="date" title="Eingabeformat: TT.MM.JJJJ" placeholder="TT.MM.JJJJ" />
			</h2>


			<!-- Angaben zum Zustellungsempfaenger (hinl. eEB) und Aufbau der aktiven Steuerelemente fuer rueckl. eEB (Geschaeftszeichen, Datum, Vertreter, Ablehnung eEB) -->
			<h2>Zustellungsempfänger oder Zustellungsempfängerin:</h2>
			
					<!-- Datenquelle: hinl. eEB! -->
						<!-- Zustellempfaenger ist der Empfaenger des hinlaufenden eEB's -->
						<xsl:apply-templates select="//tns:empfaenger.gericht|//tns:empfaenger.rvTraeger|//tns:empfaenger.sonstige"/>
						
						<div id="container_aktenzeichen_empfaenger_hinlEEB">
						
							<fieldset>
							
								<label id="label_aktenzeichen_empfaenger_hinlEEB">Geschäftszeichen:</label>
						
								<!-- Mehrfache Aktenzeichen-Ausgabe moeglich! (gehoeren zum (Zustell-)Empfaenger im hinl. eEB => (aenderbare) Absender-Aktenzeichen fuer rueckl. eEB; darueber hinaus sollen keine zusaetzlichen AZ durch Anwender im rueckl. eEB angegeben werden koennen!) -->
								<span id="aktenzeichen_empfaenger_hinlEEB">
								
									<xsl:choose>
									
										<xsl:when test="count(//tns:nachrichtenkopf/tns:aktenzeichen.empfaenger) &gt; 0">

											<xsl:for-each select="//tns:nachrichtenkopf/tns:aktenzeichen.empfaenger">
											
												<!-- Hier wird die fortlaufende id dynamisch per JS nachtraeglich eingefuegt (z.B. id="eingabe_aktenzeichen_absender_ruecklEEB_1") -->
												<input class="inputFeld_aktenzeichen" title="optionale Angabe des Geschäftszeichens" placeholder="optionale Angabe des Geschäftszeichens" size="40" /> 
												
												<!-- Unsichtbarer Datencontainer fuer JS: Fuer Vorbelegung input-Element mit Ursprungswert aus hinl. eEB; hier wird die fortlaufende 'id' dynamisch per JS nachtraeglich eingefuegt (z.B. id="ausgabe_aktenzeichen_empfaenger_hinlEEB_1") -->
												<span class="element-invisible"><xsl:value-of select="."/></span>
												
												<!-- Zeilenumbruch fuer naechstes input-Feld -->
												<br />
												 
											</xsl:for-each>
											
										</xsl:when>
										<xsl:otherwise>
										
											<!-- Wenn im hinl. eEB kein <aktenzeichen.empfaenger> - Element vorhanden war, wird hier ein input-Element fuer optionale Absender-Befuellung zum rueckl. eEB ausgeben -->
											<input class="inputFeld_aktenzeichen" id="eingabe_aktenzeichen_absender_ruecklEEB_1" title="optionale Angabe des Geschäftszeichens" placeholder="optionale Angabe des Geschäftszeichens" size="40" /> 
										
										</xsl:otherwise>
									
									</xsl:choose>
							
								</span>
								
							</fieldset>
						
						</div>

					<!-- Datenquelle: hinl. eEB! -->

					<!-- Vertreter -->
					<div>	
						<p id="vertreter">
							<label for="checkbox_vertreter">
								<input id="checkbox_vertreter" type="checkbox" aria-label="Vertreter" />
							</label>
							<label for="eingabe_vertreter">vertreten durch:
								<input id="eingabe_vertreter" name="eingabe_vertreter" title="Bitte vollständigen Namen eingeben" placeholder="Bitte vollständigen Namen eingeben" size="40" disabled="disabled" />
							</label>
						</p>
					</div>					
					<!-- Horiz. Trennlinie zwischen 'Vertreter' und 'Ablehnung eEB' -->
					<hr id="hrVertreter" />
					
					<!-- Ablehnung eEB -->
					<div>
						<p>
							<label>
								<input type="checkbox" id="checkbox_ablehnung" name="wahl" aria-label="Ablehnung eEB" />
								Ich lehne das Empfangsbekenntnis ab.
							</label>
						</p>
						
						<fieldset>
						
							<legend id="ueberschrift_ablehnungsgrund">Grund der Ablehnung:</legend>
							
							<div id="container_ablehnungsgruende">
							
								<p>
									<label>
										<input type="radio" id="radio1" name="ablehnungsgrund" value="1" checked="checked" disabled="disabled"/>
										Zustellungsempfänger nicht am Verfahren beteiligt
									</label>
								</p>
								<p>
									<label>
										<input type="radio" id="radio2" name="ablehnungsgrund" value="2" disabled="disabled"/>
										Inhalt der Sendung unklar oder unvollständig
									</label>
								</p>
								<p>
									<label>
										<input type="radio" id="radio3" name="ablehnungsgrund" value="3" disabled="disabled"/>
										Zertifikatsprüfung fehlgeschlagen
									</label>
								</p>
							
							</div>
							
						</fieldset>
					</div>
					
					<div id="container_stoerungsgrund">
					
						<label id="label_stoerungsgrund" for="eingabe_stoerungsgrund"><strong>Störungsgrund:</strong></label>
						<br />
						<textarea id="eingabe_stoerungsgrund" name="eingabe_stoerungsgrund" rows="2" cols="30" title="Optionales Freitextfeld zur Erläuterung der Störung" placeholder="Optionales Freitextfeld zur Erläuterung der Störung."></textarea>
					
					</div>
					
					
					<!-- Rueckl. eEB erstellen und 'Zurück' - Button -->
					<h2 id="ueberschrift_buttons" class="element-invisible">Nehmen Sie Ihre Eingaben vor und erstellen anschließend das rücklaufende eEB:</h2>
					<div id="buttons">
						<button id="go" type="button">Erstelle rücklaufendes Empfangsbekenntnis</button>
						<button id="btnSpeichern" type="button" style="visibility: hidden" disabled="disabled"><strong>XML-Datei erneut speichern</strong></button>
						
						<!-- Button 'Zurück zur Dateiauswahl' -->
						<form action="start_eeb.html" id="zurueck" method="post">
							<button id="back" type="submit">Weiteres rücklaufendes Empfangsbekenntnis erstellen</button>
						</form>
					</div>
					
					
					<!-- Unsichtbarer Datencontainer fuer JS ('eigeneNachrichtenID') -->
					<span id="nachrichtenID" class="element-invisible"><xsl:value-of select="//tns:nachrichtenkopf/tns:eigeneNachrichtenID"/></span>	
			
					
		<!-- /eEB - Abgabe/Nicht-Abgabe -->

	</xsl:template>


	<!-- /////////////// Auslesen des Absenders aus hinlaufendem eEB und Bereitstellen von Datencontainern aus Absenderdaten (fuer Empfaengerdaten beim rueckl. eEB) \\\\\\\\\\\\\\\ -->
	<xsl:template match="tns:absender.gericht|tns:absender.rvTraeger|tns:absender.sonstige">
	
		<xsl:choose>
			<xsl:when test="local-name(.) = 'absender.gericht'">
				<p>
					<span class="gericht"><xsl:value-of select="./code"/></span>
				</p>
				<!-- Unsichtbarer Datencontainer fuer JS -->
				<span id="absender" class="element-invisible"><xsl:value-of select="./code"/></span>
			</xsl:when>
			<xsl:when test="local-name(.) = 'absender.rvTraeger'">
				<p>
					<span class="rvtraeger"><xsl:value-of select="./code"/></span>
				</p>
				<!-- Unsichtbarer Datencontainer fuer JS -->
				<span id="absender" class="element-invisible"><xsl:value-of select="./code"/></span>
			</xsl:when>
			
		<!-- 	
			<xsl:when test="local-name(.) = 'absender.polizeibehoerde'">
				<xsl:call-template name="suchePolizeibehoerde">
					<xsl:with-param name="codePolizeibehoerde" select="./code"/>
				</xsl:call-template>
				<p>
					<span class="polizeibehoerde"><xsl:value-of select="./code"/></span>
				</p>
				<span id="absender" class="element-invisible"><xsl:value-of select="./code"/></span>
			</xsl:when>
		 -->	
			
			<xsl:otherwise>
				<!-- Entspricht: 'absender.sonstige' (String-Wert) -->
				<!-- Dient gleichzeitig als Datencontainer fuer JS -->
				<p id="absender"><xsl:value-of select="."/></p>
			</xsl:otherwise>
		</xsl:choose>
		
		<!-- Unsichtbarer Datencontainer fuer JS: Fuer den Element-Namen (nicht Inhalt!) 'absender.gericht' -->
		<span id="absender_tag" class="element-invisible"><xsl:value-of select="local-name(.)"/></span>
		
	</xsl:template>
	
	 
	
	
	<!-- /////////////// Auslesen des Empfaengers aus hinlaufendem eEB und Bereitstellen von Datencontainern aus Empfaengerdaten (fuer Absenderdaten beim rueckl. eEB) \\\\\\\\\\\\\\\ -->
	<xsl:template match="tns:empfaenger.gericht|tns:empfaenger.rvTraeger|tns:empfaenger.sonstige">

		<xsl:choose>
			<xsl:when test="local-name(.) = 'empfaenger.gericht'">			
				<p>
					<span class="gericht"><xsl:value-of select="./code"/></span>
				</p> 
				<!-- Unsichtbarer Datencontainer fuer JS -->
				<span id="empfaenger" class="element-invisible"><xsl:value-of select="./code"/></span>
			</xsl:when>
			<xsl:when test="local-name(.) = 'empfaenger.rvTraeger'">
				<p>
					<span class="rvtraeger"><xsl:value-of select="./code"/></span>
				</p>
				<!-- Unsichtbarer Datencontainer fuer JS -->
				<span id="empfaenger" class="element-invisible"><xsl:value-of select="./code"/></span>
			</xsl:when>
			
		<!-- 	
			<xsl:when test="local-name(.) = 'empfaenger.polizeibehoerde'">
				<xsl:call-template name="suchePolizeibehoerde">
					<xsl:with-param name="codePolizeibehoerde" select="./code"/>
				</xsl:call-template>
				<p>
					<span class="polizeibehoerde"><xsl:value-of select="./code"/></span>
				</p>
				<span id="empfaenger" class="element-invisible"><xsl:value-of select="./code"/></span>
			</xsl:when>
		-->
			
			<xsl:otherwise>
				<!-- Entspricht: 'empfaenger.sonstige' (String-Wert) -->
				<!-- Dient gleichzeitig als Datencontainer fuer JS -->
				<p id="empfaenger"><xsl:value-of select="."/></p>
			</xsl:otherwise>
		</xsl:choose>

		<!-- Unsichtbarer Datencontainer fuer JS -->
		<span id="empfaenger_tag" class="element-invisible"><xsl:value-of select="local-name(.)"/></span>
		
	</xsl:template>
	
	
	
<!-- ############################# Vorlagen (II) zur Verarbeitung des XJustiz-Instanzdokuments ############################# -->
	
	<!-- /////////////// Akten-Daten \\\\\\\\\\\\\\\ -->
	<xsl:template name="aktendaten">
	
		<!-- Prüfung der eEB-Anforderung je Akte -->
		<xsl:if test="(tns:xjustiz.fachspezifischeDaten/tns:ruecksendungEEB.erforderlich = 'true') or (tns:xjustiz.fachspezifischeDaten/tns:ruecksendungEEB.erforderlich = '1')">		
				
				<!-- Nr ('Nummer im uebergeordneten Container') --> 				
				<xsl:choose>
					<xsl:when test="tns:identifikation/tns:nummerImUebergeordnetenContainer">
						<td><xsl:value-of select="tns:identifikation/tns:nummerImUebergeordnetenContainer" /></td>
					</xsl:when>
					<xsl:otherwise>
						<td> </td>
					</xsl:otherwise>
				</xsl:choose>
				
				<!-- Codelistenwert ('Aktentyp') -->
				<td>
					<span class="aktentyp"><xsl:value-of select="tns:xjustiz.fachspezifischeDaten/tns:aktentyp/code"/></span>
				</td>

				<!-- 'Dokumentendatum': entfaellt -->
				<td>--</td>
				
				<!-- Anzeigename --> 		
				<xsl:choose>
					<xsl:when test="tns:xjustiz.fachspezifischeDaten/tns:anzeigename">
						<td><xsl:value-of select="tns:xjustiz.fachspezifischeDaten/tns:anzeigename" /></td>
					</xsl:when>
					<xsl:otherwise>
						<td> </td>
					</xsl:otherwise>
				</xsl:choose>
		
		</xsl:if>
		
	</xsl:template>
	
	
	<!-- /////////////// Teilakten-Daten \\\\\\\\\\\\\\\ -->
	<xsl:template name="teilaktendaten">
	
		<!-- Prüfung der eEB-Anforderung je Teilakte -->		
		<xsl:if test="(tns:xjustiz.fachspezifischeDaten/tns:ruecksendungEEB.erforderlich = 'true') or (tns:xjustiz.fachspezifischeDaten/tns:ruecksendungEEB.erforderlich = '1')">
			
				<!-- Nr ('Nummer im uebergeordneten Container') --> 				
				<xsl:choose>
					<xsl:when test="tns:identifikation/tns:nummerImUebergeordnetenContainer">
						<td><xsl:value-of select="tns:identifikation/tns:nummerImUebergeordnetenContainer" /></td>
					</xsl:when>
					<xsl:otherwise>
						<td> </td>
					</xsl:otherwise>
				</xsl:choose>
			
				<!-- Codelistenwert ('Teilaktentyp') -->
				<td>
					<span class="teilaktentyp"><xsl:value-of select="tns:xjustiz.fachspezifischeDaten/tns:teilaktentyp/code"/></span>
				</td>
			
				<!-- 'Datum des Schreibens': entfaellt -->
				<td>--</td>
				
				<!-- Anzeigename --> 		
				<xsl:choose>
					<xsl:when test="tns:xjustiz.fachspezifischeDaten/tns:anzeigename">
						<td><xsl:value-of select="tns:xjustiz.fachspezifischeDaten/tns:anzeigename" /></td>
					</xsl:when>
					<xsl:otherwise>
						<td> </td>
					</xsl:otherwise>
				</xsl:choose>

		</xsl:if>
		
	</xsl:template>
	
	
	<!-- /////////////// Dokument-Daten \\\\\\\\\\\\\\\ -->
	<xsl:template name="dokumentdaten">
	
		<!-- Pruefung der eEB-Anforderung je Dokument -->		
		<xsl:if test="(tns:xjustiz.fachspezifischeDaten/tns:ruecksendungEEB.erforderlich = 'true') or (tns:xjustiz.fachspezifischeDaten/tns:ruecksendungEEB.erforderlich = '1')">
				
				<!-- Nr ('Nummer im uebergeordneten Container') --> 				
				<xsl:choose>
					<xsl:when test="tns:identifikation/tns:nummerImUebergeordnetenContainer">
						<td><xsl:value-of select="tns:identifikation/tns:nummerImUebergeordnetenContainer" /></td>
					</xsl:when>
					<xsl:otherwise>
						<td> </td>
					</xsl:otherwise>
				</xsl:choose>
			
				<!-- Codelistenwert (Ausgabe: 'GDS.Dokumentklasse' (Pflicht), 'GDS.Dokumenttyp' (optional)) -->
				<td>
				
					<!-- 1.) Code.GDS.Dokumentklasse.Typ3' -->
					<span class="dokumentklasse"><xsl:value-of select="tns:xjustiz.fachspezifischeDaten/tns:dokumentklasse/code"/></span>
					
					<!-- 2.) Code.GDS.Dokumenttyp.Typ3' -->
					<xsl:if test="tns:xjustiz.fachspezifischeDaten/tns:dokumententyp/code">, <span class="dokumenttyp"><xsl:value-of select="tns:xjustiz.fachspezifischeDaten/tns:dokumententyp/code"/></span></xsl:if>

				</td>
				
				<!-- 'Datum des Schreibens' -->
				<xsl:choose>
					<xsl:when test="tns:datumDesSchreibens">
						<td>
							<xsl:call-template name="formatDate">
								<xsl:with-param name="date"><xsl:value-of select="tns:datumDesSchreibens" /></xsl:with-param>
							</xsl:call-template>
						</td>
					</xsl:when>
					<xsl:otherwise>
						<td> </td>
					</xsl:otherwise>
				</xsl:choose>

				<!-- Anzeigename (hilfsweise 'dateiname' bzw. Leerstring ' ') --> 				
				<xsl:choose>
					<!-- 1. 'anzeigename' ausgeben, soweit vorhanden -->
					<xsl:when test="tns:xjustiz.fachspezifischeDaten/tns:anzeigename">
						<td><xsl:value-of select="tns:xjustiz.fachspezifischeDaten/tns:anzeigename" /></td>
					</xsl:when>
					<!-- 2. Ersatzweise 'dateiname' zu 'datei' (1..n) ausgeben, wenn Geschwister-Element 'bestandteil' den Code '001' (Wert: 'Original') hat -->
					<xsl:when test="tns:xjustiz.fachspezifischeDaten/tns:datei/tns:dateiname[../tns:bestandteil/code = '001']">
						<!-- Kontext: 'document'! -->
						<td><xsl:value-of select="tns:xjustiz.fachspezifischeDaten/tns:datei/tns:dateiname[../tns:bestandteil/code = '001']" /></td>
					</xsl:when>
					<!-- 3. Ersatzweise leere Tabellenzelle ausgeben -->
					<xsl:otherwise>
						<td> </td>
					</xsl:otherwise>
				</xsl:choose>

		</xsl:if>
		
	</xsl:template>

	
	<!-- /////////////// Datums-Formatierung eines 'xs:date' o. 'xs:dateTime' - Wertes \\\\\\\\\\\\\\\ -->
	<xsl:template name="formatDate">
		<xsl:param name="date" />
		<!-- z.B. 2021-01-10 oder 2021-01-10T08:00:00.0 ergeben 10.01.2021  -->
		<xsl:variable name="year" select="substring-before($date, '-')" />
		<xsl:variable name="month" select="substring-before(substring-after($date, '-'), '-')" />
		<xsl:variable name="day" select="substring(substring-after(substring-after($date, '-'), '-'), 1, 2)" />
		<xsl:value-of select="concat($day, '.', $month, '.', $year)" />
	</xsl:template>
	

	<!-- /////////////// Pruefung 02, ob zulaessige, richtige XJustiz-Versionsnummer (3.4.1 oder 3.5.1) beim hinlaufenden eEB vorliegt  \\\\\\\\\\\\\\\ -->
	<xsl:template name="versionspruefung_xj">

			<xsl:if test="not(contains('3.4.1_3.5.1', $hinlaufendesEEB_xjustizVersion))">
				<div class="box fehlerBox textCenter abstandUnten">
					<p class="meldung">Fehler:</p>
					<p>Die XJustiz-Version der XJustiz-Nachricht (hinlaufendes eEB) wird nicht unterstützt! Nähere Informationen können der Anleitung zur Browseranwendung entnommen werden.</p>
					
					<!-- Button 'Zurück zur Dateiauswahl' -->
					<p>
						<form action="start_eeb.html" id="zurueck" method="post">
							<button id="back" type="submit">Zurück zur Dateiauswahl</button>
						</form>
					</p>
				</div>
			</xsl:if>
			
	</xsl:template>
	
	
	<!-- /////////////// Suche Wert fuer 'XJustiz-ID - Code' in Codeliste 'GDS Gerichte' \\\\\\\\\\\\\\\ -->
	<!-- Codeliste ggf. im hinl. eEB vorhanden! -->
	
		<!-- per JS umgesetzt! -->
	
	
	<!-- /////////////// Suche Wert fuer Code Dokumentklasse/Dokumenttyp (jeweils Typ3) (XJ-3.x) \\\\\\\\\\\\\\\ -->
	<!-- Codeliste(n) nur im  hinl. eEB vorhanden! -->
	
		<!-- per JS umgesetzt! -->
	
	
	<!-- /////////////// Suche Wert fuer Code in sonstigen Codelisten zu Aktentyp, Teilaktentyp und RVTraeger \\\\\\\\\\\\\\\ -->
	<!-- Codelisten nur im hinl. eEB vorhanden! -->
	
		<!-- per JS umgesetzt! -->
		
</xsl:stylesheet>