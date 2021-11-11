//JQUERY
let carrito = [];

$(document).ready(function() {
    $("#fila_prueba").css({ background: 'purple', color: 'white' }); //titulo galeria de arte
    $("#dscto_cincuenta").css({ background: 'yellow', color: 'white' }); //obras con dscto
    $("#propu_art").css({ background: 'black', color: 'white' }); //titulo con propuesta artistica
    $("#boton").prepend("<button class='btn btn-warning' id='btnSuscrip'>Suscribete para coleccionar Arte</button>");
    $("#btnSuscrip").click(function() {
        suscribir();
    })
    renderizarProductos()
    liquidacionProductos()

    //slector para ordenar , va aqui(en document ready) porque hace modificacion sobre el dom
    $("#miSeleccion").on('change', function() {
        ordenar();
    });

    //MARCAR COMO ATRIBUTO PAFA FILTRAR
    $("#miSeleccion option[value='pordefecto']").attr("selected", true);

    //--------------------Animaciones-------------------------
    $(".galeria").prepend("<h1 class='text-center' id='desct'>LIQUIDACION DEL 20-12 AL 30-12</h1>"); //titulo DE LIQUIDACION
    $("#desct").css({ background: 'yellow', color: 'red' })
        .slideUp(2000)
        .slideDown(2000);
});


//---------------PROPUESTA ARTISTICA--------------
//aqui llamo productos de la base de datos
function renderizarProductos() {
    for (const producto of productos) {
        $(".milista").append(`<li class="list-group-item ">
            <input value="${producto.id}" type="hidden">
            
            <img src=${producto.foto} width="250" height="250">
            <p> Obra: ${producto.nombre}</p>
            <p> ${producto.fichatecnica}</p>
            <p> ${producto.medidas}</p>
            <p><strong> s/ ${producto.precio} </strong></p>
            <button class='btn btn-dark' id='btn${producto.id}'>Comprar</button>
            </li>`);
        //<h3> ID: ${producto.id} </h3> de esta manera reemplaza al input, 
        //pero el input con su opcion type="hidden"" hace que no se visualize el id
        //Evento para cada boton
        $(`#btn${producto.id}`).on('click', function() {
            agregarAlCarrito(producto);
        });
    }

}

//------------------------------LIQUIDACION--------------------
//LIQUIDACION -----aqui llamo productos de la base de datos liquidacion
function liquidacionProductos() {
    for (const producto of liquidacion) {
        $(".liqlista").append(`<li class="list-group-item ">
            <input value="${producto.id}" type="hidden">
            
            <img src=${producto.foto} width="250" height="250">
            <p> Obra: ${producto.nombre}</p>
            <p> ${producto.fichatecnica}</p>
            <p> ${producto.medidas}</p>
            <p><strong> P. Liquidacion s/ ${producto.precioliquidacion} </strong></p>
            <p><strong> P.anterior s/ ${producto.precioanterior} </strong></p>
            <button class='btn btn-warning' id='btnliq${producto.id}'>50% Dscto Comprar producto</button>
            </li>`);
        //<h3> ID: ${liquidacion.id} </h3> de esta manera reemplaza al input, 
        //pero el input con su opcion type="hidden"" hace que no se visualize el id
        //Evento para cada boton
        $(`#btnliq${producto.id}`).on('click', function() {
            liquidacionAlCarrito(producto);
        });
    }

}


//esta funcion permite hcer un evento cuando le das click al boton comprar
//funcion agregar al carrito de zona de propusta artistica
function agregarAlCarrito(productoNuevo) {
    carrito.push(productoNuevo);
    console.log(carrito);
    Swal.fire(
        'Excelente Elección! agregada a tu coleccion',
        productoNuevo.nombre,
        'success'
    );
}

//esta funcion permite hcer un evento cuando le das click al boton 50 dscto
//funcion agregar al carrito de zona de LIQUIDACION
function liquidacionAlCarrito(productoNuevo) {
    carrito.push(productoNuevo);
    console.log(carrito);
    Swal.fire(
        'DESCUENTAZO! agregada a tu coleccion',
        productoNuevo.nombre,
        'success'
    );
}

//funcion para empezar una subscribir
function suscribir() {
    $("#suscripcion").append(`
    <h4>Suscribete a nuestra Galeria de arte</h4>
    <form id="miFormulario">
    <input type="text" id="email" placeholder="Aqui tu email">
    <button type="submit" class="btn btn-warning">Suscribete ahora</button>
    </form>`);
    //EVENTO
    $("#miFormulario").submit(function(e) {
        //prevenir el comportamiento por defecto
        e.preventDefault();
        //aca una buena validacion de los campos
        //Mensaje de confirmacion de suscripcion
        Swal.fire(
            'Nueva suscripción! empieza en el mundo del arte',
            $("#email").val(),
            'success'
        )
        $("#suscripcion").empty(); //para vaciar ese div, logra desaparecer lo renderizado
    });
}

//empieza la funcion para ordenar -Filtrar
function ordenar() {
    let seleccion = $("#miSeleccion").val();
    //console.log(seleccion);
    if (seleccion == "menor") {
        //ordeno el array de productos por precio de menor a mayor
        productos.sort(function(a, b) { return a.precio - b.precio });
    } else if (seleccion == "mayor") {
        //ordeno el array de productos por precio de mayor a menor
        productos.sort(function(a, b) { return b.precio - a.precio });
    } else if (seleccion == "alfabetico") {
        //ordeno por orden alfabetico
        productos.sort(function(a, b) {
            return a.nombre.localeCompare(b.nombre);
        });
    }
    $("li").remove();
    renderizarProductos();
}