package com.tericcabrel.authapi.controllers;

import com.tericcabrel.authapi.dtos.JsonResponse;
import com.tericcabrel.authapi.dtos.ProjectDto;
import com.tericcabrel.authapi.dtos.RealeaseModel;
import com.tericcabrel.authapi.entities.Company;
import com.tericcabrel.authapi.entities.Project;
import com.tericcabrel.authapi.entities.Release;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.repositories.ProjectRepository;
import com.tericcabrel.authapi.repositories.RealeaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/realeases")
@RestController
@CrossOrigin( value="*" )
public class RealeaseController {

    @Autowired
    RealeaseRepository repo;

 @Autowired
 ProjectRepository projectRepository;





    @GetMapping("/list/{id}")
    public ResponseEntity<?> getRealeasesByProject(@PathVariable Long id){

        Project project =projectRepository.findById(id).get();


        List<Release> releases = this.repo.findByProject(project);


        return ResponseEntity.ok(releases);

    }


    @PostMapping("/add")
    public ResponseEntity<?> addRelease(  @RequestBody RealeaseModel model ) {
        Release release = new Release();
        release.setTitle(model.getTitle());
        release.setDescription(model.getDescription());
        release.setStartDate(model.getStartDate());
        release.setEndDate(model.getEndDate());

        release.setProject(this.projectRepository.findById(model.getProject()).get());

        this.repo.save(release);

        return ResponseEntity.ok(new JsonResponse(true, "Realease Created successfullly"));

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteRelease(@PathVariable Long id) {


        Release release = repo.findById(id).get();


        repo.delete(release);

        return ResponseEntity.ok(new JsonResponse(true, "Release deleted successfully"));
    }





    @GetMapping("/details/{id}")
    public ResponseEntity<?> getReleaseById(@PathVariable Long id) {

        try {
            Release release = repo.findById(id).get();


            return ResponseEntity.ok(release);
        }catch(Exception e) {
            return ResponseEntity.ok(new JsonResponse(false, "Release not found"));
        }
    }






}
