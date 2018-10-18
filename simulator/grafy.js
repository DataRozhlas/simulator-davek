
// globální proměnné

var colors = [
	// 0: čistý příjem 1. dospělého ze zaměstnání bez bonusu na dítě
	'#333333',
	// 1: daňový bonus 1. dospělého
	'#cccccc',
	// 2: čistý příjem 2. dospělého ze zaměstnání bez bonusu na dítě
	'#666666',
	// 3: daňový bonus 2. dospělého
	'#cccccc',
	// 4: čistý příjem 3. dospělého ze zaměstnání bez bonusu na dítě
	'#999999',
	// 5: daňový bonus 3. dospělého
	'#cccccc',
	// 6: přídavky na děti
	'#1f78b4',
	// 7: příspěvek na bydlení
	'#a6cee3',
	// 8: příspěvek na živobytí
	'#33a02c',
	// 9: doplatek na bydlení
	'#b2df8a',
	// 10: důchody
	'#ff7f00',
	// 11: rodičovský příspěvek
	'#fdbf6f',
	// 12: podpora v nezaměstnanosti
	'#6a3d9a',
	// 13: nemocenská
	'#cab2d6',
	// 14: ostatní příjmy
	'#f0e06b',
	// 15: nájem
	'#b15928',
	// 16: poplatky
	'#fb9a99',
	// 17: srážky ze mzdy
	'#e31a1c'
];



