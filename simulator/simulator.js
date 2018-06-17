// globální proměnné

// hrubý příjem na HPP, výjimka z minimálního základu?, hrubý příjem na DPČ, platí zdravotní jinde?, hrubý příjem na DPP, platí zdravotní jinde?, růžový papír?, počet vyživovaných dětí
var prvniDospelyPrvniZamestnavatel = [0, false, 0, false, 0, false, false, 0],
	prvniDospelyDruhyZamestnavatel = [0, false, 0, false, 0, false, false, 0],
	prvniDospelyTretiZamestnavatel = [0, false, 0, false, 0, false, false, 0],
	druhyDospelyPrvniZamestnavatel = [0, false, 0, false, 0, false, false, 0],
	druhyDospelyDruhyZamestnavatel = [0, false, 0, false, 0, false, false, 0],
	druhyDospelyTretiZamestnavatel = [0, false, 0, false, 0, false, false, 0],
	tretiDospelyPrvniZamestnavatel = [0, false, 0, false, 0, false, false, 0],
	tretiDospelyDruhyZamestnavatel = [0, false, 0, false, 0, false, false, 0],
	tretiDospelyTretiZamestnavatel = [0, false, 0, false, 0, false, false, 0],

// důchody, rodičovský příspěvek, podpora v nezaměstnanosti, nemocenská, ostatní příjmy
	prvniDospelyDalsiPrijmy = [0, 0, 0, 0, 0],
	druhyDospelyDalsiPrijmy = [0, 0, 0, 0, 0],
	tretiDospelyDalsiPrijmy = [0, 0, 0, 0, 0],

// počet přednostních exekucí, počet nepřednostních exekucí, počet dalších vyživovaných osob
	prvniDospelyExekuce = [0, 0, 0],
	druhyDospelyExekuce = [0, 0, 0],
	tretiDospelyExekuce = [0, 0, 0],

// počet dospělých, počet dětí pod 6 let, počet dětí 6 až 15 let, počet nezaopatřených dětí 15 až 26 let, počet členů domácnosti, počet členů domácnosti s trvalým bydlištěm jinde
	slozeniDomacnosti = [0, 0, 0, 0, 0, 0],

// kolik členů domácnosti má snížené minimum na existenční, má rodina nárok na vyšší dávky na děti (pobírá rodičovskou, mateřskou, nebo podporu v nezaměstnanosti)?
	socialOptional = [0, false],

// nájem, poplatky, bydlí ve vlastním nebo družstevním bytě?, bydlí na ubytovně, chatě nebo v podnájmu?,
// velikost obce (1 = Praha, 2 = nad 100 000, 3 = nad 50 000, 4 = nad 10 000, 5 = pod 10 000), místně obvyklé náklady stanovené úřadem práce
	bydleni = [0, 0, false, false, 1, 0];



/*

výpočet složek příjmu na HPP

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

function spocitejSlozkyNaHPP(hrubyPrijem = 0, vyjimkaMinimalniZaklad = false) {

	var cistyPrijem = 0,
		socialniPojisteni = 0,
		zdravotniPojisteni = 0,
		zalohaNaDan = 0,
		minimalniMzda = 12200;

	// u nulového příjmu vrací nulové všechny složky
	if (hrubyPrijem < minimalniMzda) {
		return([0, 0, 0, 0, 0])
	}

	// sociální pojištění: 6,5 % příjmu, zdravotní pojištění: 4,5 % příjmu, záloha na daň: 15 % ze superhrubé mzdy (134 % hrubé)
	if ( (hrubyPrijem < minimalniMzda) && (!vyjimkaMinimalniZaklad) ) {
		socialniPojisteni = 0.065 * minimalniMzda;
		zdravotniPojisteni = 0.045 * minimalniMzda;
	} else {
		socialniPojisteni = 0.065 * hrubyPrijem;
		zdravotniPojisteni = 0.045 * hrubyPrijem;
	}

	zalohaNaDan = 0.15 * Math.ceil(1.34 * hrubyPrijem / 100) * 100;

	cistyPrijem = hrubyPrijem - socialniPojisteni - zdravotniPojisteni - zalohaNaDan;

	return([hrubyPrijem, cistyPrijem, socialniPojisteni, zdravotniPojisteni, zalohaNaDan]);
}



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

function spocitejSlozkyNaDPC(hrubyPrijem = 0, platiZdravotniJinde = false) {

	var cistyPrijem = 0,
		socialniPojisteni = 0,
		zdravotniPojisteni = 0,
		zalohaNaDan = 0,
		maximalniCastkaBezPojistneho = 2500,
		minimalniMzda = 12200;

	// u nulového příjmu vrací nulové všechny složky
	if (hrubyPrijem == 0) {
		return([0, 0, 0, 0, 0])
	}

	// pod limitem 2 500 Kč je sociální i zdravotní nula, proto stačí počítat s hrubým příjmem
	if (hrubyPrijem < maximalniCastkaBezPojistneho) {
		zalohaNaDan = 0.15 * hrubyPrijem;

	// nad limitem 2 500 Kč se platí sociální i zdravotní, takže superhrubý
	} else {
		socialniPojisteni = 0.065 * hrubyPrijem;

		if (platiZdravotniJinde) {
			zdravotniPojisteni = 0.045 * hrubyPrijem;

		// pokud neplatí zdravotní jinde, počítá se z minimální mzdy
		} else {
			zdravotniPojisteni = 0.045 * minimalniMzda;
		}
		zalohaNaDan = 0.15 * Math.ceil(1.34 * hrubyPrijem / 100) * 100;
	}

	cistyPrijem = hrubyPrijem - socialniPojisteni - zdravotniPojisteni - zalohaNaDan;

	return([hrubyPrijem, cistyPrijem, socialniPojisteni, zdravotniPojisteni, zalohaNaDan]);
}



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

function spocitejSlozkyNaDPP(hrubyPrijem = 0, platiZdravotniJinde = false) {

	var socialniPojisteni = 0,
		zdravotniPojisteni = 0,
		zalohaNaDan = 0,
		cistyPrijem = 0,
		maximalniCastkaBezPojistneho = 10000,
		minimalniMzda = 12200;

	// u nulového příjmu vrací nulové všechny složky
	if (hrubyPrijem == 0) {
		return([0, 0, 0, 0, 0])
	}

	// pod limitem je sociální i zdravotní nula, proto stačí počítat s hrubým příjmem
	if (hrubyPrijem <= maximalniCastkaBezPojistneho) {
		zalohaNaDan = 0.15 * hrubyPrijem;

	// nad limitem, ale pod minimální mzdou
	} else if (hrubyPrijem <= minimalniMzda) {
		socialniPojisteni = 0.065 * hrubyPrijem;

		// pokud platí zdravotní jinde, standardně se počítá z hrubého příjmu
		if (platiZdravotniJinde) {
			zdravotniPojisteni = 0.045 * hrubyPrijem;

		// pokud neplatí zdravotní jinde, z minimální mzdy
		} else {
			zdravotniPojisteni = 0.045 * minimalniMzda;
		}
		zalohaNaDan = 0.15 * Math.ceil(1.34 * hrubyPrijem / 100) * 100;

	// nad limitem se platí sociální i zdravotní, takže superhrubý
	} else 	{
		socialniPojisteni = 0.065 * hrubyPrijem;
		zdravotniPojisteni = 0.045 * hrubyPrijem;
		zalohaNaDan = 0.15 * Math.ceil(1.34 * hrubyPrijem / 100) * 100;
	}

	cistyPrijem = hrubyPrijem - socialniPojisteni - zdravotniPojisteni - zalohaNaDan;

	return([hrubyPrijem, cistyPrijem, socialniPojisteni, zdravotniPojisteni, zalohaNaDan]);
}



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
	záloha na daň (integer)
poznámky:
	daňový bonus na děti je podmíněný šestinásobkem minimální mzdy, ten počítáme z aktuální minimální mzdy, ne příjmů za minulý rok, jak by to mělo být správně; o něm ale nic nevíme

*/

