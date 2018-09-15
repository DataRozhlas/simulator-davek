
function vyplnSlozeniDomacnosti() {

	var text = '<div class="mw-text">';
	text += '<h2>Složení domácnosti</h2>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Počet dospělých</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="3" id="pocetDospelych" onchange="prepisFormular(\'slozeniDomacnosti\', \'0\', this.value)"</div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Počet dětí do 6 let</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="5" id="pocetDetiPod6" onchange="prepisFormular(\'slozeniDomacnosti\', \'1\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Počet dětí od 6 do 15 let</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="5" id="pocetDeti6Az15" onchange="prepisFormular(\'slozeniDomacnosti\', \'2\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Počet nezaopatřených dětí od 15 do 26 let</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="5" id="pocetDeti15Az26" onchange="prepisFormular(\'slozeniDomacnosti\', \'3\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Počet členů domácnosti s trvalým bydlištěm jinde</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="18" id="trvaleBydlisteJinde" onchange="prepisFormular(\'slozeniDomacnosti\', \'5\', this.value)"></div>';
	text += '</div>';

	document.getElementById("mainwindow").innerHTML = text;

	document.getElementById("pocetDospelych").value = slozeniDomacnosti[0];
	document.getElementById("pocetDetiPod6").value = slozeniDomacnosti[1];
	document.getElementById("pocetDeti6Az15").value = slozeniDomacnosti[2];
	document.getElementById("pocetDeti15Az26").value = slozeniDomacnosti[3];
	document.getElementById("trvaleBydlisteJinde").value = slozeniDomacnosti[5];

}



function vyplnPrijmyPrvnihoDospeleho() {

	var text = '<div class="mw-text">';

	text += '<div id="mw-text-1">';
	text += '<h2>Příjmy prvního dospělého</h2>';
	text += '<h3>První zaměstnavatel</h3>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem na HPP</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="50000" step="1000" id="prvniDospelyPrvniZamestnavatelHPPPrijem" onchange="prepisFormular(\'prvniDospelyPrvniZamestnavatel\', \'0\', this.value)"></div>';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="prvniDospelyPrvniZamestnavatelHPPVyjimka" onclick="prepisFormular(\'prvniDospelyPrvniZamestnavatel\', \'1\', this.checked)">Výjimka z minimálního základu <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem na DPČ</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="30000" step="1000" id="prvniDospelyPrvniZamestnavatelDPCPrijem" onchange="prepisFormular(\'prvniDospelyPrvniZamestnavatel\', \'2\', this.value)"></div>';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="prvniDospelyPrvniZamestnavatelDPCZdravotni" onclick="prepisFormular(\'prvniDospelyPrvniZamestnavatel\', \'3\', this.checked)">Platí zdravotní jinde <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem na DPP</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="30000" step="1000" id="prvniDospelyPrvniZamestnavatelDPPPrijem" onchange="prepisFormular(\'prvniDospelyPrvniZamestnavatel\', \'4\', this.value)"></div>';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="prvniDospelyPrvniZamestnavatelDPPZdravotni"  onclick="prepisFormular(\'prvniDospelyPrvniZamestnavatel\', \'5\', this.checked)">Platí zdravotní jinde <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>'
	text += '<div class="formrow">';
	text += '<div class="formrowradiomain"><input type="checkbox" id="prvniDospelyPrvniZamestnavatelRuzovyPapir" onclick="prepisFormular(\'prvniDospelyPrvniZamestnavatel\', \'6\', this.checked)">Prohlášení k dani u tohoto zaměstnavatele <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus" id="prvniDospelyPrvniZamestnavatelVyzivovaneDetiForm" style="visibility: hidden;">';
	text += '<div class="formrowtext">Počet dětí k daňovému bonusu</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10" id="prvniDospelyPrvniZamestnavatelVyzivovaneDeti" onchange="prepisFormular(\'prvniDospelyPrvniZamestnavatel\', \'7\', this.value)"></div>';
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
	document.getElementById("prvniDospelyPrvniZamestnavatelHPPPrijem").value = prvniDospelyPrvniZamestnavatel[0];
	document.getElementById("prvniDospelyPrvniZamestnavatelHPPVyjimka").checked = prvniDospelyPrvniZamestnavatel[1];
	document.getElementById("prvniDospelyPrvniZamestnavatelDPCPrijem").value = prvniDospelyPrvniZamestnavatel[2];
	document.getElementById("prvniDospelyPrvniZamestnavatelDPCZdravotni").checked = prvniDospelyPrvniZamestnavatel[3];
	document.getElementById("prvniDospelyPrvniZamestnavatelDPPPrijem").value = prvniDospelyPrvniZamestnavatel[4];
	document.getElementById("prvniDospelyPrvniZamestnavatelDPPZdravotni").checked = prvniDospelyPrvniZamestnavatel[5];
	document.getElementById("prvniDospelyPrvniZamestnavatelRuzovyPapir").checked = prvniDospelyPrvniZamestnavatel[6];

	// první nastavení formuláře pro počet dětí u prohlášení k dani
	var prvniDospelyPrvniZamestnavatelDaneCheckStart = prvniDospelyPrvniZamestnavatel[6];
	if(prvniDospelyPrvniZamestnavatelDaneCheckStart) {
		document.getElementById("prvniDospelyPrvniZamestnavatelVyzivovaneDeti").value = prvniDospelyPrvniZamestnavatel[7];
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
			document.getElementById("prvniDospelyPrvniZamestnavatelVyzivovaneDeti").value = prvniDospelyPrvniZamestnavatel[7];
		}
	};

}



