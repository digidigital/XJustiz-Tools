var arr_selected_sachgebiete = [];
var arr_selected_attachments = [];
var arr_selected_kanzlei = [];
var arr_selected_personen = [];
var arr_selected_gegenstand = [];
var arr_selected_orgas = [];
var selected_attachment=0;
var userdirfachdatenimport;
var empfaengertype = 7;

function initFields() {
//  $("#person_titel").typeahead({ source: ["Dr.", "Prof.", "Dr. Prof."] });

	initGerichtsliste();
    initPolizeiliste();


   var arr_rechtsform_liste = JSON.parse(arr_rechtsform);
   $("#select_rechtsform").append("<option value=''></option>");
   arr_rechtsform_liste.forEach(function (obj) {
	   words = obj.toString().split(',');
    $("#select_rechtsform").append("<option value='" + words[0] + "'>" + words[4] + "</option>");
    });
	
   var arr_doktyp_liste = JSON.parse(arr_doktyp);
   arr_doktyp_liste.forEach(function (obj) {
	   words = obj.toString().split(',');
    $("#dokumententyp_select_modal").append("<option value='" + words[0] + "'>" + words[1] + "</option>");
    });


   var arr_sendungsprioritaet_liste = JSON.parse(arr_sendungsprioritaet);
   $("#sendungsprioritaet_select_modal").append("<option value=''></option>");
   arr_sendungsprioritaet_liste.forEach(function (obj) {
	   words = obj.toString().split(',');
    $("#sendungsprioritaet_select_modal").append("<option value='" + words[0] + "'>" + words[1] + "</option>");
    });

//  rollen_data.forEach(function (obj) {
//    $("#select_role_ra").append("<option value='" + obj["-value"] + "'>" + obj["xs:annotation"]["xs:appinfo"]["codeName"] + "</option>");
//    $("#select_role_person").append("<option value='" + obj["-value"] + "'>" + obj["xs:annotation"]["xs:appinfo"]["codeName"] + "</option>");
//    $("#select_role_orga").append("<option value='" + obj["-value"] + "'>" + obj["xs:annotation"]["xs:appinfo"]["codeName"] + "</option>");
//  });



   var arr_rollenbezeichnungen_liste = JSON.parse(arr_rollenbezeichnungen);
   $("#select_role_person").append("<option value=''></option>");
   $("#select_role_ra").append("<option value=''></option>");
   $("#select_role_orga").append("<option value=''></option>");
   arr_rollenbezeichnungen_liste.forEach(function (obj) {
	   words = obj.toString().split(',');
    $("#select_role_person").append("<option value='" + words[0] + "'>" + words[1] + "</option>");
	 $("#select_role_ra").append("<option value='" + words[0] + "'>" + words[1] + "</option>");
	  $("#select_role_orga").append("<option value='" + words[0] + "'>" + words[1] + "</option>");
    });





  arr_sache.sort(compareListItemByCodeName).forEach(function (obj) {
    $("#sachgebiete_select_modal").append("<option value='" + obj["-value"] + "'>" + obj["xs:annotation"]["xs:appinfo"]["codeName"] + "</option>");
  });

initBestandteile();

  
  arr_kanzleiform.forEach(function (obj) {
    $("#select_kanzleiform").append("<option value='" + obj.key + "'>" + obj.val + "</option>");
  });

  arr_empfaenger.forEach(function (obj) {
    $("#select_empfaengert").append("<option value='" + obj.key + "'>" + obj.val + "</option>");
  });



  if (window.localStorage  && window.localStorage.AbsenderName) {
	  userdirfachdatenimport = window.localStorage.userdirfachdatenimport;
	  document.getElementById('useridPath').value=userdirfachdatenimport;
  }


}

function initBestandteile() {

$("#bestandteil_select_modal")
    .empty();
 //   .append('<option selected="selected" value="whatever">text</option>');

  arr_bestandteiltyp.forEach(function (obj) {
    $("#bestandteil_select_modal").append("<option value='" + obj.key + "'>" + obj.val + "</option>");
  });
	
	
}



function initGerichtsliste() {
 var gerichtsliste = JSON.parse(gerichteData);
   gerichtsliste.sort(compareListItemByCodeName2);
   gerichtsliste.forEach(function (obj) {
	   words = obj.toString().split(',');
    $(".list_instanz").append("<option value='" + words[0] + "'>" + words[1] + "</option>");
    });
}

