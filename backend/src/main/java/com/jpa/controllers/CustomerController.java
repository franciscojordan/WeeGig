package com.jpa.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jpa.services.CustomerService;
import com.jpa.entities.Customer;

@RestController
@RequestMapping(value = "/1.0.0")
public class CustomerController {
	@Autowired
	CustomerService customerService;
	
	@RequestMapping(value = "/customers")
	public List<Customer> getCustomers(){
		return (customerService.findAllCustomers());
	}
	
//	@RequestMapping(value = "/customers/1")
//	public Optional<Customer> getCustomer1(){
//		return (customerService.findCustomerById((long) 1));
//	}
	
	@RequestMapping(value = "/customers/{id}")
	public Optional<Customer> getCustomer(@PathVariable("id") Long id) {
	    return (customerService.findCustomerById(id));
	}
	
	@RequestMapping(value = "/customers/put")
	public String put() {
	    return ("Hi");
	}
	
	@RequestMapping(value = "/customers/delete/{id}")
	public String delete(@PathVariable("id") Long id) {
	    return (customerService.deleteCustomer(id));
	}
}
