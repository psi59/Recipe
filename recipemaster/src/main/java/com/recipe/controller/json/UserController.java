package com.recipe.controller.json;

import java.io.File;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
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

	@RequestMapping(path = "list", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String list(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "3") int pageSize) {
		HashMap<String, Object> result = new HashMap<>();
		try {
			List<User> list = userService.getUserList(pageNo, pageSize);

			result.put("status", "success");
			result.put("data", list);
		} catch (Exception e) {
			result.put("status", "failure");
		}

		return new Gson().toJson(result);
	}

	@RequestMapping(path = "add", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String add(User user, String passwordCheck) {
	 
		HashMap<String, Object> result = new HashMap<>();
		try {
		  User addUser=user;
		  //unique key 생성
		  addUser.setAuthenticationKEY(UUID.randomUUID().toString());
		  addUser.setAuthentication(0);
		  
			// 이메일 중복 확인
			if (userService.checkDuplication(user.getEmail()) && user.getPassword().equals(passwordCheck)) {
  			 ////password SHA1 암호화 끝
  	      try {
  	        // Create MD5 Hash
  	        MessageDigest digest = MessageDigest.getInstance("SHA-1");
  	        digest.update(user.getPassword().getBytes());
  	        byte messageDigest[] = digest.digest();
  	  
  	        // Create Hex String
  	        StringBuffer hexString = new StringBuffer();
  	        for (int i = 0; i < messageDigest.length; i++)
  	            hexString.append(Integer.toHexString(0xFF & messageDigest[i]));
  	        user.setPassword(hexString.toString());
  	  
  	    } catch (NoSuchAlgorithmException e) {
  	        e.printStackTrace();
  	    }
  	    //password SHA1 암호화 끝
				userService.addUser(addUser);
				result.put("status", "success");
				result.put("authKEY", addUser.getAuthenticationKEY());
				System.out.println(result);
			}
		} catch (Exception e) {
			result.put("status", "failure");
		}
		return new Gson().toJson(result);
	}

	// 이메일 중복 체크
	@RequestMapping(path = "checkDuplication", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String checkDuplication(String email) {
		HashMap<String, Object> result = new HashMap<>();
		try {
			result.put("status", "success");
			result.put("data", userService.checkDuplication(email));
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

	@RequestMapping(path = "detail", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String detail(HttpSession session) {
		HashMap<String, Object> result = new HashMap<>();
		try {
			result.put("status", "success");
			result.put("data", userService.getUser((Integer) session.getAttribute("userNo")));
		} catch (Exception e) {
			result.put("status", "failure");
		}
		return new Gson().toJson(result);
	}

	@RequestMapping(path = "update")
	@ResponseBody
	public String update(
	    //value="name"
			@RequestParam(value="userNo", defaultValue="0") int userNo,
			@RequestParam(value="email", defaultValue="") String email,
			@RequestParam(value="bfPwd", defaultValue="") String beforePassword,
			@RequestParam(value="password", defaultValue="") String password,
			@RequestParam(value="intro", defaultValue="") String intro,
			@RequestParam(value="profileImage") List<MultipartFile> profileImage,
			HttpSession session, HttpServletRequest request) {
		
	  System.out.println("::userNo::"+userNo+"::email::"+email+"::beforePassword::"+beforePassword+"::password::"+password+"::intro::"+intro);
	  
		User user = CommonUtil.getSessionUser(session);
		HashMap<String, Object> result = new HashMap<>();
				
		try {
			if(user.getUserNo()!=0){			
				if(user.getUserNo()==userNo){
					String fileName = "userprofile_"+user.getUserNo()+".png";
					if(!profileImage.get(0).getOriginalFilename().equals("")){
						System.out.println("이미지 변경");
						File recipeUrl= new File(CommonUtil.getImageFolderPath("profileImg", request)+"/"+fileName);
						profileImage.get(0).transferTo(recipeUrl);
					}
					
		       ////password SHA1 암호화 끝
          try {
            // Create MD5 Hash
            MessageDigest digest = MessageDigest.getInstance("SHA-1");
            digest.update(user.getPassword().getBytes());
            byte messageDigest[] = digest.digest();
      
            // Create Hex String
            StringBuffer hexString = new StringBuffer();
            for (int i = 0; i < messageDigest.length; i++)
                hexString.append(Integer.toHexString(0xFF & messageDigest[i]));
            user.setPassword(hexString.toString());
      
              } catch (NoSuchAlgorithmException e) {
                  e.printStackTrace();
              }
           //password SHA1 암호화 끝
					
					if(beforePassword.equals(userService.getUser(userNo))){
						user.setPassword(password);
					}
					
					user.setIntro(intro);
					user.setImage(fileName);
					System.out.println(user.getPassword().equals(""));
					userService.updateUser(user);
					result.put("status", "success");
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

	@RequestMapping(path = "best", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String best(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "3") int pageSize) {
		HashMap<String, Object> result = new HashMap<>();
		try {
			List<User> list = userService.getUserRankList(pageNo, pageSize);
			result.put("status", "success");
			result.put("data", list);
		} catch (Exception e) {
			result.put("status", "failure");
		}

		return new Gson().toJson(result);
	}

	@RequestMapping(path = "rank", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String rank(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
		HashMap<String, Object> result = new HashMap<>();
		try {
			List<User> list = userService.getUserRankList(pageNo, pageSize);
			result.put("status", "success");
			result.put("data", list);
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
		User loginUser=new User();
		
		loginUser = userService.selectFromEmail(user.getEmail()); 
		//
		System.out.println("로그인 한 정보::"+loginUser);
		if(loginUser.getEmail()==null) {
      result.put("status", "null");
      System.out.println("loginUser.getEmail()==null");
      
      return new Gson().toJson(result);
    }else if (loginUser.getAuthentication()==0) {
		  result.put("status", "authError");
		  System.out.println("getAuthentication==0");
		  
		  return new Gson().toJson(result);
    }
		try {
    	////password SHA1 암호화 끝
          try {
            // Create MD5 Hash
            MessageDigest digest = MessageDigest.getInstance("SHA-1");
            digest.update(user.getPassword().getBytes());
            byte messageDigest[] = digest.digest();
      
            // Create Hex String
            StringBuffer hexString = new StringBuffer();
            for (int i = 0; i < messageDigest.length; i++)
                hexString.append(Integer.toHexString(0xFF & messageDigest[i]));
            user.setPassword(hexString.toString());
      
              } catch (NoSuchAlgorithmException e) {
                  e.printStackTrace();
              }
      //password SHA1 암호화 끝
      System.out.println("password SHA1 암호화::"+user.getPassword().toString().trim().equals(loginUser.getPassword().toString().trim()));
      loginUser = userService.loginUser(user); 
		  result.put("status", "success");
      result.put("data", loginUser);
      // server sessionStorage에 유저 정보 저장 ------------------
      session.setAttribute("loginUser", loginUser);
			
		} catch (Exception e) {
			result.put("status", "failure");
		}
		return new Gson().toJson(result);
		// result.data로 하면 logUser의 도메인 값을 가져 올 수 있다.
	}
	
	 @RequestMapping(path = "loginCheck", produces = "application/json;charset=UTF-8")
	  @ResponseBody // URL에 넣지 않고 바디에 넣어 데이터만 보내겠다는 것
	  public String loginCheck(HttpSession session) {
	    // index.html에서 name으로 되어있는 RequestParam이 넘어 온다.
	    HashMap<String, Object> result = new HashMap<>();
	    User loginUser=(User) session.getAttribute("loginUser");
      if(session.isNew()){
        result.put("status", "failure");
        System.out.println("unLogin");
      } else {
        if(loginUser!=null){
	        System.out.println("login");
	        result.put("status", "success");
	        result.put("data", loginUser);
	        System.out.println("loginUser::"+loginUser);
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
       System.out.println("session.removeAttribute()"+session);
       result.put("status", "success");
     } catch (Exception e) {
       result.put("status", "failure");
     }
     return new Gson().toJson(result);
     // result.data로 하면 logUser의 도메인 값을 가져 올 수 있다.
   }

	@RequestMapping(path = "getUser", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody // URL에 넣지 않고 바디에 넣어 데이터만 보내겠다는 것
	public String getUser(int no) {
		// index.html에서 name으로 되어있는 RequestParam이 넘어 온다.
		HashMap<String, Object> result = new HashMap<>();
		try {
			User logUser = userService.getUser(no);
			result.put("status", "success");
			result.put("data", logUser);
		} catch (Exception e) {
			result.put("status", "failure");
		}
		return new Gson().toJson(result);
		// result.data로 하면 logUser의 도메인 값을 가져 올 수 있다.
	}
	
	 @RequestMapping(path = "top3", produces = "application/json;charset=UTF-8")
	  @ResponseBody
	  public String top3(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "3") int pageSize
	      , HttpSession session) {
	    HashMap<String, Object> result = new HashMap<>();
	    User loginUser = new User();
	    if(session.getAttribute("loginUser")!=null){
	      loginUser=(User) session.getAttribute("loginUser");  
	    }else{
	      loginUser.setUserNo(0);
	    }
	    
	    try {
	      int uno=loginUser.getUserNo();
	      List<User> list = userService.selectRankListSCS(pageNo, pageSize, uno);
	      result.put("status", "success");
	      result.put("data", list);
	    } catch (Exception e) {
	      result.put("status", "failure");
	    }
	    return new Gson().toJson(result);
	  }
	 
	 @RequestMapping(path = "auth", produces = "application/json;charset=UTF-8")
	 public String auth(String authKEY, int auth, String inputEmail){   
	    
	    HashMap<String, Object> result = new HashMap<>();
      User authUser = new User();
      authUser=userService.selectFromEmail(inputEmail);;
      try {
        
        System.out.println("authKEY::"+authKEY);
        System.out.println("authUser.getAuthenticationKEY()::"+authUser.getAuthenticationKEY());
        System.out.println(authKEY.toString().trim().equals(authUser.getAuthenticationKEY().toString().trim()));
        if (authKEY.toString().trim().equals(authUser.getAuthenticationKEY().toString().trim())) {
          userService.authUpdate(authKEY, auth, inputEmail);
          result.put("status", "success");
          System.out.println("성공");
          System.out.println("왜 안들어오냐1111??"+authKEY+"::"+auth+"::"+inputEmail+"::");
        }else{
          System.out.println("실패");
        }
      } catch (Exception e) {
        e.printStackTrace();
        System.out.println("실패");
        result.put("status", "failure");
      }
      return "index.html";
      
	  }
}
