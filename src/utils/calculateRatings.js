export const calculateAverageRating = (product) => {
  let totalRating = 0;
  if (product.reviews.length === 0) {
    return 0;
  }
  // Sum up all the ratings
  product.reviews.forEach((review) => {
    totalRating += review.rating;
  });

  // Calculate the average rating
  const averageRating = totalRating / product.reviews.length;
  //ToFix
  return averageRating.toFixed(2);
};
