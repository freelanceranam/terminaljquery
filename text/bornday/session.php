<?php
session_start(); // call session

// for example
$_SESSION['logged_email'] = 'Nabilah';
$_SESSION['logged_password'] = '09-10';

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
            'can wait',
            '',
            '',
            'gender'
          )
        );
      }elseif (strtolower($_POST['type']) == 'can wait' && strtolower($_POST['command']) == 'can wait') {
        echo json_encode(
          array(
            'Start',
            '','',
            'contact'

          )
        );
      }elseif (strtolower($_POST['type']) == 'start' && strtolower($_POST['command']) == 'start') {
        echo json_encode(
          array(
          'Next',
          ['long-text1'],
          '',
          'stories'
          )
        );
      }elseif (strtolower($_POST['type']) == 'next' && strtolower($_POST['command']) == 'next') {
        echo json_encode(
          array(
            'Last',
            ['long-text2','long-text3'],
            '',
            'stories'
          )
        );
      }elseif (strtolower($_POST['type']) == 'last' && strtolower($_POST['command']) == 'last') {
        echo json_encode(
          array(
            "Yas",
            ["long-text4"],
            'Do you want to get a suprise?',
            "stories"
          )
        );
      }elseif (strtolower($_POST['type']) == 'yas' && strtolower($_POST['command']) == 'yas') {
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
