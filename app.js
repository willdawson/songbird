$(document).ready(function()
{
    $('.slide:gt(0)').hide();
    setInterval(function() {
        $(".slide:first-child").fadeOut(5000).next(".slide").fadeIn(5000).end().appendTo(".slideshow")
}, 5000);



$("#number").focus(
	function() {
		$(".bird").addClass('bounceAdd');
		setTimeout(function() {
			$(".bird").removeClass('bounceAdd');
		}, 1000 );
	});


       
});
