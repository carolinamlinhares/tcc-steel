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

// Building variable texts

textV1 = "<p> Como " + resultado.lambV + "≤ " + resultado.lambpV + ", " + "\\(λ\\)" + " ≤ " + "\\(λ_p\\)" + ", o esforço cortante resistente é dado por: <br>" + "<span class="eqcenter"> \\(V_{Rd}=\frac{V_{pl}}{{\\gamma }_{a1}}\\) = " + resultado.vrd + " KN </span>" + "<p> Sendo: <br> \\(V_{pl}=0,5\\times A_w\\times f_y\\) = " + resultado.vpl + "KN <br> \\(A_w=\\ \\textrm{\\'{a}}rea\\ da\\ alma=d\\times t_w\\] = " + resultado.aw + "\\({cm}^4\\) </p>"; 
MathJax.Hub.Queue(["Typeset", MathJax.Hub, textV1]);





















var text1 = "Como " + resultado.lambA + " = " + '\\(c=\\frac{2}{3x}\\) ' + " = " + resultado.lambpA
MathJax.Hub.Queue(["Typeset", MathJax.Hub, text1]);

$(document).ready(function () {
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
    $(".a").html(resultado.a);
    
    // Section
    $("#section").html(resultado.section);
    $("#ml").html(resultado.ml);
    $("#d").html(resultado.d);
    $("#bf").html(resultado.bf);
    $(".tw").html(resultado.tw);
    $("#tf").html(resultado.tf);
    $(".h").html(resultado.h);
    $("#dl").html(resultado.dl);
    $("#area").html(resultado.area);
    $("#ix").html(resultado.ix);
    $("#wx").html(resultado.wx);
    $("#rx").html(resultado.rx);
    $("#zx").html(resultado.zx);
    $("#iy").html(resultado.iy);
    $("#wy").html(resultado.wy);
    $("#ry").html(resultado.ry);
    $("#zy").html(resultado.zy);
    $("#rt").html(resultado.rt);
    $("#it").html(resultado.it);
    $("#aba").html(resultado.aba);
    $("#alma").html(resultado.alma);
    $("#cw").html(resultado.cw);
    $("#u").html(resultado.u);
    
    // Lambs V
    $("#lambV").html(resultado.lambV);
    $("#lambpV").html(resultado.lambpV);
    $("#kv").html(resultado.kv);
    $("#lambrV").html(resultado.lambrV);
    
    // Situation V
    switch (resultado.situationV) {
        case "Caso 1":
            $(#textV).html(textV1);
            break;
        case "Caso 2":
            $(#textV).html(textV2);
            break;
        case "Caso 3":
            $(#textV).html(textV3);
            break;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $("#text1").html(text1);



});
