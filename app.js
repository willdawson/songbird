$(document).ready(function()
{
    $('.slide:gt(0)').hide();
    setInterval(function() {
        $(".slide:first-child").fadeOut(5000).next(".slide").fadeIn(5000).end().appendTo(".slideshow")
}, 5000);



<<<<<<< HEAD
$("input").focus(
=======
$("#number").focus(
>>>>>>> 7d3397ef08ec294876d2d9838cf292ddeae0245d
	function() {
		$(".bird").addClass('bounceAdd');
		setTimeout(function() {
			$(".bird").removeClass('bounceAdd');
		}, 1000 );
<<<<<<< HEAD
	}

);
=======
	});

>>>>>>> 7d3397ef08ec294876d2d9838cf292ddeae0245d

       
});
