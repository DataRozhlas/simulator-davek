
/*

výpočet složek příjmu na HPP (https://docs.google.com/document/d/1qPdf8DUds-qW-8_0dkYZ4n7kWbKczQILsN7xchPLkSU)

vstupy:
	hrubý příjem na HPP (hrubyPrijem, integer)
	má výjimku z minimálního vyměřovacího základu na zdravotní pojištění (těžce postižený, pečuje o dítě, důchodce)? (vyjimkaMinimalniZaklad, boolean)
výstupy:
	hrubý příjem (integer)
	čistý příjem (integer)
	sociální pojištění (integer)
	zdravotní pojištění (integer)
	záloha na daň (integer)

*/

//ED
function spocitejSlozkyNaHPP(hrubyPrijem = 0, vyjimkaMinimalniZaklad = false, platiZdravotniJinde = false) {

	var cistyPrijem = 0,
		socialniPojisteni = 0,
		zdravotniPojisteniZamestnanec = 0,
		zdravotniPojisteniZamestnavatel = 0,
		doplatekNaZdravotni = 0,
		zalohaNaDan = 0,
		minimalniMzda = 12200;

	// u nulového příjmu všechno 0
	if (hrubyPrijem == 0) {
		return([0, 0, 0, 0, 0, 0, 0]);
	};

	zalohaNaDan = Math.ceil(0.15 * 1.34 * hrubyPrijem / 100) * 100;

	socialniPojisteni = 0.065 * hrubyPrijem;

	// u menšího než celého úvazku může být mzda pod minimální
	if ( (hrubyPrijem < minimalniMzda) && !vyjimkaMinimalniZaklad ) {
		zdravotniPojisteniZamestnanec = 0.045 * hrubyPrijem + 0.135 * (minimalniMzda - hrubyPrijem);
	} else if ( (hrubyPrijem < minimalniMzda) && vyjimkaMinimalniZaklad ) {
		zdravotniPojisteniZamestnanec = 0.045 * hrubyPrijem;
	} else {
		zdravotniPojisteniZamestnanec = 0.045 * hrubyPrijem;
	}

	zdravotniPojisteniZamestnavatel = 0.09 * hrubyPrijem;

	doplatekNaZdravotni = 0;

	cistyPrijem = hrubyPrijem - socialniPojisteni - zdravotniPojisteniZamestnanec - zalohaNaDan;

	return([hrubyPrijem, cistyPrijem, socialniPojisteni, zdravotniPojisteniZamestnanec, zdravotniPojisteniZamestnavatel, doplatekNaZdravotni, zalohaNaDan]);
}
//IT


/*

výpočet složek příjmu na DPČ

vstupy:
	hrubý příjem na DPČ (hrubyPrijem, integer)
	platí zdravotní pojištění jinde? (platiZdravotniJinde, boolean)
výstupy:
	hrubý příjem (integer)
	čistý příjem (integer)
	sociální pojištění (integer)
	zdravotní pojištění (integer)
	záloha na daň (integer)

*/

//ED
function spocitejSlozkyNaDPC(hrubyPrijem = 0, vyjimkaMinimalniZaklad = false, platiZdravotniJinde = false) {

	var cistyPrijem = 0,
		socialniPojisteni = 0,
		zdravotniPojisteniZamestnanec = 0,
		zdravotniPojisteniZamestnavatel = 0,
		doplatekNaZdravotni = 0,
		zalohaNaDan = 0,
		maximalniCastkaBezPojistneho = 2500,
		minimalniMzda = 12200;

	// u nulového příjmu všechno 0
	if (hrubyPrijem == 0) {
		return([0, 0, 0, 0, 0, 0, 0]);
	};

	if (hrubyPrijem < maximalniCastkaBezPojistneho) {
		zalohaNaDan = Math.ceil(0.15 * hrubyPrijem / 100) * 100;
	} else {
		zalohaNaDan = Math.ceil(0.15 * 1.34 * hrubyPrijem / 100) * 100;
	}

	if (hrubyPrijem < maximalniCastkaBezPojistneho) {
		socialniPojisteni = 0;
	} else {
		socialniPojisteni = 0.065 * hrubyPrijem;
	}

	if (hrubyPrijem < maximalniCastkaBezPojistneho) {
		zdravotniPojisteniZamestnanec = 0;
	} else if ( (hrubyPrijem < minimalniMzda) && !platiZdravotniJinde && !vyjimkaMinimalniZaklad ) {
		zdravotniPojisteniZamestnanec = 0.045 * hrubyPrijem + 0.135 * (minimalniMzda - hrubyPrijem);
	} else if ( (hrubyPrijem < minimalniMzda) && (platiZdravotniJinde || vyjimkaMinimalniZaklad) ) {
		zdravotniPojisteniZamestnanec = 0.045 * hrubyPrijem;
	} else {
		zdravotniPojisteniZamestnanec = 0.045 * hrubyPrijem;
	}

	if (hrubyPrijem < maximalniCastkaBezPojistneho) {
		zdravotniPojisteniZamestnavatel = 0;
	} else {
		zdravotniPojisteniZamestnavatel = 0.09 * hrubyPrijem;
	}

	if (hrubyPrijem < maximalniCastkaBezPojistneho) {
		doplatekNaZdravotni = 0.135 * minimalniMzda;
	} else {
		doplatekNaZdravotni = 0;
	}

	cistyPrijem = hrubyPrijem - socialniPojisteni - zdravotniPojisteniZamestnanec - zalohaNaDan;

	return([hrubyPrijem, cistyPrijem, socialniPojisteni, zdravotniPojisteniZamestnanec, zdravotniPojisteniZamestnavatel, doplatekNaZdravotni, zalohaNaDan]);
}
//IT


/*

výpočet složek příjmu na DPP

vstupy:
	hrubý příjem na DPP (hrubyPrijem, integer)
	platí zdravotní pojištění jinde? (platiZdravotniJinde, boolean)
výstupy:
	hrubý příjem (integer)
	čistý příjem (integer)
	sociální pojištění (integer)
	zdravotní pojištění (integer)
	záloha na daň (integer)

*/

//ED
function spocitejSlozkyNaDPP(hrubyPrijem = 0, vyjimkaMinimalniZaklad = false, platiZdravotniJinde = false) {

	var cistyPrijem = 0,
		socialniPojisteni = 0,
		zdravotniPojisteniZamestnanec = 0,
		zdravotniPojisteniZamestnavatel = 0,
		doplatekNaZdravotni = 0,
		zalohaNaDan = 0,
		maximalniCastkaBezPojistneho = 10000,
		minimalniMzda = 12200;

	// u nulového příjmu všechno 0
	if (hrubyPrijem == 0) {
		return([0, 0, 0, 0, 0, 0, 0]);
	};

	if (hrubyPrijem < maximalniCastkaBezPojistneho) {
		zalohaNaDan = Math.ceil(0.15 * hrubyPrijem / 100) * 100;
	} else {
		zalohaNaDan = Math.ceil(0.15 * 1.34 * hrubyPrijem / 100) * 100;
	}

	if (hrubyPrijem < maximalniCastkaBezPojistneho) {
		socialniPojisteni = 0;
	} else {
		socialniPojisteni = 0.065 * hrubyPrijem;
	}

	if (hrubyPrijem < maximalniCastkaBezPojistneho) {
		zdravotniPojisteniZamestnanec = 0;
	} else if ( (hrubyPrijem < minimalniMzda) && !platiZdravotniJinde && !vyjimkaMinimalniZaklad ) {
		zdravotniPojisteniZamestnanec = 0.045 * hrubyPrijem + 0.135 * (minimalniMzda - hrubyPrijem);
	} else if ( (hrubyPrijem < minimalniMzda) && (platiZdravotniJinde || vyjimkaMinimalniZaklad) ) {
		zdravotniPojisteniZamestnanec = 0.045 * hrubyPrijem;
	} else {
		zdravotniPojisteniZamestnanec = 0.045 * hrubyPrijem;
	}

	if (hrubyPrijem < maximalniCastkaBezPojistneho) {
		zdravotniPojisteniZamestnavatel = 0;
	} else {
		zdravotniPojisteniZamestnavatel = 0.09 * hrubyPrijem;
	}

	if (hrubyPrijem < maximalniCastkaBezPojistneho) {
		doplatekNaZdravotni = 0.135 * minimalniMzda;
	} else {
		doplatekNaZdravotni = 0;
	}

	cistyPrijem = hrubyPrijem - socialniPojisteni - zdravotniPojisteniZamestnanec - zalohaNaDan;

	return([hrubyPrijem, cistyPrijem, socialniPojisteni, zdravotniPojisteniZamestnanec, zdravotniPojisteniZamestnavatel, doplatekNaZdravotni, zalohaNaDan]);
}
//IT


/*

výpočet čistého příjmu po uplatnění daňových slev

vstupy:
	složky příjmu na HPP (prijemNaHPP, [hrubý příjem, čistý příjem, sociální pojištění, zdravotní pojištění, záloha na daň])
	složky příjmu na DPC (prijemNaDPC, [hrubý příjem, čistý příjem, sociální pojištění, zdravotní pojištění, záloha na daň])
	složky příjmu na DPP (prijemNaDPP, [hrubý příjem, čistý příjem, sociální pojištění, zdravotní pojištění, záloha na daň])
	podepsal prohlášení o dani? (ruzovyPapir, boolean)
	na kolik vyživovaných dětí upolatňuje daňový bonus (pocetVyzivovanychDeti, integer)
výstupy:
	čistý příjem (integer)
	čistý příjem bez bonusu na děti (integer)
	sociální pojištění (integer)
	zdravotní pojištění (integer)
	daň (integer)
poznámky:
	daňový bonus na děti je podmíněný šestinásobkem minimální mzdy, ten počítáme z aktuální minimální mzdy, ne příjmů za minulý rok, jak by to mělo být správně; o něm ale nic nevíme

*/

