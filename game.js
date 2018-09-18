
var gameOfLife = {
  width: 21,
  height: 21, // dimensiones alto y ancho del tablero
  stepInterval: null,

  createAndShowBoard: function () {

    // crea el elemento <table>
    var goltable = document.createElement("tbody");

    // Construye la Tabla HTML
    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + h + "-" + w + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;

    // agrega la tabla a #board
    var board = document.getElementById('board');
    board.appendChild(goltable);
    // una vez que los elementos html son añadidos a la pagina le añadimos los eventos
    this.setupBoardEvents();
      
  },

  forEachCell: function (funcionParam) { //recorre el tablero aplicando funciones a cada celda
    for (var h=0; h<this.height; h++) {
           
        for (var w=0; w<this.width; w++) {
            funcionParam(document.getElementById(h+'-'+w));
        }
    }
  },

  setupBoardEvents: function() { //prepara el tablero
      
    var onCellClick = function (e) {
        e.addEventListener('click', function(){
            if (this.dataset.status == 'dead') {
                this.className = 'alive';
                this.dataset.status = 'alive';
            } else {
                this.className = 'dead';
                this.dataset.status = 'dead';
            }
        })      
    } 
    var clear= function(e){ 
        
        e.className='dead';
        e.dataset.status='dead'
    }   
    var random= function(e){ 
        if(Math.round(Math.random())){
            
        e.className='dead';
        e.dataset.status='dead'
        }else{
            e.className='alive';
            e.dataset.status='alive'
        }
    }
    
    var clearBtn = document.getElementById('clear_btn');
    clearBtn.addEventListener('click', function(){
        
        gameOfLife.forEachCell(clear.bind())
    } )

    var stepBtn = document.getElementById('step_btn');
    stepBtn.addEventListener('click', function(){
        
        gameOfLife.step();
    } )

    var play = document.getElementById('play_btn');
    play.addEventListener('click', function(){
        gameOfLife.enableAutoPlay();        
        
    } )
      
    var randomBtn = document.getElementById('reset_btn');
    randomBtn.addEventListener('click', function(){
        
        gameOfLife.forEachCell(random.bind())
    } )
      
    this.forEachCell(onCellClick);
  },

  step: function () { //asigna un proximo estado a cada celda y realiza el cambio
    gameOfLife.forEachCell(
        function(e){
        var Id=e.id;
        var id1=Id.split('-')[0];
        var id2=Id.split('-')[1];
        var arround=[];
        for(var a=-1;a<2;a++){
            for(var b=-1;b<2;b++){
                var newId= (Number(id1)+a)+"-"+(Number(id2)+b);
                if(document.getElementById(newId)!==e){
                arround.push((function (currentCell=document.getElementById(newId)){
                    if(currentCell===null|| currentCell===undefined){
                        return 'borde'
                    }else if(currentCell.dataset.status=='alive'){
                        return 'alive'
                    }else if(currentCell.dataset.status=='dead'){
                        return 'dead'
                    }})())
              }
            }
        };
        var living=0, dead=0;
        for(var i=0;i<arround.length;i++){
            if(arround[i]==='alive'){
                living++
            }else if(arround[i]==='dead'){
                dead++
            }
        }
        if(living===3){
            e.dataset.nextStatus='alive';
            e.nextClass='alive';
        }else if(e.dataset.status==='alive'&&(living===2||living===3)){
            e.dataset.nextStatus='alive'
            e.nextClass='alive';

        }else if(living>3||living<2){
            e.dataset.nextStatus='dead'
            e.nextClass='dead';
        };
    });
    gameOfLife.cambiar();
  },
  cambiar: function(){ gameOfLife.forEachCell(function(e){
      e.dataset.status=e.dataset.nextStatus;
      e.className=e.nextClass;

  })},

  enableAutoPlay: function () { //repite step con un intervalo determinado
    setInterval(function(){ gameOfLife.step()},300)
  },


};


gameOfLife.createAndShowBoard();

