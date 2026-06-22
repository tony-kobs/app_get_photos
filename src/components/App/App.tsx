import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { getPhotos } from "../../services/photos";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import toast from "react-hot-toast";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import Modal from "../Modal/Modal";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const handleSubmit = async (value: string) => {
    try {
      setPhotos([]);
      setIsLoading(true);
      const result = await getPhotos(value);
      if (result.length === 0) {
        toast.error("No photos found for your request!");
        return;
      }
      setPhotos(result);
    } catch {
      toast.error("Something went wrong. Try again...");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSubmit} />
          {photos.length !== 0 && (
            <PhotosGallery photos={photos} onSelect={openModal} />
          )}
          {isLoading && <Loader />}
          {isError && <Text>"Oops try again"</Text>}
          {isModalOpen && selectedPhoto && (
            <Modal onClose={closeModal}>
              <div
                style={{
                  backgroundColor: selectedPhoto.avg_color,
                  borderColor: selectedPhoto.avg_color,
                }}
              >
                <img src={selectedPhoto.src.original} alt={selectedPhoto.alt} />
              </div>
            </Modal>
          )}
        </Container>
      </Section>
    </>
  );
}
