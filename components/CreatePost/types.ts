export type CreatePostStackParamList = {
  SelectPhotos: undefined; // No parameters for this route
  PostCreation: { selectedImages: string[] }; // Route expects an array of selected images
};
