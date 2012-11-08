/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/*nodeBordQueue*/
nodeBordQueue = (function(){
    var arcos = null;
    var id = null;
    var posX = null;
    var posY = null;
    var realCost = 0;
    var heuristic = 0;
    var totalCost;
    var accessible;
    var tipoNo = 0; //0 normal, 1 - pontoInicial, 2 - pontoFinal, 3 - Posto, 4 - Inacessivel
   
    /*Gets and Sets*/
    nodeBordQueue.prototype.getId = function(){
        return this.id;
    }
    nodeBordQueue.prototype.getPosX = function(){
        return this.posX;
    }
    nodeBordQueue.prototype.getPosY = function(){
        return this.posY;
    }
    nodeBordQueue.prototype.getRealCost = function(){
        return this.realCost;
    }
    nodeBordQueue.prototype.setRealCost = function(value){
        this.realCost = value;
    }
    nodeBordQueue.prototype.getHeuristic = function(){
        return this.heuristic;
    }
    nodeBordQueue.prototype.setHeuristic = function(value){
        this.heuristic = value;
    }
    nodeBordQueue.prototype.getAccessible = function(){
        return this.accessible;
    }
    nodeBordQueue.prototype.setAccessible = function(value){
        this.accessible = value;
    }
    nodeBordQueue.prototype.getTipoNo = function(){
        return this.tipoNo;
    }
    nodeBordQueue.prototype.setTipoNo = function(value){
        this.tipoNo = value;
    }
    nodeBordQueue.prototype.getTotalCost = function(){
        return this.realCost + this.heuristic;
    }
    
   
    /*Private Function*/
    getIndiceArrayById = function(noId){
        var findedInd = null;
        $(this.arcos).each(function(ind,obj){
           if(obj.getId() == noId){
               findedInd = ind;
               return false;
           }
        });
        if(findedInd != null)
            return findedInd;
        return null;
    }
    
    /*Construtor*/
    function nodeBordQueue(id, posX, posY){
        this.accessible = true;
        this.arcos = new Array();
        this.id = id;
        this.posX = posX;
        this.posY = posY;
    }
    
    /*Public Function*/
    nodeBordQueue.prototype.getArcoCount = function(){
        return this.arcos.length;
    }
        
    nodeBordQueue.prototype.procuraNoPorId = function(noId){
        var findedObj = null;
        $(this.arcos).each(function(ind,obj){
           if(obj.getId() == noId){
               findedObj = obj;
               return false;
           }
        });
        if(findedObj != null)
            return findedObj;
        return -1;
    }
    
    nodeBordQueue.prototype.addArco = function(novoNo){
        this.arcos.push(novoNo);
        
        return null;
    }
    nodeBordQueue.prototype.removeArco = function(noId){
        this.arcos.remove(getIndiceArrayById(noId));
        
        return null;
    }
    nodeBordQueue.prototype.clearArcos = function(){
        this.arcos = new Array();;
        
        return null;
    }
    
    
    return nodeBordQueue;
})();