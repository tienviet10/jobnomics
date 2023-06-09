import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useFilterJobsQuery, useRecoverJobMutation } from "../../app/services/job-api";
import {
  CheckBoxEntity,
  Job,
  ManageSearchPageType,
  MenuStateType,
  UpdateFilterType,
  UserRequest,
} from "../../types/jobTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useDispatch } from "react-redux";
import { setColumnFilterJob, setFilterSelectedJob, setList, toggleCheck } from "../../features/filterSlice";


export function useManageSearchPage(): ManageSearchPageType {
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.filter);
  const filterState = state.mainFilter;
  const columnFilterState = state.columnFilter;

  const jobsList = state.displayArrayJobs;
  const selectedJob = state.selectedJob;

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState<string>("name");
  const [menuStates, setMenuStates] = useState<MenuStateType>({});

  const [recoverJob] = useRecoverJobMutation();
  // If you want to make multiple GET request with different params, you can useState to get new information and store in the same cache name (like 'aJob')
  const [queryStr, setQueryStr] = useState<UserRequest>({
    category: [
      "Bookmarked",
      "Applied",
      "Interviewing",
      "Interviewed",
      "Job Offer",
      "Job Unavailable",
    ],
    skills: [],
    columnFilter: ["createdAt", "desc"],
    status: []
  });
  const { data, refetch } = useFilterJobsQuery(queryStr);

  useEffect(() => {
    sentFilterRequest();
  }, [columnFilterState, filterState]);

  useEffect(() => {
    if (data) {
      refetch();
      dispatch(setList(data));
    }
  }, [data]);


  const updateCategoryFilter = (item: UpdateFilterType) => async () => {
    dispatch(toggleCheck(item));

    if (item.auto) {
      const newCategory = queryStr["category"].filter(
        (val: string) => val !== item.name
      );
      const newSkills = queryStr["skills"].filter(
        (val: string) => val !== item.name
      );
      const newStatus = queryStr["status"].filter(
        (val: string) => val !== item.name
      );

      setQueryStr((prev: UserRequest) => ({
        ...prev,
        category: newCategory,
        skills: newSkills,
        status: newStatus
      }));
    }
  };

  const sentFilterRequest = async () => {
    const newCategory = filterState.category
      .filter((obj: CheckBoxEntity) => obj.check)
      .map((obj: CheckBoxEntity) => obj.name);
    const languagesAndFramework = filterState.languages
      .concat(filterState.framework)
      .filter((obj: CheckBoxEntity) => obj.check)
      .map((obj: CheckBoxEntity) => obj.name);
    const statusArr = filterState.status.filter((state) => state.check).map((state) => state.name);
    setQueryStr({
      category: newCategory,
      skills: languagesAndFramework,
      columnFilter: columnFilterState,
      status: statusArr
    });
  };


  const handleDelete = (job: Job) => {
    handleMenuClose(job);
    setOpenDeleteModal(true);
  };

  const handleRecover = (job: Job) => {
    recoverJob({ jobId: job.id });
    handleMenuClose(job);
  };

  const handleMenuOpen = (
    job: Job,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setMenuStates((prev) => {
      dispatch(setFilterSelectedJob(job));
      return {
        ...prev,
        [job.id]: {
          anchorEl: event.currentTarget,
          open: true,
        },
      };
    });
  };

  const handleMenuClose = (job: Job) => {
    setMenuStates((prev) => ({
      ...prev,
      [job.id]: {
        anchorEl: null,
        open: false,
      },
    }));
  };

  const handleRequestSort = (property: string) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
    dispatch(setColumnFilterJob([property, isAscending ? "desc" : "asc"]));
  };

  return {
    updateCategoryFilter,
    logout,
    sentFilterRequest,
    valueToOrderBy,
    orderDirection,
    handleRequestSort,
    jobsList,
    menuStates,
    handleMenuOpen,
    handleMenuClose,
    handleDelete,
    handleRecover,
    openDeleteModal,
    setOpenDeleteModal,
    selectedJob,
    refetch
  };
}
