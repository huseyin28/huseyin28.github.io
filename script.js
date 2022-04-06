function Hesapla() {
    let halat = Number($('#dia').val())
    let makara_capi = cm2mm(Number($('#makara_cap').val()))
    let gobek_capi = makara_capi - cm2mm(Number($('#derinlik').val()) * 2)
    let h = cm2mm(Number($('#aralik').val()))

    let brutHacim = getVolume(makara_capi, h)
    let gobekHacim = getVolume(gobek_capi, h)
    let netHacim = brutHacim - gobekHacim

    let halatHacim = Math.pow(halat,2) * cm2mm(100)

    alert(Math.floor(netHacim / halatHacim))
}

function getVolume(r, h) {
    return Math.PI * Math.pow(r,2) * h
}

function cm2mm(val){
    return val * 10
}