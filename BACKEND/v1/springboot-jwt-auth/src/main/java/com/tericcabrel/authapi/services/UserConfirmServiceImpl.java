package com.tericcabrel.authapi.services;

import com.tericcabrel.authapi.configs.TokenProvider;
import com.tericcabrel.authapi.entities.Confirmation;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.exceptions.UserException;
import com.tericcabrel.authapi.repositories.ConfirmationRepository;
import com.tericcabrel.authapi.repositories.UserRepository;
import com.tericcabrel.authapi.request.UpdateUserReq;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserConfirmServiceImpl implements UserConfirmationService{
    private final UserRepository userRepository;
    private final ConfirmationRepository confirmationRepository;
    private final EmailService emailService;
    private final TokenProvider tokenProvider;

    @Override
    public User saveUser(User user, String nonEncryptedPassword) {
        if (userRepository.existsByEmail(user.getEmail())) { throw new RuntimeException("Email already exists"); }


        user.setEnabled(false);
        userRepository.save(user);

        Confirmation confirmation = new Confirmation(user);
        confirmationRepository.save(confirmation);

        /* TODO Send email to user with token */
        emailService.sendSimpleMailMessage(user.getFullName(), nonEncryptedPassword, user.getEmail(), confirmation.getToken());
        //emailService.sendMimeMessageWithAttachments(user.getName(), user.getEmail(), confirmation.getToken());
        //emailService.sendMimeMessageWithEmbeddedFiles(user.getName(), user.getEmail(), confirmation.getToken());
        //emailService.sendHtmlEmail(user.getName(), user.getEmail(), confirmation.getToken());
        //emailService.sendHtmlEmailWithEmbeddedFiles(user.getName(), user.getEmail(), confirmation.getToken());

        return user;
    }

    @Override
    public Boolean verifyToken(String token) {
        Confirmation confirmation = confirmationRepository.findByToken(token);
        User user = userRepository.findByEmailIgnoreCase(confirmation.getUser().getEmail());
        user.setEnabled(true);
        userRepository.save(user);
        confirmationRepository.delete(confirmation);
        return Boolean.TRUE;
    }

    @Override
    public User finyById(Integer id) throws UserException {
        Optional<User> userbyId = userRepository.findById(id);

        if(userbyId.isPresent()) {
            return userbyId.get();
        }
        throw new UserException("User not found with this id :: "+id);
    }

    @Override
    public Optional<User> findUserByProfile(String jwt) throws UserException {
        String email = tokenProvider.getEmailFromToken(jwt);
        System.out.println("user email :: "+email);

        if(email==null) {
            throw new BadCredentialsException("Invalid token ");
        }
        Optional<User> user =	userRepository.findByEmail(email);
        if(user == null) {
            throw new UserException("User not found with this email :: "+email);
        }
        System.out.println("User :: "+user);
        return user;
    }

    @Override
    public User updateUser(Integer id, UpdateUserReq req) throws UserException {
        User user = finyById(id);


        if(req.getFullName()!=null) {
            user.setFullName(req.getFullName());
        }
        if(req.getProfilePicture()!=null) {
            user.setProfilePicture(req.getProfilePicture());
        }
        return userRepository.save(user);
    }
    @Override
    public List<User> searchUser(String query) {
        List<User> searchedUsers = userRepository.searchUser(query);
        return searchedUsers;
    }

    @Override
    public List<User> searchByUserName(String name) {
        List<User> searchedUsers = userRepository.searchByUserName(name);
        return searchedUsers;
    }
}