function spocitejPrijemUZamestnavatele(prijemNaHPP = [0, 0, 0, 0, 0], prijemNaDPC = [0, 0, 0, 0, 0], prijemNaDPP = [0, 0, 0, 0, 0], ruzovyPapir = true, pocetVyzivovanychDeti = 0) {

	var slevaNaDeti = 0,
		danovyBonusNaDeti = 0,
		slevaNaPrvniDite = 15204 / 12, // 1267
		slevaNaDruheDite = 19404 / 12, // 1617
		slevaNaTretiDite = 24204 / 12, // 2017
		limitBonusuNaDeti = 60300 / 12, // 5025
		slevyNaDani = 0,
		slevaNaPoplatnika = 24840 / 12, // 2070
		zalohaNaDanPoZvyhodneni = 0,
		cistyPrijemBezBonusuNaDeti = 0,
		cistyPrijem = 0,
		hrubyPrijem = 0,
		socialniPojisteni = 0,
		zdravotniPojisteni = 0,
		zalohaNaDan = 0,
		minimalniMzda = 12200,
		narokNaBonusNaDeti = false;

	// daňové zvýhodnění na děti
	if (pocetVyzivovanychDeti == 1) {
			slevaNaDeti = slevaNaPrvniDite;
		} else if (pocetVyzivovanychDeti == 2) {
			slevaNaDeti = slevaNaPrvniDite + slevaNaDruheDite;
		} else if (pocetVyzivovanychDeti > 2) {
			slevaNaDeti = slevaNaPrvniDite + slevaNaDruheDite + (pocetVyzivovanychDeti - 2) * slevaNaTretiDite;
		}

	// základní hodnoty - bez slevy na dani
	hrubyPrijem = prijemNaHPP[0] + prijemNaDPP[0] + prijemNaDPC[0];
	cistyPrijem = prijemNaHPP[1] + prijemNaDPP[1] + prijemNaDPC[1];
	cistyPrijemBezBonusuNaDeti = cistyPrijem;
	socialniPojisteni = prijemNaHPP[2] + prijemNaDPP[2] + prijemNaDPC[2];
	zdravotniPojisteni = prijemNaHPP[3] + prijemNaDPP[3] + prijemNaDPC[3];
	zalohaNaDan = prijemNaHPP[4] + prijemNaDPP[4] + prijemNaDPC[4];

	// pokud je podepsaný růžový papír, aplikují se slevy na dani
	if (ruzovyPapir) {

		slevyNaDani = slevaNaPoplatnika;

		// daňový bonus na děti je navázaný na roční příjem alespoň ve výši šestinásobku minimální mzdy, maximální výše je limit bonusu na děti
		if ( (12 * hrubyPrijem) > (6 * minimalniMzda) ) {
			narokNaBonusNaDeti = true;
		}

		// pokud vyjde po započtení slev záporně, je nulová
		zalohaNaDanPoZvyhodneni = Math.max(zalohaNaDan - slevyNaDani - slevaNaDeti, 0);

		// pokud je záloha po odečtení slev záporná, počítáme s ní jako s bonusem na děti; nesmí ale přesáhnout limit bonusu a musí na něj existovat nárok
		if (narokNaBonusNaDeti) {
			danovyBonusNaDeti = -(Math.min(zalohaNaDan - slevyNaDani - slevaNaDeti, 0));
			danovyBonusNaDeti = Math.min(danovyBonusNaDeti, limitBonusuNaDeti);
		} else {
			danovyBonusNaDeti = 0;
		}

		cistyPrijemBezBonusuNaDeti = hrubyPrijem - socialniPojisteni - zdravotniPojisteni - zalohaNaDanPoZvyhodneni;
		cistyPrijem = cistyPrijemBezBonusuNaDeti + danovyBonusNaDeti;

	}

	return([cistyPrijem, cistyPrijemBezBonusuNaDeti, socialniPojisteni, zdravotniPojisteni, zalohaNaDan]);
}



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

function spocitejPrijemDospeleho(prijemPrace1 = [0, 0, 0, 0, 0], prijemPrace2 = [0, 0, 0, 0, 0], prijemPrace3 = [0, 0, 0, 0, 0]) {

	cistyPrijem = prijemPrace1[0] + prijemPrace2[0] + prijemPrace3[0];
	cistyPrijemBezBonusuNaDeti = prijemPrace1[1] + prijemPrace2[1] + prijemPrace3[1];
	socialniPojisteni = prijemPrace1[2] + prijemPrace2[2] + prijemPrace3[2];
	zdravotniPojisteni = prijemPrace1[3] + prijemPrace2[3] + prijemPrace3[3];
	zalohaNaDan = prijemPrace1[4] + prijemPrace2[4] + prijemPrace3[4];

	return([cistyPrijem, cistyPrijemBezBonusuNaDeti, socialniPojisteni, zdravotniPojisteni, zalohaNaDan]);
}



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

function spocitejCistyPrijemDomacnostiZeZamestnani(prijemPrvnihoDospeleho = [0, 0, 0, 0, 0], prijemDruhehoDospeleho = [0, 0, 0, 0, 0], prijemTretihoDospeleho = [0, 0, 0, 0, 0]) {

	var cistyPrijemDomacnosti = 0,
		cistyPrijemDomacnostiBezBonusuNaDeti = 0;

	cistyPrijemDomacnosti = prijemPrvnihoDospeleho[0] + prijemDruhehoDospeleho[0] + prijemTretihoDospeleho[0];

	cistyPrijemDomacnostiBezBonusuNaDeti = prijemPrvnihoDospeleho[1] + prijemDruhehoDospeleho[1] + prijemTretihoDospeleho[1];

	return([cistyPrijemDomacnosti, cistyPrijemDomacnostiBezBonusuNaDeti]);
}



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

