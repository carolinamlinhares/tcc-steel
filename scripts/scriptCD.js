/*jslint devel: true*/
/*global perfis */

// variables
var project, beam, mk, concrete, steel;
var tsd, as, bw, fcd;
var betax23, betax34, epc, eps, epyd, fyd, Es, fck, fyk, fckForm, fykForm;
var d, h, cob, diamEstForm, diamLongTForm, diamLongCForm, diamEst, diamLongT, diamLongC;
var a, b, c, delta, deltaR, x1, x2;
var x, mk, md;
var x2lim, x3lim, dominio, dl;
var gamac, gamaf, gamas, s;
var situationD, situationLN;
var dlc, xd, m1d, m2d, tlsd, asl, as1, as2, ast, situationS, result;
var astcalc, asccalc, ncamC, ncamT;

var nBarras, nBarrasC, nBarrasT;
var arranjos = [];

var bitola = [
    {
        "diametro": 5.0,
        "area": 0.196349540849362
    },
    {
        "diametro": 6.3,
        "area": 0.311724531052447
    },
    {
        "diametro": 8.0,
        "area": 0.502654824574367
    },
    {
        "diametro": 10.0,
        "area": 0.785398163397448
    },
    {
        "diametro": 12.5,
        "area": 1.22718463030851
    },
    {
        "diametro": 16.0,
        "area": 2.01061929829747
    },
    {
        "diametro": 20.0,
        "area": 3.80132711084365
    },
    {
        "diametro": 25.0,
        "area": 4.90873852123405
    },
    {
        "diametro": 32.0,
        "area": 8.04247719318987
    },
    {
        "diametro": 40.0,
        "area": 12.5663706143592
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

function processFormCD() {
    "use strict";
    var i, j, k, w;
    
    /* Clean suggestion array */
    arranjos = [];
   
    // Getting values from HTML form inputs
    project = document.formCD.projectCD.value;
    /* if (project === "") {
        alert("Por favor preencha o campo Projeto.");
        console.log("Por favor preencha o campo Projeto.");
        return false;
    } */
    if (project === "") {
        project = "Exemplo 1";
    }
       
    beam = document.formCD.beamCD.value;
    /* if (beam === "") {
        alert("Por favor preencha o campo Viga.");
        console.log("Por favor preencha o campo Viga.");
        return false;
    } */
    if (beam === "") {
        beam = "V1";
    }
    
    h = Number(document.formCD.hCD.value);
    if (document.formCD.hCD.value === "" || isNaN(h)) {
        alert("Por favor preencha o campo Altura da Viga com números.");
        console.log("Por favor preencha o campo Altura da Viga.");
        return false;
    }
    
    bw = Number(document.formCD.bwCD.value);
    if (document.formCD.bwCD.value === "" || isNaN(bw)) {
        alert("Por favor preencha o campo Largura da Viga com números.");
        console.log("Por favor preencha o campo Largura da Viga.");
        return false;
    }
    
    ncamT = Number(document.formCD.layerTCD.value);
    if (document.formCD.layerTCD.value === "" || isNaN(bw)) {
        alert("Por favor preencha o campo Nº de camadas tracionadas com números.");
        console.log("Por favor preencha o Nº de camadas tracionadas.");
        return false;
    }
    
    nBarrasT = Number(document.formCD.barsTCD.value);
    if (document.formCD.barsTCD.value === "" || isNaN(bw)) {
        alert("Por favor preencha o campo Nº de barras com números.");
        console.log("Por favor preencha o Nº de barras.");
        return false;
    }
    
    ncamC = Number(document.formCD.layerCCD.value);
    if (document.formCD.layerCCD.value === "" || isNaN(bw)) {
        alert("Por favor preencha o campo Nº de camadas comprimidas com números.");
        console.log("Por favor preencha o Nº de camadas comprimidas.");
        return false;
    }
    
    nBarrasC = Number(document.formCD.barsCCD.value);
    if (document.formCD.barsCCD.value === "" || isNaN(bw)) {
        alert("Por favor preencha o campo Nº de barras com números.");
        console.log("Por favor preencha o Nº de barras.");
        return false;
    }
    
    mk = Number(document.formCD.mCD.value);
    if (document.formCD.mCD.value === "" || isNaN(mk)) {
        alert("Por favor preencha o campo Momento com números.");
        console.log("Por favor preencha o campo Momento.");
        return false;
    }
    
    concrete = concreteProp[(document.formCD.concreteCD.value)].concType;
    steel = steelProp[(document.formCD.steelCD.value)].steelType;
    diamLongTForm = bitola[Number(document.formCD.longTCD.value)].diametro;
    diamLongCForm = bitola[Number(document.formCD.longCCD.value)].diametro;
    diamEstForm = bitola[Number(document.formCD.estCD.value)].diametro;
    gamac = Number(document.formCD.gamacCD.value);
    gamaf = Number(document.formCD.gamafCD.value);
    gamas = Number(document.formCD.gamasCD.value);
    s = Number(document.formCD.sCD.value);
    cob = Number(document.formCD.cobCD.value);
    dl = Number(document.formCD.dlCD.value);
    dlc = Number(document.formCD.dlcCD.value);
        
    // Getting bitolaLong properties
    i = Number(document.getElementById("bitolaLongT").value);
    w = Number(document.getElementById("bitolaLongC").value);
    
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
    diamLongT = diamLongTForm / 10;
    diamLongC = diamLongCForm / 10;
    
    // Calculating parameters
    fcd = fck / gamac;
    fyd = fyk / gamas;
    tsd = fyd;
    epc = 3.5;
    eps = 10.0;
    
    //CÁLCULO DO MOMENTO FLETOR MAJORADO
    md = mk * gamaf;

    //CÁLCULO DA ALTURA ÚTIL (d)
    d = h - dl;
    
    //CÁLCULO DOS LIMITES DOS DOMÍNIOS 2 E 3
    //DOMÍNIO 2
    betax23 = epc / (epc + eps);
   
    //DOMÍNIO 3
    epyd = (fyd / Es) * 1000;
    betax34 = epc / (epc + epyd);
    
    //CÁLCULO DA POSIÇÃO DA LINHA NEUTRA (x)
    //md = 0.68*bw*x*fcd*(d-0.4*x);
    //(0.4*x^2)+(d*x)+(md/(0.68*bw*fcd))=0
	
    a = 0.4;
    b = -1 * d;
    c = md / (0.68 * bw * fcd);
    delta = Math.pow(b, 2) - ((4 * a) * c);
    
    if (delta > 0) {
	    deltaR = Math.sqrt(delta);
	    x1 = ((-b +  deltaR)  / (2 * a));
	    x2 = ((-b -  deltaR)  / (2 * a));
    } else {
        x1 = ("Sem raiz");
		x2 = ("Sem raiz");
    }
    
    if (x1 > h) {
        x = x2;
    } else {
        x = x1;
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

    if (situationD === "Aprovado" && situationLN === "Aprovada") {
        situationS = "Simples";
	    as = md / (tsd * (d - 0.4 * x));
        alert(as);
     
    } else {
        situationS = "Dupla";
        
        //Cálculo da nova posição da LN
        xd = 0.45 * d;
        
        //Cálculo de M1d
        m1d = 0.68 * bw * xd * fcd * (d - 0.4 * xd);
        
        //Cálculo de M2d
        m2d = md - m1d;
        
        //Encontrar valor de tlsd na tabela (!!!!)
        tlsd = 43.5;
            
        //Encontrar área de aço comprimida A's
        asl = m2d / (tlsd * (d - dlc));
        
        //Encontrar área de aço tracionada As
        as1 = m1d / (tsd * (d - 0.4 * xd));
        as2 = m2d / (tsd * (d - dlc));
        ast = as1 + as2;
        
        //Calcular Área de Aço Utilizada na Viga em Verificação
        astcalc = nBarrasT * ncamT * bitola[i].area;
        asccalc = nBarrasC * ncamC * bitola[w].area;
        if (astcalc >= ast && asccalc >= asl) {
            result = "A viga resiste ao momento fletor solicitado";
            alert(result);
        } else {result = "A viga não resiste ao momento fletor solicitado";
                alert(result);
               }
                
        //result = "Área de aço comprimida = " + asl + "cm². Área de aço tracionada = " + ast + "cm².";
        //alert(result);
        
        //Arranjos
        if (situationS === "Simples") {
            for (i = 0; i < arranjos.length; i += 1) { //Log of approved
                console.log(arranjos[i]);
                nBarras = as / (bitola[i].area);
            }
        } else {
            for (i = 0; i < arranjos.length; i += 1) { //Log of approved
                console.log(arranjos[i]);
                nBarrasC = asl / (bitola[i].area);
                nBarrasT = ast / (bitola[i].area);
            }
        }
                    
        arranjos.push({    // saves to a list of approved sections
            "bitola": bitola[i],
            "area": bitola[i].area,
            "nº de barras": nBarras

        });
        
    }
       
}
    
            
  /*  
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

var bitolaLista1 = document.getElementById("bitolaLongT"),
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

var bitolaLista3 = document.getElementById("bitolaLongC"),
    acoLista = document.getElementById("steel"),
    concretoLista = document.getElementById("concrete"),
    w;
    
for (w = 0; w < bitola.length; w += 1) {
    bitolaLista3.appendChild(criarBitola(bitola[w].diametro, w));
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
