exports.getMyProfile = async (req, res) => {
    try {
      const { fullName, email, username } = req.user;
      
      res.status(200).json({
        success: true,
        data: {
          fullName,
          email,
          username
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  };