function initPolizeiliste() {
 var polizeiliste = JSON.parse(polizeibehoerdenData);
   polizeiliste.sort(compareListItemByCodeName2);
   polizeiliste.forEach(function (obj) {
	   words = obj.toString().split(',');
    $(".list_instanz").append("<option value='" + words[0] + "'>" + words[1] + "</option>");
    });
}

function clearAttatchments() {
  $('#anzeigename').val('');
  document.getElementById('anhang_speichern').disabled = true;
  $('#fileElementId').val('');
  document.getElementById('Datei_speichern').disabled = true;
	tbl = document.getElementById('my-table-id22');
	while(tbl.rows.length>3)
  {
    tbl.deleteRow(tbl.rows.length-1);
  }

}

function clearDateien() {
  $('#fileElementId').val('');
  document.getElementById('Datei_speichern').disabled = true;
}




function gegenstand_speichern() {
  var uuid = guid();
  var obj = {
    gegenstand: $('#gegenstand').val(),    
  };
  arr_selected_gegenstand[uuid] = obj;
  $("#gegenstandsliste").append("<tr id='" + uuid + "'><td>" + obj.gegenstand + "</td><td><button class='btn btn-danger' onclick='gegenstand_entfernen(\"" + uuid + "\")'> - </button></td></tr>");
  gegenstandsFelderResetten();
 document.getElementById('gegenstand_speichern').disabled = true;

}

function gegenstandsFelderResetten() {
  $('#gegenstand').val("");
}

function gegenstand_entfernen(id) {
  $('tbody').find('#' + id).remove();
  delete arr_selected_gegenstand[id];
}

function ra_speichern() {
  var uuid = guid();
  var obj = {
    kanzleiname: $('#kanzleiname').val(),
    rechtsform: {
      key: $('#select_rechtsform option:selected').val(),
      text: $('#select_rechtsform').find(":selected").text()
    },
    kanzleiform: {
      key: $('#select_kanzleiform option:selected').val(),
      text: $('#select_kanzleiform').find(":selected").text()
	},
	rolle: {
      key: $('#select_role_ra option:selected').val(),
      text: $('#select_role_ra').find(":selected").text()
    }
  };
  
  arr_selected_kanzlei[uuid] = obj;
  $("#kanzleiliste").append("<tr id='" + uuid + "'><td>" + obj.kanzleiname + "</td><td>" + obj.rechtsform.text + "</td><td>" + obj.kanzleiform.text + "</td><td>" + obj.rolle.text + "</td><td><button class='btn btn-danger' onclick='ra_entfernen(\"" + uuid + "\")'> - </button></td></tr>");
  ra_FelderResetten();
  document.getElementById('ra_speichern').disabled = true;
}

function ra_FelderResetten() {
  $('#kanzleiname').val("");
}


function ra_entfernen(id) {
  $('tbody').find('#' + id).remove();
  delete arr_selected_kanzlei[id];
}


function person_speichern() {
  var uuid = guid();
  var obj = {
    titel: $('#person_titel').val(),
    vorname: $('#person_vorname').val(),
    nachname: $('#person_nachname').val(),

    namenvorsatz: $('#person_namenvorsatz').val(),
    rolle: {
      key: $('#select_role_person option:selected').val(),
      text: $('#select_role_person').find(":selected").text()
    }
  };
  arr_selected_personen[uuid] = obj;
  $("#personliste").append("<tr id='" + uuid + "'><td>" + obj.titel + "</td><td>" + obj.namenvorsatz + "</td><td>" + obj.vorname + "</td><td>" + obj.nachname + "</td><td>" + obj.rolle.text + "</td><td><button class='btn btn-danger' onclick='person_entfernen(\"" + uuid + "\")'> - </button></td></tr>");
  personenFelderResetten();

}

function personenFelderResetten() {
  $('#person_titel').val("");
  $('#person_vorname').val("");
  $('#person_nachname').val("");
  $('#person_namenvorsatz').val("");
  enable_person_speichern();
}


function person_entfernen(id) {
  $('tbody').find('#' + id).remove();
  delete arr_selected_personen[id];
}


