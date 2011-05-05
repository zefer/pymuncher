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
		
		this.stack.push(joCache.get("pycalc"));
		
		joGesture.backEvent.subscribe(this.stack.pop, this.stack);
		
	}
};

joCache.set("pycalc", function() {
	
	var mins = new joInput("");
	var secs = new joInput("");
	var py = new joInput("");
	
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
				new joLabel("m"),
				secs,
				new joLabel("s")
			])
		]),
		
		new joGroup([
			new joLabel("Boat PY"),
			new joFlexrow([
				py
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
