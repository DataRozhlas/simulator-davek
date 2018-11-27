$(document).ready(function(){
  
   	$( ".hamburger" ).click(function() {
       

        if( $(this).hasClass("active")){
            $( ".hamburger" ).html("<i class='fas fa-times'></i> <span class='pt-1 color-white ml-2 font-24'>Zavřít</span>");
             $(this).removeClass("active");

        }
        else{

          $(this).addClass("active");
          $( ".hamburger" ).html("<i class='fas fa-bars'></i> <span class='pt-1 color-white ml-2 font-24'>Menu</span>");
        }
          $( ".menu-burger" ).slideToggle( "slow", function() {
        
      });
   		
   	});


      $('.sidebar').on('click','a', function(){

      $('.sidebar a').removeClass('active');
      $(this).addClass('active');

      if($(this).closest('.sidebar').hasClass('graf')){

          $('.right-side').addClass('d-none');
          $('.filter-graf').removeClass('d-none');
          $('.middle').removeClass('col-6');
          $('.middle').addClass('col-9');

      }else{
         $('.right-side').removeClass('d-none');
              $('.filter-graf').addClass('d-none');
         $('.middle').removeClass('col-9');
          $('.middle').addClass('col-6');
      }

      if($(this).hasClass('num1')){
        statickyModelujRodinu();
     
      };

      if($(this).hasClass('num2')){
        dynamickyModelujRodinu(1);
     
      };
      if($(this).hasClass('num3')){
        dynamickyModelujRodinu(2);
     
      };
       if($(this).hasClass('num4')){
        dynamickyModelujRodinu(3);
     
      }
       if($(this).hasClass('num5')){
        dynamickyModelujRodinu(4);
     
      }

 
    });


    $('.filter-graf a').click(function(){
      $(this).toggleClass('active');
    });
  
});


