// @desc    Upload an image file
// @route   POST /api/upload
// @access  Private/Admin
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('Please select an image file to upload');
    }

    // Relative path served statically via express.static('uploads')
    const relativePath = `/uploads/${req.file.filename}`;
    const fullUrl = `${req.protocol}://${req.get('host')}${relativePath}`;

    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: relativePath,
      fullUrl,
      filename: req.file.filename,
    });
  } catch (error) {
    next(error);
  }
};
