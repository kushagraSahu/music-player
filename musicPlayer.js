var musicPlayer = (function(){
	var input,musicLink,playerId,button,input_box,el_search,el_name,curr_name;
	var obj_preview, obj_title, obj_id,playList, songList;
	function localstore(a,b,c){
		new_object = {
			obj_preview : a,
			obj_title : b,
			obj_id :c
		};
		songList = JSON.parse(localStorage.getItem("allSongs"));
	    if(songList == null) {
	    	songList = [];
	    }
	    var i,mark=false;
	    for(i=0;i < songList.length;i++){
	    	if(new_object.obj_id === songList[i].obj_id){
	    		songList.splice(i,1);
	    		mark = true;
	    	break;
	  		}
	    }
	    	songList.push(new_object);
	    
	    localStorage.setItem('allSongs',JSON.stringify(songList));
	    console.log(songList[songList.length - 1].obj_title);

	    playList = document.getElementById('playlist');
	    playlist.innerHTML ="";
		for(i=songList.length-1;i>=0;i--){
	    	playlist.innerHTML += (JSON.parse(localStorage.getItem("allSongs")))[i].obj_title + '<br>';
	    }
	}
	function play(tag){
		input = tag;
		playerId = document.getElementById('player');
		el_name = document.getElementById('current_name');
		$.ajax({
			url : 'https://deezerdevs-deezer.p.mashape.com/search',
			method : 'GET',
			data : {'q' : input},
			dataType : 'json',
			headers : {
				'X-Mashape-Key': 'MmFcrmc3YlmshXSE61LLJ7tFAL2Zp1VWu8Djsnvs1SMuEuKi30',
  				'Accept': 'text/plain'
			},
			success: function(result) {
				musicLink = result.data[0].preview;
				curr_name = result.data[0].title;
				el_name.innerHTML = " " + result.data[0].title;
				el_id = result.data[0].id;
				localstore(musicLink, curr_name, el_id);
				playerId.src = musicLink;
				playerId.load();
				playerId.play();
			}
        });
	}
	function play2(e){
		e.preventDefault();
		el_search = document.getElementById('search');
		playerId = document.getElementById('player');
		el_name = document.getElementById('current_name');
		input_box = el_search.value;
		$.ajax({
			url : 'https://deezerdevs-deezer.p.mashape.com/search',
			method : 'GET',
			data : {'q' : input_box},
			dataType : 'json',
			headers : {
				'X-Mashape-Key': 'MmFcrmc3YlmshXSE61LLJ7tFAL2Zp1VWu8Djsnvs1SMuEuKi30',
  				'Accept': 'text/plain'
			},
			success: function(result) {
				musicLink = result.data[0].preview;
				curr_name = result.data[0].title;
				el_name.innerHTML = "Current Song: " + result.data[0].title;
				el_id = result.data[0].id;
             	localstore(musicLink, curr_name, el_id);
				playerId.src = musicLink;
				playerId.load();
				playerId.play();
			}
        });
	}
	function pause(){
		playerId = document.getElementById('player');
		playerId.pause();
	}
	function resume(){
		playerId = document.getElementById('player');
		playerId.play();
	}
	function init(){
		if (annyang) {
              var commands = {
                'play *tag': play,
                'pause' : pause,
                'resume' : resume
              };
              annyang.addCommands(commands);
              annyang.start();
            }
		}
		button = document.getElementById('btn');
		button.addEventListener('click', play2);
	return {
		init : init
	};
})();