import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useFilterJobsQuery } from "../../app/services/job-api";
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
    if (data) {
      dispatch(setList(data));
    }
  }, [data]);

  useEffect(() => {
    sentFilterRequest();
  }, [columnFilterState]);

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
    openDeleteModal,
    setOpenDeleteModal,
    selectedJob,
    refetch
  };
}
