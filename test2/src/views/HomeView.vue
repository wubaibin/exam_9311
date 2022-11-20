<template>
  <div>
    <div class="header-container">
      <div class="header-left">
        <img src="@/assets/Frame.png" class="img" alt="logo" />
        <div class="title">公司员工资料表</div>
      </div>
      <div class="header-right">
        <img src="@/assets/logo.png" class="img" alt="logo" />
        <div class="name">李梅</div>
      </div>
    </div>
    <el-form
      class="input-container"
      ref="formParams"
      :model="formParams"
      inline
      label-width="80px"
    >
      <el-form-item label="姓名">
        <el-input
          class="input"
          size="small"
          v-model="formParams.name"
          placeholder="请输入姓名"
          maxlength="12"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input
          class="input"
          size="small"
          v-model="formParams.cardid"
          placeholder="请输入身份证号"
          maxlength="18"
          oninput="value=value.replace(/[^\d]/g,'')"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          class="input"
          size="small"
          v-model="formParams.mobile"
          placeholder="请输入手机号"
          maxlength="11"
          oninput="value=value.replace(/[^\d]/g,'')"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          style="margin-left: 20px"
          size="mini"
          @click="handleSearch"
        >
          搜索
        </el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="handleReset">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-table border v-loading="table.loading" :data="table.data">
      <el-table-column label="序号" fixed="left" type="index" width="80" />
      <el-table-column
        label="部门"
        :show-overflow-tooltip="true"
        prop="department"
      />
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="性别" prop="gender">
        <template slot-scope="scope">
          <div class="gender">
            <img
              :src="scope.row.gender === '男' ? gender1 : gender0"
              alt="性别"
            />
            {{ scope.row.gender }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="身份证号" prop="cardid" width="200" />
      <el-table-column label="手机号" prop="mobile" width="120" />
      <el-table-column label="出身年月" prop="birth" width="100" />
      <el-table-column
        label="籍贯"
        :show-overflow-tooltip="true"
        prop="native_place"
        width="150"
      />
      <el-table-column label="民族" prop="nation" />
      <el-table-column label="婚否" prop="marriage" />
      <el-table-column label="政治面貌" prop="political">
        <template slot-scope="scope">
          <div
            :style="{
              color: scope.row.political === '党员' ? '#FFA63E' : '#606266',
            }"
          >
            {{ scope.row.political }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="工作年限" prop="work" />
      <el-table-column label="操作" fixed="right" prop="">
        <template slot-scope="scope">
          <el-button
            @click="handleView(scope.row)"
            type="text"
            size="small"
            icon="el-icon-search"
          >
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div
      style="
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-top: 30px;
      "
    >
      <el-pagination
        :hide-on-single-page="table.total <= table.rows"
        background
        :current-page="table.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="table.rows"
        :total="table.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <el-dialog title="员工信息详情" :visible.sync="dialogVisible" width="70%">
      <div class="dialog-container">
        <div class="list-container">
          <div class="list">
            <div class="title">部门</div>
            <div class="des">{{ dialogInfo.department }}</div>
          </div>
          <div class="list">
            <div class="title">姓名</div>
            <div class="des">{{ dialogInfo.name }}</div>
          </div>
          <div class="list">
            <div class="title">性别</div>
            <div class="des">
              <div class="gender">
                <img
                  :src="dialogInfo.gender === '男' ? gender1 : gender0"
                  alt="性别"
                />
                {{ dialogInfo.gender }}
              </div>
            </div>
          </div>
        </div>
        <div class="list-container">
          <div class="list">
            <div class="title">身份证号</div>
            <div class="des">{{ dialogInfo.cardid }}</div>
          </div>
          <div class="list">
            <div class="title">手机号</div>
            <div class="des">{{ dialogInfo.mobile }}</div>
          </div>
          <div class="list">
            <div class="title">出生年月</div>
            <div class="des">{{ dialogInfo.birth }}</div>
          </div>
        </div>
        <div class="list-container">
          <div class="list">
            <div class="title">籍贯</div>
            <div class="des">{{ dialogInfo.native_place }}</div>
          </div>
          <div class="list">
            <div class="title">民族</div>
            <div class="des">{{ dialogInfo.nation }}</div>
          </div>
          <div class="list">
            <div class="title">婚否</div>
            <div class="des">{{ dialogInfo.marriage }}</div>
          </div>
        </div>
        <div class="list-container">
          <div class="list">
            <div class="title">政治面貌</div>
            <div
              class="des"
              :style="{
                color: dialogInfo.political === '党员' ? '#FFA63E' : '#000',
              }"
            >
              {{ dialogInfo.political }}
            </div>
          </div>
          <div class="list">
            <div class="title">工作年限</div>
            <div class="des">{{ dialogInfo.work }}</div>
          </div>
          <div class="list">
            <div class="title">家庭住址</div>
            <div class="des">{{ dialogInfo.address }}</div>
          </div>
        </div>
        <div class="list-container">
          <div class="list2">
            <div class="title">自我评价</div>
            <div class="des">{{ dialogInfo.evaluation }}</div>
          </div>
        </div>
        <div class="list-container">
          <div class="list2">
            <div class="title">个人爱好</div>
            <div class="des">{{ dialogInfo.hobby }}</div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const gender1 = require("@/assets/gender1.png");
