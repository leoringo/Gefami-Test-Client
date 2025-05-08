import type React from "react";
import type { IGetJsonDataResponse } from "../../api/listJsonService/responseModel";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  addJsonData,
  closePopUpSuccessDelete,
  deleteJsonData,
  getAllJsonData,
  selectListJsonDataState,
} from "./listJsonSlice";
import { PageContainer } from "./style";

import ReusableTable from "../../components/CustomTable";
import TextStyle from "../../components/TextStyle";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import PopupDialog from "../../components/Popup";
import CustomButton from "../../components/CustomButton";
import type { IAddJsonRequest } from "../../api/listJsonService/requestModel";
import AddForm from "./__components/addForm";

const ListJson: React.FC = () => {
  const { listJsonData, message, isDeleteSuccess } = useAppSelector(
    selectListJsonDataState
  );
  const dispatch = useAppDispatch();
  const rowsPerPage = 10;

  // !! -- useStates --
  const [page, setPage] = useState<number>(0);
  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    id: number | null;
  }>({
    open: false,
    id: null,
  });
  const [addPopUp, setAddPopUp] = useState<{
    open: boolean;
    payload: IAddJsonRequest;
  }>({
    open: false,
    payload: { body: "", title: "" },
  });
  const [errorsAdd, setErrorsAdd] = useState<IAddJsonRequest>({
    body: "",
    title: "",
  });

  const columns = [
    {
      key: "id",
      label: "No.",
      cellStyle: {
        width: 60,
        maxWidth: 60,
        minWidth: 60,
        textAlign: "center" as const,
      },
      render: (_: IGetJsonDataResponse, index: number) => (
        <TextStyle
          sx={{
            minWidth: "40px",
            maxWidth: "40px",
            textAlign: "center",
          }}
          variant="body1"
        >
          {page * rowsPerPage + index + 1}
        </TextStyle>
      ),
    },
    {
      key: "id",
      label: "Title",
      cellStyle: {
        maxWidth: 150,
      },
      render: (row: IGetJsonDataResponse) => (
        <TextStyle
          sx={{
            maxWidth: "150px",
            whiteSpace: "normal",
            wordBreak: "break-word",
          }}
          variant="body1"
        >
          {row.title}
        </TextStyle>
      ),
    },
    {
      key: "id",
      label: "Description",
      cellStyle: {
        maxWidth: 350,
      },
      render: (row: IGetJsonDataResponse) => (
        <TextStyle
          sx={{
            maxWidth: "350px",
            whiteSpace: "normal",
            wordBreak: "break-word",
          }}
          variant="body1"
        >
          {row.body}
        </TextStyle>
      ),
    },
    {
      key: "actions",
      label: "",
      cellStyle: {
        width: 40,
        textAlign: "center" as const,
      },
      render: (row: IGetJsonDataResponse) => (
        <IconButton
          onClick={() => setConfirmDelete({ open: true, id: row.id })}
          size="small"
          sx={{ color: "error.main" }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  // !! -- functions --

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const getSlicedData = () => {
    console.log(listJsonData, `<< BEFORE DELETED KEY`);
    const excludedUserIdList = listJsonData.map(({ userId, ...rest }) => ({
      ...rest,
    }));
    console.log(excludedUserIdList, `<<< AFTER DELETED KEY`);
    return listJsonData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  };

  const handleDelete = () => {
    dispatch(deleteJsonData({ id: Number(confirmDelete.id) }));
    setConfirmDelete({ open: false, id: null });
  };

  const handleAddInputChange = (
    field: keyof IAddJsonRequest,
    value: string
  ) => {
    setAddPopUp((prev) => ({
      ...prev,
      payload: {
        ...prev.payload,
        [field]: value,
      },
    }));
  };

  const validateAdd = () => {
    const newErrors: IAddJsonRequest = { body: "", title: "" };

    if (!addPopUp.payload.body) {
      newErrors.body = "Body Required!";
    }

    if (!addPopUp.payload.title) {
      newErrors.title = "Title Required!";
    }

    setErrorsAdd(newErrors);

    return !newErrors.body && !newErrors.title;
  };

  const handleOkButton = () => {
    if (validateAdd()) {
      const { payload } = addPopUp;
      setAddPopUp((prevValue) => ({
        ...prevValue,
        open: false,
      }));
      dispatch(addJsonData(payload));
    }
  };

  const handleCancelAdd = () => {
    setAddPopUp({ open: false, payload: { body: "", title: "" } });
  };

  useEffect(() => {
    dispatch(getAllJsonData(null));
  }, []);

  return (
    <PageContainer>
      <CustomButton
        variant="contained"
        sx={{ alignSelf: "end", marginRight: "50px" }}
        onClick={() =>
          setAddPopUp({ open: true, payload: { body: "", title: "" } })
        }
      >
        + Add
      </CustomButton>
      <ReusableTable
        columns={columns}
        data={getSlicedData()}
        total={listJsonData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        rowsPerPageOptions={[10]}
      />
      <PopupDialog
        open={confirmDelete.open}
        type="action"
        title="Wait!"
        description="Are you sure want to delete the data?"
        onClose={() => setConfirmDelete({ open: false, id: null })}
        onConfirm={handleDelete}
      />
      <PopupDialog
        open={isDeleteSuccess}
        type="success"
        title="Success!"
        description={message}
        onClose={() => dispatch(closePopUpSuccessDelete())}
      />
      <PopupDialog
        open={addPopUp.open}
        type="action"
        title="Add Data"
        description={
          <AddForm
            value={addPopUp.payload}
            errors={errorsAdd}
            onChange={handleAddInputChange}
          />
        }
        onClose={handleCancelAdd}
        onConfirm={handleOkButton}
      />
    </PageContainer>
  );
};

export default ListJson;
