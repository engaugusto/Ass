/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
ASearch = (function(){
    /*Var*/
    var queue;
    var closedQueue;
    
    var pontoInicial = null;
    var pontoIni, pontoFim, pontoPosto;
    
    /*Properties*/
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
    
    /*Construtor*/
    function ASearch(pontoIni, pontoFim, pontoPosto){
        this.queue = [];
        this.closedQueue = [];
        
        this.pontoIni = pontoIni;
        this.pontoFim = pontoFim;
        this.pontoPosto = pontoPosto;
    }
        
    /*Public Function*/
    ASearch.prototype.findBestPath = function(){
        //add initial square
        
        
        queue.push(this.pontoIni)
        var currentNode = null;
        var vizinhos = null;
        return;
        do{
             //getting the current Node
             currentNode = queue.shift()    
             //moving to the closed list
             closedQueue.push(currentNode)
             vizinhos = currentNode.getVizinhos()
             
             for(var i = 0; i < vizinhos.length; i++){
                 AddIfDontExists(vizinhos[i])
                 
             }
            
        }while(FoundDestination() || EndOfList());
        
    }
    
    ASearch.prototype.FoundDestination = function(){
        
    }
    
    ASearch.prototype.EndOfList = function(){
        
    }
    
    ASearch.prototype.AddIfDontExists = function(node){
        if($.inArray(node, this.queue) != -1)
            return
        //verify if doesn't exists'
        this.queue.push(node)
        //vizinhos[i].setParent(currentNode)
    }
    
    return ASearch;
})();


