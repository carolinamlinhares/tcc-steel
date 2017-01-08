// Start of parsing results
function getJsonFromUrl(hashBased) {
    'use strict'
    var query;
    if (hashBased) {
        var pos = location.href.indexOf("?");
        if (pos === -1) return [];
        query = location.href.substr(pos + 1);
    } else {
        query = location.search.substr(1);
    }
    var result = {};
    query.split("&").forEach(function(part) {
        if (!part) return;
        part = part.split("+").join(" "); // replace every + with space, regexp-free version
        var eq = part.indexOf("=");
        var key = eq > -1 ? part.substr(0, eq) : part;
        var val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : "";
        var from = key.indexOf("[");
        if (from == -1) result[decodeURIComponent(key)] = val;
        else {
            var to = key.indexOf("]");
            var index = decodeURIComponent(key.substring(from + 1, to));
            key = decodeURIComponent(key.substring(0, from));
            if (!result[key]) result[key] = [];
            if (!index) result[key].push(val);
            else result[key][index] = val;
        }
    });
    return result;
}

var resultado = [];
resultado = JSON.parse(getJsonFromUrl().test);
//End of parsing results

//Variables
var textV1, textV2, textV3;
var textA1, textA2, textA3;
var textM1, textM2, textM3;
var textT1, textT2, textT3;
var textApp, textNAppV, textNAppM, textNAppVM;

// Building variable texts
textV1 = "<p> Como " + resultado.lambV + " ≤ " + resultado.lambpV + ", " + "\\(λ\\) ≤ \\(λ_p\\)" + ", o esforço cortante resistente é dado por: <br>" + "<span class='eqcenter'> \\(V_{Rd}=\\frac{V_{pl}}{{\\gamma }_{a1}}\\) = " + resultado.vrd + " KN </span> </p>" + "<p> Sendo: <br> \\(V_{pl}=0,5\\times A_w\\times f_y\\) = " + resultado.vpl + "KN <br> \\(A_w\\) = área da alma = \\(d\\times t_w\\) = " + resultado.aw + "\\({cm}^2\\) </p>";
MathJax.Hub.Queue(["Typeset", MathJax.Hub, textV1]);

textV2 = "<p> Como " + resultado.lambpV + " < " + resultado.lambV + " ≤ " + resultado.lambrV + ",  \\(λ_p\\) < \\(λ\\) ≤ \\(λ_r\\), o esforço cortante resistente é dado por: <br>" + "<span class='eqcenter'> \\[V_{Rd}=\\frac{{\\lambda }_p}{\\lambda }\\times \\frac{V_{pl}}{{\\gamma }_{a1}}\\]  = " + resultado.vrd + " KN </span> </p>" + "<p> Sendo: <br> \\(V_{pl}=0,5\\times A_w\\times f_y\\) = " + resultado.vpl + "KN <br> \\(A_w\\) = área da alma = \\(d\\times t_w\\) = " + resultado.aw + "\\({cm}^2\\) </p>";
MathJax.Hub.Queue(["Typeset", MathJax.Hub, textV2]);

textV3 = "<p> Como " + resultado.lambV + " > " + resultado.lambrV + ", " + "\\(λ\\) > \\(λ_r\\)" + ", o esforço cortante resistente é dado por: <br>" + "<span class='eqcenter'> \\(V_{Rd}=1,24\\ \\times \\ ({\\frac{{\\lambda }_p}{\\lambda })}^2\\times \\frac{V_{pl}}{{\\gamma }_{a1}}\\)  = " + resultado.vrd + " KN </span> </p>" + "<p> Sendo: <br> \\(V_{pl}=0,5\\times A_w\\times f_y\\) = " + resultado.vpl + "KN <br> \\(A_w\\) = área da alma = \\(d\\times t_w\\) = " + resultado.aw + "\\({cm}^2\\) </p>";
MathJax.Hub.Queue(["Typeset", MathJax.Hub, textV3]);

