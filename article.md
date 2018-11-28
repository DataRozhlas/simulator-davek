title: "Čím víc si vyděláte, tím méně vám zbude. Kalkulačka sociálních dávek ukazuje absurditu exekucí"
perex: "Vyplatí se pracovat? Záleží na počtu dětí, výši nájmu nebo místě, kde žijete. Pokud ale máte exekuci, odpověď je téměř vždy ne. Datoví novináři iRozhlasu s neziskovkou Nová škola vytvořili model, kde si můžete nasimulovat libovolnou domácnost."
published: "28. listopadu 2018"
# autoři se zadávají až v redakčním systému
coverimg: https://www.irozhlas.cz/sites/default/files/styles/zpravy_snowfall/public/uploader/kalk_181128-005627_jab.png?itok=ctOM5F-0
coverimg_note: ""
styles: []
libraries: [jquery, highcharts]
options: []
---

<script type="text/javascript" src="https://code.highcharts.com/modules/annotations.js"></script>
<script type="text/javascript" src="./js/simulace.js"></script>
<script type="text/javascript" src="./js/formular.js"></script>
<script type="text/javascript" src="./js/grafy.js"></script>
<script type="text/javascript" src="./js/vypocty.js"></script>
<link rel="stylesheet" type="text/css" href="./styles/styles.css">
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">

Žijete s partnerem a dvěma malými dětmi v nájemním bytě v Chebu. Oba jste bez práce, vy navíc v exekuci. Dostanete nabídku práce za 30 tisíc hrubého. Přijmete ji?

Pokud ano, nepolepšíte si. V původní situaci sice nic nevyděláváte, ale máte nárok na dávky sociální péče a dávky v hmotné nouzi. Po zaplacení nájmu zbude na výdaje domácnosti 9 450 korun.

Jakmile začnete pracovat, sníží se dávky a zvýší exekuce. Při příjmu třicet tisíc hrubého rodině zůstane 9 452 korun, tedy o dvě koruny víc, než když neděláte nic.

Absurdní? Podle našeho modelu není tahle situace v Česku nijak neobvyklá. Naopak, u rodin v exekuci jde spíš o pravidlo: pracovat legálně se vyplatí málokomu.

U zmíněné rodiny se vyplatí pracovat pouze za minimální mzdu. Každá tisícovka hrubého navíc znamená _snížení_ skutečných příjmů rodiny o několik desítek korun. Nečekaný moment nastává při zvýšení hrubé mzdy z 19 na 20 tisíc: zvýšení hrubé mzdy o tisíc korun znamená o 1 239 korun nižší finální příjem rodiny.

V simulátoru sociálních dávek si můžete sami vyzkoušet, kdy má cenu pracovat. Kliknutí na tlačítko _Příjmy domácnosti × HPP_ ukáže graf příjmů: na ose x roste hrubý příjem, černá linka prozrazuje, kolik rodině skutečně zbude po zaplacení nájmu – takzvaný disponibilní příjem. Červená linka znázorňuje srážky ze mzdy v důsledku exekuce.

<div id="container">

  <div id="title">Simulátor sociálních dávek</div>

  <div id="upperwindow">
    <div><script>vypisSlozeni()</script></div>
  </div>

  <div id="middlewindowgroup">

    <div id="buttonwindowgroup">

      <div id="upperbuttonwindow">

        <h2 id="bw-title">Nastavení domácnosti</h2>

        <button class="bw-button" type="button" onclick="vyplnSlozeniDomacnosti()">Složení domácnosti </button>
        <button class="bw-button" type="button" onclick="vyplnPrijmyPrvnihoDospeleho()">Příjmy 1. dospělého</button>
        <button class="bw-button" type="button" onclick="vyplnPrijmyDruhehoDospeleho()">Příjmy 2. dospělého</button>
        <button class="bw-button" type="button" onclick="vyplnPrijmyTretihoDospeleho()">Příjmy 3. dospělého</button>
        <button class="bw-button" type="button" onclick="vyplnExekuce()">Exekuce</button>
        <button class="bw-button" type="button" onclick="vyplnNakladyNaBydleni()">Náklady na bydlení</button>
        <button class="bw-button" type="button" onclick="vyplnZadostODavky()">Odmítnutí dávky</button>

      </div>

      <div id="lowerbuttonwindow">

        <h2 id="bw-title">Výpočet</h2>

        <button class="bw-button" type="button" onclick="dynamickyModelujRodinu(1)"><strong>Příjmy domácnosti × HPP </strong></button>
        <button class="bw-button" type="button" onclick="dynamickyModelujRodinu(2)"><strong>Příjmy domácnosti × DPČ </strong></button>
        <button class="bw-button" type="button" onclick="dynamickyModelujRodinu(3)"><strong>Příjmy domácnosti × DPP </strong></button>
        <button class="bw-button" type="button" onclick="dynamickyModelujRodinu(4)"><strong>Příjmy domácnosti × nájem </strong></button>

      </div>

    </div>

    <div id="mainwindow">

      <div id="mw-text">

        <h2 id="bw-title">Klikněte na tlačítka pro nastavení parametrů domácnosti (vlevo nahoře) nebo výpočet dávek (vlevo dole)</h2>

      </div>

    </div>

  </div>

</div>

Tlačítka vlevo nahoře umožňují poskládat si vlastní domácnost: nastavte počet členů domácnosti a věk dětí, zvolte příjmy dospělých, důchody, nemocenskou nebo rodičovskou. Rozhodněte, zda rodina bydlí ve vlastním bytě, nájmu nebo na ubytovně, a přidejte exekuce.

