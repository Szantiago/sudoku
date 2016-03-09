window.onload = function()
{
    var sudoku      = [],
        solve       = [],
        dimension   = 3,
        dificultad  = 1;

    //Para cargar los combos...
    var select = nom_div("opc_2");
    for (var i = 2; i<= 5; i++)
    {
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        select.appendChild(opt);
    }

    /*
        Función en la cual llega lel valor escrito por el usaurio
        además de la posición del valor digitado en la mattriz...
        Se deberá validar si el número digitado cumple con la condición para estar en esa posición...
        1. Un número no puede repetirse en el mismo cuadrante...
        2. Un número no puede estar en la misma Fila.
        3. Un número no puede estar en la misma columna.
    */

    var validaSudoku = function(valor, id)
    {
        var parteID  = id.split("_");
        var m="", m2="", m3="";
        var cont=0;
        var bool = false, bool2 = false;

        for(var x=0; x<sudoku[parteID[0]][parteID[1]].length;x++){
          for(var y=0; y<sudoku[parteID[0]][parteID[1]].length;y++){
            m=sudoku[parteID[0]][parteID[1]][x][y]==0 ? m+=nom_div([parteID[0]]+"_"+[parteID[1]]+"_"+[x]+"_"+[y]).value :m+=sudoku[parteID[0]][parteID[1]][x][y];
          }
        }

        if(m.indexOf(valor) != -1){
          cont=0;
          m.split("");
          for(var i =0; i<m.length;i++){
            if(m[i]==valor){
              cont++;
              if(cont>1){
                nom_div([parteID[0]]+"_"+[parteID[1]]).style.background="red";
                nom_div([parteID[0]]+"_"+[parteID[1]]+"_"+[parteID[2]]+"_"+[parteID[3]]).style.background="red";
              }
              else
              {
                nom_div([parteID[0]]+"_"+[parteID[1]]).style.background="rgba(239, 255, 248, 0.16)";
                nom_div([parteID[0]]+"_"+[parteID[1]]+"_"+[parteID[2]]+"_"+[parteID[3]]).style.background="rgba(239, 255, 248, 0.16)";
              }
            }
          }
        }

      for(var x=0; x<sudoku[parteID[0]][parteID[1]].length;x++){
        for(var y=0; y<sudoku[parteID[0]][parteID[1]].length;y++){
            m2=sudoku[parteID[0]][x][parteID[2]][y]==0 ? m2+=nom_div([parteID[0]]+"_"+[x]+"_"+[parteID[2]]+"_"+[y]).value :m2+=sudoku[parteID[0]][x][parteID[2]][y];
        }
      }
      if(m2.indexOf(valor) != -1){
        cont=0;
        m2.split("");
        for(var i =0; i<m2.length;i++)
        {
          if(m2[i]==valor){
            cont++;
            if(cont>1)
            {
              bool=true;
            }
            else
            {
              for(var k=0;k<sudoku[parteID[0]][parteID[1]].length; k++)
              {
                for(var j=0;j<sudoku[parteID[0]][parteID[1]].length; j++)
                {
                  try {
                    nom_div([parteID[0]]+"_"+[k]+"_"+[parteID[2]]+"_"+[j]).style.background="rgba(239, 255, 248, 0.16)";
                  }
                  catch(err) {
                  }
                }
              }
            }
          }
        }
      }
      if(bool){
        for(var t=0; t<sudoku[parteID[0]][parteID[1]].length ; t++){
          for(var p=0; p<sudoku[parteID[0]][parteID[1]].length ; p++){
            try {
              nom_div([parteID[0]]+"_"+[t]+"_"+[parteID[2]]+"_"+[p]).style.background="red";
            }
            catch(err)
            {
            }
          }
        }
      }

      for(var x=0; x<sudoku[parteID[0]][parteID[1]].length;x++){
        for(var y=0; y<sudoku[parteID[0]][parteID[1]].length;y++){
          m3=sudoku[x][parteID[1]][y][parteID[3]]==0 ? m3+=nom_div([x]+"_"+[parteID[1]]+"_"+[y]+"_"+[parteID[3]]).value :m3+=sudoku[x][parteID[1]][y][parteID[3]];
        }
      }
      if(m3.indexOf(valor) != -1){
        cont=0;
        m3.split("");
        for(var i =0; i<m3.length;i++)
        {
          if(m3[i]==valor){
            cont++;
            if(cont>1)
            {
              bool2=true;
            }
            else{
              for(var h=0;h<sudoku[parteID[0]][parteID[1]].length; h++)
              {
                for(var y=0;y<sudoku[parteID[0]][parteID[1]].length; y++)
                {
                  try {
                    nom_div([h]+"_"+[parteID[1]]+"_"+[y]+"_"+[parteID[3]]).style.background="rgba(239, 255, 248, 0.16)";
                  }
                  catch(err) {
                  }
                }
              }
            }
          }
        }
      }

    if(bool2){
      for(var q=0;q<sudoku[parteID[0]][parteID[1]].length; q++)
      {
        for(var w=0;w<sudoku[parteID[0]][parteID[1]].length; w++)
        {
          try {
            nom_div([q]+"_"+[parteID[1]]+"_"+[w]+"_"+[parteID[3]]).style.background="red";
            console.log("hello");
          }
          catch(err) {
          }
        }
      }
    }
  }

    var nuevoSudoku = (function nuevoSudoku()
    {
        var newSudoku = sudokuJS.creaSudoku(dimension, dificultad);
        sudoku = newSudoku.sudokujs;
        solve = newSudoku.respuesta;
        //Para dibujar el sudoku en html...
        var txt     = "<table>",
            nomID   = "";
            eventos = [];
        for(var fila = 0; fila < sudoku.length; fila++)
        {
            txt += "<tr>";
            for(var col = 0; col < sudoku.length; col++)
            {
                txt += "<td>";
                txt += "<table class = 'cuadrante' id = '"+fila+"_"+col+"'>"
                for(var i = 0; i < sudoku.length; i++)
                {
                    txt += "<tr>";
                    for(var c = 0; c < sudoku.length; c++)
                    {
                        nomID = fila + "_" + col + "_" + i + "_" + c;
                        txt += "<td class = 'interno' id = 'td_"+(nomID)+"'>"
                        if(sudoku[fila][col][i][c] !== 0)
                        {
                            txt += sudoku[fila][col][i][c];
                        }
                        else
                        {
                            txt += "<input type = 'text' class = 'numero' id = '"+(nomID)+"' maxlength = '1'>";
                            eventos.push(nomID);
                        }
                        txt += "</td>";
                    }
                    txt += "</tr>";
                }
                txt += "</table>";
            }
            txt += "</tr>";
        }
        txt += "</table>";
        nom_div("escenario").innerHTML = txt;
        for(var i = 0; i < eventos.length; i++)
        {
            nom_div(eventos[i]).addEventListener("keyup", function(event)
            {
                if(isNumber(this.value) || this.value === "")
                {
                    validaSudoku(this.value === "" ? 0 : Number(this.value), this.id);
                }
                else
                {
                    this.value = "";
                }
            });
        }
        //Fin de dibujar el sudoku...
        return nuevoSudoku;
    })();

    nom_div("resuelve").addEventListener('click', function(event)
	{
		//console.log(event);
        //Para completar los campos del sudoku...
        //resuelve
        var nomID = "";
        for(var fila = 0; fila < solve.length; fila++)
        {
            for(var col = 0; col < solve.length; col++)
            {
                for(var i = 0; i < solve.length; i++)
                {
                    for(var c = 0; c < solve.length; c++)
                    {
                        //Saber si el input existe para completar el espacio...
                        nomID = fila + "_" + col + "_" + i + "_" + c;
                        if(nom_div(nomID) !== null)
                        {
                            nom_div(nomID).value = solve[fila][col][i][c];
                        }
                    }
                }
            }
        }
	});

    nom_div("nuevo").addEventListener('click', function(event)
    {
        nuevoSudoku();
    });

    for(var combo = 1; combo <= 2; combo++)
    {
        nom_div("opc_" + combo).addEventListener('change', function(event)
        {
            var numOpc = Number(this.id.split("_")[1]);
            if(numOpc === 1)
            {
                if(Number(this.value) !== 0)
                {
                    dificultad = Number(this.value);
                }
            }
            else
            {
                if(Number(this.value) !== 0)
                {
                    dimension = Number(this.value);
                }
            }
            nuevoSudoku();
        });
    }

    function isNumber(n)
    {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function nom_div(div)
	{
		return document.getElementById(div);
	}
};
