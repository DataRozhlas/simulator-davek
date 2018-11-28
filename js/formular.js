//ED
function vyplnSlozeniDomacnosti() {

	var text = '<div class="mw-text">';
	text += '<h2>Složení domácnosti</h2>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Počet dospělých</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="3" id="pocetDospelych" onchange="prepisFormular(\'slozeniDomacnosti\', \'0\', this.value)"</div>';
	text += '</div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Počet dětí do 6 let</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="5" id="pocetDetiPod6" onchange="prepisFormular(\'slozeniDomacnosti\', \'1\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Počet dětí od 6 do 15 let</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="5" id="pocetDeti6Az15" onchange="prepisFormular(\'slozeniDomacnosti\', \'2\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Počet nezaopatřených dětí od 15 do 26 let</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="5" id="pocetDeti15Az26" onchange="prepisFormular(\'slozeniDomacnosti\', \'3\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Počet členů domácnosti s trvalým bydlištěm jinde</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="18" id="trvaleBydlisteJinde" onchange="prepisFormular(\'slozeniDomacnosti\', \'5\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Počet členů domácnosti se sníženým životním minimem na existenční</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="3" id="snizeneZivotniMinimum" onchange="prepisFormular(\'socialOptional\', \'0\', this.value)"></div>';
	text += '</div>';

	document.getElementById("mainwindow").innerHTML = text;

	document.getElementById("pocetDospelych").value = slozeniDomacnosti[0];
	document.getElementById("pocetDetiPod6").value = slozeniDomacnosti[1];
	document.getElementById("pocetDeti6Az15").value = slozeniDomacnosti[2];
	document.getElementById("pocetDeti15Az26").value = slozeniDomacnosti[3];
	document.getElementById("trvaleBydlisteJinde").value = slozeniDomacnosti[5];
	document.getElementById("snizeneZivotniMinimum").value = socialOptional[0];

}
//IT

//ED
function vyplnPrijmyPrvnihoDospeleho() {

	var text = '<div class="mw-text">';

	text += '<div id="mw-text-1">';
	text += '<h2>Příjmy prvního dospělého</h2>';
	text += '<div class="formrow">';
	text += '<div class="formrowradiodetail"><input novalidate type="checkbox" id="prvniDospelyPrvniZamestnavatelVyjimka" onclick="prepisFormular(\'prvniDospelyPrvniZamestnavatel\', \'4\', this.checked)">Student/důchodce/pečující o dítě/postižený </div>'
	text += '</div>';
	text += '<h3>První zaměstnavatel</h3>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="50000" step="1000" id="prvniDospelyPrvniZamestnavatelPrijem" onchange="prepisFormular(\'prvniDospelyPrvniZamestnavatel\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Typ smlouvy</div>';
	text += '<select class="typsmlouvyform" id="prvniDospelyPrvniZamestnavatelTypSmlouvy" onchange="prepisFormular(\'prvniDospelyPrvniZamestnavatel\', \'1\', this.value)">';
  	text += '<option value="0">HPP</option>';
  	text += '<option value="1">DPČ</option>';
  	text += '<option value="2">DPP</option>';
	text += '</select>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowradiomain"><input novalidate type="checkbox" id="prvniDospelyPrvniZamestnavatelRuzovyPapir" onclick="prepisFormular(\'prvniDospelyPrvniZamestnavatel\', \'2\', this.checked)">Prohlášení k dani u tohoto zaměstnavatele </div>'
	text += '</div>';
	text += '<div class="formrow taxbonus" id="prvniDospelyPrvniZamestnavatelVyzivovaneDetiForm" style="visibility: hidden;">';
	text += '<div class="formrowtext">Počet dětí k daňovému bonusu</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="10" id="prvniDospelyPrvniZamestnavatelVyzivovaneDeti" onchange="prepisFormular(\'prvniDospelyPrvniZamestnavatel\', \'3\', this.value)"></div>';
	text += '</div>';
	text += '</div>';
	text += '<div id="mw-text-2">';
	text += '<div><button class="mw-button" type="button" onclick="pridejZamestnavatelePrvnihoDospeleho()"><span>+</span> další zaměstnavatel</button></div>';
	text += '</div>';
	text += '<div id="mw-text-3">';
	text += '<div><button class="mw-button" type="button" onclick="pridejDalsiPrijmyPrvnihoDospeleho()"><span>+</span> jiné příjmy</button></div>';
	text += '</div>';
	text += '</div>';

	document.getElementById("mainwindow").innerHTML = text;

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

}
//IT

