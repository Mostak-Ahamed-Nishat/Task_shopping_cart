import React from "react";

// Function to create stars based on the rating
export const createStars = (rating) => {
  const stars = [];
  const numberOfFullStars = Math.floor(rating);
  const hasHalfStar = rating - numberOfFullStars >= 0.5;

  // Create full stars
  for (let i = 0; i < numberOfFullStars; i++) {
    stars.push(
      <svg
        key={`full-${i}`}
        aria-hidden="true"
        className="h-5 w-5 text-yellow-300"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    );
  }

  // Create half star
  if (hasHalfStar) {
    stars.push(
      <svg
        key="half"
        aria-hidden="true"
        className="h-5 w-5 text-yellow-300"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.375 7.125c.117.09.23.194.332.308l3.107 3.281-.882 5.297c-.042.25.073.502.289.676.216.174.516.227.78.136l4.08-1.695 4.078 1.695c.124.052.255.077.386.077.175 0 .349-.04.51-.118.215-.174.332-.426.29-.676l-.883-5.297 3.107-3.281c.27-.285.39-.683.332-1.067-.058-.384-.267-.726-.605-.94L11.617 2.344l-2.496-2.395c-.333-.319-.744-.502-1.176-.502-.432 0-.844.183-1.175.502L4.384 2.344 2.98 4.867c-.339.214-.548.556-.605.94-.058.384.062.782.332 1.067zm1.25.874l2.594-2.483 1.836-.605.484-1.836c.168-.63.89-1.067 1.63-1.067h5.237c.74 0 1.462.437 1.63 1.067l.483 1.836 1.836.605 2.594 2.483c.382.365.549.886.47 1.39l-.605 3.625 2.502-1.04.9-.375-1.045-6.27c-.042-.25-.215-.472-.465-.61L11.613 3.78l-4.372-1.81c-.25-.104-.517-.104-.768 0L3.47 3.094 1.127 4.98l-.605 3.625c-.08.504.088 1.025.47 1.39z"
          fill="currentColor"
        ></path>
      </svg>
    );
  }

  // Create empty stars
  const remainingEmptyStars = 5 - stars.length;

  for (let i = 0; i < remainingEmptyStars; i++) {
    stars.push(
      <svg
        key={`empty-${i}`}
        aria-hidden="true"
        className="h-5 w-5 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    );
  }

  return stars;
};