Druhá série tlačítek ukáže graf: můžete sledovat, jak se na příjmech domácnosti projeví, že první dospělý začal pracovat na hlavní pracovní poměr, dohodu o pracovní činnosti nebo dohodu o provedení práce. V takovém případě nemá smysl vyplňovat příjmy prvního dospělého ve formuláři, ty se automaticky promítnou na osu x. Poslední tlačítko ukazuje, jak se na rozpočtu rodiny projeví výše nájmu.

Kliknutím do záhlaví grafu můžete libovolný příjem nebo výdaj vypnout. Tím srovnáte výši konkrétních položek.

Kalkulačka nepoužívá žádná data: vychází pouze ze zákonů, které stanoví pravidla pro účetnictví a výši sociálních dávek. Jejich složením do rovnic vznikl model, který poměrně detailně odráží realitu nízkopříjmových rodin.

## Poprosil šéfa, aby mu snížil plat. Jinak by přišel o byt.

„V rodině, se kterou jsem pracoval, měl muž dobře placenou práci,“ popisuje sociální pracovník Karel Novák situaci lidí v exekuci. „Spočítali si, že je potřeba domluvit se zaměstnavatelem snížení platu o pět tisíc, aby nepřišli o byt. Ve chvíli, kdy je exekuce na mzdu, je potřeba hodně dobře počítat, jestli se práce vyplatí.“

„Nejlepší strategie pro lidi, kteří jsou v exekuci, je mít nízký příjem a zároveň žádat o sociální dávky,“ potvrzuje Lucie Trlifajová, autorka studie Práce jako finanční a existenční riziko, která vychází právě z výpočtů modelu sociálních dávek.

A nejde jen o exekuce. Výsledky modelu ukazují, že podobný problém se týká také řady rodin, které se dlouhodobě pohybují pod hranicí chudoby přesto, že pracují. I u nich se nárůst hrubé mzdy často na finálním příjmu rodiny téměř neprojeví.

„Efekty systému jsou navíc obtížně předvídatelné a většina domácností s nimi neumí kalkulovat,“ dodává Trlifajová. „Zvlášť problematický dopad má jednorázové navýšení příjmu například díky odměně, které může vést k výraznému snížení nebo úplné ztrátě nároku na dávky. Domácnost pak kvůli nečekanému příjmu často nedokáže pokrýt náklady na bydlení a propadá se hlouběji do spirály dluhů, případně je přímo ohrožena ztrátou bydlení.“

Příčin problematického chování systému dávek je podle studie několik:

* Příliš nízko stanovená nezabavitelná částka pro osoby v exekuci. U insolvence a přednostních exekucí, které vznikají například v důsledku neplacení výživného, je maximální nezabavitelná částka 9 338 korun, u nepřednostních exekucí 12 451 korun. Obě se mohou navýšit o 1 556 korun za každou další osobu v domácnosti. To je maximum, které si člověk v exekuci může legálně vydělat.
* Daňový bonus na děti slouží jako motivace pro nástup do zaměstnání. Při jakékoliv exekuci se automaticky zabaví, takže finanční motivace pro nástup do práce zmizí. Rozdíl mezi prací a neprací je minimální.
* Nárok na sociální dávky se odvíjí od příjmu před uplatněním exekuce. Vyšší příjem znamená, že klesnou sociální dávky a vyrostou exekuce.
* Systém exekucí nebere v úvahu, že v různě velkých obcích jsou různé náklady na bydlení. Tam, kde jsou náklady na bydlení vyšší, se práce vyplatí méně.
* Další klíčová částka pro výpočty sociálních dávek – částka životního minima – je dlouhodobě silně podhodnocená. Ceny od roku 2012 vyrostly o 11 procentní bodů, životní minimum zůstalo stejné.

## „Stát trestá aktivitu,“ říkají klienti úřadů práce

Část těch, kteří mají nárok na dávky v hmotné nouzi, o ně navíc nežádá. Studie jejich podíl odhaduje na necelou třetinu. Obvykle neví, že mají na dávky nárok, nechtějí procházet komplikovaným a často nedůstojným procesem, nebo mají nějaký majetek či vlastní úspory. V takovém případě nemají na dávky ze zákona nárok.

„Nastavení systému prohlubuje zacyklenost Čechů v dluzích, protože neumožňuje legální vytváření úspor pro pokrytí nečekaných výdajů,“ vysvětluje Lucie Trlifajová z Centra pro společenské otázky.

„Analýza systému dávek ukazuje, že řada situací, které jsou mnohdy prezentovány jako individuální selhání, může být důsledkem nastavení systémů dávek, exekucí a daňového systému, které v určitých situacích sankcionuje aktivitu,“ dodává Trlifajová.

Současný systém podle ní často vyvolává u těch, kteří jsou na hraně hmotné nouze, pocit nespravedlnosti. „Stát podle nich nepodporuje ty, kteří se snaží a pracují – stát naopak trestá aktivitu,“ tvrdí.

„Je potřeba zdůraznit, jak významně se na příjmech podílejí exekuce, které jsou většinou nesmyslné, několikáté v pořadí,“ dodává Alena Zieglerová z Institutu pro sociální inkluzi. „Často jsou taky nezákonné – jen je nikdo nenapadl – a s připravovanou nepovedenou novelou insolvenčního zákona navíc doživotní.“

Podle [Mapy exekucí](http://mapaexekuci.cz/) je v současnosti exekuce uvalena na 863 tisíc Čechů, z toho více než polovina jich má tři a více.