//ED
function pridejZamestnavatelePrvnihoDospeleho() {

	var text = '<h3>Druhý zaměstnavatel</h3>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="50000" step="1000" id="prvniDospelyDruhyZamestnavatelPrijem" onchange="prepisFormular(\'prvniDospelyDruhyZamestnavatel\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Typ smlouvy</div>';
	text += '<select class="typsmlouvyform" id="prvniDospelyDruhyZamestnavatelTypSmlouvy" onchange="prepisFormular(\'prvniDospelyDruhyZamestnavatel\', \'1\', this.value)">';
  	text += '<option value="0">HPP</option>';
  	text += '<option value="1">DPČ</option>';
  	text += '<option value="2">DPP</option>';
	text += '</select>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowradiomain"><input novalidate type="checkbox" id="prvniDospelyDruhyZamestnavatelRuzovyPapir" onclick="prepisFormular(\'prvniDospelyDruhyZamestnavatel\', \'2\', this.checked)">Prohlášení k dani u tohoto zaměstnavatele </div>'
	text += '</div>';
	text += '<div class="formrow taxbonus" id="prvniDospelyDruhyZamestnavatelVyzivovaneDetiForm" style="visibility: hidden;">';
	text += '<div class="formrowtext">Počet dětí k daňovému bonusu</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="10" id="prvniDospelyDruhyZamestnavatelVyzivovaneDeti" onchange="prepisFormular(\'prvniDospelyDruhyZamestnavatel\', \'3\', this.value)"></div>';
	text += '</div>';

	document.getElementById("mw-text-2").innerHTML = text;

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

}
//IT

//ED
function pridejDalsiPrijmyPrvnihoDospeleho() {

	var text = '<h3>Jiné příjmy</h3>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Důchod</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="20000" step="1000" id="prvniDospelyDuchody" onchange="prepisFormular(\'prvniDospelyDalsiPrijmy\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Rodičovská</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="20000" step="1000" id="prvniDospelyRodicovska" onchange="prepisFormular(\'prvniDospelyDalsiPrijmy\', \'1\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Podpora v nezaměstnanosti</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="20000" step="1000" id="prvniDospelyPodporaVNezamestnanosti" onchange="prepisFormular(\'prvniDospelyDalsiPrijmy\', \'2\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Nemocenská</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="10000" step="1000" id="prvniDospelyNemocenska" onchange="prepisFormular(\'prvniDospelyDalsiPrijmy\', \'3\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Ostatní</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="10000" step="1000" id="prvniDospelyOstatniPrijmy" onchange="prepisFormular(\'prvniDospelyDalsiPrijmy\', \'4\', this.value)"></div>';
	text += '</div>';

	document.getElementById("mw-text-3").innerHTML = text;

	// vyplnění z globálních proměnných
	document.getElementById("prvniDospelyDuchody").value = prvniDospelyDalsiPrijmy[0];
	document.getElementById("prvniDospelyRodicovska").value = prvniDospelyDalsiPrijmy[1];
	document.getElementById("prvniDospelyPodporaVNezamestnanosti").value = prvniDospelyDalsiPrijmy[2];
	document.getElementById("prvniDospelyNemocenska").value = prvniDospelyDalsiPrijmy[3];
	document.getElementById("prvniDospelyOstatniPrijmy").value = prvniDospelyDalsiPrijmy[4];

}
//IT

