var tamMatrix = 15;//matrix quadrada(total 30)

setLayout = function(divName){
    var matrixSpan = '';
    var i,j;
    for(i = 0; i < tamMatrix; i++){
        for(j = 0; j < tamMatrix; j++){
            matrixSpan += "<span class='square' id='spn{0}_{1}'>&nbsp;</span>".format(i,j);
        }
        matrixSpan += "<div class='clear'/>"
    }
    $('#'+divName).html(matrixSpan);
    
    buildWalls();
    SetPontos();
}

buildWalls = function(){
    var numWallRandom = 5;
    var randomNum = 0;
    var rangeRandom = Math.pow(tamMatrix,2)+1;//0-(15^2)
    var i = 0;
    while(i < numWallRandom){
        randomNum = Math.floor(Math.random()*rangeRandom)
        setWall($('.square')[randomNum]);
        
        i++;
    }
}

//Seta a parede a partir de um objeto
setWall = function(objWall){
    //console.log(objWall); //Debug
    //desenhando a parede
    var linCol = $(objWall).attr('id').replace('spn','');
    var splitLinCol = linCol.split('_')
    var lin = parseInt(splitLinCol[0]);
    var col = parseInt(splitLinCol[1]);
    
    //verificando se não sai do limite e adiciona paredes
    var rangeRandom = 2;//0-1
    var randomDirEst = Math.floor(Math.random()*rangeRandom)
    
    var vetAlterarClasse = new Array();
    var objPrincipal, objPrincipalProx, objPrincipalProxProx;
    if(randomDirEst ==0){//horizontal
        //objeto a trocar
        //Se tem espaço a direita
        
        vetAlterarClasse.push($('#spn{0}'.format(linCol)));
        vetAlterarClasse.push($('#spn{0}_{1}'.format(lin,col+1)));
        if(col <= 12){
            vetAlterarClasse.push($('#spn{0}_{1}'.format(lin,col+2)));
            
            $(vetAlterarClasse).each(function(ind,obj){
                
                $(obj).attr('class', 'square_wall');
            });   
        }
    }else{ //vertical
        vetAlterarClasse.push($('#spn{0}'.format(linCol)));
        vetAlterarClasse.push($('#spn{0}_{1}'.format(lin+1,col)));
        if(lin <= 12){
            vetAlterarClasse.push($('#spn{0}_{1}'.format(lin+2,col)));
            
            $(vetAlterarClasse).each(function(ind,obj){
                $(obj).attr('class', 'square square_wall');
            });   
        }
    }
}

//Setando ponto inicial e final
SetPontos = function(){
    var i = 0;
    var rangeRandom = Math.pow(tamMatrix,2)+1;//0-(15^2)
    //console.log('rangeRandom ='+rangeRandom );
    
    var randomNum = 0;
    var objSquare;
    
    while(i < 3){
        randomNum = Math.floor(Math.random()*rangeRandom)
        //console.log('randomNum ='+randomNum);
        
        objSquare =  $('.square')[randomNum];
        
        //Set Player
        if(i ==0){
            $(objSquare).attr('class','square square_player');
        }
        if(i ==1){
            $(objSquare).attr('class','square square_posto');
        }
        if(i ==2){
            $(objSquare).attr('class','square square_cidade');
        }
        i++;
    }
}