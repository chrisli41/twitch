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

    $.when(ajaxC('reckful'), ajaxC('nl_kripp'), ajaxC('arteezy'), ajaxC('reynad27'), ajaxC('leveluplive'), ajaxC('trumpsc'), ajaxC('admiralbulldog'), ajaxC('PlayHearthstone'), ajaxC('freecodecamp')).done(function(a1, a2, a3, a4, a5, a6, a7, a8, a9){

        function shorten(gameName){
            return gameName.length > 27 ? gameName.slice(0,24) + '...' : gameName;
        }

        function formatName(url){
            var name = url.slice(38);
            return name.substr(0,1).toUpperCase() + name.substr(1);
        }

        function convertHTML(obj){
            var status = obj.status === 'Online' ? 'statusonline' : 'statusoffline';
            var html = '<a href="' + obj.link + '"><div class="entry"><div class="left"><img src="' + obj.logo + '"/></div><div class="right"><span class="name">' + obj.name + '</span><span class="' + status + '">' + obj.status + '</span><span class="game">Currently Playing: ' + shorten(obj.game) + '</span></div></div></a>'
            $('#entries').append(html);

        }

        var streams = [];
        var offline = [];
        var online = [];

        for(var i = 0; i < arguments.length; i++){

            var streamObj = arguments[i][0];

            if(streamObj.stream === null){
                offline.push({
                    'name': formatName(streamObj._links.channel),
                    'link': '#',
                    'status': 'Offline',
                    'logo': 'http://placehold.it/300x300',
                    'game': 'N/A'
                });
            }

            else {
                online.push({
                    'name': formatName(streamObj._links.channel),
                    'link': streamObj.stream.channel.url,
                    'status': 'Online',
                    'logo': streamObj.stream.channel.logo,
                    'game': streamObj.stream.channel.game
                });
            }
        }

        streams = online.concat(offline);
        streams.forEach(convertHTML);


        $('#all').click(function(){
            $('#online').removeClass('active');
            $('#offline').removeClass('active');
            $(this).addClass('active');

            $('#entries').html('');
            streams.forEach(convertHTML);
        });

        $('#online').click(function(){
            $('#all').removeClass('active');
            $('#offline').removeClass('active');
            $(this).addClass('active');

            $('#entries').html('');
            online.forEach(convertHTML);
        });

        $('#offline').click(function(){
            $('#online').removeClass('active');
            $('#all').removeClass('active');
            $(this).addClass('active');

            $('#entries').html('');
            offline.forEach(convertHTML);
        });


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