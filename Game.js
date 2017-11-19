function Cell(x, y){
	this.neighbors = 0;
	this.checkNeighbors = function(Grid){
		this.neighbors=0;
		for(i=this.x-1; i<this.x+2; i++){
			if (typeof Grid[i] !== 'undefined'){
			for(j=this.y-1; j<this.y+2; j++){
				if (typeof Grid[i][j] !== 'undefined' &&  Grid[i][j] !== Grid[this.x][this.y]){
					if(Grid[i][j].alive == true){
						this.neighbors++;
					}
				}
			}
			}
			// $("#X"+this.x+">#Y"+this.y).empty();
			// $("#X"+this.x+">#Y"+this.y).prepend( "<p>"+this.neighbors+"</p>" );
		}
	}
	this.x = x;
	this.y = y;
	this.display = $( "#X"+this.x ).append( "<div class='cell' id=Y"+ this.y +"></div>" );
	this.alive = false;
	this.life = function(){
		$("#X"+this.x+">#Y"+this.y).addClass('alive').removeClass('dead');
		this.alive = true;
		}
	this.death = function(){
		this.alive = false;
		$("#X"+this.x+">#Y"+this.y).addClass('dead').removeClass('alive');

	}
}

var Grid = [];

for(x=0; x<(9); x++){
	Grid.push([]);
	$( "#grid" ).append( "<div class='row' id=X"+ x +"></div>" );
	for(y=0; y<9; y++){
		Grid[x].push(new Cell(x,y));
	}
}

//seed
$("button").click(function() {
	$("button").html('Restart');

	for(x=0; x<9; x++){
		for(y=0; y<9; y++){
			Grid[x][y].death();
		}
	}

	for(y=6; y<9; y++){
		Grid[1][y].life();
	}

	Grid[1][1].life();
	Grid[1][2].life();
	Grid[2][1].life();
	Grid[2][2].life();
	Grid[3][3].life();
	Grid[3][4].life();
	Grid[4][3].life();
	Grid[4][4].life();

	for(y=0; y<9; y++){
		Grid[6][y].life();
	}
});

Grid.checkNeighbors = function(Grid){
	for(x=0; x<9; x++){
		for(y=0; y<9; y++){
			Grid[x][y].checkNeighbors(Grid);
		}
	}
}

Grid.nextGen = function(){
	for(x=0; x<9; x++){
		for(y=0; y<9; y++){
			var cell= Grid[x][y];
			if (cell.neighbors < 2){
				cell.death();
			}
			else if (cell.neighbors == 3){
				cell.life();
			}
			else if (cell.neighbors > 3){
				cell.death();
			}

	  }
	}
}

var interval = 2500;
window.setInterval(function(){
	Grid.checkNeighbors(Grid); 
	Grid.nextGen();
}, interval);

