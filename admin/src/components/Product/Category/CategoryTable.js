import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Typography,
  Button,
  Collapse,
  Box,
  useTheme
} from '@material-ui/core';
import {
  EditTwoTone as EditIcon,
  DeleteTwoTone as DeleteIcon,
  KeyboardArrowDownTwoTone as DownIcon,
  KeyboardArrowUpTwoTone as UpIcon
} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeleteCategory, clearMsg } from 'src/features/product/category/categorySlice';
import DeleteAlertDialog from 'src/components/CustomDialog';
import { MESSAGES, PRODUCT_CATEGORY_LEVEL, CRUD_ACTIONS } from 'src/configs/constants';
import displayToast from 'src/utils/quickDisplayToast';

export default function ProductCategoryTable({ categories, openEditDialog }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  // global state
  const fetchDeleteCategoryMsg = useSelector((state) => state.categorySlice.fetchDeleteCategoryMsg);
  const isFetchingDeleteCategory = useSelector(
    (state) => state.categorySlice.isFetchingDeleteCategory
  );

  // local state
  const msgName = `fetchDeleteCategoryMsg`;
  const [focusCategory, setFocusCategory] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteButton = (categoryId, level) => {
    setFocusCategory({ categoryId, level });
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialog = () => {
    dispatch(fetchDeleteCategory(focusCategory));
    setOpenDeleteDialog(false);
  };

  const handleCreateButton = (level, parentId) => {
    openEditDialog({ level, parentId }, CRUD_ACTIONS.create);
  };

  useEffect(() => {
    !isFetchingDeleteCategory &&
      !!fetchDeleteCategoryMsg &&
      displayToast(fetchDeleteCategoryMsg, MESSAGES.DELETE_SUCCESS, null, () =>
        dispatch(clearMsg(msgName))
      );
  }, [dispatch, fetchDeleteCategoryMsg, isFetchingDeleteCategory, msgName]);

  const CategoryLevel1Row = ({ categoryLevel1, index, indexLevel1 }) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TableRow>
          <TableCell sx={{ maxWidth: 15 }}>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <UpIcon /> : <DownIcon />}
            </IconButton>
          </TableCell>
          <TableCell sx={{ maxWidth: 15, color: theme.palette.secondary.main }}>{`${index + 1}-${
            indexLevel1 + 1
          }`}</TableCell>
          <TableCell sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>
            {categoryLevel1.name}
          </TableCell>
          <TableCell align="center" sx={{ maxWidth: 15 }}>
            <Tooltip title="Chỉnh sửa danh mục">
              <IconButton
                onClick={() =>
                  openEditDialog(
                    { ...categoryLevel1, level: PRODUCT_CATEGORY_LEVEL.LEVEL_1 },
                    CRUD_ACTIONS.update
                  )
                }
              >
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa danh mục">
              <IconButton
                onClick={() =>
                  handleDeleteButton(categoryLevel1.id, PRODUCT_CATEGORY_LEVEL.LEVEL_1)
                }
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell>Tên</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Thêm danh mục">
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() =>
                              handleCreateButton(PRODUCT_CATEGORY_LEVEL.LEVEL_2, categoryLevel1.id)
                            }
                          >
                            Thêm
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categoryLevel1.category_level_2?.length > 0 &&
                      categoryLevel1.category_level_2.map((categoryLevel2, indexLevel2) => (
                        <TableRow key={indexLevel2}>
                          <TableCell>{`${index + 1}-${indexLevel1 + 1}-${
                            indexLevel2 + 1
                          }`}</TableCell>
                          <TableCell sx={{ color: theme.palette.secondary.main, fontWeight: 400 }}>
                            {categoryLevel2.name}
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Chỉnh sửa danh mục">
                              <IconButton
                                onClick={() =>
                                  openEditDialog(
                                    { ...categoryLevel2, level: PRODUCT_CATEGORY_LEVEL.LEVEL_2 },
                                    CRUD_ACTIONS.update
                                  )
                                }
                              >
                                <EditIcon color="primary" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa danh mục">
                              <IconButton
                                onClick={() =>
                                  handleDeleteButton(
                                    categoryLevel2.id,
                                    PRODUCT_CATEGORY_LEVEL.LEVEL_2
                                  )
                                }
                              >
                                <DeleteIcon color="error" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <>
      <DeleteAlertDialog
        needOpen={openDeleteDialog}
        title="Xóa danh mục"
        content="Bạn có chắc muốn xóa danh mục này không?"
        button1={{ title: 'Hủy', action: () => setOpenDeleteDialog(false) }}
        button2={{ title: 'Có', action: handleDeleteDialog }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ maxWidth: 15 }} align="center">
                STT
              </TableCell>
              <TableCell>Tên</TableCell>
              <TableCell align="center" sx={{ maxWidth: 30 }}>
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!categories &&
              categories.map((category, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell
                      align="center"
                      sx={{ maxWidth: 15, fontWeight: 'bold', color: theme.palette.primary.main }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <Typography
                        marginY={3}
                        variant="h4"
                        sx={{ color: theme.palette.primary.main }}
                      >
                        {category.name}
                      </Typography>
                      <TableContainer component={Paper}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ maxWidth: 15 }}></TableCell>
                              <TableCell sx={{ maxWidth: 15 }}>STT</TableCell>
                              <TableCell>Tên</TableCell>
                              <TableCell align="center" sx={{ maxWidth: 15 }}>
                                <Tooltip title="Thêm danh mục">
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() =>
                                      handleCreateButton(
                                        PRODUCT_CATEGORY_LEVEL.LEVEL_1,
                                        category.id
                                      )
                                    }
                                  >
                                    Thêm
                                  </Button>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {category?.category_level_1?.length > 0 &&
                              category.category_level_1.map((categoryLevel1, indexLevel1) => (
                                <CategoryLevel1Row
                                  key={indexLevel1}
                                  categoryLevel1={categoryLevel1}
                                  index={index}
                                  indexLevel1={indexLevel1}
                                />
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </TableCell>
                    <TableCell align="center" sx={{ maxWidth: 30 }}>
                      <Tooltip title="Chỉnh sửa danh mục">
                        <IconButton
                          onClick={() =>
                            openEditDialog(
                              { ...category, level: PRODUCT_CATEGORY_LEVEL.LEVEL_0 },
                              CRUD_ACTIONS.update
                            )
                          }
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa danh mục">
                        <IconButton
                          onClick={() =>
                            handleDeleteButton(category.id, PRODUCT_CATEGORY_LEVEL.LEVEL_0)
                          }
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
