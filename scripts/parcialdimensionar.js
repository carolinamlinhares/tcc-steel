/*jslint devel: true*/
/*global perfis */

// variables
var project, beam, mk, concrete, steel, estribo, bitola;
var tsd, as, bw, bwMin, bwMinNovo, fcd;
var betax23, betax34, epc, eps, epyd, fyd, Es, fck, fyk, fckForm, fykForm;
var d, h, cob, diamAgreg, agreg, diamEstForm, diamEst, diamAgregForm, diamLong, diamLongT, diamLongC;
var a, b, c, delta, deltaR, x1, x2;
var x, mk, md;
var x2lim, x3lim, dominio, dl;
var gamac, gamaf, gamas, s;
var situationD, situationLN;
var dlc, xd, m1d, m2d, tlsd, asl, as1, as2, ast, situationS, result;
var txCalc, txCalcT, txCalcC, inercia, wo, fctm, fctkSup, mdMin, astMin, astMinAbs, situationArmPele, armPele, situationTxMax;
var ac, av, ah, ahMin, ahT, ahC, ahSugg, ahSuggT, ahSuggC, sPele, resultP, resultTx, conditionTx, conditionEsp, conditionPele;
var nBarras, nBarrasNovo, nBarrasC, nBarrasT, nBarrasPele;
var asSugg, asSuggC, asSuggT, txCalcSugg, txCalcTSugg, txCalcCSugg, condition;
var arranjos = [];

