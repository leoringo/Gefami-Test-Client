import type React from "react";
import type { IGetHistoryResponse } from "../../api/historyService/responseModel";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { executeGetHistories, selectHistoryState } from "./historySlice";

import moment from "moment";
import TextStyle from "../../components/TextStyle";
import ReusableTable from "../../components/CustomTable";

const History: React.FC = () => {
  const dispatch = useAppDispatch();
  const { historyList } = useAppSelector(selectHistoryState);
  const rowsPerPage = 10;

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
      render: (_: IGetHistoryResponse, index: number) => (
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
      label: "Activities",
      cellStyle: {
        maxWidth: 350,
      },
      render: (row: IGetHistoryResponse) => (
        <TextStyle
          variant="body1"
          sx={{
            maxWidth: "350px",
            whiteSpace: "normal",
            wordBreak: "break-word",
          }}
        >
          {row.title} - {row.description}
        </TextStyle>
      ),
    },
    {
      key: "id",
      label: "Date",
      render: (row: IGetHistoryResponse) => (
        <TextStyle
          variant="body1"
          sx={{ minWidth: "100px", maxWidth: "100px" }}
        >
          {row.timestamp
            ? moment(row?.timestamp).format("DD-MM-YYYY HH:mm")
            : "-"}
        </TextStyle>
      ),
    },
  ];

  const [page, setPage] = useState<number>(0);

  // !! -- functions --
  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const getSlicedData = () => {
    return historyList.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  };

  useEffect(() => {
    dispatch(executeGetHistories(null));
  }, []);

  return (
    <ReusableTable
      columns={columns}
      data={getSlicedData()}
      total={historyList.length}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handlePageChange}
      rowsPerPageOptions={[10]}
    />
  );
};

export default History;
