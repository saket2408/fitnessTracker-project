package com.example.demo.controller;

import java.io.IOException;
import java.io.InputStream;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.UserDto;
import com.example.demo.model.UserRequest;
import com.example.demo.model.UserResponse;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("/addUser")
	public ResponseEntity<?> createUser(@RequestBody UserRequest userRequest)
	{
		ModelMapper mapper=new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		UserDto userdto=mapper.map(userRequest,UserDto.class);
		UserDto responseDtoUser=userService.createUser(userdto);
		UserResponse userResponse=mapper.map(responseDtoUser,UserResponse.class);
		return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
	}
	
	@RequestMapping("/login")
	public ResponseEntity<?> verifyUser(@RequestBody UserRequest userRequest)
	{
		ModelMapper mapper=new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		UserDto userdto=mapper.map(userRequest,UserDto.class);
		UserDto responseDtoUser=userService.verifyUser(userdto);
		if(responseDtoUser!=null)
		{
			UserResponse userResponse=mapper.map(responseDtoUser,UserResponse.class);
			return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
			
		}
		else
		{
			return ResponseEntity.badRequest().body("Wrong Credentials");
		}
		
	}
	
	@GetMapping("/delete/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable("id") Integer id){
		UserDto dto=userService.getUserById(id);
		userService.deleteUser(id);
		return ResponseEntity.status(HttpStatus.CREATED).body("This user is deleted "+dto.toString());
	}
	
	@GetMapping("/users")
	public ResponseEntity<?> getAllUsers(){
		java.util.List<UserResponse> ulist=userService.getAllUsers();
	    return ResponseEntity.status(HttpStatus.CREATED).body(ulist);	
	}
	

	@PostMapping("/search")
	public ResponseEntity<?> getUserByEmail(@RequestBody UserRequest ur){
		UserDto udt=userService.getUserByEmail(ur.getEmail());
		ModelMapper mapper=new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		UserResponse userdto=mapper.map(udt,UserResponse.class);
		return ResponseEntity.status(HttpStatus.CREATED).body(userdto);
	}
}