//ED
function spocitejPrijemUZamestnavatele(prijem = [0, 0, 0, 0, 0, 0, 0], ruzovyPapir = false, pocetVyzivovanychDeti = 0) {

	var slevaNaDeti = 0,
		danovyBonusNaDeti = 0,
		slevaNaPrvniDite = 15204 / 12, // 1267
		slevaNaDruheDite = 19404 / 12, // 1617
		slevaNaTretiDite = 24204 / 12, // 2017
		limitBonusuNaDeti = 60300 / 12, // 5025
		slevaNaPoplatnika = 24840 / 12, // 2070
		zalohaNaDanPoSleveNaPoplatnika = 0,
		zaplacenaDan = 0,
		cistyPrijem = 0,
		hrubyPrijem = 0,
		socialniPojisteni = 0,
		zdravotniPojisteniZamestnanec = 0,
		zdravotniPojisteniZamestnavatel = 0,
		zalohaNaDan = 0,
		minimalniMzda = 12200,
		narokNaBonusNaDeti = false;

	// u nulového příjmu všechno 0
	if (prijem[0] == 0) {
		return([0, 0, 0, 0, 0, 0, 0]);
	};

	// daňové zvýhodnění na děti
	if (pocetVyzivovanychDeti == 1) {
			slevaNaDeti = slevaNaPrvniDite;
		} else if (pocetVyzivovanychDeti == 2) {
			slevaNaDeti = slevaNaPrvniDite + slevaNaDruheDite;
		} else if (pocetVyzivovanychDeti > 2) {
			slevaNaDeti = slevaNaPrvniDite + slevaNaDruheDite + (pocetVyzivovanychDeti - 2) * slevaNaTretiDite;
		};

	// základní hodnoty - bez slevy na dani
	hrubyPrijem = prijem[0];
	cistyPrijem = prijem[1];
	socialniPojisteni = prijem[2];
	zdravotniPojisteniZamestnanec = prijem[3];
	zdravotniPojisteniZamestnavatel = prijem[4];
	doplatekNaZdravotni = prijem[5];
	zalohaNaDan = prijem[6];

	// pokud je podepsaný růžový papír, aplikují se slevy na dani
	if (ruzovyPapir) {

		// daňový bonus na děti je navázaný na roční příjem alespoň ve výši šestinásobku minimální mzdy, maximální výše je limit bonusu na děti
		if ( ( (12 * hrubyPrijem) > (6 * minimalniMzda) ) && (pocetVyzivovanychDeti > 0) ) {
			narokNaBonusNaDeti = true;
		};

		// pokud je záloha po započtení slevy na poplatníka kladná, nic se neděje; pokud záporná, počítá se s nulou
		zalohaNaDanPoSleveNaPoplatnika = Math.max(zalohaNaDan - slevaNaPoplatnika, 0);

		// aplikace slevy na dítě
		zaplacenaDan = zalohaNaDanPoSleveNaPoplatnika - slevaNaDeti;

		// pokud je záloha po slevě na dítě záporná a existuje nárok, považuje se za daňový bonus
		if(zaplacenaDan < 0) {
			if (narokNaBonusNaDeti) {
				danovyBonusNaDeti = -zaplacenaDan;
				zaplacenaDan = 0;

			// pokud nárok neexistuje, jsou bonus i sleva nulové
			} else {
				danovyBonusNaDeti = 0;
				zaplacenaDan = 0;
			}
		}

		// daňový bonus nesmí překonat limit
		danovyBonusNaDeti = Math.min(danovyBonusNaDeti, limitBonusuNaDeti);

	}

	cistyPrijem = hrubyPrijem - socialniPojisteni - zdravotniPojisteniZamestnanec - zalohaNaDan;

	return([cistyPrijem, danovyBonusNaDeti, socialniPojisteni, zdravotniPojisteniZamestnanec, zdravotniPojisteniZamestnavatel, doplatekNaZdravotni, zaplacenaDan]);
}
//IT


/*

výpočet celkových příjmů jednoho dospělého

vstupy:
	čistý příjem z první práce (prijemPrace1, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
	čistý příjem z druhé práce (prijemPrace2, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
	čistý příjem z třetí práce (prijemPrace3, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
výstupy:
	čistý příjem (integer)
	čistý příjem bez bonusu na děti (integer)
	sociální pojištění (integer)
	zdravotní pojištění (integer)
	záloha na daň (integer)

*/

//ED
function spocitejPrijemDospeleho(prijemPrace1 = [0, 0, 0, 0, 0, 0, 0], prijemPrace2 = [0, 0, 0, 0, 0, 0, 0]) {

	var minimalniMzda = 12200,
		doplatekNaZdravotni = 0,
		cistyPrijem = 0,
		danovyBonusNaDeti = 0,
		socialniPojisteni = 0,
		zdravotniPojisteniZamestnanec = 0,
		zdravotniPojisteniZamestnavatel = 0,
		zaplacenaDan = 0;

	// na nulové vstupy nulové výstupy
	if (prijemPrace1[0] == 0 && prijemPrace2[0] == 0) {
		return([0, 0, 0, 0, 0, 0, 0]);
	};

	cistyPrijem = prijemPrace1[0] + prijemPrace2[0];
	danovyBonusNaDeti = prijemPrace1[1] + prijemPrace2[1];
	socialniPojisteni = prijemPrace1[2] + prijemPrace2[2];
	zdravotniPojisteniZamestnanec = prijemPrace1[3] + prijemPrace2[3];
	zdravotniPojisteniZamestnavatel = prijemPrace1[4] + prijemPrace2[4];
	doplatekNaZdravotni = prijemPrace1[5] + prijemPrace2[5];
	zaplacenaDan = prijemPrace1[6] + prijemPrace2[6];

	return([cistyPrijem, danovyBonusNaDeti, socialniPojisteni, zdravotniPojisteniZamestnanec, zdravotniPojisteniZamestnavatel, doplatekNaZdravotni, zaplacenaDan]);

}
//IT


/*

výpočet čistých příjmů domácnosti ze zaměstnání

vstupy:
	příjem prvního dospělého (prijemPrvnihoDospeleho, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
	příjem druhého dospělého (prijemDruhehoDospeleho, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
	příjem třetího dospělého (prijemTretihoDospeleho, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
výstupy:
	čistý příjem domácnosti (integer)
	čistý příjem domácnosti bez bonusu na děti (integer)

*/

//ED
function spocitejCistyPrijemDomacnostiZeZamestnani(prijemPrvnihoDospeleho = [0, 0, 0, 0, 0, 0, 0], prijemDruhehoDospeleho = [0, 0, 0, 0, 0, 0, 0],
	prijemTretihoDospeleho = [0, 0, 0, 0, 0, 0, 0]) {

	var cistyPrijem = 0,
		bonusNaDeti = 0,
		doplatekNaZdravotni = 0;

	// na nulové vstupy nulové výstupy
	if (prijemPrvnihoDospeleho[0] == 0 && prijemDruhehoDospeleho[0] == 0 && prijemTretihoDospeleho[0] == 0) {
		return([0, 0, 0]);
	};

	cistyPrijem = prijemPrvnihoDospeleho[0] + prijemDruhehoDospeleho[0] + prijemTretihoDospeleho[0];

	bonusNaDeti = prijemPrvnihoDospeleho[1] + prijemDruhehoDospeleho[1] + prijemTretihoDospeleho[1];

	doplatekNaZdravotni = prijemPrvnihoDospeleho[5] + prijemDruhehoDospeleho[5] + prijemTretihoDospeleho[5];

	return([cistyPrijem, bonusNaDeti, doplatekNaZdravotni]);
}
//IT


/*

výpočet životního minima

vstupy:
	počet dospělých (pocetDospelych, integer)
	počet nezaopatřených dětí pod 6 let (pocetDetiPod6, integer)
	počet nezaopatřených dětí mezi 6 a 15 lety (pocetDeti6az15, integer)
	počet nezaopatřených dětí mezi 15 a 26 lety (pocetDeti15az26, integer)
	počet lidí se sníženým životním minimem na existenční (snizeneMinimum, integer)
výstupy:
	životní minimum domácnosti pro dávky státní sociální podpory (integer)
	životní minimum domácnosti pro dávky v hmotné nouzi (integer)

*/

function spocitejZivotniMinimum(pocetDospelych = 0, pocetDetiPod6 = 0, pocetDeti6az15 = 0, pocetDeti15az26 = 0, snizeneMinimum = 0) {

	var zivotniMinimumProSSP = 0,
		zivotniMinimumProHN = 0,
		osamelyDospely = 3410,
		prvniDospely = 3140,
		dalsiDospely = 2830,
		dite15az26 = 2450,
		dite6az15 = 2140,
		ditePod6 = 1740,
		existencniMinimum = 2200;

	// u SSP neexistuje snížené životní minimum
	if ( (pocetDospelych == 1) && (pocetDetiPod6 == 0) && (pocetDeti6az15 == 0) && (pocetDeti15az26 == 0) ) {
		zivotniMinimumProSSP = osamelyDospely;
	} else {
		// první dospělý
		zivotniMinimumProSSP = prvniDospely;
		// další dospělí
		zivotniMinimumProSSP += dalsiDospely * (pocetDospelych-1);
		// děti
		zivotniMinimumProSSP += dite15az26 * pocetDeti15az26 + dite6az15 * pocetDeti6az15 + ditePod6 * pocetDetiPod6;
	}

	zivotniMinimumProHN = zivotniMinimumProSSP;

	// u HN se životní mimum může snížit
	if ( (snizeneMinimum == 1) && (pocetDospelych == 1) ) {
		zivotniMinimumProHN -= (osamelyDospely - existencniMinimum);
	} else if ( (snizeneMinimum == 1) && (pocetDospelych > 1) ) {
		zivotniMinimumProHN -= (prvniDospely - existencniMinimum);
	} else if (snizeneMinimum > 1) {
		zivotniMinimumProHN -= (prvniDospely - existencniMinimum)
		zivotniMinimumProHN -= (snizeneMinimum - 1) * (dalsiDospely - existencniMinimum)
	}

	return([zivotniMinimumProSSP, zivotniMinimumProHN]);
}



/*

výpočet příspěvků na děti

vstupy:
	čistý příjem domácnosti (cistyPrijemDomacnosti, [cistyPrijemDomacnosti, cistyPrijemDomacnostiBezBonusuNaDeti])
	příjem prvního dospělého (prijemPrvnihoDospeleho, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
	příjem druhého dospělého (prijemDruhehoDospeleho, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
	příjem třetího dospělého (prijemTretihoDospeleho, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
	životní minimum (zivotniMinimum, [životní minimum pro SSP, životní minimum pro HN])
	počet nezaopatřených dětí pod 6 let (pocetDetiPod6, integer)
	počet nezaopatřených dětí mezi 6 a 15 lety (pocetDeti6az15, integer)
	počet nezaopatřených dětí mezi 15 a 26 lety (pocetDeti15az26, integer)
	pobírá rodičovskou, mateřskou, nebo podporu v nezaměstnanosti? (narokNaVyssiDavky, boolean) XXX půjde dopočítat z globálních proměnných
výstupy:
	přídavky na děti (integer)
poznámky:
	pracujeme s čistým příjmem ze zaměstnání, správně má být průměrný příjem za uplynulý kalendářní rok, o tom ale nic nevíme

*/

