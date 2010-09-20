  /*  
   *  -------------------------------------------------------
   *  This is a small script that allows you to add items you 
   *  shared on Google Reader unobtrusively into your website. 
   *  To use this badge, simply add a link to your shared      
   *  reader items and the script itself.
   *  -------------------------------------------------------
   */

  GReaderBadge = (function(){
      /* Your configuration object, you can specify:
            - amount (Integer) the amount of items being displayed
            - id (String) ID of the DIV that should get the link
            - loadingMessage (String) - the loading message while make a request to google api
       */
      var config = {
                     amount: 5,
                     id: 'google_reader_badge',
                     loadingMessage: ' (Loading...)' 
                   }; 
      /* Assume the right elements are not available. */
      var out = false,
          source = false;

      function init() {

          out = document.getElementById(config.id);
          /* check it is available , rejoice if it is and start the show */
          if(out) {
              /* 
                 Check if there is a class with the name items and if
                 there is, get the amount of items to display from it.                  
               */
               if(out.className.indexOf('items') !== -1) {
                   var amount = out.className.match(/([\d]+)/);
               }
               /* if there isn't, just use the pre-set amount of links, defined in the config */
               var amount = amount[1] || config.amount;

                   /* grab the first link inside the container and get the id from it */ 
                   source = out.getElementsByTagName('a')[0]; 
                   var id = source.href.replace(/.*\/+/,'');

                   var loadingNode = document.createTextNode(config.loadingMessage);
                       source.appendChild(loadingNode);
                 
                  /* assemble the correct URL for REST API and create a script node calling it. */
                  var url = 'http://www.google.com/reader/public/javascript/user/' +
                            id + '/state/com.google/broadcast?n=' + 
                            amount + '&callback=GReaderBadge.seed';
                  loadScript(url,function(){});
                   
          }    
      }//end function

      /*
       * Create a SCRIPT node for a certain URL with callback function 
       * when the script node has been finished created on DOM.
       *  
       * @method loadScript 
       * @param url (String) url for REST aPI  
       * @param callback (Function) callback function that is called when the SCRIPT element is created in the HEAD
       * @method private 
       */
      function loadScript(url,callback) {

             var script = document.createElement('script');
                 script.setAttribute('type','text/javascript');
                 //for IE
                 if(script.readyState) {
                      script.onreadystatechange = function() {
                               if(script.readyState == 'loaded' || script.readyState == 'complete' ) {
                                      script.onreadystatechange = null;
                                      callback(); 
                               }  
                      }
                 //other browsers
                 } else {
                      script.onload = function(){
                             callback();
                      } 
                 }   
                 script.setAttribute('src',url);
                 document.getElementsByTagName('head')[0].appendChild(script); 
      };

      /* 
       * Start a new array and push in the 'html' we want to create. start with the "<ul>" and then
       * loop over the items in the data returned from the API. Add links for each entry and a link
       * pointing to the right resource with the title as the link text.
       * 
       * @method seed() - will be called when the REST call was successful.
       * @param o (Object) the data received from API Reader Google through REST call
       * @return none. display the badge on the page.  
       */
      function seed(o) {         
            var html = [];
            html.push('<ul>');
            var is = o.items;
            for(var i=0;i<is.length;i++) {
                html.push('<li>');
                html.push('<a href="'+is[i].alternate.href+'">'+is[i].title+'</a>');
                html.push('</li>');
            }  
            html.push('</ul>');
            /* remove the loading message and append the fine 'html' to the innerHTML of the badge container */
            source.removeChild(source.lastChild);
            out.innerHTML += html.join(''); 
      }//end function

  /* both the init() and the seed() methods need to be public */
  return{init: init, seed: seed}; 
  })();
  /* call the init method once the whole object was created */
  GReaderBadge.init();
