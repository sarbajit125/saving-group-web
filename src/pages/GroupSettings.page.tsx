import {
  Card,
  CardSection,
  Center,
  Container,
  Image,
  Group,
  TextInput,
  FileButton,
  Button,
  Stack,
  NumberInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import React, { useCallback, useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { getCroppedImg } from '../handlers/cropImage';

function GroupSettings() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [croppedAreaPixel, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [imageEditing, setImageEditing] = useState<boolean>(false);
  const onDrop = useCallback((acceptedFiles: File | null) => {
    if (acceptedFiles != null) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setImageEditing(true);
      };
      reader.readAsDataURL(acceptedFiles);
    }
  }, []);
  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const showCroppedImage = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixel) {
      return;
    }
    try {
      const drawnImage = await getCroppedImg(imageSrc, croppedAreaPixel);
      setCroppedImage(drawnImage);
      console.log(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixel, imageSrc]);
  return (
    <Container fluid>
      <Center>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <CardSection>
            {imageEditing ? (
              imageSrc && (
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                />
              )
            ) : (
              <Image
                src="https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JvdXB8ZW58MHx8MHx8fDA%3D"
                height={160}
                alt="Norway"
              />
            )}
          </CardSection>
          {imageEditing ? (
            <Button onClick={showCroppedImage}>Save</Button>
          ) : (
            <Stack pl="md" pr="md">
              <Group justify="space-between" mt="md" mb="xs">
                <TextInput label="Group name" />
                <FileButton onChange={onDrop} accept="image/png,image/jpeg">
                  {(props) => <Button {...props}>Change profile picture</Button>}
                </FileButton>
              </Group>
              <TextInput label="Group description" />
              <Group>
                <DateInput label="Target date" placeholder="Target date" />
                <NumberInput label="Target Amount" placeholder="Target Amount" />
              </Group>
            </Stack>
          )}
        </Card>
      </Center>
    </Container>
  );
}
export default GroupSettings;
