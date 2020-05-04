<?php
if (isset($_POST['command'])) {
  if ($_POST['type'] == '123456789' && $_POST['command'] == '123456789') {
      echo json_encode(
        array(
          'yes',
          $_POST['command'],
          'name'
        )
      );
  }elseif ($_POST['type'] == 'yes' && $_POST['command'] == 'yes') {
    echo json_encode(
      array(
        'i can wait',
        '',
        'gender'
      )
    );
  }elseif ($_POST['type'] == 'i can wait' && $_POST['command'] == 'i can wait') {
    echo json_encode(
      array(
        'read',
        '',
        'contact'

      )
    );
  }elseif ($_POST['type'] == 'read' && $_POST['type'] == 'read') {
    echo json_encode(
      array(
      'start',
      'Long Text 1

      Location	Israel
      Jordan
      West Bank
      Coordinates	31Ã‚Â°30Ã¢â‚¬Â²N 35Ã‚Â°30Ã¢â‚¬Â²ECoordinates: 31Ã‚Â°30Ã¢â‚¬Â²N 35Ã‚Â°30Ã¢â‚¬Â²E
      Lake type	Endorheic
      Hypersaline
      Native name	Ã—â„¢Ã—Â Ã—â€Ã—Å¾Ã—Å“Ã—â€” (in Hebrew)
      Ã˜Â§Ã™â€žÃ˜Â¨Ã˜Â­Ã˜Â± Ã˜Â§Ã™â€žÃ™â€¦Ã™Å Ã˜Âª (in Arabic)',
      'stories'
      )
    );
  }elseif ($_POST['type'] == 'start' && $_POST['command'] == 'start') {
    echo json_encode(
      array(
        'get',
        'Long Text 2

        Average depth	199 m (653 ft)[3]
        Max. depth	298 m (978 ft) (elevation of deepest point, 728 m BSL [below sea level], minus current surface elevation)
        Water volume	114 km3 (27 cu mi)[3]
        Shore length1	135 km (84 mi)
        Surface elevation	Ã¢Ë†â€™430.5 m (Ã¢Ë†â€™1,412 ft) (2016)[4]
        References	[3][4]',
        'stories'
      )
    );
  }elseif ($_POST['type'] == 'get' && $_POST['command'] == 'get') {
    echo json_encode(
      array(
        'funny',
        'Long Text 3

        Primary inflows	Jordan River
        Primary outflows	None
        Catchment area	41,650 km2 (16,080 sq mi)
        Basin countries	Israel
        Jordan',
        'stories'
      )
    );
  }elseif ($_POST['type'] == 'funny' && $_POST['command'] == 'funny') {
    echo json_encode(
    array(
        'verify',
        'Long Text 4

          Palestine
          Max. length	50 km (31 mi)[1] (northern basin only)
          Max. width	15 km (9.3 mi)[1]
          Surface area	605 km2 (234 sq mi) (2016)[2]',
          'stories'
      )
    );
  }elseif ($_POST['type'] == 'verify' && $_POST['command'] == 'verify') {
    echo json_encode(
      array(
        'aaa',
        'Long Text 5

        Ben-Avraham, Zvi; Katsman, Regina (2015). "The formation of graben morphology in the Dead Sea Fault, and its implications". Geophysical Research Letters. American Geophysical Union. 42 (17). 2.2. Sedimentary Regime, p. 6991 (of 6989Ã¢â‚¬â€œ6996). doi:10.1002/2015GL065111. Estuarine-lagoonal series of syn-rift evaporites of the latest MioceneÃ¢â‚¬â€Pliocene ages. Sedimentary regime and mineral composition indicate that .... the Sedom formation in the DSB [Dead Sea Basin] .... , consisting mainly of halite, can be related to ingression of sea waters .... through the Yezreel Valley inland int
        ','stories'
      )
    );
  }elseif ($_POST['type'] == 'aaa' && $_POST['command'] == 'aaa') {
    echo json_encode(
      array(
        "bbb","Long Text 6

        Project Gutenberg's The Works of Edgar Allan Poe, by Edgar Allan Poe

        This eBook is for the use of anyone anywhere at no cost and with
        almost no restrictions whatsoever.  You may copy it, give it away or
        re-use it under the terms of the Project Gutenberg License included
        with this eBook or online at www.gutenberg.org


        Title: The Works of Edgar Allan Poe
               Volume 1 (of 5) of
        		the Raven Edition
      ",
      "stories"
    )
    );
  }elseif ($_POST['type'] == 'bbb' && $_POST['command'] == 'bbb') {
    echo json_encode(
      array(
        "ccc","Long Text 7

        Release Date: May 19, 2008 [EBook #2147]
        	Last Updated:
        		October 6, 2016

        Language: English


        *** START OF THIS PROJECT GUTENBERG EBOOK THE WORKS OF EDGAR ALLAN POE ***




        Produced by David Widger and Carlo Traverso
        ",
        "stories"
      )
    );
  }elseif ($_POST['type'] == 'ccc' && $_POST['command'] == 'ccc') {
    echo json_encode(
      array(
        "y",
        "Long Text 8

        with this eBook or online at www.gutenberg.org


        Title: The Works of Edgar Allan Poe
               Volume 1 (of 5) of
        		the Raven Edition

        Author: Edgar Allan Poe

        Release Date: May 19, 2008 [EBook #2147]
        	Last Updated:
        		October 6, 2016
        ",
        "stories"
      )
    );
  }elseif ($_POST['type'] == 'y' && $_POST['command'] == 'y') {
    echo json_encode(
      array(
        'finish','','ending'
      )
    );
  }else {
    echo json_encode(
      array(
          $_POST['type'],
          "wrong answer: ".$_POST['command'],
          $_POST['content']
        )
      );
  }
}