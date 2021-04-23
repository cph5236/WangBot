var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var Client = require('node-torrent');
const fs = require('fs');
var client = new Client({logLevel: 'DEBUG',downloadPath: 'E:\\photoshop\\Movies & TV\\Pergatory'});
var torrents = [];

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!` 



	var rawdata = fs.readFileSync('WangSayings.json');
	var wangcol = JSON.parse(rawdata);  

    // var wangcol = [
    //     'Wangarang!', 'If your girlfriend asks if she is fat thats a trick', 'what design pattern are you using? Bridge?', 'The dog and cat class both inherit from pet class',
    //     'Java is the supreme language', 'When I was once a boy I coded this program that, I dont know if I should tell you this, but it got around the school fire wall. We used it ethically I swear',
    //     'The House class has variables like fire and size', 'no no no', 'I want none of this', 'dont speak my name', 'thank you', 'Treat code like pretty lady, No Touchy!', 'Be careful with what you say to girlfriends, they are less forgiving than programming.',
    //     'So we have white horse class and black horse class, maybe black horse can jump higher than white horse so we seperate them','you look like you love your country', 
    //     'If you break up with your girlfriend, should you get rid of thier stuff? Yes, same applies when you remove a parent table.','Sure!',
    //     'I didn\'t sleep much last night, I was stuck on a problem and it was scary because I could\'nt figure it out. you guys have felt that way with some of the labs I guess.',
    //     'That was the worst presentation ive ever experienced'];
    var wangpics = ['WangPics/JustDoItWang.png', 'WangPics/wen_li_wang.png', 'WangPics/WenLiWang.png','WangPics/Wangfry.jpg',
    'WangPics/WangGangsta.jpg','WangPics/WangHot.jpg','WangPics/WangKissy.jpg','WangPics/WangMona.jpg','WangPics/WangNun.jpg','WangPics/WangYoda.jpg','WangPics/WindyGirl.gif'];   
    

    if(user !=="WenLiWang"){
	    if (message.toLowerCase().includes('wang')) {
	    	if(message.toLowerCase() ==="wang"){
	    		if(channelID == "302220865272020994")
	    			var wangcol = ['WHY DO YOU SUMMON ME!', 'GET OUT OF MY ROOM I\'M CODING!', 'WHY DONT YOU ASK ME LATER', 'BE A JAVA VAR AND GARBAGE COLLECT YOURSELF AND DONT BOTHER ME IN GENERAL', 'You owe me 5 dollars for messaging me in general' ];
	    		else
	    			var wangcol = ['Why do you Summon me!', 'get out of my room I\'m Coding!', 'Why dont you ask me later', 'Be a java variable and garbage collect yourself', 'My help rates are 49.99 an hour I take apple pay' ];
	        	var rand = Math.floor(Math.random() * wangcol.length);
	    		bot.sendMessage({
		                to: channelID,
		                message: wangcol[rand]
		            });
	    	}else if(message.toLowerCase().includes("!wangsaying")){
	    		if(message.substring(0,11)==="!wangsaying"){
		    		var saying= message;
		    		saying = saying.substring(11,saying.length);
		    		saying.trim();
		    		wangcol.push(saying);
		    		let data = JSON.stringify(wangcol);
					fs.writeFileSync('WangSayings.json', data);

					bot.sendMessage({
			                to: channelID,
			                message: "Oh! good suggestion I'll consider it."
			            });
	    		}
	    		else{
	    			bot.sendMessage({
			                to: channelID,
			                message: "Oh! I might take your consideration if you did it properly."
			            });
	    		}
	    		
	    	}else if(message.toLowerCase().includes("!wangwhatdoyouknow")){
	    		if(message.substring(0,18)==="!wangwhatdoyouknow"){
	    			var i;
	    			var total = 0 ; 
	    			var output;
	    			for(i=0; i < wangcol.length; i++ ){
	    				total+= wangcol[i].length;
	    				if(total < 1750){
	    					output +=wangcol[i]+"\n\n";
	    				}else {
	    					bot.sendMessage({
				                to: channelID,
				                message: output
				            });
				            i--;
				            total=0;
				            output = "";
	    				}
	    			}
	    			bot.sendMessage({
				                to: channelID,
				                message: output
				            });	    		

					

	    		}
	    		else{
	    			bot.sendMessage({
			                to: channelID,
			                message: "Oh! I might tell you if you ask properly."
			            });
	    		}
	    		
	    	}else if(message.toLowerCase().includes("!wangshowyourself")){
	    		if(message.substring(0,18)==="!wangshowyourself"){    			
	    			var picrand = Math.floor(Math.random() * wangpics.length);	
				  	bot.uploadFile({
	                to: channelID,
	                file: wangpics[picrand],
	                message: wangcol[rand]
	            	});
	    			    							
	    		}
	    		else{
	    			bot.sendMessage({
			                to: channelID,
			                message: "Oh! I might show you if you ask properly."
			            });
	    		}
	    		
	    	}
	    	else{
		        var rand = Math.floor(Math.random() * wangcol.length);
		        var picture = Math.floor(Math.random() * 50);
		        if (picture==1) {
		            var picrand = Math.floor(Math.random() * wangpics.length);
		            bot.uploadFile({
		                to: channelID,
		                file: wangpics[picrand],
		                message: wangcol[rand]
		            });
		        }
		        else {
		            bot.sendMessage({
		                to: channelID,
		                message: wangcol[rand]
		            });
		        }
		    }
	        
	        
	                
	    }
	    if(message.toLowerCase().includes("magnet")){
	    	var saying= message;
	    	saying = saying.substring(6,saying.length);
	    	var torrent = client.addTorrent(saying);
	    	if(!isEmpty(torrent)){
	    		torrents.push(torrent);
	    	}	    	
	    	// when the torrent completes, move it's files to another area
			// torrent.on('complete', function() {
			//     	console.log('complete!');
			//     	torrent.files.forEach(function(file) {
			//         var newPath = 'C:\\Users\\hanli\\Documents\\Bot/path/' + file.path;
			//         fs.rename(file.path, newPath);
			//         // while still seeding need to make sure file.path points to the right place
			//         file.path = newPath;
			//     });
			// });
	    	bot.sendMessage({
                to: channelID,
                message: "Yes I like the pirate life. Retreiving that for you!"
		    });
	    }
	    if(message.toLowerCase().includes("torstats")){	    	
	    	//var torrents = client.torrents;
	    	// when the torrent completes, move it's files to another area
	    	if(!isEmpty(torrents)){
    			for (var i = torrents.length - 1; i >= 0; i--) {
    				var torrent = torrents[i]
	    			var stats = torrent.stats;
	    			bot.sendMessage({
                		to: channelID,
                		message: torrent.name + JSON.stringify(stats)
		    		});
    			}	    		

	    	}else{
	    		bot.sendMessage({
                	to: channelID,
                	message: "No stats here"
		    	});
	    	}	    	
	    }

	}
});

// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}