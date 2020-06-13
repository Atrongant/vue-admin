<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class="{'current':item.current}" @click="toggleMenu(item)" v-for="item in menuTab" :key="item.id">{{item.txt}}</li>
      </ul>
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="login-form" size="medium">

        <el-form-item prop="username" class="item-form">
          <label for="">邮箱</label>
          <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label for="">密码</label>
          <el-input type="password" v-model="ruleForm2.password" auto-complete="off" maxlength="20" minlength="6"></el-input>
        </el-form-item>
        
        <el-form-item prop="password2" class="item-form" v-if="menuTab[1].current">
          <label for="">重复密码</label>
          <el-input type="password" v-model="ruleForm2.password2" auto-complete="off" maxlength="20" minlength="6"></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label for="">验证码</label>
          <el-row :gutter="10">
            <el-col :span="15"><el-input v-model.number="ruleForm2.code" maxlength="6" minlength="6"></el-input></el-col>
            <el-col :span="9"><el-button type="success" class="block">获取验证码</el-button></el-col>
          </el-row>
          
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm2')" class="login-btn block">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {stripscript} from "@/utils/validate"
export default {
  name: "index",
  data() {
    var checkCode = (rule, value, callback) => {
      // this.ruleForm2.code=stripscript(value);
      // value=this.ruleForm2.code;
      let reg = /^[a-zA-Z0-9]{6}$/;
        if (!value) {
          return callback(new Error('请输入验证码'));
        }else if(!reg.test(value)){
          return callback(new Error('验证码格式有误'));
        }else {
          callback();
        }
        
      };
      var validateUsername = (rule, value, callback) => {
        const reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if (value === '') {
          callback(new Error('请输入用户名'));
        }else if(!reg.test(value)){
          callback(new Error('用户名格式有误'));
        } else {
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        console.log(stripscript(value));
        this.ruleForm2.password=stripscript(value);
        value=this.ruleForm2.password;
        console.log(value);
        let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!reg.test(value)) {
          callback(new Error('密码长度在6~20之间包含字母、数字'));
        } else {
          callback();
        }
      };
      var validatePassword2 = (rule, value, callback) => {
        console.log(stripscript(value));
        this.ruleForm2.password2=stripscript(value);
        value=this.ruleForm2.password2;
        console.log(value);
        let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value!=this.ruleForm2.password) {
          callback(new Error('重复密码不正确'));
        } else {
          callback();
        }
      };
    return {
      ruleForm2: {
          username: '',
          password: '',
          code: '',
          password2:''
        },
        rules2: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          password2: [
            { validator: validatePassword2, trigger: 'blur' }
          ],
          code: [
            { validator: checkCode, trigger: 'blur' }
          ]
        },
      menuTab:[
        {txt:"登录",current:true,type:'login'},
        {txt:"注册",current:false,type:'register'}
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 用数据驱动视图
    toggleMenu(data){
      this.menuTab.forEach(element => {
        element.current=false;
      });
      data.current=true;
      // console.log(data);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  font-size: 0;
  li {
    display: inline-block;
    width: 88px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }
  .current{
    background-color: rgba(0,0,0,.1);
  }
}
.login-form{
  margin-top: 29px;
  label{
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-form{
    margin-bottom: 13px;
  }
  .block{
    display: block;
    width: 100%;
  }
  .login-btn{
    margin-top: 19px;
  }
}
</style>