//ED
function vyplnPrijmyDruhehoDospeleho() {

	var text = '<div class="mw-text">';

	text += '<div id="mw-text-1">';
	text += '<h2>Příjmy druhého dospělého</h2>';
	text += '<div class="formrow">';
	text += '<div class="formrowradiodetail"><input novalidate type="checkbox" id="druhyDospelyPrvniZamestnavatelVyjimka" onclick="prepisFormular(\'druhyDospelyPrvniZamestnavatel\', \'4\', this.checked)">Student/důchodce/pečující o dítě/postižený </div>'
	text += '</div>';
	text += '<h3>První zaměstnavatel</h3>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="50000" step="1000" id="druhyDospelyPrvniZamestnavatelPrijem" onchange="prepisFormular(\'druhyDospelyPrvniZamestnavatel\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Typ smlouvy</div>';
	text += '<select class="typsmlouvyform" id="druhyDospelyPrvniZamestnavatelTypSmlouvy" onchange="prepisFormular(\'druhyDospelyPrvniZamestnavatel\', \'1\', this.value)">';
  	text += '<option value="0">HPP</option>';
  	text += '<option value="1">DPČ</option>';
  	text += '<option value="2">DPP</option>';
	text += '</select>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowradiomain"><input novalidate type="checkbox" id="druhyDospelyPrvniZamestnavatelRuzovyPapir" onclick="prepisFormular(\'druhyDospelyPrvniZamestnavatel\', \'2\', this.checked)">Prohlášení k dani u tohoto zaměstnavatele </div>'
	text += '</div>';
	text += '<div class="formrow taxbonus" id="druhyDospelyPrvniZamestnavatelVyzivovaneDetiForm" style="visibility: hidden;">';
	text += '<div class="formrowtext">Počet dětí k daňovému bonusu</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="10" id="druhyDospelyPrvniZamestnavatelVyzivovaneDeti" onchange="prepisFormular(\'druhyDospelyPrvniZamestnavatel\', \'3\', this.value)"></div>';
	text += '</div>';
	text += '</div>';
	text += '<div id="mw-text-2">';
	text += '<div><button class="mw-button" type="button" onclick="pridejZamestnavateleDruhehoDospeleho()"><span>+</span> další zaměstnavatel</button></div>';
	text += '</div>';
	text += '<div id="mw-text-3">';
	text += '<div><button class="mw-button" type="button" onclick="pridejDalsiPrijmyDruhehoDospeleho()"><span>+</span> jiné příjmy</button></div>';
	text += '</div>';
	text += '</div>';

	document.getElementById("mainwindow").innerHTML = text;

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
		document.getElementById("druhyDospelyDruhyZamestnavatelRuzovyPapir").checked = false;
		document.getElementById("druhyDospelyDruhyZamestnavatelVyzivovaneDetiForm").style.visibility = "hidden";
		druhyDospelyDruhyZamestnavatel[2] = false;
		prvniDospelyPrvniZamestnavatel[3] = 0;
		prvniDospelyDruhyZamestnavatel[3] = 0;
		druhyDospelyDruhyZamestnavatel[3] = 0;
		tretiDospelyPrvniZamestnavatel[3] = 0;
		tretiDospelyDruhyZamestnavatel[3] = 0;


	};

}
//IT

//ED
function pridejZamestnavateleDruhehoDospeleho() {

	var text = '<h3>Druhý zaměstnavatel</h3>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="50000" step="1000" id="druhyDospelyDruhyZamestnavatelPrijem" onchange="prepisFormular(\'druhyDospelyDruhyZamestnavatel\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Typ smlouvy</div>';
	text += '<select class="typsmlouvyform" id="druhyDospelyDruhyZamestnavatelTypSmlouvy" onchange="prepisFormular(\'druhyDospelyDruhyZamestnavatel\', \'1\', this.value)">';
	text += '<option value="0">HPP</option>';
	text += '<option value="1">DPČ</option>';
	text += '<option value="2">DPP</option>';
	text += '</select>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowradiomain"><input novalidate type="checkbox" id="druhyDospelyDruhyZamestnavatelRuzovyPapir" onclick="prepisFormular(\'druhyDospelyDruhyZamestnavatel\', \'2\', this.checked)">Prohlášení k dani u tohoto zaměstnavatele </div>'
	text += '</div>';
	text += '<div class="formrow taxbonus" id="druhyDospelyDruhyZamestnavatelVyzivovaneDetiForm" style="visibility: hidden;">';
	text += '<div class="formrowtext">Počet dětí k daňovému bonusu</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="10" id="druhyDospelyDruhyZamestnavatelVyzivovaneDeti" onchange="prepisFormular(\'druhyDospelyDruhyZamestnavatel\', \'3\', this.value)"></div>';
	text += '</div>';

	document.getElementById("mw-text-2").innerHTML = text;

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

}
//IT

