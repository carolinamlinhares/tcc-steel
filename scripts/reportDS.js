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

var i = 0;

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
    
    // Section
    $("#section").html(resultado.suggestion[0].perfil.bitola);
    $("#ml").html(resultado.suggestion[0].perfil.ml);
    $("#d").html(resultado.suggestion[0].perfil.d);
    $(".bf").html(resultado.suggestion[0].perfil.bf);
    $(".tw").html(resultado.suggestion[0].perfil.tw);
    $(".tf").html(resultado.suggestion[0].perfil.tf);
    $(".h").html(resultado.suggestion[0].perfil.h);
    $(".dl").html(resultado.suggestion[0].perfil.dl);
    $("#area").html(resultado.suggestion[0].perfil.area);
    $("#ix").html(resultado.suggestion[0].perfil.ix);
    $(".wx").html(resultado.suggestion[0].perfil.wx);
    $("#rx").html(resultado.suggestion[0].perfil.rx);
    $("#zx").html(resultado.suggestion[0].perfil.zx);
    $(".iy").html(resultado.suggestion[0].perfil.iy);
    $("#wy").html(resultado.suggestion[0].perfil.wy);
    $(".ry").html(resultado.suggestion[0].perfil.ry);
    $("#zy").html(resultado.suggestion[0].perfil.zy);
    $("#rt").html(resultado.suggestion[0].perfil.rt);
    $(".it").html(resultado.suggestion[0].perfil.it);
    $("#mesa").html(resultado.suggestion[0].perfil.mesa);
    $("#alma").html(resultado.suggestion[0].perfil.alma);
    $(".cw").html(resultado.suggestion[0].perfil.cw);
    $("#u").html(resultado.suggestion[0].perfil.u);
    
    // SD
    
    $("#vsd").html(resultado.vsd);
    $("#msd").html(resultado.msd);
    
    //RD
    
    $('#suggestion_table').append('<table></table>');
    var table = $('#suggestion_table').children();
    table.append('<tr><th> Perfil </th> <th> Cortante \(V_{rd}\) (KN) </th> <th> Momento \(M_{rd}\) (KN.m) </th> <th> Ratio Cortante </th> <th> Ratio Momento </th> </tr>');
    for (i = 0; i < resultado.suggestion.length; i += 1) {
        table.append('<tr><td>' +  resultado.suggestion[i].perfil.bitola + '</td>' + '<td>' +  resultado.suggestion[i].vrd + '</td>' + '<td>' +  resultado.suggestion[i].mrdOut + '</td>' + '<td>' +  resultado.suggestion[i].ratioDSV + '</td>' + '<td>' +  resultado.suggestion[i].ratioDSM + '</td>' + '</tr>');
    }

    
});
    
