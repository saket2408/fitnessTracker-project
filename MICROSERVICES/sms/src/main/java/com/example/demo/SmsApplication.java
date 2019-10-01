package com.example.demo;

import org.springframework.boot.SpringApplication;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;



@SpringBootApplication
@EnableDiscoveryClient
public class SmsApplication {
		  public static void main(String[] args) {
			  SpringApplication.run(SmsApplication.class, args);
		 
		
		
	}

}
