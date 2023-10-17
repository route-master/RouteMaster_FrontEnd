import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const NumOfRows = 10;
const baseURL = 'http://api.route-master.org';

interface Region {
  Region_Code: number;
  Region_Name: string;
}

// Create an array of regions
const regions: Region[] = [
  { Region_Code: 1, Region_Name: '서울' },
  { Region_Code: 2, Region_Name: '인천' },
  { Region_Code: 3, Region_Name: '대전' },
  { Region_Code: 4, Region_Name: '대구' },
  { Region_Code: 5, Region_Name: '광주' },
  { Region_Code: 6, Region_Name: '부산' },
  { Region_Code: 7, Region_Name: '울산' },
  { Region_Code: 8, Region_Name: '세종특별자치시' },
  { Region_Code: 31, Region_Name: '경기도' },
  { Region_Code: 32, Region_Name: '강원도' },
  { Region_Code: 33, Region_Name: '충청북도' },
  { Region_Code: 34, Region_Name: '충청남도' },
  { Region_Code: 35, Region_Name: '경상북도' },
  { Region_Code: 36, Region_Name: '경상남도' },
  { Region_Code: 37, Region_Name: '전라북도' },
  { Region_Code: 38, Region_Name: '전라남도' },
  { Region_Code: 39, Region_Name: '제주도' },
];

// Function to search for a region code by its name
function getRegionCodeByName(name: string): number | null {
  const region = regions.find((region) => region.Region_Name === name);
  return region ? region.Region_Code : null;
}

export const fetchAttractionsByType = createAsyncThunk(
  '/attractions/fetchByType',
  async (arg: {
    type: string;
    page: number;
    keyword?: string;
    contentTypeId?: number;
  }) => {
    let requestURL;
    if (arg.type === 'stay') {
      requestURL = `${baseURL}/attraction/search/${arg.type}?numOfRows=${NumOfRows}&pageNo=${arg.page}&arrange=A&areaCode=1&sigunguCode=1`;
    } else if (arg.type === 'event') {
      requestURL = `${baseURL}/attraction/search/${arg.type}?numOfRows=${NumOfRows}&pageNo=${arg.page}&arrange=A&eventStartDate=20230701&areaCode=1&sigunguCode=1`;
    } else if (arg.type === 'keyword') {
      requestURL = `/attraction/search/keyword-based?numOfRows=${NumOfRows}&pageNo=${
        arg.page
      }&arrange=A&contentTypeId=${arg.contentTypeId}&keyword=${
        arg.keyword
      }&areaCode=${getRegionCodeByName(arg.keyword!) || 1}&sigunguCode=1`;
    } else {
      requestURL = `${baseURL}/attraction/search/${arg.type}/keyword-based?numOfRows=${NumOfRows}&pageNo=${arg.page}&keyword=%EC%84%9C%EC%9A%B8`;
    }

    const response = await axios.get(requestURL, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response) {
      throw new Error('Network response was not ok');
    }
    return response.data.attractions;
  },
);
