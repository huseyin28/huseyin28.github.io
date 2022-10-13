
function Getir() {
    const ID = $('#pid').val()

    let not = new Audio('https://www.epidemicsound.com/track/FypLhSp7Hx/')

    not.play();

    getStockCount(ID || 53701)
}

function getStockCount(pid){
    $.ajax({
        url : 'https://app.dipendo.com/api/purchase-items/'+pid,
        headers : {
            Authorization : Authorization
        }
    }).then(response => {
        $('#purchaseCount').html(response.purchaseCount);
        $('#stockCount').html(response.stockCount);
        getOthers(response.product.id ,pid)
    })
}


function getOthers(productId, pid){
    GetStatu1(productId, pid)
    GetStatu2(productId, pid)
    GetStatu3(productId, pid)
}



function GetStatu1(productId, PurItemId){
    $.ajax({
        url : `https://app.dipendo.com/api/sale-items?productId=${productId}&status=1&offset=0&limit=1000`,
        headers: { "Authorization": Authorization }
    }).then(response => {
        let toplam = 0;
        $('#kesilecekler').html('')
        response.forEach(element => {
            if(element.purchaseItem.purchaseItemId == PurItemId){
                $('#kesilecekler').append(`( ${element.saleCount} ) ${element.customer.title} <br>`)
                toplam += element.saleCount
            }
        });
        $('#kesileceklerToplam').html(toplam)
    })
}

// Sevke hazırlar statu 2
function GetStatu2(productId, PurItemId){
    $.ajax({
        url : `https://app.dipendo.com/api/sale-items?productId=${productId}&status=2&offset=0&limit=1000`,
        headers: { "Authorization": Authorization }
    }).then(response => {
        let toplam = 0;
        $('#bekleyenler').html('')
        response.forEach(element => {
            if(element.purchaseItem.purchaseItemId == PurItemId)
            $('#bekleyenler').append(`( ${element.saleCount} ) ${element.customer.title} <br>`)
            toplam += element.saleCount
        });
        $('#bekleyenlerToplam').html(toplam)
    })
}

// gönderilenler statu 3
function GetStatu3(productId, PurItemId){
    $.ajax({
        url : `https://app.dipendo.com/api/sale-items?productId=${productId}&status=3&offset=0&limit=1000`,
        headers: { "Authorization": Authorization }
    }).then(response => {
        let toplam = 0;
        $('#gonderilenler').html('')
        for (let i = response.length-1; i >= 0; i--) {
            if(response[i].purchaseItem.purchaseItemId == PurItemId){
                $('#gonderilenler').append(`( ${response[i].saleCount} ) ${response[i].customer.title} <br>`)
                toplam += response[i].saleCount
            }
        }
        $('#gonderilenlerToplam').html(toplam)
    })
}