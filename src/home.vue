<template>
  <el-tabs type="border-card">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-setting"></i> 微服务治理组件</span>
      <div class="panediv">
        <el-row
          :gutter="12"
          v-loading="loading"
        >
          <el-col
            :span="8"
            v-for="app in adminApps"
            :key="app.name"
          >

            <el-card
              class="box-card"
              v-if="app && app.name"
            >
              <div
                slot="header"
                class="clearfix"
              >
                <span v-if="app.name.toLowerCase() == 'discovery'">注册中心</span>
                <span v-else-if="app.name.toLowerCase() == 'zuul'">微服务网关</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                >操作</el-button>
              </div>
              <div class="bottom clearfix">
                <div v-if="app.instance">
                  <span>节点数：{{app.instance.length}}</span>
                </div>
              </div>
            </el-card>
            <div class="bottom"></div>
          </el-col>
        </el-row>
      </div>
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label"><i class="el-icon-location"></i>微服务业务组件</span>
      <div class="panediv">
        <el-row
          :gutter="12"
          v-loading="loading"
        >
          <el-col
            :span="8"
            v-for="app in pageApps"
            :key="app.name"
          >

            <el-card
              class="box-card"
              v-if="app && app.name"
            >
              <div
                slot="header"
                class="clearfix"
              >
                <span>{{app.name}}</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                >操作</el-button>
              </div>
              <div class="bottom clearfix">
                <div v-if="app.instance">
                  <span>节点数：{{app.instance.length}}</span>
                </div>
              </div>
            </el-card>
            <div class="bottom"></div>
          </el-col>
        </el-row>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="queryOptions.pageNo"
          page-size="9"
          small
          layout="total, pager,prev, next"
          :total="apps.length"
          v-if="apps.length > 9"
        >
        </el-pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      activeIndex2: "1",
      queryOptions: {
        pageNo: 1
      },
      apps: [
        {
          name: ""
        }
      ],
      pageApps: [
        {
          name: ""
        }
      ],
      adminApps: [
        {
          name: ""
        }
      ]
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    handleClick(tab, event) {
      //console.log(tab, event);
    },
    handleCurrentChange: function(val) {
      this.queryOptions.pageNo = val;
      this.pageApps = [];
      for (let i = (val - 1) * 9; i < this.apps.length && i < val * 9; i++) {
        this.pageApps.push(this.apps.get(i));
      }
    },
    getInfo() {
      this.apps = [];
      this.adminApps = [];
      this.pageApps = [];
      this.loading = true;
      this.$http.get("/discovery/eureka/apps").then(
        response => {
          //console.log(response.body);
          let data = response.body;
          if (data && data.applications && data.applications.application) {
            let apps = data.applications.application;
            let thisToken = 0;
            for (let app of apps) {
              if (
                app.name.toLowerCase() == "discovery" ||
                app.name.toLowerCase() == "zuul"
              ) {
                this.adminApps.push(app);
              } else {
                if (thisToken < 9) {
                  this.pageApps.push(app);
                }
                this.apps.push(app);
              }
            }
          } else {
            this.apps = [];
            this.adminApps = [];
          }
          this.loading = false;
        },
        response => {
          this.loading = false;
          this.$notify({
            message: "获取注册中心已注册微服务失败",
            type: "error"
          });
        }
      );
    }
  }
};
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}
.panediv {
  min-height: 550px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  min-width: 200px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
