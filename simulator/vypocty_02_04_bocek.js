// dynamický model
// spocitejExekuce (https://docs.google.com/document/d/1r5N8h91YaMELoLgjPSp0-PzkC--nZpwEP6wHTqQ7VFI/edit#)



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

// počet dospělých, počet dětí pod 6 let, počet dětí 6 až 15 let, počet dětí 15 až 26 let, počet členů domácnosti
	slozeniDomacnosti = [0, 0, 0, 0, 0],

// kolik členů domácnosti má snížené minimum na existenční, má rodina nárok na vyšší dávky na děti (pobírá rodičovskou, mateřskou, nebo podporu v nezaměstnanosti)?
	socialOptional = [0, false],

// výše důchodů, výše rodičovské, výše ostatních příjmů
	dalsiPrijmy = [0, 0, 0],

// nájem, poplatky, bydlí ve vlastním nebo družstevním bytě?, bydlí na ubytovně, chatě nebo v podnájmu?,
// velikost obce (1 = Praha, 2 = nad 100 000, 3 = nad 50 000, 4 = nad 10 000, 5 = pod 10 000), místně obvyklé náklady stanovené úřadem práce
	bydleni = [0, 0, false, false, 1, 0]



// výpočet složek příjmu na HPP
// aktualizace: 15.3.2018
// zdroj: https://www.vzp.cz/platci/informace/povinnosti-platcu-metodika/zamestnavatele/doplatek-do-minimalniho-vymerovaciho-zakladu
// vstupy:
//		hrubý příjem na HPP (hrubyPrijem, integer)
//		má výjimku z minimálního vyměřovacího základu na zdravotní pojištění (těžce postižený, pečuje o dítě, důchodce)? (vyjimkaMinimalniZaklad, boolean)
// výstupy:
//		hrubý příjem (integer)
//		čistý příjem (integer)
//		sociální pojištění (integer)
//		zdravotní pojištění (integer)
//		záloha na daň (integer)