function pridejZamestnavatelePrvnihoDospeleho() {

	var text = '<h3>Druhý zaměstnavatel</h3>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem na HPP</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="50000" step="1000" id="prvniDospelyDruhyZamestnavatelHPPPrijem" onchange="prepisFormular(\'prvniDospelyDruhyZamestnavatel\', \'0\', this.value)"></div>';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="prvniDospelyDruhyZamestnavatelHPPVyjimka" onclick="prepisFormular(\'prvniDospelyDruhyZamestnavatel\', \'1\', this.checked)">Výjimka z minimálního základu <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem na DPČ</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="30000" step="1000" id="prvniDospelyDruhyZamestnavatelDPCPrijem" onchange="prepisFormular(\'prvniDospelyDruhyZamestnavatel\', \'2\', this.value)"></div>';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="prvniDospelyDruhyZamestnavatelDPCZdravotni" onclick="prepisFormular(\'prvniDospelyDruhyZamestnavatel\', \'3\', this.checked)">Platí zdravotní jinde <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem na DPP</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="30000" step="1000" id="prvniDospelyDruhyZamestnavatelDPPPrijem" onchange="prepisFormular(\'prvniDospelyDruhyZamestnavatel\', \'4\', this.value)"></div>';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="prvniDospelyDruhyZamestnavatelDPPZdravotni" onclick="prepisFormular(\'prvniDospelyDruhyZamestnavatel\', \'5\', this.checked)">Platí zdravotní jinde <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>'
	text += '<div class="formrow">';
	text += '<div class="formrowradiomain"><input type="checkbox" id="prvniDospelyDruhyZamestnavatelRuzovyPapir" onclick="prepisFormular(\'prvniDospelyDruhyZamestnavatel\', \'6\', this.checked)">Prohlášení k dani u tohoto zaměstnavatele <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus" id="prvniDospelyDruhyZamestnavatelVyzivovaneDetiForm" style="visibility: hidden;">';
	text += '<div class="formrowtext">Počet dětí k daňovému bonusu</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10" id="prvniDospelyDruhyZamestnavatelVyzivovaneDeti" onchange="prepisFormular(\'prvniDospelyDruhyZamestnavatel\', \'7\', this.value)"></div>';
	text += '</div>';

	document.getElementById("mw-text-2").innerHTML = text;

	// vyplnění z globálních proměnných
	document.getElementById("prvniDospelyDruhyZamestnavatelHPPPrijem").value = prvniDospelyDruhyZamestnavatel[0];
	document.getElementById("prvniDospelyDruhyZamestnavatelHPPVyjimka").checked = prvniDospelyDruhyZamestnavatel[1];
	document.getElementById("prvniDospelyDruhyZamestnavatelDPCPrijem").value = prvniDospelyDruhyZamestnavatel[2];
	document.getElementById("prvniDospelyDruhyZamestnavatelDPCZdravotni").checked = prvniDospelyDruhyZamestnavatel[3];
	document.getElementById("prvniDospelyDruhyZamestnavatelDPPPrijem").value = prvniDospelyDruhyZamestnavatel[4];
	document.getElementById("prvniDospelyDruhyZamestnavatelDPPZdravotni").checked = prvniDospelyDruhyZamestnavatel[5];
	document.getElementById("prvniDospelyDruhyZamestnavatelRuzovyPapir").checked = prvniDospelyDruhyZamestnavatel[6];

	// první nastavení formuláře pro počet dětí u prohlášení k dani
	var prvniDospelyDruhyZamestnavatelDaneCheckStart = prvniDospelyDruhyZamestnavatel[6];
	if(prvniDospelyDruhyZamestnavatelDaneCheckStart) {
		document.getElementById("prvniDospelyDruhyZamestnavatelVyzivovaneDeti").value = prvniDospelyDruhyZamestnavatel[7];
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
			document.getElementById("prvniDospelyDruhyZamestnavatelVyzivovaneDeti").value = prvniDospelyDruhyZamestnavatel[7];
		}
	};

}