function orga_speichern() {
  var uuid = guid();
  var obj = {
    bez: $('#orga_bez').val(),
    rolle: {
      key: $('#select_role_orga option:selected').val(),
      text: $('#select_role_orga').find(":selected").text()
    }
  };
  arr_selected_orgas[uuid] = obj;
  $("#orgaliste").append("<tr id='" + uuid + "'><td>" + obj.bez + "</td><td>" + obj.rolle.text + "</td><td><button class='btn btn-danger' onclick='orga_entfernen(\"" + uuid + "\")'> - </button></td></tr>");
  orgaFelderResetten();
}

function orgaFelderResetten() {
  $('#orga_bez').val("");
  enable_orga_speichern();
}

function orga_entfernen(id) {
  $('tbody').find('#' + id).remove();
  delete arr_selected_orgas[id];
}


function anhang_speichern() {
  var uuid = guid();
  arr_selected_attachments[uuid] = {
    dokTyp: {
      key: $('#dokumententyp_select_modal option:selected').val(),
      text: $('#dokumententyp_select_modal').find(":selected").text()
    },
    anzeigename:  $('#anzeigename').val(),
	dateien: []
  };

  $("#anhangliste").append("<tr onclick=\"UpdateDateiTabelle('"+uuid+"')\" id='" + uuid + "'><td>" +arr_selected_attachments[uuid].anzeigename+ "</td><td>" +arr_selected_attachments[uuid].dokTyp.text+ "</td><td><button class='btn btn-danger' onclick='anhang_entfernen(\"" + uuid + "\")'>-</button></td></tr>");
  UpdateDateiTabelle(uuid);
  
  clearAttatchments();
}

function Datei_speichern(dokumentuuid) {
  var uuid = guid();
  var file = $('#fileElementId').get(0).files[0];
  datei = {
    bestandteil: {
      key: $('#bestandteil_select_modal option:selected').val(),
      text: $('#bestandteil_select_modal').find(":selected").text()
    },
    filename: file.name,
	filepath: file.path
  };
  
  arr_selected_attachments[selected_attachment].dateien.push(datei);
  UpdateDateiTabelle(selected_attachment);

clearDateien();
}

function UpdateDateiTabelle(uuid) {
	
	if (arr_selected_attachments[uuid] === undefined) {
		  document.getElementById('ggggg').innerHTML="Liste der Dateien zum ausgewähltem Dokument: Kein Dokument ausgewählt";
         document.getElementById('Datei_speichern').disabled=true;
		 document.getElementById('fileElementId').disabled=true;
		 
		 	while(tbl.rows.length>3)
				{
						tbl.deleteRow(tbl.rows.length-1);
					}
		 
	} 
	else 
		{
	

if (document.getElementById(selected_attachment)!=null) {
	document.getElementById(selected_attachment).bgColor='';
}

	selected_attachment = uuid;
	document.getElementById('ggggg').innerHTML="Dateien zum Dokument: "+arr_selected_attachments[uuid].anzeigename ;
	document.getElementById('fileElementId').disabled=false;
	
	
	//document.getElementById('anhangliste').bgColor='#000087'
	
	//document.getElementById(uuid).bgColor='#AB82FF';
	document.getElementById(uuid).bgColor='#3590ae';

	
	//document.getElementById(uuid).style="color: yellow;";
	
	
//	document.getElementById(uuid).innerHTML="L";
	
	// Jetzt muss die Tabelle komplett neu aufgebaut werden.
	tbl = document.getElementById('my-table-id22');
	while(tbl.rows.length>3)
  {
    tbl.deleteRow(tbl.rows.length-1);
  }

     // Jetzt neue Tabelle malen 
	dateien = arr_selected_attachments[uuid].dateien;
	found_bestandteil_001 = false;
		for (let i=0; i< dateien.length;i++) {
		var new_uuid = guid();
		$("#dateiliste").append("<tr id='" +new_uuid  + "'><td>" +dateien[i].filename+ "</td><td>" +dateien[i].bestandteil.text+ "</td><td><button class='btn btn-danger' onclick='datei_entfernen(\"" + i + "\")'>-</button></td></tr>");
		if (dateien[i].bestandteil.text=="Original") { 
			$("#bestandteil_select_modal").children("option[value='001']").remove();
			found_bestandteil_001 = true;
		}
		
		
		}
		
		if (!found_bestandteil_001) {
			initBestandteile();
		}
	
	}
}

function anhang_entfernen(id) {
  $('tbody').find('#' + id).remove();
  delete arr_selected_attachments[id];
}

