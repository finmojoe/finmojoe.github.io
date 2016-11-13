        // index


    $(document).ready(function(){
        $('.flex3').hide();
        
    });

    $(function(){
        $('a[href^=#]').click(function(){
        var speed = 700;
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({scrollTop:position}, speed, "swing");
        return false;
        });
    });
       

    $('.f1').hover(function(){
        $('.f1a').fadeToggle(300);
        $(this).css('cursor:pointer');
    });


    $('.f2').hover(function(){

        $('.f2a').fadeToggle(300);
    });


    $('.f3').hover(function(){

        $('.f3a').fadeToggle(300);
    });

    $('#project-a').click(function(){
        location.href='clothing.html';
    })



        //