//ED
function spocitejPridavkyNaDeti(cistyPrijemDomacnosti = [0, 0, 0], prijemPrvnihoDospeleho = [0, 0, 0, 0, 0, 0, 0], prijemDruhehoDospeleho = [0, 0, 0, 0, 0, 0, 0],
	prijemTretihoDospeleho = [0, 0, 0, 0, 0, 0, 0], zivotniMinimum = [0, 0], pocetDetiPod6 = 0, pocetDeti6az15 = 0, pocetDeti15az26 = 0, narokNaVyssiDavky = false) {

	var pridavkyNaDeti = 0,
		pridavekDite15az26 = 700,
		pridavekDite6az15 = 610,
		pridavekDitePod6 = 500,
		osamelyDospely = 3410,
		zivotniMinimumProSSP = 0;

	// životní minimum pro SSP
	zivotniMinimumProSSP = zivotniMinimum[0];

	if (cistyPrijemDomacnosti[0] < 2.7 * zivotniMinimumProSSP) {
		pridavkyNaDeti = pridavekDite15az26 * pocetDeti15az26 + pridavekDite6az15 * pocetDeti6az15 + pridavekDitePod6 * pocetDetiPod6;
	}

	// zvýšení dávky (pro každé dítě) o 300 Kč/měsíc, pokud měla alespoň jedna osoba v domácnosti příjem alespoň ve výší ŽM jednotlivce (3410) nebo má rodičovskou/mateřskou/podporu v nezaměstnanosti/příspěvek na péči
	if (pridavkyNaDeti > 0) {
		if (narokNaVyssiDavky || (prijemPrvnihoDospeleho[0] > osamelyDospely) || (prijemDruhehoDospeleho[0] > osamelyDospely)) {
			pridavkyNaDeti = pridavkyNaDeti + (pocetDetiPod6 + pocetDeti6az15 + pocetDeti15az26) * 300;
		}
	}

	return(pridavkyNaDeti)
}
//IT


/*

výpočet nákladů za bydlení pro SSP

vstupy:
	nájem, u vlastního bydlení nehraje roli (najem, integer)
	výdaje za energie a ostatní poplatky spojené s bydlením (poplatky, integer)
	počet členů domácnosti (pocetClenuDomacnosti, integer)
	bydlí ve vlastním nebo družstevním bytě? (vlastniBydlení, boolean)
	bydlí na ubytovně, na chatě nebo v podnájmu? (ubytovna, boolean)
	velikost obce, kde rodina žije (velikostObce, 1 = Praha, 2 = nad 100 000, 3 = nad 50 000, 4 = nad 10 000, 5 = pod 10 000)
	místně obvyklé náklady, určené místním pracákem (mistneObvykleNaklady, 0 = nestanovené)
	pocetClenuDomacnostiSTrvalymPobytemJinde
výstupy:
	uznatelné náklady na bydlení pro dávky SSP (integer)
	normativ nákladů na bydlení pro dávky SSP (integer)

*/

function spocitejNakladyNaBydleniProSSP(najem = 0, poplatky = 0, pocetClenuDomacnosti = 0, pocetClenuDomacnostiSTrvalymPobytemJinde = 0, vlastniBydleni = false,
	velikostObce = 1) {

	var skutecneNakladyNaBydleni = 0,
		normativniNakladyNaBydleni = 0,
		uznatelneNakladyNaBydleni = 0,
		pocetClenuDomacnostiProDavky = 0;

	// u SSP se do společné domácnosti nepočítají členové domácnosti s trvalým pobytem jinde
	pocetClenuDomacnostiProDavky = pocetClenuDomacnosti - pocetClenuDomacnostiSTrvalymPobytemJinde;

	// u vlastního bytu se místo nájmu počítá normativ
	if (vlastniBydleni) {
		switch(pocetClenuDomacnostiProDavky) {
			case 1: najem = 1988; break;
			case 2: najem = 2721; break;
			case 3: najem = 3558; break;
			default: najem = 4291;
		}
	}

	// náklady na bydlení
	skutecneNakladyNaBydleni = najem + poplatky;

	// normativní náklady, pokud bydlí ve vlastním
	if (vlastniBydleni) {
		switch(pocetClenuDomacnostiProDavky) {
			case 1: normativniNakladyNaBydleni = 4420; break;
			case 2: normativniNakladyNaBydleni = 6489; break;
			case 3: normativniNakladyNaBydleni = 8939; break;
			default: normativniNakladyNaBydleni = 11298;
		}

	// normativní náklady, pokud bydlí v nájmu
	} else {
		if (velikostObce == 1) {
				switch (pocetClenuDomacnostiProDavky) {
					case 1: normativniNakladyNaBydleni = 7870; break;
					case 2: normativniNakladyNaBydleni = 11186; break;
					case 3: normativniNakladyNaBydleni = 15116; break;
					default: normativniNakladyNaBydleni = 18827;
				}
			} else if (velikostObce == 2) {
				switch (pocetClenuDomacnostiProDavky) {
					case 1: normativniNakladyNaBydleni = 6227; break;
					case 2: normativniNakladyNaBydleni = 8938; break;
					case 3: normativniNakladyNaBydleni = 12176; break;
					default: normativniNakladyNaBydleni = 15282;
				}
			} else if (velikostObce == 3) {
				switch (pocetClenuDomacnostiProDavky) {
					case 1: normativniNakladyNaBydleni = 5928; break;
					case 2: normativniNakladyNaBydleni = 8530; break;
					case 3: normativniNakladyNaBydleni = 11642; break;
					default: normativniNakladyNaBydleni = 14639;
				}
			} else if (velikostObce == 4) {
				switch (pocetClenuDomacnostiProDavky) {
					case 1: normativniNakladyNaBydleni = 5036; break;
					case 2: normativniNakladyNaBydleni = 7308; break;
					case 3: normativniNakladyNaBydleni = 10045; break;
					default: normativniNakladyNaBydleni = 12712;
				}
			} else {
				switch (pocetClenuDomacnostiProDavky) {
					case 1: normativniNakladyNaBydleni = 4844; break;
					case 2: normativniNakladyNaBydleni = 7046; break;
					case 3: normativniNakladyNaBydleni = 9702; break;
					default: normativniNakladyNaBydleni = 12299;
				}
			}
		}

	// skutečné náklady na bydlení nesmí být vyšší než normativ
	uznatelneNakladyNaBydleni = Math.min(skutecneNakladyNaBydleni, normativniNakladyNaBydleni);

	return([uznatelneNakladyNaBydleni, normativniNakladyNaBydleni]);
}



/*

výpočet nákladů za bydlení pro HN

vstupy:
	nájem, u vlastního bydlení nehraje roli (najem, integer)
	výdaje za energie a ostatní poplatky spojené s bydlením (poplatky, integer)
	počet členů domácnosti (pocetClenuDomacnosti, integer)
	bydlí ve vlastním nebo družstevním bytě? (vlastniBydlení, boolean)
	bydlí na ubytovně, na chatě nebo v podnájmu? (ubytovna, boolean)
	velikost obce, kde rodina žije (velikostObce, 1 = Praha, 2 = nad 100 000, 3 = nad 50 000, 4 = nad 10 000, 5 = pod 10 000)
	místně obvyklé náklady, určené místním pracákem (mistneObvykleNaklady, 0 = nestanovené)
	pocetClenuDomacnostiSTrvalymPobytemJinde
výstupy:
	uznatelné náklady na bydlení pro dávky SSP (integer)
	normativ nákladů na bydlení pro dávky SSP (integer)

*/

function spocitejNakladyNaBydleniProHN(najem = 0, poplatky = 0, pocetClenuDomacnosti = 0, vlastniBydleni = false, ubytovna = false, velikostObce = 1,
	mistneObvykleNaklady = 0) {

	var skutecneNakladyNaBydleni = 0,
		normativniNakladyNaBydleni = 0,
		uznatelneNakladyNaBydleni = 0,
		pocetClenuDomacnostiProDavky = 0;

	// u HN se do společné domácnosti počítají i členové domácnosti s trvalým pobytem jinde, takže netřeba brát v úvahu
	pocetClenuDomacnostiProDavky = pocetClenuDomacnosti;

	// u vlastního bytu se místo nájmu počítá normativní nájem
	if (vlastniBydleni) {
		switch(pocetClenuDomacnostiProDavky) {
			case 1: najem = 1988; break;
			case 2: najem = 2721; break;
			case 3: najem = 3558; break;
			default: najem = 4291;
		}
	}

	// náklady na bydlení
	skutecneNakladyNaBydleni = najem + poplatky;

	// normativní náklady, pokud bydlí ve vlastním
	if (vlastniBydleni) {
		switch(pocetClenuDomacnostiProDavky) {
			case 1: normativniNakladyNaBydleni = 4420; break;
			case 2: normativniNakladyNaBydleni = 6489; break;
			case 3: normativniNakladyNaBydleni = 8939; break;
			default: normativniNakladyNaBydleni = 11298;
		}

	// normativní náklady, pokud bydlí v nájmu
	} else {
		if (velikostObce == 1) {
				switch (pocetClenuDomacnostiProDavky) {
					case 1: normativniNakladyNaBydleni = 7870; break;
					case 2: normativniNakladyNaBydleni = 11186; break;
					case 3: normativniNakladyNaBydleni = 15116; break;
					default: normativniNakladyNaBydleni = 18827;
				}
			} else if (velikostObce == 2) {
				switch (pocetClenuDomacnostiProDavky) {
					case 1: normativniNakladyNaBydleni = 6227; break;
					case 2: normativniNakladyNaBydleni = 8938; break;
					case 3: normativniNakladyNaBydleni = 12176; break;
					default: normativniNakladyNaBydleni = 15282;
				}
			} else if (velikostObce == 3) {
				switch (pocetClenuDomacnostiProDavky) {
					case 1: normativniNakladyNaBydleni = 5928; break;
					case 2: normativniNakladyNaBydleni = 8530; break;
					case 3: normativniNakladyNaBydleni = 11642; break;
					default: normativniNakladyNaBydleni = 14639;
				}
			} else if (velikostObce == 4) {
				switch (pocetClenuDomacnostiProDavky) {
					case 1: normativniNakladyNaBydleni = 5036; break;
					case 2: normativniNakladyNaBydleni = 7308; break;
					case 3: normativniNakladyNaBydleni = 10045; break;
					default: normativniNakladyNaBydleni = 12712;
				}
			} else {
				switch (pocetClenuDomacnostiProDavky) {
					case 1: normativniNakladyNaBydleni = 4844; break;
					case 2: normativniNakladyNaBydleni = 7046; break;
					case 3: normativniNakladyNaBydleni = 9702; break;
					default: normativniNakladyNaBydleni = 12299;
				}
			}
		}

	// skutečné náklady na bydlení nesmí být vyšší než normativ; počítá se 100 % normativu, s výjimkou ubytoven, podnájmů a chat, kde je to 80 % normativu
	if (ubytovna) {
		uznatelneNakladyNaBydleni = Math.min(skutecneNakladyNaBydleni, 0.8 * normativniNakladyNaBydleni);
	} else {
		uznatelneNakladyNaBydleni = Math.min(skutecneNakladyNaBydleni, normativniNakladyNaBydleni);
	}

	// U HN úřad zastřešuje uznatelné náklady místně obvyklými náklady (+ speciální postup na výpočet energií, ten zatím neřešíme)
	if (mistneObvykleNaklady > 0) {
		uznatelneNakladyNaBydleni = Math.min(uznatelneNakladyNaBydleni, mistneObvykleNaklady);
	}

	return([uznatelneNakladyNaBydleni, normativniNakladyNaBydleni]);
}



