/*jslint devel: true*/

// variables
var project, beam, v, m, lbForm, section, steel, fyForm, fuForm, EForm, ml, d, bf, tw, tf, h, dl, area, ix, wx, rx, zx, iy, wy, ry, zy, rt, it, aba, alma, cw, u, fy, fu, E, aw, gama, gama1, cb, kv, lb, kc, tr, wc, beta1, a, lambV, lambpV, lambrV, vpl, vrd, mpl, lambA, lambpA, lambrA, mrA, mcrA, mrdA, lambM, lambpM, lambrM, mrM, mcrM, mrdM, lambT, lambpT, lambrT, mrT, mcrT, mrdT, vsd, msd, vrd, mrd, mrdOut;

var steelProp = [
    ["ASTM A36/ MR250", 250, 400, 200000],
    ["ASTM A572 G50/ AR345", 345, 450, 200000],
    ["ASTM A570 G36", 250, 360, 200000]
];
var tableS = [];
var i, j, situationV, situationA, situationM, situationT, result;

function processFormCS() {
    "use strict";

    // Getting values from HTML form inputs
    project = document.formCS.projectCS.value;
    beam = document.formCS.beamCS.value;
    v = Number(document.formCS.vCS.value);
    m = Number(document.formCS.mCS.value);
    lbForm = Number(document.formCS.lbCS.value);
    section = document.formCS.sectionS.value;
    steel = document.formCS.typeS.value;
    a = Number(document.formCS.aCS.value);
    gama = Number(document.formCS.gama.value);
    gama1 = Number(document.formCS.gama1.value);
    cb = Number(document.formCS.cb.value);
    // Getting section properties
    i = 0;
    while (section !== tableS[i][0]) {
        i += 1;
    }
    if (section === tableS[i][0]) {
        ml = tableS[i][1];
        d = tableS[i][2];
        bf = tableS[i][3];
        tw = tableS[i][4];
        tf = tableS[i][5];
        h = tableS[i][6];
        dl = tableS[i][7];
        area = tableS[i][8];
        ix = tableS[i][9];
        wx = tableS[i][10];
        rx = tableS[i][11];
        zx = tableS[i][12];
        iy = tableS[i][13];
        wy = tableS[i][14];
        ry = tableS[i][15];
        zy = tableS[i][16];
        it = tableS[i][17];
        aba = tableS[i][18];
        alma = tableS[i][19];
        cw = tableS[i][20];
        u = tableS[i][21];
    }
    // Getting values from steel properties array
    j = 0;
    while (steel !== steelProp[j][0]) {
        j += 1;
    }
    if (steel === steelProp[j][0]) {
        fyForm = steelProp[j][1];
        fuForm = steelProp[j][2];
        EForm = steelProp[j][3];
    }
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
    lambM = aba;
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
