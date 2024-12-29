export const isClientWidthLg = (): boolean => {
  const clientWidth = window.innerWidth; // Get the client width of the viewport
  const lg = 1024; // Define the threshold for "lg" (large) screen size

  // Return false if the width is smaller than lg, otherwise return true
  return clientWidth >= lg;
};

// Example usage:
if (isClientWidthLg()) {
  console.log("The client width is large enough.");
} else {
  console.log("The client width is smaller than lg.");
}
