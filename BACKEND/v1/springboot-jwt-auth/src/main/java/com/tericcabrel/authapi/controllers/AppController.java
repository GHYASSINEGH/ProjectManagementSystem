package com.tericcabrel.authapi.controllers;

import org.springframework.web.bind.annotation.*;

@RequestMapping("/app")
@RestController
public class AppController {
	
	
	
	@GetMapping("/test")
	public String hello() {
		return "bonjour";
	}

}
