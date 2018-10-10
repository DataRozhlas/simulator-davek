
// hrubý příjem na HPP, výjimka z minimálního základu?, hrubý příjem na DPČ, platí zdravotní jinde?, hrubý příjem na DPP, platí zdravotní jinde?, růžový papír?, počet vyživovaných dětí
var prvniDospelyPrvniZamestnavatel = [0, false, 0, false, 0, false, false, 0],
	prvniDospelyDruhyZamestnavatel = [0, false, 0, false, 0, false, false, 0],
	druhyDospelyPrvniZamestnavatel = [0, false, 0, false, 0, false, false, 0],
	druhyDospelyDruhyZamestnavatel = [0, false, 0, false, 0, false, false, 0],
	tretiDospelyPrvniZamestnavatel = [0, false, 0, false, 0, false, false, 0],
	tretiDospelyDruhyZamestnavatel = [0, false, 0, false, 0, false, false, 0],

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

// nájem, poplatky, bydlí ve vlastním nebo družstevním bytě?, bydlí na ubytovně, chatě nebo v podnájmu?,
// velikost obce (1 = Praha, 2 = nad 100 000, 3 = nad 50 000, 4 = nad 10 000, 5 = pod 10 000), místně obvyklé náklady stanovené úřadem práce
	bydleni = [0, 0, false, false, 1, 0];

// testovací rodinka

/*
prvniDospelyPrvniZamestnavatel = [20000, false, 0, false, 0, false, true, 2]
prvniDospelyDalsiPrijmy = [0, 3800, 0, 0, 0]
prvniDospelyExekuce = [false, false, 0]
slozeniDomacnosti = [1, 2, 0, 0, 3, 0]
bydleni = [8000, 2000, false, false, 3, 0]
*/