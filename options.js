   (async () => {
       function getLocalStorageValue(key) {
           return new Promise((resolve, reject) => {
               try {
                   chrome.storage.sync.get(key, function(value) {
                       resolve(value);
                   })
               } catch (ex) {
                   reject(ex);
               }
           });
       }


       const result = await getLocalStorageValue(["urlServer"]);
       if(result.urlServer){
        $("#urlServer").val(result.urlServer);
       }
       
       $('#buttonUpdate').click(function() {
           var urlServer = $('#urlServer').val();
           if (urlServer) {
               chrome.storage.sync.set({
                   'urlServer': urlServer
               }, function() {
                   //close();
               });
           }
       });
   })();