/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/*nodeBordQueue*/
nodeBordQueue = (function(){
    var arcos = null;
    var id = null;
    var val = null;
   
    /*Gets and Sets*/
    nodeBordQueue.prototype.getId = function(){
        return this.id;
    }
    nodeBordQueue.prototype.getVal = function(){
        return this.val;
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
    function nodeBordQueue(id, val){
        this.arcos = new Array();
        this.id = id;
        this.val = val;
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
    
    return nodeBordQueue;
})();