function pridejDalsiPrijmyPrvnihoDospeleho() {

	var text = '<h3>Jiné příjmy</h3>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Důchod</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="20000" step="1000" id="prvniDospelyDuchody" onchange="prepisFormular(\'prvniDospelyDalsiPrijmy\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Rodičovská</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10000" step="1000" id="prvniDospelyRodicovska" onchange="prepisFormular(\'prvniDospelyDalsiPrijmy\', \'1\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Podpora v nezaměstnanosti</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="20000" step="1000" id="prvniDospelyPodporaVNezamestnanosti" onchange="prepisFormular(\'prvniDospelyDalsiPrijmy\', \'2\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Nemocenská</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10000" step="1000" id="prvniDospelyNemocenska" onchange="prepisFormular(\'prvniDospelyDalsiPrijmy\', \'3\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Ostatní</div>';
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

	var text = '<div class="mw-text">';
	text += '<div id="mw-text-1">';
	text += '<h2>Příjmy druhého dospělého</h2>';
	text += '<h3>První zaměstnavatel</h3>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem na HPP</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="50000" step="1000" id="druhyDospelyPrvniZamestnavatelHPPPrijem" onchange="prepisFormular(\'druhyDospelyPrvniZamestnavatel\', \'0\', this.value)"></div>';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="druhyDospelyPrvniZamestnavatelHPPVyjimka" onclick="prepisFormular(\'druhyDospelyPrvniZamestnavatel\', \'1\', this.checked)">Výjimka z minimálního základu <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem na DPČ</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="30000" step="1000" id="druhyDospelyPrvniZamestnavatelDPCPrijem" onchange="prepisFormular(\'druhyDospelyPrvniZamestnavatel\', \'2\', this.value)"></div>';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="druhyDospelyPrvniZamestnavatelDPCZdravotni" onclick="prepisFormular(\'druhyDospelyPrvniZamestnavatel\', \'3\', this.checked)">Platí zdravotní jinde <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem na DPP</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="30000" step="1000" id="druhyDospelyPrvniZamestnavatelDPPPrijem" onchange="prepisFormular(\'druhyDospelyPrvniZamestnavatel\', \'4\', this.value)"></div>';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="druhyDospelyPrvniZamestnavatelDPPZdravotni" onclick="prepisFormular(\'druhyDospelyPrvniZamestnavatel\', \'5\', this.checked)">Platí zdravotní jinde <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>'
	text += '<div class="formrow">';
	text += '<div class="formrowradiomain"><input type="checkbox" id="druhyDospelyPrvniZamestnavatelRuzovyPapir" onclick="prepisFormular(\'druhyDospelyPrvniZamestnavatel\', \'6\', this.checked)">Prohlášení k dani u tohoto zaměstnavatele <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus" id="druhyDospelyPrvniZamestnavatelVyzivovaneDetiForm" style="visibility: hidden;">';
	text += '<div class="formrowtext">Počet dětí k daňovému bonusu</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10" id="druhyDospelyPrvniZamestnavatelVyzivovaneDeti" onchange="prepisFormular(\'druhyDospelyPrvniZamestnavatel\', \'7\', this.value)"></div>';
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
	document.getElementById("druhyDospelyPrvniZamestnavatelHPPPrijem").value = druhyDospelyPrvniZamestnavatel[0];
	document.getElementById("druhyDospelyPrvniZamestnavatelHPPVyjimka").checked = druhyDospelyPrvniZamestnavatel[1];
	document.getElementById("druhyDospelyPrvniZamestnavatelDPCPrijem").value = druhyDospelyPrvniZamestnavatel[2];
	document.getElementById("druhyDospelyPrvniZamestnavatelDPCZdravotni").checked = druhyDospelyPrvniZamestnavatel[3];
	document.getElementById("druhyDospelyPrvniZamestnavatelDPPPrijem").value = druhyDospelyPrvniZamestnavatel[4];
	document.getElementById("druhyDospelyPrvniZamestnavatelDPPZdravotni").checked = druhyDospelyPrvniZamestnavatel[5];
	document.getElementById("druhyDospelyPrvniZamestnavatelRuzovyPapir").checked = druhyDospelyPrvniZamestnavatel[6];

	// první nastavení formuláře pro počet dětí u prohlášení k dani
	var druhyDospelyPrvniZamestnavatelDaneCheckStart = druhyDospelyPrvniZamestnavatel[6];
	if(druhyDospelyPrvniZamestnavatelDaneCheckStart) {
		document.getElementById("druhyDospelyPrvniZamestnavatelVyzivovaneDeti").value = druhyDospelyPrvniZamestnavatel[7];
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
			document.getElementById("druhyDospelyPrvniZamestnavatelVyzivovaneDeti").value = druhyDospelyPrvniZamestnavatel[7];
		}
	};

}



function pridejZamestnavateleDruhehoDospeleho() {

	var text = '<h3>Druhý zaměstnavatel</h3>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem na HPP</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="50000" step="1000" id="druhyDospelyDruhyZamestnavatelHPPPrijem" onchange="prepisFormular(\'druhyDospelyDruhyZamestnavatel\', \'0\', this.value)"></div>';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="druhyDospelyDruhyZamestnavatelHPPVyjimka" onclick="prepisFormular(\'druhyDospelyDruhyZamestnavatel\', \'1\', this.checked)">Výjimka z minimálního základu <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem na DPČ</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="30000" step="1000" id="druhyDospelyDruhyZamestnavatelDPCPrijem" onchange="prepisFormular(\'druhyDospelyDruhyZamestnavatel\', \'2\', this.value)"></div>';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="druhyDospelyDruhyZamestnavatelDPCZdravotni" onclick="prepisFormular(\'druhyDospelyDruhyZamestnavatel\', \'3\', this.checked)">Platí zdravotní jinde <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem na DPP</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="30000" step="1000" id="druhyDospelyDruhyZamestnavatelDPPPrijem" onchange="prepisFormular(\'druhyDospelyDruhyZamestnavatel\', \'4\', this.value)"></div>';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="druhyDospelyDruhyZamestnavatelDPPZdravotni" onclick="prepisFormular(\'druhyDospelyDruhyZamestnavatel\', \'5\', this.checked)">Platí zdravotní jinde <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>'
	text += '<div class="formrow">';
	text += '<div class="formrowradiomain"><input type="checkbox" id="druhyDospelyDruhyZamestnavatelRuzovyPapir" onclick="prepisFormular(\'druhyDospelyDruhyZamestnavatel\', \'6\', this.checked)">Prohlášení k dani u tohoto zaměstnavatele <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus" id="druhyDospelyDruhyZamestnavatelVyzivovaneDetiForm" style="visibility: hidden;">';
	text += '<div class="formrowtext">Počet dětí k daňovému bonusu</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10" id="druhyDospelyDruhyZamestnavatelVyzivovaneDeti" onchange="prepisFormular(\'druhyDospelyDruhyZamestnavatel\', \'7\', this.value)"></div>';
	text += '</div>';

	document.getElementById("mw-text-2").innerHTML = text;

	// vyplnění z globálních proměnných
	document.getElementById("druhyDospelyDruhyZamestnavatelHPPPrijem").value = druhyDospelyDruhyZamestnavatel[0];
	document.getElementById("druhyDospelyDruhyZamestnavatelHPPVyjimka").checked = druhyDospelyDruhyZamestnavatel[1];
	document.getElementById("druhyDospelyDruhyZamestnavatelDPCPrijem").value = druhyDospelyDruhyZamestnavatel[2];
	document.getElementById("druhyDospelyDruhyZamestnavatelDPCZdravotni").checked = druhyDospelyDruhyZamestnavatel[3];
	document.getElementById("druhyDospelyDruhyZamestnavatelDPPPrijem").value = druhyDospelyDruhyZamestnavatel[4];
	document.getElementById("druhyDospelyDruhyZamestnavatelDPPZdravotni").checked = druhyDospelyDruhyZamestnavatel[5];
	document.getElementById("druhyDospelyDruhyZamestnavatelRuzovyPapir").checked = druhyDospelyDruhyZamestnavatel[6];

	// první nastavení formuláře pro počet dětí u prohlášení k dani
	var druhyDospelyDruhyZamestnavatelDaneCheckStart = druhyDospelyDruhyZamestnavatel[6];
	if(druhyDospelyDruhyZamestnavatelDaneCheckStart) {
		document.getElementById("druhyDospelyDruhyZamestnavatelVyzivovaneDeti").value = druhyDospelyDruhyZamestnavatel[7];
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
			document.getElementById("druhyDospelyDruhyZamestnavatelVyzivovaneDeti").value = druhyDospelyDruhyZamestnavatel[7];
		}
	};

}



