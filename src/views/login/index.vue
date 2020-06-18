<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{ current: item.current }"
          @click="toggleMenu(item)"
          v-for="item in menuTab"
          :key="item.id"
        >{{ item.txt }}</li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-form">
          <label for="username">邮箱</label>
          <el-input type="text" id="username" v-model="ruleForm.username" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label for="password">密码</label>
          <el-input
            id="password"
            type="password"
            v-model="ruleForm.password"
            auto-complete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password2" class="item-form" v-if="model==='register'">
          <label for>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password2"
            auto-complete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label for>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model="ruleForm.code" maxlength="6" minlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                @click="getSms()"
                :disabled="codeBtnStatus.state"
              >{{codeBtnStatus.txt}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('loginForm')"
            class="login-btn block"
            v-bind:disabled="loginBtnState"
          >{{model==='login'?"登录":"注册"}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from "js-sha1";
import { GetSms, Register, Login } from "@/api/login";
import { reactive, onMounted, ref } from "@vue/composition-api";
import {
  stripscript,
  checkUserName,
  checkPwd,
  checkCode
} from "@/utils/validate";
export default {
  name: "index",
  setup(props, { refs, root }) {
    let validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入验证码"));
      } else if (!checkCode(value)) {
        return callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!checkUserName(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };
    let validatePassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!checkPwd(value)) {
        callback(new Error("密码长度在6~20之间包含字母、数字"));
      } else {
        callback();
      }
    };
    let validatePassword2 = (rule, value, callback) => {
      ruleForm.password2 = stripscript(value);
      value = ruleForm.password2;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    const codeBtnStatus = reactive({
      state: false,
      txt: "获取验证码"
    });
    const model = ref("login");
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);
    const loginBtnState = ref(true);
    const ruleForm = reactive({
      username: "402635876@qq.com",
      password: "112233aa",
      code: "",
      password2: ""
    });
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      password2: [{ validator: validatePassword2, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });
    onMounted(() => {});
    // 用数据驱动视图
    const toggleMenu = data => {
      menuTab.forEach(element => {
        element.current = false;
      });
      data.current = true;
      model.value = data.type;
      clearCountDown();
      resetFormData();
    };
    const resetFormData = () => {
      /* 重置表单 */
      refs.loginForm.resetFields();
    };
    /* 更新按钮状态 */
    const updateCodeBtnState = function(params) {
      codeBtnStatus.state = params.flag;
      codeBtnStatus.txt = params.txt;
    };
    /* 获取验证码 */
    // eslint-disable-next-line no-unused-vars
    const getSms = function() {
      // 进行提示
      if (ruleForm.username === "") {
        root.$message.error("邮箱不能为空");
        return false;
      }
      if (!checkUserName(ruleForm.username)) {
        root.$message.error("用户名格式有误，请重新输入");
        return false;
      }
      updateCodeBtnState({
        flag: true,
        txt: "发送中"
      });
      setTimeout(() => {
        GetSms({
          username: ruleForm.username,
          module: model.value
        })
          .then(result => {
            root.$message({
              message: result.message,
              type: "success"
            });
            /* 定时器 */
            loginBtnState.value = false;
            countDown(60);
          })
          .catch(err => {
            /* 定时器 */
            loginBtnState.value = false;
            countDown(5);
            console.log(err);
          });
      }, 3000);
    };
    let timer = ref(null);
    /* 倒计时 */
    const countDown = number => {
      clearInterval(timer.value);
      timer.value = setInterval(() => {
        // number--;
        if (!~number) {
          clearInterval(timer);
          updateCodeBtnState({
            flag: false,
            txt: "再次获取"
          });
          return;
        } else {
          codeBtnStatus.txt = `倒计时${number--}秒`;
        }
      }, 1000);
    };
    /* 清除倒计时 */
    const clearCountDown = () => {
      /* 验证码状态重置 */
      updateCodeBtnState({
        flag: false,
        txt: "获取验证码"
      });
      /* 清除定时器 */
      clearInterval(timer.value);
    };

    /* 提交表单 */
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          // loginBtnState.value = false;
          if (model.value === "login") {
            loginForm();
          } else {
            registerForm();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    /* 登录 */
    const loginForm = () => {
      let data = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code
      };
      root.$store
        .dispatch("app/login", data)
        .then(response => {
          console.log("index.vue/266:", response);
          /* 登录成功 */
          clearCountDown();
          root.$router.push({
            name: "Console"
          });
        })
        .catch(err => {});
    };
    /* 注册 */
    const registerForm = () => {
      let data = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code
      };
      Register(data)
        .then(result => {
          root.$message({
            message: result.message,
            type: "success"
          });
          /* 模拟注册成功 */
          toggleMenu(menuTab[0]);
          clearCountDown(timer.value);
        })
        .catch(error => {});
    };

    return {
      menuTab,
      codeBtnStatus,
      model,
      toggleMenu,
      submitForm,
      ruleForm,
      rules,
      getSms,
      loginBtnState
    };
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
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
