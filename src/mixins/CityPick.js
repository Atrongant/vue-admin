import { reactive, toRefs } from "@vue/composition-api";
import { cityPick } from "@/api/common";
export function CityPick() {
  const data = reactive({
    provinceValue: "",
    provinceData: [],
    cityValue: "",
    cityData: [],
    areaValue: "",
    areaData: [],
    streetValue: "",
    streetData: [],
  });
  const resultData = reactive({
    provinceValue: "",
    cityValue: "",
    areaValue: "",
    streetValue: "",
  });
  const getCity = () => {
    cityPick({ type: "city", province_code: data.provinceValue })
      .then((response) => {
        data.cityData = response.data.data;
      })
      .catch((err) => {});
  };
  const getArea = () => {
    cityPick({ type: "area", city_code: data.cityValue })
      .then((response) => {
        data.areaData = response.data.data;
      })
      .catch((err) => {});
  };
  const getSteet = () => {
    cityPick({ type: "street", area_code: data.areaValue })
      .then((response) => {
        data.streetData = response.data.data;
      })
      .catch((err) => {});
  };
  const getProvince = () => {
    cityPick({ type: "province" })
      .then((response) => {
        data.provinceData = response.data.data;
      })
      .catch((err) => {});
  };
  const handleProvince = () => {
    data.cityValue = "";
    data.areaValue = "";
    data.streetValue = "";
    getCity();
    getResultData();
  };
  const handleCity = () => {
    data.areaValue = "";
    data.streetValue = "";
    getArea();
    getResultData();
  };
  const handleArea = () => {
    data.streetValue = "";
    getSteet();
    getResultData();
  };
  const handleStreet = () => {
    console.log("cityPick.js->64:\t");
    getResultData();
  };
  const getResultData = () => {
    for (let key in resultData) {
      resultData[key] = data[key];
    }
  };
  return {
    // ...toRefs(resultData),
    resultData,
    data,
    resultData,
    getProvince,
    handleProvince,
    handleCity,
    handleArea,
    handleStreet,
  };
}
