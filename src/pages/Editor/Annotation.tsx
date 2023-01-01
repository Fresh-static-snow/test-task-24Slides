import { ActionIcon, Avatar, Box, Flex, Popover, Text } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import React, { FC, memo, useState } from 'react';
import { AnnotationItem, annotationsQuery } from '~/queries/annotations';
import Trash from '../../assets/Trash.svg';
import { EditorDimension } from './Editor';

export interface AnnotationProps {
  annotation: AnnotationItem;
  index: number;
  refetch: () => void;
}

export const Annotation: FC<AnnotationProps> = memo(({ annotation, index, refetch }) => {
  const [opened, setOpened] = useState<boolean>(false);
  const removeQuery = annotationsQuery.remove(annotation.id);
  const { mutate: remove, isLoading } = useMutation(removeQuery.key, removeQuery.fn, {
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      width={340}
      trapFocus
      position="bottom"
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <ActionIcon
          onClick={() => setOpened((o) => !o)}
          sx={() => ({
            position: 'absolute',
            left: `${annotation.pos.x * EditorDimension}px`,
            top: `${annotation.pos.y * EditorDimension}px`,
          })}
          radius="xl"
          className="bg-red-400"
          variant="filled"
        >
          {index + 1}
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown
        sx={(theme) => ({
          background: theme.white,
        })}
      >
        <Flex direction="row">
          <Avatar className="w-10 h-10 mr-2" variant="filled" color="cyan" radius="xl">
            {annotation.author
              .split(' ')
              .map((word) => word[0])
              .join('')}
          </Avatar>
          <Box className="mr-auto">
            <Text className="text-gray-600 font-bold">
              {isLoading ? 'Loading' : annotation.author}
            </Text>
            <Text className="text-black font-normal">{isLoading ? '' : annotation.comment}</Text>
          </Box>
          <ActionIcon
            onClick={() => {
              setOpened((o) => !o);
              remove(annotation.id);
              refetch();
            }}
            radius="xl"
          >
            <img src={Trash} alt="Delete" />
          </ActionIcon>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
});
