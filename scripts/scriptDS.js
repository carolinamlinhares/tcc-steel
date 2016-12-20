/*jslint devel: true*/
/*global perfis */

// variables
var project, beam, vk, mk, lbForm, section, steel, fyForm, fuForm, EForm;
var ml, d, bf, tw, tf, h, dl, area, ix, wx, rx, zx, iy, wy, ry, zy, rt, it, mesa, alma, cw, u;
var fy, fu, E, aw, gama, gama1, cb, kv, lb, kc, tr, beta1, a, priority;
var lambV, lambpV, lambrV, vpl, vrd;
var mpl, lambA, lambpA, lambrA, mrA, mcrA, mrdA;
var lambM, lambpM, lambrM, mrM, mcrM, mrdM;
var lambT, lambpT, lambrT, mrT, mcrT, mrdT;
var vsd, msd, vrd, mrd, mrdOut, situationV, situationA, situationM, situationT, result;
var ratioDSV, ratioDSM, ratiopDSV, ratiopDSM;
var approved = [];
var suggestion = [];


var steelProp = [
    {
        "steelType": "ASTM A36/ MR250",
        "fy": 250,
        "fu": 400,
        "E": 200000
    },
    {
        "steelType": "ASTM A572 G50/ AR345",
        "fy": 345,
        "fu": 450,
        "E": 200000
    }
];

kv = 5; // "Enricejedor" not available Kv = 5 