function spocitejPridavkyNaDeti(cistyPrijemDomacnosti = [0, 0], prijemPrvnihoDospeleho = [0, 0, 0, 0, 0], prijemDruhehoDospeleho = [0, 0, 0, 0, 0], prijemTretihoDospeleho = [0, 0, 0, 0, 0],
	zivotniMinimum = [0, 0], pocetDetiPod6 = 0, pocetDeti6az15 = 0, pocetDeti15az26 = 0, narokNaVyssiDavky = false) {

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

function spocitejNakladyNaBydleniProSSP(najem = 0, poplatky = 0, pocetClenuDomacnosti = 0, pocetClenuDomacnostiSTrvalymPobytemJinde = 0, vlastniBydleni = false, velikostObce = 1) {

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

function spocitejNakladyNaBydleniProHN(najem = 0, poplatky = 0, pocetClenuDomacnosti = 0, vlastniBydleni = false, ubytovna = false, velikostObce = 1, mistneObvykleNaklady = 0) {

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

function spocitejPrispevekNaBydleni(cistyPrijemDomacnosti = [0, 0], nakladyNaBydleniProSSP = [0, 0], zivotniMinimum = [0, 0], duchody = 0, rodicovska = 0, pridavkyNaDeti = 0,
	podporaVNezamestnanosti = 0, nemocenska = 0, ostatniPrijmy = 0, velikostObce = 1, ubytovna = false) {

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
	cistyPrijemBezBonusuNaDeti = cistyPrijemDomacnosti[1];

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

function spocitejPrispevekNaZivobyti(cistyPrijemDomacnosti = [0, 0], nakladyNaBydleniProHN = [0, 0], zivotniMinimum = [0, 0], duchody = 0, rodicovska = 0, pridavkyNaDeti = 0,
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

	// pro příspěvek na živobytí se počítá čistý příjem domácnosti bez bonusu na děti
	cistyPrijemBezBonusuNaDeti = cistyPrijemDomacnosti[1];

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

function spocitejDoplatekNaBydleni(cistyPrijemDomacnosti = [0, 0], nakladyNaBydleniProHN = [0, 0], zivotniMinimum = [0, 0], prispevekNaZivobyti = 0, prispevekNaBydleni = 0, duchody = 0,
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

	// pro doplatek na bydlení se počítá čistý příjem domácnosti bez bonusu na děti
	cistyPrijemBezBonusuNaDeti = cistyPrijemDomacnosti[1];

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



/*

výpočet příjmů po exekuci

vstupy:
výstupy:
poznámky:
	v tuhle chvíli nemáme žádné příjmy, které nejdou exekuovat

*/

function spocitejPrijemDospelehoPoExekuci(prijemDospeleho = [0, 0, 0, 0, 0], duchody = 0, nemocenska = 0, podporaVNezamestnanosti = 0, rodicovska = 0, ostatniPrijmy = 0,
	prednostniExekuce = 0, neprednostniExekuce = 0, dalsiVyzivovaneOsoby = 0) {

	var prijmyPredExekuci = 0,
		prijmyPoExekuci = 0,
		danovyBonusNaDeti = 0,
		nezabavitelnaCastkaProPrvniOsobu = 6225,
		nezabavitelnaCastkaProDalsiOsobu = 1556,
		nezabavitelnaCastka = 0,
		zakladPrijmuProExekuci = 0,
		zakladniNezabavitelnaCastka = 9338,
		exekuce = 0;

	// je potřeba spočítat daňový bonus, ten je později možno exekuovat
	danovyBonusNaDeti = prijemDospeleho[0] - prijemDospeleho[1];

	// do výpočtu příjmů pro exekuci vstupují i exekuovatelné dávky; tím se smaže informace o jejich rozdělení, ale líp to neumíme
	prijmyPredExekuci = prijemDospeleho[0] + duchody + nemocenska + podporaVNezamestnanosti + rodicovska + ostatniPrijmy;

	// výpočet nezabavitelné částky
	nezabavitelnaCastka = nezabavitelnaCastkaProPrvniOsobu + dalsiVyzivovaneOsoby * nezabavitelnaCastkaProDalsiOsobu;

	// pokud je bez exekucí, příjmy před exekucí a po exekuci se nemění
	if( (prednostniExekuce + neprednostniExekuce ) == 0) {
		return([prijmyPredExekuci, prijmyPredExekuci, 0]);
	}

	// Pokud jsou příjmy nižší než nezabavitelná částka, nic se nestrhává
	if (prijmyPredExekuci < nezabavitelnaCastka) {
		return([prijmyPredExekuci, prijmyPredExekuci, 0])

	} else {

		// Z čisté mzdy zaměstnance je odečtena základní nezabavitelná částka (minimum). Pokud je rovna nebo vyšší 9338 Kč, počítá se v této fázi s celou částkou 9338 Kč.
		zakladPrijmuProExekuci = Math.min(prijmyPredExekuci - nezabavitelnaCastka, zakladniNezabavitelnaCastka);

		// Pokud je aspoň jedna přednostní exekuce, může jít srážka až do dvou třetin příjmu po stržení nezabavitelné částky
		if (prednostniExekuce > 0) {
			prijmyPoExekuci = zakladPrijmuProExekuci / 3;

		// U exekucí pro nepřednostní pohledávky je srážen dluh do výše jedné třetiny příjmů z této částky
		} else {
			prijmyPoExekuci = 2 * zakladPrijmuProExekuci / 3;
		}

		// u první exekuce se připočte daňový bonus na dítě
		if ( (prednostniExekuce + neprednostniExekuce) == 1 ) {
			prijmyPoExekuci = prijmyPoExekuci + nezabavitelnaCastka + danovyBonusNaDeti;

		// pokud je ale exekucí víc, může další exekutor zabavit i daňový bonus, tj. do výpočtu vstupuje čistý příjem včetně bonusu
		} else {
			prijmyPoExekuci = prijmyPoExekuci + nezabavitelnaCastka;
		}

	}

	exekuce = prijmyPredExekuci - prijmyPoExekuci;

	return([prijmyPredExekuci, prijmyPoExekuci, exekuce]);
}



/*

spočítej příjem domácnost po exekuci

*/

function spocitejPrijemDomacnostiPoExekuci(prijemPrvnihoDospelehoPoExekuci = [0, 0, 0], prijemDruhehoDospelehoPoExekuci = [0, 0, 0], prijemTretihoDospelehoPoExekuci = [0, 0, 0],
	pridavkyNaDeti = 0, prispevekNaBydleni = 0, prispevekNaZivobyti = 0, doplatekNaBydleni = 0, najem = 0, poplatky = 0) {

	var prijemDomacnostiPredExekuci = 0,
		prijemDomacnostiPoExekuci = 0,
		prijemDomacnostiPredExekuciMinusNajem = 0,
		prijemDomacnostiPoExekuciMinusNajem = 0,
		exekuce = 0;

	prijemDomacnostiPredExekuci = prijemPrvnihoDospelehoPoExekuci[0] + prijemDruhehoDospelehoPoExekuci[0] + prijemTretihoDospelehoPoExekuci[0] +
		pridavkyNaDeti + prispevekNaBydleni + prispevekNaZivobyti + doplatekNaBydleni;
	prijemDomacnostiPoExekuci = prijemPrvnihoDospelehoPoExekuci[1] + prijemDruhehoDospelehoPoExekuci[1] + prijemTretihoDospelehoPoExekuci[1] +
		pridavkyNaDeti + prispevekNaBydleni + prispevekNaZivobyti + doplatekNaBydleni;
	prijemDomacnostiPredExekuciMinusNajem = prijemDomacnostiPredExekuci - najem - poplatky;
	prijemDomacnostiPoExekuciMinusNajem = prijemDomacnostiPoExekuci - najem - poplatky;

	exekuce = prijemPrvnihoDospelehoPoExekuci[2] + prijemDruhehoDospelehoPoExekuci[2] + prijemTretihoDospelehoPoExekuci[2];

	return([prijemDomacnostiPredExekuci, prijemDomacnostiPoExekuci, prijemDomacnostiPredExekuciMinusNajem, prijemDomacnostiPoExekuciMinusNajem, exekuce]);
}



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

	var rodinkaPrijemPrvnihoDospeleho = spocitejPrijemDospeleho(
		prijemPrace1 = spocitejPrijemUZamestnavatele(
			prijemNaHPP = spocitejSlozkyNaHPP(prvniDospelyPrvniZamestnavatel[0], prvniDospelyPrvniZamestnavatel[1]),
			prijemNaDPC = spocitejSlozkyNaDPC(prvniDospelyPrvniZamestnavatel[2], prvniDospelyPrvniZamestnavatel[3]),
			prijemNaDPP = spocitejSlozkyNaDPP(prvniDospelyPrvniZamestnavatel[4], prvniDospelyPrvniZamestnavatel[5]),
			ruzovyPapir = prvniDospelyPrvniZamestnavatel[6],
			pocetVyzivovanychDeti = prvniDospelyPrvniZamestnavatel[7]),
		prijemPrace2 = spocitejPrijemUZamestnavatele(
			prijemNaHPP = spocitejSlozkyNaHPP(prvniDospelyDruhyZamestnavatel[0], prvniDospelyDruhyZamestnavatel[1]),
			prijemNaDPC = spocitejSlozkyNaDPC(prvniDospelyDruhyZamestnavatel[2], prvniDospelyDruhyZamestnavatel[3]),
			prijemNaDPP = spocitejSlozkyNaDPP(prvniDospelyDruhyZamestnavatel[4], prvniDospelyDruhyZamestnavatel[5]),
			ruzovyPapir = prvniDospelyDruhyZamestnavatel[6],
			pocetVyzivovanychDeti = prvniDospelyDruhyZamestnavatel[7]),
		prijemPrace3 = spocitejPrijemUZamestnavatele(
			prijemNaHPP = spocitejSlozkyNaHPP(prvniDospelyTretiZamestnavatel[0], prvniDospelyTretiZamestnavatel[1]),
			prijemNaDPC = spocitejSlozkyNaDPC(prvniDospelyTretiZamestnavatel[2], prvniDospelyTretiZamestnavatel[3]),
			prijemNaDPP = spocitejSlozkyNaDPP(prvniDospelyTretiZamestnavatel[4], prvniDospelyTretiZamestnavatel[5]),
			ruzovyPapir = prvniDospelyTretiZamestnavatel[6],
			pocetVyzivovanychDeti = prvniDospelyTretiZamestnavatel[7]));

	var rodinkaPrijemDruhehoDospeleho = spocitejPrijemDospeleho(
		prijemPrace1 = spocitejPrijemUZamestnavatele(
			prijemNaHPP = spocitejSlozkyNaHPP(druhyDospelyPrvniZamestnavatel[0], druhyDospelyPrvniZamestnavatel[1]),
			prijemNaDPC = spocitejSlozkyNaDPC(druhyDospelyPrvniZamestnavatel[2], druhyDospelyPrvniZamestnavatel[3]),
			prijemNaDPP = spocitejSlozkyNaDPP(druhyDospelyPrvniZamestnavatel[4], druhyDospelyPrvniZamestnavatel[5]),
			ruzovyPapir = druhyDospelyPrvniZamestnavatel[6],
			pocetVyzivovanychDeti = druhyDospelyPrvniZamestnavatel[7]),
		prijemPrace2 = spocitejPrijemUZamestnavatele(
			prijemNaHPP = spocitejSlozkyNaHPP(druhyDospelyDruhyZamestnavatel[0], druhyDospelyDruhyZamestnavatel[1]),
			prijemNaDPC = spocitejSlozkyNaDPC(druhyDospelyDruhyZamestnavatel[2], druhyDospelyDruhyZamestnavatel[3]),
			prijemNaDPP = spocitejSlozkyNaDPP(druhyDospelyDruhyZamestnavatel[4], druhyDospelyDruhyZamestnavatel[5]),
			ruzovyPapir = druhyDospelyDruhyZamestnavatel[6],
			pocetVyzivovanychDeti = druhyDospelyDruhyZamestnavatel[7]),
		prijemPrace3 = spocitejPrijemUZamestnavatele(
			prijemNaHPP = spocitejSlozkyNaHPP(druhyDospelyTretiZamestnavatel[0], druhyDospelyTretiZamestnavatel[1]),
			prijemNaDPC = spocitejSlozkyNaDPC(druhyDospelyTretiZamestnavatel[2], druhyDospelyTretiZamestnavatel[3]),
			prijemNaDPP = spocitejSlozkyNaDPP(druhyDospelyTretiZamestnavatel[4], druhyDospelyTretiZamestnavatel[5]),
			ruzovyPapir = druhyDospelyTretiZamestnavatel[6],
			pocetVyzivovanychDeti = druhyDospelyTretiZamestnavatel[7]));

	var rodinkaPrijemTretihoDospeleho = spocitejPrijemDospeleho(
		prijemPrace1 = spocitejPrijemUZamestnavatele(
			prijemNaHPP = spocitejSlozkyNaHPP(tretiDospelyPrvniZamestnavatel[0], tretiDospelyPrvniZamestnavatel[1]),
			prijemNaDPC = spocitejSlozkyNaDPC(tretiDospelyPrvniZamestnavatel[2], tretiDospelyPrvniZamestnavatel[3]),
			prijemNaDPP = spocitejSlozkyNaDPP(tretiDospelyPrvniZamestnavatel[4], tretiDospelyPrvniZamestnavatel[5]),
			ruzovyPapir = tretiDospelyPrvniZamestnavatel[6],
			pocetVyzivovanychDeti = tretiDospelyPrvniZamestnavatel[7]),
		prijemPrace2 = spocitejPrijemUZamestnavatele(
			prijemNaHPP = spocitejSlozkyNaHPP(tretiDospelyDruhyZamestnavatel[0], tretiDospelyDruhyZamestnavatel[1]),
			prijemNaDPC = spocitejSlozkyNaDPC(tretiDospelyDruhyZamestnavatel[2], tretiDospelyDruhyZamestnavatel[3]),
			prijemNaDPP = spocitejSlozkyNaDPP(tretiDospelyDruhyZamestnavatel[4], tretiDospelyDruhyZamestnavatel[5]),
			ruzovyPapir = tretiDospelyDruhyZamestnavatel[6],
			pocetVyzivovanychDeti = tretiDospelyDruhyZamestnavatel[7]),
		prijemPrace3 = spocitejPrijemUZamestnavatele(
			prijemNaHPP = spocitejSlozkyNaHPP(tretiDospelyTretiZamestnavatel[0], tretiDospelyTretiZamestnavatel[1]),
			prijemNaDPC = spocitejSlozkyNaDPC(tretiDospelyTretiZamestnavatel[2], tretiDospelyTretiZamestnavatel[3]),
			prijemNaDPP = spocitejSlozkyNaDPP(tretiDospelyTretiZamestnavatel[4], tretiDospelyTretiZamestnavatel[5]),
			ruzovyPapir = tretiDospelyTretiZamestnavatel[6],
			pocetVyzivovanychDeti = tretiDospelyTretiZamestnavatel[7]));

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

	var rodinkaNakladyNaBydleniProSSP = spocitejNakladyNaBydleniProSSP(
		najem = bydleni[0],
		poplatky = bydleni[1],
		pocetClenuDomacnosti = slozeniDomacnosti[4],
		pocetClenuDomacnostiSTrvalymPobytemJinde = slozeniDomacnosti[5],
		vlastniBydleni = bydleni[2],
		velikostObce = bydleni[4]);

	var rodinkaNakladyNaBydleniProHN = spocitejNakladyNaBydleniProHN(
		najem = bydleni[0],
		poplatky = bydleni[1],
		pocetClenuDomacnosti = slozeniDomacnosti[4],
		vlastniBydleni = bydleni[2],
		ubytovna = bydleni[3],
		velikostObce = bydleni[4],
		mistneObvykleNaklady = bydleni[5]);

	var rodinkaDuchody =  parseFloat(prvniDospelyDalsiPrijmy[0]) + parseFloat(druhyDospelyDalsiPrijmy[0]) + parseFloat(tretiDospelyDalsiPrijmy[0]);

	var rodinkaRodicovska = parseFloat(prvniDospelyDalsiPrijmy[1]) + parseFloat(druhyDospelyDalsiPrijmy[1]) + parseFloat(tretiDospelyDalsiPrijmy[1]);

	var rodinkaPodporaVNezamestnanosti = parseFloat(prvniDospelyDalsiPrijmy[2]) + parseFloat(druhyDospelyDalsiPrijmy[2]) + parseFloat(tretiDospelyDalsiPrijmy[2]);

	var rodinkaNemocenska = parseFloat(prvniDospelyDalsiPrijmy[3]) + parseFloat(druhyDospelyDalsiPrijmy[3]) + parseFloat(tretiDospelyDalsiPrijmy[3]);

	var rodinkaOstatniPrijmy = parseFloat(prvniDospelyDalsiPrijmy[4]) + parseFloat(druhyDospelyDalsiPrijmy[4]) + parseFloat(tretiDospelyDalsiPrijmy[4]);

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
		velikostObce = bydleni[4],
		ubytovna = bydleni[3]);

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

	var rodinkaPrijemPrvnihoDospelehoPoExekuci = spocitejPrijemDospelehoPoExekuci(
		prijemDospeleho = rodinkaPrijemPrvnihoDospeleho,
		duchody = prvniDospelyDalsiPrijmy[0],
		nemocenska = prvniDospelyDalsiPrijmy[3],
		podporaVNezamestnanosti = prvniDospelyDalsiPrijmy[2],
		rodicovska = prvniDospelyDalsiPrijmy[1],
		ostatniPrijmy = prvniDospelyDalsiPrijmy[4],
		prednostniExekuce = prvniDospelyExekuce[0],
		neprednostniExekuce = prvniDospelyExekuce[1],
		dalsiVyzivovaneOsoby = prvniDospelyExekuce[2]);

	var rodinkaPrijemDruhehoDospelehoPoExekuci = spocitejPrijemDospelehoPoExekuci(
		prijemDospeleho = rodinkaPrijemDruhehoDospeleho,
		duchody = druhyDospelyDalsiPrijmy[0],
		nemocenska = druhyDospelyDalsiPrijmy[3],
		podporaVNezamestnanosti = druhyDospelyDalsiPrijmy[2],
		rodicovska = druhyDospelyDalsiPrijmy[1],
		ostatniPrijmy = druhyDospelyDalsiPrijmy[4],
		prednostniExekuce = druhyDospelyExekuce[0],
		neprednostniExekuce = druhyDospelyExekuce[1],
		dalsiVyzivovaneOsoby = druhyDospelyExekuce[2]);

	var rodinkaPrijemTretihoDospelehoPoExekuci = spocitejPrijemDospelehoPoExekuci(
		prijemDospeleho = rodinkaPrijemTretihoDospeleho,
		duchody = tretiDospelyDalsiPrijmy[0],
		nemocenska = tretiDospelyDalsiPrijmy[3],
		podporaVNezamestnanosti = tretiDospelyDalsiPrijmy[2],
		rodicovska = tretiDospelyDalsiPrijmy[1],
		ostatniPrijmy = tretiDospelyDalsiPrijmy[4],
		prednostniExekuce = tretiDospelyExekuce[0],
		neprednostniExekuce = tretiDospelyExekuce[1],
		dalsiVyzivovaneOsoby = tretiDospelyExekuce[2]);

	var rodinkaPrijemPoExekuci = spocitejPrijemDomacnostiPoExekuci(
		prijemPrvnihoDospelehoPoExekuci = rodinkaPrijemPrvnihoDospelehoPoExekuci,
		prijemDruhehoDospelehoPoExekuci = rodinkaPrijemDruhehoDospelehoPoExekuci,
		prijemTretihoDospelehoPoExekuci = rodinkaPrijemTretihoDospelehoPoExekuci,
		pridavkyNaDeti = rodinkaPridavkyNaDeti,
		prispevekNaBydleni = rodinkaPrispevekNaBydleni,
		prispevekNaZivobyti = rodinkaPrispevekNaZivobyti,
		doplatekNaBydleni = rodinkaDoplatekNaBydleni);

	var prijmyAVydajeRodinyPoZapocteniDavek = [];

	// čistý příjem prvního dospělého před exekucí, všechny příjmy vč. dávek před a po exekuci
	prijmyAVydajeRodinyPoZapocteniDavek[0] = Math.round(rodinkaPrijemPrvnihoDospeleho[0]);
	prijmyAVydajeRodinyPoZapocteniDavek[1] = Math.round(rodinkaPrijemPrvnihoDospelehoPoExekuci[0]);
	prijmyAVydajeRodinyPoZapocteniDavek[2] = Math.round(rodinkaPrijemPrvnihoDospelehoPoExekuci[1]);

	// čistý příjem druhého dospělého před exekucí, všechny příjmy vč. dávek před a po exekuci
	prijmyAVydajeRodinyPoZapocteniDavek[3] = Math.round(rodinkaPrijemDruhehoDospeleho[0]);
	prijmyAVydajeRodinyPoZapocteniDavek[4] = Math.round(rodinkaPrijemDruhehoDospelehoPoExekuci[0]);
	prijmyAVydajeRodinyPoZapocteniDavek[5] = Math.round(rodinkaPrijemDruhehoDospelehoPoExekuci[1]);

	// čistý příjem třetího dospělého před exekucí, všechny příjmy vč. dávek před a po exekuci
	prijmyAVydajeRodinyPoZapocteniDavek[6] = Math.round(rodinkaPrijemTretihoDospeleho[0]);
	prijmyAVydajeRodinyPoZapocteniDavek[7] = Math.round(rodinkaPrijemTretihoDospelehoPoExekuci[0]);
	prijmyAVydajeRodinyPoZapocteniDavek[8] = Math.round(rodinkaPrijemTretihoDospelehoPoExekuci[1]);

	// čistý příjem domácnosti před exekucí, všechny příjmy vč. dávek před a po exekuci
	prijmyAVydajeRodinyPoZapocteniDavek[9] = Math.round(rodinkaCistyPrijemDomacnosti[0]);
	prijmyAVydajeRodinyPoZapocteniDavek[10] = Math.round(rodinkaPrijemPoExekuci[0]);
	prijmyAVydajeRodinyPoZapocteniDavek[11] = Math.round(rodinkaPrijemPoExekuci[1]);

	// všechny příjmy domácnosti vč. dávek před a po exekuci mínus náklady na bydlení
	prijmyAVydajeRodinyPoZapocteniDavek[12] = Math.round(rodinkaPrijemPoExekuci[2] - bydleni[0] - bydleni[1]);
	prijmyAVydajeRodinyPoZapocteniDavek[13] = Math.round(rodinkaPrijemPoExekuci[3] - bydleni[0] - bydleni[1]);

	// přídavky na děti
	prijmyAVydajeRodinyPoZapocteniDavek[14] = Math.round(rodinkaPridavkyNaDeti);

	// příspěvek na bydlení
	prijmyAVydajeRodinyPoZapocteniDavek[15] = Math.round(rodinkaPrispevekNaBydleni);

	// příspěvek na živobytí
	prijmyAVydajeRodinyPoZapocteniDavek[16] = Math.round(rodinkaPrispevekNaZivobyti);

	// doplatek na bydlení
	prijmyAVydajeRodinyPoZapocteniDavek[17] = Math.round(rodinkaDoplatekNaBydleni);

	// důchody
	prijmyAVydajeRodinyPoZapocteniDavek[18] = Math.round(rodinkaDuchody);

	// rodičovská
	prijmyAVydajeRodinyPoZapocteniDavek[19] = Math.round(rodinkaRodicovska);

	// podpora v nezaměstnanosti
	prijmyAVydajeRodinyPoZapocteniDavek[20] = Math.round(rodinkaPodporaVNezamestnanosti);

	// nemocenská
	prijmyAVydajeRodinyPoZapocteniDavek[21] = Math.round(rodinkaNemocenska);

	// ostatní příjmy
	prijmyAVydajeRodinyPoZapocteniDavek[22] = Math.round(rodinkaOstatniPrijmy);

	// nájem
	prijmyAVydajeRodinyPoZapocteniDavek[23] = Math.round(bydleni[0]);

	// poplatky
	prijmyAVydajeRodinyPoZapocteniDavek[24] = Math.round(bydleni[1]);

	// exekuce
	prijmyAVydajeRodinyPoZapocteniDavek[25] = Math.round(rodinkaPrijemPrvnihoDospelehoPoExekuci[2]);
	prijmyAVydajeRodinyPoZapocteniDavek[26] = Math.round(rodinkaPrijemDruhehoDospelehoPoExekuci[2]);
	prijmyAVydajeRodinyPoZapocteniDavek[27] = Math.round(rodinkaPrijemTretihoDospelehoPoExekuci[2]);
	prijmyAVydajeRodinyPoZapocteniDavek[28] = Math.round(rodinkaPrijemPoExekuci[4]);

	return(prijmyAVydajeRodinyPoZapocteniDavek);
}



/*

přepsání formuláře do globálních proměnných

*/

function prepisFormular() {

	prvniDospelyPrvniZamestnavatel[0] = parseFloat(document.getElementById("prvniDospelyPrvniZamestnavatelHPPPrijem").value);
	prvniDospelyPrvniZamestnavatel[1] = JSON.parse(document.getElementById("prvniDospelyPrvniZamestnavatelHPPVyjimka").value);
	prvniDospelyPrvniZamestnavatel[2] = parseFloat(document.getElementById("prvniDospelyPrvniZamestnavatelDPCPrijem").value);
	prvniDospelyPrvniZamestnavatel[3] = JSON.parse(document.getElementById("prvniDospelyPrvniZamestnavatelDPCZdravotni").value);
	prvniDospelyPrvniZamestnavatel[4] = parseFloat(document.getElementById("prvniDospelyPrvniZamestnavatelDPPPrijem").value);
	prvniDospelyPrvniZamestnavatel[5] = JSON.parse(document.getElementById("prvniDospelyPrvniZamestnavatelDPPZdravotni").value);
	prvniDospelyPrvniZamestnavatel[6] = JSON.parse(document.getElementById("prvniDospelyPrvniZamestnavatelRuzovyPapir").value);
	prvniDospelyPrvniZamestnavatel[7] = parseFloat(document.getElementById("prvniDospelyPrvniZamestnavatelVyzivovaneDeti").value);

	prvniDospelyDruhyZamestnavatel[0] = parseFloat(document.getElementById("prvniDospelyDruhyZamestnavatelHPPPrijem").value);
	prvniDospelyDruhyZamestnavatel[1] = JSON.parse(document.getElementById("prvniDospelyDruhyZamestnavatelHPPVyjimka").value);
	prvniDospelyDruhyZamestnavatel[2] = parseFloat(document.getElementById("prvniDospelyDruhyZamestnavatelDPCPrijem").value);
	prvniDospelyDruhyZamestnavatel[3] = JSON.parse(document.getElementById("prvniDospelyDruhyZamestnavatelDPCZdravotni").value);
	prvniDospelyDruhyZamestnavatel[4] = parseFloat(document.getElementById("prvniDospelyDruhyZamestnavatelDPPPrijem").value);
	prvniDospelyDruhyZamestnavatel[5] = JSON.parse(document.getElementById("prvniDospelyDruhyZamestnavatelDPPZdravotni").value);
	prvniDospelyDruhyZamestnavatel[6] = JSON.parse(document.getElementById("prvniDospelyDruhyZamestnavatelRuzovyPapir").value);
	prvniDospelyDruhyZamestnavatel[7] = parseFloat(document.getElementById("prvniDospelyDruhyZamestnavatelVyzivovaneDeti").value);

	prvniDospelyTretiZamestnavatel[0] = parseFloat(document.getElementById("prvniDospelyTretiZamestnavatelHPPPrijem").value);
	prvniDospelyTretiZamestnavatel[1] = JSON.parse(document.getElementById("prvniDospelyTretiZamestnavatelHPPVyjimka").value);
	prvniDospelyTretiZamestnavatel[2] = parseFloat(document.getElementById("prvniDospelyTretiZamestnavatelDPCPrijem").value);
	prvniDospelyTretiZamestnavatel[3] = JSON.parse(document.getElementById("prvniDospelyTretiZamestnavatelDPCZdravotni").value);
	prvniDospelyTretiZamestnavatel[4] = parseFloat(document.getElementById("prvniDospelyTretiZamestnavatelDPPPrijem").value);
	prvniDospelyTretiZamestnavatel[5] = JSON.parse(document.getElementById("prvniDospelyTretiZamestnavatelDPPZdravotni").value);
	prvniDospelyTretiZamestnavatel[6] = JSON.parse(document.getElementById("prvniDospelyTretiZamestnavatelRuzovyPapir").value);
	prvniDospelyTretiZamestnavatel[7] = parseFloat(document.getElementById("prvniDospelyTretiZamestnavatelVyzivovaneDeti").value);

	prvniDospelyDalsiPrijmy[0] = parseFloat(document.getElementById("prvniDospelyDuchody").value);
	prvniDospelyDalsiPrijmy[1] = parseFloat(document.getElementById("prvniDospelyRodicovska").value);
	prvniDospelyDalsiPrijmy[2] = parseFloat(document.getElementById("prvniDospelyPodporaVNezamestnanosti").value);
	prvniDospelyDalsiPrijmy[3] = parseFloat(document.getElementById("prvniDospelyNemocenska").value);
	prvniDospelyDalsiPrijmy[4] = parseFloat(document.getElementById("prvniDospelyOstatniPrijmy").value);

	druhyDospelyPrvniZamestnavatel[0] = parseFloat(document.getElementById("druhyDospelyPrvniZamestnavatelHPPPrijem").value);
	druhyDospelyPrvniZamestnavatel[1] = JSON.parse(document.getElementById("druhyDospelyPrvniZamestnavatelHPPVyjimka").value);
	druhyDospelyPrvniZamestnavatel[2] = parseFloat(document.getElementById("druhyDospelyPrvniZamestnavatelDPCPrijem").value);
	druhyDospelyPrvniZamestnavatel[3] = JSON.parse(document.getElementById("druhyDospelyPrvniZamestnavatelDPCZdravotni").value);
	druhyDospelyPrvniZamestnavatel[4] = parseFloat(document.getElementById("druhyDospelyPrvniZamestnavatelDPPPrijem").value);
	druhyDospelyPrvniZamestnavatel[5] = JSON.parse(document.getElementById("druhyDospelyPrvniZamestnavatelDPPZdravotni").value);
	druhyDospelyPrvniZamestnavatel[6] = JSON.parse(document.getElementById("druhyDospelyPrvniZamestnavatelRuzovyPapir").value);
	druhyDospelyPrvniZamestnavatel[7] = parseFloat(document.getElementById("druhyDospelyPrvniZamestnavatelVyzivovaneDeti").value);

	druhyDospelyDruhyZamestnavatel[0] = parseFloat(document.getElementById("druhyDospelyDruhyZamestnavatelHPPPrijem").value);
	druhyDospelyDruhyZamestnavatel[1] = JSON.parse(document.getElementById("druhyDospelyDruhyZamestnavatelHPPVyjimka").value);
	druhyDospelyDruhyZamestnavatel[2] = parseFloat(document.getElementById("druhyDospelyDruhyZamestnavatelDPCPrijem").value);
	druhyDospelyDruhyZamestnavatel[3] = JSON.parse(document.getElementById("druhyDospelyDruhyZamestnavatelDPCZdravotni").value);
	druhyDospelyDruhyZamestnavatel[4] = parseFloat(document.getElementById("druhyDospelyDruhyZamestnavatelDPPPrijem").value);
	druhyDospelyDruhyZamestnavatel[5] = JSON.parse(document.getElementById("druhyDospelyDruhyZamestnavatelDPPZdravotni").value);
	druhyDospelyDruhyZamestnavatel[6] = JSON.parse(document.getElementById("druhyDospelyDruhyZamestnavatelRuzovyPapir").value);
	druhyDospelyDruhyZamestnavatel[7] = parseFloat(document.getElementById("druhyDospelyDruhyZamestnavatelVyzivovaneDeti").value);

	druhyDospelyTretiZamestnavatel[0] = parseFloat(document.getElementById("druhyDospelyTretiZamestnavatelHPPPrijem").value);
	druhyDospelyTretiZamestnavatel[1] = JSON.parse(document.getElementById("druhyDospelyTretiZamestnavatelHPPVyjimka").value);
	druhyDospelyTretiZamestnavatel[2] = parseFloat(document.getElementById("druhyDospelyTretiZamestnavatelDPCPrijem").value);
	druhyDospelyTretiZamestnavatel[3] = JSON.parse(document.getElementById("druhyDospelyTretiZamestnavatelDPCZdravotni").value);
	druhyDospelyTretiZamestnavatel[4] = parseFloat(document.getElementById("druhyDospelyTretiZamestnavatelDPPPrijem").value);
	druhyDospelyTretiZamestnavatel[5] = JSON.parse(document.getElementById("druhyDospelyTretiZamestnavatelDPPZdravotni").value);
	druhyDospelyTretiZamestnavatel[6] = JSON.parse(document.getElementById("druhyDospelyTretiZamestnavatelRuzovyPapir").value);
	druhyDospelyTretiZamestnavatel[7] = parseFloat(document.getElementById("druhyDospelyTretiZamestnavatelVyzivovaneDeti").value);

	druhyDospelyDalsiPrijmy[0] = parseFloat(document.getElementById("druhyDospelyDuchody").value);
	druhyDospelyDalsiPrijmy[1] = parseFloat(document.getElementById("druhyDospelyRodicovska").value);
	druhyDospelyDalsiPrijmy[2] = parseFloat(document.getElementById("druhyDospelyPodporaVNezamestnanosti").value);
	druhyDospelyDalsiPrijmy[3] = parseFloat(document.getElementById("druhyDospelyNemocenska").value);
	druhyDospelyDalsiPrijmy[4] = parseFloat(document.getElementById("druhyDospelyOstatniPrijmy").value);

	tretiDospelyPrvniZamestnavatel[0] = parseFloat(document.getElementById("tretiDospelyPrvniZamestnavatelHPPPrijem").value);
	tretiDospelyPrvniZamestnavatel[1] = JSON.parse(document.getElementById("tretiDospelyPrvniZamestnavatelHPPVyjimka").value);
	tretiDospelyPrvniZamestnavatel[2] = parseFloat(document.getElementById("tretiDospelyPrvniZamestnavatelDPCPrijem").value);
	tretiDospelyPrvniZamestnavatel[3] = JSON.parse(document.getElementById("tretiDospelyPrvniZamestnavatelDPCZdravotni").value);
	tretiDospelyPrvniZamestnavatel[4] = parseFloat(document.getElementById("tretiDospelyPrvniZamestnavatelDPPPrijem").value);
	tretiDospelyPrvniZamestnavatel[5] = JSON.parse(document.getElementById("tretiDospelyPrvniZamestnavatelDPPZdravotni").value);
	tretiDospelyPrvniZamestnavatel[6] = JSON.parse(document.getElementById("tretiDospelyPrvniZamestnavatelRuzovyPapir").value);
	tretiDospelyPrvniZamestnavatel[7] = parseFloat(document.getElementById("tretiDospelyPrvniZamestnavatelVyzivovaneDeti").value);

	tretiDospelyDruhyZamestnavatel[0] = parseFloat(document.getElementById("tretiDospelyDruhyZamestnavatelHPPPrijem").value);
	tretiDospelyDruhyZamestnavatel[1] = JSON.parse(document.getElementById("tretiDospelyDruhyZamestnavatelHPPVyjimka").value);
	tretiDospelyDruhyZamestnavatel[2] = parseFloat(document.getElementById("tretiDospelyDruhyZamestnavatelDPCPrijem").value);
	tretiDospelyDruhyZamestnavatel[3] = JSON.parse(document.getElementById("tretiDospelyDruhyZamestnavatelDPCZdravotni").value);
	tretiDospelyDruhyZamestnavatel[4] = parseFloat(document.getElementById("tretiDospelyDruhyZamestnavatelDPPPrijem").value);
	tretiDospelyDruhyZamestnavatel[5] = JSON.parse(document.getElementById("tretiDospelyDruhyZamestnavatelDPPZdravotni").value);
	tretiDospelyDruhyZamestnavatel[6] = JSON.parse(document.getElementById("tretiDospelyDruhyZamestnavatelRuzovyPapir").value);
	tretiDospelyDruhyZamestnavatel[7] = parseFloat(document.getElementById("tretiDospelyDruhyZamestnavatelVyzivovaneDeti").value);

	tretiDospelyTretiZamestnavatel[0] = parseFloat(document.getElementById("tretiDospelyTretiZamestnavatelHPPPrijem").value);
	tretiDospelyTretiZamestnavatel[1] = JSON.parse(document.getElementById("tretiDospelyTretiZamestnavatelHPPVyjimka").value);
	tretiDospelyTretiZamestnavatel[2] = parseFloat(document.getElementById("tretiDospelyTretiZamestnavatelDPCPrijem").value);
	tretiDospelyTretiZamestnavatel[3] = JSON.parse(document.getElementById("tretiDospelyTretiZamestnavatelDPCZdravotni").value);
	tretiDospelyTretiZamestnavatel[4] = parseFloat(document.getElementById("tretiDospelyTretiZamestnavatelDPPPrijem").value);
	tretiDospelyTretiZamestnavatel[5] = JSON.parse(document.getElementById("tretiDospelyTretiZamestnavatelDPPZdravotni").value);
	tretiDospelyTretiZamestnavatel[6] = JSON.parse(document.getElementById("tretiDospelyTretiZamestnavatelRuzovyPapir").value);
	tretiDospelyTretiZamestnavatel[7] = parseFloat(document.getElementById("tretiDospelyTretiZamestnavatelVyzivovaneDeti").value);

	tretiDospelyDalsiPrijmy[0] = parseFloat(document.getElementById("tretiDospelyDuchody").value);
	tretiDospelyDalsiPrijmy[1] = parseFloat(document.getElementById("tretiDospelyRodicovska").value);
	tretiDospelyDalsiPrijmy[2] = parseFloat(document.getElementById("tretiDospelyPodporaVNezamestnanosti").value);
	tretiDospelyDalsiPrijmy[3] = parseFloat(document.getElementById("tretiDospelyNemocenska").value);
	tretiDospelyDalsiPrijmy[4] = parseFloat(document.getElementById("tretiDospelyOstatniPrijmy").value);

	prvniDospelyExekuce[0] = parseFloat(document.getElementById("prvniDospelyPrednostniExekuce").value);
	prvniDospelyExekuce[1] = parseFloat(document.getElementById("prvniDospelyNeprednostniExekuce").value);
	prvniDospelyExekuce[2] = parseFloat(document.getElementById("prvniDospelyDalsiVyzivovaneOsoby").value);

	druhyDospelyExekuce[0] = parseFloat(document.getElementById("druhyDospelyPrednostniExekuce").value);
	druhyDospelyExekuce[1] = parseFloat(document.getElementById("druhyDospelyNeprednostniExekuce").value);
	druhyDospelyExekuce[2] = parseFloat(document.getElementById("druhyDospelyDalsiVyzivovaneOsoby").value);

	tretiDospelyExekuce[0] = parseFloat(document.getElementById("tretiDospelyPrednostniExekuce").value);
	tretiDospelyExekuce[1] = parseFloat(document.getElementById("tretiDospelyNeprednostniExekuce").value);
	tretiDospelyExekuce[2] = parseFloat(document.getElementById("tretiDospelyDalsiVyzivovaneOsoby").value);

	slozeniDomacnosti[0] = parseFloat(document.getElementById("pocetDospelych").value);
	slozeniDomacnosti[1] = parseFloat(document.getElementById("pocetDetiPod6").value);
	slozeniDomacnosti[2] = parseFloat(document.getElementById("pocetDeti6Az15").value);
	slozeniDomacnosti[3] = parseFloat(document.getElementById("pocetDeti15Az26").value);
	slozeniDomacnosti[4] = parseFloat(document.getElementById("pocetClenuDomacnosti").value);
	slozeniDomacnosti[5] = parseFloat(document.getElementById("trvaleBydlisteJinde").value);

	socialOptional[0] = parseFloat(document.getElementById("snizeneMinimum").value);
	socialOptional[1] = JSON.parse(document.getElementById("vyssiDavkyNaDeti").value);

	bydleni[0] = parseFloat(document.getElementById("najem").value);
	bydleni[1] = parseFloat(document.getElementById("poplatky").value);
	bydleni[2] = JSON.parse(document.getElementById("vlastniByt").value);
	bydleni[3] = JSON.parse(document.getElementById("ubytovna").value);
	bydleni[4] = parseFloat(document.getElementById("velikostObce").value);
	bydleni[5] = parseFloat(document.getElementById("obvykleNaklady").value);

	return false;
}



/*

*/

function statickyModelujRodinu() {

	prepisFormular();

	var prijmyAVydajeRodinyPoZapocteniDavek = spocitejPrijmyAVydajeRodinyPoZapocteniDavek();

	var text = "<p>První dospělý: čistý příjem " + prijmyAVydajeRodinyPoZapocteniDavek[0] + " Kč, včetně dávek " + prijmyAVydajeRodinyPoZapocteniDavek[1] + " Kč, po exekuci " +
		prijmyAVydajeRodinyPoZapocteniDavek[2] + " Kč, exekuce: " + prijmyAVydajeRodinyPoZapocteniDavek[25] + " Kč</p>";
		text += "<p>Druhý dospělý: čistý příjem " + prijmyAVydajeRodinyPoZapocteniDavek[3] + " Kč, včetně dávek " + prijmyAVydajeRodinyPoZapocteniDavek[4] + " Kč, po exekuci " +
		prijmyAVydajeRodinyPoZapocteniDavek[5] + " Kč, exekuce: " + prijmyAVydajeRodinyPoZapocteniDavek[26] + " Kč</p>";
		text += "<p>Třetí dospělý: čistý příjem " + prijmyAVydajeRodinyPoZapocteniDavek[6] + " Kč, včetně dávek " + prijmyAVydajeRodinyPoZapocteniDavek[7] + " Kč, po exekuci " +
		prijmyAVydajeRodinyPoZapocteniDavek[8] + " Kč, exekuce: " + prijmyAVydajeRodinyPoZapocteniDavek[27] + " Kč</p>";
		text += "<p>Rodina bez nákladů na bydlení: čistý příjem " + prijmyAVydajeRodinyPoZapocteniDavek[9] + " Kč, včetně dávek " + prijmyAVydajeRodinyPoZapocteniDavek[10] + " Kč, po exekuci " +
		prijmyAVydajeRodinyPoZapocteniDavek[11] + " Kč</p>";
		text += "<p><strong>Rodina po započtení nákladů na bydlení: včetně dávek " + prijmyAVydajeRodinyPoZapocteniDavek[12] + " Kč, po exekuci " + prijmyAVydajeRodinyPoZapocteniDavek[13] + " Kč</strong></p>";
		text += "<p><font color=\"green\">Přídavky na děti: " + prijmyAVydajeRodinyPoZapocteniDavek[14] + " Kč.</font></p>";
		text += "<p><font color=\"green\">Příspěvek na bydlení: " + prijmyAVydajeRodinyPoZapocteniDavek[15] + " Kč.</font></p>";
		text += "<p><font color=\"green\">Příspěvek na živobytí: " + prijmyAVydajeRodinyPoZapocteniDavek[16] + " Kč.</font></p>";
		text += "<p><font color=\"green\">Doplatek na bydlení: " + prijmyAVydajeRodinyPoZapocteniDavek[17] + " Kč.</font></p>";
		text += "<p><font color=\"green\">Důchody: " + prijmyAVydajeRodinyPoZapocteniDavek[18] + " Kč.</font></p>";
		text += "<p><font color=\"green\">Rodičovská: " + prijmyAVydajeRodinyPoZapocteniDavek[19] + " Kč.</font></p>";
		text += "<p><font color=\"green\">Podpora v nezaměstnanosti: " + prijmyAVydajeRodinyPoZapocteniDavek[20] + " Kč.</font></p>";
		text += "<p><font color=\"green\">Nemocenská: " + prijmyAVydajeRodinyPoZapocteniDavek[21] + " Kč.</font></p>";
		text += "<p><font color=\"green\">Ostatní příjmy: " + prijmyAVydajeRodinyPoZapocteniDavek[22] + " Kč.</font></p>";
		text += "<p><font color=\"red\">Nájem: " + prijmyAVydajeRodinyPoZapocteniDavek[23] + " Kč.</font></p>";
		text += "<p><font color=\"red\">Poplatky: " + prijmyAVydajeRodinyPoZapocteniDavek[24] + " Kč.</font>)</p>";
		text += "<p><font color=\"red\">Zaplaceno na exekucích: " + prijmyAVydajeRodinyPoZapocteniDavek[28] + " Kč.</font>)</p>";

	document.getElementById('results').innerHTML = text;

	return false;
}



/*

*/

function dynamickyModelujRodinu(simulace = 0) {

	prepisFormular();

	/* simulace:

	1: příjem prvního dospělého na HPP
	2: příjem prvního dospělého na DPČ
	3: příjem prvního dospělého na DPP
	4: nájem

	*/

	// záloha nezávislé proměnné, která se pak vrátí do globální proměnné
	var backup,

	// pro graf
		nazevNezavislePromenne,

	// spodní a horní hranice nezávislé proměnné pro simulaci
		intervalMin,
		intervalMax,

	// pro ukládání výsledků
		nezavisla = [],
		prijemRodiny = [],
		prvniDospelyPoExekuci = [],
		druhyDospelyPoExekuci = [],
		tretiDospelyPoExekuci = [],
		pridavkyNaDeti = [],
		prispevekNaBydleni = [],
		prispevekNaZivobyti = [],
		doplatekNaBydleni = [],
		duchody = [],
		rodicovska = [],
		podporaVNezamestnanosti = [],
		nemocenska = [],
		ostatniPrijmy = [],
		najem = [],
		poplatky = [],
		exekuce = [];

	if (simulace == 1) {
		nazevNezavislePromenne = 'příjem prvního dospělého na HPP';
		backup = prvniDospelyPrvniZamestnavatel[0];
		intervalMin = 13000;
		intervalMax = 30000;
	} else if (simulace == 2) {
		nazevNezavislePromenne = 'příjem prvního dospělého na DPČ';
		backup = prvniDospelyPrvniZamestnavatel[2];
		intervalMin = 0;
		intervalMax = 10000;
	} else if (simulace == 3) {
		nazevNezavislePromenne = 'příjem prvního dospělého na DPP';
		backup = prvniDospelyPrvniZamestnavatel[4];
		intervalMin = 0;
		intervalMax = 10000;
	} else if (simulace == 4) {
		nazevNezavislePromenne = 'nájem';
		backup = bydleni[0];
		intervalMin = 0;
		intervalMax = 20000;
	}

	// u HPP nejdřív spočítat situaci s nulovou a minimální mzdou
	if (simulace == 1) {
		for (i = 0; i <= 12200; i = i + 12200) {
			prvniDospelyPrvniZamestnavatel[0] = i;
			nezavisla.push(i)

			var prijmyAVydajeRodinyPoZapocteniDavek = spocitejPrijmyAVydajeRodinyPoZapocteniDavek();
			prijemRodiny.push(prijmyAVydajeRodinyPoZapocteniDavek[13])
			prvniDospelyPoExekuci.push(prijmyAVydajeRodinyPoZapocteniDavek[2]),
			druhyDospelyPoExekuci.push(prijmyAVydajeRodinyPoZapocteniDavek[5]),
			tretiDospelyPoExekuci.push(prijmyAVydajeRodinyPoZapocteniDavek[8]),
			pridavkyNaDeti.push(prijmyAVydajeRodinyPoZapocteniDavek[14]),
			prispevekNaBydleni.push(prijmyAVydajeRodinyPoZapocteniDavek[15]),
			prispevekNaZivobyti.push(prijmyAVydajeRodinyPoZapocteniDavek[16]),
			doplatekNaBydleni.push(prijmyAVydajeRodinyPoZapocteniDavek[17]),
			duchody.push(prijmyAVydajeRodinyPoZapocteniDavek[18]),
			rodicovska.push(prijmyAVydajeRodinyPoZapocteniDavek[19]),
			podporaVNezamestnanosti.push(prijmyAVydajeRodinyPoZapocteniDavek[20]),
			nemocenska.push(prijmyAVydajeRodinyPoZapocteniDavek[21]),
			ostatniPrijmy.push(prijmyAVydajeRodinyPoZapocteniDavek[22]),
			najem.push(-prijmyAVydajeRodinyPoZapocteniDavek[23]),
			poplatky.push(-prijmyAVydajeRodinyPoZapocteniDavek[24])
			exekuce.push(prijmyAVydajeRodinyPoZapocteniDavek[28]);
		}
	}

	// výpočet hodnot nezávislé proměnné a příjmu rodiny
	for (i = intervalMin; i <= intervalMax; i = i + 1000) {

		// nahrazení globální proměnné pro výpočet
		if (simulace == 1) {
			prvniDospelyPrvniZamestnavatel[0] = i;
		} else if (simulace == 2) {
			prvniDospelyPrvniZamestnavatel[2] = i;
		} else if (simulace == 3) {
			prvniDospelyPrvniZamestnavatel[4] = i;
		} else if (simulace == 4) {
			bydleni[0] = i;
		}

		nezavisla.push(i)

		var prijmyAVydajeRodinyPoZapocteniDavek = spocitejPrijmyAVydajeRodinyPoZapocteniDavek();
		prijemRodiny.push(prijmyAVydajeRodinyPoZapocteniDavek[13])

		prvniDospelyPoExekuci.push(prijmyAVydajeRodinyPoZapocteniDavek[2]),
		druhyDospelyPoExekuci.push(prijmyAVydajeRodinyPoZapocteniDavek[5]),
		tretiDospelyPoExekuci.push(prijmyAVydajeRodinyPoZapocteniDavek[8]),
		pridavkyNaDeti.push(prijmyAVydajeRodinyPoZapocteniDavek[14]),
		prispevekNaBydleni.push(prijmyAVydajeRodinyPoZapocteniDavek[15]),
		prispevekNaZivobyti.push(prijmyAVydajeRodinyPoZapocteniDavek[16]),
		doplatekNaBydleni.push(prijmyAVydajeRodinyPoZapocteniDavek[17]),
		duchody.push(prijmyAVydajeRodinyPoZapocteniDavek[18]),
		rodicovska.push(prijmyAVydajeRodinyPoZapocteniDavek[19]),
		podporaVNezamestnanosti.push(prijmyAVydajeRodinyPoZapocteniDavek[20]),
		nemocenska.push(prijmyAVydajeRodinyPoZapocteniDavek[21]),
		ostatniPrijmy.push(prijmyAVydajeRodinyPoZapocteniDavek[22]),
		najem.push(-prijmyAVydajeRodinyPoZapocteniDavek[23]),
		poplatky.push(-prijmyAVydajeRodinyPoZapocteniDavek[24])
		exekuce.push(prijmyAVydajeRodinyPoZapocteniDavek[28]);
	}

	// vrácení původních hodnot do globální proměnné
	if (simulace == 1) {
		prvniDospelyPrvniZamestnavatel[0] = backup;
	} else if (simulace == 2) {
		prvniDospelyPrvniZamestnavatel[2] = backup;
	} else if (simulace == 3) {
		prvniDospelyPrvniZamestnavatel[4] = backup;
	} else if (simulace == 4) {
		bydleni[0] = backup;
	}

	nakresliGraf(nezavisla, nazevNezavislePromenne, prijemRodiny, prvniDospelyPoExekuci, druhyDospelyPoExekuci, tretiDospelyPoExekuci, pridavkyNaDeti, prispevekNaBydleni, prispevekNaZivobyti,
		doplatekNaBydleni, duchody, rodicovska, podporaVNezamestnanosti, nemocenska, ostatniPrijmy, najem, poplatky, exekuce)

	return false;
}



/*

*/

function nakresliGraf(x = [], nazev = '', prijemRodiny = [], prvniDospelyPoExekuci = [], druhyDospelyPoExekuci = [], tretiDospelyPoExekuci = [], pridavkyNaDeti = [], prispevekNaBydleni = [], prispevekNaZivobyti,
		doplatekNaBydleni = [], duchody = [], rodicovska = [], podporaVNezamestnanosti = [], nemocenska = [], ostatniPrijmy = [], najem = [], poplatky = [], exekuce = []) {
console.log(prvniDospelyPoExekuci)
console.log(druhyDospelyPoExekuci)
	Highcharts.chart('simulace', {
		chart: {
			type: 'column'
		},
		title: {
			text: 'Příjmy domácnosti × ' + nazev
		},
		subtitle: {
			text: 'Dospělí: <b>' + slozeniDomacnosti[0] + '</b>, děti pod 6: <b>' + slozeniDomacnosti[1] + '</b>, děti 6 až 15: <b>' + slozeniDomacnosti[2] + '</b>, děti 15 až 26: <b>' + slozeniDomacnosti[3] + '</b>'
		},
		xAxis: {
			categories: x,
			title: {
				text: nazev
			},
		},
		yAxis: {
			title: {
				text: 'celkové příjmy rodiny'
			},
			labels: {
				format: '{value}'
			},
			plotLines: [{
				value: 0,
				color: 'gray',
				dashStyle: 'shortdash',
				width: 2
			}],
			reversedStacks: false
		},
		tooltip: {
			formatter: function () {
				var s = '<b>' + nazev + ': ' + this.x + ' Kč</b>',
					celkem = 0;

				$.each(this.points, function () {
					if (this.series.name != 'příjmy rodiny') {
						s += '<br/><span style="color:' + this.color +'">' + this.series.name + '</span>: ' +
							this.y + ' Kč';
						celkem += this.y;
					}
				});

				s += '<br/><b>celkový příjem rodiny: ' + celkem + ' Kč</b>';

				return s;
			},
			shared: true
		},
		exporting: {
			enabled: false
		},
		credits: {
			href: '',
			text: ''
		},
		legend: {
			enabled: true
		},
		plotOptions: {
			series: {
				stacking: 'stacked'
			}
		},
		series: [{
			name: 'čistý příjem 1. dospělého',
			data: prvniDospelyPoExekuci
		}, {
			name: 'čistý příjem 2. dospělého',
			data: druhyDospelyPoExekuci
		}, {
			name: 'čistý příjem 3. dospělého',
			data: tretiDospelyPoExekuci
		}, {
			name: 'přídavky na děti',
			data: pridavkyNaDeti
		}, {
			name: 'příspěvek na bydlení',
			data: prispevekNaBydleni
		}, {
			name: 'příspěvek na živobytí',
			data: prispevekNaZivobyti
		}, {
			name: 'doplatek na bydlení',
			data: doplatekNaBydleni
		}, {
			name: 'důchody',
			data: duchody
		}, {
			name: 'rodičovská',
			data: rodicovska
		}, {
			name: 'podpora v nezaměstnanosti',
			data: podporaVNezamestnanosti
		}, {
			name: 'nemocenská',
			data: nemocenska
		}, {
			name: 'ostatní příjmy',
			data: ostatniPrijmy
		}, {
			name: 'nájem',
			data: najem
		}, {
			name: 'poplatky',
			data: poplatky
		}, {
			type: 'spline',
			name: 'exekuce',
			data: exekuce,
			color: 'red',
			marker: {
				lineWidth: 2,
				lineColor: 'red',
				fillColor: 'white',
				symbol: 'circle'
			}
		}, {
			type: 'spline',
			name: 'příjmy domácnosti',
			data: prijemRodiny,
			color: 'black',
			marker: {
				lineWidth: 2,
				lineColor: 'black',
				fillColor: 'white',
				symbol: 'circle'
			}
		}]
	});

	return false;
}



/*

*/

function nastavRodinu1() {

	document.getElementById("prvniDospelyPrvniZamestnavatelVyzivovaneDeti").value = "1";
	document.getElementById("prvniDospelyPrvniZamestnavatelHPPPrijem").value = "0";
	document.getElementById("druhyDospelyPrvniZamestnavatelHPPPrijem").value = "0";
	document.getElementById("pocetDospelych").value = "1";
	document.getElementById("pocetDetiPod6").value = "0";
	document.getElementById("pocetDeti6Az15").value = "1";
	document.getElementById("pocetDeti15Az26").value = "0";
	document.getElementById("pocetClenuDomacnosti").value = "2";
	document.getElementById("najem").value = "6000";
	document.getElementById("ubytovna").value = true;
	document.getElementById("velikostObce").value = "1";

}



/*

*/

function nastavRodinu2() {

	document.getElementById("prvniDospelyPrvniZamestnavatelVyzivovaneDeti").value = "0";
	document.getElementById("prvniDospelyPrvniZamestnavatelHPPPrijem").value = "0";
	document.getElementById("druhyDospelyPrvniZamestnavatelHPPPrijem").value = "0";
	document.getElementById("pocetDospelych").value = "2";
	document.getElementById("pocetDetiPod6").value = "0";
	document.getElementById("pocetDeti6Az15").value = "2";
	document.getElementById("pocetDeti15Az26").value = "1";
	document.getElementById("pocetClenuDomacnosti").value = "5";
	document.getElementById("najem").value = "15000";
	document.getElementById("ubytovna").value = false;
	document.getElementById("velikostObce").value = "1";

}



/*

*/

function nastavRodinu3() {

	document.getElementById("prvniDospelyPrvniZamestnavatelVyzivovaneDeti").value = "2";
	document.getElementById("prvniDospelyPrvniZamestnavatelHPPPrijem").value = "25000";
	document.getElementById("druhyDospelyPrvniZamestnavatelHPPPrijem").value = "25000";
	document.getElementById("pocetDospelych").value = "2";
	document.getElementById("pocetDetiPod6").value = "2";
	document.getElementById("pocetDeti6Az15").value = "0";
	document.getElementById("pocetDeti15Az26").value = "0";
	document.getElementById("pocetClenuDomacnosti").value = "4";
	document.getElementById("najem").value = "20000";
	document.getElementById("ubytovna").value = false;
	document.getElementById("velikostObce").value = "1";

}