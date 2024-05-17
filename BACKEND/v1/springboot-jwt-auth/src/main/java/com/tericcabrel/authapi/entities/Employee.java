package com.tericcabrel.authapi.entities;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Table(name = "employees")
@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;


    private String phone;
    
    
    private String address;
     
    private LocalDateTime createdAt = LocalDateTime.now();

	@JsonManagedReference
    @OneToOne
	private User user;

    @ManyToOne
    @JsonIgnore
    private User client;

	@OneToMany(cascade = CascadeType.ALL, mappedBy="employee")
	private Set<ProjectEmployee> Projectemployees=new HashSet<>();

	@OneToMany(cascade = CascadeType.ALL ,mappedBy = "employee")
	private Set<Notification> notifications;


	// private String photoURL; // http://localhost:8000/images/hsbksjnbsjdf.png

	public User getClient() {
		return client;
	}


	public void setClient(User client) {
		this.client = client;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	public LocalDateTime getCreatedAt() {
		return createdAt;
	}


	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public Set<Notification> getNotifications() {
		return notifications;
	}

	public void setNotifications(Set<Notification> notifications) {
		this.notifications = notifications;
	}


	public Employee() {
		super();
	}
    
    
    
    
}