function pridejDalsiPrijmyDruhehoDospeleho() {

	var text = '<h3>Jiné příjmy</h3>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Důchod</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="20000" step="1000" id="druhyDospelyDuchody" onchange="prepisFormular(\'druhyDospelyDalsiPrijmy\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Rodičovská</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10000" step="1000" id="druhyDospelyRodicovska" onchange="prepisFormular(\'druhyDospelyDalsiPrijmy\', \'1\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Podpora v nezaměstnanosti</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="20000" step="1000" id="druhyDospelyPodporaVNezamestnanosti" onchange="prepisFormular(\'druhyDospelyDalsiPrijmy\', \'2\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Nemocenská</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10000" step="1000" id="druhyDospelyNemocenska" onchange="prepisFormular(\'druhyDospelyDalsiPrijmy\', \'3\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Ostatní</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10000" step="1000" id="druhyDospelyOstatniPrijmy" onchange="prepisFormular(\'druhyDospelyDalsiPrijmy\', \'4\', this.value)"></div>';
	text += '</div>';

	document.getElementById("mw-text-3").innerHTML = text;

	// vyplnění z globálních proměnných
	document.getElementById("druhyDospelyDuchody").value = druhyDospelyDalsiPrijmy[0];
	document.getElementById("druhyDospelyRodicovska").value = druhyDospelyDalsiPrijmy[1];
	document.getElementById("druhyDospelyPodporaVNezamestnanosti").value = druhyDospelyDalsiPrijmy[2];
	document.getElementById("druhyDospelyNemocenska").value = druhyDospelyDalsiPrijmy[3];
	document.getElementById("druhyDospelyOstatniPrijmy").value = druhyDospelyDalsiPrijmy[4];

}



function vyplnPrijmyTretihoDospeleho() {

	var text = '<div class="mw-text">';
	text += '<div id="mw-text-1">';
	text += '<h2>Příjmy třetího dospělého</h2>';
	text += '<h3>První zaměstnavatel</h3>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem na HPP</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="50000" step="1000" id="tretiDospelyPrvniZamestnavatelHPPPrijem" onchange="prepisFormular(\'tretiDospelyPrvniZamestnavatel\', \'0\', this.value)"></div>';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="tretiDospelyPrvniZamestnavatelHPPVyjimka" onclick="prepisFormular(\'tretiDospelyPrvniZamestnavatel\', \'1\', this.checked)">Výjimka z minimálního základu <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem na DPČ</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="30000" step="1000" id="tretiDospelyPrvniZamestnavatelDPCPrijem" onchange="prepisFormular(\'tretiDospelyPrvniZamestnavatel\', \'2\', this.value)"></div>';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="tretiDospelyPrvniZamestnavatelDPCZdravotni" onclick="prepisFormular(\'tretiDospelyPrvniZamestnavatel\', \'3\', this.checked)">Platí zdravotní jinde <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem na DPP</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="30000" step="1000" id="tretiDospelyPrvniZamestnavatelDPPPrijem" onchange="prepisFormular(\'tretiDospelyPrvniZamestnavatel\', \'4\', this.value)"></div>';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="tretiDospelyPrvniZamestnavatelDPPZdravotni" onclick="prepisFormular(\'tretiDospelyPrvniZamestnavatel\', \'5\', this.checked)">Platí zdravotní jinde <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>'
	text += '<div class="formrow">';
	text += '<div class="formrowradiomain"><input type="checkbox" id="tretiDospelyPrvniZamestnavatelRuzovyPapir" onclick="prepisFormular(\'tretiDospelyPrvniZamestnavatel\', \'6\', this.checked)">Prohlášení k dani u tohoto zaměstnavatele <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus" id="tretiDospelyPrvniZamestnavatelVyzivovaneDetiForm" style="visibility: hidden;">';
	text += '<div class="formrowtext">Počet dětí k daňovému bonusu</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10" id="tretiDospelyPrvniZamestnavatelVyzivovaneDeti" onchange="prepisFormular(\'tretiDospelyPrvniZamestnavatel\', \'7\', this.value)"></div>';
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
	document.getElementById("tretiDospelyPrvniZamestnavatelHPPPrijem").value = tretiDospelyPrvniZamestnavatel[0];
	document.getElementById("tretiDospelyPrvniZamestnavatelHPPVyjimka").checked = tretiDospelyPrvniZamestnavatel[1];
	document.getElementById("tretiDospelyPrvniZamestnavatelDPCPrijem").value = tretiDospelyPrvniZamestnavatel[2];
	document.getElementById("tretiDospelyPrvniZamestnavatelDPCZdravotni").checked = tretiDospelyPrvniZamestnavatel[3];
	document.getElementById("tretiDospelyPrvniZamestnavatelDPPPrijem").value = tretiDospelyPrvniZamestnavatel[4];
	document.getElementById("tretiDospelyPrvniZamestnavatelDPPZdravotni").checked = tretiDospelyPrvniZamestnavatel[5];
	document.getElementById("tretiDospelyPrvniZamestnavatelRuzovyPapir").checked = tretiDospelyPrvniZamestnavatel[6];

	// první nastavení formuláře pro počet dětí u prohlášení k dani
	var tretiDospelyPrvniZamestnavatelDaneCheckStart = tretiDospelyPrvniZamestnavatel[6];
	if(tretiDospelyPrvniZamestnavatelDaneCheckStart) {
		document.getElementById("tretiDospelyPrvniZamestnavatelVyzivovaneDeti").value = tretiDospelyPrvniZamestnavatel[7];
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
			document.getElementById("tretiDospelyPrvniZamestnavatelVyzivovaneDeti").value = tretiDospelyPrvniZamestnavatel[7];
		}
	};

}