const gender0 = require("@/assets/gender0.png");

export default {
  name: "HomeView",
  data() {
    return {
      formParams: {
        name: null,
        mobile: null,
        cardid: null,
      },
      table: {
        loading: false,
        data: [],
        total: 12,
        page: 1,
        limit: 10,
      },
      dialogVisible: false,
      dialogInfo: {},
      gender1,
      gender0,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 查询table数据
    async getData() {
      const {
        table: { page, limit },
        formParams,
      } = this;
      const res = await this.axios({
        url: this.buildUrl({
          _page: page,
          _limit: limit,
          ...formParams,
        }),
      });
      this.table.data = res.data;
    },
    handleSizeChange(val) {
      this.table.limit = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.table.page = val;
      this.getData();
    },
    handleSearch() {
      this.table.rows = 10;
      this.table.limit = 1;
      this.getData();
    },
    // 重置
    handleReset() {
      this.table = {
        loading: false,
        data: [],
        total: 10,
        page: 1,
        rows: 10,
      };
      this.formParams = {
        name: null,
        mobile: null,
        cardid: null,
      };
      this.getData();
    },
    // 查看
    handleView(value) {
      console.log(value);
      this.dialogVisible = true;
      this.dialogInfo = value;
    },
    buildUrl(data) {
      const url = "http://localhost:3002/table";
      if (!data) {
        return url;
      }
      let newUrl = url + "";
      Object.keys(data).forEach((key, index) => {
        if (data[key]) {
          newUrl += `${index === 0 ? "?" : "&"}${key}=${data[key]}`;
        }
      });
      return newUrl;
    },
  },
};
</script>
<style lang='scss' scoped>
@media screen and (max-width: 768px) {
}
.header-container {
  width: 100%;
  height: 50px;
  background: #1c55e9;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .header-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 16px;
    .img {
      width: 30px;
      height: 30px;
    }
    .title {
      color: #ffffff;
      font-size: 16px;
      margin-left: 6px;
    }
  }
  .header-right {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 20px;
    .img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .name {
      color: #ffffff;
      font-size: 12px;
    }
  }
}
.input-container {
  margin-top: 24px;
  .input {
    width: 160px;
  }
}

.gender {
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
}

.dialog-container {
  padding: 0 32px;
  .list-container {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #999;
    .list {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .title {
      width: 72px;
      font-size: 12px;
      color: #454545;
    }
    .des {
      flex: 1;
      font-size: 12px;
      color: #000;
    }
    .list2 {
      flex: 1;
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
