import axios from 'axios';

export type AnnotationItem = {
  id: string;
  author: string;
  comment: string;
  pos: {
    x: number;
    y: number;
  };
};

export const annotationsQuery = {
  get: () => ({
    key: ['annotationsQuery'],
    fn: async () => {
      const { data } = await axios.get<AnnotationItem[]>(`http://localhost:3000/annotations`);
      return data;
    },
  }),
  add: (keyId: AnnotationItem['id']) => ({
    key: ['annotationsQuery', keyId],
    fn: async (annotation: AnnotationItem) => {
      const { data } = await axios.post<AnnotationItem>(
        `http://localhost:3000/annotations`,
        annotation,
      );
      return data;
    },
  }),
  remove: (keyId: AnnotationItem['id']) => ({
    key: ['annotationsQuery', keyId],
    fn: async (id: string) => {
      const { data } = await axios.delete(`http://localhost:3000/annotations/${id}`);
      return data;
    },
  }),
};