/*

výpočet příspěvku na bydlení

vstupy:
	čistý příjem domácnosti bez bonusu na děti (cistyPrijemBezBonusuNaDeti, integer)
	náklady spojené s bydlením (nakladyNaBydleni, [uznatelné náklady na bydlení pro SSP, uznatelné náklady na bydlení pro HN, normativní náklady na bydlení])
	životní minimum domácnosti (zivotniMinimum, [životní minimum pro SSP, životní minimum pro HN])
	výše důchodů (duchody, integer)
	rodičovská (rodicovska, integer)
	přídavky na děti (pridavkyNaDeti, integer)
	podpora v nezaměstnanosti (podporaVNezamestnanosti, integer)
	nemocenská (nemocenska, integer)
	ostatní příjmy (ostatniPrijmy, integer)
	velikost obce, kde rodina žije (velikostObce, 1 = Praha, 2 = nad 100 000, 3 = nad 50 000, 4 = nad 10 000, 5 = pod 10 000)
	pobyt na ubytovně (ubytovna, boolean)
výstupy:
	příspěvek na bydlení (integer)

*/

//ED
function spocitejPrispevekNaBydleni(cistyPrijemDomacnosti = [0, 0, 0], nakladyNaBydleniProSSP = [0, 0], zivotniMinimum = [0, 0], duchody = 0, rodicovska = 0,
	pridavkyNaDeti = 0, podporaVNezamestnanosti = 0, nemocenska = 0, ostatniPrijmy = 0, velikostObce = 1, ubytovna = false) {

	var koeficientNakladu = 0,
		rozhodnyPrijem = 0,
		uznatelneNakladyProSSP = 0,
		prispevekNaBydleni = 0,
		rozhodnyPrijem = 0,
		narokNaPrispevekNaBydleni = false,
		zivotniMinimumProSSP = 0,
		cistyPrijemBezBonusuNaDeti = 0,
		normativniNaklady = 0;

	// životní minimum pro SSP
	zivotniMinimumProSSP = zivotniMinimum[0];

	// náklady na bydlení pro SSP
	uznatelneNakladyProSSP = nakladyNaBydleniProSSP[0];

	// pro příspěvek na bydlení se počítá čistý příjem domácnosti bez bonusu na děti
	cistyPrijemBezBonusuNaDeti = cistyPrijemDomacnosti[0] - cistyPrijemDomacnosti[1];

	// koeficient nákladů na bydlení: v Praze 0,35, mimo Prahu 0,3
	if (velikostObce == 1) {
		koeficientNakladu = 0.35;
	} else {
		koeficientNakladu = 0.3;
	}

	// rozhodný příjem pro bydlení je součet čistých příjmů bez bonusu na děti, důchodů a dávek ssp; nejméně ale životní minimum
	rozhodnyPrijem = Math.max(zivotniMinimumProSSP, cistyPrijemBezBonusuNaDeti + duchody + rodicovska + pridavkyNaDeti + podporaVNezamestnanosti + nemocenska + ostatniPrijmy);

	// nárok na příspěvek na bydlení vzniká, když jsou náklady na bydlení vyšší než 30 % rozhodného příjmu ...
	if (uznatelneNakladyProSSP > (koeficientNakladu * rozhodnyPrijem)) {
		narokNaPrispevekNaBydleni = true;
	}

	// příspěvek na bydlení jsou uznatelné náklady mínus 30 % rozhodného příjmu; pokud je záporný, tak 0
	if (narokNaPrispevekNaBydleni) {
		prispevekNaBydleni = uznatelneNakladyProSSP - (koeficientNakladu * rozhodnyPrijem);
	}

	if (ubytovna) {
		prispevekNaBydleni = 0;
	}

return(prispevekNaBydleni);
}
//IT

/*

výpočet příspěvku na živobytí

vstupy:
	čistý příjem domácnosti bez bonusu na děti (cistyPrijemBezBonusuNaDeti, integer)
	náklady spojené s bydlením (nakladyNaBydleni, [uznatelné náklady na bydlení pro SSP, uznatelné náklady na bydlení pro HN, normativní náklady na bydlení])
	životní minimum domácnosti (zivotniMinimum, [životní minimum pro SSP, životní minimum pro HN])
	výše důchodů (duchody, integer)
	rodičovská (rodicovska, integer)
	přídavky na děti (pridavkyNaDeti, integer)
	podpora v nezaměstnanosti (podporaVNezamestnanosti, integer)
	nemocenská (nemocenska, integer)
	ostatní příjmy (ostatniPrijmy, integer)
výstupy:
	příspěvek na živobytí (integer)
poznámky:
	může být nedeterministická: "Částka živobytí je stanovena pro každou osobu individuálně, a to na základě hodnocení její snahy a možností",
	"Vzhledem k tomu, že v praxi dochází k různým situacím, které jsou zcela individuálního charakteru, má orgán pomoci v hmotné nouzi možnost z okruhu společně posuzovaných osob některou osobu vyloučit",

*/

//ED
function spocitejPrispevekNaZivobyti(cistyPrijemDomacnosti = [0, 0, 0], nakladyNaBydleniProHN = [0, 0], zivotniMinimum = [0, 0], duchody = 0, rodicovska = 0, pridavkyNaDeti = 0,
	podporaVNezamestnanosti = 0, nemocenska = 0, ostatniPrijmy = 0) {

	var castkaZivobyti = 0,
		prispevekNaZivobyti = 0,
		rozhodnyPrijem = 0,
		narokNaPrispevekNaZivobyti = false,
		zivotniMinimumProHN = 0,
		uznatelneNakladyProHN = 0,
		cistyPrijemBezBonusuNaDeti = 0;

	// životní minimum pro HN
	zivotniMinimumProHN = zivotniMinimum[1];

	// náklady na bydlení pro SSP
	uznatelneNakladyProHN = nakladyNaBydleniProHN[0];

	// pro příspěvek na živobytí se počítá čistý příjem domácnosti bez bonusu na děti; u OBZP se navíc odečítá doplatek na zdravotní
	cistyPrijemBezBonusuNaDeti = cistyPrijemDomacnosti[0] - cistyPrijemDomacnosti[1] - cistyPrijemDomacnosti[2];

	castkaZivobyti = zivotniMinimumProHN;

	// rozhodný příjem pro příspěvek na živobytí je součet 70 % čistých příjmů bez bonusu na děti, 80 % důchodů a pojistných dávek, 100 % ostatních příjmů XXX ale ne příspěvek na bydlení?
	rozhodnyPrijem = 0.7 * cistyPrijemBezBonusuNaDeti + 0.8 * (duchody + podporaVNezamestnanosti + nemocenska) + rodicovska + pridavkyNaDeti + ostatniPrijmy;

	// od rozhodného příjmu se pro výpočet odečte 30 procent reálných nákladů na bydlení
	rozhodnyPrijem -= Math.min(0.3 * rozhodnyPrijem, uznatelneNakladyProHN)

	// nárok na příspěvek na bydlení vzniká, když příjem domácnosti nedosahuje částky živobytí
	if (rozhodnyPrijem < castkaZivobyti) {
		narokNaPrispevekNaZivobyti = true;
	}

	if (narokNaPrispevekNaZivobyti) {
		prispevekNaZivobyti = castkaZivobyti - rozhodnyPrijem;
	}

	return(prispevekNaZivobyti);
}
//IT


/*

výpočet doplatku na bydlení

vstupy:
	čistý příjem domácnosti bez bonusu na děti (cistyPrijemBezBonusuNaDeti, integer)
	náklady spojené s bydlením; první hodnota pole jsou uznatelné náklady, druhá normativ (nakladyNaBydleni, integer[])
	životní minimum domácnosti (zivotniMinimum, integer)
	výše důchodů (duchody, integer)
	rodičovská (rodicovska, integer)
	přídavky na děti (pridavkyNaDeti, integer)
	podpora v nezaměstnanosti (podporaVNezamestnanosti, integer)
	nemocenská (nemocenska, integer)
	ostatní příjmy (ostatniPrijmy, integer)
výstupy:
	příspěvek na živobytí (integer)
poznámky:
	opět, může být nedeterministická, viz výše

*/

//ED
function spocitejDoplatekNaBydleni(cistyPrijemDomacnosti = [0, 0, 0], nakladyNaBydleniProHN = [0, 0], zivotniMinimum = [0, 0], prispevekNaZivobyti = 0, prispevekNaBydleni = 0, duchody = 0,
	rodicovska = 0, pridavkyNaDeti = 0, podporaVNezamestnanosti = 0, nemocenska = 0, ostatniPrijmy = 0) {

	var castkaZivobyti = 0,
		doplatekNaBydleni = 0,
		rozhodnyPrijem = 0,
		narokNaDoplatekNaBydleni = false,
		zivotniMinimumProHN = 0,
		uznatelneNakladyProHN = 0;

	// životní minimum pro HN
	zivotniMinimumProHN = zivotniMinimum[1];

	// náklady na bydlení pro SSP
	uznatelneNakladyProHN = nakladyNaBydleniProHN[0];

	// pro příspěvek na živobytí se počítá čistý příjem domácnosti bez bonusu na děti; u OBZP se navíc odečítá doplatek na zdravotní
	cistyPrijemBezBonusuNaDeti = cistyPrijemDomacnosti[0] - cistyPrijemDomacnosti[1] - cistyPrijemDomacnosti[2];

	castkaZivobyti = zivotniMinimumProHN;

	// rozhodný příjem pro doplatek na bydlení je součet 70 % čistých příjmů bez bonusu na děti, 80 % důchodů a pojistných dávek a 100 % ostatních příjmů XXX: příspěvek na bydlení i živobytí?
	rozhodnyPrijem = 0.7 * cistyPrijemBezBonusuNaDeti + 0.8 * (duchody + podporaVNezamestnanosti + nemocenska) + rodicovska + pridavkyNaDeti + ostatniPrijmy + prispevekNaBydleni + prispevekNaZivobyti;

	// nárok na doplatek na bydlení má vlastník bytu, který jej užívá, nebo jiná osoba, která užívá byt na základě smlouvy, jestliže by po úhradě odůvodněných nákladů na bydlení snížených o příspěvek na bydlení podle jiného právního předpisu
	if ( (rozhodnyPrijem - uznatelneNakladyProHN) < castkaZivobyti) {

	// podmínkou nároku na doplatek na bydlení je získání nároku na příspěvek na živobytí; doplatek na bydlení lze přiznat s přihlédnutím k jejím celkovým sociálním a majetkovým poměrům také osobě, které příspěvek na živobytí nebyl přiznán z důvodu, že příjem osoby a společně posuzovaných osob přesáhl částku živobytí osoby a společně posuzovaných osob, ale nepřesáhl 1,3násobek částky živobytí osoby a společně posuzovaných osob.
		if (prispevekNaZivobyti > 0) {
			narokNaDoplatekNaBydleni = true;
		}
	}

	if (narokNaDoplatekNaBydleni) {
		doplatekNaBydleni = castkaZivobyti - (rozhodnyPrijem - uznatelneNakladyProHN);
	}

	return(doplatekNaBydleni);
}
//IT


