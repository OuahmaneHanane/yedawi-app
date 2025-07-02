export const getUserProfile = async (req, res) => {
  try {
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};