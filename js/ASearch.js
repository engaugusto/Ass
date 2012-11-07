/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
ASearch = (function(){
    /*Var*/
    var queue;
    var closedQueue;
    var currentNode = null;
    var passouPeloPosto = false;
    var map = null;
    var mapSize;
    var pontoInicial = null;
    var pontoIni, pontoFim, pontoPosto;
    
    /*Properties*/
    ASearch.prototype.getCurrentNode = function(){
        return this.currentNode;
    }
    
    ASearch.prototype.setCurrentNode = function(value){
        this.currentNode = value;
    }
    
    ASearch.prototype.getPontoIni = function(){
        return this.pontoIni;
    }
    
    ASearch.prototype.getPontoFim = function(){
        return this.pontoFim;
    }
    
    ASearch.prototype.getPontoPosto = function(){
        return this.pontoPosto;
    }
    
    ASearch.prototype.getQueue = function(){
        return this.queue;
    }
    
    ASearch.prototype.getClosedQueue= function(){
        return this.closedQueue;
    }
    
    ASearch.prototype.getPassouPeloPosto = function(){
        return this.passouPeloPosto;
    }
    
    ASearch.prototype.setPassouPeloPosto = function(value){
        this.passouPeloPosto = value;
    }
    
    
    ASearch.prototype.getMap = function(){
        return this.map;
    }
    
    ASearch.prototype.getMapSize = function(){
        return this.mapSize;
    }
    
    ASearch.prototype.setMap = function(mapValue, mapSize){
        this.map = mapValue;
        this.mapSize = mapSize;
    }
    
    /*Construtor*/
    function ASearch(pontoIni, pontoFim, pontoPosto){
        this.queue = [];
        this.closedQueue = [];
        this.passouPeloPosto = false;
        
        pontoIni.setTipoNo(1);
        this.pontoIni = pontoIni;
        
        pontoFim.setTipoNo(2);
        this.pontoFim = pontoFim;
        
        pontoPosto.setTipoNo(3);
        this.pontoPosto = pontoPosto;
    }
        
    /*Public Function*/
    ASearch.prototype.findBestPath = function(){
        //add initial square
        
        
        this.queue.push(this.pontoIni)
        
        var vizinhos = null;
        return;
        do{
             //getting the current Node
             this.currentNode = this.queue.shift()    
             //moving to the closed list
             this.closedQueue.push(this.currentNode)
             //TODO: Parei Aqui
             vizinhos = GetVizinhos(this.currentNode)
             
             //vizinhos.length = 8
             for(var i = 0; i < vizinhos.length; i++){
                 AddIfDontExists(vizinhos[i])
             }
            this.closedQueue.push(this.currentNode);
            
            
        }while(FoundDestination() || EndOfList());
        
    }
    
    ASearch.prototype.FoundDestination = function(){
        return this.passouPeloPosto == true && this.currentNode.getTipoNo() == 2;
    }
    
    ASearch.prototype.EndOfList = function(){
        return ($(this.queue).size() == 0);
    }
    
    ASearch.prototype.GetVizinhos = function(node){
        //Finding Neighbourhood 
        var vizinhos = []
        
        var iNode = node.getPosX();
        var jNode = node.getPosY();
        
        //fixing the size of the map
        var size = Math.sqrt(this.mapSize)
        size--; 
       
        ///var iNode = posX*size-1;
        //var jNode = (size-(size-posY))-1;
        
        //getting the 4 near
        if(iNode+1<=size)
            if(this.map[iNode+1][jNode]!=4)
                vizinhos.push(this.map[iNode+1][jNode]);
        if(iNode-1>=0)
            if(this.map[iNode-1][jNode]!=4)
                vizinhos.push(this.map[iNode-1][jNode]);
        if(jNode+1<=size)
            if(this.map[iNode][jNode+1]!=4)
                vizinhos.push(this.map[iNode][jNode+1]);        
        if(jNode-1>=0)
            if(this.map[iNode][jNode-1]!=4)
                vizinhos.push(this.map[iNode][jNode-1]);
        
        return vizinhos
    }
    
    ASearch.prototype.AddIfDontExists = function(node){
        if(!node.getAccessible())
            return;
        //verify if doesn't exists in the closed list
        if($.inArray(node, this.closedQueue) != -1)
            return
        //if doesn't exists add in the queue
        if($.inArray(node, this.queue) == -1)
            this.queue.push(node)
        
        //Adicionando o nó pai ao corrente nó
        node.addArco(this.currentNode);
        
        //TODO: (Leo) Continuar...
        return;
        /*
        if(this.node.getRealCost() < this.currentNode.getRealCost())
        {
               
        }
        //add queue
        
        //vizinhos[i].setParent(currentNode)*/
    }
    
    return ASearch;
})();


