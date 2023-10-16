/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';

export interface Hotel {
  title: string;
  largeCategory: string;
  mediumCategory: string;
  smallCategory: string;
  mapX: number;
  mapY: number;
  areaCode: number;
  sigunguCode: number;
  mapLevel: number;
  address: string;
  detailAddress: string;
  contentId: number;
  contentTypeId: number;
  copyrightType: string;
  image: string;
  thumbnailImage: string;
  createdTime: string;
  modifiedTime: string;
  bookTour: boolean;
  tel: string;
}

interface AttractionDetails {
  [key: string]: string | boolean;
  accomodationCount: string;
  benikia: boolean;
  checkInTime: string;
  checkOutTime: string;
  cookingInfo: string;
  foodPlace: string;
  goodStay: boolean;
  hanok: boolean;
  infoCenter: string;
  parking: string;
  pickup: string;
  roomCount: string;
  reservation: string;
  reservationUrl: string;
  roomType: string;
  scale: string;
  subFacility: string;
  barbecue: boolean;
  beautyFacility: boolean;
  beverage: boolean;
  bicycleRent: boolean;
  campfire: boolean;
  fitness: boolean;
  karaoke: boolean;
  publicBath: boolean;
  publicPC: boolean;
  sauna: boolean;
  seminar: boolean;
  sports: boolean;
  refundPolicy: string;
}

export const filterHotels = async (
  data: Hotel[],
  selectedFilters: { [key: string]: string[] },
) => {
  const result: Hotel[] = [];

  for (const hotel of data) {
    let detail: AttractionDetails;

    try {
      const response = await axios({
        url: `http://api.route-master.org/attraction/detail/stay?contentId=${hotel.contentId}`,
      });

      if (response && response.data && response.data.detail) {
        detail = response.data.detail;
        console.log(detail);
      } else {
        throw new Error('Error when loading detail');
      }
    } catch (error) {
      console.error(error);
      continue; // Skip this hotel if there was an error
    }

    if (
      (detail?.fitness && selectedFilters['부가시설'].includes('헬스장')) ||
      (detail?.barbecue && selectedFilters['부가시설'].includes('취사가능'))
    ) {
      result.push(hotel);
    }
  }

  console.log(result);

  return result;
};
