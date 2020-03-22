<template>
  <div class="container">
    <van-divider>镜心学校出入统计</van-divider>
    <div class="content">
      {{ qrcode.content }}
    </div>
    <template v-for="item in fields" >
      <van-field
        :key="item.id"
        v-if="item.dataType === 'input'"
        v-model="submitData[item.key]"
        :label="item.name"
        :required="!item.nullable"
        v-bind="item.extra"
        label-width="130"
      />

      <van-field
        v-if="item.dataType === 'calendar'"
        :key="'calendar-field' + item.id"
        :value="submitData[item.key] | formatDate"
        :label="item.name"
        :required="!item.nullable"
        v-bind="item.extra"
        label-width="130"
        name="calendar"
        readonly
        clickable
        @click="() => showCalendar = true"
      />
      <van-calendar
        v-if="item.dataType === 'calendar'" 
        :key="'calendar-calendar' + item.id"
        v-model="showCalendar"
        color="#07c160"
        @confirm="selectDate($event, item.key)"
      />
      
      <van-field
        v-if="item.dataType === 'radio'"
        :key="'radio-field' + item.id"
        :value="item | formatRadioText(submitData[item.key])"
        :label="item.name"
        :required="!item.nullable"
        v-bind="item.extra"
        label-width="130"
        name="radio"
        readonly
        clickable
        @click="() => showRadioPop = true"
      />
      <van-popup v-if="item.dataType === 'radio'" :key="'radio-radio' + item.id" v-model="showRadioPop" round>
        <van-radio-group v-model="submitData[item.key]">
          <van-radio
            class="radio"
            checked-color="#07c160"
            v-for="option in item.extra.options"
            :key="option.name"
            :name="option.value"
            @click="selectRadio(option.value, item.key)">
            {{ option.name }}
          </van-radio>
        </van-radio-group>
      </van-popup>

      <van-field
        v-if="item.dataType === 'checkbox'"
        :key="'checkbox-field' + item.id"
        :value="item | formatCheckboxText(submitData[item.key])"
        :label="item.name"
        :required="!item.nullable"
        v-bind="item.extra"
        label-width="130"
        name="radio"
        readonly
        clickable
        @click="showCheckboxPop = true"
      />
      <van-popup
        v-if="item.dataType === 'checkbox'"
        :key="'checkbox-checkbox' + item.id"
        v-model="showCheckboxPop"
        round>
        <van-checkbox-group :value="submitData[item.key]" @input="$e => submitData[item.key]=$e">
          <van-checkbox
            class="checkbox"
            checked-color="#07c160"
            v-for="option in item.extra.options"
            :key="option.name"
            :name="option.value">
            {{ option.name }}
          </van-checkbox>
        </van-checkbox-group>
        <van-button type="default" class="btn" @click="showCheckboxPop = false">确认</van-button>
      </van-popup> 

    </template>

    <van-button type="primary" @click="submit" class="submit-btn">提交</van-button>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'home',
  components: {
  },
  data() {
    return {
      qrcode: {
        id: '',
        name: '镜心学校', // 学校名称
        content: ''
      },
      fields: [
        {
          id: 3,
          key: 'real_name',
          name: '',
          content: '',
          dataType: 'input',
          nullable: false,
          extra: {
            placeholder: ''
          }
        }
      ],
      submitData: {},

      showCalendar: false,
      showRadioPop: false,
      showCheckboxPop: false
    };
  },
  filters: {
    formatDate(date) {
      if (!date) return;
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    },
    formatRadioText(item, value) {
      const selectOption = item.extra.options.find(it => it.value === value);
      return selectOption && selectOption.name;
    },
    formatCheckboxText(item, value) {
      return value.map(selectedValue => {
        return item.extra.options.find(it => it.value === selectedValue).name;
      }).join(',');
    }
  },  
  methods: {
    async getFields() {
      axios.get(`/api/user/fields?token=${this.$route.query.token}`)
        .then(resData => {
          this.qrcode = resData.qrcode;
          this.fields = resData.fields;
          resData.fields.forEach(it => {
            this.$set(this.submitData, it.key, it.dataType === 'checkbox' ? [] : '');
          });
        })
        .catch(err => {
          this.$toast.fail(err.message);
        });
    },
    selectDate(date, key) {
      this.submitData[key] = date;
      this.showCalendar = false;
    },

    selectRadio(value, key) {
      this.submitData[key] = value;
      this.showRadioPop = false;
    },

    submit() {
      axios.put(`/api/user/submit?token=${this.$route.query.token}`, this.submitData)
        .then(() => {
          this.$toast.success('提交成功，感谢您的配合');
        })
        .catch(err => {
          this.$toast.fail(err.message);
        });
    }
  },
  created() {
    this.getFields();
  },
};
</script>

<style scoped>
  .content {
    font-size: 12px;
    color: #333;
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
    margin-bottom: 20px;
    line-height: 16px;
  }
  .radio, .checkbox {
    height: 50px;
    padding: 0 20px;
    width: 250px;
  }
  .btn {
    border: none;
    height: 50px;
    width: 100%;
  }
  .submit-btn {
    width: 250px;
    margin: 40px 0 40px -125px;
    position: absolute;
    left: 50%;
    bottom: 0;
  }
</style>