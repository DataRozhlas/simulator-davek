
//ED
// hrubý příjem, typ smlouvy (HPP = 0, DPČ = 1, DPP = 2), růžový papír?, počet vyživovaných dětí, výjimka z minimálního základu?
var prvniDospelyPrvniZamestnavatel = [0, 0, false, 0, false],
	prvniDospelyDruhyZamestnavatel = [0, 0, false, 0, false],
	druhyDospelyPrvniZamestnavatel = [0, 0, false, 0, false],
	druhyDospelyDruhyZamestnavatel = [0, 0, false, 0, false],
	tretiDospelyPrvniZamestnavatel = [0, 0, false, 0, false],
	tretiDospelyDruhyZamestnavatel = [0, 0, false, 0, false],
//IT

// důchody, rodičovský příspěvek, podpora v nezaměstnanosti, nemocenská, ostatní příjmy
	prvniDospelyDalsiPrijmy = [0, 0, 0, 0, 0],
	druhyDospelyDalsiPrijmy = [0, 0, 0, 0, 0],
	tretiDospelyDalsiPrijmy = [0, 0, 0, 0, 0],

// počet přednostních exekucí, počet nepřednostních exekucí, počet dalších vyživovaných osob
	prvniDospelyExekuce = [false, false, 0],
	druhyDospelyExekuce = [false, false, 0],
	tretiDospelyExekuce = [false, false, 0],

// počet dospělých, počet dětí pod 6 let, počet dětí 6 až 15 let, počet nezaopatřených dětí 15 až 26 let, počet členů domácnosti, počet členů domácnosti s trvalým bydlištěm jinde
	slozeniDomacnosti = [0, 0, 0, 0, 0, 0],

// kolik členů domácnosti má snížené minimum na existenční, má rodina nárok na vyšší dávky na děti (pobírá rodičovskou, mateřskou, nebo podporu v nezaměstnanosti)?
	socialOptional = [0, false],

//ED
// nájem, poplatky, bydlí v nájmu?, bydlí ve vlastním nebo družstevním bytě?, bydlí na ubytovně, chatě nebo v podnájmu?,
// velikost obce (1 = Praha, 2 = nad 100 000, 3 = nad 50 000, 4 = nad 10 000, 5 = pod 10 000), místně obvyklé náklady stanovené ÚP
	bydleni = [0, 0, true, false, false, 1, 0],
//IT

//ED
// chce přídavky na děti?, chce příspěvek na bydlení?, chce příspěvek na živobytí?, chce doplatek na bydlení?
	pozadovaneDavky = [true, true, true, true];
//IT

// testovací rodinka

//ED
prvniDospelyPrvniZamestnavatel = [0, 0, true, 2, false];
slozeniDomacnosti = [2, 2, 0, 0, 0, 0];
bydleni = [8000, 2000, true, false, false, 1, 0];
//IT