import {
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
  Textarea,
  ActionIcon,
  Modal,
  LoadingOverlay,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useCallback, useEffect, useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { getCroppedImg } from '../handlers/cropImage';
import { ColorDao } from '../constants/colorConstant';
import classes from './GroupSettings.module.css';
import { MdOutlineModeEdit } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useDownloadDocQuery, useGroupHomeQuery, useUploadGroupMutation } from '../handlers/networkHook';
import { RouteParams } from '../constants/coreLibrary';
import { useDisclosure } from '@mantine/hooks';
import { isStringDefined } from '../constants/utilityConstant';
import { useQueryClient } from '@tanstack/react-query';

function GroupSettings() {
  const { groupId } = useParams<RouteParams>() as RouteParams;
  const [opened, { open, close }] = useDisclosure(false);
  const groupHomeVM = useGroupHomeQuery(groupId);
  const uploadDocVM =  useUploadGroupMutation(groupId);
  const queryClient = useQueryClient();
  const downloadDocVM = useDownloadDocQuery(
    groupHomeVM.data?.groupImageId ?? '',
    isStringDefined(groupHomeVM.data?.groupImageId)
  );
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
        open()
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
      close()
      uploadDocVM.mutate(drawnImage)
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixel, imageSrc]);
  useEffect(()=>{
    if (uploadDocVM.isSuccess) {
      queryClient.invalidateQueries({queryKey:[`group/home/${groupId}`]})
    }
  },[uploadDocVM.isSuccess])
  return (
    <Container fluid>
      <LoadingOverlay
            visible={groupHomeVM.isLoading || uploadDocVM.isPending}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />
      <Modal opened={opened} onClose={close} title="Set Profile Picture">
        <Stack>
        {imageEditing
          ? imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                style={{
                  containerStyle: {
                    width: 300,
                    height: 300,
                    position: 'relative',
                    alignSelf: 'center'
                  },
                }}
              />
            )
          : null}
          <Button onClick={() => showCroppedImage()}>Save</Button>
        </Stack>
      </Modal>
      {groupHomeVM.isSuccess ? (
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
                      src={downloadDocVM.data}
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
                  <TextInput
                    w={'50%'}
                    value={groupHomeVM.data.groupName}
                    disabled={editingMode ? false : true}
                  />
                </Group>
                <Group gap={6}>
                  <Text w="20%">Description</Text>
                  <Textarea
                    w={'70%'}
                    value={groupHomeVM.data.groupDesc ?? ''}
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
                  <NumberInput
                    value={groupHomeVM.data.targetAmount}
                    disabled={editingMode ? false : true}
                  />
                </Group>
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
      ) : null}
    </Container>
  );
}
export default GroupSettings;
