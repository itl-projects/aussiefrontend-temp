var authStore = {
  saveUserData(data) {
    const userData = JSON.stringify({
      username: data.user_details.username,
      first_name: data.user_details.first_name,
      last_name: data.user_details.last_name,
      email: data.user_details.email,
      age: data.additional_details.age,
      billing_address: data.additional_details.billing_address,
      city: data.additional_details.city,
      state: data.additional_details.state,
      state_code: data.additional_details.state_code,
      country: data.additional_details.country,
      zipcode: data.additional_details.zipcode,
      emailverified: data.additional_details.emailverified,
      phoneverified: data.additional_details.phoneverified,
      phone: data.additional_details.phone,
      avatar: data.additional_details.avatar,
      dob: data.additional_details.dob,
      latitute: data.additional_details.latitude,
      longitude: data.additional_details.longitude
    });
    localStorage.setItem("user_data", userData);
    localStorage.setItem("user_token", data.data.token);
    localStorage.setItem("user_type", data.type);
    localStorage.setItem("userIsMale",data.additional_details.gender == "Male" ? true : false);
  },
  
  getUserData(){
        return JSON.parse(localStorage.getItem("user_data"));
  },
  setUserDataAgain(userData){
      localStorage.setItem("user_data",userData);
  },
  setPetCount(count) {
    localStorage.setItem("petCount", count);
  },
  getPetCount() {
    return localStorage.getItem("petCount");
  },

  getUsername(){
      return JSON.parse(localStorage.getItem("user_data")).username;
  },

  getAvatar(){
    return JSON.parse(localStorage.getItem("user_data")).avatar;
},
  userToken() {
    return localStorage.getItem("user_token");
  },

  userDetails() {
    return localStorage.getItem("user_data");
  },
  userType() {
    return localStorage.getItem("user_type");
  },

  isSignedIn() {
    return localStorage.getItem("user_token") ? true : false;
  },
  isMale() {
    return localStorage.getItem("userIsMale") ? true : false;
  },

  isHost() {
    return localStorage.getItem("user_type") == "petowner" ? true : false;
  },
  logout() {
    localStorage.removeItem("user_data");
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_type");
  },
};
export default authStore;
//AuthStore;
// {
//   saveUserData,
//   userToken,
//   userDetails,
//   userType,
//   isSignedIn,
//   logout,
// };
