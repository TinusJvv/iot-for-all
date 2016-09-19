
(function($) {
	
	// Display screen//
	$.widget("iot.messagescreen", {
		options: {
			head: [],
			data: [],
			textheight: '20px',
			width: 'auto',
			height: '100px',
			border : 0
		},	
		_create: function () {
			var tablecontent = "<tr>";
			for(i=0; i < this.options.head.length; i++) {
				tablecontent += '<td><strong>' + this.options.head[i] + '</strong></td>';
			}
			tablecontent += "</tr>";
			for(i in this.options.data) {
				tablecontent += "<tr>";
					for(k=0; k < this.options.data[i].length; k++) {
						tablecontent += '<td>' + this.options.data[i][k] + '</td>';
					}
				tablecontent += "</tr>";
			}
            $(this.element).html(
						'<div class="message-container bevel-down5 clearfix">' +
							'<table border=' + this.options.border + ' style="width: 100%;">' +
								tablecontent +
							'</table>' +
						'</div>');
			$(this.element).find('.message-container').css({
				'font-size': this.options.textheight,
				width: this.options.width,
				height: this.options.height,
				color: 'white',
				background: '#2f2fff',
				'box-shadow': 'inset 0 1px 1px rgba(0, 0, 0, 0.075),0 0 10px rgba(38, 38, 236, 0.8)'
			});
			//this.set(this.options.status);
		},
		set: function(status){

		}
	});
	
	// Display Message//
	$.widget("iot.messagedisplay", {
		options: {
			type: 'blue', 
			message: 'Message text',
			textheight: '20px',
			width: 'auto',
			status: false
		},	
		_create: function () {
            $(this.element).html(
						'<div class="message-container bevel-down5">' +
							this.options.message +
						'</div>');
			var css;
			switch(this.options.type) {
				case 'yellow': css = {color: '#5f5f2f', 'text-shadow': '1px 1px 3px yellow, 0 0 0 #000, 1px 1px 3px yellow'}; break;
				case 'green': css = {color: '#2f5f2f', 'text-shadow': '1px 1px 3px green, 0 0 0 #000, 1px 1px 3px green'}; break;
				case 'blue': css = {color: '#2f2f5f', 'text-shadow': '1px 1px 3px blue, 0 0 0 #000, 1px 1px 3px blue'}; break;
				case 'red': css = {color: '#5f2f2f', 'text-shadow': '1px 1px 3px red, 0 0 0 #000, 1px 1px 3px red'}; break
				default: css = null; break;
			}
			css['font-size'] = this.options.textheight;
			css['width'] = this.options.width;
			$(this.element).find('.message-container').css(css);
			this.set(this.options.status);
		},
		set: function(status){
			var css;
			if(status) {
				switch(this.options.type) {
					case 'yellow': css = {background: 'linear-gradient( to bottom, rgb(255, 255, 100), rgb(150, 150, 0))', 'box-shadow': 'inset 0 1px 1px rgba(0, 0, 0, 0.075),0 0 10px rgba(236, 236, 38, 0.8)'}; break;
					case 'green': css = {background: 'linear-gradient( to bottom, rgb(100, 255, 100), rgb(0, 150, 0))', 'box-shadow': 'inset 0 1px 1px rgba(0, 0, 0, 0.075),0 0 10px rgba(38, 236, 38, 0.8)'}; break;
					case 'blue': css = {background: 'linear-gradient( to bottom, rgb(100, 100, 255), rgb(0, 0, 150))', 'box-shadow': 'inset 0 1px 1px rgba(0, 0, 0, 0.075),0 0 10px rgba(38, 38, 236, 0.8)'}; break;
					case 'red': css = {background: 'linear-gradient( to bottom, rgb(255, 100, 100), rgb(150, 0, 0))', 'box-shadow': 'inset 0 1px 1px rgba(0, 0, 0, 0.075),0 0 10px rgba(236, 38, 38, 0.8)'}; break
					default: css = null; break;
				}
			} else {
				switch(this.options.type) {
					case 'yellow': css = {background: 'linear-gradient( to bottom, rgb(100, 100, 50), rgb(150, 50, 0))'}; break;
					case 'green': css = {background: 'linear-gradient( to bottom, rgb(50, 100, 50), rgb(0, 50, 0))'}; break;
					case 'blue': css = {background: 'linear-gradient( to bottom, rgb(50, 50, 100), rgb(0, 0, 50))'}; break;
					case 'red': css = {background: 'linear-gradient( to bottom, rgb(100, 50, 50), rgb(50, 0, 0))'}; break
					default: css = null; break;
				}
				$(this.element).find('.message-container').css('box-shadow', '');
			}
			$(this.element).find('.message-container').css(css);
		}
	});
	
	// Buttons //
	$.widget("iot.control", {
		options: {
			label: 'Button description',
			type: 'type1', 
			onimage: '_blue', 
			offimage: '_off', 
			imageext: '.png',
			imgheight: '40px',
			imgwidth: '40px',
			width: '200px',
			toggle: true,
			state: false
		},	
		_create: function () {
            $(this.element).html(
					'<div class="panel-container clearfix"> ' +
						'<div class="iot_infotext" style="float: left; color: white;">'+this.options.label+'</div>' +
						'<img src="'+this.options.type+this.options.offimage+this.options.imageext+'" >' +
					'</div>');
			$(this.element).find('.panel-container').css('width', this.options.width);
			$(this.element).find('img').css({
					width: this.options.imgwidth, 
					height: this.options.imgheight,
					margin: '2px',
					float: 'right'
			});
			if(this.options.toggle) {
				$(this.element).find('img').css({cursor: 'pointer'});
				$(this.element).find('img').attr('onclick', '$(\'#'+this.element.prop("id")+'\').control(\'toggle\')');
			}
		},
		toggle: function(){
			if(this.options.toggle) {
				if(this.options.state) {
					this.options.state = false;
					$(this.element).find('img').attr('src', this.options.type+this.options.offimage+this.options.imageext);
					this._event(false);
				} else {
					this.options.state = true;
					$(this.element).find('img').attr('src', this.options.type+this.options.onimage+this.options.imageext);
					this._event(true);
				}
			}
		},
		set: function(value){
			if(value) {
				this.options.state = true;
				$(this.element).find('img').attr('src', this.options.type+this.options.onimage+this.options.imageext);
			} else {
				this.options.state = false;
				$(this.element).find('img').attr('src', this.options.type+this.options.offimage+this.options.imageext);
			}
		},
		_event: function(value){
			$(this.element).trigger("onchange", value);
		}
	});
	
	// Progressbar //
	$.widget("iot.progressbar", {
		options: {
			value: 0, 
			orientation: 'horizontal', 
			animate: true, 
			speed: 500
		},		
		_create: function () {
            $(this.element).html('<div class="iot_progress-outer iot_progress-outer-' + this.options.orientation + '">' + 
                     '<div class="iot_progress-inner iot_progress-inner-' + this.options.orientation + '">' + 
                     '</div>' + 
                   '</div>');
			var initialInnerSize = this.options.animate ? 0 : (this.options.value + '%');
			if(this.options.orientation === 'vertical') {
				$(this.element).find('.iot_progress-outer').css('position', 'relative');
				$(this.element).find('.iot_progress-inner').css({
					position: 'absolute', 
					bottom: '0', 
					height: initialInnerSize
				});
			} else {
				$(this.element).find('.iot_progress-inner').css('width', initialInnerSize);
			}
			this.update(this.options.value);
		},
		update: function(value){
			this.options.value = value;	
            if(isNaN(this.options.value) || this.options.value < 0) {
				this.options.value = 0;
			} else if(this.options.value > 100) {
				this.options.value = 100;
			}
			if(this.options.animate) {
				var animateProperties = {};
				if(this.options.orientation === 'vertical') {
					animateProperties.height = this.options.value + '%';
				} else {
					animateProperties.width = this.options.value + '%';
				}
				$(this.element).find('.iot_progress-inner').animate(animateProperties, this.options.speed);
			}
		}
	});
	
	// Progressbar with limits//
	$.widget("iot.limitprogressbar", {
		options: {
			label: "",
			units: "%",
			max: 100,
			value: 0,
			lmin: 0,
			lmax: 0,
			hmin: 0,
			hmax: 0,
			orientation: 'horizontal', 
			animate: true, 
			speed: 500
		},		
		_create: function () {
            $(this.element).html(
					'<div class="panel-container clearfix"> ' +
						'<div class="iot_label-' + this.options.orientation + '">'+this.options.label+'</div>' +
						'<div class="iot_limitprogress-outer iot_limitprogress-outer-' + this.options.orientation + '">' + 
							'<div class="iot_limitprogress-inner iot_limitprogress-inner-' + this.options.orientation + '">' + 
							'</div>' + 
							'<div class="iot_historyprogress-inner iot_historyprogress-inner-' + this.options.orientation + '">' + 
							'</div>' + 
							'<div class="iot_progress-inner iot_progress-inner-' + this.options.orientation + '">' + 
							'</div>' + 
						'</div> ' +
						'<div class="iot_infobox clearfix"> ' +
							'<div class="iot_infotext" style="color: #4f4fff;" id="proginfo1">TEXT</div>' +
							'<div class="iot_infotext" style="color: #ffff4f;" id="proginfo2">TEXT</div>' +
							'<div class="iot_infotext" style="color: #4fff4f;" id="proginfo3">TEXT</div>' +
						'</div>' +
					'</div>');
			var initialInnerSize = this.options.animate ? 0 : (this.options.value + '%');
			if(this.options.orientation === 'vertical') {
				$(this.element).find('.panel-container').css({
					width: '70px',
					float: 'left'
				});
				$(this.element).find('.iot_limitprogress-outer').css('position', 'relative');
				$(this.element).find('.iot_progress-inner').css({
					position: 'absolute', 
					bottom: '0', 
					height: initialInnerSize
				});
			} else {
				$(this.element).find('.iot_progress-inner').css('width', initialInnerSize);
				$(this.element).find('.iot_limitprogress-inner').css('width', initialInnerSize);
			}
			this.update(this.options.value);
		},
		update: function(value){
			this.options.value = value;	
            if(isNaN(this.options.value) || this.options.value < 0) {
				this.options.value = 0;
			} else if(this.options.value > this.options.max) {
				this.options.max = this.options.value;
			}
			var dvalue = (this.options.value / this.options.max) * 100;
			var dlmin = (this.options.lmin / this.options.max) * 100;
			var dlmax = (this.options.lmax / this.options.max) * 100;
			var dhmin = (this.options.hmin / this.options.max) * 100;
			var dhmax = (this.options.hmax / this.options.max) * 100;
			$(this.element).find('#proginfo1').html(
					this.options.value.toString() + "/" + this.options.max.toString() + this.options.units
			);
			$(this.element).find('#proginfo2').html(
					this.options.hmin.toString() + " - " + this.options.hmax.toString() + this.options.units
			);
			$(this.element).find('#proginfo3').html(
					this.options.lmin.toString() + " - " + this.options.lmax.toString() + this.options.units
			);
			if(this.options.orientation === 'vertical') {
				$(this.element).find('.iot_limitprogress-inner').css({
					position: 'absolute', 
					left: '30px',
					bottom: dlmin + '%', 
					height: (dlmax - dlmin) + '%'
				});
				$(this.element).find('.iot_historyprogress-inner').css({
					position: 'absolute', 
					left: '20px',
					bottom: dhmin + '%', 
					height: (dhmax - dhmin) + '%'
				});
				$(this.element).find('.iot_infobox').css({
					float: 'left'
				});
			} else {
				$(this.element).find('.iot_limitprogress-inner').css({
					position: 'absolute', 
					top: '30px',
					left: dlmin + '%', 
					width: (dlmax - dlmin) + '%'
				});
				$(this.element).find('.iot_historyprogress-inner').css({
					position: 'absolute', 
					top: '20px',
					left: dhmin + '%', 
					width: (dhmax - dhmin) + '%'
				});
				$(this.element).find('.iot_infobox').css({
					position: 'relative', 
					top: '-60px',
					right: '0px',
					float: 'right'
				});
			}
			if(this.options.animate) {
				var animateProperties = {};
				if(this.options.orientation === 'vertical') {
					animateProperties.height = dvalue + '%';
				} else {
					animateProperties.width = dvalue + '%';
				}
				$(this.element).find('.iot_progress-inner').animate(animateProperties, this.options.speed);
			}
			if((this.options.value < this.options.lmin) || (this.options.value > this.options.lmax)) {
				$(this.element).find('.iot_infobox').css('border', '1px solid red');
			} else {
				$(this.element).find('.iot_infobox').css('border', '1px solid lime');
			}
		}
	});

	// Seven segment //
	var c_aNumberSegments = [0x3F,0x06,0x5B,0x4F,0x66,0x6D,0x7D,0x07,0x7F,0x6F];
	var c_sClassSvg = "sevenSeg-svg";
	var c_sClassSegOn = "sevenSeg-segOn";
	
	$("<style type='text/css'>" 
		+ "." + c_sClassSvg + "{fill: #320000; overflow: hidden; stroke-width: 0; height: 100%; width: 100%; background-color: Black}"
		+ "." + c_sClassSegOn + "{fill: Red}" + "</style>").prependTo("head");

	$.widget("bw.sevenSegDigit", {

		options: {
			/**This option controls the display value on the 7seg.*/
			value: null,

			/**Override the default segment on color (Red).*/
			colorOn: null,

			/**Override the default segment off color (#320000).  */
			colorOff: null,

			/**Override the default background color of the display (Black).  */
			colorBackground: null,
    
			/**This option allows skewing the segments to create a slant effect.*/
			slant: 0,

			/**Display decimal point.*/
			decimalPoint: true
		},		
		_create: function () {
			this.jqSvgElement = $("<svg/>", {
				class: c_sClassSvg,
				viewBox: "0 0 57 80",
				focusable: false // Prevent IE11 from creating a tabstop (Issue #8)
			}).css({fill: this.options.colorOff, "background-color": this.options.colorBackground});
			$("<defs/>").append($("<polyline/>", {id: "h-seg", points:"11 0, 37 0, 42 5, 37 10, 11 10, 6 5"}))
				.append($("<polyline/>", {id: "v-seg", points:"0 11, 5 6, 10 11, 10 34, 5 39, 0 39"}))
				.appendTo(this.jqSvgElement);
			this.jqSegments = $("<g/>", {class: this.widgetName + "-segGroup"})
				.append($("<use/>", {"xlink:href": "#h-seg", x: "0", y: "0"}))                                  //Segment A
				.append($("<use/>", {"xlink:href": "#v-seg", x: "-48", y: "0", transform: "scale(-1,1)"}))      //Segment B
				.append($("<use/>", {"xlink:href": "#v-seg", x: "-48", y: "-80", transform: "scale(-1,-1)"}))   //Segment C
				.append($("<use/>", {"xlink:href": "#h-seg", x: "0", y: "70"}))                                 //Segment D
				.append($("<use/>", {"xlink:href": "#v-seg", x: "0", y: "-80", transform: "scale(1,-1)"}))      //Segment E
				.append($("<use/>", {"xlink:href": "#v-seg", x: "0", y: "0"}))                                  //Segment F
				.append($("<use/>", {"xlink:href": "#h-seg", x: "0", y: "35"}))                                 //Segment G
				.appendTo(this.jqSvgElement);
			if(this.options.slant) {
				this.jqSegments.attr("transform", "skewX(" + -this.options.slant + ")");
			}
			if(this.options.decimalPoint) {
				$("<circle/>", {cx:"52", cy:"75", r:"5"}).appendTo(this.jqSvgElement);
			}
			this.jqSvgElement.appendTo(this.element);
			this.element.html(this.element.html());
			this.jqSvgElement = this.element.find("svg");
			this.jqSegments = this.jqSvgElement.find("." + this.widgetName + "-segGroup");
			if(this.options.value) {
				this.displayValue(this.options.value);
			}
		},
		_destroy: function() {
			this.jqSvgElement.remove();
		},
		_setOption: function(key, value){
			this.options[key] = value;
			switch(key){
				case "value":
					this.displayValue(value);
					break;
			}
		},
		displayValue: function(value, bDecimalPoint) {
			var self = this;
			if (value >= c_aNumberSegments.length) return;
			self.options.value = value;
			var segments = self._getSegments(value);
			self.jqSegments.children().each(function(index, element) {                     
				self._setSvgElementFill($(element), segments & (1 << index));        
			});
			self._setSvgElementFill(self.jqSvgElement.find("circle"), bDecimalPoint);
		},
		_getSegments: function(value) {
			if(value === "-") return 0x40;
				return c_aNumberSegments[value];
		},
		_setSvgElementFill: function(jqElement, bOn) {
			jqElement.attr("class", bOn && c_sClassSegOn);
			jqElement.css("fill", (bOn && this.options.colorOn) || "");
		}
	});

	// Seven segment display //
	$.widget("bw.sevenSeg", {
		options: {
			/**Numberic value to display*/
			value: null,

			/**Number of digits in the array.*/
			digits: 1,

			/**Desimal places (-1 for none)*/
			decimalPlaces: -1
		},		
		_create: function () {
			this.aJqDigits = [];
			var sDigitWidth = this.options.digits && (100 / this.options.digits + "%");

			for(var iDigit = 0; iDigit < this.options.digits; ++iDigit) {
				this.aJqDigits[iDigit] = $("<div/>", {style: "display: inline-block; height: 100%;"})
				.css("width", sDigitWidth) 
				.sevenSegDigit(this.options)
				.appendTo(this.element);
			}
			this.aJqDigits.reverse();
			this._displayValue(this.options.value);
		},
		_destroy: function() {
			$.each(this.aJqDigits, function(index, jqDigit) {
				jqDigit.sevenSegDigit("destroy");
				jqDigit.remove();
			});
		},
		_setOption: function(key, value){
			this.options[key] = value;
			switch(key){
				case "value":
					this._displayValue(value);
					break;
			}    
		},
		_displayValue: function(value) {
			var self = this;
			var sValue = self._createValueString(value);
			var iDecimalIdx = sValue.indexOf('.');
			var iDigitIdx = sValue.length - 1;

			$.each(self.aJqDigits, function(index, jqDigit) {
				var bDecimal = iDecimalIdx >= 0 && iDigitIdx === iDecimalIdx;
				if(bDecimal) {
					--iDigitIdx;
				}
				var sDigitValue = sValue[iDigitIdx];        
				jqDigit.sevenSegDigit("displayValue", sDigitValue, bDecimal);
				--iDigitIdx;
			});
			self._trigger("change", null, value);
		},
		_createValueString: function (value) {
			if (!value) return "";
			if (this.options.decimalPlaces < 0) return value.toString();
			var fValue = parseFloat(value, 10);
			return fValue.toFixed(this.options.decimalPlaces);
		}
	});

	// qwerty Keyboard //
	$.widget("iot.qwertyKeyboard", {
		options: {
			lcdString: ""
		},		
		_create: function () {
			this.generateKeyboard();
		},
		generateKeyboard: function() {
			var bClass = "";
			var kClass = "";
			var onclick = "";
			var text = "";
			var elemId = this.element.prop("id"); ;
			var s = "";
			s += "<div>";
				s += "<div class=\"bevel-down5\" style=\"height: 50px; background: #2f2fff;  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),0 0 10px rgba(38, 38, 236, 0.8)\">";
					s += "<div class=\"qwertylcd\" style=\"font-size: 35px;\">";
					s += "</div>";
				s += "</div>";
				s += "<div class=\"panel-group\">";
					s += "<div id=\"keyboard\">";
							/*small letter */
							s += "<div id=\"keyboardSmallLetter\">";
								$.each(this.keyboard.smallLetter, function(i, key) {
									generate(elemId, key);
								});
							s += "</div>";
							/*capital letter*/
							s += "<div id=\"keyboardCapitalLetter\">";
								$.each(this.keyboard.capitalLetter, function(i, key) {
									generate(elemId, key);
								});
							s += "</div>";
							/*number*/
							s += "<div id=\"keyboardNumber\">";
								$.each(this.keyboard.number, function(i, key) {
									generate(elemId, key);
								});
							s += "</div>";
							/*symbols*/
							s += "<div id=\"keyboardSymbols\">";
								$.each(this.keyboard.symbols, function(i, key) {
									generate(elemId, key);
								});
							s += "</div>";
					s += "</div>";
				s += "</div>";
			s += "</div>";
			function generate(elemId, key) {
				bClass = key.buttonClass == undefined ? "button" : key.buttonClass;
				kClass = key.keyClass == undefined ? "key" : key.keyClass;
				
				onclick = key.onclick == undefined ? "$('#"+elemId+"').qwertyKeyboard('write'," + key.value + ");" : "$('#"+elemId+"').qwertyKeyboard('"+key.onclick+"');";

				text = (key.isChar != undefined || key.isChar == false) ? key.value : String.fromCharCode(key.value);

				s += "<div class=\"" + bClass + "\" onclick=\"" + onclick + "\"><div class=\"" + kClass + "\">" + text + "</div></div>";

				bClass = ""; kClass = ""; onclick = ""; text = "";
			}
			$(this.element).html(s);
		},
		changeToSmallLetter: function() {
			$("#keyboardCapitalLetter,#keyboardNumber,#keyboardSymbols").css("display", "none");
			$("#keyboardSmallLetter").css("display", "block");
		},
		changeToCapitalLetter: function() {
			$("#keyboardCapitalLetter").css("display", "block");
			$("#keyboardSmallLetter,#keyboardNumber,#keyboardSymbols").css("display", "none");
		},
		changeToNumber: function() {
			$("#keyboardNumber").css("display", "block");
			$("#keyboardSymbols,#keyboardCapitalLetter,#keyboardSmallLetter").css("display", "none");
		},
		changeToSymbols: function() {
			$("#keyboardCapitalLetter,#keyboardNumber,#keyboardSmallLetter").css("display", "none");
			$("#keyboardSymbols").css("display", "block");
		},
		write: function(m) {
			var b = String.fromCharCode(m);
			this.options.lcdString = this.options.lcdString + b;
			$(this.element).find('.qwertylcd').html(this.options.lcdString);
		},
		del: function() {
			if(this.options.lcdString.length >= 1) {
				this.options.lcdString = this.options.lcdString.substring(0,this.options.lcdString.length-1);
			}
			$(this.element).find('.qwertylcd').html(this.options.lcdString);
		},
		enter: function() {
			$(this.element).trigger("onenter", this.options.lcdString);
			this.options.lcdString = "";
			$(this.element).find('.qwertylcd').html(this.options.lcdString);
		},
		space: function() {
			this.options.lcdString = this.options.lcdString + " ";
			$(this.element).find('.qwertylcd').html(this.options.lcdString);
		},
		blank: function() {
			
		},
		set: function(value){
			$(this.element).find('.qwertylcd').html(value);
		},
		keyboard: {
			capitalLetter: [
				// 1st row
					{ value: 81 },{ value: 87 },{ value: 69 },{ value: 82 },{ value: 84 },{ value: 89 },
					{ value: 85 },{ value: 73 },{ value: 79 },{ value: 80 },
					{ value: "Delete", isChar: "false", onclick: "del", buttonClass: "button button_del", keyClass: "key key_del" },
				// 2nd row
					{ value: 65, buttonClass: "button button_a" },{ value: 83 },{ value: 68 },{ value: 70 },
					{ value: 71 },{ value: 72 },{ value: 74 },{ value: 75 },{ value: 76 },
					{ value: "Enter", isChar: "false", buttonClass: "button button_enter", onclick: "enter", keyClass: "key key_enter" },
				// 3rd row
					{ value: "abc", isChar: "false", buttonClass: "button button_smallletter", onclick: "changeToSmallLetter", keyClass: "key key_smallletter" },
					{ value: 90 },{ value: 88 },{ value: 67 },{ value: 86 },{ value: 66 },{ value: 78 },
					{ value: 77 },{ value: 44 },{ value: 46 },{ value: 64 },
				// 4th row
					{ value: "123", isChar: "false", buttonClass: "button button_numberleft", onclick: "changeToNumber", keyClass: "key key_number" },
					{ value: "Space", isChar: "false", buttonClass: "button button_space", onclick: "space", keyClass: "key key_space" },
					{ value: "#%+", isChar: "false", buttonClass: "button button_symbolsright", onclick: "changeToSymbols", keyClass: "key key_symbols" }
				],
			smallLetter: [
				// 1st row
					{ value: 113 },{ value: 119 },{ value: 101 },{ value: 114 },{ value: 116 },
					{ value: 121 },{ value: 117 },{ value: 105 },{ value: 111 },{ value: 112 },
					{ value: "Delete", isChar: "false", onclick: "del", buttonClass: "button button_del", keyClass: "key key_del" },
				// 2nd row
					{ value: 97, buttonClass: "button button_a" },{ value: 115 },{ value: 100 },{ value: 102 },
					{ value: 103 },{ value: 104 },{ value: 106 },{ value: 107 },{ value: 108 },
					{ value: "Enter", isChar: "false", buttonClass: "button button_enter", onclick: "enter", keyClass: "key key_enter" },
				// 3rd row
					{ value: "ABC", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "changeToCapitalLetter", keyClass: "key key_capitalletterleft" },
					{ value: 122 },{ value: 120 },{ value: 99 },{ value: 118 },{ value: 98 },
					{ value: 110 },{ value: 109 },{ value: 44 },{ value: 46 },{ value: 64 },
				// 4th row
					{ value: "123", isChar: "false", buttonClass: "button button_numberleft", onclick: "changeToNumber", keyClass: "key key_number" },
					// { value: 32, buttonClass: "button button_space" },
					{ value: "Space", isChar: "false", buttonClass: "button button_space", onclick: "space", keyClass: "key key_space" },
					{ value: "#%+", isChar: "false", buttonClass: "button button_symbolsright", onclick: "changeToSymbols", keyClass: "key key_symbols" }
				],
			number: [
				// 1st row
					{ value: 49 },{ value: 50 },{ value: 51 },{ value: 52 },{ value: 53 },{ value: 54 },
					{ value: 55 },{ value: 56 },{ value: 57 },{ value: 48 },
					{ value: "Delete", isChar: "false", onclick: "del", buttonClass: "button button_del", keyClass: "key key_del" },
				// 2nd row
					{ value: 45, buttonClass: "button button_dash" },{ value: 47 },{ value: 58 },{ value: 59 },
					{ value: 40 },{ value: 41 },{ value: 36 },{ value: 38 },{ value: 64 },
					{ value: "Enter", isChar: "false", buttonClass: "button button_enter", onclick: "enter", keyClass: "key key_enter" },
				//3rd row
					{ value: "", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "blank", keyClass: "key" },
					{ value: 63 },{ value: 33 },{ value: 34 },{ value: 124 },{ value: 92 },{ value: 42 },{ value: 61 },{ value: 43 },
					{ value: "", isChar: "false", buttonClass: "button", onclick: "blank", keyClass: "key" },
					{ value: "", isChar: "false", buttonClass: "button", onclick: "blank", keyClass: "key" },

				// 4th row
					{ value: "ABC", isChar: "false", buttonClass: "button button_numberleft", onclick: "changeToCapitalLetter", keyClass: "key key_capitalletterleft" },
					{ value: "Space", isChar: "false", buttonClass: "button button_space", onclick: "space", keyClass: "key key_space" },
					{ value: "#%+", isChar: "false", buttonClass: "button button_symbolsright", onclick: "changeToSymbols", keyClass: "key key_symbols" }
				],
			symbols: [
				// 1st row
					{ value: 91 },{ value: 93 },{ value: 123 },{ value: 125 },{ value: 35 },{ value: 37 },
					{ value: 94 },{ value: 42 },{ value: 43 },{ value: 61 },
					{ value: "Delete", isChar: "false", onclick: "del", buttonClass: "button button_del", keyClass: "key key_del" },
				// 2nd row
					{ value: 95, buttonClass: "button button_underscore" },{ value: 92 },{ value: 124 },{ value: 126 },
					{ value: 60 },{ value: 62 },
					{ value: "", isChar: "false", buttonClass: "button", onclick: "blank", keyClass: "key" },
					{ value: "", isChar: "false", buttonClass: "button", onclick: "blank", keyClass: "key" },
					{ value: "", isChar: "false", buttonClass: "button", onclick: "blank", keyClass: "key" },
					{ value: "Enter", isChar: "false", buttonClass: "button button_enter", onclick: "enter", keyClass: "key key_enter" },
				// 3rd row
					{ value: "", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "blank", keyClass: "key" },
					{ value: 46 },{ value: 44 },{ value: 63 },{ value: 33 },{ value: 39 },{ value: 34 },{ value: 59 },{ value: 92 },
					{ value: "", isChar: "false", buttonClass: "button", onclick: "blank", keyClass: "key" },
					{ value: "", isChar: "false", buttonClass: "button", onclick: "blank", keyClass: "key" },
				// 4th row
					{ value: "123", isChar: "false", buttonClass: "button button_numberleft", onclick: "changeToNumber", keyClass: "key key_number" },
					{ value: "Space", isChar: "false", buttonClass: "button button_space", onclick: "space", keyClass: "key key_space" },
					{ value: "ABC", isChar: "false", buttonClass: "button button_symbolsright", onclick: "changeToCapitalLetter", keyClass: "key key_capitalletterleft" }
				]
		},
		_destroy: function() {
			
		}
	});
	// Edit Keyboard //
	$.widget("iot.editKeyboard", {
		options: {
			data: {}
		},		
		_create: function () {
			console.log(this.options.data);
			this.generateKeyboard();
		},
		
		generateKeyboard: function() {
			var bClass = "";
			var kClass = "";
			var onclick = "";
			var text = "";
			var elemId = this.element.prop("id");
			var lcddata = "";
			
			if(typeof(this.options.data) === 'object') {
				for(i in this.options.data) {
					lcddata += '<ul class="lcddata">';
						lcddata += '<li>' + data[i] + '</li>';
					lcddata += '</ul>';
				}
			}

			var s = "";
			s += "<div>";
				s += "<div class=\"bevel-down5 clearfix \" style=\"height: 150px; background: #2f2fff;  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),0 0 10px rgba(38, 38, 236, 0.8)\">";
					s += "<div>";
						s += lcddata;
					s += "</div>";
				s += "</div>";
				s += "<div class=\"panel-group\">";
					s += "<div id=\"keyboard\">";
						s += "<div id=\"keyboardNavigation\">";
							$.each(this.keyboard.navigation, function(i, key) {
								generate(elemId, key);
							});
						s += "</div>";
					s += "</div>";
				s += "</div>";
			s += "</div>";

			function generate(elemId, key) {
				bClass = key.buttonClass == undefined ? "button" : key.buttonClass;
				kClass = key.keyClass == undefined ? "key" : key.keyClass;
				
				onclick = key.onclick == undefined ? "$('#"+elemId+"').editKeyboard('write'," + key.value + ");" : "$('#"+elemId+"').editKeyboard('"+key.onclick+"');";

				text = (key.isChar != undefined || key.isChar == false) ? key.value : String.fromCharCode(key.value);

				s += "<div class=\"" + bClass + "\" onclick=\"" + onclick + "\"><div class=\"" + kClass + "\">" + text + "</div></div>";

				bClass = ""; kClass = ""; onclick = ""; text = "";
			};

			$(this.element).html(s);
		},
		up: function() {
			console.log('up was pressed');
		},
		down: function() {
			console.log('down was pressed');
		},
		left: function() {
			console.log('left was pressed');
		},
		right: function() {
			console.log('right was pressed');
		},
		enter: function() {
			console.log('enter was pressed');
		},
		edit: function() {
			console.log('edit was pressed');
		},
		blank: function() {
			console.log('blank was pressed');
		},
		keyboard: {
			navigation: [
				// 1st row
					{ value: "", isChar: "false", onclick: "blank", buttonClass: "button button_smallletter", keyClass: "key" },
					{ value: "up", isChar: "false", onclick: "up", buttonClass: "button button_smallletter", keyClass: "key" },
					{ value: "", isChar: "false", onclick: "blank", buttonClass: "button button_smallletter", keyClass: "key" },
				// 2nd row
					{ value: "left", isChar: "false", onclick: "left", buttonClass: "button button_smallletter", keyClass: "key" },
					{ value: "enter", isChar: "false", buttonClass: "button button_smallletter", onclick: "enter", keyClass: "key" },
					{ value: "right", isChar: "false", onclick: "right", buttonClass: "button button_smallletter", keyClass: "key" },
				// 3rd row
					{ value: "", isChar: "false", onclick: "blank", buttonClass: "button button_smallletter", keyClass: "key" },
					{ value: "down", isChar: "false", onclick: "down", buttonClass: "button button_smallletter", keyClass: "key" },
					{ value: "edit", isChar: "false", onclick: "edit", buttonClass: "button button_smallletter", keyClass: "key" }
				]
		},
		_destroy: function() {
			
		}
	});
	// Hex Keyboard //
	$.widget("iot.hexKeyboard", {
		options: {
			lcdString: ""
		},		
		_create: function () {
			this.generateKeyboard();
		},
		
		generateKeyboard: function() {
			var bClass = "";
			var kClass = "";
			var onclick = "";
			var text = "";
			var elemId = this.element.prop("id");

			var s = "";
			s += "<div>";
				s += "<div class=\"bevel-down5\" style=\"height: 50px; background: #2f2fff;  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),0 0 10px rgba(38, 38, 236, 0.8)\">";
					s += "<div class=\"qwertylcd\" style=\"font-size: 35px;\">";
					s += "</div>";
				s += "</div>";
				s += "<div class=\"panel-group\">";
					s += "<div id=\"keyboard\">";
						s += "<div id=\"keyboardHex\">";
							$.each(this.keyboard.hex, function(i, key) {
								generate(elemId, key);
							});
						s += "</div>";
					s += "</div>";
				s += "</div>";
			s += "</div>";

			function generate(elemId, key) {
				bClass = key.buttonClass == undefined ? "button" : key.buttonClass;
				kClass = key.keyClass == undefined ? "key" : key.keyClass;
				
				onclick = key.onclick == undefined ? "$('#"+elemId+"').hexKeyboard('write'," + key.value + ");" : "$('#"+elemId+"').hexKeyboard('"+key.onclick+"');";

				text = (key.isChar != undefined || key.isChar == false) ? key.value : String.fromCharCode(key.value);

				s += "<div class=\"" + bClass + "\" onclick=\"" + onclick + "\"><div class=\"" + kClass + "\">" + text + "</div></div>";

				bClass = ""; kClass = ""; onclick = ""; text = "";
			};

			$(this.element).html(s);
		},
		write: function(m) {
			var b = String.fromCharCode(m);
			this.options.lcdString = this.options.lcdString + b;
			$(this.element).find('.qwertylcd').html(this.options.lcdString);
		},
		enter: function() {
			$(this.element).trigger("onenter", this.options.lcdString);
			this.options.lcdString = "";
			$(this.element).find('.qwertylcd').html(this.options.lcdString);
		},
		del: function() {
			if(this.options.lcdString.length >= 1) {
				this.options.lcdString = this.options.lcdString.substring(0,this.options.lcdString.length-1);
			}
			$(this.element).find('.qwertylcd').html(this.options.lcdString);
		},
		set: function(value){
			$(this.element).find('.qwertylcd').html(value);
		},
		keyboard: {
			hex: [
				// 1st row
					{ value: 97 },{ value: 98 },{ value: 99 },{ value: 100 },
				// 2nd row
					{ value: 55 },{ value: 56 },{ value: 57 },{ value: 101 },
				// 3rd row
					{ value: 52 },{ value: 53 },{ value: 54 },{ value: 102 },
				// 4th row
					{ value: 49 },{ value: 50 },{ value: 51 },
					{ value: "del", isChar: "false", onclick: "del", buttonClass: "button button_smallletter", keyClass: "key" },
				// 5th row
					{ value: 42 },{ value: 48 },{ value: 35 },
					{ value: "enter", isChar: "false", buttonClass: "button button_smallletter", onclick: "enter", keyClass: "key" }
				]
		},
		_destroy: function() {
			
		}
	});
	// Bool Keyboard //
	$.widget("iot.boolKeyboard", {
		options: {
			lcdString: ""
		},		
		_create: function () {
			this.generateKeyboard();
		},
		
		generateKeyboard: function() {
			var bClass = "";
			var kClass = "";
			var onclick = "";
			var text = "";
			var elemId = this.element.prop("id");

			var s = "";
			s += "<div>";
				s += "<div class=\"bevel-down5\" style=\"height: 50px; background: #2f2fff; box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),0 0 10px rgba(38, 38, 236, 0.8)\">";
					s += "<div class=\"qwertylcd\" style=\"font-size: 35px;\">";
					s += "</div>";
				s += "</div>";
				s += "<div class=\"panel-group\">";
					s += "<div id=\"keyboard\">";
						s += "<div id=\"boardBool\">";
							$.each(this.keyboard.bool, function(i, key) {
								generate(elemId, key);
							});
						s += "</div>";
					s += "</div>";
				s += "</div>";
			s += "</div>";

			function generate(elemId, key) {
				bClass = key.buttonClass == undefined ? "button" : key.buttonClass;
				kClass = key.keyClass == undefined ? "key" : key.keyClass;
				
				onclick = key.onclick == undefined ? "$('#"+elemId+"').boolKeyboard('write'," + key.value + ");" : "$('#"+elemId+"').boolKeyboard('"+key.onclick+"');";

				text = (key.isChar != undefined || key.isChar == false) ? key.value : String.fromCharCode(key.value);

				s += "<div class=\"" + bClass + "\" onclick=\"" + onclick + "\"><div class=\"" + kClass + "\">" + text + "</div></div>";

				bClass = ""; kClass = ""; onclick = ""; text = "";
			};

			$(this.element).html(s);
		},
		true: function() {
			this.options.lcdString = 'true';
			$(this.element).find('.qwertylcd').html(this.options.lcdString);
		},
		false: function() {
			this.options.lcdString = 'false';
			$(this.element).find('.qwertylcd').html(this.options.lcdString);
		},
		enter: function() {
			$(this.element).trigger("onenter", this.options.lcdString);
			this.options.lcdString = "";
			$(this.element).find('.qwertylcd').html(this.options.lcdString);
		},
		set: function(value){
			$(this.element).find('.qwertylcd').html(value);
		},
		keyboard: {
			bool: [
				// 1st row
					{ value: "false", isChar: "false", buttonClass: "button button_smallletter", onclick: "false", keyClass: "key" },
					{ value: "true", isChar: "false", buttonClass: "button button_smallletter", onclick: "true", keyClass: "key" },
					{ value: "enter", isChar: "false", buttonClass: "button button_smallletter", onclick: "enter", keyClass: "key" }
				
				]
		},
		_destroy: function() {
			
		}
	});
})(jQuery);

