$(document).ready(function(){
	$.ajax({
		url:"/llenarEditor",
		method:"get",
		dataType:"json",
		success:function(res){
            console.log(res);
            eh.setValue(res.proyecto.html.contenido)	
            ec.setValue(res.proyecto.css.contenido)	
            $("#html").val(res.proyecto.html._id)
            $("#css").val(res.proyecto.css._id)
            $("#js").val(res.proyecto.js._id)
            //ej.setValue(res.proyecto.js.contenido)
		},
		error:function(error){
			console.error(error);
		}
    });
    
    
})

function guardarEditor(){
    var html = $('#html').val()
    var css = $('#css').val()
    //var js = $('#js').val()
    var contenidoHtml= eh.getValue()
    var contenidoCss = ec.getValue()
    //var contentenidoJs = ej.getValue()
    var data = {
        html,
        css,
        //js,
        contenidoHtml,
        contenidoCss,
        //contentenidoJs
    }

    $.ajax({
		url:"/guardar",
        method:"POST",
        data:data,
		dataType:"json",
		success:function(res){
            console.log(res);
            if(res.status == 200){
                location.href ='dashboard.html'
            }
		},
		error:function(error){
			console.error(error);
		}
    });
}
