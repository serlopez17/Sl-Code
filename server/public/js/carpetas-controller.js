function crearCarpeta(){
    var nombreC = $("#nombreCarpeta").val();
    var data = {
        nombre:nombreC
    }
    $.ajax({
        url:"/carpetas/crear",
        method:"post",
        data: data,
        dataType:"json",
        success:function(res){
            console.log(res);
            location.href ="dashboard.html";
        },
        error:function(error){
            console.error(error);
        }
    });

}

$(document).ready(function(){
	$.ajax({
		url:"/carpetas",
		method:"get",
		dataType:"json",
		success:function(res){
			console.log(res);
            $("#content-carpetas").html("");
            $("#nc-div").hide();
                    for(var i=0;i<res.carpetas.length;i++){
                        $("#content-carpetas").append(
                            `<div class="col-xl-3 p-4 border shadow-sm">
                                <img src="img/folder.png" alt="" class="img-responsive center-block" style="width:100px; heigth:100px; display:flex;
                                margin:0 auto;">
                                <h4 class="lead text-center " >${res.carpetas[i].nombre}</h3>
                                <button class="btn btn-info" onclick= "verProyectos('${res.carpetas[i].nombre}', '${res.carpetas[i]._id}')">Ver</button>
                            </div>`

                         );
                    }
			
		},
		error:function(error){
			console.error(error);
		}
    });

    $.ajax({
		url:"/proyectosRaiz",
		method:"get",
		dataType:"json",
		success:function(res){
			console.log(res);
            for(var i=0;i<res.proyectos.length;i++){
                $("#content-carpetas").append(
                    `<div class="col-xl-3 p-4 border shadow-sm">
                        <img class="img-responsive center-block" src="img/file.png" alt="" style="width:100px; heigth:100px; display:flex;
                        margin:0 auto;">
                        <h4 class="lead text-center " >${res.proyectos[i].nombre}</h3>
                        <button class="btn btn-info" onclick="abrirProyecto('${res.proyectos[i]._id}')">Abrir</button>
                        <button type="button" onclick="nombresSelect('${res.proyectos[i]._id}')" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal3" data-whatever="@getbootstrap">Compartir</button>

                    </div>`

                    );
            }
			
		},
		error:function(error){
			console.error(error);
		}
    });

    

    
});

function nombresSelect(id){
    $.ajax({
		url:"/usuariosCompartir",
		method:"GET",
		dataType:"json",
		success:function(res){
            console.log(res.data.length);
            $('#idProyectoSeleccionado').val(id)
            $("#selectCompartir").html("");
			for (var i=0;i<res.data.length;i++){
				$("#selectCompartir").append(`<option value="${res.data[i]._id}">${res.data[i].nombre}</option>`);
            }
		},
		error:function(error){
			console.error(error);
		}
    });
}

function compartirCarpeta(){
    var idUsuario = $("#selectCompartir").val();
    var idCarpeta = $("#idProyectoSeleccionado").val();

    var data = {
        idUsuario,
        idCarpeta
    }
    $.ajax({
		url:"/usuarios/compartir",
        method:"POST",
        data: data,
		dataType:"json",
		success:function(res){
            alert("se compartio con exito")
		},
		error:function(error){
			console.error(error);
		}
    });  
}

function compartidasConmigo(){
    $.ajax({
		url:"/compartir",
		method:"get",
		dataType:"json",
		success:function(res){
            console.log(res);
            $("#content-carpetas").html("")
            
            for(var i=0;i<res.carpetas.length;i++){
                $("#content-carpetas").append(
                    `<div class="col-xl-3 p-4 border shadow-sm">
                        <img class="img-responsive center-block" src="img/file.png" alt="" style="width:100px; heigth:100px; display:flex;
                        margin:0 auto;">
                        <h4 class="lead text-center " >${res.carpetas[i].nombre}</h3>
                        <button class="btn btn-info" onclick="abrirProyecto('${res.carpetas[i]._id}')">Abrir</button>
                        <button type="button" onclick="nombresSelect('${res.carpetas[i]._id}')" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal3" data-whatever="@getbootstrap">Compartir</button>

                    </div>`

                    );
            }
			
		},
		error:function(error){
			console.error(error);
		}
    });
}


