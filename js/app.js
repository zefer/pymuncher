App = {	
	load: function() {
		jo.load();
	
		document.body.addEventListener('touchmove', function(e) {
		    e.preventDefault();
			joEvent.stop(e);
		}, false);
		
		// this is a more complex UI with a nav bar and a toolbar
		this.scn = new joScreen(
			new joContainer([
				new joFlexcol([
					this.nav = new joNavbar(),
					this.stack = new joStackScroller()
				]),
			
			]).setStyle({position: "absolute", top: "0", left: "0", bottom: "0", right: "0"})
		);
		
		this.nav.setStack(this.stack);
		
		this.py = new joInput(""),
		this.stack.push(joCache.get("pycalc"));
		
		joGesture.backEvent.subscribe(this.stack.pop, this.stack);
		
	}
};

joCache.set("pycalc", function() {
	
	var mins = new joInput("");
	var secs = new joInput("");
	var py = App.py;
	
	// use number input keyboards on mobile devices
	mins.container.setAttribute('type','number');
	secs.container.setAttribute('type','number');
	py.container.setAttribute('type','number');
	
	var card = new joCard([
		// new joTitle("pymuncher"),
		new joGroup([
			new joLabel("Race duration"),
			new joFlexrow([
				mins,
				new joLabel("m").setStyle('time-label'),
				secs,
				new joLabel("s").setStyle('time-label')
			])
		]),
		
		new joGroup([
			new joLabel("Boat PY"),
			new joFlexrow([
				py
				,
				new joButton("Lookup").selectEvent.subscribe(function() {
					// App.scn.showPopup(joCache.get("pylookpopup"));
					App.stack.push(joCache.get("pylookup"));
				})
			])
		]),
		
		new joButton("Calculate corrected time").selectEvent.subscribe(function() {
			var s = (parseInt(mins.getData()) * 60) + parseInt(secs.getData());
			// scale to UK PY scale
			s = s * 1000;
			// corrected time in seconds
			var corrected_s = s/parseInt(py.getData());
			// as minutes & seconds
			var minutes = Math.floor(corrected_s / 60);
			var seconds = Math.round(corrected_s - minutes * 60);
			
			App.scn.alert(minutes + " minutes " + seconds + " seconds");
		})
	])
	
	card.setTitle("pymuncher");
	
	return card;
});

joCache.set("pylookup", function() {
	
	var boats = ['ALBACORE','ENTERPRISE','FIREBALL','GP14','LASER','LASER 2000','LASER RADIAL','RS 200','RS 400','SOLO','STREAKER','SUPERNOVA','505','BLAZE','BUZZ','COMET','CONTENDER','FINN','GRADUATE','LARK','LASER 4.7','LIGHTNING 368','MERLIN-ROCKET*','MIRROR','NATIONAL 12*','OK','OSPREY','PHANTOM','RS 300','RS 600','RS 700','RS 800','RS VAREO','SCORPION','TASAR','TOPPER','WAYFARER','420','29ER','49ER','B14','BRITISH MOTH','BYTE','BYTE CII','CADET','CANOE INTERNATIONAL','CANOE INTERNATIONAL','COMET TRIO','EUROPE','FIREFLY','HORNET','ISO','JAVELIN','KESTREL','LASER 3000','LASER 4000','LASER 5000','LASER II','LASER EPS','LASER PICO RACE','LASER PICO RACE','LASER STRATOS','LASER VAGO XD','LASER VORTEX','MIRACLE','MUSTO SKIFF','OPTIMIST','ROOSTER 8.1','RS 500','RS FEVA XL','RS TERA SPORT','RS VISION','SOLUTION','TOPAZ UNO','TOPPER XENON','WANDERER','CHERUB*','INTERNATIONAL 14*','MOTH INTERNATIONAL *','RS 100','FLYING FIFTEEN','SQUIB','J24','J 80','RS K6','TEMPEST','K1','SPRINT 15 SPORT ','DART 18','CHALLENGER','SPRINT 15 ','SPITFIRE','DART 16','FORMULA 18','HOBIE 16','HURRICANE 5.9','TORNADO','A CLASS*'];
	var PYs = [1064,1117,980,1127,1082,1090,1106,1057,949,1153,1162,1065,902,1046,1003,1179,993,1060,1160,1073,1175,1152,1006,1385,1087,1109,940,1030,1000,920,858,822,1038,1053,1023,1297,1101,1087,924,740,874,1164,1170,1140,1432,870,905,1085,1143,1168,979,926,926,1040,1032,911,846,1035,1020,1260,1265,1089,1064,937,1190,860,1646,1052,972,1200,1459,1085,1074,1218,1070,1140,941,825,650,998,1023,1119,935,876,903,942,1060,886,800,1174,917,712,853,690,805,689,644,681];
	
	var data = [];
	
	for(var i=0; i<boats.length; i++)
	{
		data.push({ title: boats[i], id: PYs[i] });
	}
	
	var card = new joCard([
		// new joTitle("Select a boat below"),
		new joMenu(data).selectEvent.subscribe(function(id) {
			console.log(id);
			App.py.setData(id);
			App.stack.pop();
		})
	]);
	
	card.setTitle("Choose boat");
	
	return card;
});

