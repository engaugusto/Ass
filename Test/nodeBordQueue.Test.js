/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
test( "Instanciate Node", function() {
  var objNo = new nodeBordQueue('a','123');
  notEqual( objNo, null, "Valor esperado era 'a' " );
});

test( "Test Get Val", function() {
  var objNo = new nodeBordQueue('a','123');
  equal( objNo.getId(), 'a', "Valor esperado era 'a' " );
});

test( "Test Get Name", function() {
  var objNo = new nodeBordQueue('a','123');
  equal( objNo.getVal(), '123', "Valor esperado era '123' " );
});

test("Test AddArco", function() {
    var objNo = new nodeBordQueue('a', '123');
    var objNo2 = new nodeBordQueue('a', '123');
    objNo.addArco(objNo2)
    ok(true,"nenhum erro");
});

test("Test ProcuraNoPorId", function() {
    var objNo = new nodeBordQueue('a', '123');
    var objNo2 = new nodeBordQueue('b', '444');
    objNo.addArco(objNo2)
    
    var objConsultado = objNo.procuraNoPorId('b');
    //notEqual(objConsultado,-1);
    
    equal(objConsultado.getId(), objNo2.getId(), "Esperado serem iguais a 'a'")
});

test("Test Quantidade Arcos Nó", function() {
    var objNo = new nodeBordQueue('a', '123');
    var objNo2 = new nodeBordQueue('b', '444');
    objNo.addArco(objNo2)
    
    
    equal(objNo.getArcoCount(), 1, "Esperado serem iguais a 1")
});

test("Test Remover Nó Arco", function() {
    var objNo = new nodeBordQueue('a', '123');
    var objNo2 = new nodeBordQueue('b', '444');
    
    objNo.addArco(objNo2)
    objNo.removeArco('b')
    
    equal(objNo.getArcoCount(), 0, "Esperado serem iguais a 0")
});