//ED
function pridejDalsiPrijmyDruhehoDospeleho() {

	var text = '<h3>Jiné příjmy</h3>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Důchod</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="20000" step="1000" id="druhyDospelyDuchody" onchange="prepisFormular(\'druhyDospelyDalsiPrijmy\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Rodičovská</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="20000" step="1000" id="druhyDospelyRodicovska" onchange="prepisFormular(\'druhyDospelyDalsiPrijmy\', \'1\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Podpora v nezaměstnanosti</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="20000" step="1000" id="druhyDospelyPodporaVNezamestnanosti" onchange="prepisFormular(\'druhyDospelyDalsiPrijmy\', \'2\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Nemocenská</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="10000" step="1000" id="druhyDospelyNemocenska" onchange="prepisFormular(\'druhyDospelyDalsiPrijmy\', \'3\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Ostatní</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="10000" step="1000" id="druhyDospelyOstatniPrijmy" onchange="prepisFormular(\'druhyDospelyDalsiPrijmy\', \'4\', this.value)"></div>';
	text += '</div>';

	document.getElementById("mw-text-3").innerHTML = text;

	// vyplnění z globálních proměnných
	document.getElementById("druhyDospelyDuchody").value = druhyDospelyDalsiPrijmy[0];
	document.getElementById("druhyDospelyRodicovska").value = druhyDospelyDalsiPrijmy[1];
	document.getElementById("druhyDospelyPodporaVNezamestnanosti").value = druhyDospelyDalsiPrijmy[2];
	document.getElementById("druhyDospelyNemocenska").value = druhyDospelyDalsiPrijmy[3];
	document.getElementById("druhyDospelyOstatniPrijmy").value = druhyDospelyDalsiPrijmy[4];

}
//IT

//ED
function vyplnPrijmyTretihoDospeleho() {

	var text = '<div class="mw-text">';

	text += '<div id="mw-text-1">';
	text += '<h2>Příjmy třetího dospělého</h2>';
	text += '<div class="formrow">';
	text += '<div class="formrowradiodetail"><input novalidate type="checkbox" id="tretiDospelyPrvniZamestnavatelVyjimka" onclick="prepisFormular(\'tretiDospelyPrvniZamestnavatel\', \'4\', this.checked)">Student/důchodce/pečující o dítě/postižený </div>'
	text += '</div>';
	text += '<h3>První zaměstnavatel</h3>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="50000" step="1000" id="tretiDospelyPrvniZamestnavatelPrijem" onchange="prepisFormular(\'tretiDospelyPrvniZamestnavatel\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Typ smlouvy</div>';
	text += '<select class="typsmlouvyform" id="tretiDospelyPrvniZamestnavatelTypSmlouvy" onchange="prepisFormular(\'tretiDospelyPrvniZamestnavatel\', \'1\', this.value)">';
  	text += '<option value="0">HPP</option>';
  	text += '<option value="1">DPČ</option>';
  	text += '<option value="2">DPP</option>';
	text += '</select>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowradiomain"><input novalidate type="checkbox" id="tretiDospelyPrvniZamestnavatelRuzovyPapir" onclick="prepisFormular(\'tretiDospelyPrvniZamestnavatel\', \'2\', this.checked)">Prohlášení k dani u tohoto zaměstnavatele </div>'
	text += '</div>';
	text += '<div class="formrow taxbonus" id="tretiDospelyPrvniZamestnavatelVyzivovaneDetiForm" style="visibility: hidden;">';
	text += '<div class="formrowtext">Počet dětí k daňovému bonusu</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="10" id="tretiDospelyPrvniZamestnavatelVyzivovaneDeti" onchange="prepisFormular(\'tretiDospelyPrvniZamestnavatel\', \'3\', this.value)"></div>';
	text += '</div>';
	text += '</div>';
	text += '<div id="mw-text-2">';
	text += '<div><button class="mw-button" type="button" onclick="pridejZamestnavateleTretihoDospeleho()"><span>+</span> další zaměstnavatel</button></div>';
	text += '</div>';
	text += '<div id="mw-text-3">';
	text += '<div><button class="mw-button" type="button" onclick="pridejDalsiPrijmyTretihoDospeleho()"><span>+</span> jiné příjmy</button></div>';
	text += '</div>';
	text += '</div>';

	document.getElementById("mainwindow").innerHTML = text;

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

}
//IT

//ED
function pridejZamestnavateleTretihoDospeleho() {

	var text = '<h3>Druhý zaměstnavatel</h3>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="50000" step="1000" id="tretiDospelyDruhyZamestnavatelPrijem" onchange="prepisFormular(\'tretiDospelyDruhyZamestnavatel\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Typ smlouvy</div>';
	text += '<select class="typsmlouvyform" id="tretiDospelyDruhyZamestnavatelTypSmlouvy" onchange="prepisFormular(\'tretiDospelyDruhyZamestnavatel\', \'1\', this.value)">';
	text += '<option value="0">HPP</option>';
	text += '<option value="1">DPČ</option>';
	text += '<option value="2">DPP</option>';
	text += '</select>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowradiomain"><input novalidate type="checkbox" id="tretiDospelyDruhyZamestnavatelRuzovyPapir" onclick="prepisFormular(\'tretiDospelyDruhyZamestnavatel\', \'2\', this.checked)">Prohlášení k dani u tohoto zaměstnavatele </div>'
	text += '</div>';
	text += '<div class="formrow taxbonus" id="tretiDospelyDruhyZamestnavatelVyzivovaneDetiForm" style="visibility: hidden;">';
	text += '<div class="formrowtext">Počet dětí k daňovému bonusu</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="10" id="tretiDospelyDruhyZamestnavatelVyzivovaneDeti" onchange="prepisFormular(\'tretiDospelyDruhyZamestnavatel\', \'3\', this.value)"></div>';
	text += '</div>';

	document.getElementById("mw-text-2").innerHTML = text;

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

}
//IT

