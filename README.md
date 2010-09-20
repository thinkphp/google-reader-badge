Like most big RSS readers, Google Reader also allows you to share great finds you had people who want to and are
in your social neighbourhood. 


Usage
=====

To use this badge, simply add a link to your shared reader items and the script itself. The ID is mandatory and the
'items5' class defines how many items you want to display. If you want 10 items, make it items10. If you don't provide
 a class the script has a pre-set of five items. All you need is your user ID, which you can get this one easily from 
your shared items homepage that Google Reader offers. In my case is http://www.google.com/reader/shared/14570835283517884254

      #HTML
     &lt;div id="google_reader_badge" class="items5"&gt;
     <p><a href="http://www.google.com/reader/shared/14570835283517884254">My Shared Items on Google Reader</a></p>
     &lt;/div&gt;
     &lt;script type="text/javascript" src="GReaderBadge.js"&gt;&lt;/script&gt;
