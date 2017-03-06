/*jslint devel: true*/
/*global perfis */

// variables
var project, beam, mk, concrete, steel;
var x, tsd, as, bw, fcd;
var betax23, betax34, epc, eps, epyd, fyd, Es, fck, fyk, fckForm, fykForm;
var d, h, cob, diamEstForm, diamLongForm, diamEst, diamLong, ncam, n;
var mk, msd, md;
var x2lim, x3lim, dominio;
var gamac, gamaf, gamas, s;
var result, situationD, situationLN, situationCG;
var armPele, resultArmPele;

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
    /*{
        "steelType": "CA25",
        "fy": 250,
        "fu": 217.4,
        "E": 21000
    },*/
    {
        "steelType": "CA50",
        "fy": 500,
        "fu": 434.8,
        "E": 21000
    }
    /*{
        "steelType": "CA60",
        "fy": 600,
        "fu": 521.7,
        "E": 21000
    }*/
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

function processFormCC() {
    "use strict";
    var i, j, k;

    // Getting values from HTML form inputs
    project = document.formCC.projectCC.value;
    /* if (project === "") {
        alert("Por favor preencha o campo Projeto.");
        console.log("Por favor preencha o campo Projeto.");
        return false;
    } */
    if (project === "") {
        project = "Exemplo 1";
    }
       
    beam = document.formCC.beamCC.value;
    /* if (beam === "") {
        alert("Por favor preencha o campo Viga.");
        console.log("Por favor preencha o campo Viga.");
        return false;
    } */
    if (beam === "") {
        beam = "V1";
    }
    
    h = Number(document.formCC.hCC.value);
    if (document.formCC.hCC.value === "" || isNaN(h)) {
        alert("Por favor preencha o campo Altura da Viga com números.");
        console.log("Por favor preencha o campo Altura da Viga.");
        return false;
    }
    
    bw = Number(document.formCC.bwCC.value);
    if (document.formCC.bwCC.value === "" || isNaN(bw)) {
        alert("Por favor preencha o campo Largura da Viga com números.");
        console.log("Por favor preencha o campo Largura da Viga.");
        return false;
    }
    
    as = Number(document.formCC.asCC.value);
    if (document.formCC.asCC.value === "" || isNaN(as)) {
        alert("Por favor preencha o campo Área de Aço com números.");
        console.log("Por favor preencha o campo Área de Aço.");
        return false;
    }
    
    d = Number(document.formCC.dCC.value);
    if (document.formCC.dCC.value === "" || isNaN(d)) {
        alert("Por favor preencha o campo Altura Útil com números.");
        console.log("Por favor preencha o campo Altura Útil.");
        return false;
    }
    
    /* ncam = Number(document.formCC.layerCC.value);
    if (document.formCC.layerCC.value === "" || isNaN(ncam)) {
        alert("Por favor preencha o campo Nº de Camadas com números.");
        console.log("Por favor preencha o campo Nº de Camadas.");
        return false;
    }
    
    if (Number.isInteger(ncam) === false) {
        alert("Por favor preencha o campo Nº de Camadas com números inteiros.");
        console.log("Por favor preencha o campo com valores inteiros.");
        return false;
    }
    
    n = Number(document.formCC.barsCC.value);
    if (document.formCC.barsCC.value === "" || isNaN(n)) {
        alert("Por favor preencha o campo Nº de Barras/Camadas com números.");
        console.log("Por favor preencha o campo Nº de Barras/Camadas.");
        return false;
    }
    
    if (Number.isInteger(n) === false) {
        alert("Por favor preencha o campo Nº de Barras/Camadas com números inteiros.");
        console.log("Por favor preencha o campo com valores inteiros.");
        return false;
    } */

    mk = Number(document.formCC.mCC.value);
    if (document.formCC.mCC.value === "" || isNaN(mk)) {
        alert("Por favor preencha o campo Momento com números.");
        console.log("Por favor preencha o campo Momento.");
        return false;
    }
    
    concrete = concreteProp[(document.formCC.concreteCC.value)].concType;
    steel = steelProp[(document.formCC.steelCC.value)].steelType;
    diamLongForm = bitola[Number(document.formCC.longCC.value)].diametro;
    diamEstForm = bitola[Number(document.formCC.estCC.value)].diametro;
    gamac = Number(document.formCC.gamacCC.value);
    gamaf = Number(document.formCC.gamafCC.value);
    gamas = Number(document.formCC.gamasCC.value);
    s = Number(document.formCC.sCC.value);
    cob = Number(document.formCC.cobCC.value);
        
    /*  // Getting bitolaLong properties
    i = Number(document.getElementById("bitolaLong").value);

    as = (bitola[i].area) * n * ncam; */
    
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
    
    // Calculating LN position
    x = (tsd * as) / (0.68 * bw * fcd);
    
    // Establishing Dominio limits
    betax23 = epc / (epc + eps);
    epyd = (fyd / Es) * 1000;
    betax34 = epc / (epc + epyd);
    
   /* // Calculating d (altura útil)
    
    d = h - (cob + diamEst + 0.5 * diamLong + ((ncam - 1) * (diamLong + s))); */
    
    // Verificação
    
    if (h - d >= cob + diamEst + 0.5 * diamLong) {
        situationCG = "Coerente";
    } else {
        situationCG = "Incoerente";
    }
    
    console.log("situationCG = " + situationCG);
      
    // Checking Dominio
    
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
    
    console.log("situationD = " + situationD);
    
    // Check x/d
    if (x / d <= 0.45) {
        situationLN = "Aprovada";
    } else {
        situationLN = "Reprovada";
    }
    
    console.log("situationLN = " + situationLN);
    
    // Calculating Bending
    md = 0.68 * bw * x * fcd * (d - 0.4 * x);
    
    // Results
    msd = mk * gamaf;
    
    if (situationCG === "Incoerente") {
        alert("A altura útil não está coerente com a altura da viga, cobrimento e bitolas utilizadas. Por favor, verifique os dados de entrada.");
    } else {
    
        if (msd <= (md + 0.05 * md) && situationD === "Aprovado" && situationLN === "Aprovada") {
            result = "A viga resiste ao momento fletor solicitado. Verifique o relatório  completo para obter o momento máximo que a viga resiste e garantir que a mesma seja econômica";
        } else if (msd <= (md + 0.05 * md) && situationD === "Aprovado" && situationLN === "Reprovada") {
            result = "A viga resiste ao momento fletor, mas não atende ao limite da linha neutra estabelecido em norma. Sugere-se aumentar a altura da viga.";
        } else {
            result = "A viga não resiste ao momento fletor solicitado. Sugere-se aumentar a seção transversal ou a resistência do concreto. Verifique o relatório para mais opções.";
        }
        alert(result);
    
        if (h > 60) {
            armPele = 0.001 * bw * h;
            resultArmPele = "É necessário utilizar armadura de pele com " + armPele + "cm² por face";
        } else {
            resultArmPele = "Não é necessário utilizar armadura de pele";
        }
        alert(resultArmPele);
        
    }
}

    

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