var bitolaProp = [
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

var estriboProp = [
    {
        "diametro": 5.0,
        "area": 0.196349540849362
    },
    {
        "diametro": 6.3,
        "area": 0.311724531052447
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

var agregProp = [
    {
        "agregType": "Brita 0",
        "diametro": 9.5
       
    },
    {
        "agregType": "Brita 1",
        "diametro": 19.0
       
    },
    {
        "agregType": "Brita 2",
        "diametro": 25.0
       
    },
    {
        "agregType": "Brita 3",
        "diametro": 50.0
       
    },
    {
        "agregType": "Brita 4",
        "diametro": 76.0
       
    }
    
];

function processFormDC() {
    "use strict";
    var i, j, k, y, z;
    
    /* Clean suggestion array */
    arranjos = [];
   
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
    estribo = estriboProp[(document.formDC.estriboDC.value)].diametro;
    agreg = agregProp[(document.formDC.agregDC.value)].agregType;
    gamac = Number(document.formDC.gamacDC.value);
    gamaf = Number(document.formDC.gamafDC.value);
    gamas = Number(document.formDC.gamasDC.value);
    s = Number(document.formDC.sDC.value);
    cob = Number(document.formDC.cobDC.value);
    dl = Number(document.formDC.dlDC.value);
    dlc = Number(document.formDC.dlcDC.value);
    
    // Getting bitola properties
    i = +1; //Tá certo isso?
    bitola = bitolaProp[i].diametro;
    
    // Getting concrete properties
    j = Number(document.getElementById("concrete").value);
    fckForm = concreteProp[j].fckProp;
    
    // Getting steel properties
    k = Number(document.getElementById("steel").value);
    fykForm = steelProp[k].fy;
    Es = steelProp[k].E;
    
    //Getting estribo properties
    y = Number(document.getElementById("estribo").value);
    diamEstForm = estriboProp[y].diametro;
    
    //Getting aggregate properties
    z = Number(document.getElementById("agreg").value);
    diamAgregForm = agregProp[z].diametro;
    
    // Converting Units 
    fyk = fykForm / 10;
    fck = fckForm / 100;
    diamEst = diamEstForm / 10;
    diamAgreg = diamAgregForm / 10;
    
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
        
        //CÁLCULO DA ARMADURA MÍNIMA DE TRAÇÃO
        inercia = (b * Math.pow(h, 3)) / 12;
        wo = inercia / (h - x);
        fctm = 0.3 * Math.pow(fck, (2 / 3));
        fctkSup = 1.3 * fctm;
        mdMin = 0.8 * wo * fctkSup;
        astMin = mdMin / (tsd * (d - 0.4 * x));
        if (as < astMin) {
            as = astMin;
        }
        resultP = "PARCIAL: Área de aço = " + as + "cm²";
        alert(resultP);
     
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
        
        //CÁLCULO DA ARMADURA MÍNIMA DE TRAÇÃO
        inercia = (bw * Math.pow(h, 3)) / 12;
        wo = inercia / (h - xd);
        fctm = 0.3 * Math.pow(fck, (2 / 3));
        fctkSup = 1.3 * fctm;
        mdMin = 0.8 * wo * fctkSup;
        astMin = mdMin / (tsd * (d - 0.4 * xd));
        if (ast < astMin) {
            ast = astMin;
        }
        
        //Resultados
        resultP = "PARCIAL: Área de aço comprimida = " + asl + "cm². Área de aço tracionada = " + ast + "cm².";
        alert(resultP);
        
    } //NOVO
         
    //CÁLCULO DA TAXA DE ARMADURA
    ac = bw * h;
    
    if (situationS === "Simples") {
        txCalc = (as / ac) * 100;
        if ((txCalc >= 0.14) && (txCalc <= 4.0)) {
            resultTx = "OK";
        } else {
            resultTx = "Taxa Simples Reprovada.";
        }
    } else if (situationS === "Dupla") {
        txCalcT = (ast / ac) * 100;
        txCalcC = (asl / ac) * 100;
        txCalc = txCalcT + txCalcC;
        if ((txCalc >= 0.14) && (txCalc <= 4.0)) {
            resultTx = "OK";
        } else {
            resultTx = "Taxa Dupla Reprovada.";
        }
    }
    
    //Arranjos
    switch (situationS) {
    case "Simples":
        for (i = 0; i < bitola.length; i += 1) {
            nBarras = Math.ceil(as / (bitola[i].area));
            console.log(i);
            console.log(nBarras);
            asSugg = nBarras * bitola[i].area;
            txCalcSugg = (asSugg / ac) * 100;
            
            //Verificar taxa max CONDITION
            if ((txCalcSugg >= 0.14) && (txCalcSugg <= 4.0)) {
                conditionTx = "OK";
            } else {
                conditionTx = "Reprovado";
            }
            
            //Verificar viabilidade espacamento CONDITION
            
            ahMin = Math.max(2, arranjos[i].diametro, 1.2 * diamAgreg);
            bwMin = 2 * cob + nBarras * arranjos[i].diametro + (nBarras - 1) * ahMin + 2 * diamEst;
            
            
            if (bw >= bwMin) {
                conditionEsp = "ah OK";
            } else {
                conditionEsp = "ah insuficiente";
                nBarrasNovo = Math.ceil(nBarras / 2);
                
                //No lugar de "2", colocar nCamadas, pois a divisão é pelo nº de camadas, que pode ser maior que "2". Mas tem que colocar no caso o "i+1".
                
                bwMinNovo = 2 * cob + nBarrasNovo * arranjos[i].diametro + (nBarrasNovo - 1) * ahMin + 2 * diamEst;
                if (bw >= bwMin) {
                    conditionEsp = "ah OK"; //Seria mais interessante fazer um "for" para que o cálculo se repita quando não couber?
                }
            }
            
            if (conditionEsp === "ah OK") {
                ahSugg = ahMin;
            }
            
            if ((conditionTx === "OK") && (conditionEsp === "OK")) {
                arranjos.push({
                    "bitola": bitola[i],
                    "area": bitola[i].area,
                    "qtd": nBarras,
                    "as": asSugg,
                    "taxa": txCalcSugg,
                    "esp": ahSugg
                });
            }
        }
        //CÁLCULO DA ARMADURA DE PELE
        if (h <= 60) {
            situationArmPele = "Não";
        } else {
            situationArmPele = "Sim";
            armPele = 0.0005 * ac;
            
            //CÁLCULO DO ARRANJO DA ARMADURA DE PELE
            //Espaçamento entre barras deve ser não mais que 20cm e sua área não deve exceder 5cm²/m por face. Usar CA-50 ou CA-60
            for (i = 0; i < arranjos.length; i += 1) {
                nBarrasPele = armPele / diamEst;
                sPele = h - (2 * (cob + diamEst) + arranjos[i].bitola);
                if (((sPele - (nBarrasPele * arranjos[i].bitola)) / (nBarrasPele + 1)) <= 20) {
                    if (((nBarrasPele * arranjos[i].area) / (h / 100)) <= 5) {
                        conditionPele = "OK";
                        // ADICIONAR PROPRIEDADE
                    }
                }
            }
            
                
        }
        result = "Pode ser usada armadura com " + arranjos[0].qtd + "Ø" + arranjos[0].bitola + ". Confira relatório para os detalhes do dimensionamento e outras opções de armaduras.";
        alert(result);
        break;
    case "Dupla":
        for (i = 0; i < bitola.length; i += 1) {
            //diamLongT = bitola[i].diametro;    Precisa definir, sendo que comprimida e tracionada podem ser diferentes!!!
            //diamLongC = bitola[i].diametro;
            nBarrasC = Math.ceil(asl / (bitola[i].area));
            nBarrasT = Math.ceil(ast / (bitola[i].area));
            asSuggC = nBarrasC * bitola[i].area;
            asSuggT = nBarrasT * bitola[i].area;
            txCalcTSugg = (asSuggC / ac) * 100;
            txCalcCSugg = (asSuggT / ac) * 100;
            txCalcSugg = txCalcCSugg + txCalcTSugg;
            //Verificar taxa max CONDITION
            if ((txCalcTSugg >= 0.14) && (txCalcSugg <= 0.4)) {
                conditionTx = "OK";
            } else {
                conditionTx = "Reprovado";
            }
            txCalcSugg = txCalcTSugg + txCalcCSugg;
            
            //Verificar viabilidade espacamento CONDITION
            ahT = (bw - 2 * (cob + estribo[0].diametro) - (nBarrasT * bitola[i].area)) / (nBarrasT - 1);
            ahC = (bw - 2 * (cob + estribo[0].diametro) - (nBarrasC * bitola[i].area)) / (nBarrasC - 1);
            if (ahT >= 2 && ahT >= diamLongT && ahT >= 1.2 * diamAgreg && ahC >= 2 && ahC >= diamLongC && ahC >= 1.2 * diamAgreg) {
                conditionEsp = "ah OK";
            } else {
                conditionEsp = "ah insuficiente";
            }
            
            if (conditionEsp === "ah OK") {
                ahSuggT = Math.min(2, diamLongT, (1.2 * diamAgreg));     //E se der Não OK?????
                ahSuggC = Math.min(2, diamLongC, (1.2 * diamAgreg));
            }
            
            if ((conditionTx === "OK") && (conditionEsp === "OK")) {
                arranjos.push({
                    "bitola": bitola[i],
                    "area": bitola[i].area,
                    "qtdC": nBarrasC,
                    "qtdT": nBarrasT,
                    "asC": asSuggC,
                    "asT": asSuggT,
                    "taxaC": txCalcCSugg,
                    "taxaT": txCalcTSugg,
                    "espC": ahSuggC,
                    "espT": ahSuggT
                });
            }
        }
        result = "Pode ser usada armadura com " + arranjos[0].qtdC + "Ø" + arranjos[0].bitola + " para a armadura comprimida. E " + arranjos[0].qtdT + "Ø" + arranjos[0].bitola + " para a armadura tracionada. Confira relatório para os detalhes do dimensionamento e outras opções de armaduras.";
        alert(result);
        break;
    }

            
        
    
       
}
    
            
  /*  
   CRIACAO DE VARIAVEL PARA MANDAR VIA URL PARA RELATORIO
 */

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

var acoLista = document.getElementById("steel"),
    concretoLista = document.getElementById("concrete"),
    i;
    
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
