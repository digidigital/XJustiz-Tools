function getXML() {
  var herstellerinformation='<tns:herstellerinformation><tns:nameDesProdukts>Browseranwendung der Justiz XJustiz Version 3.5.1</tns:nameDesProdukts>\
							<tns:herstellerDesProdukts>BLK-AG IT-Standards in der Justiz</tns:herstellerDesProdukts>\
							<tns:version>5.0.2</tns:version>\
							</tns:herstellerinformation>'
	
  var nachrichtentype_basis ='basisnachricht.0005006';
  var nachrichtentype_sgo ='uebermittlungSchriftgutobjekte.0005005';
  var nachrichtentype = '';

	
  var UUID_eigeneNachricht = guid();

  
  var empfaenger = $('#empfaenger_bez option:selected').val();
  var empfaenger_polizei = $('#empfaenger_bez_polizei option:selected').val();
  var empfaenger_sonstige = replaceCharacters($('#empfaenger_sonst').val());
  
  
  //var absender = $('#absender_bez option:selected').val();
  var absender = replaceCharacters($('#absender_bez').val());
  var aktenzeichen_empfaenger = replaceCharacters($('#akt_des_empf').val());
  var aktenzeichen_absender = replaceCharacters($('#akt_des_abs').val());

  var sachgebiet_text = $('#sachgebiete_select_modal').find(":selected").text();
  var num_sachgebiet = $('#sachgebiete_select_modal option:selected').val();

  var uuid = guid();
  arr_selected_sachgebiete = [];
  arr_selected_sachgebiete[uuid] = {
    key: num_sachgebiet,
    text: sachgebiet_text,
    empfaenger: aktenzeichen_empfaenger,
    absender: ""
  };

  var date =new Date().toISOString();
  

  var verfahrendaten = '';
  for (key in arr_selected_sachgebiete) {
    verfahrendaten += '\
            <tns:instanzdaten>\
                    <tns:sachgebiet listVersionID="2.3">\
                             <code>'+ arr_selected_sachgebiete[key].key + '</code>\
                    </tns:sachgebiet>';
		
		if (empfaenger_sonstige!=null) {
		verfahrendaten +='<tns:auswahl_instanzbehoerde><tns:sonstige>'+empfaenger_sonstige+'</tns:sonstige></tns:auswahl_instanzbehoerde>';	
		} else {
		verfahrendaten +='<tns:auswahl_instanzbehoerde><tns:gericht listVersionID="3.6"><code xmlns="">'+empfaenger+'</code></tns:gericht></tns:auswahl_instanzbehoerde>';	
		}
		
        verfahrendaten +='<tns:aktenzeichen><tns:auswahl_aktenzeichen><tns:aktenzeichen.freitext>'+ arr_selected_sachgebiete[key].empfaenger + '</tns:aktenzeichen.freitext></tns:auswahl_aktenzeichen></tns:aktenzeichen>';
  }
  
  var gegenstaende = '';
  for (key in arr_selected_gegenstand) {
    gegenstaende += '<tns:verfahrensgegenstand><tns:gegenstand>'+ replaceCharacters(arr_selected_gegenstand[key].gegenstand) +'</tns:gegenstand></tns:verfahrensgegenstand>';
  }
  gegenstaende +='</tns:instanzdaten>';
  
  verfahrendaten += gegenstaende;
  
  
  i = 1;
  for (key in arr_selected_kanzlei) {
	  
    verfahrendaten += '<tns:beteiligung>';
	if (arr_selected_kanzlei[key].rolle.key!="") {
		verfahrendaten += '<tns:rolle>\
                <tns:rollennummer>'+ i + '</tns:rollennummer>\
                <tns:rollenbezeichnung listVersionID="3.5">\
                         <code>'+ arr_selected_kanzlei[key].rolle.key + '</code>\
                </tns:rollenbezeichnung>\
         </tns:rolle>'
		 i++;
	}
   verfahrendaten += '<tns:beteiligter><tns:auswahl_beteiligter><tns:ra.kanzlei><tns:bezeichnung><tns:bezeichnung.aktuell>'+replaceCharacters(arr_selected_kanzlei[key].kanzleiname)+'</tns:bezeichnung.aktuell></tns:bezeichnung>'
		
		if (arr_selected_kanzlei[key].rechtsform.key!="") {
		verfahrendaten += '<tns:rechtsform listVersionID="2.3"><code xmlns="">'+replaceCharacters(arr_selected_kanzlei[key].rechtsform.key)+'</code></tns:rechtsform>'
		}
		verfahrendaten += '<tns:kanzleiform><code xmlns="">'+arr_selected_kanzlei[key].kanzleiform.key+'</code></tns:kanzleiform>\
        </tns:ra.kanzlei></tns:auswahl_beteiligter></tns:beteiligter></tns:beteiligung>'
    
  }  
	
  
  
  for (key in arr_selected_personen) {
    verfahrendaten += '<tns:beteiligung>';
	if (arr_selected_personen[key].rolle.key!="") {
		verfahrendaten += '<tns:rolle>\
                <tns:rollennummer>'+ i + '</tns:rollennummer>\
                <tns:rollenbezeichnung listVersionID="3.5">\
                         <code>'+ arr_selected_personen[key].rolle.key + '</code>\
                </tns:rollenbezeichnung>\
        </tns:rolle>'
		i++;
	}	
		verfahrendaten +='<tns:beteiligter><tns:auswahl_beteiligter>\
        <tns:natuerlichePerson>\
                <tns:vollerName><tns:vorname>'+ replaceCharacters(arr_selected_personen[key].vorname) + '</tns:vorname><tns:titel>' + replaceCharacters(arr_selected_personen[key].titel) + '</tns:titel><tns:namensvorsatz>' + replaceCharacters(arr_selected_personen[key].namenvorsatz) + '</tns:namensvorsatz><tns:nachname>' + replaceCharacters(arr_selected_personen[key].nachname) + '</tns:nachname></tns:vollerName>\
        </tns:natuerlichePerson>\
        </tns:auswahl_beteiligter></tns:beteiligter></tns:beteiligung>'
    
  }

  for (key in arr_selected_orgas) {
    verfahrendaten += '<tns:beteiligung>';
	if (arr_selected_orgas[key].rolle.key!="") {
		verfahrendaten += '<tns:rolle>\
        <tns:rollennummer>'+ i + '</tns:rollennummer>\
        <tns:rollenbezeichnung listVersionID="3.5">\
                 <code>'+ arr_selected_orgas[key].rolle.key + '</code>\
        </tns:rollenbezeichnung>\
        </tns:rolle>'
		i++;
		}
	
        verfahrendaten += '<tns:beteiligter><tns:auswahl_beteiligter>\
        <tns:organisation>\
                <tns:bezeichnung>\
                         <tns:bezeichnung.aktuell>'+ replaceCharacters(arr_selected_orgas[key].bez) + '</tns:bezeichnung.aktuell>\
                </tns:bezeichnung>\
        </tns:organisation>\
        </tns:auswahl_beteiligter></tns:beteiligter></tns:beteiligung>';

    
  }

  //verfahrendaten+=herstellerinformation;
  nrc = 1;
  var dokumentendaten = "<tns:schriftgutobjekte>";
  for (key in arr_selected_attachments) {

    dokumentendaten += '<tns:dokument>\
            <tns:identifikation>\
                    <tns:id>'+ key + '</tns:id>\
					<tns:nummerImUebergeordnetenContainer>'+nrc+'</tns:nummerImUebergeordnetenContainer>\
            </tns:identifikation>\
			<tns:xjustiz.fachspezifischeDaten>\
            <tns:dokumentklasse listVersionID="1.3">\
                    <code>'+ arr_selected_attachments[key].dokTyp.key + '</code>\
            </tns:dokumentklasse>\
			<tns:anzeigename>'+ replaceCharacters(arr_selected_attachments[key].anzeigename) + '</tns:anzeigename>';
			
			for (dateikey in arr_selected_attachments[key].dateien) {
			
			
	
	dokumentendaten += '<tns:datei>\
                    <tns:dateiname>'+ arr_selected_attachments[key].dateien[dateikey].filename + '</tns:dateiname>\
                    <tns:bestandteil listVersionID="2.4">\
                             <code>'+ arr_selected_attachments[key].dateien[dateikey].bestandteil.key + '</code>\
                    </tns:bestandteil></tns:datei>';
					
			}
            
	dokumentendaten += '</tns:xjustiz.fachspezifischeDaten></tns:dokument>';
   nrc++;
  }
  
  if (nrc>1) {
	  dokumentendaten+='</tns:schriftgutobjekte>';
	  nachrichtentype = nachrichtentype_sgo;
  } else {
	  dokumentendaten='';
	  nachrichtentype = nachrichtentype_basis;
	  
  }
  




  // <tns:vertraulichkeit><vertraulichkeitsstufe> </vertraulichkeitsstufe> <vertraulichkeitsgrund> <7vertraulichkeitsgrund></tns:vertraulichkeit> 
  
  var sendungsprioritaet = "";
  if ($('#sendungsprioritaet_select_modal option:selected').val()!="") {
	  sendungsprioritaet ='<tns:sendungsprioritaet listVersionID="1.1"><code xmlns="">'+$('#sendungsprioritaet_select_modal option:selected').val()  +'</code></tns:sendungsprioritaet>';
  }




  var xmldata = '<?xml version="1.0" encoding="UTF-8"?>\
<tns:nachricht.gds.'+nachrichtentype+' xmlns:tns="http://www.xjustiz.de" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:din91379="urn:xoevde:kosit:xoev:datentyp:din-91379_2022-08" xsi:schemaLocation="http://www.xjustiz.de xjustiz_0005_nachrichten_3_1.xsd">\
\
        <tns:nachrichtenkopf xjustizVersion="3.5.1">\
        <tns:aktenzeichen.absender>'+ aktenzeichen_absender + '</tns:aktenzeichen.absender>\
        <tns:aktenzeichen.empfaenger>'+ aktenzeichen_empfaenger + '</tns:aktenzeichen.empfaenger>\
        <tns:erstellungszeitpunkt>'+ date + '</tns:erstellungszeitpunkt>\
		<tns:auswahl_absender>\
        <tns:absender.sonstige>'+ absender + '</tns:absender.sonstige>\
		</tns:auswahl_absender>'
		
		
		if (empfaenger_sonstige!=null) {
		xmldata+='<tns:auswahl_empfaenger>\
                 <tns:empfaenger.sonstige>'+ empfaenger_sonstige + '</tns:empfaenger.sonstige>\
				</tns:auswahl_empfaenger>'	
		
		} else if (empfaenger_polizei!=null) {
		xmldata+='<tns:auswahl_empfaenger>\
                 <tns:empfaenger.polizeibehoerde listVersionID="1.0">\
                 <code>'+ empfaenger_polizei + '</code>\
                 </tns:empfaenger.polizeibehoerde>\
				</tns:auswahl_empfaenger>'
			
		} else {
		xmldata+='<tns:auswahl_empfaenger>\
                 <tns:empfaenger.gericht listVersionID="3.6">\
                 <code>'+ empfaenger + '</code>\
                 </tns:empfaenger.gericht>\
				</tns:auswahl_empfaenger>'
		}
		
		
		
        xmldata+='<tns:eigeneNachrichtenID>'+ UUID_eigeneNachricht + '</tns:eigeneNachrichtenID>'+herstellerinformation+sendungsprioritaet+'</tns:nachrichtenkopf>\
        <tns:grunddaten>\
                 <tns:verfahrensdaten>\
                         '+ verfahrendaten + '\
                 </tns:verfahrensdaten>\
        </tns:grunddaten>\
        '+ dokumentendaten + '</tns:nachricht.gds.'+nachrichtentype+'>\
		';

return xmldata;
	
}


function createXML() {
	if (checkDocument()) {
		var blob = new Blob([getXML()], { type: "application/xml" })
		absenderLokalSpeichern();
		saveAs(blob, "xjustiz_nachricht.xml");
	}
}



function replaceCharacters (input) {
	if (input!=null) {
	output = input.replaceAll('&', '&amp;');
	output = output.replaceAll('<', '&lt;');
	output = output.replaceAll('>', '&gt;');
	output = output.replaceAll('"', '&quot;');
	output = output.replaceAll("'", '&apos;');
	return output
	} else {return null};
	
	
}


function checkDocument() {

	
	count = 0;	
  for (key in arr_selected_attachments) {
			if (arr_selected_attachments[key].dateien.length==0) {
					console.log("Dokumente ohne Attachment gefunden");
					$('#missingfile').modal('show');
				return false;
			}
			count++;
  }	
  
 console.log("count : "+count);
 
 if (count==0) {
	 	$('#basisnachricht').modal('show');
 }
 
  
  return true;
}
