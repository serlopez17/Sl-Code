$('#form-registro-usuario').submit(function(event){
    event.preventDefault()
        var nombre = $('#nombre').val()
        var correo = $('#correo').val()
        var nombreUsuario = $('#usuario').val()
        var plan = $('#plan').val()

        var contrasena = $('#contrasenia').val()
        var contrasena2 = $('#contrasenia2').val()

        var data = {
            nombre,
            correo,
            nombreUsuario,
            plan,
            contrasena
        }

        $.ajax({
            url:"/usuarios/crear",
            data: data,
            method: "POST",
            dataType:"json",
            success: function(data){
                if(data.status == "200"){
                    console.log(data)
                    $("#form-registro-usuario")[0].reset();
                    var msg1 = "El usuario " +nombreUsuario + " ahora forma parte de SL-CODE"
                    toastr.options = {
                        "closeButton": true,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": true,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                      }
                    toastr.success(msg1, "NUEVO USUARIO!");
                }else if(data.status == "404"){
                    $("#form-registro-usuario")[0].reset();
                        
                    
                }
                
            }

    })
    
})


$('#login-usuario').submit(function(event){
    event.preventDefault()
        var nombreUsuario = $('#username').val()
        var contrasena = $('#psw').val()
        var data = {
            nombreUsuario,
            contrasena
        }

        $.ajax({
            url:"/usuarios/login",
            data: data,
            method: "POST",
            dataType:"json",
            success: function(data){
                if(data.status == "200"){
                    console.log(data.mensaje)
                    $("#login-usuario")[0].reset();
                    location.href ="dashboard.html";
                }else if(data.status == "404"){
                    console.log(data.mensaje)
                    $("#login-usuario")[0].reset();
                    var msg1 = "Datos Incorrectos, Ingreselos de Nuevo"
                    toastr.options = {
                        "closeButton": true,
                        "debug": true,
                        "newestOnTop": false,
                        "progressBar": true,
                        "positionClass": "toast-top-center",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                      }
                    toastr.error(msg1, "OH NO!");
                };
                   
                
                 
            
                
            }

    })
    
})