function pridejZamestnavateleTretihoDospeleho() {

	var text = '<h3>Druhý zaměstnavatel</h3>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem na HPP</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="50000" step="1000" id="tretiDospelyDruhyZamestnavatelHPPPrijem" onchange="prepisFormular(\'tretiDospelyDruhyZamestnavatel\', \'0\', this.value)"></div>';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="tretiDospelyDruhyZamestnavatelHPPVyjimka" onclick="prepisFormular(\'tretiDospelyDruhyZamestnavatel\', \'1\', this.checked)">Výjimka z minimálního základu <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem na DPČ</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="30000" step="1000" id="tretiDospelyDruhyZamestnavatelDPCPrijem" onchange="prepisFormular(\'tretiDospelyDruhyZamestnavatel\', \'2\', this.value)"></div>';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="tretiDospelyDruhyZamestnavatelDPCZdravotni" onclick="prepisFormular(\'tretiDospelyDruhyZamestnavatel\', \'3\', this.checked)">Platí zdravotní jinde <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Hrubý příjem na DPP</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="30000" step="1000" id="tretiDospelyDruhyZamestnavatelDPPPrijem" onchange="prepisFormular(\'tretiDospelyDruhyZamestnavatel\', \'4\', this.value)"></div>';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="tretiDospelyDruhyZamestnavatelDPPZdravotni" onclick="prepisFormular(\'tretiDospelyDruhyZamestnavatel\', \'5\', this.checked)">Platí zdravotní jinde <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>'
	text += '<div class="formrow">';
	text += '<div class="formrowradiomain"><input type="checkbox" id="tretiDospelyDruhyZamestnavatelRuzovyPapir" onclick="prepisFormular(\'tretiDospelyDruhyZamestnavatel\', \'6\', this.checked)">Prohlášení k dani u tohoto zaměstnavatele <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus" id="tretiDospelyDruhyZamestnavatelVyzivovaneDetiForm" style="visibility: hidden;">';
	text += '<div class="formrowtext">Počet dětí k daňovému bonusu</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10" id="tretiDospelyDruhyZamestnavatelVyzivovaneDeti" onchange="prepisFormular(\'tretiDospelyDruhyZamestnavatel\', \'7\', this.value)"></div>';
	text += '</div>';

	document.getElementById("mw-text-2").innerHTML = text;

	// vyplnění z globálních proměnných
	document.getElementById("tretiDospelyDruhyZamestnavatelHPPPrijem").value = tretiDospelyDruhyZamestnavatel[0];
	document.getElementById("tretiDospelyDruhyZamestnavatelHPPVyjimka").checked = tretiDospelyDruhyZamestnavatel[1];
	document.getElementById("tretiDospelyDruhyZamestnavatelDPCPrijem").value = tretiDospelyDruhyZamestnavatel[2];
	document.getElementById("tretiDospelyDruhyZamestnavatelDPCZdravotni").checked = tretiDospelyDruhyZamestnavatel[3];
	document.getElementById("tretiDospelyDruhyZamestnavatelDPPPrijem").value = tretiDospelyDruhyZamestnavatel[4];
	document.getElementById("tretiDospelyDruhyZamestnavatelDPPZdravotni").checked = tretiDospelyDruhyZamestnavatel[5];
	document.getElementById("tretiDospelyDruhyZamestnavatelRuzovyPapir").checked = tretiDospelyDruhyZamestnavatel[6];

	// první nastavení formuláře pro počet dětí u prohlášení k dani
	var tretiDospelyDruhyZamestnavatelDaneCheckStart = tretiDospelyDruhyZamestnavatel[6];
	if(tretiDospelyDruhyZamestnavatelDaneCheckStart) {
		document.getElementById("tretiDospelyDruhyZamestnavatelVyzivovaneDeti").value = tretiDospelyDruhyZamestnavatel[7];
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
			document.getElementById("tretiDospelyDruhyZamestnavatelVyzivovaneDeti").value = tretiDospelyDruhyZamestnavatel[7];
		}
	};

}



