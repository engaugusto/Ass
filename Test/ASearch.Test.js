/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

test( "Test Constructor parameters", function() {
  //id, posX, posY
  var pontoANode = new nodeBordQueue(1,2,3)
  var pontoBNode = new nodeBordQueue(2,4,7)
  var pontoCNode = new nodeBordQueue(3,5,9)  
  
  var aSearch = new ASearch(pontoANode,pontoBNode,pontoCNode);
  
  equal( aSearch.getPontoIni(), pontoANode, "Valor esperado era o objeto nodeBordQueue " );
  equal( aSearch.getPontoFim(), pontoBNode, "Valor esperado era o objeto nodeBordQueue " );
  equal( aSearch.getPontoPosto(), pontoCNode, "Valor esperado era o objeto nodeBordQueue " );
});

test( "Test Add If Not Exists Fail", function() {
    var pontoANode = new nodeBordQueue(1,2,3)
    var pontoBNode = new nodeBordQueue(2,4,7)
    var pontoCNode = new nodeBordQueue(3,5,9)  
    
    var aSearch = new ASearch(pontoANode,pontoBNode,pontoCNode);
    
    var pontoExistente = pontoANode;
    
    aSearch.getQueue().push(pontoExistente)
    
    var oldLength = $(aSearch.getQueue()).size();
    
    aSearch.AddIfDontExists(pontoExistente)
    
    equal( oldLength, $(aSearch.getQueue()).size(), "Valor esperado era Count + 1" );
});

test( "Test Add If Not Exists Add", function() {
    var pontoANode = new nodeBordQueue(1,2,3)
    var pontoBNode = new nodeBordQueue(2,4,7)
    var pontoCNode = new nodeBordQueue(3,5,9)  
    
    var aSearch = new ASearch(pontoANode,pontoBNode,pontoCNode);
    
    var novoPonto = new nodeBordQueue(3,5,6);
    
    var oldLength = $(aSearch.getQueue()).size();
    
    aSearch.AddIfDontExists(novoPonto)
    
    equal( oldLength+1, $(aSearch.getQueue()).size(), "Valor esperado era Count + 1" );
});

