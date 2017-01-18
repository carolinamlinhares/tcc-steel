/*jslint devel: true*/
/*global perfis */

// variables
var project, beam, vk, mk, lbForm, section, steel, fyForm, fuForm, EForm;
var ml, d, bf, tw, tf, h, dl, area, ix, wx, rx, zx, iy, wy, ry, zy, rt, it, mesa, alma, cw, u;
var fy, fu, E, aw, gama, gama1, cb, kv, lb, kc, tr, beta1, a, enrij;
var lambV, lambpV, lambrV, vpl, vrd;
var mpl, lambA, lambpA, lambrA, mrA, mcrA, mrdA;
var lambM, lambpM, lambrM, mrM, mcrM, mrdM;
var lambT, lambpT, lambrT, mrT, mcrT, mrdT;
var vsd, msd, vrd, mrd, mrdOut, situationV, situationA, situationM, situationT, result;
var ratioCSV, ratioCSM, ratiopCSV, ratiopCSM;

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

function processFormCS() {
    "use strict";
    var i, j;

    // Getting values from HTML form inputs
    project = document.formCS.projectCS.value;
    /* if (project === "") {
        alert("Por favor preencha o campo Projeto.");
        console.log("Por favor preencha o campo Projeto.");
        return false;
    } */
    if (project === "") {
        project = "Exemplo 1";
    }
       
    beam = document.formCS.beamCS.value;
    /* if (beam === "") {
        alert("Por favor preencha o campo Viga.");
        console.log("Por favor preencha o campo Viga.");
        return false;
    } */
    if (beam === "") {
        beam = "V1";
    }
    
    vk = Number(document.formCS.vCS.value);
    if (document.formCS.vCS.value === "" || isNaN(vk)) {
        alert("Por favor preencha o campo Cortante com números.");
        console.log("Por favor preencha o campo Cortante.");
        return false;
    }
    mk = Number(document.formCS.mCS.value);
    if (document.formCS.mCS.value === "" || isNaN(mk)) {
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
    
    if (document.getElementById("stiffeningCS").checked === false) {
        enrij = "Sim";
        a = Number(document.formCS.aCS.value);
        if (document.formCS.aCS.value === "" || isNaN(a)) {
            alert("Por favor preencha o campo Distância entre enrijecedores com números.");
            console.log("Por favor preencha o campo Distância entre enrijecedores com números.");
            return false;
        }
    } else {
        enrij = "Não";
        a = "N/A"
    }
    
   
    section = perfis[Number(document.formCS.sectionS.value)].bitola;
    steel = steelProp[Number(document.formCS.typeS.value)].steelType;
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
    
    // Calculating kv
    if (((a / h) > 3) || ((a / h) > Math.pow(260 / (h / tw), 2)) || (document.getElementById("stiffeningCS").checked === true)) {
        kv = 5;
    } else {
        kv = 5 + 5 / (Math.pow(a / h, 2));
    }
    
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
        alert("Cálculo indisponível. Viga com perfil de alma esbelta, consulte o anexo H da Norma 8800:2008.");
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
    ratioCSV = vsd / vrd;
    ratioCSM = msd / mrdOut;
    ratiopCSV = ratioCSV * 100;
    ratiopCSM = ratioCSM * 100;
    
    if (vsd <= vrd && msd <= mrdOut) {
        result = "OK";
        alert("OK");
    } else {
        result = "Não OK";
        alert("Não OK");
    }
    
    // Fixing decimals 
    
    aw = aw.toFixed(2);
    kv = kv.toFixed(2);
    lambV = lambV.toFixed(2);
    lambpV = lambpV.toFixed(2);
    lambrV = lambrV.toFixed(2);
    vpl = vpl.toFixed(2);
    vrd = vrd.toFixed(2);
    mpl = mpl.toFixed(2);
    lambA = lambA.toFixed(2);
    lambpA = lambpA.toFixed(2);
    lambrA = lambrA.toFixed(2);
    if (typeof (mrA) !== "undefined") {
        mrA = mrA.toFixed(2);
    }
    if (typeof (mcrA) !== "undefined") {
        mcrA = mcrA.toFixed(2);
    }
    mrdA = mrdA.toFixed(2);
    lambM = lambM.toFixed(2);
    lambpM = lambpM.toFixed(2);
    lambrM = lambrM.toFixed(2);
    if (typeof (mrM) !== "undefined") {
        mrM = mrM.toFixed(2);
    }
    if (typeof (mcrM) !== "undefined") {
        mcrM = mcrM.toFixed(2);
    }
    mrdM = mrdM.toFixed(2);
    lambT = lambT.toFixed(2);
    lambpT = lambpT.toFixed(2);
    lambrT = lambrT.toFixed(2);
    beta1 = beta1.toFixed(2);
    kc = kc.toFixed(2);
    if (typeof (mrT) !== "undefined") {
        mrT = mrT.toFixed(2);
    }
    if (typeof (mcrT) !== "undefined") {
        mcrT = mcrT.toFixed(2);
    }
    mrdT = mrdT.toFixed(2);
    vsd = vsd.toFixed(2);
    msd = msd.toFixed(2);
    mrd = mrd.toFixed(2);
    mrdOut = mrdOut.toFixed(2);
    ratioCSV = ratioCSV.toFixed(2);
    ratioCSM = ratioCSM.toFixed(2);
    ratiopCSV = ratiopCSV.toFixed(2);
    ratiopCSM = ratiopCSM.toFixed(2);

    var resultado = 
        {
            "project": project,
            "beam": beam,
            "vk": vk,
            "mk": mk,
            "lbForm": lbForm,
            "section": section,
            "steel": steel,
            "fyForm": fyForm,
            "fuForm": fuForm,
            "EForm": EForm,
            "ml": ml,
            "d": d,
            "bf": bf,
            "tw": tw,
            "tf": tf,
            "h": h,
            "dl": dl,
            "area": area,
            "ix": ix,
            "wx": wx,
            "rx": rx,
            "zx": zx,
            "iy": iy,
            "wy": wy,
            "ry": ry,
            "zy": zy,
            "rt": rt,
            "it": it,
            "mesa": mesa,
            "alma": alma,
            "cw": cw,
            "u": u,
            "fy": fy,
            "fu": fu,
            "E": E,
            "aw": aw,
            "gama": gama,
            "gama1": gama1,
            "cb": cb,
            "kv": kv,
            "lb": lb,
            "kc": kc,
            "tr": tr,
            "beta1": beta1,
            "a": a,
            "enrij": enrij,
            "lambV": lambV,
            "lambpV": lambpV,
            "lambrV": lambrV,
            "vpl": vpl,
            "vrd": vrd,
            "mpl": mpl,
            "lambA": lambA,
            "lambpA": lambpA,
            "lambrA": lambrA,
            "mrA": mrA,
            "mcrA": mcrA,
            "mrdA": mrdA,
            "lambM": lambM,
            "lambpM": lambpM,
            "lambrM": lambrM,
            "mrM": mrM,
            "mcrM": mcrM,
            "mrdM": mrdM,
            "lambT": lambT,
            "lambpT": lambpT,
            "lambrT": lambrT,
            "mrT": mrT,
            "mcrT": mcrT,
            "mrdT": mrdT,
            "vsd": vsd,
            "msd": msd,
            "mrd": mrd,
            "mrdOut": mrdOut,
            "situationV": situationV,
            "situationA": situationA,
            "situationM": situationM,
            "situationT": situationT,
            "result": result,
            "ratioCSV": ratioCSV,
            "ratioCSM": ratioCSM,
            "ratiopCSV": ratiopCSV,
            "ratiopCSM": ratiopCSM
        };
    
    document.getElementById("botaoRelatorio").href = "reportCS.html?test=" + JSON.stringify(resultado);
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
