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
  Grid,
  GridCol,
  Text,
  Box,
  Title,
  Avatar,
  Textarea,
  ActionIcon,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import React, { useCallback, useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { getCroppedImg } from '../handlers/cropImage';
import { ColorDao } from '../constants/colorConstant';
import classes from './GroupSettings.module.css';
import { MdOutlineModeEdit } from 'react-icons/md';

function GroupSettings() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [croppedAreaPixel, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [editingMode, setEditingMode] = useState<boolean>(false);
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
    <Grid>
      <GridCol span={8}>
        <Container>
          <Title order={3} id="basicDetails">
            Basic details
          </Title>
          <Stack>
            <Group gap={6}>
              <Stack w="20%" gap={1}>
                <Text>Group Avatar</Text>
                <Text c="dimmed" size="xs">
                  File format JPEG, PNG Max size upto 2MB
                </Text>
              </Stack>
              <Box style={{ width: 80, height: 80, position: 'relative' }}>
                <Image
                  style={{ width: 80, height: 80, display: 'block', borderRadius: 40 }}
                  src="https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JvdXB8ZW58MHx8MHx8fDA%3D"
                />
                <FileButton accept="image/png,image/jpeg" onChange={onDrop}>
                  {(props) => (
                    <ActionIcon
                    {...props}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: 25,
                        height: 25,
                        borderRadius: 15,
                        backgroundColor: ColorDao.onTextColor,
                      }}
                    >
                      <MdOutlineModeEdit color={ColorDao.bedazzledBlue} />
                    </ActionIcon>
                  )}
                </FileButton>
              </Box>
            </Group>
            <Group gap={6}>
              <Text w="20%">Title</Text>
              <TextInput w={'50%'} value={'Manali Group'} disabled={editingMode ? false : true} />
            </Group>
            <Group gap={6}>
              <Text w="20%">Description</Text>
              <Textarea
                w={'70%'}
                value={'Going to Manali Trip'}
                disabled={editingMode ? false : true}
                autosize
                maxRows={2}
              />
            </Group>
            <Group gap={6}>
              <Text w="20%">Created On</Text>
              <DateInput value={new Date()} disabled={editingMode ? false : true} />
            </Group>
            <Group gap={6}>
              <Text w="20%">Target Date</Text>
              <DateInput value={new Date()} disabled={editingMode ? false : true} />
            </Group>
            <Group gap={6}>
              <Text w="20%">Target Amount</Text>
              <NumberInput value={'2000'} disabled={editingMode ? false : true} />
            </Group>
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
            ) : null}
          </Stack>
        </Container>
      </GridCol>
      <GridCol span={4}>
        <Stack>
          <Group justify="space-between">
            <Text>Edit Group details ?</Text>
            <Group>
              <Button
                variant="outline"
                color={ColorDao.goldColor}
                onClick={() => setEditingMode(true)}
              >
                Edit
              </Button>
              <Button onClick={() => setEditingMode(false)}>Save changes</Button>
            </Group>
          </Group>
          <Box className={classes.pointerBox}>
            <Box className={classes.arrow} />
            <Center className={classes.pointerText}>
              <Text>Basic details</Text>
            </Center>
          </Box>
          <Box className={classes.pointerBox}>
            <Box className={classes.arrow} />
            <Center className={classes.pointerText}>
              <Text>Privacy levels</Text>
            </Center>
          </Box>
          <Box className={classes.pointerBox}>
            <Box className={classes.arrow} />
            <Center className={classes.pointerText}>
              <Text>Notification settings</Text>
            </Center>
          </Box>
        </Stack>
      </GridCol>
    </Grid>
  );
}
export default GroupSettings;