textA1 = "<p> Como " + resultado.lambA + " ≤ " + resultado.lambpA + ", " + "\\(λ\\) ≤ \\(λ_p\\)" + ", o momento fletor resistente é dado por: <br>" + "<span class='eqcenter'> \\(M_{Rd}=\\frac{M_{pl}}{{\\gamma }_{a1}}\\) = " + resultado.mrdA + " KN.cm </span> </p>" + "<p> Sendo: <br> \\(M_{pl}\\) = momento fletor de plastificação da seção transversal, igual ao produto do módulo de resistência plástico (z) pela resistência ao escoamento do aço (\\(fy\\)); <br> <span class='eqcenter'> \\(M_{pl}=z_x\\ \\times f_y\\)  = " + resultado.mpl + " KN.cm </span> </p>";
MathJax.Hub.Queue(["Typeset", MathJax.Hub, textA1]);

textA2 = "<p> Como " + resultado.lambpA + " < " + resultado.lambA + " ≤ " + resultado.lambrA + ", \\(λ_p\\) < \\(λ\\) ≤ \\(λ_r\\), o momento fletor resistente é dado por: <br> <span class='eqcenter'> \\(M_{Rd}=\\frac{Cb}{{\\gamma }_{a1}}\\times (M_{pl}-(M_{pl}-\\ M_r)(\\frac{\\lambda -{\\lambda }_p}{{\\lambda }_r-{\\lambda }_p})\\)  = " + resultado.mrdA + " KN.cm </span> </p>" + "<p> Sendo: <br> \\(C_b\\) = coeficiente para majorar momento DESCREVER = " + resultado.cb + "; <br> \\(M_{pl}\\) = momento fletor de plastificação da seção transversal, igual ao produto do módulo de resistência plástico (z) pela resistência ao escoamento do aço (\\(fy\\)) <br>; <span class='eqcenter'> \\(M_{pl}=z_x\\ \\times f_y\\)  = " + resultado.mpl + " KN.cm </span> <br> \\(M_r\\) = momento fletor correspondente ao início do escoamento, incluindo a influência das tensões residuais em alguns casos; <br> <span class='eqcenter'> \\(M_r=0,7f_yW_x\\)   = " + resultado.mrA + " KN.cm </span> </p>";
MathJax.Hub.Queue(["Typeset", MathJax.Hub, textA2]);

textA3 = "<p> Como " + resultado.lambA + " > " + resultado.lambrA + ", " + "\\(λ\\) > \\(λ_r\\), tem-se uma viga de alma esbelta conforme Anexo H da NBR 8800:2008. Não é indicado o uso, sugere-se a escolha de outro perfil ao projeto." 
MathJax.Hub.Queue(["Typeset", MathJax.Hub, textA3]);

textM1 = "<p> Como " + resultado.lambM + " ≤ " + resultado.lambpM + ", \\(λ\\) ≤ \\(λ_p\\) , o momento fletor resistente é dado por: <br>" + "<span class='eqcenter'> \\(M_{Rd}=\\frac{M_{pl}}{{\\gamma }_{a1}}\\) = " + resultado.mrdM + " KN.cm </span> </p>" + "<p> Sendo: <br> \\(M_{pl}\\) = momento fletor de plastificação da seção transversal, igual ao produto do módulo de resistência plástico (z) pela resistência ao escoamento do aço (\\(fy\\)); <br> <span class='eqcenter'> \\(M_{pl}=z_x\\ \\times f_y\\)  = " + resultado.mpl + " KN.cm </span> </p>";
MathJax.Hub.Queue(["Typeset", MathJax.Hub, textM1]);

textM2 = "<p> Como " + resultado.lambpM + " < " + resultado.lambM + " ≤ " + resultado.lambrM + ", \\(λ_p\\) < \\(λ\\) ≤ \\(λ_r\\), o momento fletor resistente é dado por: <br> <span class='eqcenter'> \\(M_{Rd}=\\frac{Cb}{{\\gamma }_{a1}}\\times (M_{pl}-(M_{pl}-\\ M_r)(\\frac{\\lambda -{\\lambda }_p}{{\\lambda }_r-{\\lambda }_p})\\)  = " + resultado.mrdM + " KN.cm </span> </p>" + "<p> Sendo: <br> \\(C_b\\) = coeficiente para majorar momento DESCREVER = " + resultado.cb + " ; <br> \\(M_{pl}\\) = momento fletor de plastificação da seção transversal, igual ao produto do módulo de resistência plástico (z) pela resistência ao escoamento do aço (\\(fy\\)) <br>; <span class='eqcenter'> \\(M_{pl}=z_x\\ \\times f_y\\)  = " + resultado.mpl + " KN.cm </span> <br> \\(M_r\\) = momento fletor correspondente ao início do escoamento, incluindo a influência das tensões residuais em alguns casos; <br> <span class='eqcenter'> \\(M_r=0,7f_yW_x\\)   = " + resultado.mrM + " KN.cm </span> </p>";
MathJax.Hub.Queue(["Typeset", MathJax.Hub, textM2]);

