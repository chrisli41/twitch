/**
 * Created by christopherli on 10/12/16.
 */
$(document).ready(function(){
    
    function ajaxC(cName){
        
        return $.ajax({
            type: 'GET',
            url: 'https://api.twitch.tv/kraken/streams/' + cName,
            headers: {
                'Client-ID': 's9dy8qhpftydmeqgctbtyoljtu4hds'
            }
        })
    }

    $.when(ajaxC('reckful'), ajaxC('nl_kripp'), ajaxC('arteezy'), ajaxC('reynad27')).done(function(a1, a2, a3, a4){

        console.log(a1);
        console.log(a3);
        var streams = [];

        for(var i = 0; i < arguments.length; i++){

            var streamObj = arguments[i][0];

            if(streamObj.stream === null){
                streams.push({
                    'name': streamObj._links.channel,
                    'status': 'Offline',
                    'logo': '#',
                    'game': 'N/A'
                });
            }

            else {
                streams.push({
                    'name': streamObj._links.channel,
                    'status': 'Online',
                    'logo': streamObj.stream.channel.logo,
                    'game': streamObj.stream.channel.game
                });
            }
        }

        function convertHTML(obj){

            var html = '<div class="entry"><div class="left"><img src="' + obj.logo + '"/></div><div class="right"><span class="name">' + obj.name + '</span><span class="status">' + obj.status + '</span><span class="game">' + obj.game + '</span></div></div>'
            $('#entries').append(html);

        }

        streams.forEach(convertHTML);



        /*
         <div class="entry">
            <div class="left">
                <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/arteezy-profile_image-f2f55f87a5cd6e15-300x300.png">
            </div>
            <div class="right">
             <span class="name">Name</span>
             <span class="status">Status</span>
             <span class="title">Title</span>
             <span class="game">Game Name</span>
            </div>
         </div>
         */
        
    });
    
});