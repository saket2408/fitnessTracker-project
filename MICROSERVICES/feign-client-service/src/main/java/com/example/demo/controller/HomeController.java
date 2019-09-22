package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.UserRequest;
import com.example.demo.service.FeignService;

@RestController
public class HomeController {

	@Autowired
	private FeignService service;
	
	@PostMapping("/users")
	public ResponseEntity<?> createUser(@RequestBody UserRequest userRequest){
		return service.createUser(userRequest);
	}
	@PostMapping("/login")
	public ResponseEntity<?> verifyUser(@RequestBody UserRequest userRequest){
		return service.verifyUser(userRequest);
	}
	
	@GetMapping("/delete/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable("id") Integer id){
		return service.deleteUser(id);
	}
	
	@GetMapping("/users")
	public ResponseEntity<?> getAllUsers(){
		return service.getAllUsers();
	}
	
	@PostMapping("/search")
	public ResponseEntity<?> getUserByEmail(@RequestBody UserRequest ur){
		return service.getUserByEmail(ur);
	}
	
	@GetMapping("/workout/{type}")
	public ResponseEntity<?> getWorkout(@PathVariable("type") String category){
		return service.getWorkout(category);
	}
	

	@GetMapping("/meal/{type}")
	public ResponseEntity<?> getMeal(@PathVariable("type") String category){
		return service.getMeal(category);
	}
}