function pridejDalsiPrijmyTretihoDospeleho() {

	var text = '<h3>Jiné příjmy</h3>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Důchod</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="20000" step="1000" id="tretiDospelyDuchody" onchange="prepisFormular(\'tretiDospelyDalsiPrijmy\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Rodičovská</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10000" step="1000" id="tretiDospelyRodicovska" onchange="prepisFormular(\'tretiDospelyDalsiPrijmy\', \'1\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Podpora v nezaměstnanosti</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="20000" step="1000" id="tretiDospelyPodporaVNezamestnanosti" onchange="prepisFormular(\'tretiDospelyDalsiPrijmy\', \'2\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Nemocenská</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10000" step="1000" id="tretiDospelyNemocenska" onchange="prepisFormular(\'tretiDospelyDalsiPrijmy\', \'3\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Ostatní</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10000" step="1000" id="tretiDospelyOstatniPrijmy" onchange="prepisFormular(\'tretiDospelyDalsiPrijmy\', \'4\', this.value)"></div>';
	text += '</div>';

	document.getElementById("mw-text-3").innerHTML = text;

	// vyplnění z globálních proměnných
	document.getElementById("tretiDospelyDuchody").value = tretiDospelyDalsiPrijmy[0];
	document.getElementById("tretiDospelyRodicovska").value = tretiDospelyDalsiPrijmy[1];
	document.getElementById("tretiDospelyPodporaVNezamestnanosti").value = tretiDospelyDalsiPrijmy[2];
	document.getElementById("tretiDospelyNemocenska").value = tretiDospelyDalsiPrijmy[3];
	document.getElementById("tretiDospelyOstatniPrijmy").value = tretiDospelyDalsiPrijmy[4];

}



