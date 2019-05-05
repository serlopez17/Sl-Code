function crearProyecto(){
    var nombreP = $("#nombreProyecto").val();
    var idCarpeta = $("#idCarpeta").val();
    var data = {
        nombre:nombreP,
        idCarpetaPadre: idCarpeta
    }
    console.log(data)
    $.ajax({
        url:"/proyectos/crear",
        method:"post",
        data: data,
        dataType:"json",
        success:function(data){

            if(data.status== 202){
                console.log(data);
                var msg1 = "Sus proyectos exceden el limite del plan que tiene"
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
                toastr.warning(msg1, "Limite Alcanzado");
            }else{
                location.href = "dashboard.html"

            }
            
        },
        error:function(error){
            console.error(error);
        }
    });

}

function abrirProyecto(idProyecto){
    var data =  {
        idProyecto
    }

    $.ajax({
        url:"/abrirProyecto",
        method:"post",
        data: data,
        dataType:"json",
        success:function(res){
            if(res.status == 200){
                location.href ="editor.html";

            }
            l
        },
        error:function(error){
            console.error(error);
        }
    });
}
