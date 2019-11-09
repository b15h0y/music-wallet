$(document).ready(function() {
    $("#addfield").on("click", function() {  
                $("#card-collab").append("<div class='collabfield'><div class='row'><div class='col-md-12'>"+
				"<div class='form-group'><label class='bmd-label-floating'>Collaborator Name</label><input type='text' class='form-control' id='name'>"+
				"</div></div></div>"+
				"<div class='row'><div class='col-md-12'>"+
				"<div class='form-group'><label class='bmd-label-floating'>Collaborator's Ethereum Address</label><input type='text' class='form-control' id='address'>"+
				"</div></div></div></div>");  
            });
	$("#removefield").on("click", function() {  
                $("#card-collab").children().last().remove();  
            }); 
});

	document.querySelector("html").classList.add('js');

	var fileInput  = document.querySelector( ".input-file" ),  
		button     = document.querySelector( ".input-file-trigger" ),
		the_return = document.querySelector(".file-return");
		  
	button.addEventListener( "keydown", function( event ) {  
		if ( event.keyCode == 13 || event.keyCode == 32 ) {  
			fileInput.focus();  
		}  
	});
	button.addEventListener( "click", function( event ) {
	   fileInput.focus();
	   return false;
	});  
	fileInput.addEventListener( "change", function( event ) {  
		the_return.innerHTML = this.value;  
	});  
	
