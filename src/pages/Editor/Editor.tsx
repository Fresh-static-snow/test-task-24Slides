import { Popover, TextInput, ActionIcon, Box, Text, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { FC, PropsWithChildren, memo, useCallback, useRef, useState } from 'react';
import Arrow from '~/assets/Arrow.svg';
import Pic from '~/assets/pic.png';
import Rect from '~/assets/Rectangle.svg';
import Rect2 from '~/assets/Rectangle2.svg';
import { AnnotationItem, annotationsQuery } from '~/queries/annotations';
import { Annotation } from './Annotation';

const Background: FC<PropsWithChildren> = ({ children }) => (
  <Box style={{ background: '#1E1E1E', minHeight: 'calc(100vh - 48px)' }}>
    <Box className="mx-auto" style={{ width: 1000 }}>
      {children}
    </Box>
  </Box>
);

export const Editor: React.FC = memo(() => {
  const [boxClicked, setBoxClicked] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);
  const { current: pos } = useRef<AnnotationItem['pos']>({
    x: 0,
    y: 0,
  });
  const parentRef = useRef<HTMLDivElement | null>(null);
  const circlePixels = 15;
  const form = useForm({
    initialValues: {
      message: '',
    },
  });
  const [, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(Pic);
  const [imageName, setImageName] = useState<string>('forest');
  const [isValid, setIsValid] = useState<boolean>(true);
  const UUID = crypto.randomUUID();
  const getQuery = annotationsQuery.get();
  const { data: annotations, refetch } = useQuery(getQuery.key, getQuery.fn);
  const addQuery = annotationsQuery.add(UUID);
  const { mutate: add } = useMutation(addQuery.key, addQuery.fn, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
      setImageName(file.name);
      setIsValid(file.type === 'image/png' || file.type === 'image/jpeg');
    }
  };

  const handleBoxClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (parentRef.current && e.target === e.currentTarget) {
        const parentRect = parentRef.current && parentRef.current.getBoundingClientRect();
        const x =
          Math.min(Math.max(e.clientX - parentRect.left, 0), parentRect.width) - circlePixels;
        const y =
          Math.min(Math.max(e.clientY - parentRect.top, 0), parentRect.height) - circlePixels;
        pos.x = x;
        pos.y = y;
        setOpened(true);
        setBoxClicked((o) => !o);
      }
    },
    [pos],
  );

  const handleAdd = useCallback(() => {
    setOpened((o) => !o);
    setBoxClicked((o) => !o);
    add({
      id: UUID,
      author: 'Billy Herrington',
      comment: form.values.message,
      pos: { x: pos.x / 576, y: pos.y / 576 },
    });
    form.reset();
  }, [UUID, add, form, pos.x, pos.y]);

  const handleEnterKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleAdd();
      }
    },
    [handleAdd],
  );
  return (
    <Background>
      <Flex className="mx-auto py-8" justify="space-between" align="center">
        <Text className="text-2xl" color="white">
          {isValid && imageName ? imageName : 'File is not valid'}
        </Text>
        <label
          htmlFor="file"
          className="w-40 h-10 text-base flex justify-center items-center rounded bg-rose-200 cursor-pointer"
        >
          <input
            id="file"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className="hidden"
          />
          Upload Image
        </label>
      </Flex>
      <Box className="mx-auto" style={{ height: 576, background: '#2A2A2A' }}>
        <Box
          id="parent"
          ref={parentRef}
          style={{
            width: 576,
            height: 576,
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '576px 576px',
          }}
          className="mx-auto relative"
          onClick={(e) => handleBoxClick(e)}
        >
          {annotations &&
            annotations.map((annotation, index) => (
              <Annotation
                key={annotation.id}
                index={index}
                annotation={annotation}
                refetch={refetch}
              />
            ))}
          {boxClicked && (
            <Box
              style={{
                position: 'absolute',
                left: `${pos.x}px`,
                top: `${pos.y}px`,
              }}
            >
              <Popover
                opened={opened}
                onChange={setOpened}
                width={364}
                trapFocus
                position="bottom"
                withArrow
                shadow="md"
              >
                <Popover.Target>
                  <ActionIcon
                    radius="xl"
                    className="bg-red-400"
                    variant="filled"
                    onClick={() => setOpened((o) => !o)}
                  >
                    {annotations && annotations.length + 1}
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown
                  sx={(theme) => ({
                    background: theme.white,
                  })}
                >
                  <form onSubmit={handleAdd}>
                    <TextInput
                      placeholder="Leave a comment"
                      size="md"
                      onKeyUp={(e) => handleEnterKey(e)}
                      rightSection={
                        <ActionIcon type="submit">
                          <img src={Arrow} alt="send message" />
                        </ActionIcon>
                      }
                      {...form.getInputProps('message')}
                    />
                  </form>
                </Popover.Dropdown>
              </Popover>
            </Box>
          )}
        </Box>
      </Box>
      <Text className="mt-4" color="gray">
        To leave a comment, mouseover <img className="inline" src={Rect} /> on an image and click
        the left mouse button <img className="inline" src={Rect2} />
      </Text>
    </Background>
  );
});