/*

výpočet příjmů po exekuci

vstupy:
výstupy:
poznámky:
	v tuhle chvíli nemáme žádné příjmy, které nejdou exekuovat

*/

//ED
function spocitejPrijemDospelehoPoExekuci(prijemDospeleho = [0, 0, 0, 0, 0, 0, 0], duchody = 0, rodicovska = 0, podporaVNezamestnanosti = 0, nemocenska = 0, ostatniPrijmy = 0,
	prednostniExekuce = 0, neprednostniExekuce = 0, dalsiVyzivovaneOsoby = 0) {

	var prijmyDospelehoPredExekuci = 0,
		prijmyDospelehoPoExekuci = 0,
		prijemDospelehoBezDanovehoBonusuPredExekuci = 0,
		prijemDospelehoBezDanovehoBonusuPoExekuci = 0,
		danovyBonusNaDetiPredExekuci = 0,
		danovyBonusNaDetiPoExekuci = 0,
		duchodyPoExekuci = 0,
		nemocenskaPoExekuci = 0,
		podporaVNezamestnanostiPoExekuci = 0,
		rodicovskaPoExekuci = 0,
		ostatniPrijmyPoExekuci = 0,
		nezabavitelnaCastkaProPrvniOsobu = 6225,
		nezabavitelnaCastkaProDalsiOsobu = 1556,
		nezabavitelnaCastka = 0,
		zakladPrijmuProExekuci = 0,
		zakladniNezabavitelnaCastka = 9338,
		exekuce = 0,
		pomerExekuci = 0;

	// je potřeba spočítat daňový bonus, ten je později možno exekuovat
	danovyBonusNaDetiPredExekuci = prijemDospeleho[1];

	// pro exekuci se počítá s příjmem bez bonusu
	prijemDospelehoBezDanovehoBonusuPredExekuci = prijemDospeleho[0] - prijemDospeleho[1];

	// do výpočtu příjmů pro exekuci vstupují i exekuovatelné dávky; tím se smaže informace o jejich rozdělení, ale líp to neumíme
	prijmyDospelehoPredExekuci = prijemDospelehoBezDanovehoBonusuPredExekuci + duchody + rodicovska + podporaVNezamestnanosti + nemocenska + ostatniPrijmy;

	// výpočet nezabavitelné částky
	nezabavitelnaCastka = nezabavitelnaCastkaProPrvniOsobu + dalsiVyzivovaneOsoby * nezabavitelnaCastkaProDalsiOsobu;

	// pokud je bez exekucí, nic se nestrhává
	if(prednostniExekuce + neprednostniExekuce == 0) {

		prijmyDospelehoPoExekuci = prijmyDospelehoPredExekuci + danovyBonusNaDetiPoExekuci;
		prijemDospelehoBezDanovehoBonusuPoExekuci = prijemDospelehoBezDanovehoBonusuPredExekuci;
		danovyBonusNaDetiPoExekuci = danovyBonusNaDetiPredExekuci;
		duchodyPoExekuci = duchody;
		rodicovskaPoExekuci = rodicovska;
		podporaVNezamestnanostiPoExekuci = podporaVNezamestnanosti;
		nemocenskaPoExekuci = nemocenska;
		ostatniPrijmyPoExekuci = ostatniPrijmy;
		exekuce = 0;

		return([prijmyDospelehoPredExekuci, prijmyDospelehoPoExekuci, prijemDospelehoBezDanovehoBonusuPoExekuci, danovyBonusNaDetiPoExekuci, duchodyPoExekuci, rodicovskaPoExekuci,
			podporaVNezamestnanostiPoExekuci, nemocenskaPoExekuci, ostatniPrijmyPoExekuci, exekuce]);

	// pokud má exekuci a příjmy jsou nižší než nezabavitelná částka, strhává se pouze daňový bonus
	} else if (prijmyDospelehoPredExekuci < nezabavitelnaCastka) {

		prijmyDospelehoPoExekuci = prijmyDospelehoPredExekuci;
		prijemDospelehoBezDanovehoBonusuPoExekuci = prijemDospelehoBezDanovehoBonusuPredExekuci;
		danovyBonusNaDetiPoExekuci = 0;
		duchodyPoExekuci = duchody;
		rodicovskaPoExekuci = rodicovska;
		podporaVNezamestnanostiPoExekuci = podporaVNezamestnanosti;
		nemocenskaPoExekuci = nemocenska;
		ostatniPrijmyPoExekuci = ostatniPrijmy;
		exekuce = danovyBonusNaDetiPredExekuci;

		return([prijmyDospelehoPredExekuci, prijmyDospelehoPoExekuci, prijemDospelehoBezDanovehoBonusuPoExekuci, danovyBonusNaDetiPoExekuci, duchodyPoExekuci, rodicovskaPoExekuci,
			podporaVNezamestnanostiPoExekuci, nemocenskaPoExekuci, ostatniPrijmyPoExekuci, exekuce]);

	//jinak se vypočítá exekuce
	} else {

		// Z čisté mzdy zaměstnance je odečtena základní nezabavitelná částka (minimum). Pokud je rovna nebo vyšší 9338 Kč, počítá se v této fázi s celou částkou 9338 Kč.
		zakladPrijmuProExekuci = Math.min(prijmyDospelehoPredExekuci - nezabavitelnaCastka, zakladniNezabavitelnaCastka);

		// Pokud je aspoň jedna přednostní exekuce, může jít srážka až do dvou třetin příjmu po stržení nezabavitelné částky
		if (prednostniExekuce > 0) {
			prijmyDospelehoPoExekuci = zakladPrijmuProExekuci / 3;

		// U exekucí pro nepřednostní pohledávky je srážen dluh do výše jedné třetiny příjmů z této částky
		} else {
			prijmyDospelehoPoExekuci = 2 * zakladPrijmuProExekuci / 3;
		}

		// exekuuje se i daňový bonus na dítě
		danovyBonusNaDetiPoExekuci = 0;

		prijmyDospelehoPoExekuci = prijmyDospelehoPoExekuci + nezabavitelnaCastka;

		exekuce = prijmyDospelehoPredExekuci - prijmyDospelehoPoExekuci + danovyBonusNaDetiPredExekuci;

		pomerExekuci = prijmyDospelehoPoExekuci / prijmyDospelehoPredExekuci;

		prijemDospelehoBezDanovehoBonusuPoExekuci = pomerExekuci * prijemDospelehoBezDanovehoBonusuPredExekuci;
		duchodyPoExekuci = pomerExekuci * duchody;
		rodicovskaPoExekuci = pomerExekuci * rodicovska;
		podporaVNezamestnanostiPoExekuci = pomerExekuci * podporaVNezamestnanosti;
		nemocenskaPoExekuci = pomerExekuci * nemocenska;
		ostatniPrijmyPoExekuci = pomerExekuci * ostatniPrijmy;

		return([prijmyDospelehoPredExekuci, prijmyDospelehoPoExekuci, prijemDospelehoBezDanovehoBonusuPoExekuci, danovyBonusNaDetiPoExekuci, duchodyPoExekuci, rodicovskaPoExekuci,
			podporaVNezamestnanostiPoExekuci, nemocenskaPoExekuci, ostatniPrijmyPoExekuci, exekuce]);

	}

}
//IT


/*

spočítej příjem domácnosti po exekuci

*/

//ED
function spocitejPrijemDomacnostiPoExekuci(prijemPrvnihoDospelehoPoExekuci = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], prijemDruhehoDospelehoPoExekuci = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	prijemTretihoDospelehoPoExekuci = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) {

	var prijmyDomacnostiPredExekuci = 0,
		prijmyDomacnostiPoExekuci = 0,
		prijemDomacnostiBezDanovehoBonusuPoExekuci = 0,
		danovyBonusDomacnostiNaDetiPoExekuci = 0,
		duchodyDomacnostiPoExekuci = 0,
		nemocenskaDomacnostiPoExekuci = 0,
		podporaDomacnostiVNezamestnanostiPoExekuci = 0,
		rodicovskaDomacnostiPoExekuci = 0,
		ostatniPrijmyDomacnostiPoExekuci = 0,
		exekuceDomacnosti = 0;

	prijmyDomacnostiPredExekuci = prijemPrvnihoDospelehoPoExekuci[0] + prijemDruhehoDospelehoPoExekuci[0] + prijemTretihoDospelehoPoExekuci[0];
	prijmyDomacnostiPoExekuci = prijemPrvnihoDospelehoPoExekuci[1] + prijemDruhehoDospelehoPoExekuci[1] + prijemTretihoDospelehoPoExekuci[1];
	prijemDomacnostiBezDanovehoBonusuPoExekuci = prijemPrvnihoDospelehoPoExekuci[2] + prijemDruhehoDospelehoPoExekuci[2] + prijemTretihoDospelehoPoExekuci[2];
	danovyBonusDomacnostiNaDetiPoExekuci = prijemPrvnihoDospelehoPoExekuci[3] + prijemDruhehoDospelehoPoExekuci[3] + prijemTretihoDospelehoPoExekuci[3];
	duchodyDomacnostiPoExekuci = prijemPrvnihoDospelehoPoExekuci[4] + prijemDruhehoDospelehoPoExekuci[4] + prijemTretihoDospelehoPoExekuci[4];
	rodicovskaDomacnostiPoExekuci = prijemPrvnihoDospelehoPoExekuci[5] + prijemDruhehoDospelehoPoExekuci[5] + prijemTretihoDospelehoPoExekuci[5];
	podporaDomacnostiVNezamestnanostiPoExekuci = prijemPrvnihoDospelehoPoExekuci[6] + prijemDruhehoDospelehoPoExekuci[6] + prijemTretihoDospelehoPoExekuci[6];
	nemocenskaDomacnostiPoExekuci = prijemPrvnihoDospelehoPoExekuci[7] + prijemDruhehoDospelehoPoExekuci[7] + prijemTretihoDospelehoPoExekuci[7];
	ostatniPrijmyDomacnostiPoExekuci = prijemPrvnihoDospelehoPoExekuci[8] + prijemDruhehoDospelehoPoExekuci[8] + prijemTretihoDospelehoPoExekuci[8];
	exekuceDomacnosti = prijemPrvnihoDospelehoPoExekuci[9] + prijemDruhehoDospelehoPoExekuci[9] + prijemTretihoDospelehoPoExekuci[9];

	return([prijmyDomacnostiPredExekuci, prijmyDomacnostiPoExekuci, prijemDomacnostiBezDanovehoBonusuPoExekuci, danovyBonusDomacnostiNaDetiPoExekuci, duchodyDomacnostiPoExekuci,
		rodicovskaDomacnostiPoExekuci, podporaDomacnostiVNezamestnanostiPoExekuci, nemocenskaDomacnostiPoExekuci, ostatniPrijmyDomacnostiPoExekuci, exekuceDomacnosti]);

}
//IT


