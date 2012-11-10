/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

test( "Test Constructor parameters", function() {
  //id, posX, posY
  var pontoANode = new nodeBordQueue(2,3)
  var pontoBNode = new nodeBordQueue(4,7)
  var pontoCNode = new nodeBordQueue(5,9)  
  
  var aSearch = new ASearch(pontoANode,pontoBNode,pontoCNode);
  
  equal( aSearch.getPontoIni(), pontoANode, "Valor esperado era o objeto nodeBordQueue " );
  equal( aSearch.getPontoFim(), pontoBNode, "Valor esperado era o objeto nodeBordQueue " );
  equal( aSearch.getPontoPosto(), pontoCNode, "Valor esperado era o objeto nodeBordQueue " );
});

test( "Test Queue Add If Not Exists Add", function() {
    var pontoANode = new nodeBordQueue(2,3)
    var pontoBNode = new nodeBordQueue(4,7)
    var pontoCNode = new nodeBordQueue(5,9)  
    
    var aSearch = new ASearch(pontoANode,pontoBNode,pontoCNode);
    
    var novoPonto = new nodeBordQueue(5,6);
    
    var oldLength = $(aSearch.getQueue()).size();
    
    aSearch.AddIfDontExists(novoPonto)
    
    equal( $(aSearch.getQueue()).size(), oldLength+1, "Valor esperado era Count + 1" );
});


test( "Test ClosedQueue Add If Not Exists Fail", function() {
    var pontoANode = new nodeBordQueue(2,3)
    var pontoBNode = new nodeBordQueue(4,7)
    var pontoCNode = new nodeBordQueue(5,9)  
    
    var aSearch = new ASearch(pontoANode,pontoBNode,pontoCNode);
    
    var closedPonto = new nodeBordQueue(5,6);
    aSearch.getClosedQueue().push(closedPonto);
    var oldLength = $(aSearch.getQueue()).size();
    
    aSearch.AddIfDontExists(closedPonto)
    
    equal( oldLength, $(aSearch.getQueue()).size(), "Valor esperado era Count + 1" );
    
});

test( "Test AddIfNotExists Node not accessible", function() {
    var pontoANode = new nodeBordQueue(2,3)
    var pontoBNode = new nodeBordQueue(4,7)
    var pontoCNode = new nodeBordQueue(5,9)  
    
    var aSearch = new ASearch(pontoANode,pontoBNode,pontoCNode);
    
    var closedPonto = new nodeBordQueue(5,6);
    
    var oldLength = $(aSearch.getQueue()).size();
    
    closedPonto.setAccessible(false);
    
    aSearch.AddIfDontExists(closedPonto)
    
    equal( oldLength, $(aSearch.getQueue()).size(), "Valor esperado era 1" );
    
});

test( "Test EndOfList Equal Function", function() {
    var pontoANode = new nodeBordQueue(2,3)
    var pontoBNode = new nodeBordQueue(4,7)
    var pontoCNode = new nodeBordQueue(5,9)  
    
    var aSearch = new ASearch(pontoANode,pontoBNode,pontoCNode);
    equal( 0, $(aSearch.getQueue()).size(), "Valor esperado era 0" );
});

test( "Test EndOfList Fail Function", function() {
    var pontoANode = new nodeBordQueue(2,3)
    var pontoBNode = new nodeBordQueue(4,7)
    var pontoCNode = new nodeBordQueue(5,9)  
    
    var aSearch = new ASearch(pontoANode,pontoBNode,pontoCNode);
    var closedPonto = new nodeBordQueue(5,6);
    aSearch.getClosedQueue().push(closedPonto);
    
    notEqual( 1, $(aSearch.getQueue()).size(), "Valor esperado era 0" );
});

test( "Test PassouPeloPosto Function", function() {
    var pontoANode = new nodeBordQueue(2,3)
    var pontoBNode = new nodeBordQueue(4,7)
    var pontoCNode = new nodeBordQueue(5,9)  
    
    var aSearch = new ASearch(pontoANode,pontoBNode,pontoCNode);
    aSearch.setPassouPeloPosto(true);
    equal( true, aSearch.getPassouPeloPosto(), "Valor esperado era 0" );
});

test( "Test Find Destination Function", function() {
    var pontoANode = new nodeBordQueue(2,3)
    var pontoBNode = new nodeBordQueue(4,7)
    var pontoCNode = new nodeBordQueue(5,9)  
    
    var aSearch = new ASearch(pontoANode,pontoBNode,pontoCNode);
    aSearch.setPassouPeloPosto(true);
    
    var novoPonto = new nodeBordQueue(5,6);
    novoPonto.setTipoNo(2);
    aSearch.setCurrentNode(novoPonto)
    
    equal( true, aSearch.FoundDestination(), "Valor esperado era true" );
});