function vyplnExekuce() {

	var text = '<div class="mw-text">';
	text += '<h2>Exekuce</h2>';
	text += '<h3>První dospělý</h3>'
	text += '<div class="formrow">';
	text += '<div class="formrowradiomain"><input type="checkbox" id="prvniDospelyPrednostniExekuce" onclick="prepisFormular(\'prvniDospelyExekuce\', \'0\', this.checked)">Přednostní exekuce <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowradiomain"><input type="checkbox" id="prvniDospelyNeprednostniExekuce" onclick="prepisFormular(\'prvniDospelyExekuce\', \'1\', this.checked)">Nepřednostní exekuce <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus" id="prvniDospelyDalsiVyzivovaneOsobyForm" style="visibility: hidden;">';
	text += '<div class="formrowtext">Další vyživované osoby</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10" id="prvniDospelyDalsiVyzivovaneOsoby" onchange="prepisFormular(\'prvniDospelyExekuce\', \'2\', this.value)"></div>';
	text += '</div>';
	text += '<h3>Druhý dospělý</h3>'
	text += '<div class="formrow">';
	text += '<div class="formrowradiomain"><input type="checkbox" id="druhyDospelyPrednostniExekuce" onclick="prepisFormular(\'druhyDospelyExekuce\', \'0\', this.checked)">Přednostní exekuce <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowradiomain"><input type="checkbox" id="druhyDospelyNeprednostniExekuce" onclick="prepisFormular(\'druhyDospelyExekuce\', \'1\', this.checked)">Nepřednostní exekuce <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus" id="druhyDospelyDalsiVyzivovaneOsobyForm" style="visibility: hidden;">';
	text += '<div class="formrowtext">Další vyživované osoby</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10" id="druhyDospelyDalsiVyzivovaneOsoby" onchange="prepisFormular(\'druhyDospelyExekuce\', \'2\', this.value)"></div>';
	text += '</div>';
	text += '<h3>Třetí dospělý</h3>'
	text += '<div class="formrow">';
	text += '<div class="formrowradiomain"><input type="checkbox" id="tretiDospelyPrednostniExekuce" onclick="prepisFormular(\'tretiDospelyExekuce\', \'0\', this.checked)">Přednostní exekuce <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowradiomain"><input type="checkbox" id="tretiDospelyNeprednostniExekuce" onclick="prepisFormular(\'tretiDospelyExekuce\', \'1\', this.checked)">Nepřednostní exekuce <sup><div class="tooltip">?</sup><span class="tooltiptext">NĚJAKÝ TEXT</span></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus" id="tretiDospelyDalsiVyzivovaneOsobyForm" style="visibility: hidden;">';
	text += '<div class="formrowtext">Další vyživované osoby</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10" id="tretiDospelyDalsiVyzivovaneOsoby" onchange="prepisFormular(\'tretiDospelyExekuce\', \'2\', this.value)"></div>';
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
	};

	prvniDospelyNeprednostniExekuceCheck.onchange = function() {
		if((document.getElementById("prvniDospelyPrednostniExekuce").checked) || (document.getElementById("prvniDospelyNeprednostniExekuce").checked)) {
			document.getElementById("prvniDospelyDalsiVyzivovaneOsobyForm").style.visibility = "visible";
			document.getElementById("prvniDospelyDalsiVyzivovaneOsoby").value = prvniDospelyExekuce[2];
		} else {
			document.getElementById("prvniDospelyDalsiVyzivovaneOsobyForm").style.visibility = "hidden";
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
	};

	druhyDospelyNeprednostniExekuceCheck.onchange = function() {
		if((document.getElementById("druhyDospelyPrednostniExekuce").checked) || (document.getElementById("druhyDospelyNeprednostniExekuce").checked)) {
			document.getElementById("druhyDospelyDalsiVyzivovaneOsobyForm").style.visibility = "visible";
			document.getElementById("druhyDospelyDalsiVyzivovaneOsoby").value = druhyDospelyExekuce[2];
		} else {
			document.getElementById("druhyDospelyDalsiVyzivovaneOsobyForm").style.visibility = "hidden";
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
	};

	tretiDospelyNeprednostniExekuceCheck.onchange = function() {
		if((document.getElementById("tretiDospelyPrednostniExekuce").checked) || (document.getElementById("tretiDospelyNeprednostniExekuce").checked)) {
			document.getElementById("tretiDospelyDalsiVyzivovaneOsobyForm").style.visibility = "visible";
			document.getElementById("tretiDospelyDalsiVyzivovaneOsoby").value = tretiDospelyExekuce[2];
		} else {
			document.getElementById("tretiDospelyDalsiVyzivovaneOsobyForm").style.visibility = "hidden";
		}
	};

}



function vyplnNakladyNaBydleni() {

	var text = '<div class="mw-text">';
	text += '<div id="mw-text-1">';
	text += '<h2>Náklady na bydlení</h2>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Nájem</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="20000" step="1000" id="najem" onchange="prepisFormular(\'bydleni\', \'0\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Poplatky <sup><div class="tooltip">?<span class="tooltiptext">Energie, voda, úklid, ...</span></div></sup></div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="10000" step="1000" id="poplatky" onchange="prepisFormular(\'bydleni\', \'1\', this.value)"></div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="vlastniByt" onclick="prepisFormular(\'bydleni\', \'2\', this.checked)">Vlastní nebo družstevní byt</div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowradiodetail"><input type="checkbox" id="ubytovna" onclick="prepisFormular(\'bydleni\', \'3\', this.checked)">Ubytovna, chata nebo podnájem</div>';
	text += '</div>';
	text += '<div class="formrow">';
	text += '<div class="formrowtext">Velikost obce</div>';
	text += '<div class="formrowinput"><select class="inputnr" type="text" id="velikostObce" onchange="prepisFormular(\'bydleni\', \'4\', this.value)">';
	text += '<option value="1" selected="selected">Praha</option>';
	text += '<option value="2">nad 100 tisíc</option>';
	text += '<option value="3">50 až 100 tisíc</option>';
	text += '<option value="4">10 až 50 tisíc</option>';
	text += '<option value="5">pod 10 tisíc</option>';
	text += '</select></div>';

	text += '<div class="formrow">';
	text += '<div class="formrowradiomain"><input type="checkbox" id="obvykleNakladyButton" onchange="prepisFormular(\'bydleni\', \'5\', this.checked)">Stanovil ÚP místně obvyklé náklady? <sup><div class="tooltip">?<span class="tooltiptext">NĚJAKÝ TEXT</span></sup></div></div>'
	text += '</div>';
	text += '<div class="formrow taxbonus" id="obvykleNakladyForm" style="visibility: hidden;">';
	text += '<div class="formrowtext">Místně obvyklé náklady</div>';
	text += '<div class="formrowinput"><input class="inputnr" type="number" min="0" max="20000" step="1000" id="obvykleNaklady" onchange="prepisFormular(\'bydleni\', \'6\', this.value)"></div>';
	text += '</div>';

	text += '</div>';

	document.getElementById("mainwindow").innerHTML = text;

	// vyplnění z globálních proměnných
	document.getElementById("najem").value = bydleni[0];
	document.getElementById("poplatky").value = bydleni[1];
	document.getElementById("vlastniByt").checked = bydleni[2];
	document.getElementById("ubytovna").checked = bydleni[3];
	document.getElementById("velikostObce").value = bydleni[4];

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

}



function prepisFormular(promenna = 'dummy', poradi = 0, hodnota = 0) {

	// přiřazení do globální proměnné
	var nazevPromenne = promenna + '[' + poradi + ']';
	eval(nazevPromenne + ' = ' + hodnota);

	// dopočítávání globálních proměnných
	slozeniDomacnosti[4] = slozeniDomacnosti[0] + slozeniDomacnosti[1] + slozeniDomacnosti[2] + slozeniDomacnosti[3];

	// vyplnění složení v růžovém pruhu
	vypisSlozeni(promenna, poradi, hodnota);

}



function vypisSlozeni(promenna = '', poradi = 0, hodnota = 0) {

	if (bydleni[3]) {var ubytovna = 'ano'} else {var ubytovna = 'ne'}
	if (prvniDospelyExekuce[0] || prvniDospelyExekuce[1]) {var prvniExekuce = 'ano'} else {var prvniExekuce = 'ne'}
	if (druhyDospelyExekuce[0] || druhyDospelyExekuce[1]) {var druhyExekuce = 'ano'} else {var druhyExekuce = 'ne'}
	if (tretiDospelyExekuce[0] || tretiDospelyExekuce[1]) {var tretiExekuce = 'ano'} else {var tretiExekuce = 'ne'}

	var parametryDomacnosti = '<div><b>Složení domácnosti: </b>dospělí: ' + slozeniDomacnosti[0] + ', děti: ' + parseInt(slozeniDomacnosti[1] + slozeniDomacnosti[2] + slozeniDomacnosti[3]) + '</br>' +
							'<b>Příjmy 1. dospělého: </b>HPP: ' + parseInt(prvniDospelyPrvniZamestnavatel[0] + prvniDospelyDruhyZamestnavatel[0]) +
													  ', DPČ: ' + parseInt(prvniDospelyPrvniZamestnavatel[2] + prvniDospelyDruhyZamestnavatel[2]) +
													  ', DPP: ' + parseInt(prvniDospelyPrvniZamestnavatel[4] + prvniDospelyDruhyZamestnavatel[4]) + '</br>' +
							'<b>Příjmy 2. dospělého: </b>HPP: ' + parseInt(druhyDospelyPrvniZamestnavatel[0] + druhyDospelyDruhyZamestnavatel[0]) +
													  ', DPČ: ' + parseInt(druhyDospelyPrvniZamestnavatel[2] + druhyDospelyDruhyZamestnavatel[2]) +
													  ', DPP: ' + parseInt(druhyDospelyPrvniZamestnavatel[4] + druhyDospelyDruhyZamestnavatel[4]) + '</br>' +
							'<b>Příjmy 3. dospělého: </b>HPP: ' + parseInt(tretiDospelyPrvniZamestnavatel[0] + tretiDospelyDruhyZamestnavatel[0]) +
													  ', DPČ: ' + parseInt(tretiDospelyPrvniZamestnavatel[2] + tretiDospelyDruhyZamestnavatel[2]) +
													  ', DPP: ' + parseInt(tretiDospelyPrvniZamestnavatel[4] + tretiDospelyDruhyZamestnavatel[4]) + '</br>' +
							'<b>Další příjmy: </b>důchody: ' + parseInt(prvniDospelyDalsiPrijmy[0] + druhyDospelyDalsiPrijmy[0] + tretiDospelyDalsiPrijmy[0]) +
											   ', rodičovská: ' + parseInt(prvniDospelyDalsiPrijmy[1] + druhyDospelyDalsiPrijmy[1] + tretiDospelyDalsiPrijmy[1]) +
											   ', podpora v nezaměstnanosti: ' + parseInt(prvniDospelyDalsiPrijmy[2] + druhyDospelyDalsiPrijmy[2] + tretiDospelyDalsiPrijmy[2]) +
											   ', nemocenská: ' + parseInt(prvniDospelyDalsiPrijmy[3] + druhyDospelyDalsiPrijmy[3] + tretiDospelyDalsiPrijmy[3]) +
											   ', ostatní: ' + parseInt(prvniDospelyDalsiPrijmy[4] + druhyDospelyDalsiPrijmy[4] + tretiDospelyDalsiPrijmy[4]) + '</br>' +
							'<b>Bydlení: </b>nájem: ' + bydleni[0] + ', poplatky: ' + bydleni[1] + ', ubytovna: ' + ubytovna + '</br>' +
							'<b>Exekuce: </b>první dospělý: ' + prvniExekuce + ', druhý dospělý: ' +  druhyExekuce + ', třetí dospělý: '  + tretiExekuce + '</br>'

	document.getElementById("upperwindow").innerHTML = parametryDomacnosti;

}



function statickyModelujRodinu() {

	var prijmyAVydajeRodinyPoZapocteniDavek = spocitejPrijmyAVydajeRodinyPoZapocteniDavek();

	var text = "<h2>Příjmy, dávky a výdaje domácnosti</h2>"
		text += "<p><strong>Rodina po započtení nákladů na bydlení: včetně dávek " + prijmyAVydajeRodinyPoZapocteniDavek[12] + " Kč, po exekuci " + prijmyAVydajeRodinyPoZapocteniDavek[13] + " Kč</strong></p>";
		text += "<h3>Detailně:</h3>"
		text += "<p>První dospělý: čistý příjem " + prijmyAVydajeRodinyPoZapocteniDavek[0] + " Kč, včetně dávek " + prijmyAVydajeRodinyPoZapocteniDavek[1] + " Kč, po exekuci " +
		prijmyAVydajeRodinyPoZapocteniDavek[2] + " Kč, exekuce: " + prijmyAVydajeRodinyPoZapocteniDavek[25] + " Kč</p>";
		text += "<p>Druhý dospělý: čistý příjem " + prijmyAVydajeRodinyPoZapocteniDavek[3] + " Kč, včetně dávek " + prijmyAVydajeRodinyPoZapocteniDavek[4] + " Kč, po exekuci " +
		prijmyAVydajeRodinyPoZapocteniDavek[5] + " Kč, exekuce: " + prijmyAVydajeRodinyPoZapocteniDavek[26] + " Kč</p>";
		text += "<p>Třetí dospělý: čistý příjem " + prijmyAVydajeRodinyPoZapocteniDavek[6] + " Kč, včetně dávek " + prijmyAVydajeRodinyPoZapocteniDavek[7] + " Kč, po exekuci " +
		prijmyAVydajeRodinyPoZapocteniDavek[8] + " Kč, exekuce: " + prijmyAVydajeRodinyPoZapocteniDavek[27] + " Kč</p>";
		text += "<p><font color=\"#33a02c\">Přídavky na děti: " + prijmyAVydajeRodinyPoZapocteniDavek[14] + " Kč.</font></p>";
		text += "<p><font color=\"#33a02c\">Příspěvek na bydlení: " + prijmyAVydajeRodinyPoZapocteniDavek[15] + " Kč.</font></p>";
		text += "<p><font color=\"#33a02c\">Příspěvek na živobytí: " + prijmyAVydajeRodinyPoZapocteniDavek[16] + " Kč.</font></p>";
		text += "<p><font color=\"#33a02c\">Doplatek na bydlení: " + prijmyAVydajeRodinyPoZapocteniDavek[17] + " Kč.</font></p>";
		text += "<p><font color=\"#33a02c\">Důchody: " + prijmyAVydajeRodinyPoZapocteniDavek[18] + " Kč.</font></p>";
		text += "<p><font color=\"#33a02c\">Rodičovská: " + prijmyAVydajeRodinyPoZapocteniDavek[19] + " Kč.</font></p>";
		text += "<p><font color=\"#33a02c\">Podpora v nezaměstnanosti: " + prijmyAVydajeRodinyPoZapocteniDavek[20] + " Kč.</font></p>";
		text += "<p><font color=\"#33a02c\">Nemocenská: " + prijmyAVydajeRodinyPoZapocteniDavek[21] + " Kč.</font></p>";
		text += "<p><font color=\"#33a02c\">Ostatní příjmy: " + prijmyAVydajeRodinyPoZapocteniDavek[22] + " Kč.</font></p>";
		text += "<p><font color=\"#e31a1c\">Nájem: " + prijmyAVydajeRodinyPoZapocteniDavek[23] + " Kč.</font></p>";
		text += "<p><font color=\"#e31a1c\">Poplatky: " + prijmyAVydajeRodinyPoZapocteniDavek[24] + " Kč.</font></p>";
		text += "<p><font color=\"#e31a1c\">Zaplaceno na exekucích: " + prijmyAVydajeRodinyPoZapocteniDavek[28] + " Kč.</font></p>";

	document.getElementById("mainwindow").innerHTML = text;

}