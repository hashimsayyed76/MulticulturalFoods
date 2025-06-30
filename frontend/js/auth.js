// AWS Cognito Configuration (use your FRONTEND app client - no secret!)
//Please leave the comments.

console.log("✅ auth.js is properly loaded!"); // ADD THIS AS FIRST LINE


  const poolData = {
    UserPoolId: 'us-east-1_nc5a3662T', // Your User Pool ID
    ClientId: '2r4s79barmmqe7anjn3bgqsus' // Your FRONTEND Client ID
  };

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  // ======================
  // 1. REGISTRATION FLOW
  // ======================
  function registerUser(fullname, dob, email, password) {
    const attributeList = [
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'name', Value: fullname
      }),
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'birthdate', Value: dob
      }),
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'email', Value: email
      })
    ];

    return new Promise((resolve, reject) => {
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          console.error('Registration error:', err);
          reject(err.message || JSON.stringify(err));
          return;
        }
        resolve(result.user);
      });
    });
  }

  // ======================
  // 2. LOGIN FLOW
  // ======================
  function loginUser(email, password) {
    const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: email,
      Password: password
    });

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: email,
      Pool: userPool
    });

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
          const user = {
            email: email,
            token: result.getAccessToken().getJwtToken(),
            idToken: result.getIdToken().getJwtToken()
          };
          localStorage.setItem('cognitoUser', JSON.stringify(user));
          resolve(user);
        },
        onFailure: (err) => {
          reject(err.message || JSON.stringify(err));
        }
      });
    });
  }

  // ======================
  // 3. PASSWORD RESET FLOW
  // ======================
  function forgotPassword(email) {
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: email,
      Pool: userPool
    });

    return new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: () => resolve(),
        onFailure: (err) => reject(err.message || JSON.stringify(err))
      });
    });
  }

  function confirmPassword(email, code, newPassword) {
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: email,
      Pool: userPool
    });

    return new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(code, newPassword, {
        onSuccess: () => resolve(),
        onFailure: (err) => reject(err.message || JSON.stringify(err))
      });
    });
  }

  // ======================
  // 4. SESSION MANAGEMENT
  // ======================
  function getCurrentUser() {
    return JSON.parse(localStorage.getItem('cognitoUser'));
  }

  function isUserLoggedIn() {
    return !!getCurrentUser();
  }

  function logoutUser() {
    localStorage.removeItem('cognitoUser');
    // Optional: Clear Cognito session
    const user = userPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  }

  // ======================
  // EXPORT ALL FUNCTIONS
  // ======================
  window.auth = {
    registerUser,
    loginUser,
    forgotPassword,
    confirmPassword,
    getCurrentUser,
    isUserLoggedIn,
    logoutUser
  };