function datei_entfernen(id) {
  arr_selected_attachments[selected_attachment].dateien.splice(id,1);
  UpdateDateiTabelle(selected_attachment); 
}


//Damit Instanzbehörde und Sachgebiet sortiert ausgegeben wird (siehe initFields)
function compareListItemByCodeName(a, b) {

  var nameA = a["xs:annotation"]["xs:appinfo"]["codeName"].toUpperCase(); // ignore upper and lowercase
  var nameB = b["xs:annotation"]["xs:appinfo"]["codeName"].toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}

function compareListItemByCodeName2(a, b) {
	
	const nameA = a.toString().split(",");
	const nameB = b.toString().split(",");

  if (nameA[1] < nameB[1]) {
    return -1;
  }
  if (nameA[1] > nameB[1]) {
    return 1;
  }

  // names must be equal
  return 0;
}

function pickUserIDPath() {
var file = $('#useridDir').get(0).files[0];
userdirfachdatenimport = file.path.replace(file.name,"");
document.getElementById('useridPath').value=userdirfachdatenimport;
  if (window.localStorage) {
    var absender = $('#absender_bez').val();
    window.localStorage.userdirfachdatenimport = userdirfachdatenimport;
  }

	
}



// Bei "Alle Eingaben zuruecksetzen
function alleFelderReseten() {
  $("option:selected").prop("selected", false) //Alle Auswahl zurück auf Anfang
  arr_selected_sachgebiete = [];
  for (key in arr_selected_gegenstand) {
    gegenstand_entfernen(key);
  }
  arr_selected_gegenstand = [];
  
  for (key in arr_selected_kanzlei) {
    ra_entfernen(key);
  }
  arr_selected_kanzlei = [];
  
  
  for (key in arr_selected_personen) {
    person_entfernen(key);
  }
  arr_selected_personen = [];

  for (key in arr_selected_orgas) {
    orga_entfernen(key);
  }
  arr_selected_orgas = [];

  for (key in arr_selected_attachments) {
    anhang_entfernen(key);
  }
  arr_selected_attachments = [];
  clearAttatchments();
  document.getElementById('ggggg').innerHTML="Dateien zum Dokument: Kein Dokument ausgewählt";  
  orgaFelderResetten();
  personenFelderResetten();
  $('#akt_des_empf').val("");
  $('#akt_des_abs').val("");
  absenderLokalLaden();


}


// Nach dem Erzeugen der XML das Feld Absender speichern
function absenderLokalSpeichern() {
  if (window.localStorage) {
    var absender = $('#absender_bez').val();
    window.localStorage.AbsenderName = absender;
  }
}


// Absenderfeld vorbelegen
function absenderLokalLaden() {
  if (window.localStorage  && window.localStorage.AbsenderName) {
    $('#absender_bez').val(window.localStorage.AbsenderName);
	enable_createXML();
  }
  
}