textM3 = "<p> Como " + resultado.lambM + " > " + resultado.lambrM + ", \\(λ\\) > \\(λ_r\\), o momento fletor resistente é dado por: <br>" + "<span class='eqcenter'> \\(M_{Rd}=\\frac{M_{cr}}{{\\gamma }_{a1}}\\)  = " + resultado.mrdM + " KN.cm </span> </p>" + "<p> Sendo: <br> \\(M_{cr}\\) = momento fletor de flambagem elástica. Para perfis laminados: <br>; <span class='eqcenter'> \\(M_{cr}=\\frac{0,69\\times E}{{\\lambda }^2}W_c\\)  = " + resultado.mcrM + " KN.cm </span> </p>" + "<p> Onde: <br> \\(W_c\\) = módulo de resistência elástico do lado comprimido da seção, relativo ao eixo de flexão, neste caso, o eixo x; valor retirado das especificações do perfil = " + resultado.wx + "\\({cm}^3\\).</p>";
MathJax.Hub.Queue(["Typeset", MathJax.Hub, textM3]);

textT1 = "<p> Como " + resultado.lambT + " ≤ " + resultado.lambpT + ", \\(λ\\) ≤ \\(λ_p\\) , o momento fletor resistente é dado por: <br>" + "<span class='eqcenter'> \\(M_{Rd}=\\frac{M_{pl}}{{\\gamma }_{a1}}\\) = " + resultado.mrdT + " KN.cm </span> </p>" + "<p> Sendo: <br> \\(M_{pl}\\) = momento fletor de plastificação da seção transversal, igual ao produto do módulo de resistência plástico (z) pela resistência ao escoamento do aço (\\(fy\\)); <br> <span class='eqcenter'> \\(M_{pl}=z_x\\ \\times f_y\\)  = " + resultado.mpl + " KN.cm </span> </p>";
MathJax.Hub.Queue(["Typeset", MathJax.Hub, textT1]);

textT2 = "<p> Como " + resultado.lambpT + " < " + resultado.lambT + " ≤ " + resultado.lambrT + ", \\(λ_p\\) < \\(λ\\) ≤ \\(λ_r\\), o momento fletor resistente é dado por: <br> <span class='eqcenter'> \\(M_{Rd}=\\frac{Cb}{{\\gamma }_{a1}}\\times (M_{pl}-(M_{pl}-\\ M_r)(\\frac{\\lambda -{\\lambda }_p}{{\\lambda }_r-{\\lambda }_p})\\)  = " + resultado.mrdT + " KN.cm </span> </p>" + "<p> Sendo: <br> \\(C_b\\) = coeficiente para majorar momento DESCREVER = " + resultado.cb + " ; <br> \\(M_{pl}\\) = momento fletor de plastificação da seção transversal, igual ao produto do módulo de resistência plástico (z) pela resistência ao escoamento do aço (\\(fy\\)); <br> <span class='eqcenter'> \\(M_{pl}=z_x\\ \\times f_y\\)  = " + resultado.mpl + " KN.cm </span> <br> \\(M_r\\) = momento fletor correspondente ao início do escoamento, incluindo a influência das tensões residuais em alguns casos; <br> <span class='eqcenter'> \\(M_r=0,7f_yW_x\\)   = " + resultado.mrT + " KN.cm </span> </p>";
MathJax.Hub.Queue(["Typeset", MathJax.Hub, textT2]);

