function addField (argument) {
        var card-body = document.getElementsByClassName("card-body");
        var currentIndex = card-body.rows.length;
        var currentRow = card-body.insertRow(-1);

        var row = document.createElement("div");
        row.setAttribute("class", "row" + currentIndex);
		
		var col = document.createElement("div");
        col.setAttribute("class", "col-md-12" + currentIndex);

        var formgroup = document.createElement("div");
        formgroup.setAttribute("class", "form-group" + currentIndex);

        var label = document.createElement("label");
        label.setAttribute("class", "bmd-labbel-floating" + currentIndex);
		
		var textA = document.createElement("input");
        textA.setAttribute("type", "text", "class", "form-control" + currentIndex);

        var addRowBox = document.createElement("input");
        addRowBox.setAttribute("type", "button");
        addRowBox.setAttribute("value", "Add collaborators");
        addRowBox.setAttribute("onclick", "addField();");
        addRowBox.setAttribute("class", "button");

        var currentCell = currentRow.insertCell(-1);
        currentCell.appendChild(linksBox);

        currentCell = currentRow.insertCell(-1);
        currentCell.appendChild(keywordsBox);

        currentCell = currentRow.insertCell(-1);
        currentCell.appendChild(violationsBox);

        currentCell = currentRow.insertCell(-1);
        currentCell.appendChild(addRowBox);
    }