function dynamickyModelujRodinu(simulace = 0) {

	/* simulace:

	1: příjem prvního dospělého na HPP
	2: příjem prvního dospělého na DPČ
	3: příjem prvního dospělého na DPP
	4: nájem
	5: důchod
	6: rodičovská

	*/

	// záloha nezávislé proměnné, která se pak vrátí do globální proměnné
	var backup,

	// pro graf
		nazevNezavislePromenne,

	// spodní a horní hranice nezávislé proměnné pro simulaci
		intervalMin,
		intervalMax,

	// pro ukládání výsledků
		prijmyAVydajeRodinyPoZapocteniDavek = 0,
		nezavisla = [],
		prvniDospelyPoExekuci = [],
		prvniDospelyDanovyBonus = [],
		druhyDospelyPoExekuci = [],
		druhyDospelyDanovyBonus = [],
		tretiDospelyPoExekuci = [],
		tretiDospelyDanovyBonus = [],
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
		exekuce = [],
		prijemRodiny = [];

	if (simulace == 1) {
		nazevNezavislePromenne = 'hrubý příjem prvního dospělého na HPP';
		backup = prvniDospelyPrvniZamestnavatel[0];
		intervalMin = 13000;
		intervalMax = 30000;
	} else if (simulace == 2) {
		nazevNezavislePromenne = 'hrubý příjem prvního dospělého na DPČ';
		backup = prvniDospelyPrvniZamestnavatel[2];
		intervalMin = 0;
		intervalMax = 20000;
	} else if (simulace == 3) {
		nazevNezavislePromenne = 'hrubý příjem prvního dospělého na DPP';
		backup = prvniDospelyPrvniZamestnavatel[4];
		intervalMin = 0;
		intervalMax = 20000;
	} else if (simulace == 4) {
		nazevNezavislePromenne = 'nájem';
		backup = bydleni[0];
		intervalMin = 0;
		intervalMax = 20000;
	} else if (simulace == 5) {
		nazevNezavislePromenne = 'důchod';
		backup = prvniDospelyDalsiPrijmy[0];
		intervalMin = 0;
		intervalMax = 15000;
	} else if (simulace == 6) {
		nazevNezavislePromenne = 'rodičovská';
		backup = prvniDospelyDalsiPrijmy[1];
		intervalMin = 0;
		intervalMax = 10000;
	}

	// u HPP nejdřív spočítat situaci s nulovou a minimální mzdou
	if (simulace == 1) {
		for (i = 0; i <= 12200; i = i + 12200) {
			prvniDospelyPrvniZamestnavatel[0] = i;
			nezavisla.push(i)

			prijmyAVydajeRodinyPoZapocteniDavek = spocitejPrijmyAVydajeRodinyPoZapocteniDavek();
			prvniDospelyPoExekuci.push(prijmyAVydajeRodinyPoZapocteniDavek[0]);
			prvniDospelyDanovyBonus.push(prijmyAVydajeRodinyPoZapocteniDavek[1]);
			druhyDospelyPoExekuci.push(prijmyAVydajeRodinyPoZapocteniDavek[2]);
			druhyDospelyDanovyBonus.push(prijmyAVydajeRodinyPoZapocteniDavek[3]);
			tretiDospelyPoExekuci.push(prijmyAVydajeRodinyPoZapocteniDavek[4]);
			tretiDospelyDanovyBonus.push(prijmyAVydajeRodinyPoZapocteniDavek[5]);
			pridavkyNaDeti.push(prijmyAVydajeRodinyPoZapocteniDavek[6]);
			prispevekNaBydleni.push(prijmyAVydajeRodinyPoZapocteniDavek[7]);
			prispevekNaZivobyti.push(prijmyAVydajeRodinyPoZapocteniDavek[8]);
			doplatekNaBydleni.push(prijmyAVydajeRodinyPoZapocteniDavek[9]);
			duchody.push(prijmyAVydajeRodinyPoZapocteniDavek[10]);
			rodicovska.push(prijmyAVydajeRodinyPoZapocteniDavek[11]);
			podporaVNezamestnanosti.push(prijmyAVydajeRodinyPoZapocteniDavek[12]);
			nemocenska.push(prijmyAVydajeRodinyPoZapocteniDavek[13]);
			ostatniPrijmy.push(prijmyAVydajeRodinyPoZapocteniDavek[14]);
			najem.push(-prijmyAVydajeRodinyPoZapocteniDavek[15]);
			poplatky.push(-prijmyAVydajeRodinyPoZapocteniDavek[16]);
			exekuce.push(-prijmyAVydajeRodinyPoZapocteniDavek[17]);
			prijemRodiny.push(prijmyAVydajeRodinyPoZapocteniDavek[18]);

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
		} else if (simulace == 5) {
			prvniDospelyDalsiPrijmy[0] = i;
		} else if (simulace == 6) {
			prvniDospelyDalsiPrijmy[1] = i;
		}

		nezavisla.push(i)

		// příjem dospělého se v grafu ukazuje jako příjem × daňový bonus, proto kompenzace
		// důchod nebo rodičovská se připočítávají k příjmu, takže u jejich simulace je potřeba kompenzace

		/* zatím nefunguje
		if (simulace == 5 || simulace == 6) {
			prvniDospelyPoExekuci.push(prijmyAVydajeRodinyPoZapocteniDavek[2] - prijmyAVydajeRodinyPoZapocteniDavek[29] - prvniDospelyDalsiPrijmy[0] - prvniDospelyDalsiPrijmy[1] -
				prvniDospelyDalsiPrijmy[2] - prvniDospelyDalsiPrijmy[3] - prvniDospelyDalsiPrijmy[4])
		} else {
			prvniDospelyPoExekuci.push(prijmyAVydajeRodinyPoZapocteniDavek[2])
		}
		*/

		prijmyAVydajeRodinyPoZapocteniDavek = spocitejPrijmyAVydajeRodinyPoZapocteniDavek();
		prvniDospelyPoExekuci.push(prijmyAVydajeRodinyPoZapocteniDavek[0]);
		prvniDospelyDanovyBonus.push(prijmyAVydajeRodinyPoZapocteniDavek[1]);
		druhyDospelyPoExekuci.push(prijmyAVydajeRodinyPoZapocteniDavek[2]);
		druhyDospelyDanovyBonus.push(prijmyAVydajeRodinyPoZapocteniDavek[3]);
		tretiDospelyPoExekuci.push(prijmyAVydajeRodinyPoZapocteniDavek[4]);
		tretiDospelyDanovyBonus.push(prijmyAVydajeRodinyPoZapocteniDavek[5]);
		pridavkyNaDeti.push(prijmyAVydajeRodinyPoZapocteniDavek[6]);
		prispevekNaBydleni.push(prijmyAVydajeRodinyPoZapocteniDavek[7]);
		prispevekNaZivobyti.push(prijmyAVydajeRodinyPoZapocteniDavek[8]);
		doplatekNaBydleni.push(prijmyAVydajeRodinyPoZapocteniDavek[9]);
		duchody.push(prijmyAVydajeRodinyPoZapocteniDavek[10]);
		rodicovska.push(prijmyAVydajeRodinyPoZapocteniDavek[11]);
		podporaVNezamestnanosti.push(prijmyAVydajeRodinyPoZapocteniDavek[12]);
		nemocenska.push(prijmyAVydajeRodinyPoZapocteniDavek[13]);
		ostatniPrijmy.push(prijmyAVydajeRodinyPoZapocteniDavek[14]);
		najem.push(-prijmyAVydajeRodinyPoZapocteniDavek[15]);
		poplatky.push(-prijmyAVydajeRodinyPoZapocteniDavek[16]);
		exekuce.push(-prijmyAVydajeRodinyPoZapocteniDavek[17]);
		prijemRodiny.push(prijmyAVydajeRodinyPoZapocteniDavek[18]);

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
	} else if (simulace == 5) {
		prvniDospelyDalsiPrijmy[0] = backup;
	} else if (simulace == 6) {
		prvniDospelyDalsiPrijmy[1] = backup;
	}

	// vytvoření divu pro graf
	var text = '<div id="graf" style="width:100%; height:100%">';
	document.getElementById("mainwindow").innerHTML = text;

	nakresliGraf(nezavisla, nazevNezavislePromenne, prvniDospelyPoExekuci, prvniDospelyDanovyBonus, druhyDospelyPoExekuci, druhyDospelyDanovyBonus,
		tretiDospelyPoExekuci, tretiDospelyDanovyBonus, pridavkyNaDeti, prispevekNaBydleni, prispevekNaZivobyti, doplatekNaBydleni, duchody,
		rodicovska, podporaVNezamestnanosti, nemocenska, ostatniPrijmy, najem, poplatky, exekuce, prijemRodiny);

}



