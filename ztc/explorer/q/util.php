<?php

// API 1 - Use Blockchain Cache

function fetch_info(string $api) {
           $_url = $api . '/info';
           $response = file_get_contents($_url);
           return json_decode($response, true);
};
   
function fetch_reward(string $api) {
           $url = $api . '/block/header/top';
           $response = file_get_contents($url);
           return json_decode($response, true);
};

function fetch_supply(string $api) {
        $url = $api . '/supply';
        $response = file_get_contents($url);
        return json_decode($response, true);
};

// API 2 (Redundant) - Use Classic Daemon

function build_post_context(string $postdata) {
        return stream_context_create(array(
                'http' =>
                        array(
                                'method' => 'POST',
                                'header' => 'application/json',
                                'content' => $postdata
                        )
                )
        );
};

function build_rpc_body(string $method, string $params) {
        return '{"jsonrpc":"2.0","id":"blockexplorer","method":"'.$method.'","params":'.$params.'}';
};

function fetch_rpc(string $api, string $method, string $params) {
        $url = $api . '/json_rpc';
        $rendered_rpc = build_rpc_body($method, $params);
        $context = build_post_context($rendered_rpc);
        $response = file_get_contents($url, false, $context);
        return json_decode($response, true);
};

function fetch_getinfo(string $api) {
           $_url = $api . '/getinfo';
           $response = file_get_contents($_url);
           return json_decode($response, true);
};