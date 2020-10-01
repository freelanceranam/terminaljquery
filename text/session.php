<?php
session_start(); // call session

// for example
$_SESSION['logged_email'] = 'demo@gmail.com';
$_SESSION['logged_password'] = 'demo123';

if (isset($_POST['command'])) {

  if($_POST['type'] == 'login' && $_POST['command'] == $_SESSION['logged_email']) // what he enter is matching the email in session = jasonwind@gmail.com
    {
      echo json_encode(array(true,'password')); // tell ajax that the data is correct, allow him to enter the password
    }elseif ($_POST['type'] == 'password' && $_POST['command'] == $_SESSION['logged_password']) // what he enter is matching the email in session = jasonwind@gmail.com
    {
      echo json_encode(array(true,'login')); // tell ajax that the data is correct, allow him to enter the password
    }else {

      // after login
      if ($_POST['type'] == '' && $_POST['command'] == '123456789') {
          echo json_encode(
            array(
              'Yes',
              $_POST['command'],
              '',
              'name'
            )
          );
      }elseif (strtolower($_POST['type']) == 'yes' && strtolower($_POST['command']) == 'yes') {
        echo json_encode(
          array(
            'I can wait',
            '',
            '',
            'gender'
          )
        );
      }elseif (strtolower($_POST['type']) == 'i can wait' && strtolower($_POST['command']) == 'i can wait') {
        echo json_encode(
          array(
            'Read',
            '','',
            'contact'

          )
        );
      }elseif (strtolower($_POST['type']) == 'read' && strtolower($_POST['command']) == 'read') {
        echo json_encode(
          array(
          'Start',
          'long-text1',
          'Fetching data from the text file',
          'stories'
          )
        );
      }elseif (strtolower($_POST['type']) == 'start' && strtolower($_POST['command']) == 'start') {
        echo json_encode(
          array(
            'Get',
            'long-text2',
            'Getting content with fun.',
            'stories'
          )
        );
      }elseif (strtolower($_POST['type']) == 'get' && strtolower($_POST['command']) == 'get') {
        echo json_encode(
          array(
            'Funny',
            'long-text3',
            'Generating story funny.',
            'stories'
          )
        );
      }elseif (strtolower($_POST['type']) == 'funny' && strtolower($_POST['command']) == 'funny') {
        echo json_encode(
        array(
            'Verify',
            'long-text4',
              'Verifying the content.',
              'stories'
          )
        );
      }elseif (strtolower($_POST['type']) == 'verify' && strtolower($_POST['command']) == 'verify') {
        echo json_encode(
          array(
            'AAA',
            'long-text5',
           'Read a story about your city life.',
           'stories'
          )
        );
      }elseif (strtolower($_POST['type']) == 'aaa' && strtolower($_POST['command']) == 'aaa') {
        echo json_encode(
          array(
            "BBB","long-text6",
          'Read a story about your family life.',
          "stories"
        )
        );
      }elseif (strtolower($_POST['type']) == 'bbb' && strtolower($_POST['command']) == 'bbb') {
        echo json_encode(
          array(
            "CCC","long-text7",
            'Read a story about your weekend.',
            "stories"
          )
        );
      }elseif (strtolower($_POST['type']) == 'ccc' && strtolower($_POST['command']) == 'ccc') {
        echo json_encode(
          array(
            "Y",
            "long-text8",
            'Do you want to get a suprise?',
            "stories"
          )
        );
      }elseif (strtolower($_POST['type']) == 'y' && strtolower($_POST['command']) == 'y') {
        echo json_encode(
          array(
            'finish','','','ending'
          )
        );
      }else {
        echo json_encode(
          array(
              $_POST['type'],
              $_POST['command'],
              'wrong',
              $_POST['content']
            )
          );
      }
    }
}
