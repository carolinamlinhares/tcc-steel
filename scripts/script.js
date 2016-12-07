/*jslint devel: true*/
/*global perfis */

// variables
var project, beam, v, m, lbForm, section, steel, fyForm, fuForm, EForm, ml, d, bf, tw, tf, h, dl, area, ix, wx, rx, zx, iy, wy, ry, zy, rt, it, mesa, alma, cw, u, fy, fu, E, aw, gama, gama1, cb, kv, lb, kc, tr, wc, beta1, a, lambV, lambpV, lambrV, vpl, vrd, mpl, lambA, lambpA, lambrA, mrA, mcrA, mrdA, lambM, lambpM, lambrM, mrM, mcrM, mrdM, lambT, lambpT, lambrT, mrT, mcrT, mrdT, vsd, msd, vrd, mrd, mrdOut, situationV, situationA, situationM, situationT, result;

var steelProp = [
    {
        "steelType": "ASTM A36/ MR250",
        "fu": 250,
        "fy": 400,
        "E": 200000
    },
    {
        "steelType": "ASTM A572 G50/ AR345",
        "fu": 345,
        "fy": 450,
        "E": 200000
    },
    {
        "steelType": "ASTM A572 G50/ AR345",
        "fu": 345,
        "fy": 450,
        "E": 200000
    }
];

function processFormCS() {
    "use strict";
    var i, j;

    // Getting values from HTML form inputs
    project = document.formCS.projectCS.value;
    if (project === "") {
        alert("Por favor preencha o campo Projeto.");
        console.log("Por favor preencha o campo Projeto.");
        return false;
    }
    beam = document.formCS.beamCS.value;
    if (beam === "") {
        alert("Por favor preencha o campo Viga.");
        console.log("Por favor preencha o campo Viga.");
        return false;
    }
    v = Number(document.formCS.vCS.value);
    if (document.formCS.vCS.value === "" || isNaN(v)) {
        alert("Por favor preencha o campo Cortante com números.");
        console.log("Por favor preencha o campo Cortante.");
        return false;
    }
    m = Number(document.formCS.mCS.value);
    if (document.formCS.mCS.value === "" || isNaN(m)) {
        alert("Por favor preencha o campo Momento com números.");
        console.log("Por favor preencha o campo Momento.");
        return false;
    }
    lbForm = Number(document.formCS.lbCS.value);
    if (document.formCS.lbCS.value === "" || isNaN(lbForm)) {
        alert("Por favor preencha o campo Distância entre travamentos laterais com números.");
        console.log("Por favor preencha o campo Distância entre travamentos laterais com números.");
        return false;
    }
    section = perfis[Number(document.formCS.sectionS.value)].bitola;
    steel = document.formCS.typeS.value;
    a = Number(document.formCS.aCS.value);
    gama = Number(document.formCS.gama.value);
    gama1 = Number(document.formCS.gama1.value);
    cb = Number(document.formCS.cb.value);
    
    // Getting section properties
    i = Number(document.getElementById("bitola").value);

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
    
    // Calculating kv
    if (((a / h) > 3) || ((a / h) > Math.pow(260 / (h / tw), 2)) || (document.getElementById("stiffeningCS").checked === true)) {
        kv = 5;
    } else {
        kv = 5 + 5 / (Math.pow(a / h, 2));
    }
    
    // Calculating parameters 
    aw = d * tw;
    lb = lbForm * 100;
    beta1 = (0.7 * fy * wc) / (E * it);
    kc = 4 / Math.sqrt(h / tw);
    tr = 0.3 * fy;
    E = EForm / 10;
    
    // Shear Vrd
    lambV = h / tw;
    lambpV = (1.1 * Math.sqrt(kv * E / fy));
    lambrV = (1.37 * Math.sqrt(kv * E / fy));
    vpl = 0.6 * fy * aw;
    
    if (lambV <= lambpV) {
        situationV = "Caso 1";
    } else if (lambpV < lambV || lambpV >= lambrV) {
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
    lambA = h * tw;
    lambpA = 3.76 * Math.sqrt(E / fy);
    lambrA = 5.7 * Math.sqrt(E / fy);
    
    if (lambA <= lambpA) {
        situationA = "Caso 1";
    } else if (lambpA < lambA || lambpA >= lambrA) {
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
    } else if (lambpM < lambM || lambpA >= lambrM) {
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
    lambrT = ((1.38 * Math.sqrt(fy * it)) / (ry * it * beta1)) * Math.sqrt(1 + Math.sqrt(1 + (27 * cw * beta1 * beta1) / iy));
    
    if (lambT <= lambpT) {
        situationT = "Caso 1";
    } else if (lambpT < lambT || lambpT >= lambrT) {
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
        mcrT = ((0.69 * E) / (lambT * lambT)) * wx;
        mrdT = mcrT / gama1;
        break;
    }
    
    //Compare & Results
    vsd = v * gama;
    msd = m * gama1;
    mrd = Math.min(mrdA, mrdM, mrdT);
    mrdOut = mrd / 100;
    
    if (vsd <= vrd && msd <= mrdOut) {
        result = "OK";
        alert("OK");
    } else {
        result = "Não OK";
        alert("Não OK");
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

var bitolaLista = document.getElementById("bitola"),
    acoLista = document.getElementById("acos"),
    i;
    
for (i = 0; i < perfis.length; i += 1) {
    bitolaLista.appendChild(criarBitola(perfis[i].bitola, i));
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