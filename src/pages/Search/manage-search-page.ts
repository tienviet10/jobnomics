import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useFilterJobMutation } from '../../app/services/job-api';
import { Category, CategoryType, CheckBoxEntity, Filter, Job, ManageSearchPageType, ResponseData, UpdateFilterType } from '../../types/jobTypes';

export function useManageSearchPage(): ManageSearchPageType {
  const { logout } = useAuth0();
  const [filterJob] = useFilterJobMutation();
  const [filter, setFilter] = useState<Filter>({
    category: [{ name: "Applied", check: false }, { name: "Bookmarked", check: false }, { name: "Interviewing", check: false }, { name: "Interviewed", check: false }, { name: "Job Offer", check: false }, { name: "Position Filled", check: false }],
    languages: [{ name: "javascript", check: false }, { name: "ruby", check: false }],
    framework: [{ name: "express", check: false }, { name: "node", check: false }, { name: "react", check: false }, { name: "rails", check: false }]
  });
  const [listOfCategories, setListOfCategories] = useState<CategoryType | {}>({
    Bookmarked: {},
    Applied: {},
    Interviewing: {},
    Interviewed: {},
    "Job Offer": {},
    "Position Filled": {}
  });
  const [state, setState] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const prefetchData = async () => {
    const res: ResponseData = await filterJob({
      userId: 1,
      category: ["Bookmarked", "Applied", "Interviewing", "Interviewed", "Job Offer", "Position Filled"],
      languages: []
    });
    if (res.data) {
      setListOfCategories(res.data);
    }
  };

  let listCal: Job[] = Object.values(listOfCategories).reduce((acc: Job[], cate: Category) => acc.concat(cate.jobs), []);
  if (searchKeyword !== "") {
    listCal = listCal.filter((job: Job) => (job.company + job.title + job.updatedAt).toLowerCase().includes(searchKeyword.toLowerCase()));
  }

  useEffect(() => {
    prefetchData();
  }, []);

  const updateCategoryFilter = (item: UpdateFilterType) => async () => {
    setFilter((prev: Filter) => {
      const res: Filter = { ...prev, [item.cate]: prev[item.cate].map((obj: CheckBoxEntity) => (obj.name === item.name ? { ...obj, check: !obj.check } : obj)) };
      if (item.auto) {
        sentFilterRequest(res);
      }
      return res;
    });
  };

  const sentFilterRequest = async (currentState: Filter) => {
    const newCategory = currentState.category.filter((obj: CheckBoxEntity) => obj.check).map((obj: CheckBoxEntity) => obj.name);
    const languagesAndFramework = currentState.languages.concat(currentState.framework).filter((obj: CheckBoxEntity) => obj.check).map((obj: CheckBoxEntity) => obj.name);

    setState(false);
    const res: ResponseData = await filterJob({
      userId: 1,
      category: newCategory,
      languages: languagesAndFramework
    });
    if (res.data) {
      setListOfCategories(res.data);
    }
  };

  return {
    filter,
    updateCategoryFilter,
    state,
    setState,
    sentFilterRequest,
    setSearchKeyword,
    listCal,
    logout
  };
}