/*

výpočet čistých příjmů rodiny po započtení sociálních dávek a nákladů na bydlení

spustí se po odpálení vstupního formuláře, volá ji taky funkce modelujRodinu, která ve smyčce mění některou ze vstupních hodnot a ukládá výstupy

vstupy:
	příjem prvního dospělého (prijemPrvnihoDospeleho, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
	příjem druhého dospělého (prijemDruhehoDospeleho, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
	příjem třetího dospělého (prijemTretihoDospeleho, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
	nájem, u vlastního bydlení nehraje roli (najem, integer)
	výdaje za energie a ostatní poplatky spojené s bydlením (poplatky, integer)
	výše důchodů (duchody, integer)
	rodičovská (rodicovska, integer)
	přídavky na děti (pridavkyNaDeti, integer)
	podpora v nezaměstnanosti (podporaVNezamestnanosti, integer)
	nemocenská (nemocenska, integer)
	ostatní příjmy (ostatniPrijmy, integer)
	příspěvek na bydlení (prispevekNaBydleni, integer)
	příspěvek na živobytí (prispevekNaZivobyti, integer)
	doplatek na bydlení (doplatekNaBydleni, integer)
výstupy:
	příjem prvního dospělého (integer),
	příjem druhého dospělého (integer),
	příjem třetího dospělého (integer),
	čisté čisté přijmy rodiny (integer),
	čisté příjmy rodiny po započtení sociálních dávek a nákladů na bydlení (integer)

*/


