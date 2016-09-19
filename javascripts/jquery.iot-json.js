(function($) {
    $.fn.iotJSON = function(options) {
    	var defaults = {
    		hoverable: true,
    		collapsible: true,
    		color: true,
			jsondata: {}
    	};
  		
    	this.each( function() {
			var settings = jQuery.extend({}, defaults, options);
			var text = "";
			var s_html = [];
			if(settings.collapsible) {
				var collapser = "<span class='ellipsis'></span><div class='collapser'></div><ul class='array collapsible'>";
				var collapser_obj = "<span class='ellipsis'></span><div class='collapser'></div><ul class='obj collapsible'>";
			} else {
				var collapser = "<div></div><ul class='array'>";
				var collapser_obj = "<div></div><ul class='obj'>";
			}
			if(settings.hoverable) {
				var hoverabler = "<div class='hoverable'>";
			} else {
				var hoverabler = "<div>"
			}
			function peek(stack) {
				var val = stack.pop();
				stack.push(val);
				return val;
			}
			function iterateObject(object) {
				$.each(object, function(index, element) {
					if(element == null) {
						text += "<li>"+hoverabler+"<span class='property'>"+index+"</span>: <span class='type-null'>"+element+"</span></div></li>";
					} else if(element instanceof Array) {
						text += "<li>"+hoverabler+"<span class='property'>"+index+"</span>: "+"["+collapser;
						s_html.push("</li>");
						s_html.push("</div>");
						s_html.push("</ul>");
						iterateArray(element);
					} else if(typeof element == 'object') {
						text += "<li>"+hoverabler+"<span class='property'>"+index+"</span>: "+"{"+collapser_obj;
						s_html.push("</li>");
						s_html.push("</div>");
						s_html.push("</ul>");
						iterateObject(element);
					} else {
						if(typeof element == "number") {
							text += "<li>"+hoverabler+"<span class='property'>"+index+"</span>: <span class='type-number'>"+element+"</span></div></li>";
						} else if(typeof element == "string") {
							text += "<li>"+hoverabler+"<span class='property'>"+index+"</span>: <span class='type-string'>\""+element+"\"</span></div></li>";
						} else if(typeof element == "boolean") {
							text += "<li>"+hoverabler+"<span class='property'>"+index+"</span>: <span class='type-boolean'>"+element+"</span></div></li>";
						} else {
							text += "<li>"+hoverabler+"<span class='property'>"+index+"</span>: "+element+"</div></li>";
						}
					}
				});
				text += s_html.pop()+"}"+s_html.pop()+s_html.pop();
			}
			function iterateArray(array) {
				$.each(array, function(index, element) {
					if(element == null) {
						text += "<li>"+hoverabler+"<span class='property'>"+index+"</span>: <span class='type-null'>"+element+"</span></div></li>";
					} else if(element instanceof Array) {
						text += "<li>"+hoverabler+"["+collapser;
						s_html.push("</li>");
						s_html.push("</div>");
						s_html.push("</ul>");
						iterateArray(element);
					} else if(typeof element == 'object') {
						text += "<li>"+hoverabler+"{"+collapser_obj;
						s_html.push("</li>");
						s_html.push("</div>");
						s_html.push("</ul>");
						iterateObject(element);
					} else {
						if(typeof element == "number") {
							text += "<li>"+hoverabler+"<span class='property'>"+index+"</span>: <span class='type-number'>"+element+"</span></div></li>";
						} else if(typeof element == "string") {
							text += "<li>"+hoverabler+"<span class='property'>"+index+"</span>: <span class='type-string'>\""+element+"\"</span></div></li>";
						} else if(typeof element == "boolean") {
							text += "<li>"+hoverabler+"<span class='property'>"+index+"</span>: <span class='type-boolean'>"+element+"</span></div></li>";
						} else {
							text += "<li>"+hoverabler+"<span class='property'>"+index+"</span>: "+element+"</div></li>";
						}
					}
				});
				text += s_html.pop()+"]"+s_html.pop()+s_html.pop();
			}
			var json = settings.jsondata;
			text = "";
			text += "<div id='json'>";
			text += hoverabler+"{"+collapser_obj;
			s_html.push("");
			s_html.push("</div>");
			s_html.push("</ul>")
			iterateObject(json);
			text += "</ul></div></div>";
			this.innerHTML = text;
			$('.hoverable').hover(function(event) {
				event.stopPropagation();
		    	$('.hoverable').removeClass('hovered');
		        $(this).addClass('hovered');
		    }, function(event) {
		    	event.stopPropagation();
		        $(this).addClass('hovered');
		    });
		    $('.collapser').off().click(function(event) {
		    	$(this).parent('.hoverable').toggleClass('collapsed');
		    });
    	});
    }
}(jQuery));