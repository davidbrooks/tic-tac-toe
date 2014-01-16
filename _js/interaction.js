var t = (function($, window, document, undefined) {
	$('document').ready(function(){
		t.init();
	});
	var spaces = 3;
	return {
		init: function(){
			t.clicks();
			t.setup_board();
		},
		clicks: function(){
			$('body').on('click', '.space', function(){
				return false;
			});
		},
		append_template: function(partial, target, context){
			var source = $(partial).html();
			var template = Handlebars.compile(source);
			var html = template(context);
			$(target).append(html);
		},
		load_template: function(partial, target, context){
			var source = $(partial).html();
			var template = Handlebars.compile(source);
			var html = template(context);
			$(target).html(html);
		},
		setup_board: function(){
			$('.board').html();
			for (var s = 0; s < spaces * spaces; s++) {
				var css_class = '';
				if (s % spaces == 0) { 
					css_class = "clear";
				}
				var dimension = 100 / spaces;
				var context = { "id": s, "class" : css_class, "dimension" : dimension + '%' };
				t.append_template('#_space_template', '#board', context);
			}
			var board_width = $('#board').width();
			$('#board').append('<div class="clear"></div>');
			$('#board').height(board_width);
		}
	};
})(jQuery, this, this.document);