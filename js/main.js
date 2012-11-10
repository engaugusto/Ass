/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    setLayout('app');
    //set Button
    $('#btnAEstrela').click(findBestSol);
})

//A* Search
findBestSol = function(){
    var pontoANode = new nodeBordQueue(pontoIniPos[0],pontoIniPos[1])
    var pontoBNode = new nodeBordQueue(pontoFimPos[0],pontoFimPos[1])
    var pontoCNode = new nodeBordQueue(pontoPostoPos[0],pontoPostoPos[1])  
    
    var aSearch = new ASearch(pontoANode,pontoBNode,pontoCNode);
    aSearch.setMap(matrixMapa, Math.pow(tamMatrix,2));
    
    aSearch.findBestPath()
}