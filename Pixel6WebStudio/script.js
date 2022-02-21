let statesCofig = [
    { stateCode: 101, stateName: 'Andhra Pradesh' },
    { stateCode: 102, stateName: 'Arunachal Pradesh' },
    { stateCode: 103, stateName: 'Assam' },
    { stateCode: 104, stateName: 'Bihar' },
    { stateCode: 105, stateName: 'Chhatisgarh' },
    { stateCode: 106, stateName: 'Goa' },
    { stateCode: 107, stateName: 'Gujarat' },
    { stateCode: 108, stateName: 'Haryana' },
    { stateCode: 109, stateName: 'Himachal Pradesh' },
    { stateCode: 110, stateName: 'Jharkhand' },
    { stateCode: 111, stateName: 'Karnataka' },
    { stateCode: 112, stateName: 'Kerala' },
    { stateCode: 113, stateName: 'Madhya Pradesh' },
    { stateCode: 114, stateName: 'Maharashtra' },
    { stateCode: 115, stateName: 'Manipur' },
    { stateCode: 116, stateName: 'Meghalaya' },
    { stateCode: 117, stateName: 'Mizoram' },
    { stateCode: 118, stateName: 'Nagaland' },
    { stateCode: 119, stateName: 'Odisha' },
    { stateCode: 120, stateName: 'Punjab' },
    { stateCode: 121, stateName: 'Rajasthan' },
    { stateCode: 122, stateName: 'Sikkim' },
    { stateCode: 123, stateName: 'Tamil Nadu' },
    { stateCode: 124, stateName: 'Telangana' },
    { stateCode: 125, stateName: 'Tripura' },
    { stateCode: 126, stateName: 'Uttarakhand' },
    { stateCode: 127, stateName: 'Uttar Pradesh' },
    { stateCode: 128, stateName: 'West Bengal' },
    { stateCode: 129, stateName: 'Andaman and Nicobar Islands' },
    { stateCode: 130, stateName: 'Chandigarh' },
    { stateCode: 131, stateName: 'Dadara and Nagar Haveli and Daman & Diu' },
    { stateCode: 132, stateName: 'Delhi' },
    { stateCode: 133, stateName: 'Jammu & Kashmir' },
    { stateCode: 134, stateName: 'Ladakh' },
    { stateCode: 135, stateName: 'Lakshdweep' },
    { stateCode: 136, stateName: 'Puducherry' },
];
const phoneProviderConfig = [
    {
      providerName: 'Reliance Jio',
      noStartFrom: 621,
      noEndBefore: 799,
      logoName: 'jio.png',
    },
    {
      providerName: 'Idea',
      noStartFrom: 801,
      noEndBefore: 920,
      logoName: 'idea.png',
    },
    {
      providerName: 'Vodafone',
      noStartFrom: 921,
      noEndBefore: 999,
      logoName: 'vodafone.png',
    },
];

  function submitData() {
    const fullName = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const phoneNo = document.getElementById('phonenumber').value;
    const formDetails = {
      fullName: fullName,
      email: email,
      phoneNo: phoneNo,
      otpInvalidAttempt: 0
    };
    if (validateFormDetails(formDetails)) {
      const otp = (Math.floor(1000 + Math.random() * 9000)).toString().substring(-2);
      formDetails.otp = otp;
      sessionStorage.setItem("formDetails", JSON.stringify(formDetails));
      window.location.href = 'thankyou.html';
    }
  }
  
  function validateFormDetails(formDetails) {
    let result = true;
    const onlyCharRegex = /^[A-Za-z]+$/;
    document.getElementById('fullname_error').innerHTML = '';
    document.getElementById('email_error').innerHTML = '';
    document.getElementById('phonenumber_error').innerHTML = '';
    // full name validation
    if (formDetails.fullName && formDetails.fullName.trim()) {
      const fullNameArr = formDetails.fullName.split(' ');
      const firstName =
        fullNameArr[0] && fullNameArr[0].trim() ? fullNameArr[0].trim() : '';
      const lastName =
        fullNameArr[1] && fullNameArr[1].trim() ? fullNameArr[1].trim() : '';
      if (!firstName) {
        document.getElementById('fullname_error').innerHTML =
          'First Name is mandatory.';
        result = false;
      } else if (firstName.length < 4) {
        document.getElementById('fullname_error').innerHTML =
          'Enter first name minimum 4 characters.';
        result = false;
      } else if (!firstName.match(onlyCharRegex)) {
        document.getElementById('fullname_error').innerHTML =
          'Please enter only characters in First Name.';
        result = false;
      } else if (!lastName) {
        document.getElementById('fullname_error').innerHTML =
        'Last Name is mandatory.';
        result = false;
      } else if (lastName.length < 4) {
        document.getElementById('fullname_error').innerHTML =
          'Enter last name minimum 4 characters.';
        result = false;
      } else if (!lastName.match(onlyCharRegex)) {
        document.getElementById('fullname_error').innerHTML =
          'Please enter only characters in last Name.';
        result = false;
      }
    } else {
      document.getElementById('fullname_error').innerHTML =
        'Full name is mandatory.';
      result = false;
    }

    // Email Validation
    if (formDetails.email && formDetails.email.trim()) {
      let symb = formDetails.email.indexOf('@');
      let dot = formDetails.email.indexOf('.');
      if( symb < 1 ){
        document.getElementById('email_error').innerHTML='Please Enter correct email.';
        result = false;
      } else if ( dot <= symb+2 ) {
        document.getElementById('email_error').innerHTML='Please Enter correct email.';
        result = false;
      } else if (dot === formDetails.email.length - 1) {
        document.getElementById('email_error').innerHTML='Please Enter correct email.';
        result = false;
      }
    } else {
      document.getElementById('email_error').innerHTML =
        'Email is mandatory.';
      result = false;
    }

    // phone no validation
    if (formDetails.phoneNo && formDetails.phoneNo.trim()) {
      let phoneValidNo = ``;
      const phoneNoArr = formDetails.phoneNo.trim().split('');
      phoneNoArr.forEach((char) => {
        if (char.trim() && !isNaN(char)) {
          phoneValidNo += `${char}`;
        }
      });
      if (phoneValidNo.length !== 10) {
        document.getElementById('phonenumber_error').innerHTML =
          'Enter minimum 10 numbers.';
        result = false;
      } else {
        const provider = getProviderName(formDetails.phoneNo);
        if (!provider || !provider.providerName) {
          document.getElementById('phonenumber_error').innerHTML =
            'Enter valid provider code.';
          result = false;
        } else if (!getStateName(formDetails.phoneNo)) {
          document.getElementById('phonenumber_error').innerHTML =
            'Enter valid state code.';
          result = false;
        }
      }
    } else {
      document.getElementById('phonenumber_error').innerHTML =
        'Phone No is mandatory.';
      result = false;
    }
    return result;
  }
  
  function checkFormatPhoneNo() {
    const phoneNo = document.getElementById('phonenumber').value;
    let result = ``;
    let resultVal = [];
    if (phoneNo && phoneNo.trim()) {
      const phoneNoArr = phoneNo.trim().split('');
      phoneNoArr.forEach((char) => {
        if (char.trim() && !isNaN(char)) {
          result += `${char}`;
        }
      });
      if (result.length <= 3) {
        resultVal.push(result);
      } else {
        resultVal.push(`(${result.slice(0, 3)})`);
        resultVal.push(`${result.slice(3, 6)}`);
        resultVal.push(`${result.slice(6, 10)}`);
      }
    } else {
      resultVal = [];
    }
    resultVal = resultVal.filter((val) => val.trim()).join(' - ');
    const provider = getProviderName(resultVal);
    const stateName = getStateName(resultVal);
    if (provider && provider.logoName) {
      document.getElementById('provider_img').src = `./Images/${provider.logoName}`;
      document.getElementById('provider_img').style.display = "block";
    } else {
      document.getElementById('provider_img').style.display = "none";
    }
    
    document.getElementById('state_name').innerHTML = stateName;
    document.getElementById('phonenumber').value = resultVal;
  }
  
  function getProviderName(phoneno) {
    const providerNo = Number(
      phoneno.split('-')[0].trim().replace('(', '').replace(')', '')
    );
    let providerObj = phoneProviderConfig.find(
      (item) => providerNo >= item.noStartFrom && providerNo <= item.noEndBefore
    );
    return providerObj;
  }

  function getStateName(phoneno) {
    if(phoneno) {
      const phoneArr = phoneno.split('-');
      if (phoneArr && phoneArr[1]) {
        const stateNo = Number(phoneArr[1].trim());
        let stateObj = statesCofig.find((item) => stateNo === item.stateCode);
        return stateObj && stateObj.stateName ? stateObj.stateName : '';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
  