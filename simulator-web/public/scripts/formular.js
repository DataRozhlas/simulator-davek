
function vyplnSlozeniDomacnosti() {

	var text = '<div class="mw-text w-100">';
	text += '<p class="weight-strong uppercase col-12 mb-0 font-24 pb-3 pl-2"> Složení domácnosti</p>';
	text += '<div class="ml-3">';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Počet dospělých</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="3" id="pocetDospelych" onchange="prepisFormular(\'slozeniDomacnosti\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Počet dětí do 7 let</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="5" id="pocetDetiPod6" onchange="prepisFormular(\'slozeniDomacnosti\', \'1\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Počet dětí od 7 do 15 let</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="5" id="pocetDeti6Az15" onchange="prepisFormular(\'slozeniDomacnosti\', \'2\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Počet nezaopatřených dětí od 16 do 26 let</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="5" id="pocetDeti15Az26" onchange="prepisFormular(\'slozeniDomacnosti\', \'3\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Počet osob bez trvalého bydliště</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="18" id="trvaleBydlisteJinde" onchange="prepisFormular(\'slozeniDomacnosti\', \'5\', this.value)"></div>';
	text += '</div>';
// EDITED START
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Počet osob se sníženým životním minimem</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="3" id="snizeneZivotniMinimum" onchange="prepisFormular(\'socialOptional\', \'0\', this.value)"></div>';
	text += '</div>';
// EDITED END

	document.getElementById("mainwindow").innerHTML = text;

	document.getElementById("pocetDospelych").value = slozeniDomacnosti[0];
	document.getElementById("pocetDetiPod6").value = slozeniDomacnosti[1];
	document.getElementById("pocetDeti6Az15").value = slozeniDomacnosti[2];
	document.getElementById("pocetDeti15Az26").value = slozeniDomacnosti[3];
	document.getElementById("trvaleBydlisteJinde").value = slozeniDomacnosti[5];
	document.getElementById("snizeneZivotniMinimum").value = socialOptional[0];

}



function vyplnPrijmyPrvnihoDospeleho() {

	var text = '<div class="mw-text w-100">';

	text += '<p class="weight-strong uppercase col-12 mb-0 font-24 pb-2 pl-2"> Příjmy</p>';
	text += '<div id="mw-text-1">';
	text += '<h2 class="uppercase weight-strong font-20 py-0 pl-2">1. DOSPĚLÝ</h2>';
	text += '<div class="ml-4">';

//EDITED START
	text += '<div class="formrow">';
	text += '<div class="formrowradiodetail squaredTwo pl-3"><input type="checkbox" id="prvniDospelyPrvniZamestnavatelVyjimka" onclick="prepisFormular(\'prvniDospelyPrvniZamestnavatel\', \'4\', this.checked)"><label for=""></label>Student/důchodce/pečující o dítě/postižený<sup><div class="tooltip d-none">?</sup><span class="tooltip d-nonetext">NĚJAKÝ TEXT</span></div></div>';
	text += '</div>';
//EDITED END

	text += '<h3 class="font-18 weight-strong mb-0">První zaměstnavatel</h3>';

	text += '<div class="formrow d-flex mt-3 mb-2">';
	text += '<div class="formrowtext pr-2">Hrubý příjem</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="50000" step="1000" id="prvniDospelyPrvniZamestnavatelPrijem" onchange="prepisFormular(\'prvniDospelyPrvniZamestnavatel\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';

//EDITED START
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Typ smlouvy</div>';
	text += '<select class="typsmlouvyform" id="prvniDospelyPrvniZamestnavatelTypSmlouvy" onchange="prepisFormular(\'prvniDospelyPrvniZamestnavatel\', \'1\', this.value)">';
  	text += '<option value="0">HPP</option>';
  	text += '<option value="1">DPČ</option>';
  	text += '<option value="2">DPP</option>';
	text += '</select>';
	text += '</div>';
//EDITED END

	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowradiomain squaredTwo pl-3"><input type="checkbox" id="prvniDospelyPrvniZamestnavatelRuzovyPapir" onclick="prepisFormular(\'prvniDospelyPrvniZamestnavatel\', \'2\', this.checked)"><label for=""></label>Prohlášení k dani <sup><div class="tooltip d-none">?</sup><span class="tooltip d-nonetext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus d-flex mb-2 d-flex mb-2 bonus" id="prvniDospelyPrvniZamestnavatelVyzivovaneDetiForm" style="visibility: hidden;">';
	text += '<div class="formrowtext pr-2">Počet dětí k daňovému zvýhodnění</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10" id="prvniDospelyPrvniZamestnavatelVyzivovaneDeti" onchange="prepisFormular(\'prvniDospelyPrvniZamestnavatel\', \'3\', this.value)"></div>';
	text += '</div>';
	text += '<div id="mw-text-2">';
	text += '<div><button class="mw-button" type="button" onclick="pridejZamestnavatelePrvnihoDospeleho()"><span>+</span> další zaměstnavatel</button></div>';
	text += '</div>';
	text += '<div id="mw-text-3">';
	text += '<div><button class="mw-button" type="button" onclick="pridejDalsiPrijmyPrvnihoDospeleho()"><span>+</span> jiné příjmy</button></div>';
	text += '</div>';
	text += '</div>';
	text += '<div id="mw-text-4">';
	text += '<div><button class="mw-button2" type="button" onclick="vyplnPrijmyDruhehoDospeleho()"><span>+</span> Přidat dalšího dospělého</button></div>';
	text += '</div>';
	text += '</div>';

	document.getElementById("mainwindow").innerHTML = text;
	label();

	// vyplnění z globálních proměnných
	document.getElementById("prvniDospelyPrvniZamestnavatelPrijem").value = prvniDospelyPrvniZamestnavatel[0];
	document.getElementById("prvniDospelyPrvniZamestnavatelTypSmlouvy").value = prvniDospelyPrvniZamestnavatel[1];
	document.getElementById("prvniDospelyPrvniZamestnavatelRuzovyPapir").checked = prvniDospelyPrvniZamestnavatel[2];
	document.getElementById("prvniDospelyPrvniZamestnavatelVyzivovaneDeti").value = prvniDospelyPrvniZamestnavatel[3];
	document.getElementById("prvniDospelyPrvniZamestnavatelVyjimka").checked = prvniDospelyPrvniZamestnavatel[4];

	// první nastavení formuláře pro počet dětí u prohlášení k dani
	var prvniDospelyPrvniZamestnavatelDaneCheckStart = prvniDospelyPrvniZamestnavatel[2];
	if(prvniDospelyPrvniZamestnavatelDaneCheckStart) {
		document.getElementById("prvniDospelyPrvniZamestnavatelVyzivovaneDeti").value = prvniDospelyPrvniZamestnavatel[3];
		document.getElementById("prvniDospelyPrvniZamestnavatelVyzivovaneDetiForm").style.visibility = "visible";
	} else {
		document.getElementById("prvniDospelyPrvniZamestnavatelVyzivovaneDetiForm").style.visibility = "hidden";
	}

	// zapnutí/vypnutí formuláře pro počet dětí u prohlášení k dani
	var prvniDospelyPrvniZamestnavatelDaneCheck = document.getElementById("prvniDospelyPrvniZamestnavatelRuzovyPapir");
	prvniDospelyPrvniZamestnavatelDaneCheck.onchange = function() {

		if(document.getElementById("prvniDospelyPrvniZamestnavatelVyzivovaneDetiForm").style.visibility == "visible") {
			document.getElementById("prvniDospelyPrvniZamestnavatelVyzivovaneDetiForm").style.visibility = "hidden";
		} else {
			document.getElementById("prvniDospelyPrvniZamestnavatelVyzivovaneDetiForm").style.visibility = "visible";
			document.getElementById("prvniDospelyPrvniZamestnavatelVyzivovaneDeti").value = prvniDospelyPrvniZamestnavatel[3];
		}

		// vynulování počtu dětí u prohlášení k dani jinde a přepnutí tlačítka u dalšího zaměstnavatele stejného dospělého
		document.getElementById("prvniDospelyDruhyZamestnavatelRuzovyPapir").checked = false;
		document.getElementById("prvniDospelyDruhyZamestnavatelVyzivovaneDetiForm").style.visibility = "hidden";
		prvniDospelyDruhyZamestnavatel[2] = false;
		prvniDospelyDruhyZamestnavatel[3] = 0;
		druhyDospelyPrvniZamestnavatel[3] = 0;
		druhyDospelyDruhyZamestnavatel[3] = 0;
		tretiDospelyPrvniZamestnavatel[3] = 0;
		tretiDospelyDruhyZamestnavatel[3] = 0;

	};

	function label(){
	$( "label" ).each(function(e) {
    var check_id = $( this ).closest( "div" ).find("input").prop('id');
    $(this).attr('for', check_id);

  	});

	};

}



function pridejZamestnavatelePrvnihoDospeleho() {

	var text = '<h3 class="font-18 weight-strong mb-0">Druhý zaměstnavatel</h3>';

	text += '<div class="formrow d-flex mt-3 mb-2">';
	text += '<div class="formrowtext pr-2">Hrubý příjem</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="50000" step="1000" id="prvniDospelyDruhyZamestnavatelPrijem" onchange="prepisFormular(\'prvniDospelyDruhyZamestnavatel\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';

//EDITED START
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Typ smlouvy</div>';
	text += '<select class="typsmlouvyform" id="prvniDospelyDruhyZamestnavatelTypSmlouvy" onchange="prepisFormular(\'prvniDospelyDruhyZamestnavatel\', \'1\', this.value)">';
  	text += '<option value="0">HPP</option>';
  	text += '<option value="1">DPČ</option>';
  	text += '<option value="2">DPP</option>';
	text += '</select>';
	text += '</div>';
//EDITED END

	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowradiomain squaredTwo pl-3"><input type="checkbox" id="prvniDospelyDruhyZamestnavatelRuzovyPapir" onclick="prepisFormular(\'prvniDospelyDruhyZamestnavatel\', \'2\', this.checked)"><label for=""></label>Prohlášení k dani <sup><div class="tooltip d-none">?</sup><span class="tooltip d-nonetext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus d-flex mb-2 d-flex mb-2 bonus" id="prvniDospelyDruhyZamestnavatelVyzivovaneDetiForm" style="visibility: hidden;">';
	text += '<div class="formrowtext pr-2">Počet dětí k daňovému zvýhodnění</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10" id="prvniDospelyDruhyZamestnavatelVyzivovaneDeti" onchange="prepisFormular(\'prvniDospelyPrvniZamestnavatel\', \'3\', this.value)"></div>';
	text += '</div>';

	document.getElementById("mw-text-2").innerHTML = text;
	label();

	// vyplnění z globálních proměnných
	document.getElementById("prvniDospelyDruhyZamestnavatelPrijem").value = prvniDospelyDruhyZamestnavatel[0];
	document.getElementById("prvniDospelyDruhyZamestnavatelTypSmlouvy").value = prvniDospelyDruhyZamestnavatel[1];
	document.getElementById("prvniDospelyDruhyZamestnavatelRuzovyPapir").checked = prvniDospelyDruhyZamestnavatel[2];
	document.getElementById("prvniDospelyDruhyZamestnavatelVyzivovaneDeti").value = prvniDospelyDruhyZamestnavatel[3];
	document.getElementById("prvniDospelyDruhyZamestnavatelVyjimka").checked = prvniDospelyDruhyZamestnavatel[4];

	// první nastavení formuláře pro počet dětí u prohlášení k dani
	var prvniDospelyDruhyZamestnavatelDaneCheckStart = prvniDospelyDruhyZamestnavatel[2];
	if(prvniDospelyDruhyZamestnavatelDaneCheckStart) {
		document.getElementById("prvniDospelyDruhyZamestnavatelVyzivovaneDeti").value = prvniDospelyDruhyZamestnavatel[3];
		document.getElementById("prvniDospelyDruhyZamestnavatelVyzivovaneDetiForm").style.visibility = "visible";
	} else {
		document.getElementById("prvniDospelyDruhyZamestnavatelVyzivovaneDetiForm").style.visibility = "hidden";
	}

	// zapnutí/vypnutí formuláře pro počet dětí u prohlášení k dani
	var prvniDospelyDruhyZamestnavatelDaneCheck = document.getElementById("prvniDospelyDruhyZamestnavatelRuzovyPapir");
	prvniDospelyDruhyZamestnavatelDaneCheck.onchange = function() {

		if(document.getElementById("prvniDospelyDruhyZamestnavatelVyzivovaneDetiForm").style.visibility == "visible") {
			document.getElementById("prvniDospelyDruhyZamestnavatelVyzivovaneDetiForm").style.visibility = "hidden";
		} else {
			document.getElementById("prvniDospelyDruhyZamestnavatelVyzivovaneDetiForm").style.visibility = "visible";
			document.getElementById("prvniDospelyDruhyZamestnavatelVyzivovaneDeti").value = prvniDospelyDruhyZamestnavatel[3];
		}

		// vynulování počtu dětí u prohlášení k dani jinde a přepnutí tlačítka u dalšího zaměstnavatele stejného dospělého
		document.getElementById("prvniDospelyPrvniZamestnavatelRuzovyPapir").checked = false;
		document.getElementById("prvniDospelyPrvniZamestnavatelVyzivovaneDetiForm").style.visibility = "hidden";
		prvniDospelyPrvniZamestnavatel[2] = false;
		prvniDospelyPrvniZamestnavatel[3] = 0;
		druhyDospelyPrvniZamestnavatel[3] = 0;
		druhyDospelyDruhyZamestnavatel[3] = 0;
		tretiDospelyPrvniZamestnavatel[3] = 0;
		tretiDospelyDruhyZamestnavatel[3] = 0;

	};

		function label(){
	$( "label" ).each(function(e) {
    var check_id = $( this ).closest( "div" ).find("input").prop('id');
    $(this).attr('for', check_id);

  	});

	};

}



function pridejDalsiPrijmyPrvnihoDospeleho() {

	var text = '<h3 class="font-18 weight-strong">Jiné příjmy</h3>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Důchod</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="20000" step="1000" id="prvniDospelyDuchody" onchange="prepisFormular(\'prvniDospelyDalsiPrijmy\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Rodičovská / Mateřská</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="20000" step="1000" id="prvniDospelyRodicovska" onchange="prepisFormular(\'prvniDospelyDalsiPrijmy\', \'1\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Podpora v nezaměstnanosti</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="20000" step="1000" id="prvniDospelyPodporaVNezamestnanosti" onchange="prepisFormular(\'prvniDospelyDalsiPrijmy\', \'2\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Nemocenská</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10000" step="1000" id="prvniDospelyNemocenska" onchange="prepisFormular(\'prvniDospelyDalsiPrijmy\', \'3\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Ostatní</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10000" step="1000" id="prvniDospelyOstatniPrijmy" onchange="prepisFormular(\'prvniDospelyDalsiPrijmy\', \'4\', this.value)"></div>';
	text += '</div>';

	document.getElementById("mw-text-3").innerHTML = text;

	// vyplnění z globálních proměnných
	document.getElementById("prvniDospelyDuchody").value = prvniDospelyDalsiPrijmy[0];
	document.getElementById("prvniDospelyRodicovska").value = prvniDospelyDalsiPrijmy[1];
	document.getElementById("prvniDospelyPodporaVNezamestnanosti").value = prvniDospelyDalsiPrijmy[2];
	document.getElementById("prvniDospelyNemocenska").value = prvniDospelyDalsiPrijmy[3];
	document.getElementById("prvniDospelyOstatniPrijmy").value = prvniDospelyDalsiPrijmy[4];

}



function vyplnPrijmyDruhehoDospeleho() {

	var text = '<h2 class="uppercase weight-strong font-20 py-0 pl-2 mt-4">2. DOSPĚLÝ</h2>';
	text += '<div class="ml-4">';

//EDITED START
	text += '<div class="formrow">';
	text += '<div class="formrowradiodetail squaredTwo pl-3"><input type="checkbox" id="druhyDospelyPrvniZamestnavatelVyjimka" onclick="prepisFormular(\'druhyDospelyPrvniZamestnavatel\', \'4\', this.checked)"><label for=""></label>Student/důchodce/pečující o dítě/postižený<sup><div class="tooltip d-none">?</sup><span class="tooltip d-nonetext">NĚJAKÝ TEXT</span></div></div>';
	text += '</div>';
//EDITED END

	text += '<h3 class="font-18 weight-strong mb-0">První zaměstnavatel</h3>';

	text += '<div class="formrow d-flex mt-3 mb-2">';
	text += '<div class="formrowtext pr-2">Hrubý příjem</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="50000" step="1000" id="druhyDospelyPrvniZamestnavatelPrijem" onchange="prepisFormular(\'druhyDospelyPrvniZamestnavatel\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';

//EDITED START
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Typ smlouvy</div>';
	text += '<select class="typsmlouvyform" id="druhyDospelyPrvniZamestnavatelTypSmlouvy" onchange="prepisFormular(\'druhyDospelyPrvniZamestnavatel\', \'1\', this.value)">';
  	text += '<option value="0">HPP</option>';
  	text += '<option value="1">DPČ</option>';
  	text += '<option value="2">DPP</option>';
	text += '</select>';
	text += '</div>';
//EDITED END

	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowradiomain squaredTwo pl-3"><input type="checkbox" id="druhyDospelyPrvniZamestnavatelRuzovyPapir" onclick="prepisFormular(\'druhyDospelyPrvniZamestnavatel\', \'2\', this.checked)"><label for=""></label>Prohlášení k dani <sup><div class="tooltip d-none">?</sup><span class="tooltip d-nonetext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus d-flex mb-2 d-flex mb-2 bonus" id="druhyDospelyPrvniZamestnavatelVyzivovaneDetiForm" style="visibility: hidden;">';
	text += '<div class="formrowtext pr-2">Počet dětí k daňovému zvýhodnění</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10" id="druhyDospelyPrvniZamestnavatelVyzivovaneDeti" onchange="prepisFormular(\'druhyDospelyPrvniZamestnavatel\', \'3\', this.value)"></div>';
	text += '</div>';
	text += '<div id="mw-text-5">';
	text += '<div><button class="mw-button" type="button" onclick="pridejZamestnavateleDruhehoDospeleho()"><span>+</span> další zaměstnavatel</button></div>';
	text += '</div>';
	text += '<div id="mw-text-6">';
	text += '<div><button class="mw-button" type="button" onclick="pridejDalsiPrijmyDruhehoDospeleho()"><span>+</span> jiné příjmy</button></div>';
	text += '</div>';
	text += '</div>';
	text += '<div id="mw-text-7">';
	text += '<div><button class="mw-button2" type="button" onclick="vyplnPrijmyTretihoDospeleho()"><span>+</span> Přidat dalšího dospělého</button></div>';
	text += '</div>';
	text += '</div>';

	document.getElementById("mw-text-4").innerHTML = text;
	label();

	// vyplnění z globálních proměnných
	document.getElementById("druhyDospelyPrvniZamestnavatelPrijem").value = druhyDospelyPrvniZamestnavatel[0];
	document.getElementById("druhyDospelyPrvniZamestnavatelTypSmlouvy").value = druhyDospelyPrvniZamestnavatel[1];
	document.getElementById("druhyDospelyPrvniZamestnavatelRuzovyPapir").checked = druhyDospelyPrvniZamestnavatel[2];
	document.getElementById("druhyDospelyPrvniZamestnavatelVyzivovaneDeti").value = druhyDospelyPrvniZamestnavatel[3];
	document.getElementById("druhyDospelyPrvniZamestnavatelVyjimka").checked = druhyDospelyPrvniZamestnavatel[4];

	// první nastavení formuláře pro počet dětí u prohlášení k dani
	var druhyDospelyPrvniZamestnavatelDaneCheckStart = druhyDospelyPrvniZamestnavatel[2];
	if(druhyDospelyPrvniZamestnavatelDaneCheckStart) {
		document.getElementById("druhyDospelyPrvniZamestnavatelVyzivovaneDeti").value = druhyDospelyPrvniZamestnavatel[3];
		document.getElementById("druhyDospelyPrvniZamestnavatelVyzivovaneDetiForm").style.visibility = "visible";
	} else {
		document.getElementById("druhyDospelyPrvniZamestnavatelVyzivovaneDetiForm").style.visibility = "hidden";
	}

	// zapnutí/vypnutí formuláře pro počet dětí u prohlášení k dani
	var druhyDospelyPrvniZamestnavatelDaneCheck = document.getElementById("druhyDospelyPrvniZamestnavatelRuzovyPapir");
	druhyDospelyPrvniZamestnavatelDaneCheck.onchange = function() {

		if(document.getElementById("druhyDospelyPrvniZamestnavatelVyzivovaneDetiForm").style.visibility == "visible") {
			document.getElementById("druhyDospelyPrvniZamestnavatelVyzivovaneDetiForm").style.visibility = "hidden";
		} else {
			document.getElementById("druhyDospelyPrvniZamestnavatelVyzivovaneDetiForm").style.visibility = "visible";
			document.getElementById("druhyDospelyPrvniZamestnavatelVyzivovaneDeti").value = druhyDospelyPrvniZamestnavatel[3];
		}

		// vynulování počtu dětí u prohlášení k dani jinde a přepnutí tlačítka u dalšího zaměstnavatele stejného dospělého
		document.getElementById("druhyiDospelyDruhyZamestnavatelRuzovyPapir").checked = false;
		document.getElementById("druhyDospelyDruhyZamestnavatelVyzivovaneDetiForm").style.visibility = "hidden";
		druhyDospelyDruhyZamestnavatel[2] = false;
		prvniDospelyPrvniZamestnavatel[3] = 0;
		prvniDospelyDruhyZamestnavatel[3] = 0;
		druhyDospelyDruhyZamestnavatel[3] = 0;
		tretiDospelyPrvniZamestnavatel[3] = 0;
		tretiDospelyDruhyZamestnavatel[3] = 0;

	};

	function label(){
	$( "label" ).each(function(e) {
    var check_id = $( this ).closest( "div" ).find("input").prop('id');
    $(this).attr('for', check_id);

  	});

	};

}



function pridejZamestnavateleDruhehoDospeleho() {

	var text = '<h3 class="font-18 weight-strong mb-0">Druhý zaměstnavatel</h3>';

	text += '<div class="formrow d-flex mt-3 mb-2">';
	text += '<div class="formrowtext pr-2">Hrubý příjem</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="50000" step="1000" id="druhyDospelyDruhyZamestnavatelPrijem" onchange="prepisFormular(\'druhyDospelyDruhyZamestnavatel\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';

//EDITED START
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Typ smlouvy</div>';
	text += '<select class="typsmlouvyform" id="druhyDospelyDruhyZamestnavatelTypSmlouvy" onchange="prepisFormular(\'druhyDospelyDruhyZamestnavatel\', \'1\', this.value)">';
  	text += '<option value="0">HPP</option>';
  	text += '<option value="1">DPČ</option>';
  	text += '<option value="2">DPP</option>';
	text += '</select>';
	text += '</div>';
//EDITED END

	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowradiomain squaredTwo pl-3"><input type="checkbox" id="druhyDospelyDruhyZamestnavatelRuzovyPapir" onclick="prepisFormular(\'druhyDospelyDruhyZamestnavatel\', \'2\', this.checked)"><label for=""></label>Prohlášení k dani <sup><div class="tooltip d-none">?</sup><span class="tooltip d-nonetext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus d-flex mb-2 d-flex mb-2 bonus" id="druhyDospelyDruhyZamestnavatelVyzivovaneDetiForm" style="visibility: hidden;">';
	text += '<div class="formrowtext pr-2">Počet dětí k daňovému zvýhodnění</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10" id="druhyDospelyDruhyZamestnavatelVyzivovaneDeti" onchange="prepisFormular(\'druhyDospelyPrvniZamestnavatel\', \'3\', this.value)"></div>';
	text += '</div>';

	document.getElementById("mw-text-5").innerHTML = text;
	label();

	// vyplnění z globálních proměnných
	document.getElementById("druhyDospelyDruhyZamestnavatelPrijem").value = druhyDospelyDruhyZamestnavatel[0];
	document.getElementById("druhyDospelyDruhyZamestnavatelTypSmlouvy").value = druhyDospelyDruhyZamestnavatel[1];
	document.getElementById("druhyDospelyDruhyZamestnavatelRuzovyPapir").checked = druhyDospelyDruhyZamestnavatel[2];
	document.getElementById("druhyDospelyDruhyZamestnavatelVyzivovaneDeti").value = druhyDospelyDruhyZamestnavatel[3];
	document.getElementById("druhyDospelyDruhyZamestnavatelVyjimka").checked = druhyDospelyDruhyZamestnavatel[4];

	// první nastavení formuláře pro počet dětí u prohlášení k dani
	var druhyDospelyDruhyZamestnavatelDaneCheckStart = druhyDospelyDruhyZamestnavatel[2];
	if(druhyDospelyDruhyZamestnavatelDaneCheckStart) {
		document.getElementById("druhyDospelyDruhyZamestnavatelVyzivovaneDeti").value = druhyDospelyDruhyZamestnavatel[3];
		document.getElementById("druhyDospelyDruhyZamestnavatelVyzivovaneDetiForm").style.visibility = "visible";
	} else {
		document.getElementById("druhyDospelyDruhyZamestnavatelVyzivovaneDetiForm").style.visibility = "hidden";
	}

	// zapnutí/vypnutí formuláře pro počet dětí u prohlášení k dani
	var druhyDospelyDruhyZamestnavatelDaneCheck = document.getElementById("druhyDospelyDruhyZamestnavatelRuzovyPapir");
	druhyDospelyDruhyZamestnavatelDaneCheck.onchange = function() {

		if(document.getElementById("druhyDospelyDruhyZamestnavatelVyzivovaneDetiForm").style.visibility == "visible") {
			document.getElementById("druhyDospelyDruhyZamestnavatelVyzivovaneDetiForm").style.visibility = "hidden";
		} else {
			document.getElementById("druhyDospelyDruhyZamestnavatelVyzivovaneDetiForm").style.visibility = "visible";
			document.getElementById("druhyDospelyDruhyZamestnavatelVyzivovaneDeti").value = druhyDospelyDruhyZamestnavatel[3];
		}

		// vynulování počtu dětí u prohlášení k dani jinde a přepnutí tlačítka u dalšího zaměstnavatele stejného dospělého
		document.getElementById("druhyDospelyPrvniZamestnavatelRuzovyPapir").checked = false;
		document.getElementById("druhyDospelyPrvniZamestnavatelVyzivovaneDetiForm").style.visibility = "hidden";
		druhyDospelyPrvniZamestnavatel[2] = false;
		prvniDospelyPrvniZamestnavatel[3] = 0;
		prvniDospelyDruhyZamestnavatel[3] = 0;
		druhyDospelyPrvniZamestnavatel[3] = 0;
		tretiDospelyPrvniZamestnavatel[3] = 0;
		tretiDospelyDruhyZamestnavatel[3] = 0;

	};

		function label(){
	$( "label" ).each(function(e) {
    var check_id = $( this ).closest( "div" ).find("input").prop('id');
    $(this).attr('for', check_id);

  	});

	};

}



function pridejDalsiPrijmyDruhehoDospeleho() {

	var text = '<h3 class="font-18 weight-strong">Jiné příjmy</h3>';

	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Důchod</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="20000" step="1000" id="druhyDospelyDuchody" onchange="prepisFormular(\'druhyDospelyDalsiPrijmy\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Rodičovská / Mateřská</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="20000" step="1000" id="druhyDospelyRodicovska" onchange="prepisFormular(\'druhyDospelyDalsiPrijmy\', \'1\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Podpora v nezaměstnanosti</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="20000" step="1000" id="druhyDospelyPodporaVNezamestnanosti" onchange="prepisFormular(\'druhyDospelyDalsiPrijmy\', \'2\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Nemocenská</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10000" step="1000" id="druhyDospelyNemocenska" onchange="prepisFormular(\'druhyDospelyDalsiPrijmy\', \'3\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Ostatní</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10000" step="1000" id="druhyDospelyOstatniPrijmy" onchange="prepisFormular(\'druhyDospelyDalsiPrijmy\', \'4\', this.value)"></div>';
	text += '</div>';

	document.getElementById("mw-text-6").innerHTML = text;

	// vyplnění z globálních proměnných
	document.getElementById("druhyDospelyDuchody").value = druhyDospelyDalsiPrijmy[0];
	document.getElementById("druhyDospelyRodicovska").value = druhyDospelyDalsiPrijmy[1];
	document.getElementById("druhyDospelyPodporaVNezamestnanosti").value = druhyDospelyDalsiPrijmy[2];
	document.getElementById("druhyDospelyNemocenska").value = druhyDospelyDalsiPrijmy[3];
	document.getElementById("druhyDospelyOstatniPrijmy").value = druhyDospelyDalsiPrijmy[4];

}



function vyplnPrijmyTretihoDospeleho() {

	var text = '<h2 class="uppercase weight-strong font-20 py-0 pl-2 mt-4">3. DOSPĚLÝ</h2>';
	text += '<div class="ml-4">';

//EDITED START
	text += '<div class="formrow">';
	text += '<div class="formrowradiodetail squaredTwo pl-3"><input type="checkbox" id="tretiDospelyPrvniZamestnavatelVyjimka" onclick="prepisFormular(\'tretiDospelyPrvniZamestnavatel\', \'4\', this.checked)"><label for=""></label>Student/důchodce/pečující o dítě/postižený<sup><div class="tooltip d-none">?</sup><span class="tooltip d-nonetext">NĚJAKÝ TEXT</span></div></div>';
	text += '</div>';
//EDITED END

	text += '<h3 class="font-18 weight-strong mb-0">První zaměstnavatel</h3>';

	text += '<div class="formrow d-flex mt-3 mb-2">';
	text += '<div class="formrowtext pr-2">Hrubý příjem</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="50000" step="1000" id="tretiDospelyPrvniZamestnavatelPrijem" onchange="prepisFormular(\'tretiDospelyPrvniZamestnavatel\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';

//EDITED START
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Typ smlouvy</div>';
	text += '<select class="typsmlouvyform" id="tretiDospelyPrvniZamestnavatelTypSmlouvy" onchange="prepisFormular(\'tretiDospelyPrvniZamestnavatel\', \'1\', this.value)">';
  	text += '<option value="0">HPP</option>';
  	text += '<option value="1">DPČ</option>';
  	text += '<option value="2">DPP</option>';
	text += '</select>';
	text += '</div>';
//EDITED END

	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowradiomain squaredTwo pl-3"><input type="checkbox" id="tretiDospelyPrvniZamestnavatelRuzovyPapir" onclick="prepisFormular(\'tretiDospelyPrvniZamestnavatel\', \'2\', this.checked)"><label for=""></label>Prohlášení k dani <sup><div class="tooltip d-none">?</sup><span class="tooltip d-nonetext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus d-flex mb-2 d-flex mb-2 bonus" id="tretiDospelyPrvniZamestnavatelVyzivovaneDetiForm" style="visibility: hidden;">';
	text += '<div class="formrowtext pr-2">Počet dětí k daňovému zvýhodnění</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10" id="tretiDospelyPrvniZamestnavatelVyzivovaneDeti" onchange="prepisFormular(\'tretiDospelyPrvniZamestnavatel\', \'3\', this.value)"></div>';
	text += '</div>';
	text += '<div id="mw-text-8">';
	text += '<div><button class="mw-button" type="button" onclick="pridejZamestnavateleTretihoDospeleho()"><span>+</span> další zaměstnavatel</button></div>';
	text += '</div>';
	text += '<div id="mw-text-9">';
	text += '<div><button class="mw-button" type="button" onclick="pridejDalsiPrijmyTretihoDospeleho()"><span>+</span> jiné příjmy</button></div>';
	text += '</div>';

	document.getElementById("mw-text-4").innerHTML = text;
	label();

	// vyplnění z globálních proměnných
	document.getElementById("tretiDospelyPrvniZamestnavatelPrijem").value = tretiDospelyPrvniZamestnavatel[0];
	document.getElementById("tretiDospelyPrvniZamestnavatelTypSmlouvy").value = tretiDospelyPrvniZamestnavatel[1];
	document.getElementById("tretiDospelyPrvniZamestnavatelRuzovyPapir").checked = tretiDospelyPrvniZamestnavatel[2];
	document.getElementById("tretiDospelyPrvniZamestnavatelVyzivovaneDeti").value = tretiDospelyPrvniZamestnavatel[3];
	document.getElementById("tretiDospelyPrvniZamestnavatelVyjimka").checked = tretiDospelyPrvniZamestnavatel[4];

	// první nastavení formuláře pro počet dětí u prohlášení k dani
	var tretiDospelyPrvniZamestnavatelDaneCheckStart = tretiDospelyPrvniZamestnavatel[2];
	if(tretiDospelyPrvniZamestnavatelDaneCheckStart) {
		document.getElementById("tretiDospelyPrvniZamestnavatelVyzivovaneDeti").value = tretiDospelyPrvniZamestnavatel[3];
		document.getElementById("tretiDospelyPrvniZamestnavatelVyzivovaneDetiForm").style.visibility = "visible";
	} else {
		document.getElementById("tretiDospelyPrvniZamestnavatelVyzivovaneDetiForm").style.visibility = "hidden";
	}

	// zapnutí/vypnutí formuláře pro počet dětí u prohlášení k dani
	var tretiDospelyPrvniZamestnavatelDaneCheck = document.getElementById("tretiDospelyPrvniZamestnavatelRuzovyPapir");
	tretiDospelyPrvniZamestnavatelDaneCheck.onchange = function() {

		if(document.getElementById("tretiDospelyPrvniZamestnavatelVyzivovaneDetiForm").style.visibility == "visible") {
			document.getElementById("tretiDospelyPrvniZamestnavatelVyzivovaneDetiForm").style.visibility = "hidden";
		} else {
			document.getElementById("tretiDospelyPrvniZamestnavatelVyzivovaneDetiForm").style.visibility = "visible";
			document.getElementById("tretiDospelyPrvniZamestnavatelVyzivovaneDeti").value = tretiDospelyPrvniZamestnavatel[3];
		}

		// vynulování počtu dětí u prohlášení k dani jinde a přepnutí tlačítka u dalšího zaměstnavatele stejného dospělého
		document.getElementById("tretiDospelyDruhyZamestnavatelRuzovyPapir").checked = false;
		document.getElementById("tretiDospelyDruhyZamestnavatelVyzivovaneDetiForm").style.visibility = "hidden";
		tretiDospelyDruhyZamestnavatel[2] = false;
		prvniDospelyPrvniZamestnavatel[3] = 0;
		prvniDospelyDruhyZamestnavatel[3] = 0;
		druhyDospelyPrvniZamestnavatel[3] = 0;
		druhyDospelyDruhyZamestnavatel[3] = 0;
		tretiDospelyDruhyZamestnavatel[3] = 0;

	};

	function label(){
	$( "label" ).each(function(e) {
    var check_id = $( this ).closest( "div" ).find("input").prop('id');
    $(this).attr('for', check_id);

  	});

	};

}



function pridejZamestnavateleTretihoDospeleho() {

	var text = '<h3 class="font-18 weight-strong mb-0">Druhý zaměstnavatel</h3>';

	text += '<div class="formrow d-flex mt-3 mb-2">';
	text += '<div class="formrowtext pr-2">Hrubý příjem</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="50000" step="1000" id="tretiDospelyDruhyZamestnavatelPrijem" onchange="prepisFormular(\'tretiDospelyDruhyZamestnavatel\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';

//EDITED START
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Typ smlouvy</div>';
	text += '<select class="typsmlouvyform" id="tretiDospelyDruhyZamestnavatelTypSmlouvy" onchange="prepisFormular(\'tretiDospelyDruhyZamestnavatel\', \'1\', this.value)">';
  	text += '<option value="0">HPP</option>';
  	text += '<option value="1">DPČ</option>';
  	text += '<option value="2">DPP</option>';
	text += '</select>';
	text += '</div>';
//EDITED END

	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowradiomain squaredTwo pl-3"><input type="checkbox" id="tretiDospelyDruhyZamestnavatelRuzovyPapir" onclick="prepisFormular(\'tretiDospelyDruhyZamestnavatel\', \'2\', this.checked)"><label for=""></label>Prohlášení k dani <sup><div class="tooltip d-none">?</sup><span class="tooltip d-nonetext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus d-flex mb-2 d-flex mb-2 bonus" id="tretiDospelyDruhyZamestnavatelVyzivovaneDetiForm" style="visibility: hidden;">';
	text += '<div class="formrowtext pr-2">Počet dětí k daňovému zvýhodnění</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10" id="tretiDospelyDruhyZamestnavatelVyzivovaneDeti" onchange="prepisFormular(\'tretiDospelyPrvniZamestnavatel\', \'3\', this.value)"></div>';
	text += '</div>';

	document.getElementById("mw-text-8").innerHTML = text;
	label();

	// vyplnění z globálních proměnných
	document.getElementById("tretiDospelyDruhyZamestnavatelPrijem").value = tretiDospelyDruhyZamestnavatel[0];
	document.getElementById("tretiDospelyDruhyZamestnavatelTypSmlouvy").value = tretiDospelyDruhyZamestnavatel[1];
	document.getElementById("tretiDospelyDruhyZamestnavatelRuzovyPapir").checked = tretiDospelyDruhyZamestnavatel[2];
	document.getElementById("tretiDospelyDruhyZamestnavatelVyzivovaneDeti").value = tretiDospelyDruhyZamestnavatel[3];
	document.getElementById("tretiDospelyDruhyZamestnavatelVyjimka").checked = tretiDospelyDruhyZamestnavatel[4];

	// první nastavení formuláře pro počet dětí u prohlášení k dani
	var tretiDospelyDruhyZamestnavatelDaneCheckStart = tretiDospelyDruhyZamestnavatel[2];
	if(tretiDospelyDruhyZamestnavatelDaneCheckStart) {
		document.getElementById("tretiDospelyDruhyZamestnavatelVyzivovaneDeti").value = tretiDospelyDruhyZamestnavatel[3];
		document.getElementById("tretiDospelyDruhyZamestnavatelVyzivovaneDetiForm").style.visibility = "visible";
	} else {
		document.getElementById("tretiDospelyDruhyZamestnavatelVyzivovaneDetiForm").style.visibility = "hidden";
	}

	// zapnutí/vypnutí formuláře pro počet dětí u prohlášení k dani
	var tretiDospelyDruhyZamestnavatelDaneCheck = document.getElementById("tretiDospelyDruhyZamestnavatelRuzovyPapir");
	tretiDospelyDruhyZamestnavatelDaneCheck.onchange = function() {

		if(document.getElementById("tretiDospelyDruhyZamestnavatelVyzivovaneDetiForm").style.visibility == "visible") {
			document.getElementById("tretiDospelyDruhyZamestnavatelVyzivovaneDetiForm").style.visibility = "hidden";
		} else {
			document.getElementById("tretiDospelyDruhyZamestnavatelVyzivovaneDetiForm").style.visibility = "visible";
			document.getElementById("tretiDospelyDruhyZamestnavatelVyzivovaneDeti").value = tretiDospelyDruhyZamestnavatel[3];
		}

		// vynulování počtu dětí u prohlášení k dani jinde a přepnutí tlačítka u dalšího zaměstnavatele stejného dospělého
		document.getElementById("tretiDospelyPrvniZamestnavatelRuzovyPapir").checked = false;
		document.getElementById("tretiDospelyPrvniZamestnavatelVyzivovaneDetiForm").style.visibility = "hidden";
		tretiDospelyPrvniZamestnavatel[2] = false;
		prvniDospelyPrvniZamestnavatel[3] = 0;
		prvniDospelyDruhyZamestnavatel[3] = 0;
		druhyDospelyPrvniZamestnavatel[3] = 0;
		druhyDospelyDruhyZamestnavatel[3] = 0;
		tretiDospelyPrvniZamestnavatel[3] = 0;

	};

		function label(){
	$( "label" ).each(function(e) {
    var check_id = $( this ).closest( "div" ).find("input").prop('id');
    $(this).attr('for', check_id);

  	});

	};

}



function pridejDalsiPrijmyTretihoDospeleho() {

	var text = '<h3 class="font-18 weight-strong">Jiné příjmy</h3>';

	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Rodičovská / Mateřská</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="20000" step="1000" id="tretiDospelyRodicovska" onchange="prepisFormular(\'tretiDospelyDalsiPrijmy\', \'1\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Důchod</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="20000" step="1000" id="tretiDospelyDuchody" onchange="prepisFormular(\'tretiDospelyDalsiPrijmy\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Podpora v nezaměstnanosti</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="20000" step="1000" id="tretiDospelyPodporaVNezamestnanosti" onchange="prepisFormular(\'tretiDospelyDalsiPrijmy\', \'2\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Nemocenská</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10000" step="1000" id="tretiDospelyNemocenska" onchange="prepisFormular(\'tretiDospelyDalsiPrijmy\', \'3\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Ostatní</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10000" step="1000" id="tretiDospelyOstatniPrijmy" onchange="prepisFormular(\'tretiDospelyDalsiPrijmy\', \'4\', this.value)"></div>';
	text += '</div>';

	document.getElementById("mw-text-9").innerHTML = text;

	// vyplnění z globálních proměnných
	document.getElementById("tretiDospelyDuchody").value = tretiDospelyDalsiPrijmy[0];
	document.getElementById("tretiDospelyRodicovska").value = tretiDospelyDalsiPrijmy[1];
	document.getElementById("tretiDospelyPodporaVNezamestnanosti").value = tretiDospelyDalsiPrijmy[2];
	document.getElementById("tretiDospelyNemocenska").value = tretiDospelyDalsiPrijmy[3];
	document.getElementById("tretiDospelyOstatniPrijmy").value = tretiDospelyDalsiPrijmy[4];

}



function vyplnExekuce() {

	var text = '<div class="mw-text w-100">';
	text += '<p class="weight-strong uppercase col-12 mb-0 font-24 pb-2 pl-2"> Exekuce</p>';
	text += '<h3 class="uppercase weight-strong font-20 py-0 pl-2">První dospělý</h3>';
	text += '<div class="ml-3">';
	text += '<div class="formrow d-flex mb-2" id="prvniDospelyPrednostniExekuceForm">';
	text += '<div class="formrowradiomain squaredTwo pl-3"><input type="checkbox" id="prvniDospelyPrednostniExekuce" onclick="prepisFormular(\'prvniDospelyExekuce\', \'0\', this.checked)"><label for=""></label>Přednostní exekuce <sup><div class="tooltip d-none">?</sup><span class="tooltip d-nonetext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow d-flex mb-2" id="prvniDospelyNeprednostniExekuceForm">';
	text += '<div class="formrowradiomain squaredTwo pl-3"><input type="checkbox" id="prvniDospelyNeprednostniExekuce" onclick="prepisFormular(\'prvniDospelyExekuce\', \'1\', this.checked)"><label for=""></label>Nepřednostní exekuce <sup><div class="tooltip d-none">?</sup><span class="tooltip d-nonetext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus d-flex mb-2" id="prvniDospelyDalsiVyzivovaneOsobyForm" style="visibility: hidden;">';
	text += '<div class="formrowtext pr-2">Další vyživované osoby</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10" id="prvniDospelyDalsiVyzivovaneOsoby" onchange="prepisFormular(\'prvniDospelyExekuce\', \'2\', this.value)"></div>';
	text += '</div>';
	text += '</div>';
	text += '<h3 class="uppercase weight-strong font-20 py-0 pl-2">Druhý dospělý</h3>';
	text += '<div class="ml-3">';
	text += '<div class="formrow d-flex mb-2" id="druhyDospelyPrednostniExekuceForm">';
	text += '<div class="formrowradiomain squaredTwo pl-3"><input type="checkbox" id="druhyDospelyPrednostniExekuce" onclick="prepisFormular(\'druhyDospelyExekuce\', \'0\', this.checked)"><label for=""></label>Přednostní exekuce <sup><div class="tooltip d-none">?</sup><span class="tooltip d-nonetext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow d-flex mb-2" id="druhyDospelyNeprednostniExekuceForm">';
	text += '<div class="formrowradiomain squaredTwo pl-3"><input type="checkbox" id="druhyDospelyNeprednostniExekuce" onclick="prepisFormular(\'druhyDospelyExekuce\', \'1\', this.checked)"><label for=""></label>Nepřednostní exekuce <sup><div class="tooltip d-none">?</sup><span class="tooltip d-nonetext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus d-flex mb-2" id="druhyDospelyDalsiVyzivovaneOsobyForm" style="visibility: hidden;">';
	text += '<div class="formrowtext pr-2">Další vyživované osoby</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10" id="druhyDospelyDalsiVyzivovaneOsoby" onchange="prepisFormular(\'druhyDospelyExekuce\', \'2\', this.value)"></div>';
	text += '</div>';
	text += '</div>';
	text += '<h3 class="uppercase weight-strong font-20 py-0 pl-2">Třetí dospělý</h3>';
	text += '<div class="ml-3">';
	text += '<div class="formrow d-flex mb-2" id="tretiDospelyPrednostniExekuceForm">';
	text += '<div class="formrowradiomain squaredTwo pl-3"><input type="checkbox" id="tretiDospelyPrednostniExekuce" onclick="prepisFormular(\'tretiDospelyExekuce\', \'0\', this.checked)"><label for=""></label>Přednostní exekuce <sup><div class="tooltip d-none">?</sup><span class="tooltip d-nonetext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow d-flex mb-2" id="tretiDospelyNeprednostniExekuceForm">';
	text += '<div class="formrowradiomain squaredTwo pl-3"><input type="checkbox" id="tretiDospelyNeprednostniExekuce" onclick="prepisFormular(\'tretiDospelyExekuce\', \'1\', this.checked)"><label for=""></label>Nepřednostní exekuce <sup><div class="tooltip d-none">?</sup><span class="tooltip d-nonetext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus d-flex mb-2" id="tretiDospelyDalsiVyzivovaneOsobyForm" style="visibility: hidden;">';
	text += '<div class="formrowtext pr-2">Další vyživované osoby</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10" id="tretiDospelyDalsiVyzivovaneOsoby" onchange="prepisFormular(\'tretiDospelyExekuce\', \'2\', this.value)"></div>';
	text += '</div>';
	text += '</div>';

	document.getElementById("mainwindow").innerHTML = text; label();


	// vyplnění z globálních proměnných
	document.getElementById("prvniDospelyPrednostniExekuce").checked = prvniDospelyExekuce[0];
	document.getElementById("prvniDospelyNeprednostniExekuce").checked = prvniDospelyExekuce[1];
	document.getElementById("prvniDospelyDalsiVyzivovaneOsoby").value = prvniDospelyExekuce[2];
	document.getElementById("druhyDospelyPrednostniExekuce").checked = druhyDospelyExekuce[0];
	document.getElementById("druhyDospelyNeprednostniExekuce").checked = druhyDospelyExekuce[1];
	document.getElementById("druhyDospelyDalsiVyzivovaneOsoby").value = druhyDospelyExekuce[2];
	document.getElementById("tretiDospelyPrednostniExekuce").checked = tretiDospelyExekuce[0];
	document.getElementById("tretiDospelyNeprednostniExekuce").checked = tretiDospelyExekuce[1];
	document.getElementById("tretiDospelyDalsiVyzivovaneOsoby").value = tretiDospelyExekuce[2];

	// první nastavení formuláře pro počet dětí u exekuce
	if((prvniDospelyExekuce[0]) || (prvniDospelyExekuce[1])) {
		document.getElementById("prvniDospelyDalsiVyzivovaneOsobyForm").style.visibility = "visible";
	}

	if((druhyDospelyExekuce[0]) || (druhyDospelyExekuce[1])) {
		document.getElementById("druhyDospelyDalsiVyzivovaneOsobyForm").style.visibility = "visible";
	}

	if((tretiDospelyExekuce[0]) || (tretiDospelyExekuce[1])) {
		document.getElementById("tretiDospelyDalsiVyzivovaneOsobyForm").style.visibility = "visible";
	}

	// vypnutí druhého typu exekucí, pokud je někde nějaká
	if(prvniDospelyExekuce[0]) {document.getElementById("prvniDospelyNeprednostniExekuceForm").style.visibility = "hidden";}
	if(prvniDospelyExekuce[1]) {document.getElementById("prvniDospelyPrednostniExekuceForm").style.visibility = "hidden";}
	if(druhyDospelyExekuce[0]) {document.getElementById("druhyDospelyNeprednostniExekuceForm").style.visibility = "hidden";}
	if(druhyDospelyExekuce[1]) {document.getElementById("druhyDospelyPrednostniExekuceForm").style.visibility = "hidden";}
	if(tretiDospelyExekuce[0]) {document.getElementById("tretiDospelyNeprednostniExekuceForm").style.visibility = "hidden";}
	if(tretiDospelyExekuce[1]) {document.getElementById("tretiDospelyPrednostniExekuceForm").style.visibility = "hidden";}

	// zapnutí/vypnutí formuláře pro počet vyživovaných osob
	var prvniDospelyPrednostniExekuceCheck = document.getElementById("prvniDospelyPrednostniExekuce"),
		prvniDospelyNeprednostniExekuceCheck = document.getElementById("prvniDospelyNeprednostniExekuce");

	prvniDospelyPrednostniExekuceCheck.onchange = function() {
		if((document.getElementById("prvniDospelyPrednostniExekuce").checked) || (document.getElementById("prvniDospelyNeprednostniExekuce").checked)) {
			document.getElementById("prvniDospelyDalsiVyzivovaneOsobyForm").style.visibility = "visible";
			document.getElementById("prvniDospelyDalsiVyzivovaneOsoby").value = prvniDospelyExekuce[2];
		} else {
			document.getElementById("prvniDospelyDalsiVyzivovaneOsobyForm").style.visibility = "hidden";
		}

		// zapnutí/vypnutí druhého typu exekucí - vždy jen přednostní, nebo nepřednostní
		if(document.getElementById("prvniDospelyPrednostniExekuce").checked) {
			document.getElementById("prvniDospelyNeprednostniExekuce").checked = false;
			document.getElementById("prvniDospelyNeprednostniExekuceForm").style.visibility = "hidden";
		} else {
			document.getElementById("prvniDospelyNeprednostniExekuceForm").style.visibility = "visible";
		}
	};

	prvniDospelyNeprednostniExekuceCheck.onchange = function() {
		if((document.getElementById("prvniDospelyPrednostniExekuce").checked) || (document.getElementById("prvniDospelyNeprednostniExekuce").checked)) {
			document.getElementById("prvniDospelyDalsiVyzivovaneOsobyForm").style.visibility = "visible";
			document.getElementById("prvniDospelyDalsiVyzivovaneOsoby").value = prvniDospelyExekuce[2];
		} else {
			document.getElementById("prvniDospelyDalsiVyzivovaneOsobyForm").style.visibility = "hidden";
		}

		// zapnutí/vypnutí druhého typu exekucí - vždy jen přednostní, nebo nepřednostní
		if(document.getElementById("prvniDospelyNeprednostniExekuce").checked) {
			document.getElementById("prvniDospelyPrednostniExekuce").checked = false;
			document.getElementById("prvniDospelyPrednostniExekuceForm").style.visibility = "hidden";
		} else {
			document.getElementById("prvniDospelyPrednostniExekuceForm").style.visibility = "visible";
		}
	};

	var druhyDospelyPrednostniExekuceCheck = document.getElementById("druhyDospelyPrednostniExekuce"),
		druhyDospelyNeprednostniExekuceCheck = document.getElementById("druhyDospelyNeprednostniExekuce");

	druhyDospelyPrednostniExekuceCheck.onchange = function() {
		if((document.getElementById("druhyDospelyPrednostniExekuce").checked) || (document.getElementById("druhyDospelyNeprednostniExekuce").checked)) {
			document.getElementById("druhyDospelyDalsiVyzivovaneOsobyForm").style.visibility = "visible";
			document.getElementById("druhyDospelyDalsiVyzivovaneOsoby").value = druhyDospelyExekuce[2];
		} else {
			document.getElementById("druhyDospelyDalsiVyzivovaneOsobyForm").style.visibility = "hidden";
		}

		// zapnutí/vypnutí druhého typu exekucí - vždy jen přednostní, nebo nepřednostní
		if(document.getElementById("druhyDospelyPrednostniExekuce").checked) {
			document.getElementById("druhyDospelyNeprednostniExekuce").checked = false;
			document.getElementById("druhyDospelyNeprednostniExekuceForm").style.visibility = "hidden";
		} else {
			document.getElementById("druhyDospelyNeprednostniExekuceForm").style.visibility = "visible";
		}
	};

	druhyDospelyNeprednostniExekuceCheck.onchange = function() {
		if((document.getElementById("druhyDospelyPrednostniExekuce").checked) || (document.getElementById("druhyDospelyNeprednostniExekuce").checked)) {
			document.getElementById("druhyDospelyDalsiVyzivovaneOsobyForm").style.visibility = "visible";
			document.getElementById("druhyDospelyDalsiVyzivovaneOsoby").value = druhyDospelyExekuce[2];
		} else {
			document.getElementById("druhyDospelyDalsiVyzivovaneOsobyForm").style.visibility = "hidden";
		}

		// zapnutí/vypnutí druhého typu exekucí - vždy jen přednostní, nebo nepřednostní
		if(document.getElementById("druhyDospelyNeprednostniExekuce").checked) {
			document.getElementById("druhyDospelyPrednostniExekuce").checked = false;
			document.getElementById("druhyDospelyPrednostniExekuceForm").style.visibility = "hidden";
		} else {
			document.getElementById("druhyDospelyPrednostniExekuceForm").style.visibility = "visible";
		}
	};

	var tretiDospelyPrednostniExekuceCheck = document.getElementById("tretiDospelyPrednostniExekuce"),
		tretiDospelyNeprednostniExekuceCheck = document.getElementById("tretiDospelyNeprednostniExekuce");

	tretiDospelyPrednostniExekuceCheck.onchange = function() {
		if((document.getElementById("tretiDospelyPrednostniExekuce").checked) || (document.getElementById("tretiDospelyNeprednostniExekuce").checked)) {
			document.getElementById("tretiDospelyDalsiVyzivovaneOsobyForm").style.visibility = "visible";
			document.getElementById("tretiDospelyDalsiVyzivovaneOsoby").value = tretiDospelyExekuce[2];
		} else {
			document.getElementById("tretiDospelyDalsiVyzivovaneOsobyForm").style.visibility = "hidden";
		}

		// zapnutí/vypnutí druhého typu exekucí - vždy jen přednostní, nebo nepřednostní
		if(document.getElementById("tretiDospelyPrednostniExekuce").checked) {
			document.getElementById("tretiDospelyNeprednostniExekuce").checked = false;
			document.getElementById("tretiDospelyNeprednostniExekuceForm").style.visibility = "hidden";
		} else {
			document.getElementById("tretiDospelyNeprednostniExekuceForm").style.visibility = "visible";
		}
	};

	tretiDospelyNeprednostniExekuceCheck.onchange = function() {
		if((document.getElementById("tretiDospelyPrednostniExekuce").checked) || (document.getElementById("tretiDospelyNeprednostniExekuce").checked)) {
			document.getElementById("tretiDospelyDalsiVyzivovaneOsobyForm").style.visibility = "visible";
			document.getElementById("tretiDospelyDalsiVyzivovaneOsoby").value = tretiDospelyExekuce[2];
		} else {
			document.getElementById("tretiDospelyDalsiVyzivovaneOsobyForm").style.visibility = "hidden";
		}

		// zapnutí/vypnutí druhého typu exekucí - vždy jen přednostní, nebo nepřednostní
		if(document.getElementById("tretiDospelyNeprednostniExekuce").checked) {
			document.getElementById("tretiDospelyPrednostniExekuce").checked = false;
			document.getElementById("tretiDospelyPrednostniExekuceForm").style.visibility = "hidden";
		} else {
			document.getElementById("tretiDospelyPrednostniExekuceForm").style.visibility = "visible";
		}
	};

	function label(){
	$( "label" ).each(function(e) {
    var check_id = $( this ).closest( "div" ).find("input").prop('id');
    $(this).attr('for', check_id);

  	});

	};

}



function vyplnNakladyNaBydleni() {

	var text = '<div class="mw-text w-100">';
	text += '<div id="mw-text-1">';
	text += '<p class="weight-strong uppercase col-12 mb-0 font-24 pb-2 pl-2"> Náklady na bydlení</p>';
	text += '<div class="ml-3 mt-2">';

// EDITED START
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Typ bydlení</div>';
	text += '<div class="formrowradiodetail"><input novalidate type="radio" id="jenajem" name="jakbydli" onclick="prepisFormular(\'bydleni\', \'2\', this.checked)" checked>';
	text += '<label for="jenajem">Bydlení v nájmu</label>'
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowradiodetail"><input novalidate type="radio" id="vlastniByt" onclick="prepisFormular(\'bydleni\', \'3\', this.checked)" name="jakbydli">';
	text += '<label for="vlastniByt">Vlastní nebo družstevní byt</label>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowradiodetail"><input novalidate type="radio" id="ubytovna" onclick="prepisFormular(\'bydleni\', \'4\', this.checked)" name="jakbydli">';
	text += '<label for="ubytovna">Ubytovna, chata nebo podnájem</label>';
	text += '</div>';
// EDITED END

	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Nájem</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="20000" step="1000" id="najem" onchange="prepisFormular(\'bydleni\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowtext pr-2">Služby a poplatky <sup><div class="tooltip d-none">?<span class="tooltip d-nonetext">Energie, voda, úklid, ...</span></div></sup></div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="10000" step="1000" id="poplatky" onchange="prepisFormular(\'bydleni\', \'1\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow d-flex mb-3 mt-3">';
	text += '<div class="formrowtext pr-2">Velikost obce</div>';
	text += '<div class="formrowinput"><select class="inputnr" type="text" id="velikostObce" onchange="prepisFormular(\'bydleni\', \'5\', this.value)">';
	text += '<option value="1" selected="selected">Praha</option>';
	text += '<option value="2">nad 100 tisíc</option>';
	text += '<option value="3">50 až 100 tisíc</option>';
	text += '<option value="4">10 až 50 tisíc</option>';
	text += '<option value="5">pod 10 tisíc</option>';
	text += '</select></div></div>';

	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowradiomain squaredTwo pl-3"><input type="checkbox" id="obvykleNakladyButton" onchange="prepisFormular(\'bydleni\', \'5\', this.checked)"><label for=""></label>Stanovil ÚP místně obvyklé náklady? <sup><div class="tooltip d-none">?<span class="tooltip d-nonetext">NĚJAKÝ TEXT</span></sup></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus d-flex mb-2" id="obvykleNakladyForm" style="visibility: hidden;">';
	text += '<div class="formrowtext pr-2">Místně obvyklé náklady</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="20000" step="1000" id="obvykleNaklady" onchange="prepisFormular(\'bydleni\', \'6\', this.value)"></div>';
	text += '</div>';
	text += '</div>';

	text += '</div>';

	document.getElementById("mainwindow").innerHTML = text; label();

	// vyplnění z globálních proměnných
	document.getElementById("najem").value = bydleni[0];
	document.getElementById("poplatky").value = bydleni[1];
	document.getElementById("jenajem").checked = bydleni[2];
	document.getElementById("vlastniByt").checked = bydleni[3];
	document.getElementById("ubytovna").checked = bydleni[4];
	document.getElementById("velikostObce").value = bydleni[5];

	// zapnutí/vypnutí formuláře pro místní náklady stanovené ÚP
	var mistniNakladyCheck = document.getElementById("obvykleNakladyButton");
	mistniNakladyCheck.onchange = function() {
		if(document.getElementById("obvykleNakladyForm").style.visibility == "visible") {
			document.getElementById("obvykleNakladyForm").style.visibility = "hidden";
		} else {
			document.getElementById("obvykleNakladyForm").style.visibility = "visible";
			document.getElementById("obvykleNaklady").value = bydleni[5];
		}
	};

	function label(){
	$( "label" ).each(function(e) {
    var check_id = $( this ).closest( "div" ).find("input").prop('id');
    $(this).attr('for', check_id);

  	});

	};

}



// EDITED START
function vyplnZadostODavky() {

	var text = '<div class="mw-text w-100">';
	text += '<p class="weight-strong uppercase col-12 mb-0 font-24 pb-2 pl-2"> Odmítnutí dávky</p>';
	text += '<div class="ml-3">';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="chciPridavkyNaDeti" onclick="prepisFormular(\'pozadovaneDavky\', \'0\', this.checked)">Chci přídavky na děti<sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="chciPrispevekNaBydleni" onclick="prepisFormular(\'pozadovaneDavky\', \'0\', this.checked)">Chci příspěvek na bydlení<sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="chciPrispevekNaZivobyti" onclick="prepisFormular(\'pozadovaneDavky\', \'0\', this.checked)">Chci příspěvek na živobytí<sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow d-flex mb-2">';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="chciDoplatekNaBydleni" onclick="prepisFormular(\'pozadovaneDavky\', \'0\', this.checked)">Chci doplatek na bydlení<sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';

	document.getElementById("mainwindow").innerHTML = text;

	document.getElementById("chciPridavkyNaDeti").checked = pozadovaneDavky[0];
	document.getElementById("chciPrispevekNaBydleni").checked = pozadovaneDavky[1];
	document.getElementById("chciPrispevekNaZivobyti").checked = pozadovaneDavky[2];
	document.getElementById("chciDoplatekNaBydleni").checked = pozadovaneDavky[3];

}
// EDITED END


function prepisFormular(promenna = 'dummy', poradi = 0, hodnota = 0) {

	// přiřazení do globální proměnné
	var nazevPromenne = promenna + '[' + poradi + ']';
	eval(nazevPromenne + ' = ' + hodnota);

	// distribuce výjimky (zaklikává se na úrovni člověka) k oběma zaměstnavatelům
	if ( (promenna == 'prvniDospelyPrvniZamestnavatel') && (poradi == 4) ) {
		prvniDospelyDruhyZamestnavatel[4] = hodnota;
	}

	if ( (promenna == 'druhyDospelyPrvniZamestnavatel') && (poradi == 4) ) {
		druhyDospelyDruhyZamestnavatel[4] = hodnota;
	}

	if ( (promenna == 'tretiDospelyPrvniZamestnavatel') && (poradi == 4) ) {
		tretiDospelyDruhyZamestnavatel[4] = hodnota;
	}

	// radio button pro typ bydlení vypne ostatní typy
	if( (promenna == 'bydleni') && (poradi == 2) ) {
		bydleni[3] = false;
		bydleni[4] = false;
	}

	if( (promenna == 'bydleni') && (poradi == 3) ) {
		bydleni[2] = false;
		bydleni[4] = false;
	}

	if( (promenna == 'bydleni') && (poradi == 4) ) {
		bydleni[2] = false;
		bydleni[3] = false;
	}

	// dopočítávání globálních proměnných
	slozeniDomacnosti[4] = slozeniDomacnosti[0] + slozeniDomacnosti[1] + slozeniDomacnosti[2] + slozeniDomacnosti[3];

	// vyplnění složení v růžovém pruhu
	vypisSlozeni(promenna, poradi, hodnota);
	vypisSlozeni2(promenna, poradi, hodnota);

}


//EDITED START
function vypisSlozeni(promenna = '', poradi = 0, hodnota = 0) {

	var pocetSmluvDospeleho = 0;
	if (prvniDospelyPrvniZamestnavatel[1] == 0) {var prvniDospelyPrvniSmlouva = 'HPP'};
	if (prvniDospelyPrvniZamestnavatel[1] == 1) {var prvniDospelyPrvniSmlouva = 'DPČ'};
	if (prvniDospelyPrvniZamestnavatel[1] == 2) {var prvniDospelyPrvniSmlouva = 'DPP'};
	if (prvniDospelyDruhyZamestnavatel[1] == 0) {var prvniDospelyDruhaSmlouva = 'HPP'};
	if (prvniDospelyDruhyZamestnavatel[1] == 1) {var prvniDospelyDruhaSmlouva = 'DPČ'};
	if (prvniDospelyDruhyZamestnavatel[1] == 2) {var prvniDospelyDruhaSmlouva = 'DPP'};
	if (druhyDospelyPrvniZamestnavatel[1] == 0) {var druhyDospelyPrvniSmlouva = 'HPP'};
	if (druhyDospelyPrvniZamestnavatel[1] == 1) {var druhyDospelyPrvniSmlouva = 'DPČ'};
	if (druhyDospelyPrvniZamestnavatel[1] == 2) {var druhyDospelyPrvniSmlouva = 'DPP'};
	if (druhyDospelyDruhyZamestnavatel[1] == 0) {var druhyDospelyDruhaSmlouva = 'HPP'};
	if (druhyDospelyDruhyZamestnavatel[1] == 1) {var druhyDospelyDruhaSmlouva = 'DPČ'};
	if (druhyDospelyDruhyZamestnavatel[1] == 2) {var druhyDospelyDruhaSmlouva = 'DPP'};
	if (tretiDospelyPrvniZamestnavatel[1] == 0) {var tretiDospelyPrvniSmlouva = 'HPP'};
	if (tretiDospelyPrvniZamestnavatel[1] == 1) {var tretiDospelyPrvniSmlouva = 'DPČ'};
	if (tretiDospelyPrvniZamestnavatel[1] == 2) {var tretiDospelyPrvniSmlouva = 'DPP'};
	if (tretiDospelyDruhyZamestnavatel[1] == 0) {var tretiDospelyDruhaSmlouva = 'HPP'};
	if (tretiDospelyDruhyZamestnavatel[1] == 1) {var tretiDospelyDruhaSmlouva = 'DPČ'};
	if (tretiDospelyDruhyZamestnavatel[1] == 2) {var tretiDospelyDruhaSmlouva = 'DPP'};
	if (prvniDospelyPrvniZamestnavatel[2] || prvniDospelyDruhyZamestnavatel[2]) {var prvniDospelyZamestnavatel = 'ano'} else {var prvniDospelyZamestnavatel = 'ne'};
	if (druhyDospelyPrvniZamestnavatel[2] || druhyDospelyDruhyZamestnavatel[2]) {var druhyDospelyZamestnavatel = 'ano'} else {var druhyDospelyZamestnavatel = 'ne'};
	if (tretiDospelyPrvniZamestnavatel[2] || tretiDospelyDruhyZamestnavatel[2]) {var tretiDospelyZamestnavatel = 'ano'} else {var tretiDospelyZamestnavatel = 'ne'};
	if (bydleni[2]) {var jenajem = 'ano'} else {var jenajem = 'ne'};
	if (bydleni[3]) {var vlastnibyt = 'ano'} else {var vlastnibyt = 'ne'};
	if (bydleni[4]) {var ubytovna = 'ano'} else {var ubytovna = 'ne'};
	if (prvniDospelyExekuce[0] || prvniDospelyExekuce[1]) {var prvniExekuce = 'ano'} else {var prvniExekuce = 'ne'};
	if (druhyDospelyExekuce[0] || druhyDospelyExekuce[1]) {var druhyExekuce = 'ano'} else {var druhyExekuce = 'ne'};
	if (tretiDospelyExekuce[0] || tretiDospelyExekuce[1]) {var tretiExekuce = 'ano'} else {var tretiExekuce = 'ne'};

	var parametryDomacnosti = '<div><p class="pb-2"><span class="">Složení domácnosti: dospělí: </span>' + slozeniDomacnosti[0] + ', děti: ' + parseInt(slozeniDomacnosti[1] + slozeniDomacnosti[2] + slozeniDomacnosti[3]) + '</p>';
	parametryDomacnosti += '<p class="pb-2"><span class="weight-strong">Příjmy 1. dospělého: </span>';
	if (prvniDospelyPrvniZamestnavatel[0] > 0) {
		parametryDomacnosti += prvniDospelyPrvniSmlouva + ' ' + prvniDospelyPrvniZamestnavatel[0] + ' Kč';
		pocetSmluvDospeleho++;
	}
	if (prvniDospelyDruhyZamestnavatel[0] > 0 && pocetSmluvDospeleho > 0) {
		parametryDomacnosti += ', ' + prvniDospelyDruhaSmlouva + ' ' + prvniDospelyDruhyZamestnavatel[0] + ' Kč'
	}
	if (pocetSmluvDospeleho == 0) {
		parametryDomacnosti += '0 Kč'
	}
	pocetSmluvDospeleho = 0;
	parametryDomacnosti += '</p>';
	parametryDomacnosti += '<p class="pb-2"><span class="weight-strong">Příjmy 2. dospělého: </span>';
	if (druhyDospelyPrvniZamestnavatel[0] > 0) {
		parametryDomacnosti += druhyDospelyPrvniSmlouva + ' ' + druhyDospelyPrvniZamestnavatel[0] + ' Kč';
		pocetSmluvDospeleho++;
	}
	if (druhyDospelyDruhyZamestnavatel[0] > 0 && pocetSmluvDospeleho > 0) {
		parametryDomacnosti += ', ' + druhyDospelyDruhaSmlouva + ' ' + druhyDospelyDruhyZamestnavatel[0] + ' Kč'
	}
	if (pocetSmluvDospeleho == 0) {
		parametryDomacnosti += '0 Kč'
	}
	pocetSmluvDospeleho = 0;
	parametryDomacnosti += '</p>';
	parametryDomacnosti += '<p class="pb-2"><span class="weight-strong">Příjmy 3. dospělého: </span>';
	if (tretiDospelyPrvniZamestnavatel[0] > 0) {
		parametryDomacnosti += tretiDospelyPrvniSmlouva + ' ' + tretiDospelyPrvniZamestnavatel[0] + ' Kč';
		pocetSmluvDospeleho++;
	}
	if (tretiDospelyDruhyZamestnavatel[0] > 0 && pocetSmluvDospeleho > 0) {
		parametryDomacnosti += ', ' + tretiDospelyDruhaSmlouva + ' ' + tretiDospelyDruhyZamestnavatel[0] + ' Kč'
	}
	if (pocetSmluvDospeleho == 0) {
		parametryDomacnosti += '0 Kč'
	}
	pocetSmluvDospeleho = 0;
	parametryDomacnosti += '</p>';
	parametryDomacnosti += '<p class="pb-2"><span class="weight-strong">Další příjmy: </span>důchody: ' + parseInt(prvniDospelyDalsiPrijmy[0] + druhyDospelyDalsiPrijmy[0] + tretiDospelyDalsiPrijmy[0]) + ' Kč' +
											   ', rodičovská/mateřská: ' + parseInt(prvniDospelyDalsiPrijmy[1] + druhyDospelyDalsiPrijmy[1] + tretiDospelyDalsiPrijmy[1]) + ' Kč' +
											   ', podpora v nezaměstnanosti: ' + parseInt(prvniDospelyDalsiPrijmy[2] + druhyDospelyDalsiPrijmy[2] + tretiDospelyDalsiPrijmy[2]) + ' Kč' +
											   ', nemocenská: ' + parseInt(prvniDospelyDalsiPrijmy[3] + druhyDospelyDalsiPrijmy[3] + tretiDospelyDalsiPrijmy[3]) + ' Kč' +
											   ', ostatní: ' + parseInt(prvniDospelyDalsiPrijmy[4] + druhyDospelyDalsiPrijmy[4] + tretiDospelyDalsiPrijmy[4]) + ' Kč</p>';
	parametryDomacnosti += '<p class="pb-2"><span class="weight-strong">Bydlení: </span>nájem: ' + bydleni[0] +  ' Kč' + ', poplatky: ' + bydleni[1] +  ' Kč' + ', bydlí v nájmu: ' + jenajem +
											   ', vlastní byt: ' + vlastnibyt + ', ubytovna: ' + ubytovna + '</p>';
	parametryDomacnosti += '<p class="pb-2"><span class="weight-strong">Exekuce: </span>první dospělý: ' + prvniExekuce + ', druhý dospělý: ' +  druhyExekuce + ', třetí dospělý: '  + tretiExekuce + '</p></div>';

	document.getElementById("upperwindow").innerHTML = parametryDomacnosti;

}
//EDITED END

//EDITED START
function vypisSlozeni2(promenna = '', poradi = 0, hodnota = 0) {

	var pocetSmluvDospeleho = 0;
	if (prvniDospelyPrvniZamestnavatel[1] == 0) {var prvniDospelyPrvniSmlouva = 'HPP'};
	if (prvniDospelyPrvniZamestnavatel[1] == 1) {var prvniDospelyPrvniSmlouva = 'DPČ'};
	if (prvniDospelyPrvniZamestnavatel[1] == 2) {var prvniDospelyPrvniSmlouva = 'DPP'};
	if (prvniDospelyDruhyZamestnavatel[1] == 0) {var prvniDospelyDruhaSmlouva = 'HPP'};
	if (prvniDospelyDruhyZamestnavatel[1] == 1) {var prvniDospelyDruhaSmlouva = 'DPČ'};
	if (prvniDospelyDruhyZamestnavatel[1] == 2) {var prvniDospelyDruhaSmlouva = 'DPP'};
	if (druhyDospelyPrvniZamestnavatel[1] == 0) {var druhyDospelyPrvniSmlouva = 'HPP'};
	if (druhyDospelyPrvniZamestnavatel[1] == 1) {var druhyDospelyPrvniSmlouva = 'DPČ'};
	if (druhyDospelyPrvniZamestnavatel[1] == 2) {var druhyDospelyPrvniSmlouva = 'DPP'};
	if (druhyDospelyDruhyZamestnavatel[1] == 0) {var druhyDospelyDruhaSmlouva = 'HPP'};
	if (druhyDospelyDruhyZamestnavatel[1] == 1) {var druhyDospelyDruhaSmlouva = 'DPČ'};
	if (druhyDospelyDruhyZamestnavatel[1] == 2) {var druhyDospelyDruhaSmlouva = 'DPP'};
	if (tretiDospelyPrvniZamestnavatel[1] == 0) {var tretiDospelyPrvniSmlouva = 'HPP'};
	if (tretiDospelyPrvniZamestnavatel[1] == 1) {var tretiDospelyPrvniSmlouva = 'DPČ'};
	if (tretiDospelyPrvniZamestnavatel[1] == 2) {var tretiDospelyPrvniSmlouva = 'DPP'};
	if (tretiDospelyDruhyZamestnavatel[1] == 0) {var tretiDospelyDruhaSmlouva = 'HPP'};
	if (tretiDospelyDruhyZamestnavatel[1] == 1) {var tretiDospelyDruhaSmlouva = 'DPČ'};
	if (tretiDospelyDruhyZamestnavatel[1] == 2) {var tretiDospelyDruhaSmlouva = 'DPP'};
	if (prvniDospelyPrvniZamestnavatel[2] || prvniDospelyDruhyZamestnavatel[2]) {var prvniDospelyZamestnavatel = 'ano'} else {var prvniDospelyZamestnavatel = 'ne'};
	if (druhyDospelyPrvniZamestnavatel[2] || druhyDospelyDruhyZamestnavatel[2]) {var druhyDospelyZamestnavatel = 'ano'} else {var druhyDospelyZamestnavatel = 'ne'};
	if (tretiDospelyPrvniZamestnavatel[2] || tretiDospelyDruhyZamestnavatel[2]) {var tretiDospelyZamestnavatel = 'ano'} else {var tretiDospelyZamestnavatel = 'ne'};
	if (bydleni[2]) {var jenajem = 'ano'} else {var jenajem = 'ne'};
	if (bydleni[3]) {var vlastnibyt = 'ano'} else {var vlastnibyt = 'ne'};
	if (bydleni[4]) {var ubytovna = 'ano'} else {var ubytovna = 'ne'};
	if (prvniDospelyExekuce[0] || prvniDospelyExekuce[1]) {var prvniExekuce = 'ano'} else {var prvniExekuce = 'ne'};
	if (druhyDospelyExekuce[0] || druhyDospelyExekuce[1]) {var druhyExekuce = 'ano'} else {var druhyExekuce = 'ne'};
	if (tretiDospelyExekuce[0] || tretiDospelyExekuce[1]) {var tretiExekuce = 'ano'} else {var tretiExekuce = 'ne'};

	var parametryDomacnosti = '<div><p class="mb-0"><span class="">Složení domácnosti: dospělí: </span>' + slozeniDomacnosti[0] + ', děti: ' + parseInt(slozeniDomacnosti[1] + slozeniDomacnosti[2] + slozeniDomacnosti[3]) + '</p>';
	parametryDomacnosti += '<p class="mb-0"><span class="weight-strong">Příjmy 1. dospělého: </span>';
	if (prvniDospelyPrvniZamestnavatel[0] > 0) {
		parametryDomacnosti += prvniDospelyPrvniSmlouva + ' ' + prvniDospelyPrvniZamestnavatel[0] + ' Kč';
		pocetSmluvDospeleho++;
	}
	if (prvniDospelyDruhyZamestnavatel[0] > 0 && pocetSmluvDospeleho > 0) {
		parametryDomacnosti += ', ' + prvniDospelyDruhaSmlouva + ' ' + prvniDospelyDruhyZamestnavatel[0] + ' Kč'
	}
	if (pocetSmluvDospeleho == 0) {
		parametryDomacnosti += '0 Kč'
	}
	pocetSmluvDospeleho = 0;
	parametryDomacnosti += '</p>';
	parametryDomacnosti += '<p class="mb-0"><span class="weight-strong">Příjmy 2. dospělého: </span>';
	if (druhyDospelyPrvniZamestnavatel[0] > 0) {
		parametryDomacnosti += druhyDospelyPrvniSmlouva + ' ' + druhyDospelyPrvniZamestnavatel[0] + ' Kč';
		pocetSmluvDospeleho++;
	}
	if (druhyDospelyDruhyZamestnavatel[0] > 0 && pocetSmluvDospeleho > 0) {
		parametryDomacnosti += ', ' + druhyDospelyDruhaSmlouva + ' ' + druhyDospelyDruhyZamestnavatel[0] + ' Kč'
	}
	if (pocetSmluvDospeleho == 0) {
		parametryDomacnosti += '0 Kč'
	}
	pocetSmluvDospeleho = 0;
	parametryDomacnosti += '</p>';
	parametryDomacnosti += '<p class="mb-0"><span class="weight-strong">Příjmy 3. dospělého: </span>';
	if (tretiDospelyPrvniZamestnavatel[0] > 0) {
		parametryDomacnosti += tretiDospelyPrvniSmlouva + ' ' + tretiDospelyPrvniZamestnavatel[0] + ' Kč';
		pocetSmluvDospeleho++;
	}
	if (tretiDospelyDruhyZamestnavatel[0] > 0 && pocetSmluvDospeleho > 0) {
		parametryDomacnosti += ', ' + tretiDospelyDruhaSmlouva + ' ' + tretiDospelyDruhyZamestnavatel[0] + ' Kč'
	}
	if (pocetSmluvDospeleho == 0) {
		parametryDomacnosti += '0 Kč'
	}
	pocetSmluvDospeleho = 0;
	parametryDomacnosti += '</p>';
	parametryDomacnosti += '<p class="mb-0"><span class="weight-strong">Další příjmy: </span>důchody: ' + parseInt(prvniDospelyDalsiPrijmy[0] + druhyDospelyDalsiPrijmy[0] + tretiDospelyDalsiPrijmy[0]) + ' Kč' +
											   ', rodičovská/mateřská: ' + parseInt(prvniDospelyDalsiPrijmy[1] + druhyDospelyDalsiPrijmy[1] + tretiDospelyDalsiPrijmy[1]) + ' Kč' +
											   ', podpora v nezaměstnanosti: ' + parseInt(prvniDospelyDalsiPrijmy[2] + druhyDospelyDalsiPrijmy[2] + tretiDospelyDalsiPrijmy[2]) + ' Kč' +
											   ', nemocenská: ' + parseInt(prvniDospelyDalsiPrijmy[3] + druhyDospelyDalsiPrijmy[3] + tretiDospelyDalsiPrijmy[3]) + ' Kč' +
											   ', ostatní: ' + parseInt(prvniDospelyDalsiPrijmy[4] + druhyDospelyDalsiPrijmy[4] + tretiDospelyDalsiPrijmy[4]) + ' Kč</p>';
	parametryDomacnosti += '<p class="mb-0"><span class="weight-strong">Bydlení: </span>nájem: ' + bydleni[0] +  ' Kč' + ', poplatky: ' + bydleni[1] +  ' Kč' + ', bydlí v nájmu: ' + jenajem +
											   ', vlastní byt: ' + vlastnibyt + ', ubytovna: ' + ubytovna + '</p>';
	parametryDomacnosti += '<p class="mb-0"><span class="weight-strong">Exekuce: </span>první dospělý: ' + prvniExekuce + ', druhý dospělý: ' +  druhyExekuce + ', třetí dospělý: '  + tretiExekuce + '</p></div>';

	document.getElementById("upperwindow2").innerHTML = parametryDomacnosti;

}
//EDITED END

// je potřeba změnit proměnné

function statickyModelujRodinu() {

	var prijmyAVydajeRodinyPoZapocteniDavek = spocitejPrijmyAVydajeRodinyPoZapocteniDavek();

	var text = "<p class='uppercase col-12 mb-0 pl-0 font-20 mb-4' >ČISTÝ DISPONIBILNÍ PŘÍJEM DOMÁCNOSTI <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[54] + " Kč</strong></p>"

		text += "<p class='weight-strong uppercase col-12 mb-0 pl-0 font-18' >PŘÍJMY 1. DOSPĚLÝ</p>"

		text +="<article class='row col-12 pl-4 pt-4'>"
		text +="<p class='uppercase col-12 weight-strong mb-2'>Příjmy ze zaměstnání</p>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Čistý příjem z prvního zaměstnání <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[19] + " Kč</strong></p></div>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Čistý příjem z druhého zaměstnání <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[20] + " Kč</strong></p></div>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Daňový bonus <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[22] + " Kč</strong></p></div>"
		text +="<p class='uppercase col-12 weight-strong mt-4'>Další příjmy, které se počítají do příjmu pro výpočet exekucí</p>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Rodičovská / Mateřská <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[23] + " Kč</strong></p></div>"
		text +="<div class='col-12 pr-0 d-flex flex-row align-items-center pb-2'><p class='pr-0 mb-0'>- Pojistné dávky: důchody, podpora v nezaměstnanosti, nemocenská <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[24] + " Kč</strong></p></div>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Jiné příjmy <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[25] + " Kč</strong></p></div>"
		text +="<p class='uppercase col-12 weight-strong mt-2'>Exekuční srážky <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[26] + " Kč</strong></p></div>"
		text +="<p class='uppercase col-12 weight-strong mt-0'>Čistý příjem po exekuci <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[27] + " Kč</strong></p></div>"
		text +="</article>"


		text +="<p class='weight-strong uppercase col-12 mb-0 pl-0 font-18 mt-5' >PŘÍJMY 2. DOSPĚLÝ</p>"
		text +="<article class='row col-12 pl-4 pt-4'>"
		text +="<p class='uppercase col-12 weight-strong mb-2'>Příjmy ze zaměstnání</p>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Čistý příjem z prvního zaměstnání <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[28] + " Kč</strong></p></div>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Čistý příjem z druhého zaměstnání <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[29] + " Kč</strong></p></div>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Daňový bonus <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[31] + " Kč</strong></p></div>"
		text +="<p class='uppercase col-12 weight-strong mt-4'>Další příjmy, které se počítají do příjmu pro výpočet exekucí</p>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Rodičovská / Mateřská <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[32] + " Kč</strong></p></div>"
		text +="<div class='col-12 pr-0 d-flex flex-row align-items-center pb-2'><p class='pr-0 mb-0'>- Pojistné dávky: důchody, podpora v nezaměstnanosti, nemocenská <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[33] + " Kč</strong></p></div>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Jiné příjmy <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[34] + " Kč</strong></p></div>"
		text +="<p class='uppercase col-12 weight-strong mt-2'>Exekuční srážky <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[35] + " Kč</strong></p></div>"
		text +="<p class='uppercase col-12 weight-strong mt-0'>Čistý příjem po exekuci <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[36] + " Kč</strong></p></div>"
		text +="</article>"



		text +="<p class='weight-strong uppercase col-12 mb-0 pl-0 font-18 mt-5' >PŘÍJMY 3. DOSPĚLÝ</p>"
		text +="<article class='row col-12 pl-4 pt-4'>"
		text +="<p class='uppercase col-12 weight-strong mb-2'>Příjmy ze zaměstnání</p>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Čistý příjem z prvního zaměstnání <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[37] + " Kč</strong></p></div>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Čistý příjem z druhého zaměstnání <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[38] + " Kč</strong></p></div>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Daňový bonus <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[40] + " Kč</strong></p></div>"
		text +="<p class='uppercase col-12 weight-strong mt-4'>Další příjmy, které se počítají do příjmu pro výpočet exekucí</p>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Rodičovská / Mateřská <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[41] + " Kč</strong></p></div>"
		text +="<div class='col-12 pr-0 d-flex flex-row align-items-center pb-2'><p class='pr-0 mb-0'>- Pojistné dávky: důchody, podpora v nezaměstnanosti, nemocenská <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[42] + " Kč</strong></p></div>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Jiné příjmy <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[43] + " Kč</strong></p></div>"
		text +="<p class='uppercase col-12 weight-strong mt-2'>Exekuční srážky <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[44] + " Kč</strong></p></div>"
		text +="<p class='uppercase col-12 weight-strong mt-0'>Čistý příjem po exekuci <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[45] + " Kč</strong></p></div>"
		text +="</article>"



		text +="<p class='weight-strong uppercase col-12 mb-0 pl-0 font-18 mt-5' >NÁROK DOMÁCNOSTI NA SOCIÁLNÍ DÁVKY </p>"
		text +="<article class='row col-12 pl-4 pt-4'>"
		text +="<p class='uppercase col-12 weight-strong'>Dávky státní sociální podpory</p>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Přídavky na děti <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[46] + " Kč</strong></p></div>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Příspěvek na bydlení <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[47] + " Kč</strong></p></div>"
		text +="<p class='uppercase col-12 weight-strong mt-3'>Dávky v hmotné nouzi</p>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Příspěvek na živobytí <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[48] + " Kč</strong></p></div>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Doplatek na bydlení <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[49] + " Kč</strong></p></div>"
		text +="<p class='uppercase col-12 weight-strong mt-3'>Celkem dávky <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[50] + " Kč</strong></p></div>"
		text +="</article>"



		text +="<p class='weight-strong uppercase col-12 mb-0 pl-0 font-18 mt-5' >VÝDAJE DOMÁCNOSTI</p>"
		text +="<article class='row col-12 pl-4 pt-4'>"
		text +="<p class='uppercase col-12 weight-strong'>Výdaje, které jsou zohledněny při výpočtu dávek</p>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Nájem <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[51] + " Kč</strong></p></div>"
		text +="<div class='col-12 d-flex flex-row align-items-center pb-2'><p class='pr-2 mb-0'>- Služby a poplatky <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[52] + " Kč</strong></p></div>"
		text +="<p class='uppercase col-12 weight-strong mt-3 d-none'>Výdaje, které nejsou zohledněny při výpočtu dávek</p>"
		text +="<p class='uppercase col-12 weight-strong mt-3'>Celkem výdaje <strong>" + prijmyAVydajeRodinyPoZapocteniDavek[53] + " Kč</strong></p></div>"
		text +="</article>"

	document.getElementById("mainwindow").innerHTML = text;

}











