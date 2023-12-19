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
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '../../../providers/store/services/categories';
import { useSelector } from '../../../providers/store/store';
import FormProvider from '../../../providers/form/FormProvider';
import { useForm } from '../../../providers/form/hooks/useForm';
import TextFieldAdapter from '../../../providers/form/form-fields/TextFieldAdapter/TextFieldAdapter';
import ConfirmDialog from '../../common/dialogs/ConfirmDialog/ConfirmDialog';
import { formConfig } from './form-schema';

const ManageCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  // TODO rewrite the confirm dialog with createConext or redux or something like that
  const [removeCategoryDialog, setRemoveCategoryDialog] = useState({
    open: false,
    text: '',
    onConfirm: () => {},
  });
  const [filterCategoryText, setFilterCategoryText] = useState('');

  const { data: categories = [] } = useGetAllCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const isLoading = useSelector((state) => {
    const isSomeQueryPending = Object.values(state.api.queries).some(
      (query) => query.status === 'pending'
    );
    const isSomeMutationPending = Object.values(state.api.mutations).some(
      (mutation) => mutation.status === 'pending'
    );
    return isSomeQueryPending || isSomeMutationPending;
  });

  const formMethods = useForm(formConfig);
  const { formState, reset, setValue } = formMethods;

  const handleCategorySubmit = ({ category }) => {
    if (selectedCategory) {
      updateCategory({ id: selectedCategory._id, name: category });
    } else {
      createCategory({ name: category });
    }

    reset();

    setSelectedCategory(null);
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
              disabled={formState.submitting || isLoading}
            >
              Reset form
            </Button>
            <Button
              sx={{ marginLeft: '5px' }}
              variant='contained'
              type='submit'
              disabled={formState.submitting || isLoading}
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
        {categories.length ? (
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
