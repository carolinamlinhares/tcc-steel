/*jslint devel: true*/
/*global perfis */

// variables
var project, beam, mk, concrete, steel;
var tsd, as, bw, fcd;
var betax23, betax34, epc, eps, epyd, fyd, Es, fck, fyk, fckForm, fykForm;
var d, h, cob, diamEstForm, diamLongForm, diamEst, diamLong;
var a, b, c, delta, deltaR, x1, x2;
var x, mk, md;
var x2lim, x3lim, dominio, dl;
var gamac, gamaf, gamas, s;
var result, situationD, situationLN;

var bitola = [
    {
        "diametro": 5.0,
        "area": 0.20
    },
    {
        "diametro": 6.3,
        "area": 0.315
    },
    {
        "diametro": 8.0,
        "area": 0.50
    },
    {
        "diametro": 10.0,
        "area": 0.80
    },
    {
        "diametro": 12.5,
        "area": 1.25
    },
    {
        "diametro": 16.0,
        "area": 2.0
    },
    {
        "diametro": 20.0,
        "area": 3.15
    },
    {
        "diametro": 25.0,
        "area": 5.0
    },
    {
        "diametro": 32.0,
        "area": 8.0
    },
    {
        "diametro": 40.0,
        "area": 12.50
    }
    
];

var steelProp = [
    {
        "steelType": "CA25",
        "fy": 250,
        "fu": 217.4,
        "E": 21000
    },
    {
        "steelType": "CA50",
        "fy": 500,
        "fu": 434.8,
        "E": 21000
    },
    {
        "steelType": "CA60",
        "fy": 600,
        "fu": 521.7,
        "E": 21000
    }
];

var concreteProp = [
    {
        "concType": "C20",
        "fckProp": 200
    },
    {
        "concType": "C25",
        "fckProp": 250
    },
    {
        "concType": "C30",
        "fckProp": 300
    },
    {
        "concType": "C35",
        "fckProp": 350
    },
    
    {
        "concType": "C40",
        "fckProp": 400
    },
    {
        "concType": "C45",
        "fckProp": 450
    },
    {
        "concType": "C50",
        "fckProp": 500
    }

];