function nakresliGraf(x = [], nazev = '', prvniDospelyPoExekuci = [], prvniDospelyDanovyBonus = [], druhyDospelyPoExekuci = [], druhyDospelyDanovyBonus = [],
		tretiDospelyPoExekuci = [], tretiDospelyDanovyBonus = [], pridavkyNaDeti = [], prispevekNaBydleni = [], prispevekNaZivobyti, doplatekNaBydleni = [], duchody = [],
		rodicovska = [], podporaVNezamestnanosti = [], nemocenska = [], ostatniPrijmy = [], najem = [], poplatky = [], exekuce = [], prijemRodiny = []) {

	var chart = Highcharts.chart('graf', {

		chart: {
			type: 'column'
		},

		title: {
			text: 'Disponibilní příjem domácnosti × ' + nazev
		},

		subtitle: {
		},

		xAxis: {
			categories: x,
			title: {
				text: nazev
			},
		},

		yAxis: {
			title: {
				text: 'disponibilní příjem domácnosti'
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

		annotations: [{
			labelOptions: {
				shape: 'rect',
				align: 'center',
				justify: false,
				crop: true,
				backgroundColor: 'rgba(0, 0, 0, 0.3)',
				borderColor: "grey",
				padding: 3,
				style: {
					fontSize: '0.8em',
					fontFamily: 'Roboto'
				},
				y: 20
			},
			labels: [{
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 0,
					y: (prvniDospelyPoExekuci[0] +  druhyDospelyPoExekuci[0] + tretiDospelyPoExekuci[0] + prvniDospelyDanovyBonus[0] + druhyDospelyDanovyBonus[1] + tretiDospelyDanovyBonus[2] +
					pridavkyNaDeti[0] + prispevekNaBydleni[0] + prispevekNaZivobyti[0] + doplatekNaBydleni[0] + duchody[0] + rodicovska[0] + podporaVNezamestnanosti[0] +
					nemocenska[0] + ostatniPrijmy[0] + najem[0] + poplatky[0])
				},
				text: '{point.y}'
			}, {
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 1,
					y: (prvniDospelyPoExekuci[1] +  druhyDospelyPoExekuci[1] + tretiDospelyPoExekuci[1] + prvniDospelyDanovyBonus[1] + druhyDospelyDanovyBonus[1] + tretiDospelyDanovyBonus[2] +
					pridavkyNaDeti[1] + prispevekNaBydleni[1] + prispevekNaZivobyti[1] + doplatekNaBydleni[1] + duchody[1] + rodicovska[1] + podporaVNezamestnanosti[1] +
					nemocenska[1] + ostatniPrijmy[1] + najem[1] + poplatky[1])
				},
				text: '{point.y}'
			}, {
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 2,
					y: (prvniDospelyPoExekuci[2] +  druhyDospelyPoExekuci[2] + tretiDospelyPoExekuci[2] + prvniDospelyDanovyBonus[2] + druhyDospelyDanovyBonus[2] + tretiDospelyDanovyBonus[2] +
					pridavkyNaDeti[2] + prispevekNaBydleni[2] + prispevekNaZivobyti[2] + doplatekNaBydleni[2] + duchody[2] + rodicovska[2] + podporaVNezamestnanosti[2] +
					nemocenska[2] + ostatniPrijmy[2] + najem[2] + poplatky[2])
				},
				text: '{point.y}'
			}, {
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 3,
					y: (prvniDospelyPoExekuci[3] +  druhyDospelyPoExekuci[3] + tretiDospelyPoExekuci[3] + prvniDospelyDanovyBonus[3] + druhyDospelyDanovyBonus[3] + tretiDospelyDanovyBonus[3] +
					pridavkyNaDeti[3] + prispevekNaBydleni[3] + prispevekNaZivobyti[3] + doplatekNaBydleni[3] + duchody[3] + rodicovska[3] + podporaVNezamestnanosti[3] +
					nemocenska[3] + ostatniPrijmy[3] + najem[3] + poplatky[3])
				},
				text: '{point.y}'
			}, {
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 4,
					y: (prvniDospelyPoExekuci[4] +  druhyDospelyPoExekuci[4] + tretiDospelyPoExekuci[4] + prvniDospelyDanovyBonus[4] + druhyDospelyDanovyBonus[4] + tretiDospelyDanovyBonus[4] +
					pridavkyNaDeti[4] + prispevekNaBydleni[4] + prispevekNaZivobyti[4] + doplatekNaBydleni[4] + duchody[4] + rodicovska[4] + podporaVNezamestnanosti[4] +
					nemocenska[4] + ostatniPrijmy[4] + najem[4] + poplatky[4])
				},
				text: '{point.y}'
			}, {
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 5,
					y: (prvniDospelyPoExekuci[5] +  druhyDospelyPoExekuci[5] + tretiDospelyPoExekuci[5] + prvniDospelyDanovyBonus[5] + druhyDospelyDanovyBonus[5] + tretiDospelyDanovyBonus[5] +
					pridavkyNaDeti[5] + prispevekNaBydleni[5] + prispevekNaZivobyti[5] + doplatekNaBydleni[5] + duchody[5] + rodicovska[5] + podporaVNezamestnanosti[5] +
					nemocenska[5] + ostatniPrijmy[5] + najem[5] + poplatky[5])
				},
				text: '{point.y}'
			}, {
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 6,
					y: (prvniDospelyPoExekuci[6] +  druhyDospelyPoExekuci[6] + tretiDospelyPoExekuci[6] + prvniDospelyDanovyBonus[6] + druhyDospelyDanovyBonus[6] + tretiDospelyDanovyBonus[6] +
					pridavkyNaDeti[6] + prispevekNaBydleni[6] + prispevekNaZivobyti[6] + doplatekNaBydleni[6] + duchody[6] + rodicovska[6] + podporaVNezamestnanosti[6] +
					nemocenska[6] + ostatniPrijmy[6] + najem[6] + poplatky[6])
				},
				text: '{point.y}'
			}, {
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 7,
					y: (prvniDospelyPoExekuci[7] +  druhyDospelyPoExekuci[7] + tretiDospelyPoExekuci[7] + prvniDospelyDanovyBonus[7] + druhyDospelyDanovyBonus[7] + tretiDospelyDanovyBonus[7] +
					pridavkyNaDeti[7] + prispevekNaBydleni[7] + prispevekNaZivobyti[7] + doplatekNaBydleni[7] + duchody[7] + rodicovska[7] + podporaVNezamestnanosti[7] +
					nemocenska[7] + ostatniPrijmy[7] + najem[7] + poplatky[7])
				},
				text: '{point.y}'
			}, {
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 8,
					y: (prvniDospelyPoExekuci[8] +  druhyDospelyPoExekuci[8] + tretiDospelyPoExekuci[8] + prvniDospelyDanovyBonus[8] + druhyDospelyDanovyBonus[8] + tretiDospelyDanovyBonus[8] +
					pridavkyNaDeti[8] + prispevekNaBydleni[8] + prispevekNaZivobyti[8] + doplatekNaBydleni[8] + duchody[8] + rodicovska[8] + podporaVNezamestnanosti[8] +
					nemocenska[8] + ostatniPrijmy[8] + najem[8] + poplatky[8])
				},
				text: '{point.y}'
			}, {
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 9,
					y: (prvniDospelyPoExekuci[9] +  druhyDospelyPoExekuci[9] + tretiDospelyPoExekuci[9] + prvniDospelyDanovyBonus[9] + druhyDospelyDanovyBonus[9] + tretiDospelyDanovyBonus[9] +
					pridavkyNaDeti[9] + prispevekNaBydleni[9] + prispevekNaZivobyti[9] + doplatekNaBydleni[9] + duchody[9] + rodicovska[9] + podporaVNezamestnanosti[9] +
					nemocenska[9] + ostatniPrijmy[9] + najem[9] + poplatky[9])
				},
				text: '{point.y}'
			}, {
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 10,
					y: (prvniDospelyPoExekuci[10] +  druhyDospelyPoExekuci[10] + tretiDospelyPoExekuci[10] + prvniDospelyDanovyBonus[10] + druhyDospelyDanovyBonus[10] + tretiDospelyDanovyBonus[10] +
					pridavkyNaDeti[10] + prispevekNaBydleni[10] + prispevekNaZivobyti[10] + doplatekNaBydleni[10] + duchody[10] + rodicovska[10] + podporaVNezamestnanosti[10] +
					nemocenska[10] + ostatniPrijmy[10] + najem[10] + poplatky[10])
				},
				text: '{point.y}'
			}, {
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 11,
					y: (prvniDospelyPoExekuci[11] +  druhyDospelyPoExekuci[11] + tretiDospelyPoExekuci[11] + prvniDospelyDanovyBonus[11] + druhyDospelyDanovyBonus[11] + tretiDospelyDanovyBonus[11] +
					pridavkyNaDeti[11] + prispevekNaBydleni[11] + prispevekNaZivobyti[11] + doplatekNaBydleni[11] + duchody[11] + rodicovska[11] + podporaVNezamestnanosti[11] +
					nemocenska[11] + ostatniPrijmy[11] + najem[11] + poplatky[11])
				},
				text: '{point.y}'
			}, {
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 12,
					y: (prvniDospelyPoExekuci[12] +  druhyDospelyPoExekuci[12] + tretiDospelyPoExekuci[12] + prvniDospelyDanovyBonus[12] + druhyDospelyDanovyBonus[12] + tretiDospelyDanovyBonus[12] +
					pridavkyNaDeti[12] + prispevekNaBydleni[12] + prispevekNaZivobyti[12] + doplatekNaBydleni[12] + duchody[12] + rodicovska[12] + podporaVNezamestnanosti[12] +
					nemocenska[12] + ostatniPrijmy[12] + najem[12] + poplatky[12])
				},
				text: '{point.y}'
			}, {
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 13,
					y: (prvniDospelyPoExekuci[13] +  druhyDospelyPoExekuci[13] + tretiDospelyPoExekuci[13] + prvniDospelyDanovyBonus[13] + druhyDospelyDanovyBonus[13] + tretiDospelyDanovyBonus[13] +
					pridavkyNaDeti[13] + prispevekNaBydleni[13] + prispevekNaZivobyti[13] + doplatekNaBydleni[13] + duchody[13] + rodicovska[13] + podporaVNezamestnanosti[13] +
					nemocenska[13] + ostatniPrijmy[13] + najem[13] + poplatky[13])
				},
				text: '{point.y}'
			}, {
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 14,
					y: (prvniDospelyPoExekuci[14] +  druhyDospelyPoExekuci[14] + tretiDospelyPoExekuci[14] + prvniDospelyDanovyBonus[14] + druhyDospelyDanovyBonus[14] + tretiDospelyDanovyBonus[14] +
					pridavkyNaDeti[14] + prispevekNaBydleni[14] + prispevekNaZivobyti[14] + doplatekNaBydleni[14] + duchody[14] + rodicovska[14] + podporaVNezamestnanosti[14] +
					nemocenska[14] + ostatniPrijmy[14] + najem[14] + poplatky[14])
				},
				text: '{point.y}'
			}, {
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 15,
					y: (prvniDospelyPoExekuci[15] +  druhyDospelyPoExekuci[15] + tretiDospelyPoExekuci[15] + prvniDospelyDanovyBonus[15] + druhyDospelyDanovyBonus[15] + tretiDospelyDanovyBonus[15] +
					pridavkyNaDeti[15] + prispevekNaBydleni[15] + prispevekNaZivobyti[15] + doplatekNaBydleni[15] + duchody[15] + rodicovska[15] + podporaVNezamestnanosti[15] +
					nemocenska[15] + ostatniPrijmy[15] + najem[15] + poplatky[15])
				},
				text: '{point.y}'
			}, {
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 16,
					y: (prvniDospelyPoExekuci[16] +  druhyDospelyPoExekuci[16] + tretiDospelyPoExekuci[16] + prvniDospelyDanovyBonus[16] + druhyDospelyDanovyBonus[16] + tretiDospelyDanovyBonus[16] +
					pridavkyNaDeti[16] + prispevekNaBydleni[16] + prispevekNaZivobyti[16] + doplatekNaBydleni[16] + duchody[16] + rodicovska[16] + podporaVNezamestnanosti[16] +
					nemocenska[16] + ostatniPrijmy[16] + najem[16] + poplatky[16])
				},
				text: '{point.y}'
			}, {
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 17,
					y: (prvniDospelyPoExekuci[17] +  druhyDospelyPoExekuci[17] + tretiDospelyPoExekuci[17] + prvniDospelyDanovyBonus[17] + druhyDospelyDanovyBonus[17] + tretiDospelyDanovyBonus[17] +
					pridavkyNaDeti[17] + prispevekNaBydleni[17] + prispevekNaZivobyti[17] + doplatekNaBydleni[17] + duchody[17] + rodicovska[17] + podporaVNezamestnanosti[17] +
					nemocenska[17] + ostatniPrijmy[17] + najem[17] + poplatky[17])
				},
				text: '{point.y}'
			}, {
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 18,
					y: (prvniDospelyPoExekuci[18] +  druhyDospelyPoExekuci[18] + tretiDospelyPoExekuci[18] + prvniDospelyDanovyBonus[18] + druhyDospelyDanovyBonus[18] + tretiDospelyDanovyBonus[18] +
					pridavkyNaDeti[18] + prispevekNaBydleni[18] + prispevekNaZivobyti[18] + doplatekNaBydleni[18] + duchody[18] + rodicovska[18] + podporaVNezamestnanosti[18] +
					nemocenska[18] + ostatniPrijmy[18] + najem[18] + poplatky[18])
				},
				text: '{point.y}'
			}, {
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 19,
					y: (prvniDospelyPoExekuci[19] +  druhyDospelyPoExekuci[19] + tretiDospelyPoExekuci[19] + prvniDospelyDanovyBonus[19] + druhyDospelyDanovyBonus[19] + tretiDospelyDanovyBonus[19] +
					pridavkyNaDeti[19] + prispevekNaBydleni[19] + prispevekNaZivobyti[19] + doplatekNaBydleni[19] + duchody[19] + rodicovska[19] + podporaVNezamestnanosti[19] +
					nemocenska[19] + ostatniPrijmy[19] + najem[19] + poplatky[19])
				},
				text: '{point.y}'
			}, {
				point: {
					xAxis: 0,
					yAxis: 0,
					x: 20,
					y: (prvniDospelyPoExekuci[20] +  druhyDospelyPoExekuci[20] + tretiDospelyPoExekuci[20] + prvniDospelyDanovyBonus[20] + druhyDospelyDanovyBonus[20] + tretiDospelyDanovyBonus[20] +
					pridavkyNaDeti[20] + prispevekNaBydleni[20] + prispevekNaZivobyti[20] + doplatekNaBydleni[20] + duchody[20] + rodicovska[20] + podporaVNezamestnanosti[20] +
					nemocenska[20] + ostatniPrijmy[20] + najem[20] + poplatky[20])
				},
				text: '{point.y}'
			}]
		}],

		tooltip: {
			formatter: function () {

				var s = '<div></div>'
				var celkem = 0;

				$.each(this.points, function () {
					if ((this.series.name != 'disponibilní příjem domácnosti') & (this.series.name != 'srážky ze mzdy')) {

						// přidávají se jen nenulové položky
						if (!this.y == 0) {

							s += '<br/><span style="color:' + this.color +'">' + this.series.name + '</span>: ' +
								this.y + ' Kč';
							celkem += this.y;

						}

					}

				});

				s += '<br/><b>disponibilní příjem domácnosti: ' + celkem + ' Kč</b>';

				// pokud je exekuce, na závěr se přidají srážky ze mzdy
				if (prvniDospelyExekuce[0] || prvniDospelyExekuce[1] || druhyDospelyExekuce[0] || druhyDospelyExekuce[1] || tretiDospelyExekuce[0] || tretiDospelyExekuce[1]) {

					s += '<br/><span style="color:' + colors[17] +'">' + '(srážky z příjmů: ' + this.points[17]['y'] + ' Kč)' + '</span>';

				};

				return s;
			},
			shared: true
		},

		exporting: {
			enabled: false
		},

		credits: {
			enabled: false
		},

		plotOptions: {
		},

		series: [{
			name: 'čistý příjem 1. dospělého ze zaměstnání',
			data: prvniDospelyPoExekuci,
			color: colors[0],
			stacking: 'stacked'
		}, {
			name: 'daňový bonus 1. dospělého',
			data: prvniDospelyDanovyBonus,
			color: colors[1],
			stacking: 'stacked'
		}, {
			name: 'čistý příjem 2. dospělého ze zaměstnání',
			data: druhyDospelyPoExekuci,
			color: colors[2],
			stacking: 'stacked'
		}, {
			name: 'daňový bonus 2. dospělého',
			data: druhyDospelyDanovyBonus,
			color: colors[3],
			stacking: 'stacked'
		}, {
			name: 'čistý příjem 3. dospělého ze zaměstnání',
			data: tretiDospelyPoExekuci,
			color: colors[4],
			stacking: 'stacked'
		}, {
			name: 'daňový bonus 3. dospělého',
			data: tretiDospelyDanovyBonus,
			color: colors[5],
			stacking: 'stacked'
		}, {
			name: 'přídavky na děti',
			data: pridavkyNaDeti,
			color: colors[6],
			stacking: 'stacked'
		}, {
			name: 'příspěvek na bydlení',
			data: prispevekNaBydleni,
			color: colors[7],
			stacking: 'stacked'
		}, {
			name: 'příspěvek na živobytí',
			data: prispevekNaZivobyti,
			color: colors[8],
			stacking: 'stacked'
		}, {
			name: 'doplatek na bydlení',
			data: doplatekNaBydleni,
			color: colors[9],
			stacking: 'stacked'
		}, {
			name: 'důchody',
			data: duchody,
			color: colors[10],
			stacking: 'stacked'
		}, {
			name: 'rodičovský příspěvek',
			data: rodicovska,
			color: colors[11],
			stacking: 'stacked'
		}, {
			name: 'podpora v nezaměstnanosti',
			data: podporaVNezamestnanosti,
			color: colors[12],
			stacking: 'stacked'
		}, {
			name: 'nemocenská',
			data: nemocenska,
			color: colors[13],
			stacking: 'stacked'
		}, {
			name: 'ostatní příjmy',
			data: ostatniPrijmy,
			color: colors[14],
			stacking: 'stacked'
		}, {
			name: 'nájem',
			data: najem,
			color: colors[15],
			stacking: 'stacked'
		}, {
			name: 'poplatky',
			data: poplatky,
			color: colors[16],
			stacking: 'stacked'
		}, {
			type: 'spline',
			name: 'srážky ze mzdy',
			data: exekuce,
			color: colors[17],
			marker: {
				lineWidth: 2,
				lineColor: colors[17],
				fillColor: 'white',
				symbol: 'circle'
			}
		}, {
			type: 'spline',
			name: 'disponibilní příjem domácnosti',
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

	// vyhážu z grafu proměnné, které mají v celém průběhu nulovou hodnotu
	for (i = 0; i <= chart.series.length - 1; i++) {

		if(chart.series[i].processedYData.every(x => x == 0)) {

			chart.series[i].update({
				showInLegend: false
			});

			// line chart se chová jinak, je potřeba ho vyhodit z grafu zvlášť
			if (chart.series[i].name == 'srážky ze mzdy') {

				chart.series[i].remove();

			}

		}

	}

}