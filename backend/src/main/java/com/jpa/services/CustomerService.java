package com.jpa.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jpa.entities.Customer;
import com.jpa.repository.CustomerRepository;

@Service
public class CustomerService {
	@Autowired
	CustomerRepository customerRepository;
	
	public List<Customer> findAllCustomers() {
		return customerRepository.findAll();
	}

	public Optional<Customer> findCustomerById(Long i) {
		return customerRepository.findById(i);
	}

	public Customer saveCustomer(Customer customer) {
		customerRepository.save(customer);
		return customer;
	}

	public String deleteCustomer(Long id) {
		if (customerRepository.findById(id).isPresent()) {
			customerRepository.deleteById(id);
			return "Customer eliminado correctamente.";
		}
		return "Error! El customer no existe";
	}

	public String updateCustomer(Customer customerUpdated) {
		Long num = customerUpdated.getId();
		if (customerRepository.findById(num).isPresent()) {
			Customer customerToUpdate = new Customer();
			customerToUpdate.setId(customerUpdated.getId());
			customerToUpdate.setName(customerUpdated.getName());
			customerToUpdate.setSurname(customerUpdated.getSurname());
			customerToUpdate.setBirtdate(customerUpdated.getBirtdate());
			customerToUpdate.setPhone(customerUpdated.getPhone());
			customerToUpdate.setCountry(customerUpdated.getCountry());
			customerToUpdate.setCity(customerUpdated.getCity());
			customerToUpdate.setDirection(customerUpdated.getDirection());
			customerToUpdate.setPostcode(customerUpdated.getPostcode());
			customerRepository.save(customerToUpdate);
			return "Customer modificado";
		}
		return "Error al modificar el Customer";
	}

}