function processFormDC() {
    "use strict";
    var i, j, k;

    // Getting values from HTML form inputs
    project = document.formDC.projectDC.value;
    /* if (project === "") {
        alert("Por favor preencha o campo Projeto.");
        console.log("Por favor preencha o campo Projeto.");
        return false;
    } */
    if (project === "") {
        project = "Exemplo 1";
    }
       
    beam = document.formDC.beamDC.value;
    /* if (beam === "") {
        alert("Por favor preencha o campo Viga.");
        console.log("Por favor preencha o campo Viga.");
        return false;
    } */
    if (beam === "") {
        beam = "V1";
    }
    
    h = Number(document.formDC.hDC.value);
    if (document.formDC.hDC.value === "" || isNaN(h)) {
        alert("Por favor preencha o campo Altura da Viga com números.");
        console.log("Por favor preencha o campo Altura da Viga.");
        return false;
    }
    
    bw = Number(document.formDC.bwDC.value);
    if (document.formDC.bwDC.value === "" || isNaN(bw)) {
        alert("Por favor preencha o campo Largura da Viga com números.");
        console.log("Por favor preencha o campo Largura da Viga.");
        return false;
    }
    
    mk = Number(document.formDC.mDC.value);
    if (document.formDC.mDC.value === "" || isNaN(mk)) {
        alert("Por favor preencha o campo Momento com números.");
        console.log("Por favor preencha o campo Momento.");
        return false;
    }
    
    concrete = concreteProp[(document.formDC.concreteDC.value)].concType;
    steel = steelProp[(document.formDC.steelDC.value)].steelType;
    diamLongForm = bitola[Number(document.formDC.longDC.value)].diametro;
    diamEstForm = bitola[Number(document.formDC.estDC.value)].diametro;
    gamac = Number(document.formDC.gamacDC.value);
    gamaf = Number(document.formDC.gamafDC.value);
    gamas = Number(document.formDC.gamasDC.value);
    s = Number(document.formDC.sDC.value);
    cob = Number(document.formDC.cobDC.value);
        
    // Getting bitolaLong properties
    i = Number(document.getElementById("bitolaLong").value);

        // Getting concrete properties
    j = Number(document.getElementById("concrete").value);
    
    fckForm = concreteProp[j].fckProp;
    
    // Getting steel properties
    k = Number(document.getElementById("steel").value);
    
    fykForm = steelProp[k].fy;
    Es = steelProp[k].E;
    
    // Converting Units 
    fyk = fykForm / 10;
    fck = fckForm / 100;
    diamEst = diamEstForm / 10;
    diamLong = diamLongForm / 10;
    
    // Calculating parameters
    fcd = fck / gamac;
    fyd = fyk / gamas;
    tsd = fyd;
    epc = 3.5;
    eps = 10.0;
    
    //CÁLCULO DO MOMENTO FLETOR MAJORADO

    md = mk * gamaf;

    //CÁLCULO DA ALTURA ÚTIL (d)

    d = h-dl;
    dl = 3.0; //(estimar valor entre 3 e 6 cm)/

    //CÁLCULO DOS LIMITES DOS DOMÍNIOS 2 E 3

    //DOMÍNIO 2
    betax23 = epc/(epc+eps)
   
    //DOMÍNIO 3
    epyd = (fyd/Es)*1000;
    betax34 = epc/(epc+epyd);
    
    //CÁLCULO DA POSIÇÃO DA LINHA NEUTRA (x)
    //md = 0.68*bw*x*fcd*(d-0.4*x);
    //(0.4*x^2)+(d*x)+(md/(0.68*bw*fcd))=0
    
    a = 0.4;
    b = -1*d;
    c = md/(0.68*bw*fcd);
    delta = Math.pow(b , 2) - ((4 * a)*c);
    
    if( delta > 0){
	deltaR = Math.sqrt(delta);
	x1 = ((-b +  deltaR)  /(2 * a));
	x2 = ((-b -  deltaR)  /(2 * a));
		    	}
                else{
			x1 = ("Sem raiz");
			x2 = ("Sem raiz");
                    }
    
    if (x1 > h) {
        x = x2
                }
            else{
            x = x1
                }
    //VERIFICAÇÃO DO DOMÍNIO DA VIGA

    x2lim = betax23 * d;
    x3lim = betax34 * d;
    
    if (x > x2lim && x < x3lim) {
        dominio = "Domínio 3";
        situationD = "Aprovado";
    } else if (x < x2lim) {
        dominio = "Domínio 2";
        situationD = "Aprovado";
    } else if (x > x3lim) {
        dominio = "Domínio 4";
        situationD = "Reprovado";
    } else {
        dominio = "Error";
    }

    //VERIFICAÇÃO DA RELAÇÃO x/d

    if (x / d <= 0.45) {
        situationLN = "Aprovada";
    } else {
        situationLN = "Reprovada";
    }

    //CÁLCULO DA ÁREA DE AÇO

    as = md/(d-0.4*x);
    result = as;
    alert(result);
    
}
    
            
  /*  
   
    var resultado = 
        {
            "project":project,
            "beam":beam,
            "vk":vk,
            "mk":mk,
            "lbForm":lbForm,
            "section":section,
            "steel":steel,
            "fyForm":fyForm,
            "fuForm":fuForm,
            "EForm":EForm,
            "ml":ml,
            "d":d,
            "bf":bf,
            "tw":tw,
            "tf":tf,
            "h":h,
            "dl":dl,
            "area":area,
            "ix":ix,
            "wx":wx,
            "rx":rx,
            "zx":zx,
            "iy":iy,
            "wy":wy,
            "ry":ry,
            "zy":zy,
            "rt":rt,
            "it":it,
            "mesa":mesa,
            "alma":alma,
            "cw":cw,
            "u":u,
            "fy":fy,
            "fu":fu,
            "E":E,
            "aw":aw,
            "gama":gama,
            "gama1":gama1,
            "cb":cb,
            "kv":kv,
            "lb":lb,
            "kc":kc,
            "tr":tr,
            "beta1":beta1,
            "a":a,
            "lambV":lambV,
            "lambpV":lambpV,
            "lambrV":lambrV,
            "vpl":vpl,
            "vrd":vrd,
            "mpl":mpl,
            "lambA":lambA,
            "lambpA":lambpA,
            "lambrA":lambrA,
            "mrA":mrA,
            "mcrA":mcrA,
            "mrdA":mrdA,
            "lambM":lambM,
            "lambpM":lambpM,
            "lambrM":lambrM,
            "mrM":mrM,
            "mcrM":mcrM,
            "mrdM":mrdM,
            "lambT":lambT,
            "lambpT":lambpT,
            "lambrT":lambrT,
            "mrT":mrT,
            "mcrT":mcrT,
            "mrdT":mrdT,
            "vsd":vsd,
            "msd":msd,
            "vrd":vrd,
            "mrd":mrd,
            "mrdOut":mrdOut,
            "situationV":situationV,
            "situationA":situationA,
            "situationM":situationM,
            "situationT":situationT,
            "result":result,
            "ratioCSV":ratioCSV,
            "ratioCSM":ratioCSM,
            "ratiopCSV":ratiopCSV,
            "ratiopCSM":ratiopCSM
        };
    
    document.getElementById("botaoRelatorio").href = "reportCS.html?test=" + JSON.stringify(resultado);
} */

/*
    Cria um objeto bitola
*/
function criarBitola(nomeBitola, linhaBitola) {
    "use strict";
    var opcao = document.createElement("OPTION"),
        texto = document.createTextNode(nomeBitola);
    opcao.value = linhaBitola;
    opcao.appendChild(texto);
    return opcao;
}

var bitolaLista1 = document.getElementById("bitolaLong"),
    bitolaLista2 = document.getElementById("bitolaEst"),
    acoLista = document.getElementById("steel"),
    concretoLista = document.getElementById("concrete"),
    i;
    
for (i = 0; i < bitola.length; i += 1) {
    bitolaLista1.appendChild(criarBitola(bitola[i].diametro, i));
}
        
for (i = 0; i < bitola.length; i += 1) {
    bitolaLista2.appendChild(criarBitola(bitola[i].diametro, i));
}

function criarAco(nomeAco, linhaAco) {
    "use strict";
    var opcao = document.createElement("OPTION"),
        texto = document.createTextNode(nomeAco);
    opcao.value = linhaAco;
    opcao.appendChild(texto);
    return opcao;
}
    
for (i = 0; i < steelProp.length; i += 1) {
    acoLista.appendChild(criarAco(steelProp[i].steelType, i));
}

function criarConcreto(nomeConcreto, linhaConcreto) {
    "use strict";
    var opcao = document.createElement("OPTION"),
        texto = document.createTextNode(nomeConcreto);
    opcao.value = linhaConcreto;
    opcao.appendChild(texto);
    return opcao;
}
    
for (i = 0; i < concreteProp.length; i += 1) {
    concretoLista.appendChild(criarConcreto(concreteProp[i].concType, i));
}
