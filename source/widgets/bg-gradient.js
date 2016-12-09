export default {
  _create() {
    console.log('fgfgfg');
  	let
  		hue = 360
    ;
  	setInterval(() => {
  		let
  			col1 = Math.abs((hue % 720) - 360)
  			,col2 = Math.abs(((hue+90) % 720) - 360)
  		;
  		hue++;
  		this.element.css('background', `linear-gradient(to right, hsl(${col1},70%, 75%) 0%,hsl(${col2},90%,75%) 100%)`);
  	}, 64);
  },

  destroy() {
    $.Widget.prototype.destroy.call(this);
  },
};
