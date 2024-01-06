import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

import { useGetCategoriesQuery } from '../../../providers/store/services/categories';
import {
  useGetSubcategoriesQuery,
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
} from '../../../providers/store/services/subcategories';
import { useDispatch } from '../../../providers/store/store';
import { showNotification } from '../../../providers/store/features/notification/notificationSlice';
import FormProvider from '../../../providers/form/FormProvider';
import { useForm } from '../../../providers/form/hooks/useForm';
import TextFieldAdapter from '../../../providers/form/formFields/TextFieldAdapter';
import SelectDropdownAdapter from '../../../providers/form/formFields/SelectDropdownAdapter';
import ConfirmDialog from '../../common/dialogs/ConfirmDialog/ConfirmDialog';
import { formConfig } from './form-schema';
import { useIsApiRequestPending } from '../../../hooks/useIsApiRequestPending';

const ManageSubcategory = () => {
  const dispatch = useDispatch();

  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [removeSubcategoryDialog, setRemoveSubcategoryDialog] = useState({
    open: false,
    text: '',
    onConfirm: () => {},
  });
  const [filterSubcategoryText, setFilterSubcategoryText] = useState('');

  const { data } = useGetCategoriesQuery();
  const categories = data?.categories || [];
  const { data: subcategories = [] } = useGetSubcategoriesQuery();
  const [createSubcategory] = useCreateSubcategoryMutation();
  const [updateSubcategory] = useUpdateSubcategoryMutation();
  const [deleteSubcategory] = useDeleteSubcategoryMutation();

  const isLoading = useIsApiRequestPending();

  const formMethods = useForm(formConfig);
  const { formState, reset, setValue } = formMethods;

  const handleSubcategorySubmit = async ({ categoryId, subcategoryName }) => {
    let result;
    if (selectedSubcategory) {
      result = await updateSubcategory({
        id: selectedSubcategory._id,
        name: subcategoryName,
        categoryId,
      });
    } else {
      result = await createSubcategory({ name: subcategoryName, categoryId });
    }

    if (!('error' in result)) {
      dispatch(
        showNotification({
          type: 'success',
          message: `Subcategory ${
            selectedSubcategory ? 'updated' : 'created'
          } successfully`,
        })
      );

      reset();

      setSelectedSubcategory(null);
    }
  };

  const handleSubcategoryDelete = (subcategoryId) => () => {
    setRemoveSubcategoryDialog({
      open: false,
      text: '',
      onConfirm: () => {},
    });

    deleteSubcategory(subcategoryId);

    setSelectedSubcategory(null);
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Manage Subcategories</Typography>

      <Box>
        <FormProvider onSubmit={handleSubcategorySubmit} methods={formMethods}>
          <Box my={1}>
            <SelectDropdownAdapter
              name='categoryId'
              label='Category'
              options={categories}
            />
          </Box>

          <Box my={1}>
            <TextFieldAdapter name='subcategoryName' label='Subcategory name' />
          </Box>

          <Box mt={2} ml={1}>
            <Button
              variant='contained'
              color='secondary'
              type='button'
              onClick={() => {
                setSelectedSubcategory(null);
                reset();
              }}
              disabled={formState.isSubmitting || isLoading}
            >
              Reset form
            </Button>
            <Button
              sx={{ marginLeft: '5px' }}
              variant='contained'
              type='submit'
              disabled={formState.isSubmitting || isLoading}
            >
              {selectedSubcategory
                ? 'Update subcategory'
                : 'Create subcategory'}
            </Button>
          </Box>
        </FormProvider>
      </Box>

      <Divider style={{ margin: '20px 0' }} />

      <Box sx={{ marginBottom: 2 }}>
        <FormControl sx={{ width: '100%' }}>
          <TextField
            label='Search'
            variant='standard'
            value={filterSubcategoryText}
            onChange={(e) => setFilterSubcategoryText(e.target.value)}
          />
        </FormControl>
      </Box>

      <Paper sx={{ display: 'flex', flexWrap: 'wrap', padding: 1 }}>
        {subcategories.length ? (
          subcategories
            .filter(({ name }) =>
              name.toLowerCase().includes(filterSubcategoryText.toLowerCase())
            )
            .map(({ _id, name, categoryId }) => {
              return (
                <Chip
                  key={_id}
                  label={name}
                  sx={{ margin: '4px' }}
                  onClick={() => {
                    setValue('categoryId', categoryId._id);
                    setValue('subcategoryName', name);
                    setSelectedSubcategory({ _id, name, categoryId });
                  }}
                  onDelete={() =>
                    setRemoveSubcategoryDialog({
                      open: true,
                      text: 'Are you sure you want to delete this subcategory?',
                      onConfirm: handleSubcategoryDelete(_id),
                    })
                  }
                />
              );
            })
        ) : (
          <Typography variant='subtitle2'>
            No subcategories. Use the form above to create some.
          </Typography>
        )}
      </Paper>

      <ConfirmDialog
        dialogConfig={removeSubcategoryDialog}
        setDialogConfig={setRemoveSubcategoryDialog}
      />
    </Box>
  );
};

export default ManageSubcategory;