//ED
function pridejDalsiPrijmyTretihoDospeleho() {

	var text = '<h3>Jiné příjmy</h3>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Důchod</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="20000" step="1000" id="tretiDospelyDuchody" onchange="prepisFormular(\'tretiDospelyDalsiPrijmy\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Rodičovská</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="20000" step="1000" id="tretiDospelyRodicovska" onchange="prepisFormular(\'tretiDospelyDalsiPrijmy\', \'1\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Podpora v nezaměstnanosti</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="20000" step="1000" id="tretiDospelyPodporaVNezamestnanosti" onchange="prepisFormular(\'tretiDospelyDalsiPrijmy\', \'2\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Nemocenská</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="10000" step="1000" id="tretiDospelyNemocenska" onchange="prepisFormular(\'tretiDospelyDalsiPrijmy\', \'3\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Ostatní</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="10000" step="1000" id="tretiDospelyOstatniPrijmy" onchange="prepisFormular(\'tretiDospelyDalsiPrijmy\', \'4\', this.value)"></div>';
	text += '</div>';

	document.getElementById("mw-text-3").innerHTML = text;

	// vyplnění z globálních proměnných
	document.getElementById("tretiDospelyDuchody").value = tretiDospelyDalsiPrijmy[0];
	document.getElementById("tretiDospelyRodicovska").value = tretiDospelyDalsiPrijmy[1];
	document.getElementById("tretiDospelyPodporaVNezamestnanosti").value = tretiDospelyDalsiPrijmy[2];
	document.getElementById("tretiDospelyNemocenska").value = tretiDospelyDalsiPrijmy[3];
	document.getElementById("tretiDospelyOstatniPrijmy").value = tretiDospelyDalsiPrijmy[4];

}
//IT

//ED
function vyplnExekuce() {

	var text = '<div class="mw-text">';
	text += '<h2>Exekuce</h2>';
	text += '<h3>První dospělý</h3>'
	text += '<div class="formrow" id="prvniDospelyPrednostniExekuceForm">';
	text += '<div class="formrowradiomain"><input novalidate type="checkbox" id="prvniDospelyPrednostniExekuce" onclick="prepisFormular(\'prvniDospelyExekuce\', \'0\', this.checked)">Přednostní exekuce </div>'
	text += '</div>';
	text += '<div class="formrow" id="prvniDospelyNeprednostniExekuceForm">';
	text += '<div class="formrowradiomain"><input novalidate type="checkbox" id="prvniDospelyNeprednostniExekuce" onclick="prepisFormular(\'prvniDospelyExekuce\', \'1\', this.checked)">Nepřednostní exekuce </div>'
	text += '</div>';
	text += '<div class="formrow taxbonus" id="prvniDospelyDalsiVyzivovaneOsobyForm" style="visibility: hidden;">';
	text += '<div class="formrowtext">Další vyživované osoby</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="10" id="prvniDospelyDalsiVyzivovaneOsoby" onchange="prepisFormular(\'prvniDospelyExekuce\', \'2\', this.value)"></div>';
	text += '</div>';
	text += '<h3>Druhý dospělý</h3>'
	text += '<div class="formrow" id="druhyDospelyPrednostniExekuceForm">';
	text += '<div class="formrowradiomain"><input novalidate type="checkbox" id="druhyDospelyPrednostniExekuce" onclick="prepisFormular(\'druhyDospelyExekuce\', \'0\', this.checked)">Přednostní exekuce </div>'
	text += '</div>';
	text += '<div class="formrow" id="druhyDospelyNeprednostniExekuceForm">';
	text += '<div class="formrowradiomain"><input novalidate type="checkbox" id="druhyDospelyNeprednostniExekuce" onclick="prepisFormular(\'druhyDospelyExekuce\', \'1\', this.checked)">Nepřednostní exekuce </div>'
	text += '</div>';
	text += '<div class="formrow taxbonus" id="druhyDospelyDalsiVyzivovaneOsobyForm" style="visibility: hidden;">';
	text += '<div class="formrowtext">Další vyživované osoby</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="10" id="druhyDospelyDalsiVyzivovaneOsoby" onchange="prepisFormular(\'druhyDospelyExekuce\', \'2\', this.value)"></div>';
	text += '</div>';
	text += '<h3>Třetí dospělý</h3>'
	text += '<div class="formrow" id="tretiDospelyPrednostniExekuceForm">';
	text += '<div class="formrowradiomain"><input novalidate type="checkbox" id="tretiDospelyPrednostniExekuce" onclick="prepisFormular(\'tretiDospelyExekuce\', \'0\', this.checked)">Přednostní exekuce </div>'
	text += '</div>';
	text += '<div class="formrow" id="tretiDospelyNeprednostniExekuceForm">';
	text += '<div class="formrowradiomain"><input novalidate type="checkbox" id="tretiDospelyNeprednostniExekuce" onclick="prepisFormular(\'tretiDospelyExekuce\', \'1\', this.checked)">Nepřednostní exekuce </div>'
	text += '</div>';
	text += '<div class="formrow taxbonus" id="tretiDospelyDalsiVyzivovaneOsobyForm" style="visibility: hidden;">';
	text += '<div class="formrowtext">Další vyživované osoby</div>';
	text += '<div class="formrowinput"><input novalidate class="inputnr" type="number" min="0" max="10" id="tretiDospelyDalsiVyzivovaneOsoby" onchange="prepisFormular(\'tretiDospelyExekuce\', \'2\', this.value)"></div>';
	text += '</div>';

	document.getElementById("mainwindow").innerHTML = text;

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

}
//IT

