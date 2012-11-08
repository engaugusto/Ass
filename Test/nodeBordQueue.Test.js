/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
test( "Instanciate Node", function() {
  var objNo = new nodeBordQueue('a','123', '4');
  notEqual( objNo, null, "O objeto esperado era não nullo " );
});

test( "Test Get Id", function() {
  var objNo = new nodeBordQueue('a','123','3');
  equal( objNo.getId(), 'a', "Valor esperado era 'a' " );
});

test( "Test Get PosX", function() {
  var objNo = new nodeBordQueue('a',2,2);
  equal( objNo.getPosX(), 2, "Valor esperado era '123' " );
});

test( "Test Get PosY", function() {
  var objNo = new nodeBordQueue('a',2,4);
  equal( objNo.getPosY(), 4, "Valor esperado era '123' " );
});

test("Test AddArco", function() {
    var objNo = new nodeBordQueue('a', '123', '123');
    var objNo2 = new nodeBordQueue('a', '123', '123');
    objNo.addArco(objNo2)
    equal(objNo.getArcoCount(),1);
});

test("Test Clear Arco", function() {
    var objNo = new nodeBordQueue('a', '123', '123');
    var objNo2 = new nodeBordQueue('a', '123', '123');
    objNo.addArco(objNo2)
    equal(objNo.getArcoCount(),1);
    objNo.clearArcos()
    equal(objNo.getArcoCount(),0);
});


test("Test ProcuraNoPorId", function() {
    var objNo = new nodeBordQueue('a', '123', '123');
    var objNo2 = new nodeBordQueue('b', '444', '123');
    objNo.addArco(objNo2)
    
    var objConsultado = objNo.procuraNoPorId('b');
    
    equal(objConsultado.getId(), objNo2.getId(), "Esperado serem iguais a 'a'")
});

test("Test Quantidade Arcos Nó", function() {
    var objNo = new nodeBordQueue('a', '123', '123');
    var objNo2 = new nodeBordQueue('b', '444', '123');
    objNo.addArco(objNo2)
    
    
    equal(objNo.getArcoCount(), 1, "Esperado serem iguais a 1")
});

test("Test Remover Nó Arco", function() {
    var objNo = new nodeBordQueue('a', '123', '123');
    var objNo2 = new nodeBordQueue('b', '444', '123');
    
    objNo.addArco(objNo2)
    objNo.removeArco('b')
    
    equal(objNo.getArcoCount(), 0, "Esperado serem iguais a 0")
});

test( "Test RealCost", function() {
  var objNo = new nodeBordQueue('a',2,4);
  objNo.setRealCost(23)
  equal( objNo.getRealCost(), 23, "Valor esperado era '23' " );
});

test( "Test Total Cost", function() {
  var objNo = new nodeBordQueue('a',2,4);
  objNo.setRealCost(23)
  objNo.setHeuristic(55)
  equal( objNo.getTotalCost(), 78, "Valor esperado era '78' " );
});

test( "Test Heuristic ", function() {
  var objNo = new nodeBordQueue('a',2,4);
  objNo.setHeuristic(111);
  equal( objNo.getHeuristic(), 111, "Valor esperado era '111' " );
});

test( "Test Accessible ", function() {
  var objNo = new nodeBordQueue('a',2,4);
  objNo.setAccessible(true);
  equal( objNo.getAccessible(), true, "Valor esperado era true " );
});

test( "Test Tipo No", function() {
  var objNo = new nodeBordQueue(2,2,2);
  objNo.setTipoNo(0)
  equal( objNo.getTipoNo(), 0, "Valor esperado era '0' " );
});

test( "Test Tipo No", function() {
  var objNo = new nodeBordQueue(2,2,2);
  objNo.setTipoNo(0)
  equal( objNo.getTipoNo(), 0, "Valor esperado era '0' " );
  objNo.setTipoNo(1)
  equal( objNo.getTipoNo(), 1, "Valor esperado era '1' " );
  objNo.setTipoNo(2)
  equal( objNo.getTipoNo(), 2, "Valor esperado era '2' " );
  objNo.setTipoNo(3)
  equal( objNo.getTipoNo(), 3, "Valor esperado era '3' " );
  objNo.setTipoNo(4)
  equal( objNo.getTipoNo(), 4, "Valor esperado era '4' " );
});