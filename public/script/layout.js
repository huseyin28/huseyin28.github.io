class Layout{
    constructor(){
        this.getSideBar()
    }

    getSideBar(){
        $.ajax('./public/layout/sideBar.html').then(html => {
            $('#accordionSidebar').html(html)
        })
    }
}

new Layout()