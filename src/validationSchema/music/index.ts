import * as yup from 'yup';

export const musicValidationSchema = yup.object().shape({
  title: yup.string().required(),
  artist: yup.string().required(),
  company_id: yup.string().nullable(),
});
