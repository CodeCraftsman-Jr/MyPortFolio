import { useState, useEffect } from "react";

// Import profile photos - using dynamic imports for better compatibility
const profileImagePaths = [
  "/src/assets/profile-photo-1.JPG",
  "/src/assets/profile-photo-2.jpg",
  "/src/assets/profile-photo-3.jpg",
  "/src/assets/profile-photo-4.jpg",
  "/src/assets/profile-photo-5.JPG",
  "/src/assets/profile-photo-6.jpg"
];

interface ProfileSlideshowProps {
  className?: string;
  alt?: string;
}

export const ProfileSlideshow = ({ className = "", alt = "Profile" }: ProfileSlideshowProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Using actual profile photos from assets folder
  const profileImages = profileImagePaths;

  useEffect(() => {
    // Preload all images
    const preloadImages = async () => {
      const imagePromises = profileImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        setIsLoaded(true); // Still show the component even if some images fail
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % profileImages.length
      );
    }, 3000); // 3 seconds interval

    return () => clearInterval(interval);
  }, [isLoaded, profileImages.length]);

  if (!isLoaded) {
    // Loading placeholder
    return (
      <div className={`${className} bg-secondary/20 animate-pulse rounded-3xl flex items-center justify-center`}>
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {profileImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`${alt} ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
      
      {/* Slideshow indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {profileImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-white shadow-lg scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
