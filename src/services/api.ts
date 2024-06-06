import axios from 'axios';

const API_URL = 'http://54.73.73.228:4369/api/images';

interface ImageItem {
  title: string;
  description?: string;
  image: string;
  index: number;
}

export const fetchImages = async (): Promise<Record<string, ImageItem>> => {
  try {
    const response = await axios.get<unknown>(API_URL);
    const data = response.data;

    if (isRecordOfImageItem(data)) {
      return data;
    } else {
      throw new Error('Invalid data format');
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.error || 'Unknown error occurred');
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

const isRecordOfImageItem = (data: unknown): data is Record<string, ImageItem> => {
  if (typeof data !== 'object' || data === null) return false;

  return Object.values(data).every(
    (item) =>
      typeof item === 'object' &&
      item !== null &&
      typeof item.title === 'string' &&
      (typeof item.description === 'undefined' || typeof item.description === 'string') &&
      typeof item.image === 'string' &&
      typeof item.index === 'number'
  );
};
