function Layer(num, gap, container, alpha, scale, delta) {
  this.num = num;
  this.gap = gap;
  this.sprite = [];
  this.container = container;
  this.delta = delta;
  this.alpha = alpha;
  this.scale = scale;
  this.ticker = new PIXI.ticker.Ticker();
}
Layer.prototype.setXY = function() {

	this.container.x = centerX;
	this.container.y = centerY + 65;
	this.container.alpha = this.alpha;


	for(var i = 0; i < this.num; i++) {
		var tempX = this.gap * Math.cos(((360 / this.num) * i) * Math.PI / 180);
		var tempY = this.gap * Math.sin(((360 / this.num) * i) * Math.PI / 180);
		
		var richText = new PIXI.Text('曾经有个', TextStyle);

		richText.anchor.set(0.5, 0.5);
		richText.position.set(-5, -18);

		var container = new PIXI.projection.Container2d();
		container.addChild(richText);

		var texture = Math.floor ( Math.random ( ) * 10 + 1 ) < 7 ? resources.blue.texture : resources.pink.texture;
		this.sprite.push(new PIXI.projection.Sprite2d(texture));
		
		this.sprite[i].scale.set(this.scale);
		this.sprite[i].anchor.set(.5);
		allSprites.push(this.sprite[i]);

		container.addChild(richText);
		container.addChild(this.sprite[i]);
		this.container.addChild(container);

		container.x = tempX;
		container.y = tempY;

		//this.container.addChild(this.sprite[i]);
		this.sprite[i].interactive = true;
		this.sprite[i].buttonMode = true;
	}
};
Layer.prototype.animate = function() {
	var that = this;
	this.ticker.add(function() {
	    //that.container.rotation += 0.1 * that.delta;

	    that.container.children.forEach(function(value, index){
	    	var tempX = value.x;
	    	var tempY = value.y;
	    	value.x = tempX * Math.cos(0.1 * that.delta) - tempY * Math.sin(0.1 * that.delta);
	    	value.y = tempX * Math.sin(0.1 * that.delta) + tempY * Math.cos(0.1 * that.delta);
	    })
	});
	this.ticker.start();
}
Layer.prototype.stopAnimate = function() {
	this.ticker.stop();
}

function distance(a, b) {
	var xdiff = b.x - a.x;
	var ydiff = b.y - a.y;
	return Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
}