//ED
function vyplnNakladyNaBydleni() {

	var text = '<div class="mw-text">';
	text += '<h2>Náklady na bydlení</h2>';
	text += '<div class="formrow">';
	text += '<div class="formrowtextfirst">Typ bydlení</div>';
	text += '<div class="formrowradiodetail"><input novalidate type="radio" id="jenajem" name="jakbydli" onclick="prepisFormular(\'bydleni\', \'2\', this.checked)" checked>';
	text += '<label for="jenajem">Bydlení v nájmu</label>'
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowradiodetail"><input novalidate type="radio" id="vlastniByt" onclick="prepisFormular(\'bydleni\', \'3\', this.checked)" name="jakbydli">';
	text += '<label for="vlastniByt">Vlastní nebo družstevní byt</label>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowradiodetail"><input novalidate type="radio" id="ubytovna" onclick="prepisFormular(\'bydleni\', \'4\', this.checked)" name="jakbydli">';
	text += '<label for="ubytovna">Ubytovna, chata nebo podnájem</label>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Nájem apod.</div>';
	text += '<div class="formrowinput"><input novalidate novalidate class="inputnr" type="number" min="0" max="20000" step="1000" id="najem" onchange="prepisFormular(\'bydleni\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Poplatky <sup><div class="tooltip">?<span class="tooltiptext">Energie, voda, úklid, ...</span></div></sup></div>';
	text += '<div class="formrowinput"><input novalidate novalidate class="inputnr" type="number" min="0" max="10000" step="1000" id="poplatky" onchange="prepisFormular(\'bydleni\', \'1\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Velikost obce</div>';
	text += '<div class="formrowinput"><select class="inputnr" type="text" id="velikostObce" onchange="prepisFormular(\'bydleni\', \'5\', this.value)">';
	text += '<option value="1" selected="selected">Praha</option>';
	text += '<option value="2">nad 100 tisíc</option>';
	text += '<option value="3">50 až 100 tisíc</option>';
	text += '<option value="4">10 až 50 tisíc</option>';
	text += '<option value="5">pod 10 tisíc</option>';
	text += '</select></div>';

	text += '<div class="formrow">';
	text += '<div class="formrowradiomain"><input novalidate novalidate type="checkbox" id="obvykleNakladyButton">Stanovil ÚP místně obvyklé náklady? <sup><div class="tooltip">?<span class="tooltiptext"></span></sup></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus" id="obvykleNakladyForm" style="visibility: hidden;">';
	text += '<div class="formrowtext">Místně obvyklé náklady</div>';
	text += '<div class="formrowinput"><input novalidate novalidate class="inputnr" type="number" min="0" max="20000" step="1000" id="obvykleNaklady" onchange="prepisFormular(\'bydleni\', \'6\', this.value)"></div>';
	text += '</div>';

	text += '</div>';

	document.getElementById("mainwindow").innerHTML = text;

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
			document.getElementById("obvykleNaklady").value = bydleni[6];
		}
	};

}
//IT

