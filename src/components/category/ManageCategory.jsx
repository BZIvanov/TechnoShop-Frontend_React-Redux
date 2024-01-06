import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '../../providers/store/services/categories';
import { useDispatch } from '../../providers/store/store';
import { showNotification } from '../../providers/store/features/notification/notificationSlice';
import FormProvider from '../../providers/form/FormProvider';
import { useForm } from '../../providers/form/hooks/useForm';
import TextFieldAdapter from '../../providers/form/formFields/TextFieldAdapter';
import { useIsApiRequestPending } from '../../hooks/useIsApiRequestPending';
import ConfirmDialog from '../common/dialogs/ConfirmDialog/ConfirmDialog';
import { formConfig } from './manageCategoryForm.schema';

const ManageCategory = () => {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState(null);
  // TODO rewrite the confirm dialog with createConext or redux or something like that
  const [removeCategoryDialog, setRemoveCategoryDialog] = useState({
    open: false,
    text: '',
    onConfirm: () => {},
  });
  const [filterCategoryText, setFilterCategoryText] = useState('');

  const { data } = useGetCategoriesQuery();
  const categories = data?.categories || [];

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const isLoading = useIsApiRequestPending();

  const formMethods = useForm(formConfig);
  const { formState, reset, setValue } = formMethods;

  const handleCategorySubmit = async ({ category }) => {
    let result;
    if (selectedCategory) {
      result = await updateCategory({
        id: selectedCategory._id,
        name: category,
      });
    } else {
      result = await createCategory({ name: category });
    }

    if (!('error' in result)) {
      dispatch(
        showNotification({
          type: 'success',
          message: `Category ${
            selectedCategory ? 'updated' : 'created'
          } successfully`,
        })
      );

      reset();

      setSelectedCategory(null);
    }
  };

  const handleCategoryDelete = (categoryId) => () => {
    setRemoveCategoryDialog({
      open: false,
      text: '',
      onConfirm: () => {},
    });

    deleteCategory(categoryId);

    setSelectedCategory(null);
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Manage Categories</Typography>

      <Box>
        <FormProvider onSubmit={handleCategorySubmit} methods={formMethods}>
          <Box my={1}>
            <TextFieldAdapter name='category' label='Category Name' />
          </Box>

          <Box mt={2} ml={1}>
            <Button
              variant='contained'
              color='secondary'
              type='button'
              onClick={() => {
                setSelectedCategory(null);
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
              {selectedCategory ? 'Update category' : 'Create category'}
            </Button>
          </Box>
        </FormProvider>
      </Box>

      <Divider style={{ margin: '20px 0' }} />

      <Box sx={{ marginBottom: 2 }}>
        <FormControl sx={{ width: '100%' }}>
          <TextField
            label='Search for a category'
            variant='standard'
            value={filterCategoryText}
            onChange={(e) => setFilterCategoryText(e.target.value)}
          />
        </FormControl>
      </Box>

      <Paper sx={{ display: 'flex', flexWrap: 'wrap', padding: 1 }}>
        {categories.length > 0 ? (
          categories
            .filter(({ name }) =>
              name.toLowerCase().includes(filterCategoryText.toLowerCase())
            )
            .map(({ _id, name }) => {
              return (
                <Chip
                  key={_id}
                  label={name}
                  sx={{ margin: '4px' }}
                  onClick={() => {
                    setValue('category', name);
                    setSelectedCategory({ _id, name });
                  }}
                  onDelete={() =>
                    setRemoveCategoryDialog({
                      open: true,
                      text: 'Are you sure you want to delete this category?',
                      onConfirm: handleCategoryDelete(_id),
                    })
                  }
                />
              );
            })
        ) : (
          <Typography variant='subtitle2'>
            No categories. Use the form above to create some.
          </Typography>
        )}
      </Paper>

      <ConfirmDialog
        dialogConfig={removeCategoryDialog}
        setDialogConfig={setRemoveCategoryDialog}
      />
    </Box>
  );
};

export default ManageCategory;
