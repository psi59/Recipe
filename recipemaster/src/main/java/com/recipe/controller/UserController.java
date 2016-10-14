package com.recipe.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.recipe.domain.User;
import com.recipe.service.UserService;
import com.recipe.util.CommonUtil;

@Controller
@RequestMapping("/user/")
public class UserController {

	@Autowired
	UserService userService;

	@RequestMapping(path = "add", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String add(User user, String passwordCheck) {
		HashMap<String, Object> result = new HashMap<>();
		
		try {	
			userService.addUser(user);
			result.put("status", "success");
			result.put("authKEY", user.getAuthenticationKEY());
		} catch (Exception e) {
			result.put("status", "failure");
		}
		return new Gson().toJson(result);
	}
	
	// 닉네임 중복 체크
	@RequestMapping(path = "checkDuplicationUserName", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String checkDuplicationUserName(String userName) {
		HashMap<String, Object> result = new HashMap<>();
		try {
			result.put("status", "success");
			result.put("data", userService.checkDuplicationUserName(userName));
		} catch (Exception e) {
			result.put("status", "failure");
		}
		return new Gson().toJson(result);
	}

	@RequestMapping(path = "update")
	@ResponseBody
	public String update(
			@RequestParam(value="userNo", defaultValue="0") int userNo,
			@RequestParam(value="email", defaultValue="") String email,
			@RequestParam(value="beforePassword", defaultValue="") String beforePassword,
			@RequestParam(value="afterpassword", defaultValue="") String afterpassword,
			@RequestParam(value="intro", defaultValue="") String intro,
			@RequestParam(value="profileImage") MultipartFile profileImage,
			HttpSession session, HttpServletRequest request) {

		User user = CommonUtil.getSessionUser(session);
		HashMap<String, Object> result = new HashMap<>();
		try {
			if (!(CommonUtil.sha1(beforePassword).toString().trim().equals(user.getPassword().toString().trim()))) {
				result.put("status", "pwdFail");    
				System.out.println("비밀번호 오류");
				return new Gson().toJson(result);
			}

			beforePassword=CommonUtil.sha1(beforePassword);

			if(user.getUserNo()!=0){			
				if(user.getUserNo()==userNo){
					String fileName = "userprofile_"+user.getUserNo()+".png";
					if(!profileImage.getOriginalFilename().equals("")){						
						File recipeUrl= new File(CommonUtil.getImageFolderPath("profileImg", request)+"/"+fileName);
						profileImage.transferTo(recipeUrl);
					}
					afterpassword=CommonUtil.sha1(afterpassword);

					if(beforePassword.toString().trim().equals(user.getPassword().toString().trim())){
						/*user=CommonUtil.sha1(user);*/
						user.setIntro(intro);
						user.setImage(fileName);
						user.setPassword(afterpassword);
						userService.updateUser(user);
						result.put("status", "success");       
					}else{
						result.put("status", "fail");    

						return new Gson().toJson(result);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.put("status", "fail");
		}
		return new Gson().toJson(result);
	}

	@RequestMapping(path = "delete", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String delete(int no) {
		HashMap<String, Object> result = new HashMap<>();
		try {
			userService.deleteUser(no);
			result.put("status", "success");
		} catch (Exception e) {
			result.put("status", "failure");
		}
		return new Gson().toJson(result);
	}
	
	@RequestMapping(path = "login", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody // URL에 넣지 않고 바디에 넣어 데이터만 보내겠다는 것
	public String login(User user, HttpSession session) {
		// index.html에서 name으로 되어있는 RequestParam이 넘어 온다.
		HashMap<String, Object> result = new HashMap<>(); 
		
		try {
			User loginUser = userService.loginUser(user);
			if(loginUser.getEmail()==null) {
				// 가입되지 않았거나 비밀번호가 다른 계정
				result.put("status", "failure");
			}else if (loginUser.getAuthentication()==0) {
				// 인증되지 않은 계정
				result.put("status", "authError");
			} else {
				// 로그인 성공
				result.put("status", "success");
				result.put("data", loginUser);
				session.setAttribute("loginUser", loginUser);
			}
		} catch (Exception e) {
			result.put("status", "failure");
		}
		
		return new Gson().toJson(result);
	}

	@RequestMapping(path = "loginNaver", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody // URL에 넣지 않고 바디에 넣어 데이터만 보내겠다는 것
	public String loginNaver(User user, HttpSession session) {
		// index.html에서 name으로 되어있는 RequestParam이 넘어 온다.
		HashMap<String, Object> result = new HashMap<>();
		try {
			User loginUser = new User(); 
			loginUser = userService.loginUser(user);   
	
			if(loginUser == null){
				userService.addUserInNaver(user);
				loginUser = userService.loginUser(user);
			}
		
			if (loginUser!=null ) {
				result.put("status", "success");
				result.put("data", loginUser);
				session.setAttribute("loginUser", loginUser);
			}else{

				result.put("status", "failure");
			}

		} catch (Exception e) {
			result.put("status", "failure");
		}
		return new Gson().toJson(result);
	}


	@RequestMapping(path = "loginCheck", produces = "application/json;charset=UTF-8")
	@ResponseBody // URL에 넣지 않고 바디에 넣어 데이터만 보내겠다는 것
	public String loginCheck(HttpSession session) {
		// index.html에서 name으로 되어있는 RequestParam이 넘어 온다.
		HashMap<String, Object> result = new HashMap<>();
		User loginUser=(User) session.getAttribute("loginUser");
		if(session.isNew()){
			result.put("status", "failure");        
		} else {
			if(loginUser!=null){	        
				result.put("status", "success");
				result.put("data", loginUser);	        
			} else {
				result.put("status", "failure");
			}
		}
		return new Gson().toJson(result);
		// result.data로 하면 logUser의 도메인 값을 가져 올 수 있다.
	}

	@RequestMapping(path = "logout", produces = "application/json;charset=UTF-8")
	@ResponseBody // URL에 넣지 않고 바디에 넣어 데이터만 보내겠다는 것
	public String logout(HttpSession session) {
		// index.html에서 name으로 되어있는 RequestParam이 넘어 온다.
		HashMap<String, Object> result = new HashMap<>();

		try {
			session.removeAttribute("loginUser");       
			result.put("status", "success");
		} catch (Exception e) {
			result.put("status", "failure");
		}
		return new Gson().toJson(result);
		// result.data로 하면 logUser의 도메인 값을 가져 올 수 있다.
	}

	@RequestMapping(path = "changePassword")
	public String changePassword(String email){   
		HashMap<String, Object> result = new HashMap<>();
		User user=userService.getFromEmail(email);
		String key = "";
		try {
			key = userService.updateUser(user);
			result.put("status", "success");
			result.put("key",key);
			result.put("email", user.getEmail());
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("실패");
			result.put("status", "failure");
		}
		return "redirect:http://tkddlf59.dlinkddns.com:2828/user/updatePassword.do?email="+email+"&key="+key;
	}
}