//ED
function vyplnZadostODavky() {

	var text = '<div class="mw-text">';
	text += '<h2>Odmítnutí dávky</h2>';
	text += '<div class="formrow">';
	text += '<div class="formrowradiodetail"><input novalidate type="checkbox" id="chciPridavkyNaDeti" onclick="prepisFormular(\'pozadovaneDavky\', \'0\', this.checked)">Chci přídavky na děti</div>'
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowradiodetail"><input novalidate type="checkbox" id="chciPrispevekNaBydleni" onclick="prepisFormular(\'pozadovaneDavky\', \'0\', this.checked)">Chci příspěvek na bydlení</div>'
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowradiodetail"><input novalidate type="checkbox" id="chciPrispevekNaZivobyti" onclick="prepisFormular(\'pozadovaneDavky\', \'0\', this.checked)">Chci příspěvek na živobytí</div>'
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowradiodetail"><input novalidate type="checkbox" id="chciDoplatekNaBydleni" onclick="prepisFormular(\'pozadovaneDavky\', \'0\', this.checked)">Chci doplatek na bydlení</div>'
	text += '</div>';

	document.getElementById("mainwindow").innerHTML = text;

	document.getElementById("chciPridavkyNaDeti").checked = pozadovaneDavky[0];
	document.getElementById("chciPrispevekNaBydleni").checked = pozadovaneDavky[1];
	document.getElementById("chciPrispevekNaZivobyti").checked = pozadovaneDavky[2];
	document.getElementById("chciDoplatekNaBydleni").checked = pozadovaneDavky[3];

}
//IT

//ED
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

}
//IT

//ED
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

	var parametryDomacnosti = '<div><b>Složení domácnosti: </b>dospělí: ' + slozeniDomacnosti[0] + ', děti: ' + parseInt(slozeniDomacnosti[1] + slozeniDomacnosti[2] + slozeniDomacnosti[3]) + '</div>';
	parametryDomacnosti += '<div><b>Příjmy 1. dospělého: </b>';
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
	parametryDomacnosti += '</div>';
	parametryDomacnosti += '<div><b>Příjmy 2. dospělého: </b>';
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
	parametryDomacnosti += '</div>';
	parametryDomacnosti += '<div><b>Příjmy 3. dospělého: </b>';
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
	parametryDomacnosti += '</div>';
	parametryDomacnosti += '<div><b>Další příjmy: </b>důchody: ' + parseInt(prvniDospelyDalsiPrijmy[0] + druhyDospelyDalsiPrijmy[0] + tretiDospelyDalsiPrijmy[0]) + ' Kč' +
											   ', rodičovská: ' + parseInt(prvniDospelyDalsiPrijmy[1] + druhyDospelyDalsiPrijmy[1] + tretiDospelyDalsiPrijmy[1]) + ' Kč' +
											   ', podpora v nezaměstnanosti: ' + parseInt(prvniDospelyDalsiPrijmy[2] + druhyDospelyDalsiPrijmy[2] + tretiDospelyDalsiPrijmy[2]) + ' Kč' +
											   ', nemocenská: ' + parseInt(prvniDospelyDalsiPrijmy[3] + druhyDospelyDalsiPrijmy[3] + tretiDospelyDalsiPrijmy[3]) + ' Kč' +
											   ', ostatní: ' + parseInt(prvniDospelyDalsiPrijmy[4] + druhyDospelyDalsiPrijmy[4] + tretiDospelyDalsiPrijmy[4]) + ' Kč</div>';
	parametryDomacnosti += '<div><b>Bydlení: </b>nájem: ' + bydleni[0] +  ' Kč' + ', poplatky: ' + bydleni[1] +  ' Kč' + ', bydlí v nájmu: ' + jenajem +
											   ', vlastní byt: ' + vlastnibyt + ', ubytovna: ' + ubytovna + '</div>';
	parametryDomacnosti += '<div><b>Exekuce: </b>první dospělý: ' + prvniExekuce + ', druhý dospělý: ' +  druhyExekuce + ', třetí dospělý: '  + tretiExekuce + '</div>';

	document.getElementById("upperwindow").innerHTML = parametryDomacnosti;

}
//IT

// je potřeba změnit proměnné

function statickyModelujRodinu() {

	var prijmyAVydajeRodinyPoZapocteniDavek = spocitejPrijmyAVydajeRodinyPoZapocteniDavek();

	var text = "<h3>ČISTÝ DISPONIBILNÍ PŘÍJEM DOMÁCNOSTI <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[54] + " Kč</font></h3>"

		text += "<h3>PŘÍJMY 1. DOSPĚLÝ</h3>"

		text +="<h4>Příjmy ze zaměstnání</h4>"
		text +="<p>Čistý příjem z prvního zaměstnání <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[19] + " Kč</font></p>"
		text +="<p>Čistý příjem z druhého zaměstnání <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[20] + " Kč</font></p>"
		text +="<p>Daňový bonus <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[22] + " Kč</font></p>"
		text +="<h4>Další příjmy, které se počítají do příjmu pro výpočet exekucí</h4>"
		text +="<p>Rodičovská <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[23] + " Kč</font></p>"
		text +="<p>Pojistné dávky: důchody, podpora v nezaměstnanosti, nemocenská <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[24] + " Kč</font></p>"
		text +="<p>Jiné příjmy <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[25] + " Kč</font></p>"
		text +="<h4>Exekuční srážky <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[26] + " Kč</font></h4>"
		text +="<h4>Čistý příjem po exekuci <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[27] + " Kč</font></h4>"

		text +="<h3>PŘÍJMY 2. DOSPĚLÝ</h3>"
		text +="<h4>Příjmy ze zaměstnání</h4>"
		text +="<p>Čistý příjem z prvního zaměstnání <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[28] + " Kč</font></p>"
		text +="<p>Čistý příjem z druhého zaměstnání <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[29] + " Kč</font></p>"
		text +="<p>Daňový bonus <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[31] + " Kč</font></p>"
		text +="<h4>Další příjmy, které se počítají do příjmu pro výpočet exekucí</h4>"
		text +="<p>Rodičovská <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[32] + " Kč</font></p>"
		text +="<p>Pojistné dávky: důchody, podpora v nezaměstnanosti, nemocenská <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[33] + " Kč</font></p>"
		text +="<p>Jiné příjmy <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[34] + " Kč</font></p>"
		text +="<h4>Exekuční srážky <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[35] + " Kč</font></h4>"
		text +="<h4>Čistý příjem po exekuci <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[36] + " Kč</font></h4>"

		text +="<h3>PŘÍJMY 3. DOSPĚLÝ</h3>"
		text +="<h4>Příjmy ze zaměstnání</h4>"
		text +="<p>Čistý příjem z prvního zaměstnání <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[37] + " Kč</font></p>"
		text +="<p>Čistý příjem z druhého zaměstnání <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[38] + " Kč</font></p>"
		text +="<p>Daňový bonus <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[40] + " Kč</font></p>"
		text +="<h4>Další příjmy, které se počítají do příjmu pro výpočet exekucí</h4>"
		text +="<p>Rodičovská <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[41] + " Kč</font></p>"
		text +="<p>Pojistné dávky: důchody, podpora v nezaměstnanosti, nemocenská <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[42] + " Kč</font></p>"
		text +="<p>Jiné příjmy <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[43] + " Kč</font></p>"
		text +="<h4>Exekuční srážky <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[44] + " Kč</font></h4>"
		text +="<h4>Čistý příjem po exekuci <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[45] + " Kč</font></h4>"

		text +="<h3>NÁROK DOMÁCNOSTI NA SOCIÁLNÍ DÁVKY </h3>"
		text +="<h4>Dávky státní sociální podpory</h4>"
		text +="<p>Přídavky na děti <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[46] + " Kč</font></p>"
		text +="<p>Příspěvek na bydlení <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[47] + " Kč</font></p>"
		text +="<h4>Dávky v hmotné nouzi</h4>"
		text +="<p>Příspěvek na živobytí <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[48] + " Kč</font></p>"
		text +="<p>Doplatek na bydlení <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[49] + " Kč</font></p>"
		text +="<h4>Celkem dávky <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[50] + " Kč</font></h4>"

		text +="<h3>VÝDAJE DOMÁCNOSTI</h3>"
		text +="<h4>Výdaje, které jsou zohledněny při výpočtu dávek</h4>"
		text +="<p>Nájem <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[51] + " Kč</font></p>"
		text +="<p>Poplatky: vodné, stočné, energie <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[52] + " Kč</font></p>"
		text +="<h4>Výdaje, které nejsou zohledněny při výpočtu dávek</h4>"
		text +="<h4>Celkem výdaje <font color='blue'>" + prijmyAVydajeRodinyPoZapocteniDavek[53] + " Kč</font></h4>"

	document.getElementById("mainwindow").innerHTML = text;

}