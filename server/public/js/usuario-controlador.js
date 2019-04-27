$('#form-registro-usuario').submit(function(event){
    event.preventDefault()
        var nombre = $('#nombre').val()
        var correo = $('#correo').val()
        var nombreUsuario = $('#usuario').val()
        var contrasena = $('#contrasenia').val()
        var contrasena2 = $('#contrasenia2').val()

        var data = {
            nombre,
            correo,
            nombreUsuario,
            contrasena
        }

        $.ajax({
            url:"/usuarios/crear",
            data: data,
            method: "POST",
            dataType:"json",
            success: function(data){
                console.log(data)
                $("#form-registro-usuario")[0].reset();
            }

    })



         
    

    
})