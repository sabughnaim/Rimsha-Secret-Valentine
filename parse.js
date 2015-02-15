Parse.initialize("p3WFau7rwXnsUVQKNOhSbuztub7D8fe4q2unlAm9", "lWi3UcUdbfQRF9P9H1oF1idIW6LhUq7dFXck5RM1");

var debuggingBackend = false;

function loadPantry(userID, successCallback) {
    var table = Parse.Object.extend('Pantry');
    var query = new Parse.Query(table);
    var list = [];
    
    query.equalTo('userID',userID);
    query.find({
        success : function (results) {
            for(var i = 0; i < results.length; i++){
                list.push(results[i]);
                
            }
            
            if(debuggingBackend){
                console.log('pantry:');
                console.log(list);
            }
            
            successCallback(list);
            return list;
        },
        
        error : function (error) {
            alert("Error: " + error.code + " " + error.message); 
        }
    });
    return query;
}

function backendAddRecipe(userID,recipeID,recipeName, picURL) {
                
    var table = Parse.Object.extend("Recipe");
    var RecipeTable = new table();

    RecipeTable.set("userID", userID);
    RecipeTable.set("recipeID", recipeID);
    RecipeTable.set("recipeName",recipeName);
    RecipeTable.set("picURL", picURL); 


    RecipeTable.save(null, {
      success: function(RecipeTable) {
        // Execute any logic that should take place after the object is saved.
        alert('Successfully added into your favorite recipes!');
      },
      error: function(RecipeTable, error) {
        
        alert('Failed to create new object, with error code: ' + error.description);
      }
    });
}

function backendGetRecipe(userID, callback){
    var list = [];
	var table = Parse.Object.extend("Recipe");
	var query = new Parse.Query(table);
	query.equalTo("userID", userID);
	query.find({
        success: function(results) {
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) { 
                var object = results[i];
                list.push(object);
            }
            
            if(debuggingBackend){
                console.log(list);
            }
            
            callback(list);
            return list;
          },
          
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
    });
    
  return query;
}

function backendAddPantry(userID,Item) {
                
    var table = Parse.Object.extend("Pantry");
    var PantryTable = new table();

    PantryTable.set("userID", userID);
    PantryTable.set("Item", Item);
   
    PantryTable.save(null, {
      success: function(PantryTable) {
        // Execute any logic that should take place after the object is saved.
        if(debuggingBackend) {
            alert('New object created with objectId: ' + PantryTable.id);
        }
      },
      error: function(PantryTable, error) {
        
        alert('Failed to create new object, with error code: ' + error.description);
      }
    });
}

function backendDeletePantry(userID,Item){

  var table = Parse.Object.extend("Pantry");
  var query = new Parse.Query(table);
  query.equalTo("userID", userID);
  query.equalTo("Item",Item);
  query.find({
        success: function(results) {
            // Do something with the returned Parse.Object values
            results[0].destroy({
              success: function(results){alert("delete success")},
              error: function(results){}
            });
          },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
    });
return query;
}

