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