function spocitejSlozkyNaHPP(hrubyPrijem = 0, vyjimkaMinimalniZaklad = false) {

	var cistyPrijem = 0,
		socialniPojisteni = 0,
		zdravotniPojisteni = 0,
		zalohaNaDan = 0,
		minimalniMzda = 12200;

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



// výpočet složek příjmu na DPČ
// aktualizace: 15.3.2018
// zdroj: http://vysvetlovnik.cz/dpc
// vstupy:
//		hrubý příjem na DPČ (hrubyPrijem, integer)
//		platí zdravotní pojištění jinde? (platiZdravotniJinde, boolean)
// výstupy:
//		hrubý příjem (integer)
//		čistý příjem (integer)
//		sociální pojištění (integer)
//		zdravotní pojištění (integer)
//		záloha na daň (integer)

function spocitejSlozkyNaDPC(hrubyPrijem = 0, platiZdravotniJinde = false) {

	var cistyPrijem = 0,
		socialniPojisteni = 0,
		zdravotniPojisteni = 0,
		zalohaNaDan = 0,
		maximalniCastkaBezPojistneho = 2500,
		minimalniMzda = 12200;

	// pod limitem je sociální i zdravotní nula, proto stačí počítat s hrubým příjmem
	if (hrubyPrijem < maximalniCastkaBezPojistneho) {
		zalohaNaDan = 0.15 * hrubyPrijem;

	// nad limitem se platí sociální i zdravotní, takže superhrubý
	} else {
		socialniPojisteni = 0.065 * hrubyPrijem;

		if (platiZdravotniJinde) {
			zdravotniPojisteni = 0.045 * hrubyPrijem;

		// pokud neplatí zdravotní jinde, z minimální mzdy
		} else {
			zdravotniPojisteni = 0.045 * minimalniMzda;
		}
		zalohaNaDan = 0.15 * Math.ceil(1.34 * hrubyPrijem / 100) * 100;
	}

	cistyPrijem = hrubyPrijem - socialniPojisteni - zdravotniPojisteni - zalohaNaDan;

	return([hrubyPrijem, cistyPrijem, socialniPojisteni, zdravotniPojisteni, zalohaNaDan]);
}



// výpočet složek příjmu na DPP
// aktualizace: 15.3.2018
// zdroj: http://vysvetlovnik.cz/dpp
// vstupy:
//		hrubý příjem na DPP (hrubyPrijem, integer)
//		platí zdravotní pojištění jinde? (platiZdravotniJinde, boolean)
// výstupy:
//		hrubý příjem (integer)
//		čistý příjem (integer)
//		sociální pojištění (integer)
//		zdravotní pojištění (integer)
//		záloha na daň (integer)


function spocitejSlozkyNaDPP(hrubyPrijem = 0, platiZdravotniJinde = false) {

	var socialniPojisteni = 0,
		zdravotniPojisteni = 0,
		zalohaNaDan = 0,
		cistyPrijem = 0,
		maximalniCastkaBezPojistneho = 10000,
		minimalniMzda = 12200;

	// pod limitem je sociální i zdravotní nula, proto stačí počítat s hrubým příjmem
	if (hrubyPrijem <= maximalniCastkaBezPojistneho) {
		zalohaNaDan = 0.15 * hrubyPrijem;

	// nad limitem, ale pod minimální mzdou
	} else if (hrubyPrijem <= minimalniMzda) {
		socialniPojisteni = 0.065 * hrubyPrijem;

		// pokud platí zdravotní jinde, standardně hrubý příjem
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



// výpočet čistého příjmu po uplatnění daňových slev
// aktualizace: 15.3.2018
// zdroj: -
// vstupy:
//		složky příjmu na HPP (prijemNaHPP, [hrubý příjem, čistý příjem, sociální pojištění, zdravotní pojištění, záloha na daň])
//		složky příjmu na DPC (prijemNaDPC, [hrubý příjem, čistý příjem, sociální pojištění, zdravotní pojištění, záloha na daň])
//		složky příjmu na DPP (prijemNaDPP, [hrubý příjem, čistý příjem, sociální pojištění, zdravotní pojištění, záloha na daň])
//		podepsal prohlášení o dani? (ruzovyPapir, boolean)
//		na kolik vyživovaných dětí upolatňuje daňový bonus (pocetVyzivovanychDeti, integer)
// výstupy:
//		čistý příjem (integer)
//		čistý příjem bez bonusu na děti (integer)
//		sociální pojištění (integer)
//		zdravotní pojištění (integer)
//		záloha na daň (integer)
// poznámky:
//		daňový bonus na děti je podmíněný šestinásobkem minimální mzdy, ten počítám z aktuální minimální mzdy, ne minulého roku (o té nic nevím)

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



// výpočet celkových příjmů jednoho dospělého
// aktualizace: 15.3.2018
// zdroj: -
// vstupy:
//		čistý příjem z první práce (prijemPrace1, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
//		čistý příjem z druhé práce (prijemPrace2, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
//		čistý příjem z třetí práce (prijemPrace3, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
// výstupy:
//		čistý příjem (integer)
//		čistý příjem bez bonusu na děti (integer)
//		sociální pojištění (integer)
//		zdravotní pojištění (integer)
//		záloha na daň (integer)

function spocitejPrijemDospeleho(prijemPrace1 = [0, 0, 0, 0, 0], prijemPrace2 = [0, 0, 0, 0, 0], prijemPrace3 = [0, 0, 0, 0, 0]) {

	cistyPrijem = prijemPrace1[0] + prijemPrace2[0] + prijemPrace3[0];
	cistyPrijemBezBonusuNaDeti = prijemPrace1[1] + prijemPrace2[1] + prijemPrace3[1];
	socialniPojisteni = prijemPrace1[2] + prijemPrace2[2] + prijemPrace3[2];
	zdravotniPojisteni = prijemPrace1[3] + prijemPrace2[3] + prijemPrace3[3];
	zalohaNaDan = prijemPrace1[4] + prijemPrace2[4] + prijemPrace3[4];

	return([cistyPrijem, cistyPrijemBezBonusuNaDeti, socialniPojisteni, zdravotniPojisteni, zalohaNaDan]);
}



// výpočet čistých příjmů domácnosti
// aktualizace: 15.3.2018
// zdroj: -
// vstupy:
//		příjem prvního dospělého (prijemPrvnihoDospeleho, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
//		příjem druhého dospělého (prijemDruhehoDospeleho, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
//		příjem třetího dospělého (prijemTretihoDospeleho, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
// výstupy:
//		čistý příjem domácnosti (integer)
//		čistý příjem domácnosti bez bonusu na děti (integer)

function spocitejCistyPrijemDomacnosti(prijemPrvnihoDospeleho = [0, 0, 0, 0, 0], prijemDruhehoDospeleho = [0, 0, 0, 0, 0], prijemTretihoDospeleho = [0, 0, 0, 0, 0]) {

	var cistyPrijemDomacnosti = 0,
		cistyPrijemDomacnostiBezBonusuNaDeti = 0;

	cistyPrijemDomacnosti = prijemPrvnihoDospeleho[0] + prijemDruhehoDospeleho[0] + prijemTretihoDospeleho[0];

	cistyPrijemDomacnostiBezBonusuNaDeti = prijemPrvnihoDospeleho[1] + prijemDruhehoDospeleho[1] + prijemTretihoDospeleho[1];

	return([cistyPrijemDomacnosti, cistyPrijemDomacnostiBezBonusuNaDeti]);
}



// výpočet životního minima
// aktualizace: 15.3.2018
// zdroj: -
// vstupy:
//		počet dospělých (pocetDospelych, integer)
//		počet nezaopatřených dětí pod 6 let (pocetDetiPod6, integer)
//		počet nezaopatřených dětí mezi 6 a 15 lety (pocetDeti6az15, integer)
//		počet nezaopatřených dětí mezi 15 a 26 lety (pocetDeti15az26, integer)
//		počet lidí se sníženým životním minimem na existenční (snizeneMinimum, integer)
// výstupy:
//		životní minimum domácnosti pro dávky státní sociální podpory (integer)
//		životní minimum domácnosti pro dávky v hmotné nouzi (integer)

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

	// životní mimum pro SSP se nesnižuje
	if ((pocetDospelych == 1) && (pocetDetiPod6 == 0) && (pocetDeti6az15 == 0) && (pocetDeti15az26 == 0)) {
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

	// životní mimum pro HN se snižuje
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



// výpočet příspěvků na děti
// aktualizace: 15.3.2018
// zdroj: http://materska.org/pridavky-na-dite-zmena-podminek-a-zvyseni-pridavku-od-rijna-2017/
// vstupy:
//		čistý příjem domácnosti (cistyPrijemDomacnosti, [cistyPrijemDomacnosti, cistyPrijemDomacnostiBezBonusuNaDeti])
//		příjem prvního dospělého (prijemPrvnihoDospeleho, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
//		příjem druhého dospělého (prijemDruhehoDospeleho, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
//		příjem třetího dospělého (prijemTretihoDospeleho, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
//		životní minimum (zivotniMinimum, [životní minimum pro SSP, životní minimum pro HN])
//		počet nezaopatřených dětí pod 6 let (pocetDetiPod6, integer)
//		počet nezaopatřených dětí mezi 6 a 15 lety (pocetDeti6az15, integer)
//		počet nezaopatřených dětí mezi 15 a 26 lety (pocetDeti15az26, integer)
//		pobírá rodičovskou, mateřskou, nebo podporu v nezaměstnanosti? (narokNaVyssiDavky, boolean)
// výstupy:
//		přídavky na děti (integer)
// poznámky:
//		pracujeme s čistým příjmem ze zaměstnání, má být průměrný příjem za uplynulý kalendářní rok

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

	// Zvýšení dávky (pro každé dítě) o 300 Kč/měsíc, pokud měla alespoň jedna osoba v domácnosti příjem alespoň ve výší ŽM jednotlivce (3410) nebo má rodičovskou/mateřskou/podporu v nezaměstnanosti/příspěvek na péči
	if ( (narokNaVyssiDavky) || (prijemPrvnihoDospeleho[0] > osamelyDospely) || (prijemDruhehoDospeleho[0] > osamelyDospely) ) {
		pridavkyNaDeti += (pocetDetiPod6 + pocetDeti6az15 + pocetDeti15az26) * 300;
	}

	return(pridavkyNaDeti)
}



// výpočet nákladů za bydlení
// aktualizace: 15.3.2018
// zdroj: http://portal.mpsv.cz/soc/ssp/obcane/prisp_na_bydleni
// vstupy:
//		nájem, u vlastního bydlení nehraje roli (najem, integer)
//		výdaje za energie a ostatní poplatky spojené s bydlením (poplatky, integer)
//		počet členů domácnosti (pocetClenuDomacnosti, integer)
//		bydlí ve vlastním nebo družstevním bytě? (vlastniBydlení, boolean)
//		bydlí na ubytovně, na chatě nebo v podnájmu? (ubytovna, boolean)
//		velikost obce, kde rodina žije (velikostObce, 1 = Praha, 2 = nad 100 000, 3 = nad 50 000, 4 = nad 10 000, 5 = pod 10 000)
//		místně obvyklé náklady, určené místním pracákem (mistneObvykleNaklady, 0 = nestanovené)
// výstupy:
//		uznatelné náklady na bydlení pro dávky SSP (integer)
//		uznatelné náklady na bydlení pro dávky HN (integer)
//		normativ nákladů na bydlení (integer)

function spocitejNakladyNaBydleni(najem = 0, poplatky = 0, pocetClenuDomacnosti = 0, vlastniBydleni = false, ubytovna = false, velikostObce = 1, mistneObvykleNaklady = 0) {

	var skutecneNakladyNaBydleni = 0,
		normativniNakladyNaBydleni = 0,
		uznatelneNakladyNaBydleniProSSP = 0,
		uznatelneNakladyNaBydleniProHN = 0;

	// u vlastního bytu se místo nájmu počítá normativní nájem
	if (vlastniBydleni) {
		switch(pocetClenuDomacnosti) {
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
		switch(pocetClenuDomacnosti) {
			case 1: normativniNakladyNaBydleni = 4420; break;
			case 2: normativniNakladyNaBydleni = 6489; break;
			case 3: normativniNakladyNaBydleni = 8939; break;
			default: normativniNakladyNaBydleni = 11298;
		}

	// normativní náklady, pokud bydlí v nájmu
	} else {
		if (velikostObce == 1) {
				switch (pocetClenuDomacnosti) {
					case 1: normativniNakladyNaBydleni = 7870; break;
					case 2: normativniNakladyNaBydleni = 11186; break;
					case 3: normativniNakladyNaBydleni = 15116; break;
					default: normativniNakladyNaBydleni = 18827;
				}
			} else if (velikostObce == 2) {
				switch (pocetClenuDomacnosti) {
					case 1: normativniNakladyNaBydleni = 6227; break;
					case 2: normativniNakladyNaBydleni = 8938; break;
					case 3: normativniNakladyNaBydleni = 12176; break;
					default: normativniNakladyNaBydleni = 15282;
				}
			} else if (velikostObce == 3) {
				switch (pocetClenuDomacnosti) {
					case 1: normativniNakladyNaBydleni = 5928; break;
					case 2: normativniNakladyNaBydleni = 8530; break;
					case 3: normativniNakladyNaBydleni = 11642; break;
					default: normativniNakladyNaBydleni = 14639;
				}
			} else if (velikostObce == 4) {
				switch (pocetClenuDomacnosti) {
					case 1: normativniNakladyNaBydleni = 5036; break;
					case 2: normativniNakladyNaBydleni = 7308; break;
					case 3: normativniNakladyNaBydleni = 10045; break;
					default: normativniNakladyNaBydleni = 12712;
				}
			} else {
				switch (pocetClenuDomacnosti) {
					case 1: normativniNakladyNaBydleni = 4844; break;
					case 2: normativniNakladyNaBydleni = 7046; break;
					case 3: normativniNakladyNaBydleni = 9702; break;
					default: normativniNakladyNaBydleni = 12299;
				}
			}
		}

	// U SSP se počítá se 100 % normativu
	uznatelneNakladyNaBydleniProSSP = Math.min(skutecneNakladyNaBydleni, normativniNakladyNaBydleni);

	// U HN se počítá se 100 % normativu, s výjimkou ubytoven, podnájmů a chat, kde je to 80 % normativu
	if (ubytovna) {
		uznatelneNakladyNaBydleniProHN = Math.min(skutecneNakladyNaBydleni, 0.8 * normativniNakladyNaBydleni);
	} else {
		uznatelneNakladyNaBydleniProHN = Math.min(skutecneNakladyNaBydleni, normativniNakladyNaBydleni);
	}

	// U HN ještě úřad zastřešuje uznatelné náklady místně obvyklými náklady (+ speciální postup na výpočet energií, ten zatím neřešíme)
	if (mistneObvykleNaklady > 0) {
		uznatelneNakladyNaBydleniProHN = Math.min(uznatelneNakladyNaBydleniProHN, mistneObvykleNaklady);
	}

	return([uznatelneNakladyNaBydleniProSSP, uznatelneNakladyNaBydleniProHN, normativniNakladyNaBydleni]);
}



// výpočet příspěvku na bydlení
// aktualizace: 15.3.2018
// zdroj: http://portal.mpsv.cz/soc/ssp/obcane/prisp_na_bydleni
// vstupy:
//		čistý příjem domácnosti bez bonusu na děti (cistyPrijemBezBonusuNaDeti, integer)
//		náklady spojené s bydlením (nakladyNaBydleni, [uznatelné náklady na bydlení pro SSP, uznatelné náklady na bydlení pro HN, normativní náklady na bydlení])
//		životní minimum domácnosti (zivotniMinimum, [životní minimum pro SSP, životní minimum pro HN])
//		výše důchodů (duchody, integer)
//		rodičovská (rodicovska, integer)
//		přídavky na děti (pridavkyNaDeti, integer)
//		ostatní příjmy (ostatniPrijmy, integer)
//		velikost obce, kde rodina žije (velikostObce, 1 = Praha, 2 = nad 100 000, 3 = nad 50 000, 4 = nad 10 000, 5 = pod 10 000)
//		pobyt na ubytovně (ubytovna, boolean)
// výstupy:
//		příspěvek na bydlení (integer)

function spocitejPrispevekNaBydleni(cistyPrijemDomacnosti = [0, 0], nakladyNaBydleni = [0, 0, 0], zivotniMinimum = [0, 0], duchody = 0, rodicovska = 0, pridavkyNaDeti = 0,
	ostatniPrijmy = 0, velikostObce = 1, ubytovna = false) {

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
	uznatelneNakladyProSSP = nakladyNaBydleni[0];

	// pro příspěvek na bydlení se počítá čistý příjem domácnosti bez bonusu na děti
	cistyPrijemBezBonusuNaDeti = cistyPrijemDomacnosti[1];

	// koeficient nákladů na bydlení: v Praze 0,35, mimo Prahu 0,3
	if (velikostObce == 1) {
		koeficientNakladu = 0.35;
	} else {
		koeficientNakladu = 0.3;
	}

	// rozhodný příjem pro bydlení je součet čistých příjmů bez bonusu na děti, důchodů a dávek ssp; nejméně ale životní minimum
	rozhodnyPrijem = Math.max(zivotniMinimumProSSP, cistyPrijemBezBonusuNaDeti + duchody + rodicovska + pridavkyNaDeti + ostatniPrijmy);

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



// výpočet příspěvku na živobytí
// aktualizace: 15.3.2018
// zdroj: https://www.mesec.cz/zakony/zakon-o-pomoci-v-hmotne-nouzi/uplne/, https://portal.mpsv.cz/soc/hn/obcane/zivobyti
// vstupy:
//		čistý příjem domácnosti bez bonusu na děti (cistyPrijemBezBonusuNaDeti, integer)
//		náklady spojené s bydlením (nakladyNaBydleni, [uznatelné náklady na bydlení pro SSP, uznatelné náklady na bydlení pro HN, normativní náklady na bydlení])
//		životní minimum domácnosti (zivotniMinimum, [životní minimum pro SSP, životní minimum pro HN])
//		výše důchodů (duchody, integer)
//		rodičovská (rodicovska, integer)
//		přídavky na děti (pridavkyNaDeti, integer)
// výstupy:
//		příspěvek na živobytí (integer)
// otázky:
//		může být nedeterministická: "Částka živobytí je stanovena pro každou osobu individuálně, a to na základě hodnocení její snahy a možností", "Vzhledem k tomu, že v praxi dochází k různým situacím, které jsou zcela individuálního charakteru, má orgán pomoci v hmotné nouzi možnost z okruhu společně posuzovaných osob některou osobu vyloučit."
//		existenční minimum je potřeba aplikovat u výpočtu životního minima? Ale jak pak počítám s osamělým, první, atd. dospělým?
//		u nákladu na bydlení pro příspěvek na živobytí jsem předtím počítal se sníženým normativem (koeficient 0,75), ale to nikde nemůžu najít

function spocitejPrispevekNaZivobyti(cistyPrijemDomacnosti = [0, 0], nakladyNaBydleni = [0, 0, 0], zivotniMinimum = [0, 0], duchody = 0, rodicovska = 0, pridavkyNaDeti = 0, ostatniPrijmy = 0) {

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
	uznatelneNakladyProHN = nakladyNaBydleni[1];

	// pro příspěvek na živobytí se počítá čistý příjem domácnosti bez bonusu na děti
	cistyPrijemBezBonusuNaDeti = cistyPrijemDomacnosti[1];

	castkaZivobyti = zivotniMinimumProHN;

	// rozhodný příjem pro příspěvek na živobytí je součet 70 % čistých příjmů bez bonusu na děti, 80 % důchodů a pojistných dávek, 100 % ostatních příjmů, ale ne příspěvek na bydlení
	rozhodnyPrijem = 0.7 * cistyPrijemBezBonusuNaDeti + 0.8 * duchody + rodicovska + pridavkyNaDeti + ostatniPrijmy;

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



// výpočet doplatku na bydlení
// aktualizace: 15.3.2018
// zdroj: https://www.mesec.cz/zakony/zakon-o-pomoci-v-hmotne-nouzi/uplne/, https://portal.mpsv.cz/soc/hn/obcane/zivobyti
// vstupy:
//		čistý příjem domácnosti bez bonusu na děti (cistyPrijemBezBonusuNaDeti, integer)
//		náklady spojené s bydlením; první hodnota pole jsou uznatelné náklady, druhá normativ (nakladyNaBydleni, integer[])
//		životní minimum domácnosti (zivotniMinimum, integer)
//		výše důchodů (duchody, integer)
//		rodičovská (rodicovska, integer)
//		přídavky na děti (pridavkyNaDeti, integer)
// výstupy:
//		příspěvek na živobytí (integer)
// otázky:
//		může být nedeterministická: "Částka živobytí je stanovena pro každou osobu individuálně, a to na základě hodnocení její snahy a možností", "Vzhledem k tomu, že v praxi dochází k různým situacím, které jsou zcela individuálního charakteru, má orgán pomoci v hmotné nouzi možnost z okruhu společně posuzovaných osob některou osobu vyloučit."
//		existenční minimum je potřeba aplikovat u výpočtu životního minima? Ale jak pak počítám s osamělým, první, atd. dospělým?
//		u nákladu na bydlení pro příspěvek na živobytí jsem předtím počítal se sníženým normativem (koeficient 0,75), ale to nikde nemůžu najít

function spocitejDoplatekNaBydleni(cistyPrijemDomacnosti = [0, 0], nakladyNaBydleni = [0, 0, 0], zivotniMinimum = [0, 0], prispevekNaZivobyti = 0, prispevekNaBydleni = 0, duchody = 0,
	rodicovska = 0, pridavkyNaDeti = 0, ostatniPrijmy = 0) {

	var castkaZivobyti = 0,
		doplatekNaBydleni = 0,
		rozhodnyPrijem = 0,
		narokNaDoplatekNaBydleni = false,
		zivotniMinimumProHN = 0,
		uznatelneNakladyProHN = 0;

	// životní minimum pro HN
	zivotniMinimumProHN = zivotniMinimum[1];

	// náklady na bydlení pro SSP
	uznatelneNakladyProHN = nakladyNaBydleni[1];

	// pro doplatek na bydlení se počítá čistý příjem domácnosti bez bonusu na děti
	cistyPrijemBezBonusuNaDeti = cistyPrijemDomacnosti[1];

	castkaZivobyti = zivotniMinimumProHN;

	// rozhodný příjem pro doplatek na bydlení je součet 70 % čistých příjmů bez bonusu na děti, 80 % důchodů a pojistných dávek a 100 % ostatních příjmů
	rozhodnyPrijem = 0.7 * cistyPrijemBezBonusuNaDeti + 0.8 * duchody + rodicovska + pridavkyNaDeti + prispevekNaBydleni + prispevekNaZivobyti + ostatniPrijmy;

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



// výpočet čistých příjmů rodiny po započtení sociálních dávek a nákladů na bydlení
// spustí se po odpálení vstupního formuláře, volá ji taky funkce modelujRodinu, která ve smyčce mění některou ze vstupních hodnot a ukládá výstupy
// aktualizace: 2.4.2018
// zdroj: -
// vstupy:
//		příjem prvního dospělého (prijemPrvnihoDospeleho, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
//		příjem druhého dospělého (prijemDruhehoDospeleho, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
//		příjem třetího dospělého (prijemTretihoDospeleho, [čistý příjem, čistý příjem bez bonusu na děti, sociální pojištění, zdravotní pojištění, záloha na daň])
//		nájem, u vlastního bydlení nehraje roli (najem, integer)
//		výdaje za energie a ostatní poplatky spojené s bydlením (poplatky, integer)
//		výše důchodů (duchody, integer)
//		rodičovská (rodicovska, integer)
//		přídavky na děti (pridavkyNaDeti, integer)
//		ostatní příjmy (ostatniPrijmy, integer)
//		příspěvek na bydlení (prispevekNaBydleni, integer)
//		příspěvek na živobytí (prispevekNaZivobyti, integer)
//		doplatek na bydlení (doplatekNaBydleni, integer)
// výstupy:
//		příjem prvního dospělého (integer),
//		příjem druhého dospělého (integer),
//		příjem třetího dospělého (integer),
//		čisté čisté přijmy rodiny (integer),
//		čisté příjmy rodiny po započtení sociálních dávek a nákladů na bydlení (integer)

function spocitejPrijmyAVydajeRodinyPoZapocteniDavek() {

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

	var rodinkaCistyPrijemDomacnosti = spocitejCistyPrijemDomacnosti(
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

	var rodinkaNakladyNaBydleni = spocitejNakladyNaBydleni(
		najem = bydleni[0],
		poplatky = bydleni[1],
		pocetClenuDomacnosti = slozeniDomacnosti[4],
		vlastniBydleni = bydleni[2],
		ubytovna = bydleni[3],
		velikostObce = bydleni[4],
		mistneObvykleNaklady = bydleni[5]);

	var rodinkaPrispevekNaBydleni = spocitejPrispevekNaBydleni(
		cistyPrijemDomacnosti = rodinkaCistyPrijemDomacnosti,
		nakladyNaBydleni = rodinkaNakladyNaBydleni,
		zivotniMinimum = rodinkaZivotniMinimum,
		duchody = dalsiPrijmy[0],
		rodicovska = dalsiPrijmy[1],
		pridavkyNaDeti = rodinkaPridavkyNaDeti,
		ostatniPrijmy = dalsiPrijmy[2],
		velikostObce = bydleni[4],
		ubytovna = bydleni[3]);

	var rodinkaPrispevekNaZivobyti = spocitejPrispevekNaZivobyti(
		cistyPrijemDomacnosti = rodinkaCistyPrijemDomacnosti,
		nakladyNaBydleni = rodinkaNakladyNaBydleni,
		zivotniMinimum = rodinkaZivotniMinimum,
		duchody = dalsiPrijmy[0],
		rodicovska = dalsiPrijmy[1],
		pridavkyNaDeti = rodinkaPridavkyNaDeti,
		ostatniPrijmy = dalsiPrijmy[2]);

	var rodinkaDoplatekNaBydleni = spocitejDoplatekNaBydleni(
		cistyPrijemDomacnosti = rodinkaCistyPrijemDomacnosti,
		nakladyNaBydleni = rodinkaNakladyNaBydleni,
		zivotniMinimum = rodinkaZivotniMinimum,
		prispevekNaZivobyti = rodinkaPrispevekNaZivobyti,
		prispevekNaBydleni = rodinkaPrispevekNaBydleni,
		duchody = dalsiPrijmy[0],
		rodicovska = dalsiPrijmy[1],
		pridavkyNaDeti = rodinkaPridavkyNaDeti,
		ostatniPrijmy = dalsiPrijmy[2]);

	var prijmyAVydajeRodinyPoZapocteniDavek = [0, 0, 0, 0, 0];

	prijmyAVydajeRodinyPoZapocteniDavek[0] = rodinkaPrijemPrvnihoDospeleho;
	prijmyAVydajeRodinyPoZapocteniDavek[1] = rodinkaPrijemDruhehoDospeleho;
	prijmyAVydajeRodinyPoZapocteniDavek[2] = rodinkaPrijemTretihoDospeleho;
	prijmyAVydajeRodinyPoZapocteniDavek[3] = rodinkaCistyPrijemDomacnosti[0];

	// čistý příjem + důchody + rodičovská + přídavky na děti + ostatní příjmy + příspěvek na bydlení + příspěvek na živobytí +	doplatek na bydlení - nájem - poplatky
	prijmyAVydajeRodinyPoZapocteniDavek[4] = parseFloat(rodinkaCistyPrijemDomacnosti[0]) + parseFloat(dalsiPrijmy[0]) + parseFloat(dalsiPrijmy[1]) +
	parseFloat(rodinkaPridavkyNaDeti) + parseFloat(dalsiPrijmy[2]) + parseFloat(rodinkaPrispevekNaBydleni) + parseFloat(rodinkaPrispevekNaZivobyti) +
	parseFloat(rodinkaDoplatekNaBydleni) - parseFloat(bydleni[0]) - parseFloat(bydleni[1]);

	return(prijmyAVydajeRodinyPoZapocteniDavek);
}



// nějaký kecy;

function prepisFormular() {

	prvniDospelyPrvniZamestnavatel[0] = parseFloat(document.getElementById("prvniDospelyPrvniZamestnavatelHPPPrijem").value);
	prvniDospelyPrvniZamestnavatel[1] = document.getElementById("prvniDospelyPrvniZamestnavatelHPPVyjimka").value;
	prvniDospelyPrvniZamestnavatel[2] = parseFloat(document.getElementById("prvniDospelyPrvniZamestnavatelDPCPrijem").value);
	prvniDospelyPrvniZamestnavatel[3] = document.getElementById("prvniDospelyPrvniZamestnavatelDPCZdravotni").value;
	prvniDospelyPrvniZamestnavatel[4] = parseFloat(document.getElementById("prvniDospelyPrvniZamestnavatelDPPPrijem").value);
	prvniDospelyPrvniZamestnavatel[5] = document.getElementById("prvniDospelyPrvniZamestnavatelDPPZdravotni").value;
	prvniDospelyPrvniZamestnavatel[6] = document.getElementById("prvniDospelyPrvniZamestnavatelRuzovyPapir").value;
	prvniDospelyPrvniZamestnavatel[7] = parseFloat(document.getElementById("prvniDospelyPrvniZamestnavatelVyzivovaneDeti").value);

	prvniDospelyDruhyZamestnavatel[0] = parseFloat(document.getElementById("prvniDospelyDruhyZamestnavatelHPPPrijem").value);
	prvniDospelyDruhyZamestnavatel[1] = document.getElementById("prvniDospelyDruhyZamestnavatelHPPVyjimka").value;
	prvniDospelyDruhyZamestnavatel[2] = parseFloat(document.getElementById("prvniDospelyDruhyZamestnavatelDPCPrijem").value);
	prvniDospelyDruhyZamestnavatel[3] = document.getElementById("prvniDospelyDruhyZamestnavatelDPCZdravotni").value;
	prvniDospelyDruhyZamestnavatel[4] = parseFloat(document.getElementById("prvniDospelyDruhyZamestnavatelDPPPrijem").value);
	prvniDospelyDruhyZamestnavatel[5] = document.getElementById("prvniDospelyDruhyZamestnavatelDPPZdravotni").value;
	prvniDospelyDruhyZamestnavatel[6] = document.getElementById("prvniDospelyDruhyZamestnavatelRuzovyPapir").value;
	prvniDospelyDruhyZamestnavatel[7] = parseFloat(document.getElementById("prvniDospelyDruhyZamestnavatelVyzivovaneDeti").value);

	prvniDospelyTretiZamestnavatel[0] = parseFloat(document.getElementById("prvniDospelyTretiZamestnavatelHPPPrijem").value);
	prvniDospelyTretiZamestnavatel[1] = document.getElementById("prvniDospelyTretiZamestnavatelHPPVyjimka").value;
	prvniDospelyTretiZamestnavatel[2] = parseFloat(document.getElementById("prvniDospelyTretiZamestnavatelDPCPrijem").value);
	prvniDospelyTretiZamestnavatel[3] = document.getElementById("prvniDospelyTretiZamestnavatelDPCZdravotni").value;
	prvniDospelyTretiZamestnavatel[4] = parseFloat(document.getElementById("prvniDospelyTretiZamestnavatelDPPPrijem").value);
	prvniDospelyTretiZamestnavatel[5] = document.getElementById("prvniDospelyTretiZamestnavatelDPPZdravotni").value;
	prvniDospelyTretiZamestnavatel[6] = document.getElementById("prvniDospelyTretiZamestnavatelRuzovyPapir").value;
	prvniDospelyTretiZamestnavatel[7] = parseFloat(document.getElementById("prvniDospelyTretiZamestnavatelVyzivovaneDeti").value);

	druhyDospelyPrvniZamestnavatel[0] = parseFloat(document.getElementById("druhyDospelyPrvniZamestnavatelHPPPrijem").value);
	druhyDospelyPrvniZamestnavatel[1] = document.getElementById("druhyDospelyPrvniZamestnavatelHPPVyjimka").value;
	druhyDospelyPrvniZamestnavatel[2] = parseFloat(document.getElementById("druhyDospelyPrvniZamestnavatelDPCPrijem").value);
	druhyDospelyPrvniZamestnavatel[3] = document.getElementById("druhyDospelyPrvniZamestnavatelDPCZdravotni").value;
	druhyDospelyPrvniZamestnavatel[4] = parseFloat(document.getElementById("druhyDospelyPrvniZamestnavatelDPPPrijem").value);
	druhyDospelyPrvniZamestnavatel[5] = document.getElementById("druhyDospelyPrvniZamestnavatelDPPZdravotni").value;
	druhyDospelyPrvniZamestnavatel[6] = document.getElementById("druhyDospelyPrvniZamestnavatelRuzovyPapir").value;
	druhyDospelyPrvniZamestnavatel[7] = parseFloat(document.getElementById("druhyDospelyPrvniZamestnavatelVyzivovaneDeti").value);

	druhyDospelyDruhyZamestnavatel[0] = parseFloat(document.getElementById("druhyDospelyDruhyZamestnavatelHPPPrijem").value);
	druhyDospelyDruhyZamestnavatel[1] = document.getElementById("druhyDospelyDruhyZamestnavatelHPPVyjimka").value;
	druhyDospelyDruhyZamestnavatel[2] = parseFloat(document.getElementById("druhyDospelyDruhyZamestnavatelDPCPrijem").value);
	druhyDospelyDruhyZamestnavatel[3] = document.getElementById("druhyDospelyDruhyZamestnavatelDPCZdravotni").value;
	druhyDospelyDruhyZamestnavatel[4] = parseFloat(document.getElementById("druhyDospelyDruhyZamestnavatelDPPPrijem").value);
	druhyDospelyDruhyZamestnavatel[5] = document.getElementById("druhyDospelyDruhyZamestnavatelDPPZdravotni").value;
	druhyDospelyDruhyZamestnavatel[6] = document.getElementById("druhyDospelyDruhyZamestnavatelRuzovyPapir").value;
	druhyDospelyDruhyZamestnavatel[7] = parseFloat(document.getElementById("druhyDospelyDruhyZamestnavatelVyzivovaneDeti").value);

	druhyDospelyTretiZamestnavatel[0] = parseFloat(document.getElementById("druhyDospelyTretiZamestnavatelHPPPrijem").value);
	druhyDospelyTretiZamestnavatel[1] = document.getElementById("druhyDospelyTretiZamestnavatelHPPVyjimka").value;
	druhyDospelyTretiZamestnavatel[2] = parseFloat(document.getElementById("druhyDospelyTretiZamestnavatelDPCPrijem").value);
	druhyDospelyTretiZamestnavatel[3] = document.getElementById("druhyDospelyTretiZamestnavatelDPCZdravotni").value;
	druhyDospelyTretiZamestnavatel[4] = parseFloat(document.getElementById("druhyDospelyTretiZamestnavatelDPPPrijem").value);
	druhyDospelyTretiZamestnavatel[5] = document.getElementById("druhyDospelyTretiZamestnavatelDPPZdravotni").value;
	druhyDospelyTretiZamestnavatel[6] = document.getElementById("druhyDospelyTretiZamestnavatelRuzovyPapir").value;
	druhyDospelyTretiZamestnavatel[7] = parseFloat(document.getElementById("druhyDospelyTretiZamestnavatelVyzivovaneDeti").value);

	tretiDospelyPrvniZamestnavatel[0] = parseFloat(document.getElementById("tretiDospelyPrvniZamestnavatelHPPPrijem").value);
	tretiDospelyPrvniZamestnavatel[1] = document.getElementById("tretiDospelyPrvniZamestnavatelHPPVyjimka").value;
	tretiDospelyPrvniZamestnavatel[2] = parseFloat(document.getElementById("tretiDospelyPrvniZamestnavatelDPCPrijem").value);
	tretiDospelyPrvniZamestnavatel[3] = document.getElementById("tretiDospelyPrvniZamestnavatelDPCZdravotni").value;
	tretiDospelyPrvniZamestnavatel[4] = parseFloat(document.getElementById("tretiDospelyPrvniZamestnavatelDPPPrijem").value);
	tretiDospelyPrvniZamestnavatel[5] = document.getElementById("tretiDospelyPrvniZamestnavatelDPPZdravotni").value;
	tretiDospelyPrvniZamestnavatel[6] = document.getElementById("tretiDospelyPrvniZamestnavatelRuzovyPapir").value;
	tretiDospelyPrvniZamestnavatel[7] = parseFloat(document.getElementById("tretiDospelyPrvniZamestnavatelVyzivovaneDeti").value);

	tretiDospelyDruhyZamestnavatel[0] = parseFloat(document.getElementById("tretiDospelyDruhyZamestnavatelHPPPrijem").value);
	tretiDospelyDruhyZamestnavatel[1] = document.getElementById("tretiDospelyDruhyZamestnavatelHPPVyjimka").value;
	tretiDospelyDruhyZamestnavatel[2] = parseFloat(document.getElementById("tretiDospelyDruhyZamestnavatelDPCPrijem").value);
	tretiDospelyDruhyZamestnavatel[3] = document.getElementById("tretiDospelyDruhyZamestnavatelDPCZdravotni").value;
	tretiDospelyDruhyZamestnavatel[4] = parseFloat(document.getElementById("tretiDospelyDruhyZamestnavatelDPPPrijem").value);
	tretiDospelyDruhyZamestnavatel[5] = document.getElementById("tretiDospelyDruhyZamestnavatelDPPZdravotni").value;
	tretiDospelyDruhyZamestnavatel[6] = document.getElementById("tretiDospelyDruhyZamestnavatelRuzovyPapir").value;
	tretiDospelyDruhyZamestnavatel[7] = parseFloat(document.getElementById("tretiDospelyDruhyZamestnavatelVyzivovaneDeti").value);

	tretiDospelyTretiZamestnavatel[0] = parseFloat(document.getElementById("tretiDospelyTretiZamestnavatelHPPPrijem").value);
	tretiDospelyTretiZamestnavatel[1] = document.getElementById("tretiDospelyTretiZamestnavatelHPPVyjimka").value;
	tretiDospelyTretiZamestnavatel[2] = parseFloat(document.getElementById("tretiDospelyTretiZamestnavatelDPCPrijem").value);
	tretiDospelyTretiZamestnavatel[3] = document.getElementById("tretiDospelyTretiZamestnavatelDPCZdravotni").value;
	tretiDospelyTretiZamestnavatel[4] = parseFloat(document.getElementById("tretiDospelyTretiZamestnavatelDPPPrijem").value);
	tretiDospelyTretiZamestnavatel[5] = document.getElementById("tretiDospelyTretiZamestnavatelDPPZdravotni").value;
	tretiDospelyTretiZamestnavatel[6] = document.getElementById("tretiDospelyTretiZamestnavatelRuzovyPapir").value;
	tretiDospelyTretiZamestnavatel[7] = parseFloat(document.getElementById("tretiDospelyTretiZamestnavatelVyzivovaneDeti").value);

	slozeniDomacnosti[0] = parseFloat(document.getElementById("pocetDospelych").value);
	slozeniDomacnosti[1] = parseFloat(document.getElementById("pocetDetiPod6").value);
	slozeniDomacnosti[2] = parseFloat(document.getElementById("pocetDeti6Az15").value);
	slozeniDomacnosti[3] = parseFloat(document.getElementById("pocetDeti15Az26").value);
	slozeniDomacnosti[4] = parseFloat(document.getElementById("pocetClenuDomacnosti").value);

	socialOptional[0] = parseFloat(document.getElementById("snizeneMinimum").value);
	socialOptional[1] = document.getElementById("vyssiDavkyNaDeti").value;

	dalsiPrijmy[0] = parseFloat(document.getElementById("duchody").value);
	dalsiPrijmy[1] = parseFloat(document.getElementById("rodicovska").value);
	dalsiPrijmy[2] = parseFloat(document.getElementById("ostatniPrijmy").value);

	bydleni[0] = parseFloat(document.getElementById("najem").value);
	bydleni[1] = parseFloat(document.getElementById("poplatky").value);
	bydleni[2] = document.getElementById("vlastniByt").value;
	bydleni[3] = document.getElementById("ubytovna").value;
	bydleni[4] = parseFloat(document.getElementById("velikostObce").value);
	bydleni[5] = parseFloat(document.getElementById("obvykleNaklady").value);

	var prijmyAVydajeRodinyPoZapocteniDavek = spocitejPrijmyAVydajeRodinyPoZapocteniDavek();

	var text = "<p>Příjem prvního dospělého (hrubý, čistý): " + prijmyAVydajeRodinyPoZapocteniDavek[0][0] + " Kč, " + prijmyAVydajeRodinyPoZapocteniDavek[0][1] + " Kč.</p>";
		text += "<p>Příjem druhého dospělého (hrubý, čistý): " + prijmyAVydajeRodinyPoZapocteniDavek[1][0] + " Kč, " + prijmyAVydajeRodinyPoZapocteniDavek[1][1] + " Kč.</p>";
		text += "<p>Příjem třetího dospělého (hrubý, čistý): " + prijmyAVydajeRodinyPoZapocteniDavek[2][0] + " Kč, " + prijmyAVydajeRodinyPoZapocteniDavek[2][1] + " Kč.</p>";
		text += "<p>Čistý příjem domácnosti před zaplacením nájmu: " + prijmyAVydajeRodinyPoZapocteniDavek[3] + " Kč.</p>";
		text += "<p>Čistý příjem domácnosti po zaplacení nájmu: " + prijmyAVydajeRodinyPoZapocteniDavek[4] + " Kč.</p>";

	document.getElementById('results').innerHTML = text;

	return false;
}



// nějaký kecy; vstupem je nezávislá proměnná (plat 1., 2., 3., výstupem příjmy a výdaje po započtení dávek)

function dynamickyModelujRodinu () {

	var temp = prvniDospelyPrvniZamestnavatel[0];

	var polePrijmuAVydaju = [];

	for (i = 0; i < 50; i = i++) {
		prvniDospelyPrvniZamestnavatel[0] = 1000 * i;
		var nezavislaPromenna = prvniDospelyPrvniZamestnavatel[0];
		var zavislaPromenna = spocitejPrijmyAVydajeRodinyPoZapocteniDavek();
		polePrijmuAVydaju[i] = [nezavislaPromenna, zavislaPromenna];
    }

    prvniDospelyPrvniZamestnavatel[0] = temp;

    return(polePrijmuAVydaju);
}