textT3 = "<p> Como " + resultado.lambT + " > " + resultado.lambrT + ", \\(λ\\) > \\(λ_r\\), o momento fletor resistente é dado por: <br>" + "<span class='eqcenter'> \\(M_{Rd}=\\frac{M_{cr}}{{\\gamma }_{a1}}\\)  = " + resultado.mrdT + " KN.cm </span> </p>" + "<p> Sendo: <br> \\(M_{cr}\\) = momento fletor de flambagem elástica. Para perfis laminados: <br>; <span class='eqcenter'> \\(M_{cr}=\\ \\frac{C_b\times \\ {\pi }^2}{L_b}\\ \\times E\\ \\times \\ I_y\\ \\ \\times \\ \\sqrt{\\frac{C_w}{I_y}\\ \\times \\ \\left(1+0,039\\ \\times \\ \\frac{J\\times {L_b}^2}{C_w}\\right)}\\)  = " + resultado.mcrT + " KN.cm </span> </p>" + "<p> Onde: <br> \\(C_b)\\ = coeficiente para majorar momento DESCREVER = " + resultado.cb + "; <br> </p>";
MathJax.Hub.Queue(["Typeset", MathJax.Hub, textT3]);

textApp = "\\(V_{sd}\\) ≤ \\(V_{rd}\\) = " + resultado.vsd + " ≤ " +  resultado.vrd + " KN = APROVADO, Ratio " + resultado.ratioCSV + "<br> \\(M_{sd}\\) ≤ \\(M_{rd}\\) = " + resultado.msd + " ≤ " +  resultado.mrdOut + " KN.m = APROVADO, Ratio " + resultado.ratioCSM + "<br><br> Como o esforço solicitante é menor do que o resistente, a viga está aprovada na verificação quanto à flexão simples de acordo com os critérios da NBR 8800:2008.";
MathJax.Hub.Queue(["Typeset", MathJax.Hub, textApp]);

textNAppV = "\\(V_{sd}\\) > \\(V_{rd}\\) = " + resultado.vsd + " > " +  resultado.vrd + " KN = REPROVADO, Ratio Cortante " + resultado.ratioCSV + "<br> \\(M_{sd}\\) ≤ \\(M_{rd}\\) = " + resultado.msd + " ≤ " +  resultado.mrdOut + " KN.m = APROVADO, Ratio Momento Fletor " + resultado.ratioCSM + "<br><br> Como o esforço solicitante de cortante é maior do que o resistente, a viga não está aprovada na verificação quanto à flexão simples de acordo com os critérios da NBR 8800:2008.";
MathJax.Hub.Queue(["Typeset", MathJax.Hub, textNAppV]);

textNAppM = "\\(V_{sd}\\) ≤ \\(V_{rd}\\) = " + resultado.vsd + " ≤ " +  resultado.vrd + " KN = APROVADO, Ratio Cortante " + resultado.ratioCSV + "<br> \\(M_{sd}\\) > \\(M_{rd}\\) = " + resultado.msd + " > " +  resultado.mrdOut + " KN.m = REPROVADO, Ratio Momento Fletor " + resultado.ratioCSM + "<br><br> Como o esforço solicitante de momento fletor é maior do que o resistente, a viga não está aprovada na verificação quanto à flexão simples de acordo com os critérios da NBR 8800:2008.";
MathJax.Hub.Queue(["Typeset", MathJax.Hub, textNAppM]);

textNAppVM = "\\(V_{sd}\\) > \\(V_{rd}\\) = " + resultado.vsd + " > " +  resultado.vrd + " KN = REPROVADO, Ratio Cortante " + resultado.ratioCSV + "<br> \\(M_{sd}\\) > \\(M_{rd}\\) = " + resultado.msd + " > " +  resultado.mrdOut + " KN.m = REPROVADO, Ratio Momento Fletor " + resultado.ratioCSM + "<br><br> Como os esforços solicitantes são maiores do que os resistentes, a viga não está aprovada na verificação quanto à flexão simples de acordo com os critérios da NBR 8800:2008.";
MathJax.Hub.Queue(["Typeset", MathJax.Hub, textNAppVM]);

// Teste
var text1 = "Como " + resultado.lambA + " = " + '\\(c=\\frac{2}{3x}\\) ' + " = " + resultado.lambpA
MathJax.Hub.Queue(["Typeset", MathJax.Hub, text1]);

