import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useFilterJobMutation } from '../../app/services/job-api';
import { CheckBoxEntity, ManageSearchPageType, ResponseData, UpdateFilterType } from '../../types/jobTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useDispatch } from 'react-redux';
import { setList, toggleCheck, toggleFirstFetch } from '../../features/filterSlice';

export function useManageSearchPage(): ManageSearchPageType {
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const filterState = useSelector((state: RootState) => state.filter.mainFilter);
  const [filterJob] = useFilterJobMutation();
  const [request, setRequest] = useState(false);

  const prefetchData = async () => {
    const res: ResponseData = await filterJob({
      userId: 1,
      category: ["Bookmarked", "Applied", "Interviewing", "Interviewed", "Job Offer", "Position Filled"],
      skills: []
    });
    if (res.data) {
      dispatch(setList(res.data));
    }
  };

  useEffect(() => {
    prefetchData();
  }, []);

  useEffect(() => {
    if (request) {
      sentFilterRequest();
      setRequest(false);
    }
  }, [filterState]);

  const updateCategoryFilter = (item: UpdateFilterType) => async () => {
    dispatch(toggleCheck(item));
    if (item.auto) {
      setRequest(true);
    }
  };

  const sentFilterRequest = async () => {
    const newCategory = filterState.category.filter((obj: CheckBoxEntity) => obj.check).map((obj: CheckBoxEntity) => obj.name);
    const languagesAndFramework = filterState.skills.concat(filterState.framework).filter((obj: CheckBoxEntity) => obj.check).map((obj: CheckBoxEntity) => obj.name);

    const res: ResponseData = await filterJob({
      userId: 1,
      category: newCategory,
      skills: languagesAndFramework
    });
    console.log(res);
    if (res.data) {
      dispatch(toggleFirstFetch(false));
      dispatch(setList(res.data));
    }
  };


  return {
    updateCategoryFilter,
    logout,
    sentFilterRequest,
    prefetchData
  };
}