/*joCache.set("pylookpopup", function() {
	
	var boats = ['ALBACORE','ENTERPRISE','FIREBALL','GP14','LASER','LASER 2000','LASER RADIAL','RS 200','RS 400','SOLO','STREAKER','SUPERNOVA','505','BLAZE','BUZZ','COMET','CONTENDER','FINN','GRADUATE','LARK','LASER 4.7','LIGHTNING 368','MERLIN-ROCKET*','MIRROR','NATIONAL 12*','OK','OSPREY','PHANTOM','RS 300','RS 600','RS 700','RS 800','RS VAREO','SCORPION','TASAR','TOPPER','WAYFARER','420','29ER','49ER','B14','BRITISH MOTH','BYTE','BYTE CII','CADET','CANOE INTERNATIONAL','CANOE INTERNATIONAL','COMET TRIO','EUROPE','FIREFLY','HORNET','ISO','JAVELIN','KESTREL','LASER 3000','LASER 4000','LASER 5000','LASER II','LASER EPS','LASER PICO RACE','LASER PICO RACE','LASER STRATOS','LASER VAGO XD','LASER VORTEX','MIRACLE','MUSTO SKIFF','OPTIMIST','ROOSTER 8.1','RS 500','RS FEVA XL','RS TERA SPORT','RS VISION','SOLUTION','TOPAZ UNO','TOPPER XENON','WANDERER','CHERUB*','INTERNATIONAL 14*','MOTH INTERNATIONAL *','RS 100','FLYING FIFTEEN','SQUIB','J24','J 80','RS K6','TEMPEST','K1','SPRINT 15 SPORT ','DART 18','CHALLENGER','SPRINT 15 ','SPITFIRE','DART 16','FORMULA 18','HOBIE 16','HURRICANE 5.9','TORNADO','A CLASS*'];
	var PYs = [1064,1117,980,1127,1082,1090,1106,1057,949,1153,1162,1065,902,1046,1003,1179,993,1060,1160,1073,1175,1152,1006,1385,1087,1109,940,1030,1000,920,858,822,1038,1053,1023,1297,1101,1087,924,740,874,1164,1170,1140,1432,870,905,1085,1143,1168,979,926,926,1040,1032,911,846,1035,1020,1260,1265,1089,1064,937,1190,860,1646,1052,972,1200,1459,1085,1074,1218,1070,1140,941,825,650,998,1023,1119,935,876,903,942,1060,886,800,1174,917,712,853,690,805,689,644,681];
	
	var select = new joSelect(boats);
	
	var popup = [
		new joGroup([
			new joFlexrow(select)
		]),
		new joButton("Done").selectEvent.subscribe(pop)
	];
	
	function pop() {
		App.py.setData(PYs[select.list.getIndex()]);
		App.scn.hidePopup();
	}
	
	return popup;
});*/
