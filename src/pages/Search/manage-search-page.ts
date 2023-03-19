<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useFilterJobsQuery } from '../../app/services/job-api';
import { CheckBoxEntity, ManageSearchPageType, UpdateFilterType } from '../../types/jobTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useDispatch } from 'react-redux';
import { setList, toggleCheck } from '../../features/filterSlice';
=======
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useFilterJobMutation } from "../../app/services/job-api";
import {
  CheckBoxEntity,
  ManageSearchPageType,
  ResponseData,
  UpdateFilterType,
} from "../../types/jobTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useDispatch } from "react-redux";
import {
  setList,
  toggleCheck,
  toggleFirstFetch,
} from "../../features/filterSlice";
>>>>>>> main

export function useManageSearchPage(): ManageSearchPageType {
  const { logout } = useAuth0();
  const dispatch = useDispatch();
<<<<<<< HEAD
  const filterState = useSelector((state: RootState) => state.filter.mainFilter);
  const [queryStr, setQueryStr] = useState<any>({ category: ["Bookmarked", "Applied", "Interviewing", "Interviewed", "Job Offer", "Position Filled"], skills: [] });
  const { data, isLoading } = useFilterJobsQuery(queryStr);
=======
  const filterState = useSelector(
    (state: RootState) => state.filter.mainFilter
  );
  const [filterJob] = useFilterJobMutation();
  const [request, setRequest] = useState(false);

  const prefetchData = async () => {
    const res: ResponseData = await filterJob({
      category: [
        "Bookmarked",
        "Applied",
        "Interviewing",
        "Interviewed",
        "Job Offer",
        "Position Filled",
      ],
      skills: [],
    });
    if (res.data) {
      dispatch(setList(res.data));
    }
  };
>>>>>>> main

  useEffect(() => {
    if (data) {
      dispatch(setList(data));
    }
  }, [data]);

  const updateCategoryFilter = (item: UpdateFilterType) => async () => {
    dispatch(toggleCheck(item));

    if (item.auto) {
      const newCategory = queryStr["category"].filter((val: string) => val !== item.name);
      const newSkills = queryStr["skills"].filter((val: string) => val !== item.name);

      setQueryStr((prev: any) => ({
        ...prev,
        category: newCategory,
        skills: newSkills
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

<<<<<<< HEAD
    setQueryStr({ category: newCategory, skills: languagesAndFramework });
=======
    const res: ResponseData = await filterJob({
      category: newCategory,
      skills: languagesAndFramework,
    });

    if (res.data) {
      dispatch(toggleFirstFetch(false));
      dispatch(setList(res.data));
    }
>>>>>>> main
  };

  return {
    updateCategoryFilter,
    logout,
<<<<<<< HEAD
    sentFilterRequest
=======
    sentFilterRequest,
    prefetchData,
>>>>>>> main
  };
}
