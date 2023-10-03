package com.coding.saga.resource.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserRespository repository;

    public UserController(UserRespository repository) {
        this.repository = repository;
    }
    @GetMapping("/users")
    public Iterable<User> getAllUsers() {
        return repository.findAll();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable String id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("Not found with " + id));
    }

    @PostMapping("/users/new")
    public ResponseEntity<String> addUser(@RequestBody UserDto userBody) {
        logger.debug("UserDto [ {}, {} ]", userBody.getId(), userBody.getCreatedAt());
        repository.save(new User(userBody.getId(), userBody.getCreatedAt()));
        return ResponseEntity.created(URI.create("/users/" + userBody.getId())).build();
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<String> updateUser(@PathVariable String id, @RequestBody UserDto userBody) {
        assert id.equals(userBody.getId());
        repository.update(new User(
                userBody.getId(),
                userBody.getFirst(),
                userBody.getLast(),
                userBody.getEmail(),
                userBody.getAvatar(),
                userBody.getRoles(),
                userBody.getCreatedAt()
        ));
        return ResponseEntity.ok("""
                {
                    "message" : "Updated successfully"
                }
                """);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable String id) {
        boolean result = repository.deleteById(id);

        if (!result) {
            throw new NotFoundException("Not found with user " + id);
        }

        return ResponseEntity.ok("""
                {
                    "message" : "Deleted successfully"
                }
                """);
    }
}
