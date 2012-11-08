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
    ASearch.prototype.calculateRealCost = function(node){
        //Manhattan Style
        var posX = node.getPosX()
        var posY = node.getPosY()
        
        var posFinalX = 0
        var posFinalY = 0
        var realCost = 0
        if(!passouPeloPosto){
            posFinalX = this.pontoPosto.getPosX()
            posFinalY = this.pontoPosto.getPosY()
            
        }else{
            posFinalX = this.pontoFim.getPosX()
            posFinalX = this.pontoFim.getPosY()
        }
        
        realCost = Math.abs(posFinalX-posX)+Math.abs(posFinalY-posY)
        
        var heuristic = 10000000000;
        if(passouPeloPosto)
            heuristic = 0;
        
        node.setRealCost(realCost)
        node.setHeuristic(heuristic)
    }
    
    ASearch.prototype.findBestPath = function(){
        //add initial square
        this.queue.push(this.pontoIni)
        
        var vizinhos = null;
        do{
             //getting the current Node
             this.currentNode = this.queue.shift()    
             //moving to the closed list
             this.closedQueue.push(this.currentNode)
             //TODO: Parei Aqui
             vizinhos = this.GetVizinhos(this.currentNode)
             
             //vizinhos.length = 8
             for(var i = 0; i < vizinhos.length; i++){
                 var selected = vizinhos[i]
                 
                 //TODO: Add If Dont Exists ?
                 //this.AddIfDontExists(this.map[selected.getPosX()][selected.getPosY()])
             }
             //droping
            var dropMinusHeuristic = getMinusHeuristic();
            //check Neighbourhood 
            vizinhos = this.GetVizinhos(dropMinusHeuristic)
            
            for(var i = 0; i < vizinhos.length; i++){
                //Check the G
                if(vizinhos[i].getRealCost() < this.currentNode.getRealCost()){
                   vizinhos[i].clearArcos() 
                   vizinhos[i].addArco(this.currentNode)
                   
                   //Calculate RealCost and Heuristic
                   calculateRealCost(vizinhos[i])
                }
             }
            
        }while(FoundDestination() || EndOfList());
        
        //Drawing into the Screen
        var firstNode = null;
        //firstNode
        firstNode = this.pontoFim
        while(firstNode != null){
            firstNode = firstNode.getArcos()[0]
        }
        console.log(firstNode)
    }
    
    ASearch.prototype.getMinusHeuristic = function(){
        var minusNode = this.queue[0];
        var selected = 0;
        for(var i = 0; i < this.queue; i++){
            if(minusNode.getTotalCost() > this.queue[i].getTotalCost()){
                selected = i;
            }
        }
        return this.queue[selected]
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
        //
        //calculate realCost and Heuristic foreach Node
        
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


