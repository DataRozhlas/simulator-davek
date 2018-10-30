
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
		if ( (12 * hrubyPrijem) > (6 * minimalniMzda) & (pocetVyzivovanychDeti > 0) ) {
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

function spocitejPrijemDospeleho(prijemPrace1 = [0, 0, 0, 0, 0], prijemPrace2 = [0, 0, 0, 0, 0]) {

	cistyPrijem = prijemPrace1[0] + prijemPrace2[0];
	cistyPrijemBezBonusuNaDeti = prijemPrace1[1] + prijemPrace2[1];
	socialniPojisteni = prijemPrace1[2] + prijemPrace2[2];
	zdravotniPojisteni = prijemPrace1[3] + prijemPrace2[3];
	zalohaNaDan = prijemPrace1[4] + prijemPrace2[4];

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

function spocitejPrijemDospelehoPoExekuci(prijemDospeleho = [0, 0, 0, 0, 0], duchody = 0, rodicovska = 0, podporaVNezamestnanosti = 0, nemocenska = 0, ostatniPrijmy = 0,
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
	danovyBonusNaDetiPredExekuci = prijemDospeleho[0] - prijemDospeleho[1];

	// pro exekuci se počítá s příjmem bez bonusu
	prijemDospelehoBezDanovehoBonusuPredExekuci = prijemDospeleho[1];

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



/*

spočítej příjem domácnosti po exekuci

*/
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

	var rodinkaPrijemPrvniDospelyPrvniPrace = spocitejPrijemUZamestnavatele(
			prijemNaHPP = spocitejSlozkyNaHPP(prvniDospelyPrvniZamestnavatel[0], prvniDospelyPrvniZamestnavatel[1]),
			prijemNaDPC = spocitejSlozkyNaDPC(prvniDospelyPrvniZamestnavatel[2], prvniDospelyPrvniZamestnavatel[3]),
			prijemNaDPP = spocitejSlozkyNaDPP(prvniDospelyPrvniZamestnavatel[4], prvniDospelyPrvniZamestnavatel[5]),
			ruzovyPapir = prvniDospelyPrvniZamestnavatel[6],
			pocetVyzivovanychDeti = prvniDospelyPrvniZamestnavatel[7]);

	var rodinkaPrijemPrvniDospelyDruhaPrace = spocitejPrijemUZamestnavatele(
			prijemNaHPP = spocitejSlozkyNaHPP(prvniDospelyDruhyZamestnavatel[0], prvniDospelyDruhyZamestnavatel[1]),
			prijemNaDPC = spocitejSlozkyNaDPC(prvniDospelyDruhyZamestnavatel[2], prvniDospelyDruhyZamestnavatel[3]),
			prijemNaDPP = spocitejSlozkyNaDPP(prvniDospelyDruhyZamestnavatel[4], prvniDospelyDruhyZamestnavatel[5]),
			ruzovyPapir = prvniDospelyDruhyZamestnavatel[6],
			pocetVyzivovanychDeti = prvniDospelyDruhyZamestnavatel[7]);

	var rodinkaPrijemDruhyDospelyPrvniPrace = spocitejPrijemUZamestnavatele(
			prijemNaHPP = spocitejSlozkyNaHPP(druhyDospelyPrvniZamestnavatel[0], druhyDospelyPrvniZamestnavatel[1]),
			prijemNaDPC = spocitejSlozkyNaDPC(druhyDospelyPrvniZamestnavatel[2], druhyDospelyPrvniZamestnavatel[3]),
			prijemNaDPP = spocitejSlozkyNaDPP(druhyDospelyPrvniZamestnavatel[4], druhyDospelyPrvniZamestnavatel[5]),
			ruzovyPapir = druhyDospelyPrvniZamestnavatel[6],
			pocetVyzivovanychDeti = druhyDospelyPrvniZamestnavatel[7]);

	var rodinkaPrijemDruhyDospelyDruhaPrace = spocitejPrijemUZamestnavatele(
			prijemNaHPP = spocitejSlozkyNaHPP(druhyDospelyDruhyZamestnavatel[0], druhyDospelyDruhyZamestnavatel[1]),
			prijemNaDPC = spocitejSlozkyNaDPC(druhyDospelyDruhyZamestnavatel[2], druhyDospelyDruhyZamestnavatel[3]),
			prijemNaDPP = spocitejSlozkyNaDPP(druhyDospelyDruhyZamestnavatel[4], druhyDospelyDruhyZamestnavatel[5]),
			ruzovyPapir = druhyDospelyDruhyZamestnavatel[6],
			pocetVyzivovanychDeti = druhyDospelyDruhyZamestnavatel[7]);

	var rodinkaPrijemTretiDospelyPrvniPrace = spocitejPrijemUZamestnavatele(
			prijemNaHPP = spocitejSlozkyNaHPP(tretiDospelyPrvniZamestnavatel[0], tretiDospelyPrvniZamestnavatel[1]),
			prijemNaDPC = spocitejSlozkyNaDPC(tretiDospelyPrvniZamestnavatel[2], tretiDospelyPrvniZamestnavatel[3]),
			prijemNaDPP = spocitejSlozkyNaDPP(tretiDospelyPrvniZamestnavatel[4], tretiDospelyPrvniZamestnavatel[5]),
			ruzovyPapir = tretiDospelyPrvniZamestnavatel[6],
			pocetVyzivovanychDeti = tretiDospelyPrvniZamestnavatel[7]);

	var rodinkaPrijemTretiDospelyDruhaPrace = spocitejPrijemUZamestnavatele(
			prijemNaHPP = spocitejSlozkyNaHPP(tretiDospelyDruhyZamestnavatel[0], tretiDospelyDruhyZamestnavatel[1]),
			prijemNaDPC = spocitejSlozkyNaDPC(tretiDospelyDruhyZamestnavatel[2], tretiDospelyDruhyZamestnavatel[3]),
			prijemNaDPP = spocitejSlozkyNaDPP(tretiDospelyDruhyZamestnavatel[4], tretiDospelyDruhyZamestnavatel[5]),
			ruzovyPapir = tretiDospelyDruhyZamestnavatel[6],
			pocetVyzivovanychDeti = tretiDospelyDruhyZamestnavatel[7]);

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

	// 18: kontrola, disponibilní příjem včetně dávek a výdajů na nájem
	prijmyAVydajeRodinyPoZapocteniDavek[18] = Math.round(rodinkaPrijemPoExekuci[1] + rodinkaPrijemPoExekuci[3] + rodinkaPridavkyNaDeti + rodinkaPrispevekNaBydleni + rodinkaPrispevekNaZivobyti +
		rodinkaDoplatekNaBydleni - bydleni[0] - bydleni[1]);

	// proměnné pro statický výpočet dávek

	// 19: čistý příjem 1. dospělého z 1. zaměstnání
	prijmyAVydajeRodinyPoZapocteniDavek[19] = rodinkaPrijemPrvniDospelyPrvniPrace[1];

	// 20: čistý příjem 1. dospělého z 2. zaměstnání
	prijmyAVydajeRodinyPoZapocteniDavek[20] = rodinkaPrijemPrvniDospelyDruhaPrace[1];

	// 21:

	// 22: daňový bonus 1. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[22] = rodinkaPrijemPrvnihoDospeleho[0] - rodinkaPrijemPrvnihoDospeleho[1];

	// 23: rodičovská 1. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[23] = prvniDospelyDalsiPrijmy[1];

	// 24: pojistné dávky: důchody, podpora v nezaměstnanosti, nemocenská 1. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[24] = prvniDospelyDalsiPrijmy[0] + prvniDospelyDalsiPrijmy[2] + prvniDospelyDalsiPrijmy[3];

	// 25: jiné příjmy 1. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[25] = prvniDospelyDalsiPrijmy[4];

	// 26: exekuce 1. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[26] = rodinkaPrijemPrvnihoDospelehoPoExekuci[9];

	// 27: čistý příjem po exekuci 1. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[27] = prijmyAVydajeRodinyPoZapocteniDavek[0] + prijmyAVydajeRodinyPoZapocteniDavek[1];

	// 28: čistý příjem 2. dospělého z 1. zaměstnání
	prijmyAVydajeRodinyPoZapocteniDavek[28] = rodinkaPrijemDruhyDospelyPrvniPrace[1];

	// 29: čistý příjem 2. dospělého z 2. zaměstnání
	prijmyAVydajeRodinyPoZapocteniDavek[29] = rodinkaPrijemDruhyDospelyDruhaPrace[1];

	// 30:

	// 31: daňový bonus 2. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[31] = rodinkaPrijemDruhehoDospeleho[0] - rodinkaPrijemDruhehoDospeleho[1];

	// 32: rodičovská 2. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[32] = druhyDospelyDalsiPrijmy[1];

	// 33: pojistné dávky: důchody, podpora v nezaměstnanosti, nemocenská 2. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[33] = druhyDospelyDalsiPrijmy[0] + druhyDospelyDalsiPrijmy[2] + druhyDospelyDalsiPrijmy[3];

	// 34: jiné příjmy 2. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[34] = druhyDospelyDalsiPrijmy[4];

	// 35: exekuce 2. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[35] = rodinkaPrijemDruhehoDospelehoPoExekuci[9];

	// 36: čistý příjem po exekuci 2. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[36] = prijmyAVydajeRodinyPoZapocteniDavek[2] + prijmyAVydajeRodinyPoZapocteniDavek[3];

	// 37: čistý příjem 2. dospělého z 1. zaměstnání
	prijmyAVydajeRodinyPoZapocteniDavek[37] = rodinkaPrijemTretiDospelyPrvniPrace[1];

	// 38: čistý příjem 2. dospělého z 2. zaměstnání
	prijmyAVydajeRodinyPoZapocteniDavek[38] = rodinkaPrijemTretiDospelyDruhaPrace[1];

	// 39:

	// 40: daňový bonus 3. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[40] = rodinkaPrijemTretihoDospeleho[0] - rodinkaPrijemTretihoDospeleho[1];

	// 41: rodičovská 3. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[41] = tretiDospelyDalsiPrijmy[1];

	// 42: pojistné dávky: důchody, podpora v nezaměstnanosti, nemocenská 3. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[42] = tretiDospelyDalsiPrijmy[0] + tretiDospelyDalsiPrijmy[2] + tretiDospelyDalsiPrijmy[3];

	// 43: jiné příjmy 3. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[43] = tretiDospelyDalsiPrijmy[4];

	// 44: exekuce 3. dospělého
	prijmyAVydajeRodinyPoZapocteniDavek[44] = rodinkaPrijemTretihoDospelehoPoExekuci[9];

	// 45: čistý příjem po exekuci 3. dospělého
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

	// 53: celkem výdaje
	prijmyAVydajeRodinyPoZapocteniDavek[53] = prijmyAVydajeRodinyPoZapocteniDavek[51] + prijmyAVydajeRodinyPoZapocteniDavek[52];

	// 54: celkem disponibilní příjem domácnosti
	prijmyAVydajeRodinyPoZapocteniDavek[54] = prijmyAVydajeRodinyPoZapocteniDavek[18];

	return(prijmyAVydajeRodinyPoZapocteniDavek);

}