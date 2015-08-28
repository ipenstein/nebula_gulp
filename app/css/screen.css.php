<?php

    header ( "Content-Type: text/css; charset=UTF-8" , true ) ;

    ob_start ( 'ob_gzhandler' ) ;

        $sourcen = array (
                    'screen.css'
                ) ;

        foreach ( $sourcen AS $filename ) {
            if ( file_exists ( $filename ) == FALSE )
                die ( $filename ) ;

            echo file_get_contents ( $filename ) . "\r\n\r\n" ;
        }

    ob_end_flush () ;