function processFormDS() {
    "use strict";
    var i, j;

    // Getting project values from HTML form inputs
        
    project = document.formDS.projectDS.value;
    /* if (project === "") {
        alert("Por favor preencha o campo Projeto.");
     console.log("Por favor preencha o campo Projeto.");
        return false;
    } */
    if (project === "") {
        project = "Exemplo 1";
    }
        
    beam = document.formDS.beamDS.value;
    /* if (beam === "") {
        alert("Por favor preencha o campo Viga.");
        console.log("Por favor preencha o campo Viga.");
        return false;
    } */
    if (beam === "") {
        beam = "V1";
    }
        
    vk = Number(document.formDS.vDS.value);
    if (document.formDS.vDS.value === "" || isNaN(vk)) {
        alert("Por favor preencha o campo Cortante com números.");
        console.log("Por favor preencha o campo Cortante.");
        return false;
    }
        
    mk = Number(document.formDS.mDS.value);
    if (document.formDS.mDS.value === "" || isNaN(mk)) {
        alert("Por favor preencha o campo Momento com números.");
        console.log("Por favor preencha o campo Momento.");
        return false;
    }
        
    lbForm = Number(document.formDS.lbDS.value);
    if (document.formDS.lbDS.value === "" || isNaN(lbForm)) {
        alert("Por favor preencha o campo Distância entre travamentos laterais com números.");
        console.log("Por favor preencha o campo Distância entre travamentos laterais com números.");
        return false;
    }
        
    steel = steelProp[Number(document.formDS.typeS.value)].steelType;
    gama = Number(document.formDS.gama.value);
    gama1 = Number(document.formDS.gama1.value);
    cb = Number(document.formDS.cb.value);
    priority = document.formDS.priority.value;
    
    for (i = 0; i < perfis.length; i += 1) { //Looping through our available sections
        section = perfis[i].bitola;
    
        // START OF FUNCTION TO SAVE CHECK EACH SECTION
        
        // Getting section properties

        ml = perfis[i].ml;
        d = perfis[i].d;
        bf = perfis[i].bf;
        tw = perfis[i].tw;
        tf = perfis[i].tf;
        h = perfis[i].h;
        dl = perfis[i].dl;
        area = perfis[i].area;
        ix = perfis[i].ix;
        wx = perfis[i].wx;
        rx = perfis[i].rx;
        zx = perfis[i].zx;
        iy = perfis[i].iy;
        wy = perfis[i].wy;
        ry = perfis[i].ry;
        zy = perfis[i].zy;
        rt = perfis[i].rt;
        it = perfis[i].it;
        mesa = perfis[i].mesa;
        alma = perfis[i].alma;
        cw = perfis[i].cw;
        u = perfis[i].u;

        // Getting values from steel properties array
        j = Number(document.getElementById("acos").value);

        fyForm = steelProp[j].fy;
        fuForm = steelProp[j].fu;
        EForm = steelProp[j].E;
       
        // Calculating parameters 
        aw = (d * tw) / 100;
        lb = lbForm * 100;
        fy = fyForm / 10;
        fu = fuForm / 10;
        E = EForm / 10;
        beta1 = (0.7 * fy * wx) / (E * it);
        kc = 4 / Math.sqrt(h / tw);
        tr = 0.3 * fy;

        // Shear Vrd
        lambV = h / tw;
        lambpV = (1.1 * Math.sqrt(kv * E / fy));
        lambrV = (1.37 * Math.sqrt(kv * E / fy));
        vpl = 0.6 * fy * aw;

        if (lambV <= lambpV) {
            situationV = "Caso 1";
        } else if (lambpV < lambV && lambV <= lambrV) {
            situationV = "Caso 2";
        } else if (lambrV < lambV) {
            situationV = "Caso 3";
        } else {
            situationV = "Error";
        }

        switch (situationV) {
        case "Caso 1":
            vrd = vpl / gama1;
            break;
        case "Caso 2":
            vrd = (lambpV / lambV) * (vpl / gama1);
            break;
        case "Caso 3":
            vrd = 1.24 * Math.pow(lambpV / lambV, 2) * (vpl / gama1);
            break;
        }

        // Bending
        //FLA
        mpl = zx * fy;
        lambA = dl / tw; // lambA = h / tw;
        lambpA = 3.76 * Math.sqrt(E / fy);
        lambrA = 5.7 * Math.sqrt(E / fy);

        if (lambA <= lambpA) {
            situationA = "Caso 1";
        } else if (lambpA < lambA && lambA <= lambrA) {
            situationA = "Caso 2";
        } else if (lambrA < lambA) {
            situationA = "Caso 3";
        } else {
            situationA = "Error";
        }

        switch (situationA) {
        case "Caso 1":
            mrdA = mpl / gama1;
            break;
        case "Caso 2":
            mrA = 0.7 * fy * wx;
            mrdA = (cb / gama1) * (mpl - ((mpl - mrA) * ((lambA - lambpA) / (lambrA - lambpA))));
            break;
        case "Caso 3":
            // mcrA = Anexo H
            mrdA = mcrA / gama1;
            break;
        }

        //FLM
        lambM = mesa;
        lambpM = 0.38 * Math.sqrt(E / fy);
        lambrM = 0.83 * Math.sqrt(E / (fy - tr));

        if (lambM <= lambpM) {
            situationM = "Caso 1";
        } else if (lambpM < lambM && lambM <= lambrM) {
            situationM = "Caso 2";
        } else if (lambrM < lambM) {
            situationM = "Caso 3";
        } else {
            situationM = "Error";
        }

        switch (situationM) {
        case "Caso 1":
            mrdM = mpl / gama1;
            break;
        case "Caso 2":
            mrM = 0.7 * fy * wx;
            mrdM = (cb / gama1) * (mpl - ((mpl - mrM) * ((lambM - lambpM) / (lambrM - lambpM))));
            break;
        case "Caso 3":
            mcrM = ((0.69 * E) / (lambM * lambM)) * wx;
            mrdM = mcrM / gama1;
            break;
        }

        // FLT
        lambT = lb / ry;
        lambpT = 1.76 * Math.sqrt(E / fy);
        lambrT = ((1.38 * Math.sqrt(iy * it)) / (ry * it * beta1)) * Math.sqrt(1 + Math.sqrt(1 + (27 * cw * beta1 * beta1) / iy));

        if (lambT <= lambpT) {
            situationT = "Caso 1";
        } else if (lambpT < lambT && lambT <= lambrT) {
            situationT = "Caso 2";
        } else if (lambrT < lambT) {
            situationT = "Caso 3";
        } else {
            situationT = "Error";
        }

        switch (situationT) {
        case "Caso 1":
            mrdT = mpl / gama1;
            break;
        case "Caso 2":
            mrT = 0.7 * fy * wx;
            mrdT = (cb / gama1) * (mpl - ((mpl - mrT) * ((lambT - lambpT) / (lambrT - lambpT))));
            break;
        case "Caso 3":
            mcrT = ((cb * Math.PI * Math.PI * E * iy) / Math.pow(lb, 2)) * Math.sqrt((cw / iy) * (1 + 0.039 * (it * lb * lb) / cw));
            mrdT = mcrT / gama1;
            break;
        }

        //Compare & Results
        vsd = vk * gama;
        msd = mk * gama;
        mrd = Math.min(mrdA, mrdM, mrdT);
        mrdOut = mrd / 100;
        ratioDSV = vsd / vrd;
        ratioDSM = msd / mrdOut;
        ratiopDSV = ratioDSV * 100;
        ratiopDSM = ratioDSM * 100;

        if (vsd <= vrd && msd <= mrdOut) {
            result = "OK";
            approved.push({    // saves to a list of approved sections
                "perfil": perfis[i],
                "vrd": vrd,
                "mrdOut": mrdOut,
                "ratioDSV": ratioDSV,
                "ratioDSM": ratioDSM,
                "ratiopDSV": ratiopDSV,
                "ratiopDSM": ratiopDSM
            });
        } else {
            result = "Não OK";
        }

     // END OF FUNCTION TO SAVE CHECK EACH SECTION

    }

/*
    APPROVED: Printing a log to check
*/

    for (i = 0; i < approved.length; i += 1) { //Log of approved
        console.log(approved[i]);
    }
    
/*
    Suggestion list
*/
    switch (priority) {
    case "Maior aproveitamento quanto ao Esforço Cortante":
        approved.sort(function (a, b) {
            return a.ratioDSV - b.ratioDSV;
        });
        approved.reverse();
        for (i = 0; i < 5; i += 1) {
            suggestion[i] = approved[i];
        }
        break;
    case "Maior aproveitamento quanto ao Momento Fletor":
        approved.sort(function (a, b) {
            return a.ratioDSM - b.ratioDSM;
        });
        for (i = 0; i < 5; i += 1) {
            suggestion[i] = approved[i];
        }
        break;
    case "Menor base":
        approved.sort(function (a, b) {
            return a.perfis.bf - b.perfis.bf;
        });
        approved.reverse();
        for (i = 0; i < 5; i += 1) {
            suggestion[i] = approved[i];
        }
        break;
    case "Menor altura":
        approved.sort(function (a, b) {
            return a.perfis.d - b.perfis.d;
        });
        approved.reverse();
        for (i = 0; i < 5; i += 1) {
            suggestion[i] = approved[i];
        }
        break;
    case "Menor massa linear em cada família W/HP": //incompleto
        approved.sort(function (a, b) {
            return a.perfis.ml - b.perfis.ml;
        });
        for (i = 0; i < 5; i += 1) {
            suggestion[i] = approved[i];
        }
        break;
    case "Menor massa linear":
        approved.sort(function (a, b) {
            return a.perfis.ml - b.perfis.ml;
        });
        for (i = 0; i < 5; i += 1) {
            suggestion[i] = approved[i];
        }
        break;
    }
            
/*
    SUGGESTION: Printing a log to check
*/

    for (i = 0; i < suggestion.length; i += 1) { //Log of approved
        console.log(suggestion[i]);
    }
    
    
}

    
    
/*
    Cria um objeto aco
*/



var acoLista = document.getElementById("acos"),
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
