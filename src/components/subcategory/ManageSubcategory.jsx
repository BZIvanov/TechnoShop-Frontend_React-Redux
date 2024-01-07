import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

import { useGetCategoriesQuery } from '../../providers/store/services/categories';
import {
  useGetGroupedSubcategoriesQuery,
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
} from '../../providers/store/services/subcategories';
import { useDispatch } from '../../providers/store/store';
import { showNotification } from '../../providers/store/features/notification/notificationSlice';
import FormProvider from '../../providers/form/FormProvider';
import { useForm } from '../../providers/form/hooks/useForm';
import TextFieldAdapter from '../../providers/form/formFields/TextFieldAdapter';
import SelectDropdownAdapter from '../../providers/form/formFields/SelectDropdownAdapter';
import { useConfirmDialog } from '../../contexts/useConfirmDialogContext';
import { useIsApiRequestPending } from '../../hooks/useIsApiRequestPending';
import { formConfig } from './manageSubcategoryForm.schema';

const ManageSubcategory = () => {
  const dispatch = useDispatch();

  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [filterCategoryText, setFilterCategoryText] = useState('');
  const [filterSubcategoryText, setFilterSubcategoryText] = useState('');

  const { openDialog, closeDialog } = useConfirmDialog();

  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.categories || [];
  const { data: groupedSubcategoriesData } = useGetGroupedSubcategoriesQuery();
  const groupedSubcategories = groupedSubcategoriesData?.subcategories || [];

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
    closeDialog();

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

      <Box
        sx={{
          marginBottom: 2,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <FormControl sx={{ flexGrow: 1 }}>
          <TextField
            label='Search for category'
            variant='standard'
            value={filterCategoryText}
            onChange={(e) => setFilterCategoryText(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ flexGrow: 1 }}>
          <TextField
            label='Search for subcategory'
            variant='standard'
            value={filterSubcategoryText}
            onChange={(e) => setFilterSubcategoryText(e.target.value)}
          />
        </FormControl>
      </Box>

      <Divider style={{ margin: '20px 0' }} />

      <Box>
        <Typography variant='h5'>Subcategories List</Typography>

        {groupedSubcategories.length > 0 ? (
          groupedSubcategories
            .filter(({ categoryName }) =>
              categoryName
                .toLowerCase()
                .includes(filterCategoryText.toLowerCase())
            )
            .map((categoryGroup) => {
              const {
                _id: groupCategoryId,
                categoryName,
                subcategories,
              } = categoryGroup;

              return (
                <Paper key={groupCategoryId} sx={{ margin: 0.5, padding: 1 }}>
                  <Typography variant='body1'>{categoryName}</Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', padding: 1 }}>
                    {subcategories
                      .filter(({ name }) =>
                        name
                          .toLowerCase()
                          .includes(filterSubcategoryText.toLowerCase())
                      )
                      .map(({ _id: subcategoryId, name, categoryId }) => {
                        return (
                          <Chip
                            key={subcategoryId}
                            label={name}
                            sx={{ margin: '4px' }}
                            onClick={() => {
                              setValue('categoryId', groupCategoryId);
                              setValue('subcategoryName', name);
                              setSelectedSubcategory({
                                _id: subcategoryId,
                                name,
                                categoryId,
                              });
                            }}
                            onDelete={() =>
                              openDialog({
                                text: 'Are you sure you want to delete this subcategory?',
                                onConfirm:
                                  handleSubcategoryDelete(subcategoryId),
                              })
                            }
                          />
                        );
                      })}
                  </Box>
                </Paper>
              );
            })
        ) : (
          <Typography variant='subtitle2'>
            No subcategories. Use the form above to create some.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ManageSubcategory;
