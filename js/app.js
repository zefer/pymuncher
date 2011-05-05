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
	var card = new joCard([
		// new joTitle("pymuncher"),
		new joGroup([
			new joLabel("Race duration"),
			new joFlexrow([
				new joInput("0"),
				new joLabel("m"),
				new joInput("0"),
				new joLabel("s")
			])
		]),
		
		new joGroup([
			new joLabel("Boat PY"),
			new joFlexrow([
				new joInput("0")
			])
		]),
		
		new joButton("Calculate corrected time").selectEvent.subscribe(function() {
			App.scn.alert("yo");
		})
	])
	
	card.setTitle("py muncher");
	
	return card;
});
