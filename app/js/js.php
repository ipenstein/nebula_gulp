<?php

    header ( "Content-Type: text/javascript; charset=UTF-8" , true ) ;

    ob_start ( 'ob_gzhandler' ) ;

        $sourcen = array (
                    // dependencies
                    '../../bower_components/jquery-validation/dist/jquery.validate.min.js',
                    '../../bower_components/jquery-validation/src/localization/messages_de.js',
                    'vendor/jquery.syncheight.js',
                    'vendor/jquery.scrollTo.min.js',
                    'vendor/parallax.min.js',

                    // user scripts
                    'responsive.js',
                    'forms.js',
                    'tabs.js',
                    'collapse.js',
                    'dropdowns.js',
                    'alerts.js',
                    'syncheight.js',
                    'example-parallax.js',
                    'example-scroll.js',
                    'example-navigation.js',
                    //'semantic.js',
                    'layout.js'
                ) ;

        foreach ( $sourcen AS $filename ) {
            if ( file_exists ( $filename ) == FALSE )
                die ( $filename ) ;

            echo file_get_contents ( $filename ) . "\r\n\r\n" ;
        }

    ob_end_flush () ;