test( "Test Find Destination Function Fail", function() {
    var pontoANode = new nodeBordQueue(2,3)
    var pontoBNode = new nodeBordQueue(4,7)
    var pontoCNode = new nodeBordQueue(5,9)  
    
    var aSearch = new ASearch(pontoANode,pontoBNode,pontoCNode);
    aSearch.setPassouPeloPosto(true);
    
    var novoPonto = new nodeBordQueue(5,6);
    //Não é final
    //novoPonto.setTipo(2);
    aSearch.setCurrentNode(novoPonto)
    
    notEqual( true, aSearch.FoundDestination(), "Valor esperado era false" );
});


test(' Map print', function(){
    setLayout('tst')
    //console.log(matrixMapa)
    
    equal(true,true, 'Esperado true')
   //tst 
});


test(' Map set Test', function(){
    var pontoANode = new nodeBordQueue(2,3)
    var pontoBNode = new nodeBordQueue(4,7)
    var pontoCNode = new nodeBordQueue(5,9)  
    
    var aSearch = new ASearch(pontoANode,pontoBNode,pontoCNode);
    aSearch.setMap(matrixMapa, 15)
    
    notEqual(aSearch.getMap(),null, 'Esperado não nulo')
    equal(aSearch.getMapSize(),15, 'Esperado 15')
   //tst 
});

test(' Test Find Vizinhos', function(){
    var pontoANode = new nodeBordQueue(1,1)
    var pontoBNode = new nodeBordQueue(2,2)
    var pontoCNode = new nodeBordQueue(2,1)  
    
    var aSearch = new ASearch(pontoANode,pontoBNode,pontoCNode);
    var size = 3;
    var mapa = []
    for(var i = 0; i < size; i++){
        mapa[i] = []
        for(var j = 0; j < size; j++){
            mapa[i][j] = 4;
        }
    }
    mapa[0][1] = 0;
    mapa[1][0] = 0;
    mapa[1][1] = 1;
    aSearch.setMap(mapa, Math.pow(size,2))
    
    var ret = aSearch.GetVizinhos(pontoANode);
    
    equal($(ret).size(),2, 'Esperado 2');
});


test(' Test Find Vizinhos 2', function(){
    var pontoANode = new nodeBordQueue(1,1)
    var pontoBNode = new nodeBordQueue(2,2)
    var pontoCNode = new nodeBordQueue(2,1)  
    
    var aSearch = new ASearch(pontoANode,pontoBNode,pontoCNode);
    var size = 9;
    var mapa = []
    for(var i = 0; i < size; i++){
        mapa[i] = []
        for(var j = 0; j < size; j++){
            mapa[i][j] = 4;
        }
    }
    mapa[1][2] = 0;
    mapa[2][1] = 0;
    mapa[2][2] = 1;
    aSearch.setMap(mapa, Math.pow(size,2))
    
    var ret = aSearch.GetVizinhos(pontoANode);
    
    equal($(ret).size(),2, 'Esperado 2');
});

test(' Test Find Best Path', function(){
    //findBestSearch
    var pontoANode = new nodeBordQueue(2,0)
    var pontoBNode = new nodeBordQueue(0,0)
    var pontoCNode = new nodeBordQueue(0,2)  
    
    var aSearch = new ASearch(pontoANode,pontoBNode,pontoCNode);
    var size = 9;
    var mapa = []
    for(var i = 0; i < size; i++){
        mapa[i] = []
        for(var j = 0; j < size; j++){
            mapa[i][j] = 4;
        }
    }
    
    mapa[0][1] = 1;
    mapa[1][2] = 1;
    mapa[2][1] = 1;
    mapa[2][2] = 1;
    
    
    //PF - PP
    //X  X  -
    //PI -  -
    //X= nao anda
    //-= Anda
    aSearch.setMap(mapa, Math.pow(size,2));
    
    aSearch.findBestPath()
    
    equal(true,true)
});

test(' Test Exist in Closed Queue', function(){
    //findBestSearch
    var pontoANode = new nodeBordQueue(2,0)
    var pontoBNode = new nodeBordQueue(0,0)
    var pontoCNode = new nodeBordQueue(0,2)  
    
    var aSearch = new ASearch(pontoANode,pontoBNode,pontoCNode);
    aSearch.closedQueue.push(pontoANode);
    equal(aSearch.existsInClosedQueue(pontoANode),true, 'Esperado TRUE');
});
    