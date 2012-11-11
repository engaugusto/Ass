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
        this.SetInitialPoints()
    }
    
    ASearch.prototype.SetInitialPoints = function(){
        this.map[this.pontoIni.getPosX()][this.pontoIni.getPosY()] = this.pontoIni.getTipoNo();
        this.map[this.pontoFim.getPosX()][this.pontoFim.getPosY()] = this.pontoFim.getTipoNo();
        this.map[this.pontoPosto.getPosX()][this.pontoPosto.getPosY()] = this.pontoPosto.getTipoNo();
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
        if(!this.passouPeloPosto){
            posFinalX = this.pontoPosto.getPosX()
            posFinalY = this.pontoPosto.getPosY()
            
        }else{
            posFinalX = this.pontoFim.getPosX()
            posFinalY = this.pontoFim.getPosY()
        }
        
        realCost = (posX-posFinalX) + (posY-posFinalY)
        if ( realCost < 0)
            realCost = realCost * -1;
        
        var heuristic = 10000000000;
        if(this.passouPeloPosto)
            heuristic = 1;
        else
        {
            if(this.pontoPosto.getPosX() == node.getPosX() 
                && this.pontoPosto.getPosY() == node.getPosY())
                heuristic = 1;
        }
        node.setRealCost(realCost)
        node.setHeuristic(realCost * heuristic)
    }
    
    ASearch.prototype.removeFromQueue = function(node){
        var index = 0;
        for(var i =0;i<$(this.queue).size();i++){
            if(this.queue[i].getId() == node.getId()){
                index = i;
            }
        }
        this.queue.splice(index,1)
    }
    
    ASearch.prototype.findBestPath = function(){
        //add initial square
        this.queue.push(this.pontoIni)
        var meldels = 0;
        var vizinhos = null;
        do{
            //getting the current Node
            this.currentNode = this.getMinusTotalCost() 
            drawNode2(this.currentNode, 'pink')
            //moving to the closed list
            this.closedQueue.push(this.currentNode)
             
            this.removeFromQueue(this.currentNode)
            if (this.currentNode.getTipoNo() == this.pontoPosto.getTipoNo())
            {
                if (this.existsInClosedQueue(this.currentNode))
                    this.passouPeloPosto = true
            }
             
            //TODO: Parei Aqui
            this.queue = [];
            vizinhos = this.GetVizinhos(this.currentNode)
             
            //vizinhos.length = 8
            for(var i = 0; i < vizinhos.length; i++){
                var selected = vizinhos[i]
                //TODO: Add If Dont Exists ?
                this.AddIfDontExists(selected)
            }
            //droping
            var dropMinusHeuristic = this.getMinusRealCost();
            //check Neighbourhood 
            vizinhos = this.GetVizinhos(dropMinusHeuristic)
            
            for(var i = 0; i < vizinhos.length; i++){
                //Check the G
                if(vizinhos[i].getRealCost() < this.currentNode.getRealCost()){
                    vizinhos[i].clearArcos() 
                    vizinhos[i].addArco(this.currentNode)
                   
                    //Calculate RealCost and Heuristic
                    this.calculateRealCost(vizinhos[i])
                }
            }
            if(meldels > 1000){
                console.log('mel dels');
                break;
            }
            meldels=meldels+1;
            if(this.EndOfList())
                break;
        }while(!this.FoundDestination(dropMinusHeuristic));
        
        //Drawing into the Screen
        var firstNode = null;
        var endNode = null;
        //firstNode
        firstNode = this.pontoIni
        endNode = dropMinusHeuristic
        /*while(firstNode != null){
            //console.log(firstNode);
            drawNode(firstNode)
            firstNode = firstNode.getArcos()[0];
        }*/
        while(endNode != null){
            //console.log(firstNode);
            drawNode(endNode)
            endNode = endNode.getArcosBack()[0];
        }        
    //console.log(firstNode);
    }
    
    ASearch.prototype.getMinusRealCost = function(){
        var minusNode = this.queue[0];
        var selected = 0;
        var tmpQueue = this.getValidQueue();
        for(var i = 0; i < $(tmpQueue).size(); i++){
            //if (this.closedQueue.find(minusNode))
                
            if(minusNode.getRealCost() > tmpQueue[i].getRealCost()){
                selected = i;
            }
        }
        //se o ponto for o procurado selecionar o mesmo.
        for(var j = 0; j < $(tmpQueue).size(); j++){
            if(this.passouPeloPosto)
            {
                if(this.pontoFim.getId() == tmpQueue[j].getId())
                {
                    selected = j;
                }                            
            }
            if(!this.passouPeloPosto)
            {
                if(this.pontoPosto.getId() == tmpQueue[j].getId())
                {
                    selected = j;
                }                            
            }            
        }        
        return tmpQueue[selected];
    }
    
    ASearch.prototype.getValidQueue = function(){
        var validQueue = []
        var x = null;
        if($(this.closedQueue).size() == 0)
            return this.queue;
        for (var i = 0; i < $(this.queue).size(); i++){
            for(var j = i; j < $(this.closedQueue).size(); j++){
                if(this.queue[i].getId() != this.closedQueue[j].getId() )
                {
                    x = false;
                }
                else
                {
                    x = true;
                }
            }
            if (!x)
                validQueue.push(this.queue[i]);
            x = false;
        }
        return validQueue;
    }
    
    ASearch.prototype.getMinusTotalCost = function(){
        var minusNode = this.queue[0];
        var selected = 0;
        for(var i = 0; i < $(this.queue).size(); i++){
            if(minusNode.getTotalCost() > this.queue[i].getTotalCost()){
                selected = i;
            }
        }

        for(var j = 0; j < $(this.queue).size(); j++){
            if(this.passouPeloPosto)
            {
                if(this.pontoFim.getId() == this.queue[j].getId())
                {
                    selected = j;
                }                            
            }
            if(!this.passouPeloPosto)
            {
                if(this.pontoPosto.getId() == this.queue[j].getId())
                {
                    selected = j;
                }                            
            }            
        }
        
        return this.queue[selected]
    }
    
    
    ASearch.prototype.FoundDestination = function(node){
        if(this.passouPeloPosto == true && node.getTipoNo() == 2)
            console.log('found destination')
        return this.passouPeloPosto == true && node.getTipoNo() == 2;
    }
    
    ASearch.prototype.EndOfList = function(){
        if($(this.queue).size() == 0)
            console.log('final of list')
        return ($(this.queue).size() == 0);
    }
    
    ASearch.prototype.GetVizinhos = function(node){
        if(node == null)
            console.log('node==null == fuuu')
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
            if(this.map[iNode+1][jNode]!=4){
                var ponto = new nodeBordQueue(iNode+1, jNode);
                ponto.setTipoNo(this.map[iNode+1][jNode])
                vizinhos.push(ponto);
            }
        if(iNode-1>=0)
            if(this.map[iNode-1][jNode]!=4){
                var ponto = new nodeBordQueue(iNode-1, jNode);
                ponto.setTipoNo(this.map[iNode-1][jNode])
                vizinhos.push(ponto);
            }
        if(jNode+1<=size)
            if(this.map[iNode][jNode+1]!=4){
                var ponto = new nodeBordQueue(iNode, jNode+1);
                ponto.setTipoNo(this.map[iNode][jNode+1])
                vizinhos.push(ponto);
            }
        if(jNode-1>=0)
            if(this.map[iNode][jNode-1]!=4){
                var ponto = new nodeBordQueue(iNode, jNode-1);
                ponto.setTipoNo(this.map[iNode][jNode-1])
                vizinhos.push(ponto);
            }
        
        return vizinhos
    }
    
    ASearch.prototype.existsInClosedQueue = function(node){
        for(var i = 0; i < $(this.closedQueue).size(); i++){
            if(this.closedQueue[i].getId() == node.getId())
                return true;
        }
        return false;
    }
    
    ASearch.prototype.AddIfDontExists = function(node){
        if(!node.getAccessible())
            return;
        //verify if doesn't exists in the closed list
        if(this.existsInClosedQueue(node))
            return
        for(var i = 0; i< $(this.queue).size();i++){
            if(this.queue[i].getId() == node.getId())
                return;
        }
        
        //if doesn't exists add in the queue
        if($.inArray(node, this.queue) == -1){
            this.calculateRealCost(node);
            //this.currentNode.clearArcos(); 
            //this.currentNode.addArco(node);        
            //this.currentNode.clearArcos();
            node.clearArcos_Back();
            node.addArco_back(this.currentNode);
            
            if(!this.passouPeloPosto)
            {
                this.currentNode.addArco(node);    
            }
            
            
            this.queue.push(node)
        }
        
        //Adicionando o nó pai ao corrente nó
        
        
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