//generate UUID
function guid() {

  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


function checkAnzeigename() {
	document.getElementById('anhang_speichern').disabled = (document.getElementById("anzeigename").value==="");
}

function enable_gegenstand_speichern() {
	document.getElementById('gegenstand_speichern').disabled = (document.getElementById("gegenstand").value==="");
}

function enable_ra_speichern() {
	document.getElementById('ra_speichern').disabled = (document.getElementById("kanzleiname").value==="");
}

function enable_person_speichern() {
	document.getElementById('person_speichern').disabled = (document.getElementById("person_nachname").value==="");
}

function enable_orga_speichern() {
	document.getElementById('orga_speichern').disabled = (document.getElementById("orga_bez").value==="");
}

function enable_createXML() {
	aktiv = (document.getElementById("absender_bez").value!="") && (document.getElementById("akt_des_empf").value!="")
	if (document.getElementById('empfaenger_sonst')!=null && aktiv  ) {
		document.getElementById('createXML').disabled = (document.getElementById("empfaenger_sonst").value==="");
	} else {
		document.getElementById('createXML').disabled = !aktiv;
	}
}



function checkEmpfaengertyp(myRadio) {
if (myRadio.value=="1" && empfaengertype!="10") {
		empfaengertype="10";
	  document.getElementById('sendungsprioritaet_select_modal').disabled=false;
	  
	  $('#empfaenger_sonst').remove();
	  $('#empfaenger_bez_polizei').remove();
	  
	  $("#empfaenger").append("<div class='col'><select id='empfaenger_bez' class='list_instanz' style='width: 350px'></select></div>");
		initGerichtsliste();
	
} else if (myRadio.value=="2" && empfaengertype!="20") {
	empfaengertype="20";
	document.getElementById('sendungsprioritaet_select_modal').value="";
	  document.getElementById('sendungsprioritaet_select_modal').disabled=true;
	  	  
	  $('#empfaenger_sonst').remove();
	  $('#empfaenger_bez').remove();
	  $("#empfaenger").append("<div class='col'><select id='empfaenger_bez_polizei' class='list_instanz' style='width: 350px'></select></div>");
	  initPolizeiliste();
	
} else if (myRadio.value=="3" && empfaengertype!="30") {
	empfaengertype="30";
	document.getElementById('sendungsprioritaet_select_modal').value="";
	  document.getElementById('sendungsprioritaet_select_modal').disabled=true;
	  
	  
	  $('#empfaenger_bez').remove();
	  $('#empfaenger_bez_polizei').remove();
	  $("#empfaenger").append("<div class='col'><input id='empfaenger_sonst' style='width: 350px' type='text' onkeyup='enable_createXML()'></input></div>");
	
}

enable_createXML();

}


function checkDateiAuswahl() {
	if(document.getElementById("fileElementId")!="") { 
		var file = $('#fileElementId').get(0).files[0];
		var re = /[^a-zA-Z0-9_.ÄäÜüÖöß-]/
	
		var countPoints = (file.name.match(/\./g) || []).length;
		
		
	foundduplicatefile = false;
//	  for (key in arr_selected_attachments) {
//		for (dateikey in arr_selected_attachments[key].dateien) {
//				if (arr_selected_attachments[key].dateien[dateikey].filename == file.name) {
//						$('#duplicateFilename').modal('show');
//						document.getElementById("fileElementId").value = "";
//						break;
//				}
//		  if (foundduplicatefile) break;	
//		}
//	}
	
	// Test auf Zeichen, Länge, geschützte Namen
	if (!foundduplicatefile && re.test(file.name) || countPoints>2 || file.name.length>90 || file.name=="vhn.xml" || file.name=="vhn.xml.p7s") {
	document.getElementById("fileElementId").value = "";
	$('#invalidFilename').modal('show');

	} else {
		document.getElementById('Datei_speichern').disabled=false;
	}
	
	}
}


function TestNode() {
console.log ("Starte TestNode");	
const fs = require('fs');
let dest = userdirfachdatenimport+guid()+"/";
let dest_attachments = dest+"attachments/";
fs.mkdir(dest,function(e){console.log(e);});
fs.mkdir(dest_attachments,function(e){console.log(e);});

  //verfahrendaten+=herstellerinformation;
  for (key in arr_selected_attachments) {
	for (dateikey in arr_selected_attachments[key].dateien) {
	filename = arr_selected_attachments[key].dateien[dateikey].filename;
	filepath = arr_selected_attachments[key].dateien[dateikey].filepath;

	fs.copyFile(filepath, dest_attachments+filename, (err) => {
	if (err) throw err;
	console.log('source.txt was copied to destination.txt');
});


  }}

var empfaenger = $('#empfaenger_bez option:selected').val();
const govello = "typ=Allgemeine Nachricht\nid="+empfaenger+"\nkey=ROLE\nsigniveau=o";

try {
  const data = fs.writeFileSync(dest+"govello.txt", govello)
  //file written successfully
} catch (err) {
  console.error(err)
}

// Und jetzt noch die XJustiz Datei 
try {
  const data = fs.writeFileSync(dest_attachments+"xjustiz_nachricht.xml", getXML())
  //file written successfully
} catch (err) {
  console.error(err)
}
	
}



//on Ready
$(function () {
  initFields();
  absenderLokalLaden();
  $("#anhang_speichern").click(anhang_speichern);
  $("#Datei_speichern").click(Datei_speichern);
  $("#gegenstand_speichern").click(gegenstand_speichern);
  $("#ra_speichern").click(ra_speichern);
  $("#person_speichern").click(person_speichern);
  $("#orga_speichern").click(orga_speichern);
  
  try {
  const fs = require('fs');
   document.getElementById("my-table-id3").style.display = 'inline'; 
   console.log("start in electron");
  } catch (e) {
   console.log("start in Browser");
  }
  
});