const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} = require("../config/firebase");

const auth = getAuth();

class FirebaseAuthController {
  registerUser(req, res) {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(422).json({
        error: true,
        message: "Email, password, and name are required",
      });
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        sendEmailVerification(user)
          .then(() => {
            res.status(201).json({
              error: false,
              message: "User Created",
            });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({
              error: true,
              message: "Error sending email verification",
            });
          });
      })
      .catch((error) => {
        console.error(error);
        const errorMessage =
          error.message || "An error occurred while registering user";
        res.status(500).json({
          error: true,
          message: errorMessage,
        });
      });
  }

  loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        error: true,
        message: "Email and password are required",
      });
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const idToken = userCredential._tokenResponse.idToken;
        const userId = userCredential.user.uid;
        const name = userCredential.user.displayName || "DermAI User"; // assuming displayName is set, otherwise default to "Unknown User"

        if (idToken) {
          res.status(200).json({
            error: false,
            message: "success",
            loginResult: {
              userId: userId,
              name: name,
              token: idToken,
            },
          });
        } else {
          res.status(500).json({
            error: true,
            message: "Internal Server Error",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        const errorMessage =
          error.message || "An error occurred while logging in";
        res.status(500).json({
          error: true,
          message: errorMessage,
        });
      });
  }

  logoutUser(req, res) {
    signOut(auth)
      .then(() => {
        res.status(200).json({
          error: false,
          message: "User logged out successfully",
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          error: true,
          message: "Internal Server Error",
        });
      });
  }

  resetPassword(req, res) {
    const { email } = req.body;
    if (!email) {
      return res.status(422).json({
        error: true,
        message: "Email is required",
      });
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        res.status(200).json({
          error: false,
          message: "Password reset email sent successfully!",
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          error: true,
          message: "Internal Server Error",
        });
      });
  }
}

module.exports = new FirebaseAuthController();