//ED
function spocitejPrijmyAVydajeRodinyPoZapocteniDavek() {

	/* výpočet:

	1) příjem každého dospělého (z jednotlivých zaměstnavatelů, u každého z jednotlivých smluv)
	2) příjem celé rodiny (z příjmů každého dospělého)
	3) životní minimum
	4) přídavky na děti
	5) náklady na bydlení
	6) příspěvek na bydlení, příspěvek na živobytí, doplatek na bydlení (vše z příjmů rodiny před případnou exekucí)
	7) příjmy po exekuci (z kompletního příjmu rodiny včetně dávek)

	*/

	if(prvniDospelyPrvniZamestnavatel[1] == 0) {
		var rodinkaPrijemPrvniDospelyPrvniPrace = spocitejPrijemUZamestnavatele(
			prijem = spocitejSlozkyNaHPP(prvniDospelyPrvniZamestnavatel[0], prvniDospelyPrvniZamestnavatel[4], false),
			ruzovyPapir = prvniDospelyPrvniZamestnavatel[2], pocetVyzivovanychDeti = prvniDospelyPrvniZamestnavatel[3])
	} else if (prvniDospelyPrvniZamestnavatel[1] == 1) {
		var rodinkaPrijemPrvniDospelyPrvniPrace = spocitejPrijemUZamestnavatele(
			prijem = spocitejSlozkyNaDPC(prvniDospelyPrvniZamestnavatel[0], prvniDospelyPrvniZamestnavatel[4], false),
			ruzovyPapir = prvniDospelyPrvniZamestnavatel[2], pocetVyzivovanychDeti = prvniDospelyPrvniZamestnavatel[3])
	} else if (prvniDospelyPrvniZamestnavatel[1] == 2) {
		var rodinkaPrijemPrvniDospelyPrvniPrace = spocitejPrijemUZamestnavatele(
			prijem = spocitejSlozkyNaDPP(prvniDospelyPrvniZamestnavatel[0], prvniDospelyPrvniZamestnavatel[4], false),
			ruzovyPapir = prvniDospelyPrvniZamestnavatel[2], pocetVyzivovanychDeti = prvniDospelyPrvniZamestnavatel[3])
	};

	//pokud si v prvním úvazku platí zdravotní, v druhém nemusí
	if(rodinkaPrijemPrvniDospelyPrvniPrace[3] > 0) {
		var rodinkaPrijemPrvniDospelyPrvniPracePojisteni = true;
	} else {
		var rodinkaPrijemPrvniDospelyPrvniPracePojisteni = false;
	}

	if(prvniDospelyDruhyZamestnavatel[1] == 0) {
		var rodinkaPrijemPrvniDospelyDruhaPrace = spocitejPrijemUZamestnavatele(
			prijem = spocitejSlozkyNaHPP(prvniDospelyDruhyZamestnavatel[0], prvniDospelyDruhyZamestnavatel[4], rodinkaPrijemPrvniDospelyPrvniPracePojisteni),
			ruzovyPapir = prvniDospelyDruhyZamestnavatel[2], pocetVyzivovanychDeti = prvniDospelyDruhyZamestnavatel[3])
	} else if (prvniDospelyDruhyZamestnavatel[1] == 1) {
		var rodinkaPrijemPrvniDospelyDruhaPrace = spocitejPrijemUZamestnavatele(
			prijem = spocitejSlozkyNaDPC(prvniDospelyDruhyZamestnavatel[0], prvniDospelyDruhyZamestnavatel[4], rodinkaPrijemPrvniDospelyPrvniPracePojisteni),
			ruzovyPapir = prvniDospelyDruhyZamestnavatel[2], pocetVyzivovanychDeti = prvniDospelyDruhyZamestnavatel[3])
	} else if (prvniDospelyDruhyZamestnavatel[1] == 2) {
		var rodinkaPrijemPrvniDospelyDruhaPrace = spocitejPrijemUZamestnavatele(
			prijem = spocitejSlozkyNaDPP(prvniDospelyDruhyZamestnavatel[0], prvniDospelyDruhyZamestnavatel[4], rodinkaPrijemPrvniDospelyPrvniPracePojisteni),
			ruzovyPapir = prvniDospelyDruhyZamestnavatel[2], pocetVyzivovanychDeti = prvniDospelyDruhyZamestnavatel[3])
	};

	if(druhyDospelyPrvniZamestnavatel[1] == 0) {
		var rodinkaPrijemDruhyDospelyPrvniPrace = spocitejPrijemUZamestnavatele(
			prijem = spocitejSlozkyNaHPP(druhyDospelyPrvniZamestnavatel[0], druhyDospelyPrvniZamestnavatel[4], false),
			ruzovyPapir = druhyDospelyPrvniZamestnavatel[2], pocetVyzivovanychDeti = druhyDospelyPrvniZamestnavatel[3])
	} else if (druhyDospelyPrvniZamestnavatel[1] == 1) {
		var rodinkaPrijemDruhyDospelyPrvniPrace = spocitejPrijemUZamestnavatele(
			prijem = spocitejSlozkyNaDPC(druhyDospelyPrvniZamestnavatel[0], druhyDospelyPrvniZamestnavatel[4], false),
			ruzovyPapir = druhyDospelyPrvniZamestnavatel[2], pocetVyzivovanychDeti = druhyDospelyPrvniZamestnavatel[3])
	} else if (druhyDospelyPrvniZamestnavatel[1] == 2) {
		var rodinkaPrijemDruhyDospelyPrvniPrace = spocitejPrijemUZamestnavatele(
			prijem = spocitejSlozkyNaDPP(druhyDospelyPrvniZamestnavatel[0], druhyDospelyPrvniZamestnavatel[4], false),
			ruzovyPapir = druhyDospelyPrvniZamestnavatel[2], pocetVyzivovanychDeti = druhyDospelyPrvniZamestnavatel[3])
	};

	//pokud si v prvním úvazku platí zdravotní, v druhém nemusí
	if(rodinkaPrijemDruhyDospelyPrvniPrace[3] > 0) {
		var rodinkaPrijemDruhyDospelyPrvniPracePojisteni = true;
	} else {
		var rodinkaPrijemDruhyDospelyPrvniPracePojisteni = false;
	}

	if(druhyDospelyDruhyZamestnavatel[1] == 0) {
		var rodinkaPrijemDruhyDospelyDruhaPrace = spocitejPrijemUZamestnavatele(
			prijem = spocitejSlozkyNaHPP(druhyDospelyDruhyZamestnavatel[0], druhyDospelyDruhyZamestnavatel[4], rodinkaPrijemDruhyDospelyPrvniPracePojisteni),
			ruzovyPapir = druhyDospelyDruhyZamestnavatel[2], pocetVyzivovanychDeti = druhyDospelyDruhyZamestnavatel[3])
	} else if (druhyDospelyDruhyZamestnavatel[1] == 1) {
		var rodinkaPrijemDruhyDospelyDruhaPrace = spocitejPrijemUZamestnavatele(
			prijem = spocitejSlozkyNaDPC(druhyDospelyDruhyZamestnavatel[0], druhyDospelyDruhyZamestnavatel[4], rodinkaPrijemDruhyDospelyPrvniPracePojisteni),
			ruzovyPapir = druhyDospelyDruhyZamestnavatel[2], pocetVyzivovanychDeti = druhyDospelyDruhyZamestnavatel[3])
	} else if (druhyDospelyDruhyZamestnavatel[1] == 2) {
		var rodinkaPrijemDruhyDospelyDruhaPrace = spocitejPrijemUZamestnavatele(
			prijem = spocitejSlozkyNaDPP(druhyDospelyDruhyZamestnavatel[0], druhyDospelyDruhyZamestnavatel[4], rodinkaPrijemDruhyDospelyPrvniPracePojisteni),
			ruzovyPapir = druhyDospelyDruhyZamestnavatel[2], pocetVyzivovanychDeti = druhyDospelyDruhyZamestnavatel[3])
	};

	if(tretiDospelyPrvniZamestnavatel[1] == 0) {
		var rodinkaPrijemTretiDospelyPrvniPrace = spocitejPrijemUZamestnavatele(
			prijem = spocitejSlozkyNaHPP(tretiDospelyPrvniZamestnavatel[0], tretiDospelyPrvniZamestnavatel[4], false),
			ruzovyPapir = tretiDospelyPrvniZamestnavatel[2], pocetVyzivovanychDeti = tretiDospelyPrvniZamestnavatel[3])
	} else if (tretiDospelyPrvniZamestnavatel[1] == 1) {
		var rodinkaPrijemTretiDospelyPrvniPrace = spocitejPrijemUZamestnavatele(
			prijem = spocitejSlozkyNaDPC(tretiDospelyPrvniZamestnavatel[0], tretiDospelyPrvniZamestnavatel[4], false),
			ruzovyPapir = tretiDospelyPrvniZamestnavatel[2], pocetVyzivovanychDeti = tretiDospelyPrvniZamestnavatel[3])
	} else if (tretiDospelyPrvniZamestnavatel[2] == 0) {
		var rodinkaPrijemTretiDospelyPrvniPrace = spocitejPrijemUZamestnavatele(
			prijem = spocitejSlozkyNaDPP(tretiDospelyPrvniZamestnavatel[0], tretiDospelyPrvniZamestnavatel[4], false),
			ruzovyPapir = tretiDospelyPrvniZamestnavatel[2], pocetVyzivovanychDeti = tretiDospelyPrvniZamestnavatel[3])
	};

	//pokud si v prvním úvazku platí zdravotní, v druhém nemusí
	if(rodinkaPrijemTretiDospelyPrvniPrace[3] > 0) {
		var rodinkaPrijemTretiDospelyPrvniPracePojisteni = true;
	} else {
		var rodinkaPrijemTretiDospelyPrvniPracePojisteni = false;
	}

	if(tretiDospelyDruhyZamestnavatel[1] == 0) {
		var rodinkaPrijemTretiDospelyDruhaPrace = spocitejPrijemUZamestnavatele(
			prijem = spocitejSlozkyNaHPP(tretiDospelyDruhyZamestnavatel[0], tretiDospelyDruhyZamestnavatel[4], rodinkaPrijemTretiDospelyPrvniPracePojisteni),
			ruzovyPapir = tretiDospelyDruhyZamestnavatel[2], pocetVyzivovanychDeti = tretiDospelyDruhyZamestnavatel[3])
	} else if (tretiDospelyDruhyZamestnavatel[1] == 1) {
		var rodinkaPrijemTretiDospelyDruhaPrace = spocitejPrijemUZamestnavatele(
			prijem = spocitejSlozkyNaDPC(tretiDospelyDruhyZamestnavatel[0], tretiDospelyDruhyZamestnavatel[4], rodinkaPrijemTretiDospelyPrvniPracePojisteni),
			ruzovyPapir = tretiDospelyDruhyZamestnavatel[2], pocetVyzivovanychDeti = tretiDospelyDruhyZamestnavatel[3])
	} else if (tretiDospelyDruhyZamestnavatel[1] == 2) {
		var rodinkaPrijemTretiDospelyDruhaPrace = spocitejPrijemUZamestnavatele(
			prijem = spocitejSlozkyNaDPP(tretiDospelyDruhyZamestnavatel[0], tretiDospelyDruhyZamestnavatel[4], rodinkaPrijemTretiDospelyPrvniPracePojisteni),
			ruzovyPapir = tretiDospelyDruhyZamestnavatel[2], pocetVyzivovanychDeti = tretiDospelyDruhyZamestnavatel[3])
	};

	var rodinkaPrijemPrvnihoDospeleho = spocitejPrijemDospeleho(
		prijemPrace1 = rodinkaPrijemPrvniDospelyPrvniPrace,
		prijemPrace2 = rodinkaPrijemPrvniDospelyDruhaPrace);

	var rodinkaPrijemDruhehoDospeleho = spocitejPrijemDospeleho(
		prijemPrace1 = rodinkaPrijemDruhyDospelyPrvniPrace,
		prijemPrace2 = rodinkaPrijemDruhyDospelyDruhaPrace);

	var rodinkaPrijemTretihoDospeleho = spocitejPrijemDospeleho(
		prijemPrace1 = rodinkaPrijemTretiDospelyPrvniPrace,
		prijemPrace2 = rodinkaPrijemTretiDospelyDruhaPrace);

	var rodinkaCistyPrijemDomacnosti = spocitejCistyPrijemDomacnostiZeZamestnani(
		prijemPrvnihoDospeleho = rodinkaPrijemPrvnihoDospeleho,
		prijemDruhehoDospeleho = rodinkaPrijemDruhehoDospeleho,
		prijemTretihoDospeleho = rodinkaPrijemTretihoDospeleho);

	var rodinkaZivotniMinimum = spocitejZivotniMinimum(
		pocetDospelych = slozeniDomacnosti[0],
		pocetDetiPod6 = slozeniDomacnosti[1],
		pocetDeti6az15 = slozeniDomacnosti[2],
		pocetDeti15az26 = slozeniDomacnosti[3],
		snizeneMinimum = socialOptional[0]);

	// pokud je nechtějí, nedostanou je
	if(pozadovaneDavky[0]) {
		var rodinkaPridavkyNaDeti = spocitejPridavkyNaDeti(
			cistyPrijemDomacnosti = rodinkaCistyPrijemDomacnosti,
			prijemPrvnihoDospeleho = rodinkaPrijemPrvnihoDospeleho,
			prijemDruhehoDospeleho = rodinkaPrijemDruhehoDospeleho,
			prijemTretihoDospeleho = rodinkaPrijemTretihoDospeleho,
			zivotniMinimum = rodinkaZivotniMinimum,
			pocetDetiPod6 = slozeniDomacnosti[1],
			pocetDeti6az15 = slozeniDomacnosti[2],
			pocetDeti15az26 = slozeniDomacnosti[3],
			narokNaVyssiDavky = socialOptional[1]);
	} else {
		var rodinkaPridavkyNaDeti = 0;
	}

	var rodinkaNakladyNaBydleniProSSP = spocitejNakladyNaBydleniProSSP(
		najem = bydleni[0],
		poplatky = bydleni[1],
		pocetClenuDomacnosti = slozeniDomacnosti[4],
		pocetClenuDomacnostiSTrvalymPobytemJinde = slozeniDomacnosti[5],
		vlastniBydleni = bydleni[3],
		velikostObce = bydleni[5]);

	var rodinkaNakladyNaBydleniProHN = spocitejNakladyNaBydleniProHN(
		najem = bydleni[0],
		poplatky = bydleni[1],
		pocetClenuDomacnosti = slozeniDomacnosti[4],
		vlastniBydleni = bydleni[3],
		ubytovna = bydleni[4],
		velikostObce = bydleni[5],
		mistneObvykleNaklady = bydleni[6]);

	var rodinkaDuchody =  parseFloat(prvniDospelyDalsiPrijmy[0]) + parseFloat(druhyDospelyDalsiPrijmy[0]) + parseFloat(tretiDospelyDalsiPrijmy[0]);

	var rodinkaRodicovska = parseFloat(prvniDospelyDalsiPrijmy[1]) + parseFloat(druhyDospelyDalsiPrijmy[1]) + parseFloat(tretiDospelyDalsiPrijmy[1]);

	var rodinkaPodporaVNezamestnanosti = parseFloat(prvniDospelyDalsiPrijmy[2]) + parseFloat(druhyDospelyDalsiPrijmy[2]) + parseFloat(tretiDospelyDalsiPrijmy[2]);

	var rodinkaNemocenska = parseFloat(prvniDospelyDalsiPrijmy[3]) + parseFloat(druhyDospelyDalsiPrijmy[3]) + parseFloat(tretiDospelyDalsiPrijmy[3]);

	var rodinkaOstatniPrijmy = parseFloat(prvniDospelyDalsiPrijmy[4]) + parseFloat(druhyDospelyDalsiPrijmy[4]) + parseFloat(tretiDospelyDalsiPrijmy[4]);

	// pokud je nechtějí, nedostanou je
	if(pozadovaneDavky[1]) {
		var rodinkaPrispevekNaBydleni = spocitejPrispevekNaBydleni(
			cistyPrijemDomacnosti = rodinkaCistyPrijemDomacnosti,
			nakladyNaBydleniProSSP = rodinkaNakladyNaBydleniProSSP,
			zivotniMinimum = rodinkaZivotniMinimum,
			duchody = rodinkaDuchody,
			rodicovska = rodinkaRodicovska,
			pridavkyNaDeti = rodinkaPridavkyNaDeti,
			podporaVNezamestnanosti = rodinkaPodporaVNezamestnanosti,
			nemocenska = rodinkaNemocenska,
			ostatniPrijmy = rodinkaOstatniPrijmy,
			velikostObce = bydleni[5],
			ubytovna = bydleni[4]);
	} else {
		var rodinkaPrispevekNaBydleni = 0;
	}

	// pokud je nechtějí, nedostanou je
	if(pozadovaneDavky[2]) {
		var rodinkaPrispevekNaZivobyti = spocitejPrispevekNaZivobyti(
			cistyPrijemDomacnosti = rodinkaCistyPrijemDomacnosti,
			nakladyNaBydleniProHN = rodinkaNakladyNaBydleniProHN,
			zivotniMinimum = rodinkaZivotniMinimum,
			duchody = rodinkaDuchody,
			rodicovska = rodinkaRodicovska,
			pridavkyNaDeti = rodinkaPridavkyNaDeti,
			podporaVNezamestnanosti = rodinkaPodporaVNezamestnanosti,
			nemocenska = rodinkaNemocenska,
			ostatniPrijmy = rodinkaOstatniPrijmy);
	} else {
		var rodinkaPrispevekNaZivobyti = 0;
	}

	// pokud je nechtějí, nedostanou je
	if(pozadovaneDavky[3]) {
		var rodinkaDoplatekNaBydleni = spocitejDoplatekNaBydleni(
			cistyPrijemDomacnosti = rodinkaCistyPrijemDomacnosti,
			nakladyNaBydleniProHN = rodinkaNakladyNaBydleniProHN,
			zivotniMinimum = rodinkaZivotniMinimum,
			prispevekNaZivobyti = rodinkaPrispevekNaZivobyti,
			prispevekNaBydleni = rodinkaPrispevekNaBydleni,
			duchody = rodinkaDuchody,
			rodicovska = rodinkaRodicovska,
			pridavkyNaDeti = rodinkaPridavkyNaDeti,
			podporaVNezamestnanosti = rodinkaPodporaVNezamestnanosti,
			nemocenska = rodinkaNemocenska,
			ostatniPrijmy = rodinkaOstatniPrijmy);
	} else {
		var rodinkaDoplatekNaBydleni = 0;
	}

	var rodinkaPrijemPrvnihoDospelehoPoExekuci = spocitejPrijemDospelehoPoExekuci(
		prijemDospeleho = rodinkaPrijemPrvnihoDospeleho,
		duchody = prvniDospelyDalsiPrijmy[0],
		rodicovska = prvniDospelyDalsiPrijmy[1],
		podporaVNezamestnanosti = prvniDospelyDalsiPrijmy[2],
		nemocenska = prvniDospelyDalsiPrijmy[3],
		ostatniPrijmy = prvniDospelyDalsiPrijmy[4],
		prednostniExekuce = prvniDospelyExekuce[0],
		neprednostniExekuce = prvniDospelyExekuce[1],
		dalsiVyzivovaneOsoby = prvniDospelyExekuce[2]);

	var rodinkaPrijemDruhehoDospelehoPoExekuci = spocitejPrijemDospelehoPoExekuci(
		prijemDospeleho = rodinkaPrijemDruhehoDospeleho,
		duchody = druhyDospelyDalsiPrijmy[0],
		rodicovska = druhyDospelyDalsiPrijmy[1],
		podporaVNezamestnanosti = druhyDospelyDalsiPrijmy[2],
		nemocenska = druhyDospelyDalsiPrijmy[3],
		ostatniPrijmy = druhyDospelyDalsiPrijmy[4],
		prednostniExekuce = druhyDospelyExekuce[0],
		neprednostniExekuce = druhyDospelyExekuce[1],
		dalsiVyzivovaneOsoby = druhyDospelyExekuce[2]);

	var rodinkaPrijemTretihoDospelehoPoExekuci = spocitejPrijemDospelehoPoExekuci(
		prijemDospeleho = rodinkaPrijemTretihoDospeleho,
		duchody = tretiDospelyDalsiPrijmy[0],
		rodicovska = tretiDospelyDalsiPrijmy[1],
		podporaVNezamestnanosti = tretiDospelyDalsiPrijmy[2],
		nemocenska = tretiDospelyDalsiPrijmy[3],
		ostatniPrijmy = tretiDospelyDalsiPrijmy[4],
		prednostniExekuce = tretiDospelyExekuce[0],
		neprednostniExekuce = tretiDospelyExekuce[1],
		dalsiVyzivovaneOsoby = tretiDospelyExekuce[2]);

	var rodinkaPrijemPoExekuci = spocitejPrijemDomacnostiPoExekuci(
		prijemPrvnihoDospelehoPoExekuci = rodinkaPrijemPrvnihoDospelehoPoExekuci,
		prijemDruhehoDospelehoPoExekuci = rodinkaPrijemDruhehoDospelehoPoExekuci,
		prijemTretihoDospelehoPoExekuci = rodinkaPrijemTretihoDospelehoPoExekuci);

	var prijmyAVydajeRodinyPoZapocteniDavek = [];

	// proměnné pro graf

	// 0: čistý příjem 1. dospělého ze zaměstnání bez bonusu na dítě
	prijmyAVydajeRodinyPoZapocteniDavek[0] = Math.round(rodinkaPrijemPrvnihoDospelehoPoExekuci[2]);

	// 1: daňový bonus 1. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[1] = Math.round(rodinkaPrijemPrvnihoDospelehoPoExekuci[3]);

	// 2: čistý příjem 2. dospělého ze zaměstnání bez bonusu na dítě
	prijmyAVydajeRodinyPoZapocteniDavek[2] = Math.round(rodinkaPrijemDruhehoDospelehoPoExekuci[2]);

	// 3: daňový bonus 2. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[3] = Math.round(rodinkaPrijemDruhehoDospelehoPoExekuci[3]);

	// 4: čistý příjem 3. dospělého ze zaměstnání bez bonusu na dítě
	prijmyAVydajeRodinyPoZapocteniDavek[4] = Math.round(rodinkaPrijemTretihoDospelehoPoExekuci[2]);

	// 5: daňový bonus 3. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[5] = Math.round(rodinkaPrijemTretihoDospelehoPoExekuci[3]);

	// 6: přídavky na děti
	prijmyAVydajeRodinyPoZapocteniDavek[6] = Math.round(rodinkaPridavkyNaDeti);

	// 7: příspěvek na bydlení
	prijmyAVydajeRodinyPoZapocteniDavek[7] = Math.round(rodinkaPrispevekNaBydleni);

	// 8: příspěvek na živobytí
	prijmyAVydajeRodinyPoZapocteniDavek[8] = Math.round(rodinkaPrispevekNaZivobyti);

	// 9: doplatek na bydlení
	prijmyAVydajeRodinyPoZapocteniDavek[9] = Math.round(rodinkaDoplatekNaBydleni);

	// 10: důchody
	prijmyAVydajeRodinyPoZapocteniDavek[10] = Math.round(rodinkaPrijemPoExekuci[4]);

	// 11: rodičovský příspěvek
	prijmyAVydajeRodinyPoZapocteniDavek[11] = Math.round(rodinkaPrijemPoExekuci[5]);

	// 12: podpora v nezaměstnanosti
	prijmyAVydajeRodinyPoZapocteniDavek[12] = Math.round(rodinkaPrijemPoExekuci[6]);

	// 13: nemocenská
	prijmyAVydajeRodinyPoZapocteniDavek[13] = Math.round(rodinkaPrijemPoExekuci[7]);

	// 14: ostatní příjmy
	prijmyAVydajeRodinyPoZapocteniDavek[14] = Math.round(rodinkaPrijemPoExekuci[8]);

	// 15: nájem
	prijmyAVydajeRodinyPoZapocteniDavek[15] = Math.round(bydleni[0]);

	// 16: poplatky
	prijmyAVydajeRodinyPoZapocteniDavek[16] = Math.round(bydleni[1]);

	// 17: srážky ze mzdy
	prijmyAVydajeRodinyPoZapocteniDavek[17] = Math.round(rodinkaPrijemPoExekuci[9]);

	// proměnné pro statický výpočet dávek

	// 19: čistý příjem 1. dospělého z 1. zaměstnání bez daňového bonusu
	prijmyAVydajeRodinyPoZapocteniDavek[19] = rodinkaPrijemPrvniDospelyPrvniPrace[0];

	// 20: čistý příjem 1. dospělého z 2. zaměstnání bez daňového bonusu
	prijmyAVydajeRodinyPoZapocteniDavek[20] = rodinkaPrijemPrvniDospelyDruhaPrace[0];

	// 21:

	// 22: daňový bonus 1. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[22] = rodinkaPrijemPrvnihoDospeleho[1];

	// 23: rodičovská 1. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[23] = prvniDospelyDalsiPrijmy[1];

	// 24: pojistné dávky: důchody, podpora v nezaměstnanosti, nemocenská 1. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[24] = prvniDospelyDalsiPrijmy[0] + prvniDospelyDalsiPrijmy[2] + prvniDospelyDalsiPrijmy[3];

	// 25: jiné příjmy 1. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[25] = prvniDospelyDalsiPrijmy[4];

	// 26: exekuce 1. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[26] = rodinkaPrijemPrvnihoDospelehoPoExekuci[9];

	// 27: čistý příjem po exekuci 1. dospělého vč. bonusu
	prijmyAVydajeRodinyPoZapocteniDavek[27] = prijmyAVydajeRodinyPoZapocteniDavek[0] + prijmyAVydajeRodinyPoZapocteniDavek[1];

	// 28: čistý příjem 2. dospělého z 1. zaměstnání bez daňového bonusu
	prijmyAVydajeRodinyPoZapocteniDavek[28] = rodinkaPrijemDruhyDospelyPrvniPrace[0];

	// 29: čistý příjem 2. dospělého z 2. zaměstnání bez daňového bonusu
	prijmyAVydajeRodinyPoZapocteniDavek[29] = rodinkaPrijemDruhyDospelyDruhaPrace[0];

	// 30:

	// 31: daňový bonus 2. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[31] = rodinkaPrijemDruhehoDospeleho[1];

	// 32: rodičovská 2. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[32] = druhyDospelyDalsiPrijmy[1];

	// 33: pojistné dávky: důchody, podpora v nezaměstnanosti, nemocenská 2. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[33] = druhyDospelyDalsiPrijmy[0] + druhyDospelyDalsiPrijmy[2] + druhyDospelyDalsiPrijmy[3];

	// 34: jiné příjmy 2. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[34] = druhyDospelyDalsiPrijmy[4];

	// 35: exekuce 2. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[35] = rodinkaPrijemDruhehoDospelehoPoExekuci[9];

	// 36: čistý příjem po exekuci 2. dospělého vč. bonusu
	prijmyAVydajeRodinyPoZapocteniDavek[36] = prijmyAVydajeRodinyPoZapocteniDavek[2] + prijmyAVydajeRodinyPoZapocteniDavek[3];

	// 37: čistý příjem 2. dospělého z 1. zaměstnání bez daňového bonusu
	prijmyAVydajeRodinyPoZapocteniDavek[37] = rodinkaPrijemTretiDospelyPrvniPrace[0];

	// 38: čistý příjem 2. dospělého z 2. zaměstnání bez daňového bonusu
	prijmyAVydajeRodinyPoZapocteniDavek[38] = rodinkaPrijemTretiDospelyDruhaPrace[0];

	// 39:

	// 40: daňový bonus 3. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[40] = rodinkaPrijemTretihoDospeleho[1];

	// 41: rodičovská 3. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[41] = tretiDospelyDalsiPrijmy[1];

	// 42: pojistné dávky: důchody, podpora v nezaměstnanosti, nemocenská 3. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[42] = tretiDospelyDalsiPrijmy[0] + tretiDospelyDalsiPrijmy[2] + tretiDospelyDalsiPrijmy[3];

	// 43: jiné příjmy 3. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[43] = tretiDospelyDalsiPrijmy[4];

	// 44: exekuce 3. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[44] = rodinkaPrijemTretihoDospelehoPoExekuci[9];

	// 45: čistý příjem po exekuci 3. dospělého vč. bonusu
	prijmyAVydajeRodinyPoZapocteniDavek[45] = prijmyAVydajeRodinyPoZapocteniDavek[4] + prijmyAVydajeRodinyPoZapocteniDavek[5];

	// 46: přídavky na děti
	prijmyAVydajeRodinyPoZapocteniDavek[46] = prijmyAVydajeRodinyPoZapocteniDavek[6];

	// 47: příspěvek na bydlení
	prijmyAVydajeRodinyPoZapocteniDavek[47] = prijmyAVydajeRodinyPoZapocteniDavek[7];

	// 48: příspěvek na živobytí
	prijmyAVydajeRodinyPoZapocteniDavek[48] = prijmyAVydajeRodinyPoZapocteniDavek[8];

	// 49: doplatek na bydlení
	prijmyAVydajeRodinyPoZapocteniDavek[49] = prijmyAVydajeRodinyPoZapocteniDavek[9];

	// 50: celkem dávky
	prijmyAVydajeRodinyPoZapocteniDavek[50] = prijmyAVydajeRodinyPoZapocteniDavek[46] + prijmyAVydajeRodinyPoZapocteniDavek[47] + prijmyAVydajeRodinyPoZapocteniDavek[48] +
											  prijmyAVydajeRodinyPoZapocteniDavek[49];

	// 51: nájem
	prijmyAVydajeRodinyPoZapocteniDavek[51] = prijmyAVydajeRodinyPoZapocteniDavek[15];

	// 52: poplatky
	prijmyAVydajeRodinyPoZapocteniDavek[52] = prijmyAVydajeRodinyPoZapocteniDavek[16];

	// 55: doplatek na zdravotní OBZP
	prijmyAVydajeRodinyPoZapocteniDavek[55] = rodinkaCistyPrijemDomacnosti[2];

	// 53: celkem výdaje
	prijmyAVydajeRodinyPoZapocteniDavek[53] = prijmyAVydajeRodinyPoZapocteniDavek[51] + prijmyAVydajeRodinyPoZapocteniDavek[52] + prijmyAVydajeRodinyPoZapocteniDavek[55];

	// 18: kontrola, disponibilní příjem včetně dávek a výdajů na nájem
	prijmyAVydajeRodinyPoZapocteniDavek[18] = Math.round(rodinkaPrijemPoExekuci[1] + rodinkaPrijemPoExekuci[3] + rodinkaPridavkyNaDeti + rodinkaPrispevekNaBydleni +
		rodinkaPrispevekNaZivobyti + rodinkaDoplatekNaBydleni - bydleni[0] - bydleni[1] - prijmyAVydajeRodinyPoZapocteniDavek[55]);

	// 54: celkem disponibilní příjem domácnosti
	prijmyAVydajeRodinyPoZapocteniDavek[54] = prijmyAVydajeRodinyPoZapocteniDavek[18];

	return(prijmyAVydajeRodinyPoZapocteniDavek);

}
//IT