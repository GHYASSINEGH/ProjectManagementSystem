package com.tericcabrel.authapi.controllers;

import com.tericcabrel.authapi.dtos.JsonResponse;

import com.tericcabrel.authapi.dtos.SprintModel;

import com.tericcabrel.authapi.entities.Release;
import com.tericcabrel.authapi.entities.Sprint;

import com.tericcabrel.authapi.repositories.RealeaseRepository;
import com.tericcabrel.authapi.repositories.SprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/sprints")
@RestController
@CrossOrigin( value="*" )
public class
SprintController {

    @Autowired
    SprintRepository repo;
    @Autowired
    RealeaseRepository realeaseRepository;





    @GetMapping("/list/{id}")
    public ResponseEntity<?> getSprintByRelease(@PathVariable Long id){

        Release release =realeaseRepository.findById(id).get();


        List<Sprint> sprints = this.repo.findByRelease(release);


        return ResponseEntity.ok(sprints);

    }


    @PostMapping("/add")
    public ResponseEntity<?> addSprint(  @RequestBody SprintModel model ) {
        Sprint sprint= new Sprint();
        sprint.setTitle(model.getTitle());
        sprint.setDescription(model.getDescription());
        sprint.setCreationDate(model.getCreationDate());
        sprint.setEndDate(model.getEndDate());

        sprint.setRelease(this.realeaseRepository.findById(model.getRelease()).get());

        this.repo.save(sprint);

        return ResponseEntity.ok(new JsonResponse(true, "Sprint Created successfullly"));

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSprint(@PathVariable Long id) {


        Sprint sprint=repo.findById(id).get();


        repo.delete(sprint);

        return ResponseEntity.ok(new JsonResponse(true, "Sprint deleted successfully"));
    }





    @GetMapping("/details/{id}")
    public ResponseEntity<?> getSprintById(@PathVariable Long id) {

        try {
            Sprint sprint=repo.findById(id).get();


            return ResponseEntity.ok(sprint);
        }catch(Exception e) {
            return ResponseEntity.ok(new JsonResponse(false, "Sprint not found"));
        }
    }


}