$(function(){
    $.ajax({
        url:"/logueado",
        method: "get",
        dataType:"json",
        success: function(data){
            $("#nombrelogueado").text(data.nombreUsuario)
        }

    })

})


function cargarCarpetas(){
    $.ajax({
		url:"/carpetas",
		method:"get",
		dataType:"json",
		success:function(res){
			console.log(res);
            $("#content-carpetas").html("");
            $("#nc-div").hide();
            $("#idCarpeta").val("");
                    for(var i=0;i<res.carpetas.length;i++){
                        $("#content-carpetas").append(
                            `<div class="col-xl-3 p-4 border shadow-sm">
                                <img class="img-responsive center-block" src="img/folder.png" alt="" style="width:100px; heigth:100px; display:flex;
                                margin:0 auto;">
                                <h4 class="lead text-center " >${res.carpetas[i].nombre}</h3>
                                <button class="btn btn-info" onclick= "verProyectos('${res.carpetas[i].nombre}', '${res.carpetas[i]._id}')">Ver</button>

                            </div>`

                         );
                    }

                    
			
		},
		error:function(error){
			console.error(error);
		}
    }); 
    
    $.ajax({
		url:"/proyectosRaiz",
		method:"get",
		dataType:"json",
		success:function(res){
			console.log(res);
            for(var i=0;i<res.proyectos.length;i++){
                $("#content-carpetas").append(
                    `<div class="col-xl-3 p-4 border shadow-sm">
                        <img class="img-responsive center-block" src="img/file.png" alt="" style="width:100px; heigth:100px; display:flex;
                        margin:0 auto;">
                        <h4 class="lead text-center " >${res.proyectos[i].nombre}</h3>
                        <button class="btn btn-info" onclick="abrirProyecto('${res.proyectos[i]._id}')">Abrir</button>
                        <button type="button" onclick="nombresSelect(''${res.proyectos[i]._id}'')"  class="btn btn-primary" data-toggle="modal" data-target="#exampleModal3" data-whatever="@getbootstrap">Compartir</button>

                    </div>`

                    );
            }
			
		},
		error:function(error){
			console.error(error);
		}
    });
}

function verProyectos(nombre, id){
    var data = {
        idCarpetaPadre:id
    }
    $.ajax({
        url:"/proyectos",
        method:"post",
        data:data,
        dataType:"json",
        success:function(res){
            console.log(res)
            $("#content-carpetas").html("");
            $("#nc").text(nombre);
            $("#nc-div").show();
            $("#idCarpeta").val(id);


            for(var i=0;i<res.proyectos.length;i++){
                $("#content-carpetas").append(
                    `<div class="col-xl-3 p-4 border shadow-sm">
                        <img class="img-responsive center-block" src="img/file.png" alt="" style="width:100px; heigth:100px; display:flex;
                        margin:0 auto;">
                        <h4 class="lead text-center">${res.proyectos[i].nombre}</h3>
                        <button class="btn btn-info" onclick="abrirProyecto('${res.proyectos[i]._id}')">Abrir</button>
                        <button type="button" onclick="nombresSelect(''${res.proyectos[i]._id}'')"  class="btn btn-primary" data-toggle="modal" data-target="#exampleModal3" data-whatever="@getbootstrap">Compartir</button>

                    </div>`

                    );
            }
            
        },
        error:function(error){
            console.error(error);
        }
    });
}

function todosProyectos(){
    $.ajax({
        url:"/proyectos",
        method:"get",
        dataType:"json",
        success:function(res){
            console.log(res)
            $("#content-carpetas").html("");


            for(var i=0;i<res.proyectos.length;i++){
                $("#content-carpetas").append(
                    `<div class="col-xl-3 p-4 border shadow-sm">
                        <img class="img-responsive center-block" src="img/file.png" alt="" style="width:100px; heigth:100px; display:flex;
                        margin:0 auto;">
                        <h4 class="lead text-center">${res.proyectos[i].nombre}</h3>
                        <button class="btn btn-info" onclick="abrirProyecto('${res.proyectos[i]._id}')">Abrir</button>
                        <button type="button" onclick="nombresSelect(''${res.proyectos[i]._id}'')"  class="btn btn-primary" data-toggle="modal" data-target="#exampleModal3" data-whatever="@getbootstrap">Compartir</button>

                    </div>`

                    );
            }
            
        },
        error:function(error){
            console.error(error);
        }
    });
}






