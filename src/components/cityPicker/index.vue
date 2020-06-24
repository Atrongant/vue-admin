<template>
  <div class="overflow-h">
    <el-row :gutter="5">
      <el-col :span="6" v-if="init.province">
        <el-select placeholder="请选择" v-model="data.provinceValue" @change="handleProvince">
          <el-option
            :value="item.PROVINCE_CODE"
            v-for="item in data.provinceData"
            :key="item.PROVINCE_ID"
            :label="item.PROVINCE_NAME"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="init.city">
        <el-select placeholder="请选择" v-model="data.cityValue" @change="handleCity">
          <el-option
            :value="item.CITY_CODE"
            v-for="item in data.cityData"
            :key="item.CITY_ID"
            :label="item.CITY_NAME"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="init.area">
        <el-select placeholder="请选择" v-model="data.areaValue" @change="handleArea">
          <el-option
            :value="item.AREA_CODE"
            v-for="item in data.areaData"
            :key="item.AREA_ID"
            :label="item.AREA_NAME"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="init.street">
        <el-select placeholder="请选择" v-model="data.streetValue" @change="handleStreet">
          <el-option
            :value="item.STREET_CODE"
            v-for="item in data.streetData"
            :key="item.STREET_ID"
            :label="item.STREET_NAME"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  watchEffect,
  onMounted,
  watch,
  onBeforeMount
} from "@vue/composition-api";
import { CityPick } from "@/mixins/CityPick";
export default {
  name: "index",
  props: {
    cityPickData: {
      type: Object,
      default: () => {}
    },
    cityPickLevel: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { root, emit }) {
    const {
      data,
      resultData,
      getProvince,
      handleProvince,
      handleCity,
      handleArea,
      handleStreet
    } = CityPick();
    const init = reactive({
      province: false,
      city: false,
      area: false,
      street: false
    });
    const initCityPicker = () => {
      let initData = props.cityPickLevel;
      if (initData.length == 0) {
        for (let key in init) {
          init[key] = true;
        }
      } else {
        initData.forEach(item => {
          init[item] = true;
        });
      }
    };
    onBeforeMount(() => {
      initCityPicker();
      getProvince(); //获取省份
    });
    watch(
      [
        () => {
          resultData.provinceValue;
        },
        () => {
          resultData.cityValue;
        },
        () => {
          resultData.areaValue;
        },
        () => {
          resultData.streetValue;
        }
      ],
      ([province, city, area, street]) => {
        console.log("index.vue->97:\t", resultData);
        emit("update:cityPickData", resultData);
      }
    );
    return {
      data,
      init,
      resultData,
      handleProvince,
      handleCity,
      handleArea,
      handleProvince,
      handleStreet
    };
  }
};
</script>

<style scoped lang="less">
</style>
