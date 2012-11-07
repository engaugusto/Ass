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
             vizinhos = this.currentNode.getVizinhos()
             
             
             //vizinhos.length = 8
             for(var i = 0; i < vizinhos.length; i++){
                 AddIfDontExists(vizinhos[i])
             }
            
        }while(FoundDestination() || EndOfList());
        
    }
    
    ASearch.prototype.FoundDestination = function(){
        return this.passouPeloPosto == true && this.currentNode.getTipoNo() == 2;
    }
    
    ASearch.prototype.EndOfList = function(){
        return ($(this.queue).size() == 0);
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
        
        //TODO: (Leo) Continuar...
        return;
        if(this.node.getRealCost() < this.currentNode.getRealCost())
        {
               
        }
        //add queue
        
        //vizinhos[i].setParent(currentNode)
    }
    
    return ASearch;
})();


