import fallbackImage from "../assets/fallback-image.png";

export const getImage = (image: string): string => {
  if (
    image.includes("officialpsds") ||
    image.includes("deviantart") ||
    image.includes("picsum") ||
    image.includes("canstockphoto")
  ) {
    return image;
  } else {
    return fallbackImage;
  }
};
