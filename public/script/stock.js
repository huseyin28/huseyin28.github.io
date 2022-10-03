
function Getir() {
    const ID = $('#pid').val()

    getStockCount(ID)
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
        $('#reservableCount').html(response.reservableCount);
    })
}