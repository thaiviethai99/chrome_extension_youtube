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
	var urlServer=result.urlServer;
    $('#name').keyup(function() {
        $('#checkNameError').html('');
    });
    $('#search').click(function() {
        var name=$.trim($("#name").val());
        if(name.length==0){
            $('#checkNameError').html('Please enter channel name');
            return false;
        }
        $("#tableResult").LoadingOverlay("show");
        $.ajax(urlServer, {
            type: "get",
            dataType: 'json', // type of response data
            data: {
                name: $("#name").val()
            },
            success: function(data) { // success callback function
                if(data.info==1){
                    $.each(data.items, function(index, item) {
                        var html = `
                        <tr>
                            <td><img src='${item.thumbnailsUrl}' /></td>
                            <td><a href="https://www.youtube.com/channel/${item.channelId}" target="_blank">${item.title}</a></td>
                            <td>${item.subscriberCountConvert}</td>
                        </tr>
                    `;
                        $('#tableResult').append(html);
                    });
                }else{
                    $('#tableResult').append(`<tr><td colspan="3">No results</td></tr>`);
                }
                
                $("#tableResult").LoadingOverlay("hide");
            },
            error: function(jqXhr, textStatus, errorMessage) { // error callback 
                console.log('Error: ' + errorMessage);
                $("#tableResult").LoadingOverlay("hide");
            }
        });
    });
 })();