$(document).ready(function() {
    // Header
    $(".project").html(resultado.project);
    $(".beam").html(resultado.beam);
    $(".lbForm").html(resultado.lbForm);
    $(".steel").html(resultado.steel);
    $(".fyForm").html(resultado.fyForm);
    $(".fuForm").html(resultado.fuForm);
    $(".E").html(resultado.EForm);
    $(".vk").html(resultado.vk);
    $(".mk").html(resultado.mk);
    $(".gama").html(resultado.gama);
    $(".gama1").html(resultado.gama1);
    $(".cb").html(resultado.cb);
    $("#enrij").html(resultado.enrij);
    $(".a").html(resultado.a);

    // Section
    $("#section").html(resultado.section);
    $("#ml").html(resultado.ml);
    $("#d").html(resultado.d);
    $(".bf").html(resultado.bf);
    $(".tw").html(resultado.tw);
    $(".tf").html(resultado.tf);
    $(".h").html(resultado.h);
    $(".dl").html(resultado.dl);
    $("#area").html(resultado.area);
    $("#ix").html(resultado.ix);
    $(".wx").html(resultado.wx);
    $("#rx").html(resultado.rx);
    $("#zx").html(resultado.zx);
    $(".iy").html(resultado.iy);
    $("#wy").html(resultado.wy);
    $(".ry").html(resultado.ry);
    $("#zy").html(resultado.zy);
    $("#rt").html(resultado.rt);
    $(".it").html(resultado.it);
    $("#mesa").html(resultado.mesa);
    $("#alma").html(resultado.alma);
    $(".cw").html(resultado.cw);
    $("#u").html(resultado.u);

    // Lambs V
    $("#lambV").html(resultado.lambV);
    $("#lambpV").html(resultado.lambpV);
    $("#kv").html(resultado.kv);
    $("#lambrV").html(resultado.lambrV);

    // Situation V
    switch (resultado.situationV) {
        case "Caso 1":
            $("#textV").html(textV1);
            break;
        case "Caso 2":
            $("#textV").html(textV2);
            break;
        case "Caso 3":
            $("#textV").html(textV3);
            break;
    }

    // Lambs A
    $("#lambA").html(resultado.lambA);
    $("#lambpA").html(resultado.lambpA);
    $("#lambrA").html(resultado.lambrA);

    // Situation A
    switch (resultado.situationA) {
        case "Caso 1":
            $("#textA").html(textA1);
            break;
        case "Caso 2":
            $("#textA").html(textA2);
            break;
        case "Caso 3":
            $("#textA").html(textA3);
            break;
    }

    // Lambs M
    $("#lambM").html(resultado.lambM);
    $("#lambpM").html(resultado.lambpM);
    $("#lambrM").html(resultado.lambrM);
    $("#tr").html(resultado.tr);

    // Situation M
    switch (resultado.situationM) {
        case "Caso 1":
            $("#textM").html(textM1);
            break;
        case "Caso 2":
            $("#textM").html(textM2);
            break;
        case "Caso 3":
            $("#textM").html(textM3);
            break;
    }

    // Lambs T
    $("#lambT").html(resultado.lambT);
    $("#lambpT").html(resultado.lambpT);
    $("#lambrT").html(resultado.lambrT);
    $("#beta1").html(resultado.beta1);

    // Situation T
    switch (resultado.situationT) {
        case "Caso 1":
            $("#textT").html(textT1);
            break;
        case "Caso 2":
            $("#textT").html(textT2);
            break;
        case "Caso 3":
            $("#textT").html(textT3);
            break;
    }

    // Results

    // Sd
    $(".vsd").html(resultado.vsd);
    $(".msd").html(resultado.msd);

    // Rd
    $(".vrd").html(resultado.vrd);
    $(".mrdOut").html(resultado.mrdOut);

    // Conclusion
    if (resultado.result === "OK") {
        $("#textR").html(textApp);
    } else if (resultado.vsd >= resultado.vrd && resultado.msd <= resultado.mrd) {
        $("#textR").html(textNAppV);
    } else if (resultado.vsd <= resultado.vrd && resultado.msd > resultado.mrd) {
        $("#textR").html(textNAppM);
    } else if (resultado.vsd > resultado.vrd && resultado.msd > resultado.mrd) {
        $("#textR").html(textNAppVM);
    }


    $("#text1").html(text1);

});
