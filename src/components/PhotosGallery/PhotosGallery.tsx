import type { Photo } from "../../types/photo";
import Grid from "../Grid/Grid";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";

interface PhotoGalleryProps {
  photos: Photo[];
  onSelect: (photo: Photo) => void;
}

export default function PhotosGallery({ photos, onSelect }: PhotoGalleryProps) {
  return (
    <Grid>
      {photos.map((item) => (
        <PhotosGalleryItem key={item.id} photo={item} onSelect={onSelect} />
      ))}
    </Grid>
  );
}
